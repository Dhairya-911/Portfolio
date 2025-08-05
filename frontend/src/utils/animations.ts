import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// GSAP Animation Utilities
export class GSAPAnimations {
  static fadeInUp(element: string | Element, delay = 0) {
    return gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay,
        ease: 'power2.out',
      }
    );
  }

  static fadeInLeft(element: string | Element, delay = 0) {
    return gsap.fromTo(
      element,
      {
        opacity: 0,
        x: -50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay,
        ease: 'power2.out',
      }
    );
  }

  static fadeInRight(element: string | Element, delay = 0) {
    return gsap.fromTo(
      element,
      {
        opacity: 0,
        x: 50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay,
        ease: 'power2.out',
      }
    );
  }

  static staggerAnimation(elements: string | Element[], delay = 0.2) {
    return gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: delay,
        ease: 'power2.out',
      }
    );
  }

  static scrollTriggerAnimation(
    element: string | Element,
    animationProps: gsap.TweenVars
  ) {
    return gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 50,
      },
      {
        ...animationProps,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }

  static parallaxEffect(element: string | Element, speed = 0.5) {
    return gsap.to(element, {
      yPercent: -50 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  static bounceIn(element: string | Element) {
    return gsap.fromTo(
      element,
      {
        scale: 0,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'elastic.out(1, 0.8)',
      }
    );
  }

  static slideInUp(element: string | Element, delay = 0) {
    return gsap.fromTo(
      element,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay,
        ease: 'power3.out',
      }
    );
  }

  static rotateIn(element: string | Element) {
    return gsap.fromTo(
      element,
      {
        rotation: 180,
        opacity: 0,
      },
      {
        rotation: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
      }
    );
  }

  static scaleIn(element: string | Element, delay = 0) {
    return gsap.fromTo(
      element,
      {
        scale: 0.8,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        delay,
        ease: 'power4.out',
      }
    );
  }

  static morphing(element: string | Element) {
    return gsap.to(element, {
      scale: 1.1,
      duration: 1,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  }
}

// Combined animation utilities
export const AnimationUtils = {
  // Initialize animations on page load
  initPageAnimations() {
    // Smooth scroll behavior
    gsap.to(window, { duration: 0.5, scrollTo: { y: 0, autoKill: false } });
  },

  // Animate elements when they come into view
  observeElements(selector: string, animation: () => void) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animation();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(selector).forEach((el) => {
      observer.observe(el);
    });
  },

  // Create timeline for complex animations
  createTimeline() {
    return gsap.timeline();
  },
};
