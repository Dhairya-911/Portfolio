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

    // Use Intersection Observer for more reliable section detection
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // More balanced detection - trigger when 40% visible
      threshold: [0, 0.1, 0.5] // Multiple thresholds for better detection
    };

    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    const sectionElements = sections.map(id => document.getElementById(id)).filter(el => el !== null);

    const observer = new IntersectionObserver((entries) => {
      // Sort entries by intersection ratio to prioritize the most visible section
      const visibleEntries = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      
      if (visibleEntries.length > 0) {
        const mostVisibleEntry = visibleEntries[0];
        const sectionId = mostVisibleEntry.target.id;
        
        // Special handling for nested sections
        // If skills section is visible but about section is also visible,
        // prioritize based on scroll position
        if (sectionId === 'skills') {
          const aboutSection = document.getElementById('about');
          const skillsSection = document.getElementById('skills');
          
          if (aboutSection && skillsSection) {
            const aboutRect = aboutSection.getBoundingClientRect();
            const skillsRect = skillsSection.getBoundingClientRect();
            
            // If we're in the upper part of about section, keep about active
            if (aboutRect.top > -window.innerHeight * 0.5 && aboutRect.top < window.innerHeight * 0.3) {
              return; // Don't change to skills yet
            }
          }
        }
        
        if (sectionId !== activeSectionRef.current) {
          activeSectionRef.current = sectionId;
          setActiveSection(sectionId);
          
          // Find the dock item index for the new active section
          const activeItemIndex = dockItems.findIndex(item => 
            item.href === `#${sectionId}`
          );
          
          // Animate the dock item highlight
          if (activeItemIndex !== -1) {
            // First reset all items
            dockItems.forEach((_, index) => {
              gsap.to(`.dock-item-${index}`, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
              });
            });
            
            // Then highlight the active item
            gsap.to(`.dock-item-${activeItemIndex}`, {
              scale: 1.2,
              duration: 0.4,
              ease: 'back.out(1.7)',
            });
            
            // Add a subtle glow effect
            gsap.to(`.dock-item-${activeItemIndex} .MuiSvgIcon-root`, {
              filter: 'drop-shadow(0 0 10px rgba(0, 212, 255, 0.6))',
              duration: 0.3,
              ease: 'power2.out',
            });
            
            // Remove glow from other items
            dockItems.forEach((_, index) => {
              if (index !== activeItemIndex) {
                gsap.to(`.dock-item-${index} .MuiSvgIcon-root`, {
                  filter: 'none',
                  duration: 0.3,
                  ease: 'power2.out',
                });
              }
            });
          }
        }
      }
    }, observerOptions);

    // Observe all sections
    sectionElements.forEach(section => {
      observer.observe(section);
    });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

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

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    
    // Scale animation for hovered item (but don't interfere with scroll-based highlighting)
    if (hoveredIndex !== index) {
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
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    
    // Reset all items to their scroll-based state
    dockItems.forEach((_, index) => {
      const sectionName = dockItems[index].href.replace('#', '');
      const isActive = activeSection === sectionName;
      
      // Return to scroll-based scale or normal scale
      gsap.to(`.dock-item-${index}`, {
        scale: isActive ? 1.2 : 1,
        duration: 0.3,
        ease: 'back.out(1.7)',
      });
    });
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
                boxShadow: isActive 
                  ? '0 0 20px rgba(0, 212, 255, 0.4), 0 0 40px rgba(0, 212, 255, 0.2)' 
                  : hoveredIndex === index 
                    ? '0 0 15px rgba(0, 212, 255, 0.3)'
                    : 'none',
                transform: isActive ? 'translateY(-2px)' : 'translateY(0px)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #00d4ff, #ff6b9d)',
                  color: 'white',
                },
                '& .MuiSvgIcon-root': {
                  fontSize: '1.5rem',
                  filter: isActive ? 'drop-shadow(0 0 8px rgba(0, 212, 255, 0.6))' : 'none',
                  transition: 'filter 0.3s ease',
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
