import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  IconButton,
  Divider,
} from '@mui/material';
import {
  GitHub,
  LinkedIn,
  Instagram,
  Email,
  LocationOn,
  Phone,
  Copyright,
} from '@mui/icons-material';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      icon: GitHub, 
      url: 'https://github.com/Dhairya-911', 
      label: 'GitHub',
      color: '#ffffff'
    },
    { 
      icon: LinkedIn, 
      url: 'https://linkedin.com/in/dhairya-solanki', 
      label: 'LinkedIn',
      color: '#0077b5'
    },
    { 
      icon: Instagram, 
      url: 'https://instagram.com/dhairya_solanki', 
      label: 'Instagram',
      color: '#e4405f'
    },
    { 
      icon: Email, 
      url: 'mailto:solankidhairya911@gmail.com', 
      label: 'Email',
      color: '#ea4335'
    },
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.5), transparent)',
        },
      }}
    >
      <Container maxWidth="lg">
        {/* Main Footer Content */}
        <Grid container spacing={4} sx={{ py: 6 }}>
          {/* Brand Section */}
          <Grid item xs={12} md={4} component="div">
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #00d4ff, #ff6b9d)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  mb: 2,
                }}
              >
                Dhairya Solanki
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.7,
                  mb: 3,
                }}
              >
                Full Stack Developer passionate about creating beautiful, 
                responsive web applications with modern technologies.
              </Typography>
              
              {/* Social Links */}
              <Box sx={{ display: 'flex', gap: 1 }}>
                {socialLinks.map((social, index) => (
                  <IconButton
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      width: 45,
                      height: 45,
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      color: 'text.secondary',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        background: `${social.color}15`,
                        borderColor: `${social.color}40`,
                        color: social.color,
                        transform: 'translateY(-3px)',
                        boxShadow: `0 10px 25px ${social.color}25`,
                      },
                    }}
                  >
                    <social.icon />
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2} component="div">
            <Typography
              variant="h6"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                mb: 3,
              }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  onClick={() => handleNavClick(link.href)}
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#00d4ff',
                      transform: 'translateX(5px)',
                    },
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3} component="div">
            <Typography
              variant="h6"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                mb: 3,
              }}
            >
              Get In Touch
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Email sx={{ color: '#00d4ff', fontSize: '1.2rem' }} />
                <Typography
                  component="a"
                  href="mailto:solankidhairya911@gmail.com"
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'none',
                    '&:hover': { color: '#00d4ff' },
                  }}
                >
                  solankidhairya911@gmail.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <LocationOn sx={{ color: '#ff6b9d', fontSize: '1.2rem' }} />
                <Typography sx={{ color: 'text.secondary' }}>
                  Gujarat, India
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Technologies */}
          <Grid item xs={12} md={3} component="div">
            <Typography
              variant="h6"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                mb: 3,
              }}
            >
              Technologies
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {['React', 'Node.js', 'TypeScript', 'MongoDB', 'Express', 'Tailwind'].map((tech, index) => (
                <Box
                  key={index}
                  sx={{
                    px: 2,
                    py: 0.5,
                    background: 'rgba(0, 212, 255, 0.1)',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                    borderRadius: '16px',
                    color: '#00d4ff',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                  }}
                >
                  {tech}
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Bottom Section */}
        <Box
          sx={{
            py: 3,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Copyright sx={{ fontSize: '1rem', color: 'text.secondary' }} />
            <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
              {currentYear} Dhairya Solanki. All rights reserved.
            </Typography>
          </Box>
          
          <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
            Made with ❤️ using React & Material-UI
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
