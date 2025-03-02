/* eslint-env node */
import nodemailer from 'nodemailer';

// Configure nodemailer with your email service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { applicant, opportunity } = req.body;

  try {
    // Email to the organization
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: opportunity.organizationEmail,
      subject: `New Volunteer Application: ${opportunity.title}`,
      html: `
        <h2>New Volunteer Application</h2>
        <p><strong>Position:</strong> ${opportunity.title}</p>
        <p><strong>Applicant:</strong> ${applicant.firstName} ${applicant.lastName}</p>
        <p><strong>Email:</strong> ${applicant.email}</p>
        <p><strong>Phone:</strong> ${applicant.phone}</p>
        <h3>Experience</h3>
        <p>${applicant.experience}</p>
        <h3>Skills</h3>
        <p>${applicant.skills}</p>
        <h3>Availability</h3>
        <p>${applicant.availability.join(', ')}</p>
        <h3>References</h3>
        <p>${applicant.references}</p>
      `,
    });

    // Confirmation email to the applicant
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: applicant.email,
      subject: `Application Received: ${opportunity.title}`,
      html: `
        <h2>Thank you for applying!</h2>
        <p>Dear ${applicant.firstName},</p>
        <p>We've received your application for the ${opportunity.title} position at ${opportunity.organization}.</p>
        <h3>Next Steps</h3>
        <ul>
          <li>The volunteer coordinator will review your application</li>
          <li>You'll receive a response within 2-3 business days</li>
          <li>If selected, you'll be invited for an orientation session</li>
        </ul>
        <p>Position Details:</p>
        <ul>
          <li><strong>Role:</strong> ${opportunity.title}</li>
          <li><strong>Organization:</strong> ${opportunity.organization}</li>
          <li><strong>Location:</strong> ${opportunity.location}</li>
          <li><strong>Commitment:</strong> ${opportunity.commitment}</li>
        </ul>
        <p>If you have any questions, please don't hesitate to contact us.</p>
        <p>Best regards,<br>Tulsa Civic Tech Team</p>
      `,
    });

    res.status(200).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ message: 'Error sending application emails' });
  }
} 