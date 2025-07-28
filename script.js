document.addEventListener('DOMContentLoaded', function() {
    gsap.registerPlugin(ScrollTrigger);
    
    initNavigation();
    initRightHoverMenu();
    initInteractiveQuestions();
    initAdvancedAnimations();
    initCounters();
    initTabs();
    setupIntersectionObserver();
    
    setTimeout(() => {
        initializeAnimations();
    }, 100);
    
    if (document.querySelector('.qr-page')) {
        initQrPage();
    }
});

function initializeAnimations() {
    animateHero();
    initScrollAnimations();
    initHorizontalProfiles();
    initAdvancedScrollEffects();
    initParallaxEffects();
}

function initNavigation() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const siteHeader = document.querySelector('.site-header');
    
    const sidebarToggle = document.querySelector('#sidebarToggle');
    const leftSidebar = document.querySelector('#leftSidebar');
    const sidebarNav = document.querySelector('#sidebarNav');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    
    if (sidebarToggle && leftSidebar) {
        sidebarToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            leftSidebar.classList.toggle('collapsed');
            
            const isExpanded = !leftSidebar.classList.contains('collapsed');
            sidebarToggle.setAttribute('aria-expanded', isExpanded);
        });
        
        document.addEventListener('click', function(e) {
            if (!leftSidebar.contains(e.target) && !leftSidebar.classList.contains('collapsed')) {
                leftSidebar.classList.add('collapsed');
                sidebarToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        if (sidebarNav) {
            sidebarNav.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
        
        sidebarToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        function updateActiveLink() {
            const sections = document.querySelectorAll('section[id]');
            let currentSection = '';
            
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const sectionTop = rect.top;
                const sectionHeight = rect.height;
                
                if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
                    currentSection = section.id;
                }
            });
            
            sidebarLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href && href.startsWith('#') && href === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }
        
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(updateActiveLink, 10);
        });
        
        updateActiveLink();
        
        sidebarToggle.setAttribute('aria-expanded', 'false');
        sidebarToggle.setAttribute('aria-label', 'Toggle navigation sidebar');
    }
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            document.body.classList.toggle('mobile-menu-open');
            mobileMenu.classList.toggle('active');
            
            const spans = mobileMenuToggle.querySelectorAll('span');
            if (document.body.classList.contains('mobile-menu-open')) {
                gsap.to(spans[0], {rotation: 45, y: 7, duration: 0.3});
                gsap.to(spans[1], {opacity: 0, duration: 0.3});
                gsap.to(spans[2], {rotation: -45, y: -7, duration: 0.3});
            } else {
                gsap.to(spans[0], {rotation: 0, y: 0, duration: 0.3});
                gsap.to(spans[1], {opacity: 1, duration: 0.3});
                gsap.to(spans[2], {rotation: 0, y: 0, duration: 0.3});
            }
        });
    }
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            document.body.classList.remove('mobile-menu-open');
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
            
            const spans = mobileMenuToggle?.querySelectorAll('span');
            if (spans) {
                gsap.to(spans[0], {rotation: 0, y: 0, duration: 0.3});
                gsap.to(spans[1], {opacity: 1, duration: 0.3});
                gsap.to(spans[2], {rotation: 0, y: 0, duration: 0.3});
            }
        });
    });
    
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            gsap.to(siteHeader, {backgroundColor: 'rgba(26, 26, 26, 0.98)', duration: 0.3});
            siteHeader?.classList.add('scrolled');
        } else {
            gsap.to(siteHeader, {backgroundColor: 'rgba(26, 26, 26, 0.95)', duration: 0.3});
            siteHeader?.classList.remove('scrolled');
        }
        
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            gsap.to(siteHeader, {y: '-100%', duration: 0.3, ease: 'power2.out'});
        } else {
            gsap.to(siteHeader, {y: '0%', duration: 0.3, ease: 'power2.out'});
        }
        
        lastScrollTop = scrollTop;
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = siteHeader?.offsetHeight || 80;
                
                if (window.innerWidth <= 768 && leftSidebar) {
                    leftSidebar.classList.add('collapsed');
                }
                
                gsap.to(window, {
                    scrollTo: {
                        y: targetElement,
                        offsetY: headerHeight
                    },
                    duration: 1.2,
                    ease: 'power3.inOut'
                });
            }
        });
    });
}

