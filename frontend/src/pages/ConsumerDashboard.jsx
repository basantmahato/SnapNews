import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getNews } from '../services/newsService'
import NewsCard from '../components/NewsCard'
import Navbar from '../components/Navbar'
import './Dashboard.css'

const ConsumerDashboard = () => {
  const { user, logout } = useAuth()
  const [newsData, setNewsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Politics', 'Sports', 'Technology', 'World', 'Local']

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      setLoading(true)
      const data = await getNews()
      setNewsData(data)
      setError('')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load news')
    } finally {
      setLoading(false)
    }
  }

  const filteredNews =
    newsData?.news?.filter(
      (article) =>
        selectedCategory === 'All' || article.category === selectedCategory
    ) || []

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading news...</p>
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
            <h1>News Feed</h1>
            <p className="dashboard-subtitle">
              Stay updated with the latest news, {user?.username}!
            </p>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="category-filter">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`category-btn ${
                selectedCategory === category ? 'active' : ''
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="news-section">
          {filteredNews.length > 0 ? (
            <>
              <p className="news-count">
                Showing {filteredNews.length} article
                {filteredNews.length !== 1 ? 's' : ''}
              </p>
              <div className="news-grid">
                {filteredNews.map((article) => (
                  <NewsCard key={article._id} article={article} />
                ))}
              </div>
            </>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📰</div>
              <h3>No news found</h3>
              <p>Try selecting a different category</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ConsumerDashboard
