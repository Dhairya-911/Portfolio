# Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and advanced animations using GSAP, MUI, and Anime.js.

## 🚀 Features

- **Modern Design**: Clean, professional layout with dark theme
- **Responsive**: Fully responsive design that works on all devices
- **Animations**: Smooth animations using GSAP and Anime.js
- **Contact Form**: Functional contact form with validation
- **Material-UI**: Beautiful components and theming with MUI
- **TypeScript**: Fully typed for better development experience
- **Performance**: Optimized for fast loading and smooth interactions

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Material-UI (MUI), Emotion
- **Animations**: GSAP, Anime.js
- **Build Tool**: Vite
- **Package Manager**: npm

## 📂 Project Structure

```
src/
├── components/          # React components
│   ├── Navbar.tsx      # Navigation component
│   ├── Hero.tsx        # Hero section
│   ├── About.tsx       # About section
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
