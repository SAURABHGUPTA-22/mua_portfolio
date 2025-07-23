// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100
});

// Initialize EmailJS
(function() {
    emailjs.init("Ipn3iU_1ixtRVMmSJ"); // Your EmailJS public key
})();

// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const contactForm = document.getElementById('contactForm');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-content');
const lightboxCaption = document.querySelector('.lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');

// Navbar scroll effect with section tracking
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Track current section for active nav link
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + navbar.offsetHeight + 50;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all nav links
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to current section's nav link
            const activeLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Enhanced smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Calculate navbar height dynamically
            const navbarHeight = navbar.offsetHeight;
            const offsetTop = target.offsetTop - navbarHeight - 20;
            
            // Enhanced smooth scroll with easing
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Add active state to current link
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
            });
            
            // Find corresponding nav link and add active class
            const navLink = document.querySelector(`.nav-menu a[href="${this.getAttribute('href')}"]`);
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
});

// Gallery lightbox functionality
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const overlay = item.querySelector('.gallery-overlay');
        
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.innerHTML = overlay.innerHTML;
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Close lightbox
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.style.display === 'block') {
        closeLightbox();
    }
});

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Contact form handling with EmailJS
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        service: formData.get('service'),
        date: formData.get('date'),
        message: formData.get('message')
    };
    
    // Simple validation
    if (!data.name || !data.email || !data.phone || !data.service) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Phone validation (basic)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(data.phone.replace(/\D/g, ''))) {
        showNotification('Please enter a valid 10-digit phone number.', 'error');
        return;
    }
    
    // Show sending notification
    showNotification('Sending your message...', 'info');
    
    // Send email using EmailJS
    const templateParams = {
        from_name: data.name,
        from_email: data.email,
        phone: data.phone,
        service: data.service,
        preferred_date: data.date,
        message: data.message || 'No additional message',
        to_email: 'Khushitripathi2309@gmail.com',  // Admin email
        reply_to: data.email
    };
    
    // Send to your email (Khushi)
    emailjs.send('service_0zg85za', 'template_2rxperl', templateParams)
        .then(function(response) {
            console.log('Booking email sent to Khushi!', response.status, response.text);
            
            // Send confirmation email to customer
            const confirmationParams = {
                to_name: data.name,
                to_email: data.email,  // Customer ka email
                from_name: 'Khushi',
                from_email: 'Khushitripathi2309@gmail.com',  // Your email as sender
                service: data.service,
                preferred_date: data.date,
                business_name: 'Khushi Professional Makeup Artist',
                business_phone: '9981405733',
                business_instagram: '@khushi_themua',
                customer_name: data.name,
                customer_phone: data.phone
            };
            
            console.log('Customer confirmation params:', confirmationParams);
            
            // Send confirmation to customer
            return emailjs.send('service_0zg85za', 'template_telapkr', confirmationParams);
        })
        .then(function(response) {
            console.log('Confirmation email sent to customer!', response.status, response.text);
            showNotification('Thank you! Your booking request has been sent. Both you and Khushi will receive email confirmations!', 'success');
            contactForm.reset();
        })
        .catch(function(error) {
            console.log('Email sending failed:', error);
            
            // If EmailJS fails, show WhatsApp option
            showNotification('Email service temporarily unavailable. Please use WhatsApp or call directly.', 'error');
            
            // Auto-create WhatsApp message as backup
            setTimeout(() => {
                const whatsappMessage = `Hello Khushi! 

I want to book a makeup appointment:

📝 Name: ${data.name}
📧 Email: ${data.email}
📞 Phone: ${data.phone}
💄 Service: ${data.service}
📅 Preferred Date: ${data.date}
💬 Message: ${data.message || 'No additional details'}

Please confirm my booking. Thank you!`;
                
                const whatsappURL = `https://wa.me/919981405733?text=${encodeURIComponent(whatsappMessage)}`;
                
                if (confirm('Would you like to send this booking request via WhatsApp instead?')) {
                    window.open(whatsappURL, '_blank');
                }
            }, 2000);
        });
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: 0.5rem;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations to head
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Testimonials slider (auto-rotate)
const testimonialCards = document.querySelectorAll('.testimonial-card');
let currentTestimonial = 0;

function rotateTestimonials() {
    testimonialCards.forEach(card => card.classList.remove('active'));
    testimonialCards[currentTestimonial].classList.add('active');
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
}

// Start testimonial rotation
if (testimonialCards.length > 1) {
    setInterval(rotateTestimonials, 5000);
}

// Add active class styling for testimonials
const testimonialActiveStyles = document.createElement('style');
testimonialActiveStyles.textContent = `
    .testimonial-card {
        opacity: 0.7;
        transform: scale(0.95);
        transition: all 0.3s ease;
    }
    
    .testimonial-card.active {
        opacity: 1;
        transform: scale(1);
    }
`;
document.head.appendChild(testimonialActiveStyles);

// Parallax effect for hero section
// window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const parallaxElements = document.querySelectorAll('.hero-image');
    
//     parallaxElements.forEach(element => {
//         const speed = 0.5;
//         element.style.transform = `translateY(${scrolled * speed}px)`;
//     });
// });

// Add shimmer effect to buttons
function addShimmerEffect() {
    const glowButtons = document.querySelectorAll('.glow-button');
    
    glowButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
        });
    });
}

// Initialize shimmer effect
addShimmerEffect();

// Floating icons animation enhancement
function enhanceFloatingIcons() {
    const icons = document.querySelectorAll('.floating-icons i');
    
    icons.forEach((icon, index) => {
        // Add random delay and duration
        const delay = Math.random() * 5;
        const duration = 10 + Math.random() * 10;
        
        icon.style.animationDelay = `${delay}s`;
        icon.style.animationDuration = `${duration}s`;
        
        // Add mouse interaction
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.5) rotate(180deg)';
            icon.style.opacity = '0.8';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = '';
            icon.style.opacity = '';
        });
    });
}

