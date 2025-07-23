# EmailJS Template Configuration for Dual Email System

## Template 1: Booking Inquiry Email (for Khushi - template_2rxperl)

**Template Name:** Booking Inquiry
**Template ID:** template_2rxperl
**Subject:** 💄 New Booking Request - {{service}}
**To Email:** {{to_email}} (Will receive Khushitripathi2309@gmail.com from code)

**Content:**
```
Hello Khushi! 👋

You have received a new makeup booking request:

🎯 SERVICE DETAILS:
💄 Service: {{service}}
📅 Preferred Date: {{preferred_date}}

👤 CLIENT INFORMATION:
 Name: {{from_name}}
📧 Email: {{from_email}}
📞 Phone: {{phone}}
💬 Message: {{message}}

⏰ NEXT STEPS:
Please contact {{from_name}} as soon as possible to confirm the booking.

📞 Call: {{phone}}
📧 Reply: {{from_email}}
📱 WhatsApp: Available

✨ Best regards,
Your Website Booking System
```

---

## Template 2: Customer Confirmation Email (template_telapkr)

**Template Name:** Customer Confirmation
**Template ID:** template_telapkr
**Subject:** ✨ Booking Confirmation - {{business_name}}
**To Email:** {{to_email}} (Will receive customer's email from form)
**From Email:** {{from_email}} (Will receive Khushitripathi2309@gmail.com)

**Content:**
```
Dear {{to_name}}, 💕

Thank you for choosing {{business_name}} for your special day! ✨

🎉 BOOKING DETAILS:
💄 Service Requested: {{service}}
📅 Preferred Date: {{preferred_date}}
👤 Your Name: {{customer_name}}
📞 Your Phone: {{customer_phone}}

⏰ WHAT'S NEXT?
We will contact you within 24 hours to:
✅ Confirm your appointment time
✅ Discuss makeup preferences
✅ Share our portfolio
✅ Finalize all details

📞 CONTACT INFORMATION:
📱 Phone: {{business_phone}}
📸 Instagram: {{business_instagram}}
📧 Email: Khushitripathi2309@gmail.com

💝 SPECIAL NOTE:
Every bride deserves to feel like a queen! We're excited to make your special day absolutely magical.

✨ With love and beauty,
{{business_name}}
Certified by Rachna Shewani

---
💄 Professional Makeup Artist
🌟 Making every moment beautiful
```

---

## How to Update Your Templates:

1. **Go to EmailJS Dashboard**
2. **Click "Email Templates"**
3. **Edit template_2rxperl** (Booking Inquiry)
   - Set "To Email" to: {{to_email}}
   - Set "From Email" to: Khushitripathi2309@gmail.com (or use default)
   - Copy the content from Template 1 above
   - Make sure Subject matches exactly
4. **Edit template_telapkr** (Customer Confirmation)
   - Set "To Email" to: {{to_email}}
   - Set "From Email" to: Khushitripathi2309@gmail.com (or keep "Use Default Email Address" checked)
   - Copy the content from Template 2 above
   - Make sure Subject matches exactly
5. **Save both templates**

## EmailJS Account Settings:
**Service ID:** service_0zg85za
**Default Email Address:** Khushitripathi2309@gmail.com

**For "From Email" field, you have 2 options:**
1. **Use Default Email Address** (recommended) - यह automatically आपके account का default email use करेगा
2. **Manual Entry** - Direct Khushitripathi2309@gmail.com type करें

**बेहतर है कि "Use Default Email Address" को checked रखें क्योंकि:**
- यह automatically आपके account settings से email लेता है
- अगर भविष्य में email change करना हो तो सिर्फ account settings में change करना होगा
- Templates में manually change नहीं करना पड़ेगा

## Test Variables Used:
- {{from_name}} - Customer name
- {{from_email}} - Customer email
- {{phone}} - Customer phone
- {{service}} - Selected service
- {{preferred_date}} - Booking date
- {{message}} - Customer message
- {{to_name}} - Customer name (for confirmation)
- {{to_email}} - Customer email (for confirmation)
- {{business_name}} - Your business name
- {{business_phone}} - Your phone number
- {{business_instagram}} - Your Instagram
- {{customer_name}} - Customer name
- {{customer_phone}} - Customer phone

## Expected Flow:
1. Customer submits form
2. Email 1: Sent to Khushitripathi2309@gmail.com (your booking notification)
3. Email 2: Sent to customer (their confirmation)
4. Success message: "Both you and Khushi will receive email confirmations!"

## Backup System:
If EmailJS fails:
- Shows error message
- Offers WhatsApp option automatically
- Formatted message ready to send

Update your templates with this content and test the form!
