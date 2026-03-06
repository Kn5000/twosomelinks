import './style.css'
import posthog from 'posthog-js'

// Initialize PostHog Analytics
posthog.init('phc_ukn6YnBRnkjeMqNYJBObCIKiMGDztYegJFqHLTJFv3n', {
    api_host: 'https://eu.i.posthog.com',
    person_profiles: 'identified_only',
    capture_pageview: true,
})

document.addEventListener('DOMContentLoaded', () => {
    // Track outbound link clicks
    const links = document.querySelectorAll('.link-btn');
    links.forEach(link => {
        link.addEventListener('click', () => {
            const targetUrl = link.getAttribute('href');
            const targetText = link.textContent?.trim() || 'Unknown Link';

            posthog.capture('link_clicked', {
                url: targetUrl,
                title: targetText
            });
        });
    });
});

console.log('Twosome Project links loaded.');
