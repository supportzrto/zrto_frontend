import LegalLayout from "../components/LegalLayout";

const sections = [
  {
    h: "Who we are and our role",
    p: [
      "ZRTO provides software that predicts which Cash on Delivery (COD) orders are likely to be returned and, optionally, asks customers to confirm risky orders on WhatsApp.",
      "For your own account data (your name, email, company and billing history), ZRTO decides how the data is used. For the order and customer details that you upload or send to us (for example a customer's name, phone number, pincode and order value), you are the business that decides why that data is collected, and ZRTO processes it on your behalf to provide the service.",
    ],
  },
  {
    h: "Information we collect",
    ul: [
      "Account details: name, email address, phone number, company name, and your password (stored only as a one-way hash).",
      "Order data you upload or send for scoring: order value, payment type, pincode, city, device and channel, delivery details and similar fields.",
      "Customer contact details: if you use WhatsApp verification, the customer's name and phone number for that order, and their Confirm or Cancel reply.",
      "WhatsApp message records: message type, delivery status and the technical payloads Meta sends us about delivery and replies.",
      "Payments: Razorpay processes your payment. We store the order ID, payment ID, amount and status. We never see or store your card or UPI details.",
      "Usage and security data: API requests, prediction history, IP address and device information used for security and rate limiting.",
      "A single essential cookie that keeps you logged in. We do not use advertising cookies.",
    ],
  },
  {
    h: "How we use information",
    ul: [
      "To score orders, return decisions, and show your dashboards and analytics.",
      "To send WhatsApp confirmation messages and reminders on your behalf, from your own WhatsApp Business number.",
      "To process payments, activate plans and send receipts and renewal reminders.",
      "To send account emails such as verification links and one-time passwords.",
      "To keep the service secure, prevent abuse and fix problems.",
      "To improve the product. We do not sell personal data and we do not use your customers' details for marketing.",
    ],
  },
  {
    h: "WhatsApp messaging",
    p: [
      "Messages are delivered through Meta's WhatsApp Business Platform using the WhatsApp Business account and phone number you connect. Meta processes those messages under its own terms and privacy policy.",
      "You are responsible for having your customers' permission to message them on WhatsApp (for example by telling them at checkout that they may receive an order confirmation), for following WhatsApp's Business and Commerce policies, and for honouring any request from a customer to stop receiving messages.",
    ],
  },
  {
    h: "Who we share data with",
    p: [
      "We share data only with service providers that help us run ZRTO, and only as needed for that purpose. These currently include cloud hosting providers (Railway and Vercel), Meta (WhatsApp), Razorpay (payments) and Brevo (email). We may also disclose information if required by law or to protect against fraud or abuse.",
    ],
  },
  {
    h: "Where data is processed",
    p: ["Our providers may process data on servers in India or in other countries. We take reasonable steps to make sure it stays protected wherever it is processed."],
  },
  {
    h: "How long we keep data",
    ul: [
      "Account, order, prediction and WhatsApp data are kept while your account is active.",
      "When you delete your account, we delete your account, prediction history, API logs, WhatsApp brand settings and credentials, WhatsApp orders and message records.",
      "Payment records are kept for the period required by applicable tax and accounting laws.",
      "One-time passwords expire after 5 minutes.",
    ],
  },
  {
    h: "Security",
    p: [
      "We use encrypted connections (HTTPS), store passwords as salted one-way hashes, never show saved WhatsApp credentials back to you, limit login and one-time-password attempts, and restrict each account to its own data. No system is completely secure, so please use a strong, unique password and tell us straight away if you suspect misuse.",
    ],
  },
  {
    h: "Your rights",
    p: [
      "You can access and correct your account details, delete your account from the Account page, and ask us to access, correct or erase personal data we hold. If your customers contact us about their data, we will pass the request to you, as you are the business responsible for it.",
      "To make a request or a complaint, write to the contact details below. We will respond within a reasonable time and in line with applicable Indian law, including the Digital Personal Data Protection Act, 2023.",
    ],
  },
  {
    h: "Children",
    p: ["ZRTO is a business service and is not meant for anyone under 18."],
  },
  {
    h: "Changes to this policy",
    p: ["We may update this policy. If the changes are significant we will notify you by email or in the product. Continued use after a change means you accept the updated policy."],
  },
];

export default function Privacy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      intro="This policy explains what information ZRTO collects, why, who sees it, and the choices you have. We have written it in plain language on purpose."
      sections={sections}
    />
  );
}