# News App Frontend

A modern, responsive React frontend for the News App backend. Built with React, Vite, and React Router.

## Features

- 🔐 **Authentication**: Secure login and registration with JWT tokens
- 👤 **Role-Based Access**: Separate dashboards for Publishers and Consumers
- 📰 **News Management**: Publishers can create and manage articles
- 📖 **News Feed**: Consumers can browse news by category
- 📱 **Fully Responsive**: Works seamlessly on all screen sizes
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Custom styling with CSS variables

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on port 5000

### Installation

1. Navigate to the frontend directory:
```bash
cd news-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional, defaults to localhost:5000):
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
news-frontend/
├── public/
├── src/
│   ├── components/      # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── NewsCard.jsx
│   │   ├── NewsForm.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/         # React context
│   │   └── AuthContext.jsx
│   ├── pages/           # Page components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── PublisherDashboard.jsx
│   │   └── ConsumerDashboard.jsx
│   ├── services/        # API services
│   │   ├── api.js
│   │   ├── authService.js
│   │   └── newsService.js
│   ├── App.jsx          # Main app component
│   ├── App.css
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html
├── package.json
└── vite.config.js
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## User Roles

### Publisher
- Can create and publish news articles
- Has access to publisher dashboard showing all their articles
- Can manage article categories (Politics, Sports, Technology, World, Local)

### Consumer
- Can browse all published news articles
- Can filter news by category
- Has access to consumer dashboard with news feed

## API Integration

The frontend connects to the backend API at `http://localhost:5000/api`. Make sure your backend server is running before starting the frontend.

### API Endpoints Used:
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/dashboard-publisher` - Publisher dashboard (requires publisher role)
- `POST /api/addNews` - Add new article (requires publisher role)
- `GET /api/dashboard-consumer` - Consumer dashboard (requires consumer role)
- `GET /api/getNews` - Get news feed (requires authenticated user)

## Styling

The app uses CSS variables for theming, making it easy to customize colors:
- Primary colors: Purple gradient (`#667eea` to `#764ba2`)
- Responsive breakpoints: Mobile-first approach
- Modern UI: Gradient backgrounds, smooth animations, card-based layouts

## Responsive Design

The application is fully responsive with breakpoints for:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## License

ISC
