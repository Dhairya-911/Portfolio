import React, { useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  IconButton,
} from '@mui/material';
import {
  GitHub,
  LinkedIn,
  Instagram,
} from '@mui/icons-material';
import { gsap } from 'gsap';
import { GSAPAnimations } from '../utils/animations';
import dhairyaImage from '../assets/dhairya.jpg';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Main animation sequence
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo(
        descriptionRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo(
        buttonsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo(
        socialRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
        '-=1'
      );

    // Floating animation for the hero section
    gsap.to(heroRef.current, {
      y: -10,
      duration: 3,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    });

    // Animate social icons on hover
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach((icon) => {
      icon.addEventListener('mouseenter', () => {
        GSAPAnimations.scaleIn(icon as HTMLElement);
      });
    });
  }, []);

  const handleScrollToProjects = () => {
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      id="home"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background particles effect */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 107, 157, 0.1) 0%, transparent 50%)',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
          }}
        >
          <Box sx={{ flex: 1, maxWidth: { xs: '100%', md: '60%' } }}>
            <Box ref={heroRef}>
              <Typography
                ref={titleRef}
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #00d4ff, #ff6b9d)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                }}
              >
                Hi, I'm Dhairya Solanki
              </Typography>

              <Typography
                ref={subtitleRef}
                variant="h2"
                component="h2"
                sx={{
                  fontSize: { xs: '1.5rem', md: '2.5rem' },
                  fontWeight: 600,
                  color: 'white',
                  mb: 3,
                }}
              >
                Full Stack Developer
              </Typography>

              <Typography
                ref={descriptionRef}
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  color: 'text.secondary',
                  maxWidth: '600px',
                  lineHeight: 1.8,
                  mb: 4,
                }}
              >
                I create beautiful, responsive web applications with modern technologies.
                Passionate about clean code, great user experiences, and bringing ideas to life.
              </Typography>

              <Box ref={buttonsRef} sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleScrollToProjects}
                  sx={{
                    background: 'linear-gradient(45deg, #00d4ff, #0093c4)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #0093c4, #00d4ff)',
                    },
                  }}
                >
                  View My Work
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleScrollToContact}
                  sx={{
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    '&:hover': {
                      borderColor: 'primary.light',
                      backgroundColor: 'rgba(0, 212, 255, 0.1)',
                    },
                  }}
                >
                  Get In Touch
                </Button>
              </Box>

              <Box ref={socialRef} sx={{ display: 'flex', gap: 2 }}>
                <IconButton
                  className="social-icon"
                  component="a"
                  href="https://github.com/Dhairya-911"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'white',
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  <GitHub fontSize="large" />
                </IconButton>
                <IconButton
                  className="social-icon"
                  component="a"
                  href="https://www.linkedin.com/in/dhairya-solanki-183630190"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'white',
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  <LinkedIn fontSize="large" />
                </IconButton>
                <IconButton
                  className="social-icon"
                  component="a"
                  href="https://instagram.com/dhairya_911"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'white',
                    '&:hover': { color: '#E4405F' },
                  }}
                >
                  <Instagram fontSize="large" />
                </IconButton>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              maxWidth: { xs: '100%', md: '40%' },
            }}
          >
            {/* Profile Image */}
            <Box
              ref={imageRef}
              sx={{
                width: { xs: 250, md: 350 },
                height: { xs: 250, md: 350 },
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid rgba(0, 212, 255, 0.6)',
                boxShadow: '0 0 30px rgba(0, 212, 255, 0.4), 0 0 60px rgba(255, 107, 157, 0.2)',
                position: 'relative',
                background: 'linear-gradient(45deg, rgba(0, 212, 255, 0.1), rgba(255, 107, 157, 0.1))',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, transparent, rgba(0, 212, 255, 0.2), transparent)',
                  animation: 'rotate 3s linear infinite',
                },
                '@keyframes rotate': {
                  '0%': { transform: 'rotate(0deg)' },
                  '100%': { transform: 'rotate(360deg)' },
                },
              }}
            >
              <Box
                component="img"
                src={dhairyaImage}
                alt="Dhairya Solanki"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  position: 'relative',
                  zIndex: 1,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              />
            </Box>
          </Box>
        </Box>

      </Container>
    </Box>
  );
};

export default Hero;
