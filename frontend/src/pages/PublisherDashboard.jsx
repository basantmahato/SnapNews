import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getPublisherDashboard, addNews } from '../services/newsService'
import NewsForm from '../components/NewsForm'
import NewsCard from '../components/NewsCard'
import Navbar from '../components/Navbar'
import './Dashboard.css'

const PublisherDashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const handlePreview = (article) => {
    navigate(`/news/${article._id}`)
  }

  useEffect(() => {
    fetchDashboard()
  }, [])

  const fetchDashboard = async () => {
    try {
      setLoading(true)
      const data = await getPublisherDashboard()
      setDashboardData(data)
      setError('')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleAddNews = async (newsData) => {
    try {
      setRefreshing(true)
      await addNews(newsData)
      setShowForm(false)
      await fetchDashboard()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add news')
    } finally {
      setRefreshing(false)
    }
  }

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      <Navbar user={user} logout={logout} />
      
      <div className="dashboard-content">
        <div className="dashboard-header">
          <div>
            <h1>Publisher Dashboard</h1>
            <p className="dashboard-subtitle">
              Welcome back, {user?.username}!
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn btn-primary"
          >
            {showForm ? 'Cancel' : '+ Add News'}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {showForm && (
          <div className="form-container slide-in">
            <NewsForm
              onSubmit={handleAddNews}
              loading={refreshing}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon">📰</div>
            <div className="stat-info">
              <h3>{dashboardData?.total_articles || 0}</h3>
              <p>Total Articles</p>
            </div>
          </div>
        </div>

        <div className="news-section">
          <h2 className="section-title">Your Articles</h2>
          {dashboardData?.articles?.length > 0 ? (
            <div className="news-grid">
              {dashboardData.articles.map((article) => (
                <NewsCard
                  key={article._id}
                  article={article}
                  isPublisher
                  onPreview={handlePreview}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>No articles yet</h3>
              <p>Start publishing by clicking the "Add News" button</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PublisherDashboard
