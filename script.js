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
window.addEventListener('load', function() {
    const calculatorForm = document.getElementById('calculatorForm');
    if (calculatorForm) {
        calculatorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Calculator form submitted'); // Debug log
            
            const patients = parseInt(document.getElementById('patients').value);
            const fee = parseInt(document.getElementById('fee').value);
            const retention = parseInt(document.getElementById('retention').value);
            const acquisition = parseInt(document.getElementById('acquisition').value);
            
            console.log('Values:', { patients, fee, retention, acquisition }); // Debug log
            
            if (!patients || !fee || !retention || !acquisition) {
                alert('Please fill in all fields');
                return;
            }
    
    // ACCURATE CANNABIS CLINIC METRICS (Based on real data)
    
    // Cannabis patient visit frequency:
    // - Initial consultation
    // - 3-month follow-up (required by most states)
    // - 6-month renewal
    // - Annual renewal
    // Average: 3-4 visits per year for active patients
    const avgVisitsPerYear = 3.5;
    
    // Current retention rate as decimal
    const currentRetentionRate = retention / 100;
    
    // Calculate patient churn and lifetime value
    // With NO retention system: average patient stays 12-18 months
    // With GOOD retention (67-70%): average patient stays 24-36 months
    // Your improvement brought clinics from ~40% to 67-70% retention
    
    // Calculate average patient lifetime based on retention rate
    let avgPatientLifetimeMonths;
    if (currentRetentionRate < 0.4) {
        avgPatientLifetimeMonths = 12; // Poor retention
    } else if (currentRetentionRate < 0.6) {
        avgPatientLifetimeMonths = 18; // Average retention
    } else if (currentRetentionRate < 0.7) {
        avgPatientLifetimeMonths = 24; // Good retention
    } else {
        avgPatientLifetimeMonths = 30; // Excellent retention
    }
    
    // Annual revenue per patient
    const annualRevenuePerPatient = fee * avgVisitsPerYear;
    
    // Lifetime value of a patient
    const lifetimeValue = annualRevenuePerPatient * (avgPatientLifetimeMonths / 12);
    
    // CURRENT LOSSES
    // Annual churn rate (percentage of patients lost each year)
    const annualChurnRate = 1 - currentRetentionRate;
    const patientsLostAnnually = Math.round(patients * annualChurnRate);
    
    // Direct revenue loss from churned patients
    const lostRevenueFromChurn = patientsLostAnnually * annualRevenuePerPatient;
    
    // Cost to acquire new patients to replace churned ones
    const replacementCosts = patientsLostAnnually * acquisition;
    
    // Lost referral value (happy patients refer others)
    // Cannabis patients who stay longer refer 0.3-0.5 new patients per year
    const referralsPerPatientYear = 0.4;
    const lostReferrals = Math.round(patientsLostAnnually * referralsPerPatientYear);
    const lostReferralValue = lostReferrals * lifetimeValue * 0.5; // 50% conversion on referrals
    
    // Total annual loss
    const totalAnnualLoss = lostRevenueFromChurn + replacementCosts + lostReferralValue;
    
    // WITH YOUR PROVEN SYSTEM
    // You've demonstrated achieving 67-70% retention at clinics
    // Calculate realistic improvement based on their current rate
    const targetRetentionRate = 0.70; // Your proven achievement
    
    let improvedRetentionRate;
    if (currentRetentionRate >= 0.70) {
        // Already at or above target, show modest 5-10% relative improvement
        improvedRetentionRate = Math.min(0.85, currentRetentionRate * 1.07);
    } else {
        // Can improve them TO 70% (your proven rate)
        improvedRetentionRate = targetRetentionRate;
    }
    
    const achievableImprovement = improvedRetentionRate - currentRetentionRate;
    const improvedChurnRate = 1 - improvedRetentionRate;
    const improvedPatientsLost = Math.round(patients * improvedChurnRate);
    
    // Patients saved from churning
    const patientsSaved = patientsLostAnnually - improvedPatientsLost;
    
    // Direct revenue recovered from saved patients
    const revenueRecovered = patientsSaved * annualRevenuePerPatient;
    
    // Acquisition costs saved (don't need to replace saved patients)
    const acquisitionCostsSaved = patientsSaved * acquisition;
    
    // Additional value from extended patient lifetime
    // Improved retention extends average lifetime by 6-12 months
    const extendedLifetimeMonths = 9;
    const extendedLifetimeValue = patientsSaved * (fee * avgVisitsPerYear * (extendedLifetimeMonths / 12));
    
    // Referral value from retained patients
    const additionalReferralValue = patientsSaved * referralsPerPatientYear * lifetimeValue * 0.5;
    
    // Total value recovered
    const totalValueRecovered = revenueRecovered + acquisitionCostsSaved + extendedLifetimeValue + additionalReferralValue;
    
    // Monthly cost of inaction
    const monthlyCost = Math.round(totalAnnualLoss / 12);
    
    // Display results
    console.log('Calculating results...', {
        patientsLostAnnually,
        totalAnnualLoss,
        totalValueRecovered
    });
    
    document.getElementById('lostPatients').textContent = patientsLostAnnually.toLocaleString();
    document.getElementById('lostRevenue').textContent = lostRevenueFromChurn.toLocaleString();
    document.getElementById('replacementCosts').textContent = replacementCosts.toLocaleString();
    document.getElementById('totalLoss').textContent = totalAnnualLoss.toLocaleString();
    document.getElementById('patientsSaved').textContent = patientsSaved.toLocaleString();
    document.getElementById('revenueRecovered').textContent = revenueRecovered.toLocaleString();
    document.getElementById('totalValue').textContent = totalValueRecovered.toLocaleString();
    document.getElementById('monthlyCost').textContent = monthlyCost.toLocaleString();
    
    // Show results with smooth scroll
    const resultsDiv = document.getElementById('results');
    if (resultsDiv) {
        console.log('Showing results div');
        // Force display block and remove any inline styles
        resultsDiv.style.display = 'block';
        resultsDiv.style.visibility = 'visible';
        resultsDiv.style.opacity = '1';
        
        // Force a reflow to ensure the display change takes effect
        resultsDiv.offsetHeight;
        
        // Scroll to results after a brief delay
        setTimeout(() => {
            const calculatorSection = document.getElementById('calculator');
            const resultOffset = resultsDiv.offsetTop;
            const headerHeight = document.querySelector('header').offsetHeight;
            
            window.scrollTo({
                top: resultOffset - headerHeight - 20,
                behavior: 'smooth'
            });
        }, 100);
    } else {
        console.error('Results div not found!');
    }
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