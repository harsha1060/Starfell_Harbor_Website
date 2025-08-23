/* ===================================================================
   Starfell Harbor - Main JavaScript File
   =================================================================== */

document.addEventListener('DOMContentLoaded', function() {

    /* ===================================================================
       1. SHARED FUNCTIONALITY (Runs on all pages)
       - Mobile menu and dropdown logic.
       =================================================================== */
    
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const blogsButton = document.getElementById('blogs-button');
    const blogsMenu = document.getElementById('blogs-menu');
    const mobileBlogsButton = document.getElementById('mobile-blogs-button');
    const mobileBlogsMenu = document.getElementById('mobile-blogs-menu');

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    if (mobileBlogsButton) {
        mobileBlogsButton.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileBlogsMenu.classList.toggle('hidden');
        });
    }

    if (blogsButton) {
        blogsButton.addEventListener('click', function(event) {
            event.stopPropagation();
            blogsButton.parentElement.classList.toggle('open');
        });
    }

    document.addEventListener('click', function(event) {
        if (blogsButton && blogsMenu && !blogsButton.parentElement.contains(event.target)) {
            blogsButton.parentElement.classList.remove('open');
        }
        if (mobileMenuButton && mobileMenu && !mobileMenu.parentElement.contains(event.target)) {
            mobileMenu.classList.add('hidden');
        }
    });

    // Logic to update the dropdown text based on the current page
    const pagePath = window.location.pathname;
    const dropdownTextElement = document.getElementById('dropdown-text');
    const mobileDropdownTextElement = document.getElementById('mobile-dropdown-text');

    let currentPageName = 'Blogs'; // Default
    if (pagePath.includes('/cyber/')) {
        currentPageName = 'Cyber';
    } else if (pagePath.includes('/tech/')) {
        currentPageName = 'Tech';
    } else if (pagePath.includes('/personal/')) {
        currentPageName = 'Personal';
    }
    
    if (dropdownTextElement) {
        dropdownTextElement.textContent = currentPageName;
    }
    if (mobileDropdownTextElement) {
        mobileDropdownTextElement.textContent = currentPageName;
    }

    // Smoothly fade in the logo after the font has loaded
    const logo = document.querySelector('.js-logo-fade');
    if (logo) {
        // Use a small timeout to allow the browser to render and load the font
        setTimeout(() => {
            logo.classList.add('visible');
        }, 100);
    }


    /* ===================================================================
       2. HOMEPAGE-ONLY SCRIPTS
       - Checks for homepage elements before running.
       =================================================================== */
    
    const homeSection = document.getElementById('home');
    if (homeSection) {
        // --- Scroll to top on load ---
        window.scrollTo(0, 0);

        // --- Animate title text ---
        function animateText(elementId) {
            const element = document.getElementById(elementId);
            if (!element) return;
            const text = element.innerText;
            element.innerHTML = '';
            text.split('').forEach(char => {
                const span = document.createElement('span');
                span.className = 'char';
                span.innerHTML = char === ' ' ? '&nbsp;' : char;
                span.style.animationDelay = `${Math.random() * 0.8}s`;
                element.appendChild(span);
            });
        }

        setTimeout(() => {
            animateText('anim-text-1');
            animateText('anim-text-2');
        }, 200);

        // --- Intersection Observer for fade-in elements ---
        const animatedElements = document.querySelectorAll('.fade-in-up, .deco-doodle');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        animatedElements.forEach(el => observer.observe(el));

        // --- "About Me" section scroll animation ---
        const aboutMeSection = document.querySelector('.about-me-container');
        const bgText = document.getElementById('about-me-bg-text');
        const content = document.getElementById('about-me-content');

        window.addEventListener('scroll', () => {
            if (!aboutMeSection || !bgText || !content) return;

            const rect = aboutMeSection.getBoundingClientRect();
            let scrollPercent = 0;

            if (rect.top <= (window.innerHeight / 2) && rect.bottom >= (window.innerHeight / 2)) {
                scrollPercent = ((window.innerHeight / 2) - rect.top) / (rect.height - window.innerHeight);
                scrollPercent = Math.max(0, Math.min(1, scrollPercent));
            } else if (rect.bottom < (window.innerHeight / 2)) {
                scrollPercent = 1;
            }

            const blurValue = scrollPercent * 10;
            bgText.style.filter = `blur(${blurValue}px)`;
            bgText.style.opacity = 1 - scrollPercent * 0.5;
            content.style.opacity = scrollPercent;
        });
    }

});