// Initialize floating icons enhancement
enhanceFloatingIcons();

// Form field animations
function initFormAnimations() {
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, select, textarea');
        const label = group.querySelector('label');
        
        if (input && label) {
            // Check if field has value on page load
            if (input.value) {
                label.classList.add('active');
            }
            
            input.addEventListener('focus', () => {
                label.classList.add('active');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    label.classList.remove('active');
                }
            });
            
            input.addEventListener('input', () => {
                if (input.value) {
                    label.classList.add('active');
                } else {
                    label.classList.remove('active');
                }
            });
        }
    });
}

// Initialize form animations
initFormAnimations();

// Add form label active styles
const formLabelStyles = document.createElement('style');
formLabelStyles.textContent = `
    .form-group label.active {
        top: -0.5rem;
        left: 0.5rem;
        font-size: 0.85rem;
        color: var(--rose-mauve);
    }
`;
document.head.appendChild(formLabelStyles);

// Service cards hover enhancement
function enhanceServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.background = 'linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.background = 'white';
        });
    });
}

// Initialize service cards enhancement
enhanceServiceCards();

// Loading animation
function showLoadingAnimation() {
    // Prevent body scroll during loading
    document.body.style.overflow = 'hidden';
    
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <h3 class="loader-text">Loading Beauty...</h3>
        </div>
    `;
    
    // Add loader styles (backup inline styles)
    const loaderStyles = document.createElement('style');
    loaderStyles.textContent = `
        .page-loader {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            background: linear-gradient(135deg, #FFF7F5 0%, #F6D4D2 100%) !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            z-index: 99999 !important;
            flex-direction: column !important;
        }
        
        .loader-content {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
        }
        
        .loader-spinner {
            width: 60px !important;
            height: 60px !important;
            border: 4px solid #F6D4D2 !important;
            border-top: 4px solid #C86B85 !important;
            border-radius: 50% !important;
            animation: spin 1s linear infinite !important;
            margin-bottom: 1rem !important;
        }
        
        .loader-text {
            color: #C86B85 !important;
            font-family: 'Playfair Display', serif !important;
            margin: 0 !important;
            font-size: 1.5rem !important;
            font-weight: 600 !important;
            text-align: center !important;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(loaderStyles);
    
    document.body.appendChild(loader);
    
    // Remove loader after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                loader.remove();
                // Restore body scroll
                document.body.style.overflow = '';
            }, 500);
        }, 1000);
    });
}

// Show loading animation
document.addEventListener('DOMContentLoaded', showLoadingAnimation);

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements
    const elementsToAnimate = document.querySelectorAll('.service-card, .testimonial-card, .gallery-item');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Add scroll animation styles
const scrollAnimationStyles = document.createElement('style');
scrollAnimationStyles.textContent = `
    .service-card, .testimonial-card, .gallery-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .service-card.animate-in, 
    .testimonial-card.animate-in, 
    .gallery-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(scrollAnimationStyles);

// Initialize scroll animations
initScrollAnimations();

// WhatsApp integration for contact form
function sendToWhatsApp(data) {
    const message = `🌟 *Khushi Makeup Artist - Booking Request* 🌟

👤 *Name:* ${data.name}
📧 *Email:* ${data.email}
📞 *Phone:* ${data.phone}
💄 *Service:* ${data.service}
📅 *Preferred Date:* ${data.date}
💬 *Message:* ${data.message || 'No additional details'}

Please confirm my appointment. Thank you! ✨`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/919981405733?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
}

// Add WhatsApp button to form
function addWhatsAppOption() {
    const submitButton = document.querySelector('.submit-button');
    const whatsappButton = document.createElement('button');
    
    whatsappButton.type = 'button';
    whatsappButton.className = 'submit-button whatsapp-submit';
    whatsappButton.innerHTML = `
        <i class="fab fa-whatsapp"></i>
        Send via WhatsApp
    `;
    
    whatsappButton.style.cssText = `
        background: #25D366;
        margin-top: 1rem;
    `;
    
    whatsappButton.addEventListener('click', () => {
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            service: formData.get('service'),
            date: formData.get('date'),
            message: formData.get('message')
        };
        
        if (!data.name || !data.phone || !data.service) {
            showNotification('Please fill in Name, Phone, and Service fields for WhatsApp.', 'error');
            return;
        }
        
        sendToWhatsApp(data);
    });
    
    submitButton.parentNode.appendChild(whatsappButton);
}

// Initialize WhatsApp option
addWhatsAppOption();

// Add custom cursor effect
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: linear-gradient(45deg, var(--rose-mauve), var(--champagne-gold));
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
        opacity: 0;
    `;
    
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    // Enhance cursor for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .gallery-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// Initialize custom cursor (only on desktop)
if (window.innerWidth > 768) {
    initCustomCursor();
}

// Performance optimization: Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

// Console welcome message
console.log(`
%c✨ Welcome to Khushi's Makeup Artistry Website! ✨
%cDesigned with love and professional excellence.
%cFor inquiries: 9981405733 | @khushi_themua
`, 
'color: #C86B85; font-size: 18px; font-weight: bold;',
'color: #D8A47F; font-size: 14px;',
'color: #666; font-size: 12px;'
);

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 Khushi Makeup Artist Website Loaded Successfully!');
    
    // Add any additional initialization here
    setTimeout(() => {
        // Add entrance animations
        document.body.classList.add('loaded');
    }, 100);
});

// Add loaded class styles
const loadedStyles = document.createElement('style');
loadedStyles.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadedStyles);
