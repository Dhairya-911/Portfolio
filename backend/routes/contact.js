const express = require('express');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

const router = express.Router();

// Rate limiting for contact form submissions
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Increased from 3 to 10 for testing
  message: {
    error: 'Too many contact form submissions, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Email transporter configuration (optional)
const createEmailTransporter = () => {
  if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    return nodemailer.createTransporter({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  return null;
};

// Validation rules
const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Name must be between 1 and 100 characters')
    .matches(/^[a-zA-Z0-9\s\-'.,@_]+$/)
    .withMessage('Name contains invalid characters'),
  
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('message')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Message must be between 5 and 1000 characters'),
];

// @route   POST /api/contact/test
// @desc    Test endpoint without validation
// @access  Public
router.post('/test', async (req, res) => {
  console.log('Test endpoint hit:', {
    body: req.body,
    headers: req.headers
  });
  
  res.json({
    success: true,
    message: 'Test endpoint working',
    received: req.body
  });
});

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', contactLimiter, contactValidation, async (req, res) => {
  try {
    // Debug: Log the incoming request with more details
    console.log('Contact form submission received:', {
      body: req.body,
      headers: {
        'content-type': req.headers['content-type'],
        'origin': req.headers['origin'],
        'user-agent': req.headers['user-agent']
      },
      method: req.method,
      url: req.url
    });

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      console.log('Failed validation for data:', req.body);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
        receivedData: req.body // Add this for debugging
      });
    }

    const { name, email, message } = req.body;

    // Get client IP and user agent
    const ipAddress = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
    const userAgent = req.get('User-Agent') || 'Unknown';

    // Create new contact entry
    const contact = new Contact({
      name,
      email,
      message,
      ipAddress,
      userAgent
    });

    // Save to database
    await contact.save();

    // Send email notification (optional)
    const transporter = createEmailTransporter();
    if (transporter) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: process.env.EMAIL_FROM, // Send to yourself
          subject: `New Contact Form Submission from ${name}`,
          html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
            <p><small>IP Address: ${ipAddress}</small></p>
          `
        });
        console.log('Email notification sent successfully');
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Don't fail the request if email fails
      }
    }

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully! Thank you for reaching out.',
      data: {
        id: contact._id,
        submittedAt: contact.createdAt
      }
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
});

// @route   GET /api/contact
// @desc    Get all contact form submissions (admin only)
// @access  Private (you can add authentication middleware later)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, isRead } = req.query;
    
    const query = {};
    if (isRead !== undefined) {
      query.isRead = isRead === 'true';
    }

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-ipAddress -userAgent'); // Hide sensitive info

    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      data: contacts,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });

  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   PATCH /api/contact/:id/read
// @desc    Mark contact as read
// @access  Private
router.patch('/:id/read', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact marked as read',
      data: contact
    });

  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;
