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
    // Initial entrance animation
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

    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      const observerOptions = {
        root: null,
        rootMargin: '-10% 0px -10% 0px',
        threshold: [0.1, 0.5, 0.9],
      };

      const sections = document.querySelectorAll('#home, #about, #skills, #projects, #contact');
      
      const observer = new IntersectionObserver((entries) => {
        if (isProcessingRef.current) return;
        
        let maxRatio = 0;
        let activeEntry: IntersectionObserverEntry | null = null;
        
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            activeEntry = entry;
          }
        });
        
        if (activeEntry && maxRatio > 0.1) {
          const sectionId = activeEntry.target.id;
          
          if (sectionId !== activeSectionRef.current) {
            isProcessingRef.current = true;
            activeSectionRef.current = sectionId;
            setActiveSection(sectionId);
            
            const activeItemIndex = dockItems.findIndex(item => 
              item.href === `#${sectionId}`
            );
            
            if (activeItemIndex !== -1) {
              // Reset all items
              gsap.set('.dock-item', {
                scale: 1,
                y: 0,
              });
              
              // Animate active item
              gsap.to(`.dock-item-${activeItemIndex}`, {
                scale: 1.15,
                y: -3,
                duration: 0.3,
                ease: 'back.out(1.3)',
              });
            }
            
            setTimeout(() => {
              isProcessingRef.current = false;
            }, 200);
          }
        }
      }, observerOptions);

      // Observe all sections
      sections.forEach(section => observer.observe(section));

      // Cleanup function
      return () => {
        observer.disconnect();
        if (animationTimelineRef.current) {
          animationTimelineRef.current.kill();
        }
      };
    }, 1000); // Wait 1 second for all components to mount

    return () => {
      clearTimeout(timer);
    };
  }, [dockItems]);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Manually update active section
      const sectionName = href.replace('#', '');
      activeSectionRef.current = sectionName;
      setActiveSection(sectionName);
      
      // Animate the clicked item immediately
      const activeItemIndex = dockItems.findIndex(item => item.href === href);
      if (activeItemIndex !== -1) {
        gsap.set('.dock-item', { scale: 1, y: 0 });
        gsap.to(`.dock-item-${activeItemIndex}`, {
          scale: 1.15,
          y: -3,
          duration: 0.3,
          ease: 'back.out(1.3)',
        });
      }
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
    
    // Reset all items to their appropriate states
    dockItems.forEach((item, index) => {
      const sectionName = item.href.replace('#', '');
      const isActive = activeSection === sectionName;
      
      gsap.to(`.dock-item-${index}`, {
        scale: isActive ? 1.15 : 1,
        y: isActive ? -3 : 0,
        duration: 0.25,
        ease: 'power2.out',
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
              className={`dock-item dock-item-${index}`}
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
