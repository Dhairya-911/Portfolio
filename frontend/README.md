# Portfolio Frontend 🎨

Modern React TypeScript frontend for Dhairya Solanki's portfolio website. Features a sleek design with smooth animations, interactive dock navigation, and responsive components.

## 🌐 Live Demo

[https://solankidhairya.vercel.app](https://solankidhairya.vercel.app)

## ✨ Features

- 🎨 **Modern Glassmorphism Design**: Clean, professional UI with backdrop blur effects
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- ⚡ **GSAP Animations**: Smooth, GPU-accelerated animations and transitions
- 🧭 **Interactive Dock**: macOS-style navigation dock with hover effects
- 🎯 **Smooth Scrolling**: Seamless navigation between sections
- 💼 **Project Showcase**: Interactive project cards with live demo links
- 🛠️ **Skills Display**: Professional icons in organized grid layout
- 📧 **Contact Form**: Real-time validation with backend integration
- 🦶 **Comprehensive Footer**: Social links, navigation, and contact info

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite (fast development and building)
- **UI Library**: Material-UI (MUI) v7
- **Icons**: Material-UI Icons
- **Animations**: GSAP (GreenSock Animation Platform)
- **Styling**: CSS-in-JS with MUI's sx prop system
- **Type Safety**: Full TypeScript implementation

## 🚀 Getting Started

### Prerequisites
- Node.js v20 or higher
- npm or yarn

### Installation

1. **Clone and navigate to frontend**
   ```bash
   git clone https://github.com/Dhairya-911/Portfolio.git
   cd Portfolio/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   # Create .env file
   VITE_API_URL=http://localhost:5000
   # For production: https://portfolio-v8ez.onrender.com
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Hero.tsx         # Landing section with hero content
│   ├── About.tsx        # About me and skills section
│   ├── Projects.tsx     # Project showcase with live links
│   ├── Contact.tsx      # Contact form with validation
│   ├── Footer.tsx       # Footer with social links
│   └── Dock.tsx         # Navigation dock component
├── animations/          # GSAP animation utilities
│   └── GSAPAnimations.ts # Reusable animation functions
├── types/              # TypeScript type definitions
│   └── index.ts        # Project-wide types
├── theme.ts            # Material-UI theme configuration
├── App.tsx             # Main app component
└── main.tsx           # Application entry point
```

## 🎨 Component Overview

### Hero Component
- Animated introduction text
- Call-to-action buttons
- Responsive hero image/content
- Smooth scroll integration

### About Component  
- Personal introduction
- Skills showcase with Material-UI icons
- Organized in responsive grid layout
- Frontend, backend, and tools categories

### Projects Component
- Interactive project cards
- Live demo and GitHub links
- Responsive grid layout
- Hover animations and effects

### Contact Component
- Real-time form validation
- Backend API integration
- Success/error feedback
- Professional contact information

### Dock Component
- macOS-style navigation
- Hover animations
- Smooth scroll to sections
- Glassmorphism design

### Footer Component
- Social media links
- Quick navigation
- Contact information
- Technology badges

## 🎭 Animation Features

- **GSAP Integration**: High-performance animations
- **Scroll Triggers**: Elements animate on scroll
- **Hover Effects**: Interactive component states
- **Entrance Animations**: Smooth page load transitions
- **GPU Acceleration**: Optimized for smooth performance

## � Build & Deploy

### Development
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Deployment (Vercel)
1. Connect GitHub repository to Vercel
2. Set environment variables:
   - `VITE_API_URL=https://portfolio-v8ez.onrender.com`
3. Deploy automatically on push to main

## 🎨 Customization

### Theme
Edit `src/theme.ts` to customize:
- Color palette
- Typography
- Component styles
- Breakpoints

### Animations
Modify `src/animations/GSAPAnimations.ts` for:
- Custom animation functions
- Timing adjustments
- Effect variations

### Components
Each component in `src/components/` can be customized:
- Update content in component files
- Modify styling with MUI sx props
- Adjust responsive breakpoints

## 📱 Responsive Design

- **Mobile First**: Designed for mobile, enhanced for desktop
- **Breakpoints**: sm (600px), md (900px), lg (1200px), xl (1536px)
- **Flexible Layouts**: CSS Grid and Flexbox
- **Touch Optimized**: Mobile-friendly interactions

## ⚡ Performance

- **Vite**: Fast development and building
- **Code Splitting**: Automatic chunk splitting
- **Asset Optimization**: Optimized images and resources
- **GPU Acceleration**: Hardware-accelerated animations
- **Tree Shaking**: Unused code elimination

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

Built with ❤️ by [Dhairya Solanki](https://github.com/Dhairya-911)
│   ├── Projects.tsx    # Projects showcase
│   └── Contact.tsx     # Contact form
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
│   └── animations.ts   # Animation utilities
├── theme.ts            # MUI theme configuration
├── App.tsx             # Main app component
└── main.tsx           # App entry point
```

## 🎨 Sections

1. **Hero**: Eye-catching introduction with animated text and social links
2. **About**: Personal information, skills, and expertise
3. **Projects**: Showcase of featured projects with live demos
4. **Contact**: Contact form and information

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎯 Customization

### Personal Information

Update the following files with your personal information:

- `src/components/Hero.tsx` - Name, title, and description
- `src/components/About.tsx` - Skills and expertise
- `src/components/Projects.tsx` - Your projects
- `src/components/Contact.tsx` - Contact information

### Styling

- Modify `src/theme.ts` to change colors and typography
- Update `src/index.css` for global styles
- Customize component styles using MUI's `sx` prop

### Animations

- GSAP animations are configured in `src/utils/animations.ts`
- Modify animation parameters in individual components
- Add new animation effects using the utility functions

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 600px
- Tablet: 600px - 960px
- Desktop: > 960px

## 🎨 Animation Features

- **Scroll-triggered animations** using GSAP ScrollTrigger
- **Entrance animations** for all sections
- **Hover effects** on interactive elements
- **Loading animations** for smooth transitions
- **Parallax effects** for enhanced visual appeal

## 📧 Contact Form

The contact form includes:
- Form validation
- Success/error notifications
- Responsive design
- Accessibility features

## 🚀 Performance Optimizations

- Lazy loading of components
- Optimized images and assets
- Minimal bundle size with Vite
- CSS-in-JS with Emotion
- Tree shaking for unused code

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need help with customization, feel free to reach out!

---

Made with ❤️ using React, TypeScript, GSAP, and Material-UI
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
