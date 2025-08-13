import React, { useState, useEffect, useCallback, useRef } from 'react';
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

  const dockItems: DockItem[] = [
    { icon: Home, label: 'Home', href: '#home' },
    { icon: Person, label: 'About', href: '#about' },
    { icon: Code, label: 'Skills', href: '#skills' },
    { icon: Work, label: 'Projects', href: '#projects' },
    { icon: Email, label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    // Simple entrance animation only
    gsap.set('.dock-container', { 
      y: 100, 
      opacity: 0,
    });
    
    gsap.to('.dock-container', {
      y: 0,
      opacity: 1,
      duration: 0.8,
      delay: 0.5,
      ease: 'back.out(1.4)',
    });
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleMouseEnter = useCallback((index: number) => {
    if (hoveredIndex === index) return;
    setHoveredIndex(index);
    
    // Simple hover animation
    gsap.to(`.dock-item-${index}`, {
      scale: 1.3,
      y: -5,
      duration: 0.2,
      ease: 'power2.out',
    });
    
    // Small effect on adjacent items
    if (index > 0) {
      gsap.to(`.dock-item-${index - 1}`, {
        scale: 1.05,
        duration: 0.2,
        ease: 'power2.out',
      });
    }
    
    if (index < dockItems.length - 1) {
      gsap.to(`.dock-item-${index + 1}`, {
        scale: 1.05,
        duration: 0.2,
        ease: 'power2.out',
      });
    }
  }, [hoveredIndex, dockItems.length]);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
    
    // Reset all items to normal state
    dockItems.forEach((item, index) => {
      gsap.to(`.dock-item-${index}`, {
        scale: 1,
        y: 0,
        duration: 0.25,
        ease: 'power2.out',
      });
    });
  }, [dockItems]);

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
        background: 'rgba(26, 26, 26, 0.85)',
        backdropFilter: 'blur(25px) saturate(1.2)',
        borderRadius: '25px',
        padding: '10px 20px',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        willChange: 'transform', // Optimize for animations
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: '1px',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
          borderRadius: 'inherit',
          pointerEvents: 'none',
        },
      }}
    >
      {dockItems.map((item, index) => {
        return (
          <Tooltip key={index} title={item.label} placement="top">
            <IconButton
              className={`dock-item dock-item-${index}`}
              onClick={() => handleNavClick(item.href)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              sx={{
                width: 50,
                height: 50,
                borderRadius: '15px',
                background: hoveredIndex === index 
                  ? 'linear-gradient(135deg, #00d4ff, #ff6b9d)'
                  : 'transparent',
                color: hoveredIndex === index ? 'white' : 'text.primary',
                transition: 'background 0.2s ease, color 0.2s ease',
                border: '2px solid transparent',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                '&:hover': {
                  background: 'linear-gradient(135deg, #00d4ff, #ff6b9d)',
                  color: 'white',
                },
                '& .MuiSvgIcon-root': {
                  fontSize: '1.6rem',
                  transition: 'none',
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
