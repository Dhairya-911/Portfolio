import React, { useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Launch,
  GitHub,
  ArrowForward,
} from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Project } from '../types';
import proImage from '../assets/pro.png';

gsap.registerPlugin(ScrollTrigger);

const Projects: React.FC = () => {
  const projectsRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'Todo List Website',
      description: 'A full-stack application for managing tasks with features like user authentication, real-time updates, and a responsive design.',
      technologies: ['React', 'JavaScript', 'GSAP', 'Anime.js', 'HTML5', 'JWT tokens', 'Bcrypt', 'Cors', 'TypeScript', 'Node.js', 'MongoDB', 'Express', 'Material-UI'],
      image: proImage,
      githubUrl: 'https://github.com/Dhairya-911/todo-List-website',
    },
  ];

  useEffect(() => {
    // Animate projects section
    gsap.fromTo(
      projectsRef.current,
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
          trigger: projectsRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Animate project cards
    gsap.fromTo(
      '.project-card',
      {
        opacity: 0,
        y: 30,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Add hover animations
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -10,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    });
  }, []);

  return (
    <Box
      id="projects"
      ref={projectsRef}
      sx={{
        py: 8,
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      }}
    >
      <Container maxWidth="lg">
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
          Featured Projects
        </Typography>
        
        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            mb: 6,
            maxWidth: '600px',
            mx: 'auto',
          }}
        >
          Here are some of my recent projects that showcase my skills and experience
          in full-stack development, UI/UX design, and modern web technologies.
        </Typography>

        <Box
          className="projects-grid"
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
            gap: 4,
            mb: 6,
          }}
        >
          {projects.map((project) => (
            <Card
              key={project.id}
              className="project-card"
              sx={{
                background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
                borderRadius: '15px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 12px 40px rgba(0, 212, 255, 0.2)',
                },
              }}
            >
              <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                <CardMedia
                  component="img"
                  image={project.image}
                  alt={project.title}
                  sx={{
                    height: 200,
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    display: 'flex',
                    gap: 1,
                  }}
                >
                  {project.liveUrl && (
                    <IconButton
                      component="a"
                      href={project.liveUrl}
                      target="_blank"
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(0, 212, 255, 0.2)',
                        color: 'primary.main',
                        '&:hover': {
                          backgroundColor: 'primary.main',
                          color: 'white',
                        },
                      }}
                    >
                      <Launch fontSize="small" />
                    </IconButton>
                  )}
                  {project.githubUrl && (
                    <IconButton
                      component="a"
                      href={project.githubUrl}
                      target="_blank"
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'white',
                          color: 'black',
                        },
                      }}
                    >
                      <GitHub fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              </Box>

              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    mb: 2,
                  }}
                >
                  {project.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.6,
                    mb: 3,
                    minHeight: '72px',
                  }}
                >
                  {project.description}
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 1,
                    }}
                  >
                    {project.technologies.map((tech, index) => (
                      <Chip
                        key={index}
                        label={tech}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(0, 212, 255, 0.1)',
                          color: 'primary.main',
                          border: '1px solid rgba(0, 212, 255, 0.3)',
                          fontSize: '0.75rem',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 212, 255, 0.2)',
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* View More Projects Button */}
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            size="large"
            component="a"
            href="https://github.com/Dhairya-911"
            target="_blank"
            startIcon={<GitHub />}
            sx={{
              background: 'linear-gradient(45deg, #00d4ff, #0093c4)',
              '&:hover': {
                background: 'linear-gradient(45deg, #0093c4, #00d4ff)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            View More on GitHub
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Projects;
