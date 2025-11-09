
const mongoose = require('mongoose');
const News = require('../models/News');
const User = require('../models/User');


const getPublisherDashboard = async (req, res) => {
    try {
        
        const newsArticles = await News.find({ publisher: req.user.id })
            .sort({ publishedAt: -1 });

        res.json({
            publisher: req.user,
            total_articles: newsArticles.length,
            articles: newsArticles
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching publisher dashboard data', error: error.message });
    }
};

// @desc    Add a new news article
// @route   POST /api/addNews
const addNews = async (req, res) => {
    const { title, content, category } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
    }

    try {
        // Get thumbnail URL if file was uploaded
        let thumbnail = '';
        if (req.file) {
            thumbnail = `/uploads/${req.file.filename}`;
        }

        const newNews = await News.create({
            title,
            content,
            category: category || 'World',
            thumbnail,
            publisher: req.user.id // Publisher ID comes from the authenticated user
        });

        res.status(201).json({ 
            message: 'News article published successfully', 
            news: newNews 
        });
    } catch (error) {
        console.error('Error publishing news:', error);
        res.status(500).json({ message: 'Error publishing news', error: error.message });
    }
};


// --- Consumer Controller Functions ---


const getConsumerDashboard = (req, res) => {
   
    res.json({
        consumer: req.user,
        message: 'Welcome to your Consumer Dashboard!'
    });
};


const getNews = async (req, res) => {
    try {
        const newsFeed = await News.find({})
            .populate('publisher', 'username email') 
            .sort({ publishedAt: -1 })
            .limit(20); 
        res.json({
            count: newsFeed.length,
            news: newsFeed
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching news feed', error: error.message });
    }
};

// @desc    Get a single news article by ID
// @route   GET /api/news/:id
const getNewsById = async (req, res) => {
    try {
        // Check if the ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid news article ID format' });
        }

        const news = await News.findById(req.params.id)
            .populate('publisher', 'username email');
        
        if (!news) {
            return res.status(404).json({ message: 'News article not found' });
        }

        res.json({ news });
    } catch (error) {
        console.error('Error fetching news article:', error);
        res.status(500).json({ message: 'Error fetching news article', error: error.message });
    }
};

module.exports = {
    getPublisherDashboard,
    addNews,
    getConsumerDashboard,
    getNews,
    getNewsById
};

