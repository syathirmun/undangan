// Personalization features

document.addEventListener('DOMContentLoaded', () => {
  // URL parameter parsing function
  function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  // Get guest name from URL parameter
  const guestNameParam = getUrlParameter('to');
  const guestNameElement = document.getElementById('guest-name');
  
  // Update guest name if provided
  if (guestNameParam && guestNameElement) {
    guestNameElement.textContent = guestNameParam;
    
    // Also update the name field in the RSVP form if it exists
    const nameInput = document.getElementById('name');
    if (nameInput) {
      nameInput.value = guestNameParam;
    }
  }

  // Function to generate shareable invitation links
  function generateShareableLink(guestName) {
    // Get current URL and add guest parameter
    const currentUrl = window.location.href.split('?')[0]; // Remove any existing parameters
    return `${currentUrl}?to=${encodeURIComponent(guestName)}`;
  }

  // Create URL generator in the page
  function createShareableLinkGenerator() {
    // Create link generator section
    const container = document.createElement('div');
    container.className = 'share-container';
    container.innerHTML = `
      <div class="share-section">
        <h3>Create Personalized Invitation</h3>
        <div class="share-form">
          <input type="text" id="friend-name" placeholder="Enter friend's name">
          <button id="generate-link" class="btn-gift">Generate Link</button>
        </div>
        <div class="generated-link-container" style="display: none;">
          <p>Share this link with <span id="friend-name-display"></span>:</p>
          <div class="link-box">
            <input type="text" id="generated-link" readonly>
            <button id="copy-link" class="btn-gift">Copy</button>
          </div>
        </div>
      </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .share-section {
        margin: var(--space-xxl) auto;
        max-width: 600px;
        padding: var(--space-lg);
        background-color: var(--secondary-color);
        border-radius: 8px;
        text-align: center;
      }
      
      .share-form {
        display: flex;
        gap: var(--space-sm);
        margin: var(--space-md) 0;
      }
      
      .share-form input {
        flex: 1;
        padding: var(--space-sm);
        border: 1px solid var(--border-color);
        border-radius: 4px;
        font-family: 'Montserrat', sans-serif;
      }
      
      .generated-link-container {
        margin-top: var(--space-md);
        padding: var(--space-md);
        background-color: rgba(212, 163, 115, 0.1);
        border-radius: 8px;
      }
      
      .link-box {
        display: flex;
        gap: var(--space-sm);
        margin-top: var(--space-sm);
      }
      
      .link-box input {
        flex: 1;
        padding: var(--space-sm);
        border: 1px solid var(--border-color);
        border-radius: 4px;
        font-family: 'Montserrat', sans-serif;
        background-color: white;
      }
      
      @media (max-width: 576px) {
        .share-form, .link-box {
          flex-direction: column;
        }
      }
    `;
    document.head.appendChild(style);
    
    // Append to gifts section
    const giftsSection = document.querySelector('.gifts .container');
    if (giftsSection) {
      giftsSection.appendChild(container);
      
      // Add event listeners
      const generateLinkBtn = document.getElementById('generate-link');
      const friendNameInput = document.getElementById('friend-name');
      const generatedLinkContainer = document.querySelector('.generated-link-container');
      const generatedLinkInput = document.getElementById('generated-link');
      const friendNameDisplay = document.getElementById('friend-name-display');
      const copyLinkBtn = document.getElementById('copy-link');
      
      // Generate link button click
      if (generateLinkBtn) {
        generateLinkBtn.addEventListener('click', () => {
          const friendName = friendNameInput.value.trim();
          if (friendName) {
            const link = generateShareableLink(friendName);
            generatedLinkInput.value = link;
            friendNameDisplay.textContent = friendName;
            generatedLinkContainer.style.display = 'block';
          } else {
            alert('Please enter a name');
          }
        });
      }
      
      // Copy link button click
      if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', () => {
          generatedLinkInput.select();
          document.execCommand('copy');
          copyLinkBtn.textContent = 'Copied!';
          setTimeout(() => {
            copyLinkBtn.textContent = 'Copy';
          }, 2000);
        });
      }
    }
  }
  
  // Initialize shareable link generator
  createShareableLinkGenerator();
  
  // Function to customize page title with guest name
  function customizePageTitle() {
    if (guestNameParam) {
      document.title = `Wedding Invitation for ${guestNameParam} | Hafidz & Muthiah`;
    }
  }
  
  // Initialize page title customization
  customizePageTitle();
  
  // Function to create a custom greeting based on time of day
  function customGreeting() {
    const greetingElement = document.querySelector('.greeting');
    if (!greetingElement) return;
    
    const hour = new Date().getHours();
    let greeting = 'Wedding Invitation';
    
    if (hour >= 5 && hour < 12) {
      greeting = 'Good Morning';
    } else if (hour >= 12 && hour < 18) {
      greeting = 'Good Afternoon';
    } else {
      greeting = 'Good Evening';
    }
    
    greetingElement.textContent = greeting;
  }
  
  // Initialize custom greeting
  customGreeting();
});