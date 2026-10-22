document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');
    const heroBtnSkills = document.querySelector('.hero-btn-skills');
    const heroBtnContact = document.querySelector('.hero-btn-contact');
    const mobileWarningBanner = document.getElementById('mobile-warning-banner');
    const closeWarningBtn = document.getElementById('close-warning-btn');
    const warningDismissedKey = 'mobileWarningDismissed_AhmadIT';

    function wasWarningDismissed() {
        try {
            return localStorage.getItem(warningDismissedKey) === 'true';
        } catch (e) {
            return false;
        }
    }

    function showMobileWarning() {
        if (mobileWarningBanner) {
            mobileWarningBanner.classList.add('show-warning');
        }
    }

    function hideMobileWarning() {
        if (mobileWarningBanner) {
            mobileWarningBanner.classList.remove('show-warning');
        }
        try {
            localStorage.setItem(warningDismissedKey, 'true');
        } catch (e) {}
    }

    if (window.innerWidth < 768 && !wasWarningDismissed()) {
        showMobileWarning();
    }

    if (closeWarningBtn) {
        closeWarningBtn.addEventListener('click', hideMobileWarning);
    }

    function showPage(pageId, clickedLinkElement) {
        pages.forEach(page => page.classList.remove('active'));
        
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        navLinks.forEach(link => link.classList.remove('active-link'));
        
        const correspondingNavLink = document.querySelector(`.nav-link[href="#${pageId}"]`);
        if (correspondingNavLink) {
            correspondingNavLink.classList.add('active-link');
        }
        
        const mainNavUl = document.getElementById('main-nav').querySelector('ul');
        if (mainNavUl && mainNavUl.classList.contains('show')) {
            mainNavUl.classList.remove('show');
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const pageId = link.getAttribute('href').substring(1);
            showPage(pageId, link);
        });
    });

    if (heroBtnSkills) {
        heroBtnSkills.addEventListener('click', (e) => {
            const pageId = heroBtnSkills.getAttribute('href').substring(1);
            const targetNavLink = document.querySelector(`.nav-link[href="#${pageId}"]`);
            showPage(pageId, targetNavLink);
            document.getElementById(pageId)?.scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (heroBtnContact) {
        heroBtnContact.addEventListener('click', (e) => {
            const pageId = heroBtnContact.getAttribute('href').substring(1);
            const targetNavLink = document.querySelector(`.nav-link[href="#${pageId}"]`);
            showPage(pageId, targetNavLink);
            document.getElementById(pageId)?.scrollIntoView({ behavior: 'smooth' });
        });
    }

    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNavUl = document.getElementById('main-nav').querySelector('ul');

    if (mobileMenuToggle && mainNavUl) {
        mobileMenuToggle.addEventListener('click', () => {
            mainNavUl.classList.toggle('show');
        });
    }

    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    function initializePage() {
        const initialPageId = window.location.hash ? window.location.hash.substring(1) : 'home';
        const initialLinkElement = document.querySelector(`.nav-link[href="#${initialPageId}"]`);
        showPage(initialPageId, initialLinkElement);

        if (window.location.hash && document.getElementById(initialPageId)) {
            setTimeout(() => {
                document.getElementById(initialPageId).scrollIntoView({ behavior: 'auto' });
            }, 0);
        }
    }
    initializePage();
});
