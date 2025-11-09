import { useState } from 'react'
import './NewsForm.css'

const NewsForm = ({ onSubmit, loading, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'World',
    thumbnail: null,
  })
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState('')

  const categories = ['Politics', 'Sports', 'Technology', 'World', 'Local']

  const handleChange = (e) => {
    if (e.target.name === 'thumbnail') {
      const file = e.target.files[0]
      if (file) {
        if (file.size > 5000000) {
          setError('Image size must be less than 5MB')
          return
        }
        setFormData({
          ...formData,
          thumbnail: file,
        })
        // Create preview
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreview(reader.result)
        }
        reader.readAsDataURL(file)
      }
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      })
    }
    setError('')
  }

  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      thumbnail: null,
    })
    setPreview(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Title and content are required')
      return
    }

    if (formData.title.length > 100) {
      setError('Title must be 100 characters or less')
      return
    }

    await onSubmit(formData)
    setFormData({ title: '', content: '', category: 'World', thumbnail: null })
    setPreview(null)
    setError('')
  }

  return (
    <div className="news-form-card">
      <h3 className="form-title">Create New Article</h3>
      
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="news-form">
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter article title"
            maxLength={100}
            required
          />
          <span className="char-count">{formData.title.length}/100</span>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-select"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="thumbnail">Thumbnail Image (Optional)</label>
          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            accept="image/*"
            onChange={handleChange}
            className="form-file-input"
          />
          <p className="form-hint">Max size: 5MB. Supported formats: JPEG, PNG, GIF, WebP</p>
          {preview && (
            <div className="thumbnail-preview">
              <img src={preview} alt="Thumbnail preview" />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="btn-remove-image"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="content">Content *</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your article content here..."
            rows={8}
            required
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Publishing...' : 'Publish Article'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewsForm
