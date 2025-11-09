import { useNavigate } from 'react-router-dom'
import './NewsCard.css'

const NewsCard = ({ article, isPublisher = false, onPreview }) => {
  const navigate = useNavigate()
  
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
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

  const handleReadMore = () => {
    navigate(`/news/${article._id}`)
  }

  const handlePreview = (e) => {
    e.stopPropagation()
    if (onPreview) {
      onPreview(article)
    }
  }

  // Base URL for serving static files (without /api)
  const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000'

  return (
    <div className="news-card">
      {article.thumbnail && (
        <div className="news-thumbnail-container">
          <img
            src={`${BASE_URL}${article.thumbnail}`}
            alt={article.title}
            className="news-thumbnail"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
        </div>
      )}
      
      <div className="news-card-header">
        <span
          className="news-category"
          style={{ backgroundColor: `${getCategoryColor(article.category)}20`, color: getCategoryColor(article.category) }}
        >
          {article.category}
        </span>
        <span className="news-date">{formatDate(article.publishedAt)}</span>
      </div>

      <h3 className="news-title">{article.title}</h3>

      <p className="news-content">
        {article.content && article.content.length > 200
          ? `${article.content.substring(0, 200)}...`
          : article.content || 'No content available'}
      </p>

      <div className="news-card-actions">
      
        <button
          onClick={handleReadMore}
          className="btn-read-more"
        >
          Preview Article →
        </button>
      </div>

      {!isPublisher && article.publisher && (
        <div className="news-footer">
          <span className="news-publisher">
            👤 {article.publisher.username || 'Unknown'}
          </span>
        </div>
      )}
    </div>
  )
}

export default NewsCard
