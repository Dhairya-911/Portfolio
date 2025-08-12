import React, { useState, useEffect } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import {
  Home,
  Person,
  Code,
  Work,
  Email,
} from '@mui/icons-material';
import { gsap } from 'gsap';

interface DockItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

const Dock: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [scrollTimer, setScrollTimer] = useState<number | null>(null);

  const dockItems: DockItem[] = [
    { icon: Home, label: 'Home', href: '#home' },
    { icon: Person, label: 'About', href: '#about' },
    { icon: Code, label: 'Skills', href: '#skills' },
    { icon: Work, label: 'Projects', href: '#projects' },
    { icon: Email, label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    // Animate dock on load
    gsap.fromTo(
      '.dock-container',
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'back.out(1.7)' }
    );

    // Scroll listener for active section detection and fading animation
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for better detection
      
      // Set scrolling state and animate opacity
      setIsScrolling(true);
      gsap.to('.dock-container', {
        opacity: 0.4,
        duration: 0.2,
        ease: 'power2.out',
      });
      
      // Clear existing timer
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }
      
      // Set new timer to detect scroll end
      const newTimer = window.setTimeout(() => {
        setIsScrolling(false);
        gsap.to('.dock-container', {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      }, 150); // 150ms delay after scroll stops
      
      setScrollTimer(newTimer);
      
      // Active section detection
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Check initial position
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }
    };
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    
    // Ensure dock is fully visible when hovering
    gsap.to('.dock-container', {
      opacity: 1,
      duration: 0.2,
      ease: 'power2.out',
    });
    
    // Scale animation for hovered item
    gsap.to(`.dock-item-${index}`, {
      scale: 1.4,
      duration: 0.3,
      ease: 'back.out(1.7)',
    });

    // Scale adjacent items
    if (index > 0) {
      gsap.to(`.dock-item-${index - 1}`, {
        scale: 1.2,
        duration: 0.3,
        ease: 'back.out(1.7)',
      });
    }
    if (index < dockItems.length - 1) {
      gsap.to(`.dock-item-${index + 1}`, {
        scale: 1.2,
        duration: 0.3,
        ease: 'back.out(1.7)',
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    
    // Reset all items to normal scale
    dockItems.forEach((_, index) => {
      gsap.to(`.dock-item-${index}`, {
        scale: 1,
        duration: 0.3,
        ease: 'back.out(1.7)',
      });
    });
    
    // Return to scroll-based opacity if currently scrolling
    if (isScrolling) {
      gsap.to('.dock-container', {
        opacity: 0.4,
        duration: 0.2,
        ease: 'power2.out',
      });
    }
  };

  const handleDockMouseEnter = () => {
    // Ensure dock is fully visible when hovering over the container
    gsap.to('.dock-container', {
      opacity: 1,
      duration: 0.2,
      ease: 'power2.out',
    });
  };

  const handleDockMouseLeave = () => {
    // Return to scroll-based opacity if currently scrolling
    if (isScrolling) {
      gsap.to('.dock-container', {
        opacity: 0.4,
        duration: 0.2,
        ease: 'power2.out',
      });
    }
  };

  return (
    <Box
      className="dock-container"
      sx={{
        position: 'fixed',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        background: 'rgba(26, 26, 26, 0.8)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '8px 16px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      }}
      onMouseEnter={handleDockMouseEnter}
      onMouseLeave={handleDockMouseLeave}
    >
      {dockItems.map((item, index) => {
        const sectionName = item.href.replace('#', '');
        const isActive = activeSection === sectionName;
        
        return (
          <Tooltip key={index} title={item.label} placement="top">
            <IconButton
              className={`dock-item-${index}`}
              onClick={() => handleNavClick(item.href)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              sx={{
                width: 48,
                height: 48,
                borderRadius: '12px',
                background: isActive
                  ? 'linear-gradient(45deg, #00d4ff, #ff6b9d)'
                  : hoveredIndex === index 
                    ? 'linear-gradient(45deg, #00d4ff, #ff6b9d)'
                    : 'transparent',
                color: (isActive || hoveredIndex === index) ? 'white' : 'text.primary',
                transition: 'all 0.3s ease',
                border: isActive ? '2px solid rgba(0, 212, 255, 0.5)' : 'none',
                boxShadow: isActive ? '0 0 20px rgba(0, 212, 255, 0.3)' : 'none',
                '&:hover': {
                  background: 'linear-gradient(45deg, #00d4ff, #ff6b9d)',
                  color: 'white',
                },
                '& .MuiSvgIcon-root': {
                  fontSize: '1.5rem',
                },
              }}
            >
              <item.icon />
            </IconButton>
          </Tooltip>
        );
      })}
    </Box>
  );
};

export default Dock;
