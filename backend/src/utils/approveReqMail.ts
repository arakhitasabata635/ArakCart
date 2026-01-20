import nodemailer from "nodemailer";

const approveReqMail = async ({ email, ownerName, shopName }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"ArakCart" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "🎉 Seller Application Approved",
    html: `
        <h2>Congratulations ${ownerName} 🎉</h2>
        <p>Your seller application for <b>${shopName}</b> has been approved.</p>
        <p>You can now:</p>
        <ul>
          <li>Add products</li>
          <li>Manage orders</li>
          <li>Start selling immediately</li>
        </ul>
        <p>Welcome to our seller community 🚀</p>
        <br/>
        <p>— Team ${process.env.APP_NAME}</p>
      `,
  };

  await transporter.sendMail(mailOptions);
};

export default approveReqMail;
