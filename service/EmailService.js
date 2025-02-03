require("dotenv").config();
const AppError = require("../errorHandling/AppError");
const transporter = require("../utils/nodemailerTransport");

class EmailService {
  sendInvoiceEmail(recipient, pdfPath, filename) {
    if (!recipient) throw new AppError(400, "Recipient email is required");

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: recipient,
      subject: "Invoice",
      text: "Attached below you can find your invoice.",
      attachments: [
        {
          filename,
          path: pdfPath,
          contentType: "application/pdf",
        },
      ],
    };

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(new AppError(500, error));
        } else {
          console.log("email sent:", info.response);
          resolve(info);
        }
      });
    });
  }
}

module.exports = EmailService;
