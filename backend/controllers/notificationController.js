const sendEmail = require('../utils/sendEmail');
const { applicationSubmittedTemplate, applicationStatusUpdateTemplate, newApplicationAdminNotificationTemplate } = require('../utils/emailTemplates');
const Application = require('../models/Application');
const Admin = require('../models/Admin');

exports.sendSubmissionNotification = async (req, res) => {
  const { candidateName, jobTitle, candidateEmail } = req.body;

  try {
    // Notify candidate
    await sendEmail({
      to: candidateEmail,
      subject: 'Application Received!',
      html: applicationSubmittedTemplate(candidateName, jobTitle),
    });

    // Notify admins
    const admins = await Admin.find({});
    const adminEmails = admins.map((admin) => admin.email);

    if (adminEmails.length > 0) {
      await sendEmail({
        to: adminEmails.join(','),
        subject: 'New Application Submitted',
        html: newApplicationAdminNotificationTemplate(candidateName, jobTitle),
      });
    }

    res.status(200).json({ msg: 'Notifications sent' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.sendStatusUpdateNotification = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(401).json({ msg: 'Not authorized' });
  }

  const { applicationId } = req.body;

  try {
    const application = await Application.findById(applicationId).populate('candidate', ['name', 'email']).populate('job', 'title');
    if (!application) {
      return res.status(404).json({ msg: 'Application not found' });
    }

    const { candidate, job, status } = application;

    await sendEmail({
      to: candidate.email,
      subject: 'Application Status Update',
      html: applicationStatusUpdateTemplate(candidate.name, job.title, status),
    });

    res.status(200).json({ msg: 'Notification sent' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};