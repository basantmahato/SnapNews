const mongoose = require('mongoose');
const { Schema } = mongoose;

const NewsSchema = new Schema({
    title: {
        type: String,
        required: [true, 'News must have a title'],
        trim: true,
        maxlength: 100
    },
    content: {
        type: String,
        required: [true, 'News must have content']
    },
    category: {
        type: String,
        enum: ['Politics', 'Sports', 'Technology', 'World', 'Local'],
        default: 'World'
    },
    thumbnail: {
        type: String,
        default: ''
    },
    publisher: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    publishedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('News', NewsSchema);
