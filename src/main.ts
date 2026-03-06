import './style.css'
import posthog from 'posthog-js'

// Initialize PostHog Analytics
posthog.init('phc_ukn6YnBRnkjeMqNYJBObCIKiMGDztYegJFqHLTJFv3n', {
    api_host: 'https://us.i.posthog.com',
    person_profiles: 'identified_only',
    capture_pageview: true,
})

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.link-btn');

    links.forEach(link => {
        // Track outbound link clicks
        link.addEventListener('click', () => {
            const targetUrl = link.getAttribute('href');
            const targetText = link.textContent?.trim() || 'Unknown Link';

            posthog.capture('link_clicked', {
                url: targetUrl,
                title: targetText
            });
        });

        // Precise mobile tap feedback (ignores scroll highlighting)
        link.addEventListener('touchstart', () => {
            link.classList.add('tap-active');
        }, { passive: true });

        link.addEventListener('touchmove', () => {
            link.classList.remove('tap-active');
        }, { passive: true });

        link.addEventListener('touchend', () => {
            setTimeout(() => link.classList.remove('tap-active'), 150);
        }, { passive: true });

        link.addEventListener('touchcancel', () => {
            link.classList.remove('tap-active');
        }, { passive: true });
    });
});

console.log('Twosome Project links loaded.');
