import './style.css'
import posthog from 'posthog-js'

// 1. Initialize PostHog
// The user will replace 'YOUR_PROJECT_API_KEY' and 'YOUR_POSTHOG_HOST' with their actual values from the PostHog dashboard.
posthog.init('phc_A1P1Mjb2bk7YcE34bI0IW0HbN1uDRvRbY8BofU0Xrk5', {
    api_host: 'https://eu.i.posthog.com', // Defaulting to EU cloud, can be replaced with US if needed
    person_profiles: 'identified_only' // don't create profiles for anonymous users to save on events
})

// 2. Track Link Clicks
document.addEventListener('DOMContentLoaded', () => {

    // Track Social Icons
    const socialIcons = document.querySelectorAll('.social-icons a');
    socialIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            const platform = icon.getAttribute('aria-label') || 'Unknown Social';
            posthog.capture('social_link_clicked', { platform: platform });
        });
    });

    // Track Main Links and Video Links
    const mainLinks = document.querySelectorAll('.link-btn, .link-video');
    mainLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Try to get text content or fallback to a data attribute if we add one, or use class names
            let linkName = link.textContent?.trim() || 'Video Link';

            // For the video link, the text might be long, let's simplify
            if (link.classList.contains('link-video')) {
                linkName = 'Youtube Video Link';
            }

            posthog.capture('main_link_clicked', { link_name: linkName });
        });
    });
});

console.log('Linktree loaded and PostHog initialized.');
