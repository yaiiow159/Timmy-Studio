document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('.section');
    const skillCategories = document.querySelectorAll('.skill-category');
    const serviceCards = document.querySelectorAll('.service-card');
    const pricingCards = document.querySelectorAll('.pricing-card');
    
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
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    const heroContent = document.querySelector('.hero-content');
    const heroTitle = heroContent.querySelector('h1');
    const heroSubtitle = heroContent.querySelector('.subtitle');
    const heroButtons = heroContent.querySelector('.cta-buttons');
    
    const animateHero = () => {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(20px)';
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(20px)';
        heroButtons.style.opacity = '0';
        heroButtons.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroTitle.style.transition = 'all 0.8s ease';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
            
            setTimeout(() => {
                heroSubtitle.style.transition = 'all 0.8s ease';
                heroSubtitle.style.opacity = '1';
                heroSubtitle.style.transform = 'translateY(0)';
                
                setTimeout(() => {
                    heroButtons.style.transition = 'all 0.8s ease';
                    heroButtons.style.opacity = '1';
                    heroButtons.style.transform = 'translateY(0)';
                }, 200);
            }, 200);
        }, 200);
    };
    
    animateHero();
    
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    document.querySelectorAll('.collapsible').forEach(item => {
        item.addEventListener('click', function (e) {
            if (e.target.closest('.collapsible-desc')) return;
            this.classList.toggle('active');
        });
    });
    
    document.querySelectorAll('.main-skill-title').forEach(item => {
        item.addEventListener('click', function () {
            const block = this.closest('.main-skill-block');
            block.classList.toggle('active');
        });
    });
    
    // timeline 進場動畫
    const timelineItems = document.querySelectorAll('.timeline-animate');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    timelineItems.forEach(item => timelineObserver.observe(item));

    // 處理技能區塊的下拉效果
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

    // 處理導航欄滾動效果
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 向下滾動
            navbar.classList.add('scroll-down');
            navbar.classList.remove('scroll-up');
        } else {
            // 向上滾動
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        
        lastScrollTop = scrollTop;
    });

    // 處理導航連結點擊
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}); 