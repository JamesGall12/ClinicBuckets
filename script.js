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

// Revenue Calculator - Based on real cannabis clinic metrics
document.addEventListener('DOMContentLoaded', function() {
    const calculatorForm = document.getElementById('calculatorForm');
    if (calculatorForm) {
        calculatorForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const patients = parseInt(document.getElementById('patients').value);
    const fee = parseInt(document.getElementById('fee').value);
    const retention = parseInt(document.getElementById('retention').value);
    const acquisition = parseInt(document.getElementById('acquisition').value);
    
    if (!patients || !fee || !retention || !acquisition) {
        alert('Please fill in all fields');
        return;
    }
    
    // ACCURATE CANNABIS CLINIC METRICS
    // Average patient sees doctor 3-4 times per year (initial + 3 renewals)
    const avgVisitsPerYear = 3.5;
    
    // Average patient lifetime: 18 months in cannabis clinics without retention system
    const avgPatientLifetimeMonths = 18;
    
    // Calculate true lifetime value
    const annualRevenuePerPatient = fee * avgVisitsPerYear;
    const lifetimeValue = annualRevenuePerPatient * (avgPatientLifetimeMonths / 12);
    
    // Current situation calculations
    const currentRetentionRate = retention / 100;
    
    // Annual churn rate (patients lost per year)
    const annualChurnRate = 1 - currentRetentionRate;
    const patientsLostAnnually = Math.round(patients * annualChurnRate);
    
    // Lost revenue from churned patients (they would have spent more if retained)
    const lostRevenueFromChurn = patientsLostAnnually * annualRevenuePerPatient;
    
    // Cost to replace lost patients
    const replacementCosts = patientsLostAnnually * acquisition;
    
    // Additional hidden costs
    // Lost referrals (each satisfied patient refers 0.5 new patients on average)
    const lostReferralValue = Math.round(patientsLostAnnually * 0.5) * lifetimeValue;
    
    // Total annual loss
    const totalAnnualLoss = lostRevenueFromChurn + replacementCosts + (lostReferralValue * 0.3); // Conservative referral estimate
    
    // WITH IMPROVED RETENTION (27% improvement is proven from your case studies)
    const retentionImprovement = 0.27;
    const improvedRetentionRate = Math.min(0.85, currentRetentionRate + (annualChurnRate * retentionImprovement));
    const improvedChurnRate = 1 - improvedRetentionRate;
    const improvedPatientsLost = Math.round(patients * improvedChurnRate);
    
    // Patients saved from churning
    const patientsSaved = patientsLostAnnually - improvedPatientsLost;
    
    // Revenue recovered from saved patients
    const revenueRecovered = patientsSaved * annualRevenuePerPatient;
    
    // Acquisition costs saved (don't need to replace saved patients)
    const acquisitionCostsSaved = patientsSaved * acquisition;
    
    // Additional value from retained patients staying longer
    const extendedLifetimeValue = patientsSaved * fee * 2; // Extra visits from extended lifetime
    
    // Total value recovered
    const totalValueRecovered = revenueRecovered + acquisitionCostsSaved + extendedLifetimeValue;
    
    // Monthly cost of inaction
    const monthlyCost = Math.round(totalAnnualLoss / 12);
    
    // Display results
    document.getElementById('lostPatients').textContent = patientsLostAnnually.toLocaleString();
    document.getElementById('lostRevenue').textContent = lostRevenueFromChurn.toLocaleString();
    document.getElementById('replacementCosts').textContent = replacementCosts.toLocaleString();
    document.getElementById('totalLoss').textContent = totalAnnualLoss.toLocaleString();
    document.getElementById('patientsSaved').textContent = patientsSaved.toLocaleString();
    document.getElementById('revenueRecovered').textContent = revenueRecovered.toLocaleString();
    document.getElementById('totalValue').textContent = totalValueRecovered.toLocaleString();
    document.getElementById('monthlyCost').textContent = monthlyCost.toLocaleString();
    
    // Show results with smooth scroll
    document.getElementById('results').style.display = 'block';
    setTimeout(() => {
        document.getElementById('results').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest'
        });
    }, 100);
        });
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