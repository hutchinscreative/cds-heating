document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation Toggle ---
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const toggleIcon = navToggle.querySelector('i');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Change icon
            if (navMenu.classList.contains('active')) {
                toggleIcon.classList.remove('fa-bars');
                toggleIcon.classList.add('fa-xmark');
            } else {
                toggleIcon.classList.remove('fa-xmark');
                toggleIcon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            toggleIcon.classList.remove('fa-xmark');
            toggleIcon.classList.add('fa-bars');
        });
    });

    // --- Header Scroll Effect ---
    const header = document.getElementById('header');

    const scrollHeader = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', scrollHeader);

    // Initial check in case page loads partway down
    scrollHeader();


    // --- Active Link Switching on Scroll ---
    const sections = document.querySelectorAll('section[id]');

    const scrollActive = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // Account for fixed header
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                if (navLink) navLink.classList.add('active');
            } else {
                if (navLink) navLink.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', scrollActive);

    // --- Simple Scroll Animation/Lazy Loading (Intersection Observer) ---
    // Target elements to fade in
    const faders = document.querySelectorAll('.service-card, .stat-card, .review-card, .about-content');

    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    // Set initial state for faders
    faders.forEach(fader => {
        fader.style.opacity = '0';
        fader.style.transform = 'translateY(30px)';
        fader.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        appearOnScroll.observe(fader);
    });

    // --- Hero Carousel Auto-Scroll ---
    const carouselElement = document.getElementById('hero-carousel');
    if (carouselElement) {
        let currentSlide = 0;
        const slideCount = carouselElement.children.length;

        setInterval(() => {
            currentSlide = (currentSlide + 1) % slideCount;
            carouselElement.style.transform = `translateX(-${currentSlide * 100}%)`;
        }, 3500); // Transitions every 3.5 seconds
    }
});
