import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme';
import Dock from './components/Dock';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Hero />
        <About />
        <Projects />
        <Contact />
        <Footer />
        <Dock />
      </div>
    </ThemeProvider>
  );
}

export default App;
