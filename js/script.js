document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
        });
    });

    // Scroll Animation
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .section-title, .hero-content, .hero-visual, .info-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');

            // Close all other items
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    if (otherQuestion) otherQuestion.setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
            question.setAttribute('aria-expanded', !isActive);
        });
    });

    // Calculator Logic
    const kilosInput = document.getElementById('kilos');
    const edredonesInput = document.getElementById('edredones');
    const ternosInput = document.getElementById('ternos');
    const totalAmount = document.getElementById('total-amount');
    const whatsappBtn = document.getElementById('whatsapp-order-btn');

    function updateCalculator() {
        const kilos = parseFloat(kilosInput.value) || 0;
        const edredones = parseFloat(edredonesInput.value) || 0;
        const ternos = parseFloat(ternosInput.value) || 0;

        let total = 0;

        // Logic for Kilos (Min S/ 4.00 if kilos > 0)
        if (kilos > 0) {
            total += Math.max(kilos * 4, 4);
        }

        total += edredones * 15;
        total += ternos * 20;

        // Update Display
        totalAmount.textContent = total.toFixed(2);

        // Update WhatsApp Link
        const message = `Hola JP Pro Wash, hice un cálculo en la web:%0A- Ropa: ${kilos}kg%0A- Edredones: ${edredones}%0A- Ternos: ${ternos}%0A*Total Estimado: S/ ${total.toFixed(2)}*%0A%0A¿Podrían programar mi recojo?`;
        whatsappBtn.href = `https://wa.me/51966167314?text=${message}`;
    }

    if (kilosInput && edredonesInput && ternosInput) {
        kilosInput.addEventListener('input', updateCalculator);
        edredonesInput.addEventListener('input', updateCalculator);
        ternosInput.addEventListener('input', updateCalculator);
    }

    // Before/After Slider Logic
    const slider = document.getElementById('comparison-slider');
    const beforeImage = document.querySelector('.img-comp-before');
    const sliderButton = document.querySelector('.slider-button');

    if (slider && beforeImage && sliderButton) {
        slider.addEventListener('input', (e) => {
            const sliderValue = e.target.value;
            beforeImage.style.width = `${sliderValue}%`;
            sliderButton.style.left = `${sliderValue}%`;
        });
    }

    // Promo Banner Logic
    const promoBanner = document.getElementById('promo-banner');
    const closeBannerBtn = document.getElementById('close-banner');

    if (promoBanner && closeBannerBtn) {
        closeBannerBtn.addEventListener('click', () => {
            promoBanner.style.display = 'none';
        });
    }

    // Business Hours Status Checker
    function checkBusinessHours() {
        const statusBadge = document.getElementById('status-badge');
        if (!statusBadge) return;

        const now = new Date();
        const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
        const hour = now.getHours();
        const minute = now.getMinutes();
        const currentTime = hour + minute / 60;

        let isOpen = false;

        // Monday-Saturday: 10:00 AM - 9:00 PM
        if (day >= 1 && day <= 6) {
            isOpen = currentTime >= 10 && currentTime < 21;
        }
        // Sunday: Closed
        else {
            isOpen = false;
        }

        if (isOpen) {
            statusBadge.classList.add('open');
            statusBadge.classList.remove('closed');
            statusBadge.querySelector('.status-text').textContent = '¡Estamos Abiertos!';
        } else {
            statusBadge.classList.add('closed');
            statusBadge.classList.remove('open');
            statusBadge.querySelector('.status-text').textContent = 'Cerrado Ahora';
        }
    }

    // Check on load and every minute
    checkBusinessHours();
    setInterval(checkBusinessHours, 60000);
});

// Add animation class styles dynamically or in CSS (better in CSS, but adding class logic here)
// We need to add the .animate-in class to CSS

