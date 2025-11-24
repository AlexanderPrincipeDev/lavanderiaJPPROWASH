document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    const nav = document.querySelector('.nav');
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    const body = document.body;

    // Theme Toggle Logic
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (sunIcon) sunIcon.style.display = 'none';
        if (moonIcon) moonIcon.style.display = 'block';
    } else {
        // Default to light mode if no preference or 'light' is saved
        if (sunIcon) sunIcon.style.display = 'block';
        if (moonIcon) moonIcon.style.display = 'none';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');

            // Toggle Icons
            if (sunIcon) sunIcon.style.display = isDark ? 'none' : 'block';
            if (moonIcon) moonIcon.style.display = isDark ? 'block' : 'none';

            // Save Preference
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

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
        // Validate and prevent negative numbers
        if (kilosInput.value < 0) kilosInput.value = '';
        if (edredonesInput.value < 0) edredonesInput.value = '';
        if (ternosInput.value < 0) ternosInput.value = '';

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
        let message = '';
        if (total > 0) {
            message = `Hola JP Pro Wash, hice un cálculo en la web:%0A- Ropa: ${kilos}kg%0A- Edredones: ${edredones}%0A- Ternos: ${ternos}%0A*Total Estimado: S/ ${total.toFixed(2)}*%0A%0A¿Podrían programar mi recojo?`;
        } else {
            message = `Hola JP Pro Wash, estoy interesado en sus servicios de lavandería. ¿Podrían darme más información?`;
        }
        whatsappBtn.href = `https://wa.me/51966167314?text=${message}`;
    }

    if (kilosInput && edredonesInput && ternosInput) {
        kilosInput.addEventListener('input', updateCalculator);
        edredonesInput.addEventListener('input', updateCalculator);
        ternosInput.addEventListener('input', updateCalculator);
        // Initialize on load
        updateCalculator();

        // Prevent invalid characters (-, +, e)
        [kilosInput, edredonesInput, ternosInput].forEach(input => {
            input.addEventListener('keydown', (e) => {
                if (['-', '+', 'e', 'E'].includes(e.key)) {
                    e.preventDefault();
                }
            });
        });
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
            statusBadge.querySelector('.status-text').textContent = '¡Estamos atendiendo!';
        } else {
            statusBadge.classList.add('closed');
            statusBadge.classList.remove('open');
            statusBadge.querySelector('.status-text').textContent = 'Cerrado Ahora';
        }
    }

    // Check on load and every minute
    checkBusinessHours();
    setInterval(checkBusinessHours, 60000);

    // Sticky Status Badge Logic
    const stickyBadge = document.getElementById('sticky-status-badge');

    function updateStickyBadge() {
        if (!stickyBadge) return;

        const now = new Date();
        const day = now.getDay();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const currentTime = hour + minute / 60;

        let isOpen = false;

        // Monday-Saturday: 10:00 AM - 9:00 PM
        if (day >= 1 && day <= 6) {
            isOpen = currentTime >= 10 && currentTime < 21;
        }

        if (isOpen) {
            stickyBadge.classList.remove('closed');
            stickyBadge.querySelector('.status-text').textContent = '¡Estamos atendiendo!';
        } else {
            stickyBadge.classList.add('closed');
            stickyBadge.querySelector('.status-text').textContent = 'Cerrado ahora';
        }
    }

    // Update sticky badge on load and every minute
    updateStickyBadge();
    setInterval(updateStickyBadge, 60000);

    // Chatbot Logic
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWidget = document.getElementById('chatbot-widget');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotBody = document.getElementById('chatbot-body');

    if (chatbotToggle && chatbotWidget && chatbotClose) {
        chatbotToggle.addEventListener('click', () => {
            chatbotWidget.style.display = 'flex';
            chatbotToggle.style.display = 'none';
        });

        chatbotClose.addEventListener('click', () => {
            chatbotWidget.style.display = 'none';
            chatbotToggle.style.display = 'flex';
        });
    }

    window.handleChatOption = function (option) {
        // Add user message
        const userMsg = document.createElement('div');
        userMsg.className = 'chat-message user';
        let userText = '';

        switch (option) {
            case 'precios': userText = '💰 Ver Precios'; break;
            case 'cobertura': userText = '📍 Zona de Cobertura'; break;
            case 'horario': userText = '⏰ Horarios de Atención'; break;
            case 'contacto': userText = '👤 Hablar con un Humano'; break;
        }

        userMsg.innerHTML = `<div class="chat-bubble">${userText}</div>`;
        chatbotBody.appendChild(userMsg);

        // Scroll to bottom
        chatbotBody.scrollTop = chatbotBody.scrollHeight;

        // Simulate bot typing
        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.className = 'chat-message bot';
            let botContent = '';

            switch (option) {
                case 'precios':
                    botContent = `
                        <div class="chat-bubble">
                            <strong>Nuestros precios base son:</strong><br>
                            🧺 Lavado por Kilo: S/ 4.00<br>
                            🛏️ Edredones: Desde S/ 15.00<br>
                            👔 Ternos: Desde S/ 20.00<br>
                            <br>
                            ¿Quieres cotizar algo específico?
                        </div>
                        <div class="chat-options">
                            <button class="chat-option-btn" onclick="handleChatOption('contacto')">Cotizar por WhatsApp</button>
                        </div>
                    `;
                    break;
                case 'cobertura':
                    botContent = `
                        <div class="chat-bubble">
                            Llegamos a <strong>Breña, Pueblo Libre, Jesús María, Lince, San Isidro, Lima Cercado y La Victoria</strong>.<br>
                            <br>
                            El delivery es GRATIS a partir de 10 kilos en zonas cercanas.
                        </div>
                    `;
                    break;
                case 'horario':
                    botContent = `
                        <div class="chat-bubble">
                            Nuestro horario de atención es:<br>
                            📅 <strong>Lunes a Sábado:</strong> 10:00 AM - 9:00 PM<br>
                            ❌ Domingos y Feriados: Cerrado
                        </div>
                    `;
                    break;
                case 'contacto':
                    botContent = `
                        <div class="chat-bubble">
                            ¡Claro! Te conectaré con un asesor humano por WhatsApp ahora mismo.
                        </div>
                    `;
                    setTimeout(() => {
                        window.open('https://wa.me/51966167314?text=Hola,%20vengo%20del%20chat%20de%20la%20web', '_blank');
                    }, 1500);
                    break;
            }

            botMsg.innerHTML = botContent;
            chatbotBody.appendChild(botMsg);
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
        }, 600);
    };
});

// Add animation class styles dynamically or in CSS (better in CSS, but adding class logic here)
// We need to add the .animate-in class to CSS

// Global function to close sticky badge
function closeStickyBadge() {
    const stickyBadge = document.getElementById('sticky-status-badge');
    if (stickyBadge) {
        stickyBadge.classList.add('hidden');
        // Store in localStorage to remember user preference
        localStorage.setItem('stickyBadgeClosed', 'true');
    }
}

// Check if user previously closed the badge
document.addEventListener('DOMContentLoaded', () => {
    const stickyBadge = document.getElementById('sticky-status-badge');
    if (stickyBadge && localStorage.getItem('stickyBadgeClosed') === 'true') {
        stickyBadge.classList.add('hidden');
    }
});
