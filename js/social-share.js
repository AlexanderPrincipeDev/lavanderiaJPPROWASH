/**
 * Social Sharing Widget
 * Adds social sharing buttons to the page
 */

function initSocialShare() {
    // Only add if not already present
    if (document.querySelector('.social-share-section')) return;

    const currentUrl = encodeURIComponent(window.location.href);
    const pageTitle = encodeURIComponent(document.title);

    // Create the section
    const shareSection = document.createElement('section');
    shareSection.className = 'section social-share-section';
    shareSection.style.backgroundColor = 'var(--color-bg-secondary)';
    shareSection.style.padding = '3rem 0';
    shareSection.style.textAlign = 'center';

    const container = document.createElement('div');
    container.className = 'container';

    const title = document.createElement('h3');
    title.textContent = '¿Te gustó este servicio? ¡Compártelo!';
    title.style.marginBottom = '1.5rem';
    title.style.color = 'var(--color-text-dark)';

    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.display = 'flex';
    buttonsContainer.style.justifyContent = 'center';
    buttonsContainer.style.gap = '1rem';
    buttonsContainer.style.flexWrap = 'wrap';

    // WhatsApp
    const waBtn = createShareButton(
        'WhatsApp',
        `https://api.whatsapp.com/send?text=${pageTitle}%20${currentUrl}`,
        '#1A6F3C'
    );

    // Facebook
    const fbBtn = createShareButton(
        'Facebook',
        `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
        '#0F5FA8'
    );

    // X (Twitter)
    const xBtn = createShareButton(
        'X',
        `https://twitter.com/intent/tweet?text=${pageTitle}&url=${currentUrl}`,
        '#000000'
    );

    const fragment = document.createDocumentFragment();
    buttonsContainer.appendChild(waBtn);
    buttonsContainer.appendChild(fbBtn);
    buttonsContainer.appendChild(xBtn);

    container.appendChild(title);
    container.appendChild(buttonsContainer);
    shareSection.appendChild(container);
    fragment.appendChild(shareSection);

    // Insert before footer
    const footer = document.querySelector('footer');
    if (footer && footer.parentNode) {
        footer.parentNode.insertBefore(fragment, footer);
    }
}

window.addEventListener('load', () => {
    if ('requestIdleCallback' in window) {
        requestIdleCallback(initSocialShare);
    } else {
        setTimeout(initSocialShare, 0);
    }
});

function createShareButton(platform, url, color) {
    const btn = document.createElement('a');
    btn.href = url;
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
    btn.textContent = platform;
    btn.style.display = 'inline-block';
    btn.style.padding = '10px 20px';
    btn.style.backgroundColor = color;
    btn.style.color = '#ffffff';
    btn.style.borderRadius = '50px';
    btn.style.textDecoration = 'none';
    btn.style.fontWeight = '600';
    btn.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
    btn.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';

    btn.onmouseover = () => {
        btn.style.transform = 'translateY(-2px)';
        btn.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
    };

    btn.onmouseout = () => {
        btn.style.transform = 'translateY(0)';
        btn.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    };

    return btn;
}
