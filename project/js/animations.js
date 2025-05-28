// Animations functionality

document.addEventListener('DOMContentLoaded', () => {
  // Parallax effect for hero section
  const heroSection = document.querySelector('.hero');
  
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      
      // Only apply parallax if not on mobile
      if (window.innerWidth > 768) {
        heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
      }
    });
  }
  
  // Animate gallery items on hover
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.zIndex = '10';
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.zIndex = '1';
    });
  });
  
  // Fade in elements when they come into view
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Elements to observe
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.classList.add('fade-in-section');
    observer.observe(section);
  });
  
  // Add class for CSS animation
  document.head.insertAdjacentHTML('beforeend', `
    <style>
      .fade-in-section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 1.5s ease, transform 1.5s ease;
      }
      
      .fade-in-section.visible {
        opacity: 1;
        transform: translateY(0);
      }
    </style>
  `);
  
  // Photo gallery hover effect
  const addHoverEffectToGallery = () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
      // Create overlay
      const overlay = document.createElement('div');
      overlay.className = 'gallery-overlay';
      item.appendChild(overlay);
      
      // Style overlay
      const style = document.createElement('style');
      style.textContent = `
        .gallery-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(212, 163, 115, 0.3);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }
      `;
      document.head.appendChild(style);
    });
  };
  
  // Initialize gallery hover effects
  addHoverEffectToGallery();
  
  // Add floating heart animation
  const addFloatingHearts = () => {
    const heartSection = document.querySelector('.hero');
    
    // Only add if hero section exists
    if (heartSection) {
      // Create heart animation container
      const heartsContainer = document.createElement('div');
      heartsContainer.className = 'floating-hearts';
      heartSection.appendChild(heartsContainer);
      
      // Add style
      const style = document.createElement('style');
      style.textContent = `
        .floating-hearts {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
        }
        
        .floating-heart {
          position: absolute;
          color: rgba(255, 107, 107, 0.6);
          font-size: 20px;
          pointer-events: none;
          animation-name: float-heart;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        
        @keyframes float-heart {
          0% {
            transform: translateY(100vh) scale(0.5);
            opacity: 0;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-10vh) scale(1.5);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
      
      // Create floating hearts randomly
      const createHeart = () => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤';
        
        // Random position, size and animation duration
        const startPositionX = Math.random() * 100;
        const size = Math.random() * 20 + 10;
        const duration = Math.random() * 10 + 15;
        
        heart.style.left = `${startPositionX}%`;
        heart.style.fontSize = `${size}px`;
        heart.style.animationDuration = `${duration}s`;
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => {
          heart.remove();
        }, duration * 1000);
      };
      
      // Create hearts at interval
      setInterval(createHeart, 3000);
      
      // Create a few hearts initially
      for (let i = 0; i < 5; i++) {
        setTimeout(createHeart, i * 1500);
      }
    }
  };
  
  // Initialize floating hearts animation
  addFloatingHearts();
});