// Système d'animations inspiré de Framer Motion pour vanilla JS
export class Motion {
  
  // Animation de fade in
  static fadeIn(element, options = {}) {
    const {
      duration = 0.3,
      delay = 0,
      ease = 'ease-out',
      from = { opacity: 0, y: 20 },
      to = { opacity: 1, y: 0 }
    } = options;

    // État initial
    element.style.opacity = from.opacity;
    if (from.y) element.style.transform = `translateY(${from.y}px)`;
    if (from.x) element.style.transform = `translateX(${from.x}px)`;
    if (from.scale) element.style.transform += ` scale(${from.scale})`;

    // Transition CSS
    element.style.transition = `all ${duration}s ${ease} ${delay}s`;

    // Déclenchement de l'animation
    setTimeout(() => {
      element.style.opacity = to.opacity;
      let transform = '';
      if (to.y !== undefined) transform += `translateY(${to.y}px) `;
      if (to.x !== undefined) transform += `translateX(${to.x}px) `;
      if (to.scale !== undefined) transform += `scale(${to.scale}) `;
      element.style.transform = transform.trim();
    }, delay * 1000);

    return element;
  }

  // Animation de scale
  static scale(element, options = {}) {
    const {
      duration = 0.2,
      from = 1,
      to = 1.05,
      ease = 'ease-out'
    } = options;

    element.style.transition = `transform ${duration}s ${ease}`;
    element.style.transform = `scale(${to})`;

    return element;
  }

  // Animation de bounce pour les compteurs
  static bounceCount(element, targetValue, options = {}) {
    const {
      duration = 1000,
      startValue = 0,
      easing = t => t * t * (3 - 2 * t) // smooth step
    } = options;

    let startTime = null;
    const initialValue = parseInt(element.textContent) || startValue;

    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easedProgress = easing(progress);
      const currentValue = Math.round(initialValue + (targetValue - initialValue) * easedProgress);
      
      element.textContent = currentValue;
      
      // Effet de bounce
      const bounceScale = 1 + Math.sin(progress * Math.PI) * 0.1;
      element.style.transform = `scale(${bounceScale})`;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.style.transform = 'scale(1)';
      }
    }

    requestAnimationFrame(animate);
  }

  // Animation de pulsation
  static pulse(element, options = {}) {
    const {
      duration = 2,
      intensity = 0.05
    } = options;

    element.style.animation = `pulse-custom ${duration}s ease-in-out infinite`;
    
    // Créer les keyframes si elles n'existent pas
    if (!document.getElementById('pulse-keyframes')) {
      const style = document.createElement('style');
      style.id = 'pulse-keyframes';
      style.textContent = `
        @keyframes pulse-custom {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(${1 + intensity}); }
        }
      `;
      document.head.appendChild(style);
    }

    return element;
  }

  // Animation de slide in
  static slideIn(element, direction = 'up', options = {}) {
    const {
      duration = 0.4,
      distance = 30,
      delay = 0,
      ease = 'ease-out'
    } = options;

    const transforms = {
      up: `translateY(${distance}px)`,
      down: `translateY(-${distance}px)`,
      left: `translateX(${distance}px)`,
      right: `translateX(-${distance}px)`
    };

    element.style.opacity = '0';
    element.style.transform = transforms[direction];
    element.style.transition = `all ${duration}s ${ease} ${delay}s`;

    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translate(0, 0)';
    }, delay * 1000);

    return element;
  }

  // Animation de hover avec spring
  static hover(element, options = {}) {
    const {
      scale = 1.02,
      duration = 0.2,
      shadow = true
    } = options;

    element.style.transition = `all ${duration}s cubic-bezier(0.4, 0, 0.2, 1)`;
    element.style.cursor = 'pointer';

    element.addEventListener('mouseenter', () => {
      element.style.transform = `scale(${scale})`;
      if (shadow) {
        element.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
      }
    });

    element.addEventListener('mouseleave', () => {
      element.style.transform = 'scale(1)';
      if (shadow) {
        element.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      }
    });

    return element;
  }

  // Animation de stagger pour les listes
  static stagger(elements, animation = 'fadeIn', options = {}) {
    const { delay = 0.1 } = options;

    elements.forEach((element, index) => {
      const animationOptions = {
        ...options,
        delay: delay * index
      };

      switch (animation) {
        case 'fadeIn':
          Motion.fadeIn(element, animationOptions);
          break;
        case 'slideIn':
          Motion.slideIn(element, 'up', animationOptions);
          break;
        default:
          Motion.fadeIn(element, animationOptions);
      }
    });

    return elements;
  }

  // Animation de loading spinner
  static spinner(element, options = {}) {
    const {
      size = 20,
      color = '#3b82f6',
      duration = 1
    } = options;

    element.innerHTML = `
      <div style="
        width: ${size}px;
        height: ${size}px;
        border: 2px solid #f3f4f6;
        border-top-color: ${color};
        border-radius: 50%;
        animation: spin ${duration}s linear infinite;
      "></div>
    `;

    // Ajouter les keyframes si elles n'existent pas
    if (!document.getElementById('spin-keyframes')) {
      const style = document.createElement('style');
      style.id = 'spin-keyframes';
      style.textContent = `
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }

    return element;
  }

  // Animation de success checkmark
  static successCheck(element, options = {}) {
    const {
      size = 24,
      color = '#10b981',
      duration = 0.6
    } = options;

    element.innerHTML = `
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2">
        <path d="m9 12 2 2 4-4" stroke-dasharray="10" stroke-dashoffset="10" style="animation: draw-check ${duration}s ease-out forwards;"/>
        <circle cx="12" cy="12" r="9" stroke-dasharray="57" stroke-dashoffset="57" style="animation: draw-circle ${duration}s ease-out forwards;"/>
      </svg>
    `;

    // Ajouter les keyframes si elles n'existent pas
    if (!document.getElementById('success-keyframes')) {
      const style = document.createElement('style');
      style.id = 'success-keyframes';
      style.textContent = `
        @keyframes draw-circle {
          to { stroke-dashoffset: 0; }
        }
        @keyframes draw-check {
          to { stroke-dashoffset: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    return element;
  }
}

// Utilitaires pour les easings
export const Easings = {
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
};

// Observer pour déclencher les animations au scroll
export class ScrollAnimations {
  constructor() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const animation = element.dataset.animation || 'fadeIn';
          const delay = parseFloat(element.dataset.delay || '0');
          
          Motion[animation](element, { delay });
          this.observer.unobserve(element);
        }
      });
    }, { threshold: 0.1 });
  }

  observe(element, animation = 'fadeIn', delay = 0) {
    element.dataset.animation = animation;
    element.dataset.delay = delay.toString();
    this.observer.observe(element);
  }
}