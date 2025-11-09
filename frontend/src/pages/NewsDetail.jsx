import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getNewsById } from '../services/newsService'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import './NewsDetail.css'

const NewsDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchArticle()
  }, [id])

  const fetchArticle = async () => {
    try {
      setLoading(true)
      const data = await getNewsById(id)
      setArticle(data.news)
      setError('')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load article')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  const getCategoryColor = (category) => {
    const colors = {
      Politics: '#ef4444',
      Sports: '#10b981',
      Technology: '#3b82f6',
      World: '#8b5cf6',
      Local: '#f59e0b',
    }
    return colors[category] || '#6b7280'
  }

  if (loading) {
    return (
      <div className="news-detail-container">
        <Navbar user={user} logout={logout} />
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading article...</p>
        </div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="news-detail-container">
        <Navbar user={user} logout={logout} />
        <div className="error-container">
          <h2>Article Not Found</h2>
          <p>{error || 'The article you are looking for does not exist.'}</p>
          <button onClick={() => navigate(`/${user?.role || 'consumer'}`)} className="btn btn-primary">
            Go Back
          </button>
        </div>
      </div>
    )
  }

  // Base URL for serving static files (without /api)
  const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000'

  return (
    <div className="news-detail-container">
      <Navbar user={user} logout={logout} />
      
      <div className="news-detail-content">
        <button onClick={() => navigate(-1)} className="btn-back">
          ← Back
        </button>

        <article className="news-article">
          {article.thumbnail && (
            <div className="article-thumbnail">
              <img
                src={`${BASE_URL}${article.thumbnail}`}
                alt={article.title}
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            </div>
          )}

          <div className="article-header">
            <div className="article-meta">
              <span
                className="article-category"
                style={{
                  backgroundColor: `${getCategoryColor(article.category)}20`,
                  color: getCategoryColor(article.category),
                }}
              >
                {article.category}
              </span>
              <span className="article-date">{formatDate(article.publishedAt)}</span>
            </div>
            {article.publisher && (
              <div className="article-publisher">
                <span className="publisher-label">Published by</span>
                <span className="publisher-name">{article.publisher.username}</span>
              </div>
            )}
          </div>

          <h1 className="article-title">{article.title}</h1>

          <div className="article-content">
            {article.content && article.content.split('\n').map((paragraph, index) => (
              paragraph && <p key={index}>{paragraph}</p>
            ))}
            {!article.content && <p>No content available</p>}
          </div>
        </article>
      </div>
    </div>
  )
}

export default NewsDetail
