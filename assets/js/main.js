/* ===================================================================
    Starfell Harbor - Main JavaScript File
    =================================================================== */

document.addEventListener('DOMContentLoaded', function() {

    /* ===================================================================
        1. SHARED FUNCTIONALITY (Runs on all pages)
        =================================================================== */
    
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const blogsButton = document.getElementById('blogs-button');
    const blogsMenu = document.getElementById('blogs-menu');
    const mobileBlogsButton = document.getElementById('mobile-blogs-button');
    const mobileBlogsMenu = document.getElementById('mobile-blogs-menu');

    // Toggle mobile menu
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Toggle mobile dropdown submenu
    if (mobileBlogsButton && mobileBlogsMenu) {
        mobileBlogsButton.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileBlogsMenu.classList.toggle('hidden');
        });
    }

    // Toggle desktop dropdown
    if (blogsButton) {
        blogsButton.addEventListener('click', function(event) {
            event.stopPropagation();
            blogsButton.parentElement.classList.toggle('open');
        });
    }

    // Close menus when clicking outside (IMPROVED LOGIC)
    document.addEventListener('click', function(event) {
        // Close desktop dropdown
        if (blogsButton && !blogsButton.parentElement.contains(event.target)) {
            blogsButton.parentElement.classList.remove('open');
        }
        // Close entire mobile menu
        if (mobileMenu && !mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
            mobileMenu.classList.add('hidden');
        }
    });

    // Update dropdown title based on current page
    const pagePath = window.location.pathname;
    const dropdownTextElement = document.getElementById('dropdown-text');
    const mobileDropdownTextElement = document.getElementById('mobile-dropdown-text');

    let currentPageName = 'Blogs';
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

    // Fade in logo
    const logo = document.querySelector('.js-logo-fade');
    if (logo) {
        setTimeout(() => {
            logo.classList.add('visible');
        }, 100);
    }

    /* ===================================================================
        2. HOMEPAGE-ONLY SCRIPTS (IMPROVED DETECTION)
        =================================================================== */
    
    if (document.body.classList.contains('homepage-body')) {

        // --- Text Animation Logic ---
        function animateHeroTitle() {
            const heroTitle = document.getElementById('hero-title');
            if (!heroTitle) return;

            const words = heroTitle.querySelectorAll('.animate-word');
            
            words.forEach(word => {
                const text = word.innerText;
                word.innerHTML = '';
                text.split('').forEach(char => {
                    const span = document.createElement('span');
                    span.className = 'char';
                    span.innerHTML = char === ' ' ? '&nbsp;' : char;
                    span.style.animationDelay = `${Math.random() * 0.8}s`;
                    word.appendChild(span);
                });
            });
            heroTitle.style.opacity = 1;
        }

        window.addEventListener('load', function() {
            setTimeout(animateHeroTitle, 100); 
        });


        // --- Intersection Observer for fade-in elements (IMPROVED) ---
        const animatedElements = document.querySelectorAll('.fade-in-up, .deco-doodle, .animated-deco');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        animatedElements.forEach(el => observer.observe(el));

        // --- "About Me" section scroll animation (YOUR PREFERRED VERSION) ---
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
            const blurValue = scrollPercent * 7;
            bgText.style.filter = `blur(${blurValue}px)`;
            bgText.style.opacity = 1 - scrollPercent * 0.5;
            content.style.opacity = scrollPercent;
        });
    }
});