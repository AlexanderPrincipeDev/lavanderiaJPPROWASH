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
        document.querySelectorAll('[data-chat-option]').forEach((btn) => {
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

    function smoothScrollWithBounce() {
        if (!chatbotBody) return;
        chatbotBody.scrollTo({ top: chatbotBody.scrollHeight, behavior: 'smooth' });
        chatbotBody.classList.remove('chat-scroll-bounce');
        requestAnimationFrame(() => {
            chatbotBody.classList.add('chat-scroll-bounce');
        });
    }

    function appendBackToMenu(container) {
        const menuButton = `
            <button class=\"chat-option-btn\" data-chat-option=\"menu\">
                <svg class=\"chat-option-icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\"
                    stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">
                    <path d=\"M4 6h16M4 12h16M4 18h16\"></path>
                </svg>
                Menú
            </button>
        `;
        if (container) {
            container.insertAdjacentHTML('beforeend', menuButton);
            return;
        }
        const back = document.createElement('div');
        back.className = 'chat-message bot';
        back.innerHTML = `
            <div class=\"chat-options\">
                ${menuButton}
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

    const chatState = {
        flow: null,
        district: null,
        currentService: null,
        name: null
    };

    function getServiceContext() {
        const path = window.location.pathname || '';
        if (path.includes('lavado-de-edredones')) return 'servicio_edredones';
        if (path.includes('lavado-al-seco')) return 'servicio_seco';
        if (path.includes('lavado-por-kilo')) return 'servicio_kilo';
        if (path.includes('lavado-de-ternos')) return 'servicio_ternos';
        if (path.includes('lavado-de-vestidos')) return 'servicio_vestidos';
        if (path.includes('lavado-de-zapatillas')) return 'servicio_zapatillas';
        if (path.includes('lavado-de-alfombras')) return 'servicio_alfombras';
        if (path.includes('lavado-de-cortinas')) return 'servicio_cortinas';
        if (path.includes('lavado-de-peluches')) return 'servicio_peluches';
        if (path.includes('planchado-express')) return 'servicio_planchado';
        if (path.includes('desmanchado-de-prendas')) return 'servicio_desmanchado';
        if (path.includes('lavanderia-corporativa')) return 'servicio_corporativo';
        return null;
    }

    function getHoursMessage() {
        const now = new Date();
        const day = now.getDay();
        const hour = now.getHours();
        if (day === 0) return 'Hoy estamos cerrados. Atendemos de lunes a sábado, 10:00 AM - 9:00 PM.';
        if (hour < 10) return 'Aún no abrimos. Hoy atendemos desde las 10:00 AM.';
        if (hour >= 21) return 'Ya cerramos por hoy. Atendemos de lunes a sábado, 10:00 AM - 9:00 PM.';
        return 'Estamos atendiendo ahora. Hoy hasta las 9:00 PM.';
    }

    function handleChatOption(option) {
        // Add user message
        const userMsg = document.createElement('div');
        userMsg.className = 'chat-message user';
        let userText = '';

        switch (option) {
            case 'precios': userText = 'Ver Precios'; break;
            case 'cotizar': userText = 'Cotizar Rápido'; break;
            case 'cotizar_kilos': userText = 'Cotizar por kilos'; break;
            case 'mas': userText = 'Más opciones'; break;
            case 'seguimiento': userText = 'Estado de pedido'; break;
            case 'cotizar_foto': userText = 'Cotizar con Foto'; break;
            case 'recomendar': userText = 'Recomendación de servicio'; break;
            case 'tips_cuidado': userText = 'Consejos de cuidado'; break;
            case 'servicios': userText = 'Ver Servicios'; break;
            case 'cobertura': userText = 'Zona de Cobertura'; break;
            case 'entrega': userText = 'Tiempo de Entrega'; break;
            case 'recojo': userText = 'Programar Recojo'; break;
            case 'horario': userText = 'Horarios de Atención'; break;
            case 'llegar': userText = 'Cómo Llegar'; break;
            case 'pagos': userText = 'Métodos de Pago'; break;
            case 'contacto': userText = 'Hablar con un Humano'; break;
            case 'menu': userText = 'Menú'; break;
            case 'servicio_kilo': userText = 'Lavado por Kilo'; break;
            case 'servicio_seco': userText = 'Lavado al Seco'; break;
            case 'servicio_edredones': userText = 'Lavado de Edredones'; break;
            case 'cotizar_kilo': userText = 'Cotizar por Kilo'; break;
            case 'cotizar_edredon': userText = 'Cotizar Edredón'; break;
            case 'cotizar_terno': userText = 'Cotizar Terno'; break;
            case 'kilos_5': userText = '5 kilos aprox'; break;
            case 'kilos_8': userText = '8 kilos aprox'; break;
            case 'kilos_12': userText = '12 kilos aprox'; break;
            case 'kilos_mas': userText = 'Más de 12 kilos'; break;
            case 'prenda_diaria': userText = 'Ropa diaria'; break;
            case 'prenda_terno': userText = 'Ternos y trajes'; break;
            case 'prenda_edredon': userText = 'Edredones'; break;
            case 'prenda_zapatillas': userText = 'Zapatillas'; break;
            case 'prenda_cortinas': userText = 'Cortinas'; break;
            case 'distrito_brena': userText = 'Breña'; break;
            case 'distrito_pueblolibre': userText = 'Pueblo Libre'; break;
            case 'distrito_jesusmaria': userText = 'Jesús María'; break;
            case 'distrito_lince': userText = 'Lince'; break;
            case 'horario_hoy': userText = 'Hoy (tarde)'; break;
            case 'horario_manana_am': userText = 'Mañana (mañana)'; break;
            case 'horario_manana_pm': userText = 'Mañana (tarde)'; break;
            case 'maps_link': userText = 'Abrir Google Maps'; break;
        }

        simulateInput(userText).then(() => {
            setTimeout(() => {
                userMsg.innerHTML = `<div class="chat-bubble">${userText}</div>`;
                chatbotBody.appendChild(userMsg);
                resetInput();

                // Scroll to latest message without forcing layout reads
                requestAnimationFrame(() => {
                    userMsg.scrollIntoView({ block: 'end', behavior: 'auto' });
                    smoothScrollWithBounce();
                });
            }, 250);
        });

        setOptionsDisabled(true);

        // Simulate bot typing
        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.className = 'chat-message bot';
            let responseText = '';
            let responseOptions = '';
            const iconPrice = `
                <svg class="chat-option-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                    <line x1="2" y1="10" x2="22" y2="10"></line>
                    <line x1="6" y1="15" x2="10" y2="15"></line>
                </svg>
            `;
            const iconMap = `
                <svg class="chat-option-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 10c0 4.5-8 11-8 11s-8-6.5-8-11a8 8 0 1 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                </svg>
            `;
            const iconClock = `
                <svg class="chat-option-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 6v6l4 2"></path>
                </svg>
            `;
            const iconUser = `
                <svg class="chat-option-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="8" r="4"></circle>
                    <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6"></path>
                </svg>
            `;
            const iconGrid = `
                <svg class="chat-option-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="3" width="8" height="8" rx="2"></rect>
                    <rect x="13" y="3" width="8" height="8" rx="2"></rect>
                    <rect x="3" y="13" width="8" height="8" rx="2"></rect>
                    <rect x="13" y="13" width="8" height="8" rx="2"></rect>
                </svg>
            `;
            const iconCalc = `
                <svg class="chat-option-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="4" y="3" width="16" height="18" rx="2"></rect>
                    <line x1="8" y1="7" x2="16" y2="7"></line>
                    <line x1="8" y1="11" x2="12" y2="11"></line>
                    <line x1="12" y1="15" x2="16" y2="15"></line>
                </svg>
            `;
            const iconPencil = `
                <svg class="chat-option-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
                </svg>
            `;
            const iconTruck = `
                <svg class="chat-option-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 7h11v10H3z"></path>
                    <path d="M14 10h4l3 3v4h-7z"></path>
                    <circle cx="7" cy="19" r="2"></circle>
                    <circle cx="18" cy="19" r="2"></circle>
                </svg>
            `;
            const iconMore = `
                <svg class="chat-option-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 8v8"></path>
                    <path d="M8 12h8"></path>
                </svg>
            `;
            const iconCamera = `
                <svg class="chat-option-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 7h3l2-3h6l2 3h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z"></path>
                    <circle cx="12" cy="14" r="3"></circle>
                </svg>
            `;
            const iconClipboard = `
                <svg class="chat-option-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="9" y="2" width="6" height="4" rx="1"></rect>
                    <path d="M9 4H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2"></path>
                </svg>
            `;
            const iconStar = `
                <svg class="chat-option-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m12 3 2.5 5 5.5.8-4 3.9.9 5.6-4.9-2.6-4.9 2.6.9-5.6-4-3.9 5.5-.8Z"></path>
                </svg>
            `;
            const iconShield = `
                <svg class="chat-option-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 3 20 7v6c0 4.4-3.1 7.8-8 9-4.9-1.2-8-4.6-8-9V7l8-4Z"></path>
                </svg>
            `;

            switch (option) {
                case 'menu':
                    responseText = '¿En qué puedo ayudarte?';
                    responseOptions = `
                        <button class="chat-option-btn" data-chat-option="precios">${iconPrice}Ver Precios</button>
                        <button class="chat-option-btn" data-chat-option="cotizar">${iconCalc}Cotizar Rápido</button>
                        <button class="chat-option-btn" data-chat-option="servicios">${iconGrid}Ver Servicios</button>
                        <button class="chat-option-btn" data-chat-option="cobertura">${iconMap}Zona de Cobertura</button>
                        <button class="chat-option-btn" data-chat-option="entrega">${iconClock}Tiempo de Entrega</button>
                        <button class="chat-option-btn" data-chat-option="recojo">${iconTruck}Programar Recojo</button>
                        <button class="chat-option-btn" data-chat-option="horario">${iconClock}Horarios de Atención</button>
                        <button class="chat-option-btn" data-chat-option="llegar">${iconMap}Cómo Llegar</button>
                        <button class="chat-option-btn" data-chat-option="pagos">${iconPrice}Métodos de Pago</button>
                        <button class="chat-option-btn" data-chat-option="mas">${iconMore}Más opciones</button>
                        <button class="chat-option-btn" data-chat-option="contacto">${iconUser}Hablar con un Humano</button>
                    `;
                    break;
                case 'precios':
                    responseText = 'Nuestros precios base son:\n- Lavado por Kilo: S/ 4.00\n- Edredones: Desde S/ 15.00\n- Ternos: Desde S/ 20.00\n\n¿Quieres cotizar algo específico?';
                    responseOptions = `
                        <button class="chat-option-btn" data-chat-option="contacto">${iconUser}Cotizar por WhatsApp</button>
                    `;
                    break;
                case 'cotizar':
                    responseText = 'Elige qué deseas cotizar:';
                    responseOptions = `
                        <button class="chat-option-btn" data-chat-option="cotizar_kilo">${iconCalc}Cotizar por Kilo</button>
                        <button class="chat-option-btn" data-chat-option="cotizar_edredon">${iconCalc}Cotizar Edredón</button>
                        <button class="chat-option-btn" data-chat-option="cotizar_terno">${iconCalc}Cotizar Terno</button>
                        <button class="chat-option-btn" data-chat-option="cotizar_kilos">${iconCalc}Cotizar por kilos</button>
                        <button class="chat-option-btn" data-chat-option="cotizar_foto">${iconCamera}Cotizar con Foto</button>
                    `;
                    break;
                case 'cotizar_kilo':
                    responseText = 'Lavado por kilo desde S/ 4.00. Incluye lavado, secado y doblado.';
                    responseOptions = `
                        <button class="chat-option-btn" data-chat-option="contacto">${iconUser}Cotizar por WhatsApp</button>
                    `;
                    break;
                case 'cotizar_edredon':
                    responseText = 'Edredones desde S/ 15.00 según tamaño y material.';
                    responseOptions = `
                        <button class="chat-option-btn" data-chat-option="contacto">${iconUser}Cotizar por WhatsApp</button>
                    `;
                    break;
                case 'cotizar_terno':
                    responseText = 'Ternos desde S/ 20.00 con planchado incluido.';
                    responseOptions = `
                        <button class="chat-option-btn" data-chat-option="contacto">${iconUser}Cotizar por WhatsApp</button>
                    `;
                    break;
                case 'cotizar_kilos':
                    responseText = '¿Cuántos kilos aprox necesitas lavar?';
                    responseOptions = `
                        <button class="chat-option-btn" data-chat-option="kilos_5">${iconCalc}5 kilos aprox</button>
                        <button class="chat-option-btn" data-chat-option="kilos_8">${iconCalc}8 kilos aprox</button>
                        <button class="chat-option-btn" data-chat-option="kilos_12">${iconCalc}12 kilos aprox</button>
                        <button class="chat-option-btn" data-chat-option="kilos_mas">${iconCalc}Más de 12 kilos</button>
                    `;
                    break;
                case 'kilos_5':
                case 'kilos_8':
                case 'kilos_12':
                case 'kilos_mas': {
                    const kiloLabelMap = {
                        kilos_5: '5 kilos aprox',
                        kilos_8: '8 kilos aprox',
                        kilos_12: '12 kilos aprox',
                        kilos_mas: 'más de 12 kilos'
                    };
                    const kilosLabel = kiloLabelMap[option] || 'varios kilos';
                    responseText = `Perfecto, ${kilosLabel}. Te llevo a WhatsApp para cotizar.`;
                    setTimeout(() => {
                        const message = `Hola JP Pro Wash, quiero cotizar ${kilosLabel} de lavado por kilo.`;
                        window.open(`https://wa.me/51978673626?text=${encodeURIComponent(message)}`, '_blank');
                    }, 1200);
                    break;
                }
                case 'servicios':
                    responseText = 'Elige el servicio que te interesa:';
                    responseOptions = `
                        <button class="chat-option-btn" data-chat-option="servicio_kilo">${iconPrice}Lavado por Kilo</button>
                        <button class="chat-option-btn" data-chat-option="servicio_seco">${iconGrid}Lavado al Seco</button>
                        <button class="chat-option-btn" data-chat-option="servicio_edredones">${iconGrid}Lavado de Edredones</button>
                    `;
                    break;
                case 'servicio_kilo':
                    responseText = 'Lavado por kilo desde S/ 4.00. Incluye lavado, secado y doblado.';
                    responseOptions = `
                        <button class="chat-option-btn" data-chat-option="contacto">${iconUser}Cotizar por WhatsApp</button>
                    `;
                    break;
                case 'servicio_seco':
                    responseText = 'Lavado al seco para prendas delicadas y ternos. Evaluamos cada prenda.';
                    responseOptions = `
                        <button class="chat-option-btn" data-chat-option="contacto">${iconUser}Cotizar por WhatsApp</button>
                    `;
                    break;
                case 'servicio_edredones':
                    responseText = 'Lavado de edredones desde S/ 15.00. Entrega estimada 24–48h.';
                    responseOptions = `
                        <button class="chat-option-btn" data-chat-option="contacto">${iconUser}Cotizar por WhatsApp</button>
                    `;
                    break;
                case 'cobertura':
                    responseText = 'Llegamos a Breña, Pueblo Libre, Jesús María, Lince, San Isidro, Lima Cercado y La Victoria.\n\nEl delivery es GRATIS a partir de 10 kilos en zonas cercanas.';
                    break;
                case 'entrega':
                    responseText = `Entrega estimada: 24–48 horas según el servicio.\nExpress desde 4 horas para ropa simple.\n${getHoursMessage()}`;
                    responseOptions = `
                        <button class="chat-option-btn" data-chat-option="contacto">${iconUser}Consultar disponibilidad</button>
                    `;
                    break;
                case 'recojo':
                    chatState.flow = 'recojo';
                    chatState.district = null;
                    responseText = '¿En qué distrito estás?';
                    responseOptions = `
                        <button class="chat-option-btn" data-chat-option="distrito_brena">${iconMap}Breña</button>
                        <button class="chat-option-btn" data-chat-option="distrito_pueblolibre">${iconMap}Pueblo Libre</button>
                        <button class="chat-option-btn" data-chat-option="distrito_jesusmaria">${iconMap}Jesús María</button>
                        <button class="chat-option-btn" data-chat-option="distrito_lince">${iconMap}Lince</button>
                    `;
                    break;
                case 'distrito_brena':
                case 'distrito_pueblolibre':
                case 'distrito_jesusmaria':
                case 'distrito_lince':
                    chatState.flow = 'recojo';
                    chatState.district = userText;
                    responseText = `Perfecto. ¿En qué horario prefieres el recojo en ${userText}?`;
                    responseOptions = `
                        <button class="chat-option-btn" data-chat-option="horario_hoy">${iconClock}Hoy (tarde)</button>
                        <button class="chat-option-btn" data-chat-option="horario_manana_am">${iconClock}Mañana (mañana)</button>
                        <button class="chat-option-btn" data-chat-option="horario_manana_pm">${iconClock}Mañana (tarde)</button>
                    `;
                    break;
                case 'horario_hoy':
                case 'horario_manana_am':
                case 'horario_manana_pm':
                    if (chatState.flow === 'recojo') {
                        const horario = userText;
                        const distrito = chatState.district || 'mi distrito';
                        responseText = `Listo. Registraré tu recojo en ${distrito} para ${horario}. Te envío a WhatsApp para confirmar.`;
                        setTimeout(() => {
                            const message = `Hola JP Pro Wash, quiero programar recojo. Distrito: ${distrito}. Horario: ${horario}.`;
                            window.open(`https://wa.me/51978673626?text=${encodeURIComponent(message)}`, '_blank');
                        }, 1200);
                    }
                    break;
                case 'horario':
                    responseText = `Nuestro horario de atención es:\nLunes a Sábado: 10:00 AM - 9:00 PM\nDomingos y Feriados: Cerrado.\n${getHoursMessage()}`;
                    break;
                case 'llegar':
                    responseText = 'Estamos en Jr. Jorge Chávez 1154, Breña.';
                    responseOptions = `
                        <button class="chat-option-btn" data-chat-option="maps_link">${iconMap}Abrir Google Maps</button>
                    `;
                    break;
                case 'maps_link':
                    responseText = 'Abriendo Google Maps.';
                    setTimeout(() => {
                        window.open('https://maps.google.com/?q=Jr.+Jorge+Chávez+1154,+Breña', '_blank');
                    }, 600);
                    break;
                case 'pagos':
                    responseText = 'Aceptamos efectivo, transferencias, Yape/Plin y todas las tarjetas de crédito o débito.';
                    break;
                case 'mas':
                    responseText = 'Aquí tienes más opciones útiles:';
                    responseOptions = `
                        <button class="chat-option-btn" data-chat-option="seguimiento">${iconClipboard}Estado de Pedido</button>
                        <button class="chat-option-btn" data-chat-option="cotizar_foto">${iconCamera}Cotizar con Foto</button>
                        <button class="chat-option-btn" data-chat-option="recomendar">${iconStar}Recomendación de Servicio</button>
                        <button class="chat-option-btn" data-chat-option="tips_cuidado">${iconShield}Consejos de Cuidado</button>
                    `;
                    break;
                case 'seguimiento':
                    responseText = 'Te llevo a WhatsApp para revisar el estado de tu pedido.';
                    setTimeout(() => {
                        const message = 'Hola JP Pro Wash, quiero conocer el estado de mi pedido.';
                        window.open(`https://wa.me/51978673626?text=${encodeURIComponent(message)}`, '_blank');
                    }, 1200);
                    break;
                case 'cotizar_foto':
                    responseText = 'Envíanos una foto de la prenda y te damos un precio exacto.';
                    setTimeout(() => {
                        const message = 'Hola JP Pro Wash, quiero cotizar con foto. Te envío la prenda.';
                        window.open(`https://wa.me/51978673626?text=${encodeURIComponent(message)}`, '_blank');
                    }, 1200);
                    break;
                case 'recomendar':
                    responseText = '¿Qué prenda necesitas lavar?';
                    responseOptions = `
                        <button class="chat-option-btn" data-chat-option="prenda_diaria">${iconStar}Ropa diaria</button>
                        <button class="chat-option-btn" data-chat-option="prenda_terno">${iconStar}Ternos y trajes</button>
                        <button class="chat-option-btn" data-chat-option="prenda_edredon">${iconStar}Edredones</button>
                        <button class="chat-option-btn" data-chat-option="prenda_zapatillas">${iconStar}Zapatillas</button>
                        <button class="chat-option-btn" data-chat-option="prenda_cortinas">${iconStar}Cortinas</button>
                    `;
                    break;
                case 'prenda_diaria':
                    responseText = 'Para ropa diaria te conviene Lavado por Kilo. Incluye lavado, secado y doblado.';
                    responseOptions = `
                        <button class="chat-option-btn" data-chat-option="cotizar">${iconCalc}Cotizar Rápido</button>
                        <button class="chat-option-btn" data-chat-option="contacto">${iconUser}Cotizar por WhatsApp</button>
                    `;
                    break;
                case 'prenda_terno':
                    responseText = 'Para ternos recomendamos Lavado al Seco con planchado incluido.';
                    responseOptions = `
                        <button class="chat-option-btn" data-chat-option="servicios">${iconGrid}Ver Servicios</button>
                        <button class="chat-option-btn" data-chat-option="contacto">${iconUser}Cotizar por WhatsApp</button>
                    `;
                    break;
                case 'prenda_edredon':
                    responseText = 'Para edredones ofrecemos lavado especializado con entrega estimada 24–48h.';
                    responseOptions = `
                        <button class="chat-option-btn" data-chat-option="servicios">${iconGrid}Ver Servicios</button>
                        <button class="chat-option-btn" data-chat-option="contacto">${iconUser}Cotizar por WhatsApp</button>
                    `;
                    break;
                case 'prenda_zapatillas':
                    responseText = 'Para zapatillas usamos limpieza profunda y secado controlado.';
                    responseOptions = `
                        <button class="chat-option-btn" data-chat-option="contacto">${iconUser}Cotizar por WhatsApp</button>
                        <button class="chat-option-btn" data-chat-option="servicios">${iconGrid}Ver Servicios</button>
                    `;
                    break;
                case 'prenda_cortinas':
                    responseText = 'Para cortinas recomendamos lavado especializado con cuidado de fibras.';
                    responseOptions = `
                        <button class="chat-option-btn" data-chat-option="contacto">${iconUser}Cotizar por WhatsApp</button>
                        <button class="chat-option-btn" data-chat-option="servicios">${iconGrid}Ver Servicios</button>
                    `;
                    break;
                case 'tips_cuidado':
                    responseText = 'Tips rápidos:\n- Separa colores y revisa etiquetas.\n- Vacía bolsillos y cierra cremalleras.\n- Prendas delicadas: lavado al seco.\n\n¿Quieres que te recomiende un servicio?';
                    responseOptions = `
                        <button class="chat-option-btn" data-chat-option="recomendar">${iconStar}Recomendar Servicio</button>
                        <button class="chat-option-btn" data-chat-option="contacto">${iconUser}Hablar con un Humano</button>
                    `;
                    break;
                case 'contacto':
                    responseText = '¡Claro! Te conectaré con un asesor humano por WhatsApp ahora mismo.';
                    setTimeout(() => {
                        window.open('https://wa.me/51978673626?text=Hola,%20vengo%20del%20chat%20de%20la%20web', '_blank');
                    }, 1500);
                    break;
            }

            const bubble = document.createElement('div');
            bubble.className = 'chat-bubble';
            botMsg.appendChild(bubble);
            chatbotBody.appendChild(botMsg);
            requestAnimationFrame(() => {
                userMsg.scrollIntoView({ block: 'start', behavior: 'auto' });
                botMsg.classList.add('chat-bounce');
                smoothScrollWithBounce();
            });
            typeBubble(bubble, responseText).then(() => {
                if (responseOptions) {
                    const optionsWrap = document.createElement('div');
                    optionsWrap.className = 'chat-options';
                    optionsWrap.innerHTML = responseOptions;
                    botMsg.appendChild(optionsWrap);
                    if (option !== 'menu') {
                        appendBackToMenu(optionsWrap);
                    }
                    smoothScrollWithBounce();
                } else if (option !== 'menu') {
                    appendBackToMenu();
                    smoothScrollWithBounce();
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

    function initPricingSection() {
        const pricingSection = document.getElementById('precios');
        if (!pricingSection) return;

        const featuredEl = document.getElementById('pricing-featured');
        const featuredBlockEl = document.getElementById('pricing-featured-block');
        const resultsEl = document.getElementById('pricing-results');
        const categoriesEl = document.getElementById('pricing-categories');
        const searchInput = document.getElementById('pricing-search');
        const emptyEl = document.getElementById('pricing-empty');
        const clearButton = document.querySelector('.pricing-clear-btn');

        if (!resultsEl || !searchInput || !emptyEl) return;

        const paths = {
            featured: 'assets/images/Precios/servicios_principales.json',
            all: 'assets/images/Precios/servicios_all_normalizado.json',
            categories: 'assets/images/Precios/servicios_por_categoria.json',
            jsonldFeatured: 'assets/images/Precios/jsonld_servicios_principales.json',
            jsonldFull: 'assets/images/Precios/jsonld_servicios_completo.json'
        };

        const state = {
            category: 'all',
            query: ''
        };

        const isFullPricingPage = document.body?.dataset?.pricingMode === 'full';

        function normalizeText(value) {
            return value
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '');
        }

        function renderCards(items, target) {
            target.innerHTML = '';
            const fragment = document.createDocumentFragment();
            items.forEach((item) => {
                const formattedPrice = item.priceFormatted ? String(item.priceFormatted) : 'Consultar';
                const card = document.createElement('div');
                card.className = 'pricing-card';
                card.innerHTML = `
                    <span class="pricing-meta">${item.category}</span>
                    <h4>${item.name}</h4>
                    <span class="pricing-price">${formattedPrice}</span>
                `;
                fragment.appendChild(card);
            });
            target.appendChild(fragment);
        }

        function renderEmpty(isEmpty) {
            emptyEl.hidden = !isEmpty;
        }

        function buildCategoryButtons(categories) {
            if (!categoriesEl) return;
            categoriesEl.innerHTML = '';
            const fragment = document.createDocumentFragment();

            const allButton = document.createElement('button');
            allButton.className = 'pricing-category-btn active';
            allButton.type = 'button';
            allButton.dataset.category = 'all';
            allButton.textContent = 'Todas';
            fragment.appendChild(allButton);

            categories.forEach((category) => {
                const button = document.createElement('button');
                button.className = 'pricing-category-btn';
                button.type = 'button';
                button.dataset.category = category;
                button.textContent = category;
                fragment.appendChild(button);
            });

            categoriesEl.appendChild(fragment);
        }

        function setActiveCategory(category) {
            if (!categoriesEl) return;
            categoriesEl.querySelectorAll('.pricing-category-btn').forEach((btn) => {
                btn.classList.toggle('active', btn.dataset.category === category);
            });
        }

        function filterItems(items) {
            if (!state.query) return items;
            const query = normalizeText(state.query);
            return items.filter((item) => {
                const name = normalizeText(item.name);
                const category = normalizeText(item.category);
                return name.includes(query) || category.includes(query);
            });
        }

        function updateResults(allItems, categoryMap) {
            const minChars = isFullPricingPage ? 1 : 3;
            const hasQuery = state.query.length >= minChars;
            let items = [];
            if (isFullPricingPage) {
                if (state.category === 'all') {
                    items = allItems;
                } else {
                    items = categoryMap[state.category] || [];
                }
            } else if (hasQuery) {
                items = allItems;
            } else if (state.category === 'all') {
                items = [];
            } else {
                items = categoryMap[state.category] || [];
            }

            const shouldFilter = isFullPricingPage ? state.query.length > 0 : hasQuery;
            const filtered = shouldFilter ? filterItems(items) : items;
            renderCards(filtered, resultsEl);
            if (!isFullPricingPage && !hasQuery && state.category === 'all') {
                emptyEl.textContent = 'Escribe al menos 3 letras para buscar servicios.';
                renderEmpty(true);
            } else {
                emptyEl.textContent = 'No se encontraron servicios.';
                renderEmpty(filtered.length === 0);
            }
            if (featuredBlockEl) {
                if (isFullPricingPage) {
                    featuredBlockEl.style.display = state.query.length ? 'none' : '';
                } else {
                    featuredBlockEl.style.display = !hasQuery && state.category === 'all' ? '' : 'none';
                }
            }
        }

        function injectJsonLd(path, id) {
            if (document.getElementById(id)) return;
            fetch(path)
                .then((response) => response.json())
                .then((data) => {
                    const script = document.createElement('script');
                    script.type = 'application/ld+json';
                    script.id = id;
                    script.textContent = JSON.stringify(data);
                    document.head.appendChild(script);
                })
                .catch(() => {});
        }

        const featuredPromise = featuredEl
            ? fetch(paths.featured).then((response) => response.json())
            : Promise.resolve([]);

        Promise.all([
            featuredPromise,
            fetch(paths.all).then((response) => response.json()),
            fetch(paths.categories).then((response) => response.json())
        ])
            .then(([featured, allItems, categoryMap]) => {
                if (featuredEl) {
                    renderCards(featured, featuredEl);
                }
                buildCategoryButtons(Object.keys(categoryMap).sort());
                updateResults(allItems, categoryMap);

                if (categoriesEl) {
                    categoriesEl.addEventListener('click', (event) => {
                        const button = event.target.closest('.pricing-category-btn');
                        if (!button) return;
                        state.category = button.dataset.category;
                        setActiveCategory(state.category);
                        updateResults(allItems, categoryMap);
                    });
                }

                searchInput.addEventListener('input', (event) => {
                    state.query = event.target.value.trim();
                    if ((isFullPricingPage && state.query.length >= 1) || (!isFullPricingPage && state.query.length >= 3)) {
                        state.category = 'all';
                        setActiveCategory('all');
                    }
                    if (searchInput.parentElement) {
                        searchInput.parentElement.classList.toggle('has-value', state.query.length > 0);
                    }
                    updateResults(allItems, categoryMap);
                });

                if (clearButton) {
                    clearButton.addEventListener('click', () => {
                        searchInput.value = '';
                        state.query = '';
                        if (searchInput.parentElement) {
                            searchInput.parentElement.classList.remove('has-value');
                        }
                        updateResults(allItems, categoryMap);
                        searchInput.focus();
                    });
                }

                if (window.innerWidth <= 768) {
                    searchInput.focus();
                }

                injectJsonLd(paths.jsonldFeatured, 'pricing-jsonld-featured');
                injectJsonLd(paths.jsonldFull, 'pricing-jsonld-full');
            })
            .catch(() => {
                renderEmpty(true);
            });
    }

    initPricingSection();
});
