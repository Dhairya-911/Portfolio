import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  Alert,
  Snackbar,
  IconButton,
} from '@mui/material';
import {
  Email,
  LocationOn,
  Send,
  GitHub,
  LinkedIn,
  Instagram
} from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GSAPAnimations } from '../utils/animations';
import type { ContactFormData } from '../types';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');

  const contactRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate section on scroll
    gsap.fromTo(
      contactRef.current,
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
          trigger: contactRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Stagger animation for form and info
    gsap.fromTo(
      [formRef.current, infoRef.current],
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
          trigger: contactRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Animate contact info items
    GSAPAnimations.slideInUp('.contact-info-item', 0.2);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setAlertMessage('Please fill in all fields');
      setAlertSeverity('error');
      setShowAlert(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setAlertMessage('Message sent successfully! I\'ll get back to you soon.');
        setAlertSeverity('success');
        setShowAlert(true);
        
        setFormData({
          name: '',
          email: '',
          message: '',
        });

        // Animate success
        GSAPAnimations.bounceIn('.submit-button');
      } else {
        // Handle validation errors or other issues
        const errorMessage = result.errors 
          ? result.errors.map((err: any) => err.msg).join(', ')
          : result.message || 'Failed to send message. Please try again.';
        
        setAlertMessage(errorMessage);
        setAlertSeverity('error');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setAlertMessage('Network error. Please check your connection and try again.');
      setAlertSeverity('error');
      setShowAlert(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Email,
      title: 'Email',
      value: 'dvsolankilm30@gmail.com',
      link: 'mailto:dvsolankilm30@gmail.com',
    },
    {
      icon: LocationOn,
      title: 'Location',
      value: 'Vadodara, Gujarat, India',
      link: null,
    },
  ];

  return (
    <Box
      id="contact"
      ref={contactRef}
      sx={{
        py: 8,
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        position: 'relative',
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
          Get In Touch
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
          Have a project in mind or want to collaborate? I'd love to hear from you!
          Send me a message and I'll respond as soon as possible.
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            alignItems: 'stretch',
          }}
        >
          {/* Contact Form */}
          <Paper
            ref={formRef}
            elevation={3}
            sx={{
              flex: 1,
              p: 4,
              background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
              borderRadius: '15px',
            }}
          >
            <Typography
              variant="h4"
              component="h3"
              sx={{
                mb: 3,
                color: 'primary.main',
                fontWeight: 'bold',
              }}
            >
              Send Message
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                fullWidth
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                variant="outlined"
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                      },
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                label="Your Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                variant="outlined"
                required
              />

              <TextField
                fullWidth
                label="Your Message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                variant="outlined"
                multiline
                rows={6}
                required
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting}
                className="submit-button"
                startIcon={<Send />}
                sx={{
                  mt: 2,
                  py: 1.5,
                  fontSize: '1.1rem',
                  background: isSubmitting 
                    ? 'rgba(0, 212, 255, 0.5)' 
                    : 'linear-gradient(45deg, #00d4ff, #0093c4)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #0093c4, #00d4ff)',
                    transform: 'translateY(-2px)',
                  },
                  '&:disabled': {
                    background: 'rgba(0, 212, 255, 0.3)',
                  },
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </Box>
          </Paper>

          {/* Contact Information */}
          <Box
            ref={infoRef}
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            <Typography
              variant="h4"
              component="h3"
              sx={{
                mb: 2,
                color: 'primary.main',
                fontWeight: 'bold',
              }}
            >
              Contact Information
            </Typography>

            {contactInfo.map((info, index) => (
              <Paper
                key={index}
                className="contact-info-item"
                elevation={2}
                sx={{
                  p: 3,
                  background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
                  borderRadius: '10px',
                  transition: 'all 0.3s ease',
                  cursor: info.link ? 'pointer' : 'default',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(0, 212, 255, 0.2)',
                  },
                }}
                onClick={() => info.link && window.open(info.link, '_self')}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: '50%',
                      background: 'linear-gradient(45deg, #00d4ff, #ff6b9d)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <info.icon sx={{ color: 'white', fontSize: '1.5rem' }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ color: 'white', fontWeight: 'bold', mb: 0.5 }}
                    >
                      {info.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: 'text.secondary' }}
                    >
                      {info.value}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            ))}

            {/* Social Links */}
            <Paper
              elevation={2}
              sx={{
                p: 3,
                background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
                borderRadius: '10px',
                mt: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}
              >
                Follow Me
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <IconButton
                  component="a"
                  href="https://github.com/Dhairya-911"
                  target="_blank"
                  sx={{
                    background: 'linear-gradient(45deg, #00d4ff, #0093c4)',
                    color: 'white',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #0093c4, #00d4ff)',
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  <GitHub />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://www.linkedin.com/in/dhairya-solanki-183630190"
                  target="_blank"
                  sx={{
                    background: 'linear-gradient(45deg, #ff6b9d, #c73a6e)',
                    color: 'white',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #c73a6e, #ff6b9d)',
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  <LinkedIn />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://instagram.com/dhairya_911"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    background: 'linear-gradient(45deg, #E4405F, #C13584)',
                    color: 'white',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #C13584, #E4405F)',
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  <Instagram />
                </IconButton>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>

      {/* Success/Error Snackbar */}
      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowAlert(false)}
          severity={alertSeverity}
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
