document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileBtn.querySelector('i').classList.remove('fa-times');
                    mobileBtn.querySelector('i').classList.add('fa-bars');
                }

                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Impact Stats Counter Animation
    const statsSection = document.querySelector('.hero-stats');
    const stats = document.querySelectorAll('.stat-count');
    let started = false;

    if (statsSection && stats.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !started) {
                stats.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    const duration = 2000; // 2 seconds
                    const refreshRate = 20;
                    const steps = duration / refreshRate;
                    const increment = target / steps;
                    let current = 0;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            stat.innerText = target.toLocaleString(); // Add commas
                            clearInterval(timer);
                        } else {
                            stat.innerText = Math.ceil(current).toLocaleString();
                        }
                    }, refreshRate);
                });
                started = true;
            }
        }, { threshold: 0.5 });

        observer.observe(statsSection);
        observer.observe(statsSection);
    }

    // Dynamic Copyright Year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }


    // Carbon Offset Calculator
    const fuelInput = document.getElementById('fuelInput');
    const offsetResult = document.getElementById('offsetResult');

    if (fuelInput && offsetResult) {
        fuelInput.addEventListener('input', function () {
            const liters = parseFloat(this.value);
            if (!isNaN(liters) && liters >= 0) {
                // 1 KES per liter
                const contribution = liters * 1;
                offsetResult.textContent = contribution.toLocaleString() + ' KES';
            } else {
                offsetResult.textContent = '0 KES';
            }
        });
    }


    // Handle "Offset Now" Button Click
    const offsetBtn = document.getElementById('offsetBtn');
    if (offsetBtn && fuelInput) {
        offsetBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const liters = fuelInput.value;
            if (liters > 0) {
                const amount = (liters * 1).toLocaleString();
                const subject = encodeURIComponent("Carbon Offset Partnership");
                const message = encodeURIComponent(`Hello,\n\nI would like to offset my carbon footprint.\n\nFuel Consumption: ${liters} Liters\nContribution Amount: ${amount} KES\n\nPlease contact me to proceed.`);
                window.location.href = `contact.html?subject=${subject}&message=${message}`;
            } else {
                alert("Please enter a valid fuel amount first.");
                fuelInput.focus();
            }
        });
    }

    // Pre-fill Contact Form content from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const subjectParam = urlParams.get('subject');
    const messageParam = urlParams.get('message');

    const subjectField = document.getElementById('subject');
    const messageField = document.getElementById('message');

    if (subjectField && subjectParam) {
        subjectField.value = subjectParam;
    }

    if (messageField && messageParam) {
        messageField.value = messageParam;
    }
});
