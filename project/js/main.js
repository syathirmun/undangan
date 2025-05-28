// Main JavaScript functionality

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const openInvitationBtn = document.getElementById('open-invitation');
  const envelope = document.getElementById('envelope');
  const mainContent = document.getElementById('main-content');
  const showBankBtn = document.getElementById('show-bank');
  const bankDetails = document.getElementById('bank-details');
  const rsvpForm = document.getElementById('rsvp-form');

  // Set Wedding Date
  const weddingDate = new Date('August 15, 2025 09:00:00').getTime();

  // Open Invitation
  if (openInvitationBtn) {
    openInvitationBtn.addEventListener('click', () => {
      envelope.classList.add('hidden');
      mainContent.classList.remove('hidden');
      
      // Scroll to top
      window.scrollTo(0, 0);
      
      // Start animations for elements
      initializeScrollAnimations();
    });
  }

  // Show Bank Details
  if (showBankBtn && bankDetails) {
    showBankBtn.addEventListener('click', () => {
      if (bankDetails.style.display === 'block') {
        bankDetails.style.display = 'none';
        showBankBtn.textContent = 'Bank Details';
      } else {
        bankDetails.style.display = 'block';
        showBankBtn.textContent = 'Hide Details';
      }
    });
  }

  // RSVP Form Submission
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(rsvpForm);
      const formValues = Object.fromEntries(formData.entries());
      
      // In a real application, you would send this data to a server
      console.log('RSVP Submission:', formValues);
      
      // Show confirmation message
      alert('Thank you for your RSVP! We look forward to celebrating with you.');
      
      // Reset form
      rsvpForm.reset();
    });
  }

  // Countdown Timer
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Update countdown elements
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    
    // If countdown is over
    if (distance < 0) {
      clearInterval(countdownInterval);
      document.getElementById('days').textContent = '00';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
    }
  }
  
  // Update countdown every second
  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 1000);

  // Initialize Scroll Animations
  function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-slide-up');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
      observer.observe(element);
    });
  }

  // Add animation classes to elements
  function addAnimationClasses() {
    // Couple section
    document.querySelectorAll('.love-story').forEach(el => el.classList.add('animate-fade-in'));
    
    // Events section
    document.querySelectorAll('.map-container').forEach(el => el.classList.add('animate-fade-in'));
    
    // Gallery
    document.querySelectorAll('.gallery-item').forEach(el => el.classList.add('animate-fade-in'));
    
    // RSVP Message
    document.querySelectorAll('.rsvp-message').forEach(el => el.classList.add('animate-fade-in'));
    
    // Gifts message
    document.querySelectorAll('.gifts-message').forEach(el => el.classList.add('animate-fade-in'));
  }
  
  // Add animation classes
  addAnimationClasses();
  
  // Initialize animations if page is loaded without envelope
  if (window.location.hash || !envelope) {
    envelope.classList.add('hidden');
    mainContent.classList.remove('hidden');
    initializeScrollAnimations();
  }

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});