function initRightHoverMenu() {
    const rightMenu = document.getElementById('rightHoverMenu');
    if (!rightMenu) return;
    
    const menuTrigger = rightMenu.querySelector('.menu-trigger');
    const menuContent = rightMenu.querySelector('.menu-content');
    const menuItems = rightMenu.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const headerHeight = document.querySelector('.site-header')?.offsetHeight || 80;
                    
                    gsap.to(window, {
                        scrollTo: {
                            y: targetElement,
                            offsetY: headerHeight
                        },
                        duration: 1.2,
                        ease: 'power3.inOut'
                    });
                }
            }
        });
    });
    
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            gsap.to(rightMenu, {x: '100px', opacity: 0.3, duration: 0.3});
        } else {
            gsap.to(rightMenu, {x: '0px', opacity: 1, duration: 0.3});
        }
        
        lastScrollTop = scrollTop;
    });
}

function initInteractiveQuestions() {
    const navBtns = document.querySelectorAll('.question-nav-btn');
    const panels = document.querySelectorAll('.question-panel');
    
    if (!navBtns.length || !panels.length) return;
    
    navBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetQuestion = this.getAttribute('data-question');
            
            navBtns.forEach(b => b.classList.remove('active'));
            
            this.classList.add('active');
            
            panels.forEach(p => {
                p.classList.remove('active');
                gsap.set(p, {opacity: 0, display: 'none'});
            });
            
            const targetPanel = document.querySelector(`.question-panel[data-question="${targetQuestion}"]`);
            if (targetPanel) {
                targetPanel.classList.add('active');
                gsap.set(targetPanel, {display: 'grid'});
                
                gsap.fromTo(targetPanel, 
                    {opacity: 0, y: 20},
                    {opacity: 1, y: 0, duration: 0.5, ease: 'power2.out'}
                );
                
                const questionImage = targetPanel.querySelector('.question-image');
                if (questionImage) {
                    gsap.fromTo(questionImage, 
                        {scale: 0.9, opacity: 0},
                        {scale: 1, opacity: 1, duration: 0.6, delay: 0.2, ease: 'power2.out'}
                    );
                }
                
                const textElements = targetPanel.querySelectorAll('.question-text h3, .question-text p, .question-features li');
                if (textElements.length) {
                    gsap.fromTo(textElements,
                        {opacity: 0, x: 30},
                        {opacity: 1, x: 0, duration: 0.4, stagger: 0.1, delay: 0.3, ease: 'power2.out'}
                    );
                }
            }
        });
    });
    
    let currentIndex = 0;
    setInterval(() => {
        if (navBtns.length > 0) {
            currentIndex = (currentIndex + 1) % navBtns.length;
            navBtns[currentIndex].click();
        }
    }, 8000);
}

