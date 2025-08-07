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

// Form submission using Formspree
document.querySelector('.contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    const formData = {
        access_key: '6c4e9b6f-9c2a-4d8e-b3f1-8a5c7d2e9f3b',
        name: this.name.value,
        email: this.email.value,
        clinic: this.clinic.value,
        message: this.message.value,
        to_email: 'jgallagher@clinicbucket.com'
    };
    
    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            alert('Thank you for your message! I\'ll get back to you within 24 hours.');
            this.reset();
        } else {
            alert('An error occurred. Please try again or email directly to jgallagher@clinicbucket.com');
        }
    } catch (error) {
        alert('Please try again or email directly to jgallagher@clinicbucket.com');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
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