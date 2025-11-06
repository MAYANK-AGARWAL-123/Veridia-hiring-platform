const applicationSubmittedTemplate = (candidateName, jobTitle) => `
  <h3>Application Received!</h3>
  <p>Hi ${candidateName},</p>
  <p>Thank you for applying for the ${jobTitle} position at Veridia. We have successfully received your application.</p>
  <p>Our team will review your application and get back to you soon.</p>
  <p>Best regards,<br>The Veridia Hiring Team</p>
`;

const applicationStatusUpdateTemplate = (candidateName, jobTitle, status) => `
  <h3>Application Status Update</h3>
  <p>Hi ${candidateName},</p>
  <p>We're writing to inform you that the status of your application for the ${jobTitle} position has been updated to: <strong>${status}</strong>.</p>
  <p>We appreciate your patience throughout the hiring process.</p>
  <p>Best regards,<br>The Veridia Hiring Team</p>
`;

const newApplicationAdminNotificationTemplate = (candidateName, jobTitle) => `
  <h3>New Application Submitted</h3>
  <p>Hi Admin,</p>
  <p>A new application has been submitted by ${candidateName} for the ${jobTitle} position.</p>
  <p>Please log in to the admin dashboard to review the application.</p>
`;

module.exports = {
  applicationSubmittedTemplate,
  applicationStatusUpdateTemplate,
  newApplicationAdminNotificationTemplate,
};