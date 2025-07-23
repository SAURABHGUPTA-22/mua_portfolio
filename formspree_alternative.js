// Alternative: Simple Formspree Integration (No setup required)
// Replace the contact form handling with this simpler version

// Contact form handling with Formspree
contactForm.addEventListener('submit', async (e) => {
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
    
    try {
        // Send to Formspree (replace with your Formspree endpoint)
        const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                phone: data.phone,
                service: data.service,
                preferred_date: data.date,
                message: data.message || 'No additional message',
                _replyto: data.email,
                _subject: `New Booking Inquiry - ${data.service}`,
                _cc: 'Khushitripathi2309@gmail.com' // This will CC your email
            })
        });
        
        if (response.ok) {
            showNotification('Thank you! Your message has been sent successfully. We\'ll contact you soon!', 'success');
            contactForm.reset();
        } else {
            throw new Error('Form submission failed');
        }
        
    } catch (error) {
        console.error('Error:', error);
        showNotification('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
    }
});

/* 
FORMSPREE SETUP (EASIER OPTION):
1. Go to https://formspree.io/
2. Sign up for free account
3. Create a new form
4. Get your form endpoint (e.g., https://formspree.io/f/abc123xyz)
5. Replace 'YOUR_FORM_ID' above with your actual form ID
6. Formspree will automatically forward emails to the email you signed up with
7. You can add Khushitripathi2309@gmail.com as a collaborator or use _cc field

ADVANTAGES:
- No complex setup required
- Automatic spam protection
- Email forwarding built-in
- 50 submissions/month on free plan
- Works immediately after setup
*/
