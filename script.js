// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && navLinks.classList.contains('active')) {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        // Calculate dynamic offset to center content better
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetHeight = target.offsetHeight;
        const windowHeight = window.innerHeight;
        
        // If section is taller than viewport, just offset by header
        // Otherwise, try to center it
        let headerOffset;
        if (targetHeight > windowHeight - headerHeight) {
            headerOffset = headerHeight + 20; // Just clear the header with small margin
        } else {
            // Center the section in remaining viewport space
            const remainingSpace = windowHeight - headerHeight - targetHeight;
            headerOffset = headerHeight - (remainingSpace / 2);
            // Ensure we don't scroll past the element
            headerOffset = Math.max(headerHeight + 20, Math.min(headerOffset, headerHeight + 100));
        }
        
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Form submission - FormSubmit handles it now
// Just update button text during submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    const submitBtn = this.querySelector('.submit-btn');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Re-enable after a delay (FormSubmit will handle the actual submission)
    setTimeout(() => {
        submitBtn.textContent = 'Send message';
        submitBtn.disabled = false;
    }, 2000);
});

// Check if form was just submitted
window.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('submitted') === 'true') {
        // Show success message
        const successDiv = document.getElementById('form-success');
        const form = document.querySelector('.contact-form');
        if (successDiv && form) {
            successDiv.style.display = 'block';
            form.style.display = 'none';
            
            // Scroll to the contact section
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const headerOffset = 100;
                const elementPosition = contactSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                setTimeout(() => {
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }, 500);
            }
            
            // Clean up the URL
            setTimeout(() => {
                const cleanUrl = window.location.origin + window.location.pathname;
                window.history.replaceState({}, document.title, cleanUrl);
            }, 1000);
        }
    }
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 1px 0 rgba(226, 232, 240, 1)';
    }
});