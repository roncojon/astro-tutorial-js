/**
 * Hamburger menu functionality
 * This script manages the mobile navigation menu toggle
 */

function setupMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  
  if (!hamburger || !mobileNav) {
    console.log('[Menu] Hamburger or mobile nav elements not found');
    return;
  }
  
  // Remove any existing event listeners by cloning the element
  const newHamburger = hamburger.cloneNode(true);
  hamburger.parentNode.replaceChild(newHamburger, hamburger);
  
  // Add fresh event listener
  newHamburger.addEventListener('click', () => {
    newHamburger.classList.toggle('active');
    mobileNav.classList.toggle('expanded');
    console.log('[Menu] Menu toggled:', mobileNav.classList.contains('expanded'));
  });
  
  // Close menu when a link is clicked
  const mobileNavLinks = mobileNav.querySelectorAll('.nav-link');
  mobileNavLinks.forEach(link => {
    // Remove existing event listeners by cloning
    const newLink = link.cloneNode(true);
    link.parentNode.replaceChild(newLink, link);
    
    // Add fresh event listener
    newLink.addEventListener('click', () => {
      newHamburger.classList.remove('active');
      mobileNav.classList.remove('expanded');
      console.log('[Menu] Menu closed via link click');
    });
  });
  
  console.log('[Menu] Mobile menu initialized');
}

// Set up menu on initial page load
document.addEventListener('DOMContentLoaded', setupMobileMenu);

// Set up menu after Astro page transitions
document.addEventListener('astro:page-load', setupMobileMenu);
