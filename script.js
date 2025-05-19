document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('.section');
    const skillCategories = document.querySelectorAll('.skill-category');
    const serviceCards = document.querySelectorAll('.service-card');
    const pricingCards = document.querySelectorAll('.pricing-card');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const scrollProgress = document.querySelector('.scroll-progress');
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        const windowScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (windowScroll / height) * 100;
        
        if (scrollProgress) {
            scrollProgress.style.width = `${scrolled}%`;
        }
        
        if (backToTop) {
            if (windowScroll > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    });
    
    if (backToTop) {
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            
            const isActive = mobileMenuToggle.classList.contains('active');
            mobileMenuToggle.innerHTML = isActive ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                navLinks.classList.remove('active');
                if (mobileMenuToggle) {
                    mobileMenuToggle.classList.remove('active');
                    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
        
        const scrollPosition = window.scrollY + 200;
        
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                
                document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.add('active');
            }
        });
    });
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                if (entry.target.classList.contains('skill-category')) {
                    entry.target.style.transitionDelay = `${entry.target.dataset.index * 0.1}s`;
                }
                
                if (entry.target.classList.contains('service-card')) {
                    entry.target.style.transitionDelay = `${entry.target.dataset.index * 0.1}s`;
                }
                
                if (entry.target.classList.contains('pricing-card')) {
                    entry.target.style.transitionDelay = `${entry.target.dataset.index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
    
    skillCategories.forEach((category, index) => {
        category.dataset.index = index;
        category.classList.add('fade-in');
        observer.observe(category);
    });
    
    serviceCards.forEach((card, index) => {
        card.dataset.index = index;
        card.classList.add('fade-in');
        observer.observe(card);
    });
    
    pricingCards.forEach((card, index) => {
        card.dataset.index = index;
        card.classList.add('fade-in');
        observer.observe(card);
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const animateHero = () => {
        const heroTitleElement = document.querySelector('.hero-text h1');
        const heroSubtitleElement = document.querySelector('.hero-text .subtitle');
        const heroTaglineElement = document.querySelector('.hero-text .tagline');
        const heroCTAElement = document.querySelector('.hero-text .cta-buttons');
        const heroImageElement = document.querySelector('.hero-image');
        const heroCodeElement = document.querySelector('.hero-code');
        
        if (heroTitleElement) heroTitleElement.classList.add('animate-fade-in');
        if (heroSubtitleElement) {
            setTimeout(() => {
                heroSubtitleElement.classList.add('animate-fade-in');
            }, 200);
        }
        if (heroTaglineElement) {
            setTimeout(() => {
                heroTaglineElement.classList.add('animate-fade-in');
            }, 400);
        }
        if (heroCTAElement) {
            setTimeout(() => {
                heroCTAElement.classList.add('animate-fade-in');
            }, 600);
        }
        if (heroImageElement) {
            setTimeout(() => {
                heroImageElement.classList.add('animate-fade-in-right');
            }, 300);
        }
        if (heroCodeElement) {
            setTimeout(() => {
                heroCodeElement.classList.add('animate-fade-in-up');
            }, 800);
        }
    };
    
    window.addEventListener('load', animateHero);
    
    const skillBlocks = document.querySelectorAll('.main-skill-block');
    
    skillBlocks.forEach(block => {
        const title = block.querySelector('.main-skill-title');
        
        title.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = block.classList.contains('active');
            
            skillBlocks.forEach(otherBlock => {
                otherBlock.classList.remove('active');
            });
            
            if (!isActive) {
                block.classList.add('active');
            }
        });
    });

    const timelineItems = document.querySelectorAll('.timeline-animate');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    timelineItems.forEach(item => timelineObserver.observe(item));
    
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
    
    const createTypewriter = (element, text, speed = 100) => {
        if (!element) return;
        
        let i = 0;
        element.textContent = '';
        element.style.opacity = '1';
        
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, speed);
    };
    
    const addLineNumbers = () => {
        document.querySelectorAll('pre code').forEach(block => {
            if (!block.parentNode.classList.contains('line-numbers-added')) {
                const lines = block.textContent.split('\n');
                const lineNumbersWrapper = document.createElement('div');
                lineNumbersWrapper.className = 'line-numbers';
                
                for (let i = 0; i < lines.length; i++) {
                    if (i === lines.length - 1 && lines[i] === '') continue;
                    const lineNumber = document.createElement('span');
                    lineNumber.textContent = i + 1;
                    lineNumbersWrapper.appendChild(lineNumber);
                }
                
                block.parentNode.classList.add('line-numbers-added');
                block.parentNode.insertBefore(lineNumbersWrapper, block);
            }
        });
    };
    
    window.addEventListener('load', addLineNumbers);
}); 