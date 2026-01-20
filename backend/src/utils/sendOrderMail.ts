import nodemailer from "nodemailer";

const sendOrderMail = async ({ email, orderId, totalAmount }) => {
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
    subject: "✅ Order Confirmed - ArakCart",
    html: `
      <div style="font-family:Arial; padding:20px">
        <h2>🎉 Order Successful!</h2>
        <p>Thank you for shopping with <b>ArakCart</b>.</p>

        <p><b>Order ID:</b> ${orderId}</p>
        <p><b>Total Paid:</b> ₹${totalAmount}</p>

        <p>Your order has been successfully placed and is being processed.</p>

        <br />
        <p>Regards,<br/>ArakCart Team</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export default sendOrderMail;
