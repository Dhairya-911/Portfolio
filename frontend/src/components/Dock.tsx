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
  const [activeSection, setActiveSection] = useState<string>('home');
  const activeSectionRef = useRef<string>('home');
  const isProcessingRef = useRef<boolean>(false);
  const animationTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const dockItems: DockItem[] = [
    { icon: Home, label: 'Home', href: '#home' },
    { icon: Person, label: 'About', href: '#about' },
    { icon: Code, label: 'Skills', href: '#skills' },
    { icon: Work, label: 'Projects', href: '#projects' },
    { icon: Email, label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    // Optimized dock entrance animation
    gsap.set('.dock-container', { 
      y: 100, 
      opacity: 0,
      scale: 0.8,
      transformOrigin: 'center bottom'
    });
    
    gsap.to('.dock-container', {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      delay: 0.3,
      ease: 'back.out(1.4)',
      force3D: true, // GPU acceleration
    });

    // Simplified Intersection Observer
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.5,
    };

    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    const sectionElements = sections.map(id => document.getElementById(id)).filter(el => el !== null);

    const observer = new IntersectionObserver((entries) => {
      if (isProcessingRef.current) return;
      isProcessingRef.current = true;
      
      setTimeout(() => {
        const visibleEntries = entries
          .filter(entry => entry.isIntersecting && entry.intersectionRatio > 0.3)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        
        if (visibleEntries.length > 0) {
          const sectionId = visibleEntries[0].target.id;
          
          if (sectionId !== activeSectionRef.current) {
            activeSectionRef.current = sectionId;
            setActiveSection(sectionId);
            
            const activeItemIndex = dockItems.findIndex(item => 
              item.href === `#${sectionId}`
            );
            
            if (activeItemIndex !== -1) {
              // Kill any existing timeline
              if (animationTimelineRef.current) {
                animationTimelineRef.current.kill();
              }
              
              // Simple active item animation
              gsap.set(dockItems.map((_, index) => `.dock-item-${index}`), {
                scale: 1,
                y: 0,
              });
              
              gsap.to(`.dock-item-${activeItemIndex}`, {
                scale: 1.2,
                y: -2,
                duration: 0.3,
                ease: 'back.out(1.2)',
                force3D: true,
              });
            }
          }
        }
        
        isProcessingRef.current = false;
      }, 100);
    }, observerOptions);

    // Observe all sections
    sectionElements.forEach(section => {
      observer.observe(section);
    });

    // Cleanup function
    return () => {
      if (animationTimelineRef.current) {
        animationTimelineRef.current.kill();
      }
      observer.disconnect();
    };
  }, [dockItems]);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Manually update active section when clicking
      const sectionName = href.replace('#', '');
      activeSectionRef.current = sectionName;
      setActiveSection(sectionName);
    }
  };

  const handleMouseEnter = useCallback((index: number) => {
    if (hoveredIndex === index) return;
    setHoveredIndex(index);
    
    // Kill any existing animations to prevent conflicts
    if (animationTimelineRef.current) {
      animationTimelineRef.current.kill();
    }
    
    // Simple hover animation without complex effects
    gsap.to(`.dock-item-${index}`, {
      scale: 1.4,
      y: -4,
      duration: 0.25,
      ease: 'power2.out',
      force3D: true,
    });
    
    // Subtle effect on adjacent items
    if (index > 0) {
      gsap.to(`.dock-item-${index - 1}`, {
        scale: 1.1,
        duration: 0.2,
        ease: 'power2.out',
        force3D: true,
      });
    }
    
    if (index < dockItems.length - 1) {
      gsap.to(`.dock-item-${index + 1}`, {
        scale: 1.1,
        duration: 0.2,
        ease: 'power2.out',
        force3D: true,
      });
    }
  }, [hoveredIndex, dockItems.length]);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
    
    // Reset all items to their appropriate states
    dockItems.forEach((item, index) => {
      const sectionName = item.href.replace('#', '');
      const isActive = activeSection === sectionName;
      
      gsap.to(`.dock-item-${index}`, {
        scale: isActive ? 1.2 : 1,
        y: isActive ? -2 : 0,
        duration: 0.3,
        ease: 'power2.out',
        force3D: true,
      });
    });
  }, [activeSection, dockItems]);

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
                width: 50,
                height: 50,
                borderRadius: '15px',
                background: isActive
                  ? 'linear-gradient(135deg, #00d4ff, #ff6b9d)'
                  : hoveredIndex === index 
                    ? 'linear-gradient(135deg, #00d4ff, #ff6b9d)'
                    : 'transparent',
                color: (isActive || hoveredIndex === index) ? 'white' : 'text.primary',
                transition: 'background 0.2s ease, color 0.2s ease',
                border: isActive ? '2px solid rgba(0, 212, 255, 0.6)' : '2px solid transparent',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                '&:hover': {
                  background: 'linear-gradient(135deg, #00d4ff, #ff6b9d)',
                  color: 'white',
                },
                '& .MuiSvgIcon-root': {
                  fontSize: '1.6rem',
                  transition: 'none', // Remove transitions to prevent conflicts
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
