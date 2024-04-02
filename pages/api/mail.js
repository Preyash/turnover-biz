import nodemailer from "nodemailer";

export default function mail(req, res) {
  const { to, subject, body } = req.body;
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;
  const transporter = nodemailer.createTransport({
    service: "Yandex",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });
  transporter.sendMail(
    {
      from: SMTP_EMAIL,
      to,
      subject,
      html: body,
    },
    function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).send("Error sending email");
      } else {
        res.status(200).send("Email sent successfully");
      }
    }
  );
}
