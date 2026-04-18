# AI SMART FARM SIMULATOR

A modern, immersive farm simulation application with 3D visualization and AI-powered crop optimization.

## 🚀 Features

- **Landing Page**: Futuristic design with animated particles and smooth transitions
- **3D Farm Environment**: Interactive farm scene with growing crops, floating particles, and dynamic lighting
- **Real-time Simulation**: API-powered crop yield, cost, and profit calculations
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Glassmorphism effects, smooth animations, and professional styling

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **3D Graphics**: React Three Fiber + Drei
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Backend**: FastAPI (Python)
- **Styling**: CSS with modern effects

## 📁 Project Structure

```
ai-smart-farm-simulator/
├── backend/
│   ├── main.py              # FastAPI server
│   └── requirements.txt     # Python dependencies
└── frontend/
    ├── src/
    │   ├── App.jsx          # Main router component
    │   ├── LandingPage.jsx  # Landing page component
    │   ├── Dashboard.jsx    # Farm simulator dashboard
    │   ├── LandingPage.css  # Landing page styles
    │   └── App.css          # Dashboard styles
    └── package.json         # Node dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- npm or yarn

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-smart-farm-simulator
   ```

2. **Backend Setup**
   ```bash
   cd backend
   pip install -r requirements.txt
   python main.py
   ```
   Backend will run on http://localhost:8000

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend will run on http://localhost:5174

### Usage

1. **Landing Page** (http://localhost:5174)
   - View the animated landing page
   - Click "Start Simulation" to enter the dashboard

2. **Dashboard** (http://localhost:5174/dashboard)
   - Explore the 3D farm environment
   - Click "Run Simulation" to fetch crop data
   - View results in animated cards
   - Use mouse to interact with the 3D scene

## 🎨 Design Features

### Landing Page
- Full-screen dark gradient background (blue to green)
- Large, bold, futuristic title with gradient text
- Animated floating particles
- Smooth fade-in animations
- Glowing "Start Simulation" button

### Dashboard
- Immersive 3D farm scene with:
  - 25 animated crop plants
  - Green ground plane
  - Floating pollen particles
  - Dynamic sun with lighting
  - Interactive camera controls
- Glassmorphism UI card
- Real-time crop growth animations
- Responsive result display cards

## 🔧 API Endpoints

### GET /api/simulation
Returns farm simulation data:
```json
{
  "yield": "1200 kg",
  "cost": "₹3000",
  "profit": "₹7000",
  "risk": "Low",
  "crop": "Cotton"
}
```

### GET /health
Health check endpoint

### GET /
API information and available endpoints

## 🎯 Key Components

### LandingPage.jsx
- Animated landing page with particles
- Navigation to dashboard
- Modern typography and effects

### Dashboard.jsx
- 3D farm scene with React Three Fiber
- API integration for simulation data
- Animated results display
- Error handling and loading states

### 3D Components
- **CropPlant**: Animated crop models with growth effects
- **FarmField**: Complete farm environment
- **FloatingParticles**: Atmospheric particle system
- **Sun**: Dynamic lighting source

## 📱 Responsive Design

- **Desktop**: Full 3D experience with all features
- **Tablet**: Optimized layouts and touch interactions
- **Mobile**: Simplified UI with essential features

## 🎨 Customization

### Colors
- Primary: Dark blue to green gradients
- Accent: Green (#4CAF50, #81C784)
- Text: White with opacity variations

### Animations
- Framer Motion for smooth transitions
- React Three Fiber for 3D animations
- CSS keyframes for particle effects

## 🚀 Deployment

### Frontend
```bash
npm run build
# Deploy the dist/ folder to your hosting service
```

### Backend
```bash
# Use a Python hosting service like Railway, Render, or Heroku
# Or deploy to a VPS with gunicorn/uvicorn
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React Three Fiber community
- Framer Motion team
- FastAPI framework
- Modern web development tools

---

**Built with ❤️ for innovative agriculture technology**