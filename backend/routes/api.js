
const express = require('express');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');
const { upload } = require('../utils/multerConfig');
const { 
    getPublisherDashboard,
    addNews,
    getConsumerDashboard,
    getNews,
    getNewsById
} = require('../controllers/apiController');


const router = express.Router();


// Route: /api/dashboard-publisher
router.get(
    '/dashboard-publisher', 
    protect, 
    authorize('publisher'), 
    getPublisherDashboard
);

// Route: /api/addNews
router.post(
    '/addNews', 
    protect, 
    authorize('publisher'),
    upload,
    addNews
);

// Route: /api/news/:id
router.get(
    '/news/:id',
    protect,
    authorize('consumer', 'publisher'),
    getNewsById
);

// Route: /api/dashboard-consumer
router.get(
    '/dashboard-consumer', 
    protect, 
    authorize('consumer'), 
    getConsumerDashboard
);

// Route: /api/getNews

router.get(
    '/getNews', 
    protect, 
    authorize('consumer', 'publisher'), 
    getNews
);

module.exports = router;