function initAdvancedAnimations() {
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        const icon = item.querySelector('.service-icon');
        
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                y: -10,
                scale: 1.03,
                boxShadow: '0 20px 40px rgba(255, 215, 0, 0.2)',
                duration: 0.4,
                ease: 'power2.out'
            });
            
            if (icon) {
                gsap.to(icon, {
                    scale: 1.3,
                    rotation: 10,
                    duration: 0.3,
                    ease: 'back.out(1.7)'
                });
            }
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                y: 0,
                scale: 1,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                duration: 0.4,
                ease: 'power2.out'
            });
            
            if (icon) {
                gsap.to(icon, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
    });
    
    const awardItems = document.querySelectorAll('.award-item');
    const awardsGrid = document.querySelector('.awards-grid');
    if (awardItems.length > 0 && awardsGrid) {
        gsap.fromTo('.award-item', 
            {y: 50, opacity: 0, scale: 0.8},
            {
                y: 0, 
                opacity: 1, 
                scale: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: '.awards-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    }
    
    const friendLogos = document.querySelectorAll('.friend-logo');
    const friendsGrid = document.querySelector('.friends-grid');
    if (friendLogos.length > 0 && friendsGrid) {
        gsap.fromTo('.friend-logo', 
            {y: 30, opacity: 0, rotation: -5},
            {
                y: 0, 
                opacity: 1, 
                rotation: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.friends-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    }
}

function initAdvancedScrollEffects() {
    gsap.to('.shape1', {
        y: -100,
        rotation: 360,
        ease: 'none',
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1
        }
    });
    
    gsap.to('.shape2', {
        y: -50,
        rotation: -180,
        ease: 'none',
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1
        }
    });
    
    gsap.to('.shape3', {
        y: -80,
        rotation: 270,
        ease: 'none',
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1
        }
    });
}

function initParallaxEffects() {
    const parallaxImages = document.querySelectorAll(' .question-image');
    
    parallaxImages.forEach(img => {
        gsap.to(img, {
            y: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: img,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    });
}

function animateHero() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    const heroServices = document.querySelector('.hero-services');
    const heroCta = document.querySelectorAll('.hero-cta .cta-button');
    
    const tl = gsap.timeline({delay: 0.5});
    
    if (heroTitle) {
        const titleLines = document.querySelectorAll('.title-line');
        if (titleLines.length > 0) {
            tl.fromTo(titleLines, 
                {y: 100, opacity: 0, scale: 0.8},
                {
                    y: 0, 
                    opacity: 1, 
                    scale: 1,
                    duration: 1,
                    stagger: 0.3,
                    ease: 'back.out(1.7)'
                }
            );
        }
    }
    
    if (heroSubtitle) {
        tl.fromTo(heroSubtitle, 
            {y: 50, opacity: 0},
            {y: 0, opacity: 1, duration: 0.8, ease: 'power2.out'},
            '-=0.3'
        );
    }
    
    if (heroDescription) {
        tl.fromTo(heroDescription, 
            {y: 30, opacity: 0},
            {y: 0, opacity: 1, duration: 0.6, ease: 'power2.out'},
            '-=0.2'
        );
    }
    
    if (heroServices) {
        tl.fromTo(heroServices.children, 
            {y: 50, opacity: 0, scale: 0.5, rotation: 10},
            {
                y: 0, 
                opacity: 1, 
                scale: 1, 
                rotation: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'back.out(1.7)'
            },
            '-=0.2'
        );
    }
    
    if (heroCta.length) {
        tl.fromTo(heroCta, 
            {y: 30, opacity: 0, scale: 0.8},
            {
                y: 0, 
                opacity: 1, 
                scale: 1,
                duration: 0.5,
                stagger: 0.1,
                ease: 'back.out(1.7)'
            },
            '-=0.1'
        );
    }
}

function initScrollAnimations() {
    gsap.utils.toArray('section').forEach(section => {
        const sectionHeader = section.querySelector('.section-header');
        if (sectionHeader) {
            const title = sectionHeader.querySelector('.section-title');
            const subtitle = sectionHeader.querySelector('.section-subtitle');
            
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
            
            if (title) {
                tl.fromTo(title, 
                    {y: 50, opacity: 0, scale: 0.9},
                    {y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out'}
                );
            }
            
            if (subtitle) {
                tl.fromTo(subtitle, 
                    {y: 30, opacity: 0},
                    {y: 0, opacity: 1, duration: 0.6, ease: 'power2.out'},
                    '-=0.3'
                );
            }
        }
    });
}

function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.count, 10);
        
        ScrollTrigger.create({
            trigger: counter,
            start: 'top 80%',
            onEnter: () => {
                gsap.to(counter, {
                    innerText: target,
                    duration: 2.5,
                    snap: { innerText: 1 },
                    ease: 'power2.out',
                    onUpdate: function() {
                        counter.innerText = Math.ceil(parseFloat(counter.innerText));
                    }
                });
                
                gsap.fromTo(counter, 
                    {scale: 1},
                    {scale: 1.1, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut'}
                );
            },
            once: true
        });
    });
}

