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

    // Optimized Intersection Observer for better performance
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -30% 0px', // Balanced detection zone
      threshold: [0, 0.25, 0.5, 0.75], // More granular thresholds for smoother transitions
    };

    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    const sectionElements = sections.map(id => document.getElementById(id)).filter(el => el !== null);

    // Optimized animation function with batching
    const animateActiveItem = (activeItemIndex: number) => {
      // Create a timeline for batched animations
      const tl = gsap.timeline();
      
      // Batch all scale resets
      const resetTargets = dockItems.map((_, index) => `.dock-item-${index}`);
      tl.to(resetTargets, {
        scale: 1,
        duration: 0.25,
        ease: 'power2.out',
        stagger: 0.02,
        force3D: true,
      });
      
      // Animate active item with enhanced effects
      tl.to(`.dock-item-${activeItemIndex}`, {
        scale: 1.25,
        y: -3,
        duration: 0.35,
        ease: 'back.out(1.5)',
        force3D: true,
      }, '-=0.15');
      
      // Enhanced glow animation with better performance
      tl.to(`.dock-item-${activeItemIndex} .MuiSvgIcon-root`, {
        filter: 'drop-shadow(0 0 12px rgba(0, 212, 255, 0.8)) drop-shadow(0 0 25px rgba(0, 212, 255, 0.4))',
        duration: 0.3,
        ease: 'power2.out',
      }, '-=0.2');
      
      // Remove glow from other items (batched)
      const otherTargets = dockItems
        .map((_, index) => index !== activeItemIndex ? `.dock-item-${index} .MuiSvgIcon-root` : null)
        .filter(Boolean);
      
      if (otherTargets.length > 0) {
        tl.to(otherTargets, {
          filter: 'none',
          duration: 0.25,
          ease: 'power2.out',
          stagger: 0.01,
        }, '-=0.25');
      }
      
      return tl;
    };

    const observer = new IntersectionObserver((entries) => {
      // Debounce rapid intersection changes
      if (isProcessingRef.current) return;
      isProcessingRef.current = true;
      
      requestAnimationFrame(() => {
        // Sort entries by intersection ratio to prioritize the most visible section
        const visibleEntries = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        
        if (visibleEntries.length > 0) {
          const mostVisibleEntry = visibleEntries[0];
          const sectionId = mostVisibleEntry.target.id;
          
          // Enhanced nested section handling
          if (sectionId === 'skills') {
            const aboutSection = document.getElementById('about');
            const skillsSection = document.getElementById('skills');
            
            if (aboutSection && skillsSection) {
              const aboutRect = aboutSection.getBoundingClientRect();
              const skillsRect = skillsSection.getBoundingClientRect();
              
              // More sophisticated positioning logic
              const viewportCenter = window.innerHeight / 2;
              const aboutProgress = Math.max(0, Math.min(1, (viewportCenter - aboutRect.top) / aboutRect.height));
              
              if (aboutProgress < 0.6) {
                isProcessingRef.current = false;
                return;
              }
            }
          }
          
          if (sectionId !== activeSectionRef.current) {
            activeSectionRef.current = sectionId;
            setActiveSection(sectionId);
            
            const activeItemIndex = dockItems.findIndex(item => 
              item.href === `#${sectionId}`
            );
            
            if (activeItemIndex !== -1) {
              animateActiveItem(activeItemIndex);
            }
          }
        }
        
        isProcessingRef.current = false;
      });
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
    if (hoveredIndex === index) return; // Avoid redundant animations
    setHoveredIndex(index);
    
    // Create optimized hover animation timeline
    const tl = gsap.timeline();
    
    // Enhanced hover effect with micro-interactions
    tl.to(`.dock-item-${index}`, {
      scale: 1.5,
      y: -5,
      duration: 0.35,
      ease: 'back.out(1.6)',
      force3D: true,
    });
    
    // Subtle magnetic effect on adjacent items
    if (index > 0) {
      tl.to(`.dock-item-${index - 1}`, {
        scale: 1.15,
        x: 3,
        y: -2,
        duration: 0.3,
        ease: 'power2.out',
        force3D: true,
      }, '-=0.25');
    }
    
    if (index < dockItems.length - 1) {
      tl.to(`.dock-item-${index + 1}`, {
        scale: 1.15,
        x: -3,
        y: -2,
        duration: 0.3,
        ease: 'power2.out',
        force3D: true,
      }, '-=0.25');
    }
    
    // Enhanced glow on hover
    tl.to(`.dock-item-${index} .MuiSvgIcon-root`, {
      filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 30px rgba(0, 212, 255, 0.5))',
      duration: 0.25,
      ease: 'power2.out',
    }, '-=0.2');
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    
    // Create optimized leave animation timeline
    const tl = gsap.timeline();
    
    // Reset all items with staggered animation for smooth effect
    const allTargets = dockItems.map((_, index) => `.dock-item-${index}`);
    
    tl.to(allTargets, {
      scale: (index: number) => {
        const sectionName = dockItems[index].href.replace('#', '');
        return activeSection === sectionName ? 1.25 : 1; // Return to active state or normal
      },
      x: 0,
      y: (index: number) => {
        const sectionName = dockItems[index].href.replace('#', '');
        return activeSection === sectionName ? -3 : 0; // Maintain active lift
      },
      duration: 0.4,
      ease: 'back.out(1.3)',
      stagger: 0.03,
      force3D: true,
    });
    
    // Reset icon filters
    const iconTargets = dockItems.map((_, index) => `.dock-item-${index} .MuiSvgIcon-root`);
    tl.to(iconTargets, {
      filter: (index: number) => {
        const sectionName = dockItems[index].href.replace('#', '');
        return activeSection === sectionName ? 
          'drop-shadow(0 0 12px rgba(0, 212, 255, 0.8)) drop-shadow(0 0 25px rgba(0, 212, 255, 0.4))' : 
          'none';
      },
      duration: 0.3,
      ease: 'power2.out',
      stagger: 0.02,
    }, '-=0.3');
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
                transition: 'background 0.3s cubic-bezier(0.4, 0, 0.2, 1), color 0.3s ease',
                border: isActive ? '2px solid rgba(0, 212, 255, 0.6)' : '2px solid transparent',
                boxShadow: isActive 
                  ? '0 0 25px rgba(0, 212, 255, 0.4), 0 0 50px rgba(0, 212, 255, 0.2)' 
                  : hoveredIndex === index 
                    ? '0 0 20px rgba(0, 212, 255, 0.3)'
                    : 'none',
                willChange: 'transform, filter', // Optimize for animations
                backfaceVisibility: 'hidden', // Prevent flickering
                perspective: 1000, // 3D optimizations
                '&:hover': {
                  background: 'linear-gradient(135deg, #00d4ff, #ff6b9d)',
                  color: 'white',
                  transform: 'none', // Let GSAP handle transforms
                },
                '&:active': {
                  transform: 'scale(0.95)',
                  transition: 'transform 0.1s ease',
                },
                '& .MuiSvgIcon-root': {
                  fontSize: '1.6rem',
                  transition: 'filter 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  willChange: 'filter',
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
