// Enhanced Portfolio Website JavaScript with Advanced Motion Effects
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();

    // Initialize all components
    initializeLoader();
    initializeScrollProgress();
    initializeParticles();
    initializeNavigation();
    initializeTypewriter();
    initializeScrollAnimations();
    initializeStatisticsCounter();
    initializeTiltEffects();
    initializeFormAnimations();
    initializeContactForm();
    initializeMiscAnimations();
    initializeProfilePhoto();

    // Loading Animation
    function initializeLoader() {
        const loader = document.getElementById('loader');
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = 'visible';
                
                // Trigger initial animations
                triggerInitialAnimations();
            }, 1000);
        });
    }

    // Professional Photo Loading
    function initializeProfilePhoto() {
        const profilePhoto = document.querySelector('.profile-photo');
        const profileInitials = document.querySelector('.profile-initials');
        
        if (profilePhoto && profileInitials) {
            // Try to load the professional photo
            profilePhoto.addEventListener('load', function() {
                console.log('âœ… Professional photo loaded successfully!');
                // Hide initials and show photo
                profileInitials.style.display = 'none';
                profilePhoto.style.display = 'block';
                profilePhoto.style.opacity = '1';
            });

            profilePhoto.addEventListener('error', function() {
                console.log('ðŸ“¸ Professional photo not available, using stylized initials as fallback');
                // Keep initials visible, hide photo
                profileInitials.style.display = 'flex';
                profilePhoto.style.display = 'none';
                
                // Add a subtle notification for the user
                setTimeout(() => {
                    showNotification('Portfolio loaded with professional initials. Add your photo as "Abbb.jpg" to display your image.', 'info');
                }, 3000);
            });

            // Set initial states
            profilePhoto.style.opacity = '0';
            profilePhoto.style.transition = 'opacity 0.5s ease';
            
            // Force load attempt
            if (profilePhoto.complete && profilePhoto.naturalWidth > 0) {
                profilePhoto.dispatchEvent(new Event('load'));
            }
        }
    }

    // Scroll Progress Indicator
    function initializeScrollProgress() {
        const scrollProgress = document.getElementById('scrollProgress');
        
        const updateScrollProgress = () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        };

        window.addEventListener('scroll', throttle(updateScrollProgress, 10));
    }

    // Floating Particles Background
    function initializeParticles() {
        const particlesContainer = document.getElementById('particlesContainer');
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            createParticle();
        }

        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position and properties
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const size = Math.random() * 4 + 2;
            const duration = Math.random() * 10 + 5;
            const delay = Math.random() * 5;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.animationDuration = duration + 's';
            particle.style.animationDelay = delay + 's';
            particle.style.opacity = Math.random() * 0.5 + 0.3;
            
            particlesContainer.appendChild(particle);
            
            // Remove and recreate particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                    createParticle();
                }
            }, (duration + delay) * 1000);
        }
    }

    // Enhanced Navigation
    function initializeNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        const navbar = document.querySelector('.navbar');

        // Mobile menu toggle
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animate menu items
            if (navMenu.classList.contains('active')) {
                navLinks.forEach((link, index) => {
                    link.style.animation = `slideInRight 0.3s ease forwards ${index * 0.1}s`;
                });
            }
        });

        // Close mobile menu when clicking links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Smooth scroll to target
                if (targetId.startsWith('#')) {
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - 70;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        // Navbar background on scroll
        const updateNavbar = () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', throttle(updateNavbar, 10));

        // Active link highlighting
        const updateActiveLink = () => {
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    if (navLink) navLink.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', throttle(updateActiveLink, 50));
    }

    // Typewriter Effect
    function initializeTypewriter() {
        const typewriterElement = document.querySelector('.typewriter');
        if (!typewriterElement) return;

        const text = typewriterElement.getAttribute('data-text');
        let index = 0;

        typewriterElement.textContent = '';

        const typeWriter = () => {
            if (index < text.length) {
                typewriterElement.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    typewriterElement.style.borderRight = 'none';
                }, 1000);
            }
        };

        // Start typing after a delay
        setTimeout(typeWriter, 1000);
    }

    // Scroll-triggered Animations
    function initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    
                    // Special handling for different elements
                    if (entry.target.classList.contains('stat-item')) {
                        animateStatNumber(entry.target);
                    }
                    
                    if (entry.target.classList.contains('education-item')) {
                        entry.target.classList.add('animate-in');
                    }
                }
            });
        }, observerOptions);

        // Observe elements for reveal animations
        const animateElements = document.querySelectorAll(
            '.reveal-text, .skill-category, .project-card, .education-item, .certification-card, .stat-item, .contact-item'
        );
        
        animateElements.forEach(el => observer.observe(el));
    }

    // Statistics Counter Animation
    function initializeStatisticsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        window.animateStatNumber = function(statItem) {
            const statNumber = statItem.querySelector('.stat-number');
            if (!statNumber || statNumber.hasAttribute('data-animated')) return;
            
            const targetValue = parseInt(statNumber.getAttribute('data-count'));
            let currentValue = 0;
            const increment = targetValue / 50;
            const duration = 2000;
            const stepTime = duration / 50;
            
            statNumber.setAttribute('data-animated', 'true');
            
            const counter = setInterval(() => {
                currentValue += increment;
                if (currentValue >= targetValue) {
                    currentValue = targetValue;
                    clearInterval(counter);
                }
                
                // Format numbers with commas
                statNumber.textContent = Math.floor(currentValue).toLocaleString();
            }, stepTime);
        };
    }

    // 3D Tilt Effects
    function initializeTiltEffects() {
        const tiltCards = document.querySelectorAll('.tilt-card');
        
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                if (window.innerWidth <= 768) return; // Disable on mobile
                
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            });
        });
    }

    // Enhanced Form Animations
    function initializeFormAnimations() {
        const formControls = document.querySelectorAll('.form-control');
        
        formControls.forEach(input => {
            // Floating label animation
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (input.value === '') {
                    input.parentElement.classList.remove('focused');
                }
            });
            
            // Check if input has value on load
            if (input.value !== '') {
                input.parentElement.classList.add('focused');
            }
            
            // Input validation styling
            input.addEventListener('input', () => {
                if (input.checkValidity()) {
                    input.style.borderColor = 'var(--color-success)';
                } else {
                    input.style.borderColor = 'var(--color-error)';
                }
            });
        });
    }

    // Contact Form with Enhanced Animations
    function initializeContactForm() {
        const contactForm = document.querySelector('.contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('button[type="submit"]');
            const buttonText = submitButton.querySelector('.btn-text');
            const buttonLoader = submitButton.querySelector('.btn-loader');
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const message = formData.get('message').trim();

            // Validation
            if (!validateForm(name, email, message)) return;

            // Show loading state
            submitButton.classList.add('loading');
            submitButton.disabled = true;
            buttonText.style.opacity = '0';
            buttonLoader.classList.remove('hidden');

            // Simulate API call
            try {
                await simulateFormSubmission();
                
                // Success animation
                showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
                this.reset();
                
                // Reset form labels
                const labels = this.querySelectorAll('.floating-label');
                labels.forEach(label => label.classList.remove('focused'));
                
            } catch (error) {
                showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
            } finally {
                // Reset button state
                submitButton.classList.remove('loading');
                submitButton.disabled = false;
                buttonText.style.opacity = '1';
                buttonLoader.classList.add('hidden');
            }
        });

        function validateForm(name, email, message) {
            let isValid = true;
            let errors = [];

            if (!name) {
                errors.push('Name is required.');
                isValid = false;
            }

            if (!email) {
                errors.push('Email is required.');
                isValid = false;
            } else if (!isValidEmail(email)) {
                errors.push('Please enter a valid email address.');
                isValid = false;
            }

            if (!message) {
                errors.push('Message is required.');
                isValid = false;
            } else if (message.length < 10) {
                errors.push('Message should be at least 10 characters long.');
                isValid = false;
            }

            if (!isValid) {
                showNotification(errors.join('\n'), 'error');
            }

            return isValid;
        }

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        function simulateFormSubmission() {
            return new Promise(resolve => setTimeout(resolve, 2000));
        }
    }

    // Miscellaneous Animations
    function initializeMiscAnimations() {
        // Download resume button
        const downloadBtn = document.querySelector('.download-resume');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', function(e) {
                e.preventDefault();
                showNotification('Resume download will be available soon. Please contact me directly for my latest resume.', 'info');
            });
        }

        // Social media hover effects
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('click', () => {
                const platform = link.href.includes('github') ? 'GitHub' : 
                               link.href.includes('linkedin') ? 'LinkedIn' : 'Social';
                console.log(`Social link clicked: ${platform}`);
            });
        });

        // Project links hover effects
        const projectLinks = document.querySelectorAll('.project-link');
        projectLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(5px)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
            });
        });

        // Skill tags hover effects
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px) scale(1.05)';
            });
            
            tag.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Profile avatar interaction enhancement
        const heroAvatar = document.querySelector('.hero-avatar');
        if (heroAvatar) {
            heroAvatar.addEventListener('click', function() {
                // Add a fun click animation
                this.style.transform = 'scale(1.1) rotate(5deg)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
                
                // Show a friendly message
                showNotification('Hi there! ðŸ‘‹ Thanks for checking out my portfolio!', 'success');
            });
        }
    }

    // Enhanced Notification System
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        });

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">
                    ${getNotificationIcon(type)}
                </div>
                <div class="notification-message">${message.replace(/\n/g, '<br>')}</div>
                <button class="notification-close" aria-label="Close notification">
                    <i data-lucide="x"></i>
                </button>
            </div>
        `;

        // Add notification styles if not already added
        if (!document.querySelector('#notification-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'notification-styles';
            styleSheet.textContent = getNotificationStyles();
            document.head.appendChild(styleSheet);
        }

        // Add to DOM
        document.body.appendChild(notification);
        lucide.createIcons();

        // Close button functionality
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        });

        // Auto remove after 5 seconds (longer for info messages)
        const autoRemoveDelay = type === 'info' ? 8000 : 5000;
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease-out';
                setTimeout(() => notification.remove(), 300);
            }
        }, autoRemoveDelay);
    }

    function getNotificationIcon(type) {
        switch (type) {
            case 'success': return '<i data-lucide="check-circle"></i>';
            case 'error': return '<i data-lucide="alert-circle"></i>';
            case 'warning': return '<i data-lucide="alert-triangle"></i>';
            default: return '<i data-lucide="info"></i>';
        }
    }

    function getNotificationStyles() {
        return `
            .notification {
                position: fixed;
                top: 90px;
                right: 20px;
                max-width: 400px;
                background: var(--color-surface);
                border: 1px solid var(--color-border);
                border-radius: var(--radius-lg);
                box-shadow: var(--shadow-lg);
                z-index: 1001;
                animation: slideInRight 0.3s ease-out;
            }
            .notification--success { border-left: 4px solid var(--color-success); }
            .notification--error { border-left: 4px solid var(--color-error); }
            .notification--warning { border-left: 4px solid var(--color-warning); }
            .notification--info { border-left: 4px solid var(--color-info); }
            .notification-content {
                display: flex;
                align-items: flex-start;
                padding: var(--space-16);
                gap: var(--space-12);
            }
            .notification-icon { color: var(--color-primary); margin-top: 2px; }
            .notification-message {
                flex: 1;
                color: var(--color-text);
                font-size: var(--font-size-sm);
                line-height: 1.5;
            }
            .notification-close {
                background: none;
                border: none;
                color: var(--color-text-secondary);
                cursor: pointer;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: var(--radius-sm);
                transition: background-color var(--duration-fast);
            }
            .notification-close:hover { background-color: var(--color-secondary); }
            @keyframes slideInRight {
                from { opacity: 0; transform: translateX(100%); }
                to { opacity: 1; transform: translateX(0); }
            }
            @keyframes slideOutRight {
                from { opacity: 1; transform: translateX(0); }
                to { opacity: 0; transform: translateX(100%); }
            }
        `;
    }

    // Trigger initial animations after page load
    function triggerInitialAnimations() {
        // Animate hero elements
        const heroElements = document.querySelectorAll('.hero-content > *');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });

        // Start typewriter effect
        setTimeout(() => {
            const typewriterElement = document.querySelector('.typewriter');
            if (typewriterElement) {
                typewriterElement.style.animation = 'typewriter 4s steps(40, end), blink-caret .75s step-end infinite';
            }
        }, 500);
    }

    // Utility Functions
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    function debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Keyboard Navigation Enhancement
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const navToggle = document.querySelector('.nav-toggle');
            const navMenu = document.querySelector('.nav-menu');
            
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Prevent animations on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        document.body.classList.add('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('resize-animation-stopper');
        }, 400);
    });

    // Add resize animation stopper styles
    const resizeStyles = document.createElement('style');
    resizeStyles.textContent = `
        .resize-animation-stopper * {
            animation-duration: 0s !important;
            transition-duration: 0s !important;
        }
    `;
    document.head.appendChild(resizeStyles);

    // Performance optimization for scroll events
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    }

    function updateAnimations() {
        // Update scroll-based animations here
        ticking = false;
    }

    window.addEventListener('scroll', requestTick);

    // Initialize intersection observer for better performance
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Console welcome message
    console.log('%cðŸš€ Welcome to Abhay Rana\'s Portfolio!', 'color: #218085; font-size: 16px; font-weight: bold;');
    console.log('%cThis portfolio features advanced animations and interactions built with vanilla JavaScript.', 'color: #666; font-size: 12px;');
    console.log('%cFor more projects and collaborations, visit: https://github.com/abhayrana303', 'color: #218085; font-size: 12px;');
    console.log('%cðŸ“¸ Professional photo system ready! Add "Abbb.jpg" to display your image or enjoy the stylized initials.', 'color: #32B8C5; font-size: 12px; font-weight: bold;');

    // Initialize complete
    document.body.classList.add('js-loaded');
    console.log('âœ… Portfolio initialization complete with enhanced photo system!');
});