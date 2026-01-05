document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    const nav = document.querySelector('.nav');
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleDesktop = document.getElementById('theme-toggle-desktop');
    const sunIcons = document.querySelectorAll('.sun-icon');
    const moonIcons = document.querySelectorAll('.moon-icon');
    const body = document.body;

    // Theme Toggle Logic
    const savedTheme = localStorage.getItem('theme');
    const logoImg = document.querySelector('.logo img');
    const modalLogoImg = document.querySelector('.modal-logo');
    const lightLogo = 'assets/images/LOGO/png/SIN FONDO/LOGO_opt.webp';
    const lightLogo2x = 'assets/images/LOGO/png/SIN FONDO/LOGO_2x.webp';
    const darkLogo = 'assets/images/LOGO/png/SIN FONDO/LOGO-NEGATIVO_opt.webp';

    function updateLogo(isDark) {
        if (logoImg) {
            const newLogo = isDark ? darkLogo : lightLogo;
            const srcset = isDark ? `${darkLogo} 1x` : `${lightLogo} 1x, ${lightLogo2x} 2x`;
            logoImg.src = newLogo;
            logoImg.srcset = srcset;
        }
        if (modalLogoImg) {
            const newModalLogo = isDark ? darkLogo : lightLogo;
            const modalSrcset = isDark ? `${darkLogo} 1x` : `${lightLogo} 1x, ${lightLogo2x} 2x`;
            modalLogoImg.src = newModalLogo;
            modalLogoImg.srcset = modalSrcset;
        }
    }

    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        sunIcons.forEach(icon => icon.style.display = 'none');
        moonIcons.forEach(icon => icon.style.display = 'block');
        updateLogo(true);
    } else {
        // Default to light mode if no preference or 'light' is saved
        sunIcons.forEach(icon => icon.style.display = 'block');
        moonIcons.forEach(icon => icon.style.display = 'none');
        updateLogo(false);
    }

    function toggleTheme() {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');

        // Toggle Icons for all buttons
        sunIcons.forEach(icon => icon.style.display = isDark ? 'none' : 'block');
        moonIcons.forEach(icon => icon.style.display = isDark ? 'block' : 'none');

        // Update Logo
        updateLogo(isDark);

        // Save Preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    if (themeToggleDesktop) {
        themeToggleDesktop.addEventListener('click', toggleTheme);
    }

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link, .nav-list .btn').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
        });
    });

    // Scroll Animation (defer to idle to avoid layout work on initial load)
    function initScrollAnimations() {
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

        document.querySelectorAll('.service-card, .section-title, .info-item').forEach(el => {
            el.classList.add('animate-prepare');
            observer.observe(el);
        });
    }

    if ('requestIdleCallback' in window) {
        requestIdleCallback(initScrollAnimations);
    } else {
        setTimeout(initScrollAnimations, 0);
    }

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
        whatsappBtn.href = `https://wa.me/51978673626?text=${message}`;
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
        const floatingBadge = document.getElementById('floating-hours-badge');

        if (!statusBadge && !floatingBadge) return;

        const now = new Date();
        const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
        const hour = now.getHours();
        const minute = now.getMinutes();
        const currentTime = hour + minute / 60;

        let isOpen = false;
        let closingTime = '';

        // Monday-Saturday: 10:00 AM - 9:00 PM
        if (day >= 1 && day <= 6) {
            isOpen = currentTime >= 10 && currentTime < 21;
            closingTime = '9:00 PM';
        }
        // Sunday: Closed
        else {
            isOpen = false;
            closingTime = '';
        }

        // Update status badge in contact section
        if (statusBadge) {
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

        // Update floating badge
        if (floatingBadge) {
            const floatingStatusText = floatingBadge.querySelector('.floating-status-text');
            const floatingClosingTime = floatingBadge.querySelector('.floating-closing-time');

            if (isOpen) {
                floatingBadge.classList.add('open');
                floatingBadge.classList.remove('closed');
                if (floatingStatusText) floatingStatusText.textContent = '¡Estamos atendiendo!';
                if (floatingClosingTime) floatingClosingTime.textContent = `hasta las ${closingTime}`;
            } else {
                floatingBadge.classList.add('closed');
                floatingBadge.classList.remove('open');
                if (floatingStatusText) floatingStatusText.textContent = 'Cerrado ahora';
                if (floatingClosingTime) floatingClosingTime.textContent = 'Abrimos lunes a sábado 10:00 AM';
            }
        }
    }

    // Check on load and every minute
    checkBusinessHours();
    setInterval(checkBusinessHours, 60000);

    // Floating Badge Logic
    const floatingBadge = document.getElementById('floating-hours-badge');
    const floatingBadgeClose = document.getElementById('floating-badge-close');

    if (floatingBadge && floatingBadgeClose) {
        // Check if user has dismissed the badge in this session
        const badgeDismissed = sessionStorage.getItem('floatingBadgeDismissed');

        if (!badgeDismissed) {
            // Show the badge after a short delay (1 second after page load)
            setTimeout(() => {
                floatingBadge.classList.add('show');
            }, 1000);

            // Auto-hide after 10 seconds
            setTimeout(() => {
                floatingBadge.classList.remove('show');
                floatingBadge.classList.add('hide');
            }, 11000);
        }

        // Close button handler
        floatingBadgeClose.addEventListener('click', () => {
            floatingBadge.classList.remove('show');
            floatingBadge.classList.add('hide');
            sessionStorage.setItem('floatingBadgeDismissed', 'true');
        });
    }


    // Chatbot Logic
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWidget = document.getElementById('chatbot-widget');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotBody = document.getElementById('chatbot-body');
    const chatOptions = document.querySelectorAll('[data-chat-option]');
    const chatbotInputText = document.querySelector('.chatbot-input-text');

    if (chatbotToggle && chatbotWidget && chatbotClose) {
        chatbotToggle.addEventListener('click', () => {
            chatbotWidget.style.display = 'flex';
            chatbotToggle.style.display = 'none';
            chatbotToggle.setAttribute('aria-expanded', 'true');
            chatbotWidget.setAttribute('aria-hidden', 'false');
            const firstOption = chatbotBody?.querySelector('[data-chat-option]');
            if (firstOption) firstOption.focus();
        });

        chatbotClose.addEventListener('click', () => {
            chatbotWidget.style.display = 'none';
            chatbotToggle.style.display = 'flex';
            chatbotToggle.setAttribute('aria-expanded', 'false');
            chatbotWidget.setAttribute('aria-hidden', 'true');
            chatbotToggle.focus();
        });
    }

    function setOptionsDisabled(isDisabled) {
        chatOptions.forEach(btn => {
            btn.disabled = isDisabled;
            btn.setAttribute('aria-disabled', String(isDisabled));
        });
    }

    function appendTypingIndicator() {
        const typing = document.createElement('div');
        typing.className = 'chat-message bot typing-indicator';
        typing.innerHTML = '<div class=\"chat-bubble\">Escribiendo<span class=\"typing-dots\">...</span></div>';
        chatbotBody.appendChild(typing);
        return typing;
    }

    function appendBackToMenu() {
        const back = document.createElement('div');
        back.className = 'chat-message bot';
        back.innerHTML = `
            <div class=\"chat-bubble\">¿Quieres volver al menú?</div>
            <div class=\"chat-options\">
                <button class=\"chat-option-btn\" data-chat-option=\"menu\">↩️ Volver al menú</button>
            </div>
        `;
        chatbotBody.appendChild(back);
    }

    function typeBubble(bubbleEl, text, speed = 26) {
        return new Promise((resolve) => {
            bubbleEl.textContent = '';
            let index = 0;
            const timer = setInterval(() => {
                const char = text[index];
                if (char === '\n') {
                    bubbleEl.appendChild(document.createElement('br'));
                } else {
                    bubbleEl.append(char);
                }
                index += 1;
                if (index >= text.length) {
                    clearInterval(timer);
                    resolve();
                }
            }, speed);
        });
    }

    function simulateInput(text) {
        return new Promise((resolve) => {
            if (!chatbotInputText) return resolve();
            chatbotInputText.textContent = '';
            let index = 0;
            const interval = setInterval(() => {
                chatbotInputText.textContent += text[index];
                index += 1;
                if (index >= text.length) {
                    clearInterval(interval);
                    resolve();
                }
            }, 40);
        });
    }

    function resetInput() {
        if (chatbotInputText) {
            chatbotInputText.textContent = '';
        }
    }

    function handleChatOption(option) {
        // Add user message
        const userMsg = document.createElement('div');
        userMsg.className = 'chat-message user';
        let userText = '';

        switch (option) {
            case 'precios': userText = '💰 Ver Precios'; break;
            case 'cobertura': userText = '📍 Zona de Cobertura'; break;
            case 'horario': userText = '⏰ Horarios de Atención'; break;
            case 'contacto': userText = '👤 Hablar con un Humano'; break;
            case 'menu': userText = '↩️ Volver al menú'; break;
        }

        simulateInput(userText).then(() => {
            setTimeout(() => {
                userMsg.innerHTML = `<div class="chat-bubble">${userText}</div>`;
                chatbotBody.appendChild(userMsg);
                resetInput();

                // Scroll to latest message without forcing layout reads
                requestAnimationFrame(() => {
                    userMsg.scrollIntoView({ block: 'end', behavior: 'auto' });
                });
            }, 250);
        });

        setOptionsDisabled(true);
        const typingIndicator = appendTypingIndicator();

        // Simulate bot typing
        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.className = 'chat-message bot';
            let responseText = '';
            let responseOptions = '';

            switch (option) {
                case 'menu':
                    responseText = '¿En qué puedo ayudarte?';
                    responseOptions = `
                        <button class="chat-option-btn" data-chat-option="precios">💰 Ver Precios</button>
                        <button class="chat-option-btn" data-chat-option="cobertura">📍 Zona de Cobertura</button>
                        <button class="chat-option-btn" data-chat-option="horario">⏰ Horarios de Atención</button>
                        <button class="chat-option-btn" data-chat-option="contacto">👤 Hablar con un Humano</button>
                    `;
                    break;
                case 'precios':
                    responseText = 'Nuestros precios base son:\n🧺 Lavado por Kilo: S/ 4.00\n🛏️ Edredones: Desde S/ 15.00\n👔 Ternos: Desde S/ 20.00\n\n¿Quieres cotizar algo específico?';
                    responseOptions = `
                        <button class="chat-option-btn" data-chat-option="contacto">Cotizar por WhatsApp</button>
                    `;
                    break;
                case 'cobertura':
                    responseText = 'Llegamos a Breña, Pueblo Libre, Jesús María, Lince, San Isidro, Lima Cercado y La Victoria.\n\nEl delivery es GRATIS a partir de 10 kilos en zonas cercanas.';
                    break;
                case 'horario':
                    responseText = 'Nuestro horario de atención es:\n📅 Lunes a Sábado: 10:00 AM - 9:00 PM\n❌ Domingos y Feriados: Cerrado';
                    break;
                case 'contacto':
                    responseText = '¡Claro! Te conectaré con un asesor humano por WhatsApp ahora mismo.';
                    setTimeout(() => {
                        window.open('https://wa.me/51978673626?text=Hola,%20vengo%20del%20chat%20de%20la%20web', '_blank');
                    }, 1500);
                    break;
            }

            typingIndicator.remove();
            const bubble = document.createElement('div');
            bubble.className = 'chat-bubble';
            botMsg.appendChild(bubble);
            chatbotBody.appendChild(botMsg);
            requestAnimationFrame(() => {
                userMsg.scrollIntoView({ block: 'start', behavior: 'auto' });
                botMsg.classList.add('chat-bounce');
            });
            typeBubble(bubble, responseText).then(() => {
                if (responseOptions) {
                    const optionsWrap = document.createElement('div');
                    optionsWrap.className = 'chat-options';
                    optionsWrap.innerHTML = responseOptions;
                    botMsg.appendChild(optionsWrap);
                }
                if (option !== 'menu') {
                    appendBackToMenu();
                }
                setOptionsDisabled(false);
            });
        }, 1500);
    }

    document.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.matches('[data-chat-option]')) {
            handleChatOption(target.getAttribute('data-chat-option'));
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && chatbotWidget && chatbotWidget.style.display === 'flex') {
            chatbotWidget.style.display = 'none';
            chatbotToggle.style.display = 'flex';
            chatbotToggle.setAttribute('aria-expanded', 'false');
            chatbotWidget.setAttribute('aria-hidden', 'true');
            chatbotToggle.focus();
        }
    });
});
