import React, { useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
} from '@mui/material';
import {
  Code,
  Devices,
  Speed,
  Security,
  Html,
  Css,
  JavaScript,
  GitHub,
  Storage,
  DataObject,
  Api,
  VpnKey,
  Terminal,
  Cloud,
  Computer,
} from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable, and well-documented code following best practices.',
    },
    {
      icon: Devices,
      title: 'Responsive Design',
      description: 'Creating beautiful interfaces that work seamlessly across all devices and screen sizes.',
    },
    {
      icon: Speed,
      title: 'Performance',
      description: 'Optimizing applications for speed and efficiency to provide the best user experience.',
    },
    {
      icon: Security,
      title: 'Security First',
      description: 'Implementing secure coding practices and following security guidelines.',
    },
  ];

  useEffect(() => {
    // Animate about section
    gsap.fromTo(
      aboutRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Animate features
    gsap.fromTo(
      '.feature-card',
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.features-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Animate skills
    gsap.fromTo(
      '.skill-item',
      {
        opacity: 0,
        x: -30,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: skillsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <Box
      id="about"
      sx={{
        py: 8,
        background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
      }}
    >
      <Container maxWidth="lg">
        <Box ref={aboutRef}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              textAlign: 'center',
              mb: 2,
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #00d4ff, #ff6b9d)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            About Me
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              mb: 6,
              maxWidth: '800px',
              mx: 'auto',
              fontSize: '1.2rem',
              lineHeight: 1.8,
            }}
          >
                        I'm an intermediate web developer with a solid foundation in HTML, CSS, JavaScript, Node.js, React, Tailwind CSS, and MongoDB. I'm currently focused on building real-world projects to sharpen my skills and gain hands-on experience in full-stack development. Passionate about creating clean, responsive, and user-friendly web applications, I'm continuously learning and growing in the world of web development.

          </Typography>

          {/* Features Grid */}
          <Box
            className="features-grid"
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 3,
              mb: 8,
            }}
          >
            {features.map((feature, index) => (
              <Paper
                key={index}
                className="feature-card"
                elevation={3}
                sx={{
                  p: 3,
                  background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
                  borderRadius: '15px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 12px 40px rgba(0, 212, 255, 0.2)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: '10px',
                      background: 'linear-gradient(45deg, #00d4ff, #ff6b9d)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: '60px',
                      height: '60px',
                    }}
                  >
                    <feature.icon sx={{ color: 'white', fontSize: '1.8rem' }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                    >
                      {feature.description}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Box>

          {/* Skills Section */}
          <Box ref={skillsRef} id="skills">
            <Typography
              variant="h3"
              component="h3"
              sx={{
                textAlign: 'center',
                mb: 6,
                fontWeight: 'bold',
                color: 'white',
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              Skills & Technologies
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                gap: 6,
                maxWidth: '1200px',
                mx: 'auto',
              }}
            >
              {/* Frontend Section */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    mb: 4,
                    fontSize: '1.5rem',
                  }}
                >
                  Frontend
                </Typography>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 3,
                  }}
                >
                  <Box className="skill-item" sx={{ textAlign: 'center' }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
                        borderRadius: '15px',
                        color: '#e34c26',
                        fontSize: '2.5rem',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 10px 30px rgba(227, 76, 38, 0.3)',
                        },
                      }}
                    >
                      <Html sx={{ fontSize: '2.5rem' }} />
                    </Box>
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                      HTML5
                    </Typography>
                  </Box>

                  <Box className="skill-item" sx={{ textAlign: 'center' }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
                        borderRadius: '15px',
                        color: '#1572b6',
                        fontSize: '2.5rem',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 10px 30px rgba(21, 114, 182, 0.3)',
                        },
                      }}
                    >
                      <Css sx={{ fontSize: '2.5rem' }} />
                    </Box>
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                      CSS3
                    </Typography>
                  </Box>

                  <Box className="skill-item" sx={{ textAlign: 'center' }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
                        borderRadius: '15px',
                        color: '#f7df1e',
                        fontSize: '2.5rem',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 10px 30px rgba(247, 223, 30, 0.3)',
                        },
                      }}
                    >
                      <JavaScript sx={{ fontSize: '2.5rem' }} />
                    </Box>
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                      JavaScript
                    </Typography>
                  </Box>

                  <Box className="skill-item" sx={{ textAlign: 'center' }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
                        borderRadius: '15px',
                        color: '#61dafb',
                        fontSize: '2.5rem',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 10px 30px rgba(97, 218, 251, 0.3)',
                        },
                      }}
                    >
                      <Code sx={{ fontSize: '2.5rem' }} />
                    </Box>
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                      React
                    </Typography>
                  </Box>

                  <Box className="skill-item" sx={{ textAlign: 'center' }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
                        borderRadius: '15px',
                        color: '#06b6d4',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 10px 30px rgba(6, 182, 212, 0.3)',
                        },
                      }}
                    >
                      <Css sx={{ fontSize: '2.5rem' }} />
                    </Box>
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                      Tailwind CSS
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Backend & Database Section */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    mb: 4,
                    fontSize: '1.5rem',
                  }}
                >
                  Backend & Database
                </Typography>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 3,
                  }}
                >
                  <Box className="skill-item" sx={{ textAlign: 'center' }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
                        borderRadius: '15px',
                        color: '#68a063',
                        fontSize: '2.5rem',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 10px 30px rgba(104, 160, 99, 0.3)',
                        },
                      }}
                    >
                      <Terminal sx={{ fontSize: '2.5rem' }} />
                    </Box>
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                      Node.js
                    </Typography>
                  </Box>

                  <Box className="skill-item" sx={{ textAlign: 'center' }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
                        borderRadius: '15px',
                        color: '#4db33d',
                        fontSize: '2.5rem',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 10px 30px rgba(77, 179, 61, 0.3)',
                        },
                      }}
                    >
                      <Storage sx={{ fontSize: '2.5rem' }} />
                    </Box>
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                      MongoDB
                    </Typography>
                  </Box>

                  <Box className="skill-item" sx={{ textAlign: 'center' }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
                        borderRadius: '15px',
                        color: '#336791',
                        fontSize: '2.5rem',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 10px 30px rgba(51, 103, 145, 0.3)',
                        },
                      }}
                    >
                      <DataObject sx={{ fontSize: '2.5rem' }} />
                    </Box>
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                      MySQL
                    </Typography>
                  </Box>

                  <Box className="skill-item" sx={{ textAlign: 'center' }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
                        borderRadius: '15px',
                        color: '#000000',
                        fontSize: '2.5rem',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 10px 30px rgba(255, 255, 255, 0.1)',
                        },
                      }}
                    >
                      <Speed sx={{ fontSize: '2.5rem' }} />
                    </Box>
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                      Express.js
                    </Typography>
                  </Box>

                  <Box className="skill-item" sx={{ textAlign: 'center' }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
                        borderRadius: '15px',
                        color: '#FF6B6B',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 10px 30px rgba(255, 107, 107, 0.3)',
                        },
                      }}
                    >
                      <Api sx={{ fontSize: '2.5rem' }} />
                    </Box>
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                      REST APIs
                    </Typography>
                  </Box>

                  <Box className="skill-item" sx={{ textAlign: 'center' }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
                        borderRadius: '15px',
                        color: '#fb015b',
                        fontSize: '1.8rem',
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 10px 30px rgba(251, 1, 91, 0.3)',
                        },
                      }}
                    >
                      <VpnKey sx={{ fontSize: '2.5rem' }} />
                    </Box>
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                      JWT Auth
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Tools & Others Section */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    mb: 4,
                    fontSize: '1.5rem',
                  }}
                >
                  Tools & Others
                </Typography>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 3,
                  }}
                >
                  <Box className="skill-item" sx={{ textAlign: 'center' }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
                        borderRadius: '15px',
                        color: '#f05032',
                        fontSize: '2.5rem',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 10px 30px rgba(240, 80, 50, 0.3)',
                        },
                      }}
                    >
                      <GitHub sx={{ fontSize: '2.5rem' }} />
                    </Box>
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                      GitHub
                    </Typography>
                  </Box>

                  <Box className="skill-item" sx={{ textAlign: 'center' }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
                        borderRadius: '15px',
                        color: '#000000',
                        backgroundColor: '#ffffff',
                        fontSize: '2.5rem',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 10px 30px rgba(255, 255, 255, 0.3)',
                        },
                      }}
                    >
                      <Cloud sx={{ fontSize: '2.5rem' }} />
                    </Box>
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                      Vercel
                    </Typography>
                  </Box>

                  <Box className="skill-item" sx={{ textAlign: 'center' }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
                        borderRadius: '15px',
                        color: '#46E3B7',
                        fontSize: '2.5rem',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 10px 30px rgba(70, 227, 183, 0.3)',
                        },
                      }}
                    >
                      <Cloud sx={{ fontSize: '2.5rem' }} />
                    </Box>
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                      Render
                    </Typography>
                  </Box>

                  <Box className="skill-item" sx={{ textAlign: 'center' }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
                        borderRadius: '15px',
                        color: '#007ACC',
                        fontSize: '2.5rem',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 10px 30px rgba(0, 122, 204, 0.3)',
                        },
                      }}
                    >
                      <Computer sx={{ fontSize: '2.5rem' }} />
                    </Box>
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                      VS Code
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
