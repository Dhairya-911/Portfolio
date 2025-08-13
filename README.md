# Portfolio Website 🚀

A modern, responsive full-stack portfolio website built with React, TypeScript, and Node.js. Features a sleek design with smooth animations, interactive components, and a fully functional contact form.

## 🌐 Live Demo

- **Frontend**: [https://solankidhairya.vercel.app](https://solankidhairya.vercel.app)
- **Backend**: [https://portfolio-v8ez.onrender.com](https://portfolio-v8ez.onrender.com)

## ✨ Features

### Frontend
- 🎨 Modern UI with glassmorphism design
- 📱 Fully responsive across all devices
- ⚡ Smooth GSAP animations and transitions
- 🧭 Interactive dock navigation with hover effects
- 🎯 Scroll-based section highlighting
- 💼 Project showcase with live demo links
- 🛠️ Skills section with Material-UI icons
- 📧 Contact form with real-time validation
- 🦶 Comprehensive footer with social links

### Backend
- 🚀 RESTful API built with Express.js
- 📨 Email notification system
- 🔒 CORS configuration for secure cross-origin requests
- 🛡️ Rate limiting and security middleware
- 🗄️ MongoDB database integration
- 📊 Contact form data storage

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI)
- **Animations**: GSAP
- **Styling**: CSS-in-JS with MUI's sx prop
- **Deployment**: Vercel

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **Email Service**: Nodemailer
- **Deployment**: Render

## 🚀 Getting Started

### Prerequisites
- Node.js (v20 or higher)
- npm or yarn
- MongoDB Atlas account (for backend)

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dhairya-911/Portfolio.git
   cd Portfolio/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   # Create .env file in frontend directory
   VITE_API_URL=http://localhost:5000
   # For production: VITE_API_URL=https://portfolio-v8ez.onrender.com
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd ../backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   # Create .env file in backend directory
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

4. **Start the server**
   ```bash
   npm start
   ```

   The backend will be available at `http://localhost:5000`

## 📁 Project Structure

```
Portfolio/
├── frontend/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Hero.tsx     # Landing section
│   │   │   ├── About.tsx    # About and skills section
│   │   │   ├── Projects.tsx # Project showcase
│   │   │   ├── Contact.tsx  # Contact form
│   │   │   ├── Footer.tsx   # Footer with links
│   │   │   └── Dock.tsx     # Navigation dock
│   │   ├── animations/      # GSAP animation utilities
│   │   ├── types/          # TypeScript type definitions
│   │   └── theme.ts        # MUI theme configuration
│   ├── public/             # Static assets
│   └── package.json
├── backend/                # Node.js Express backend
│   ├── server.js          # Main server file
│   ├── routes/            # API routes
│   └── package.json
└── README.md
```

## 🎨 Key Components

### Dock Navigation
- macOS-style dock with hover animations
- Smooth scroll navigation to sections
- Glassmorphism design with backdrop blur

### Hero Section
- Animated text with typewriter effect
- Call-to-action buttons
- Responsive design

### Skills Section
- Professional Material-UI icons
- Organized 2x2 grid layout
- Frontend, backend, and tools categories

### Contact Form
- Real-time validation
- Email notifications
- Success/error feedback
- Responsive design

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Render)
1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy with automatic builds

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

**Dhairya Solanki**
- Email: dvsolankilm30@gmail.com
- LinkedIn: [dhairya-solanki](https://linkedin.com/in/dhairya-solanki)
- GitHub: [Dhairya-911](https://github.com/Dhairya-911)
- Portfolio: [solankidhairya.vercel.app](https://solankidhairya.vercel.app)

---

⭐ Star this repository if you found it helpful!