function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            this.classList.add('active');
            const targetPanel = document.querySelector(`.tab-panel[data-tab="${tab}"]`);
            if (targetPanel) {
                targetPanel.classList.add('active');
                
                gsap.fromTo(targetPanel, 
                    {opacity: 0, y: 20},
                    {opacity: 1, y: 0, duration: 0.5, ease: 'power2.out'}
                );
            }
        });
    });
}

function setupIntersectionObserver() {
    const animatedElements = document.querySelectorAll('.animate-fade-up, .animate-fade-right, .animate-fade-left, .animate-pop');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

function initQrPage() {
    const qrContent = document.querySelector('.qr-content');
    if (qrContent) {
        gsap.fromTo(qrContent, 
            {y: 50, opacity: 0, scale: 0.9},
            {y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 0.5}
        );
    }
}

function initHorizontalProfiles() {
    const profilesSection = document.querySelector('.team-profiles');
    const profilesContainer = document.querySelector('.profiles-container');
    const profileCards = document.querySelectorAll('.profile-card');
    
    if (!profilesSection || !profilesContainer || !profileCards.length) {
        return;
    }
    
    const totalWidth = profileCards.length * window.innerWidth;
    const sectionHeight = totalWidth;
    
    const horizontalScroll = gsap.to(profilesContainer, {
        x: () => -(totalWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
            trigger: profilesSection,
            start: 'top top',
            end: () => `+=${sectionHeight}`,
            scrub: 0.5,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true
        }
    });
    
    profileCards.forEach((card, index) => {
        const profileImage = card.querySelector('.profile-image');
        const profileInfo = card.querySelector('.profile-info');
        
        if (profileImage) {
            gsap.fromTo(profileImage, 
                {scale: 0.8, opacity: 0},
                {
                    scale: 1, 
                    opacity: 1, 
                    duration: 0.6,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'left 70%',
                        end: 'left 30%',
                        containerAnimation: horizontalScroll,
                        scrub: 0.3
                    }
                }
            );
        }
        
        if (profileInfo) {
            gsap.fromTo(profileInfo, 
                {x: 50, opacity: 0},
                {
                    x: 0, 
                    opacity: 1, 
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'left 60%',
                        end: 'left 20%',
                        containerAnimation: horizontalScroll,
                        scrub: 0.3
                    }
                }
            );
        }
    });
    
    ScrollTrigger.create({
        trigger: profilesSection,
        start: 'top top',
        end: () => `+=${sectionHeight}`,
        onUpdate: (self) => {
            const progress = self.progress;
            const currentIndex = Math.floor(progress * profileCards.length);
            const clampedIndex = Math.min(currentIndex, profileCards.length - 1);
            
            const progressDots = document.querySelectorAll('.progress-dot');
            progressDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === clampedIndex);
            });
            
            const sidebarLinks = document.querySelectorAll('.sidebar-link');
            sidebarLinks.forEach((link, index) => {
                link.classList.toggle('active', index === clampedIndex);
            });
        }
    });
    
    window.addEventListener('resize', () => {
        ScrollTrigger.refresh();
    });
}

window.addEventListener('load', function() {
    document.body.classList.remove('loading');
    
    gsap.fromTo('body', 
        {opacity: 0},
        {opacity: 1, duration: 0.5, ease: 'power2.out'}
    );
});

document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.bg-shape');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.02;
        const x = (mouseX - 0.5) * 20 * speed;
        const y = (mouseY - 0.5) * 20 * speed;
        
        gsap.to(shape, {
            x: x,
            y: y,
            duration: 1,
            ease: 'power2.out'
        });
    });
});

setTimeout(() => {
    const magneticElements = document.querySelectorAll('.cta-button, .order-btn, .nav-cta');

    magneticElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(el, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                scale: 1,
                x: 0,
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(el, {
                x: x * 0.1,
                y: y * 0.1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}, 1000);