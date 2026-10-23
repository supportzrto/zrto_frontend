import LegalLayout from "../components/LegalLayout";

const sections = [
  {
    h: "Using ZRTO",
    p: [
      "By creating an account or using ZRTO you agree to these Terms. ZRTO is a business service for ecommerce sellers. You must be at least 18 and authorised to act for your business.",
    ],
  },
  {
    h: "Your account",
    p: [
      "You are responsible for your login details, your API key and everything done through your account. Keep your API key on your own server only, never in a website or app that customers can inspect. Tell us immediately if you think your account or key has been misused.",
    ],
  },
  {
    h: "Acceptable use",
    ul: [
      "Use ZRTO only for lawful business purposes.",
      "Do not try to break, probe, overload or reverse engineer the service, or bypass usage limits.",
      "Do not share API access with other businesses unless we have agreed to it in writing.",
      "Only send WhatsApp confirmations to customers who have placed an order with you and who may be contacted this way. You must follow WhatsApp's Business and Commerce policies and applicable laws, and you are responsible for the messages sent from your account.",
    ],
  },
  {
    h: "Plans, limits and API access",
    ul: [
      "Free: 50 predictions to get started.",
      "Pro: 5,000 predictions for each paid 30-day period.",
      "API access is switched on by our team for your account and may be limited or withdrawn if these Terms are broken.",
      "When a limit is reached, predictions stop until you renew or upgrade. We may change plans and limits with reasonable notice.",
    ],
  },
  {
    h: "Payments",
    p: [
      "Pro is a one-time payment for 30 days of access. It does not renew automatically, so you are not charged again unless you pay again. Renewing while your plan is active adds 30 days to your current end date, and each paid period starts with a fresh prediction allowance. Payments are made in Indian Rupees through Razorpay. See our Refund and Cancellation Policy for refunds.",
    ],
  },
  {
    h: "Predictions are guidance, not guarantees",
    p: [
      "ZRTO gives a probability and a suggested action for each order. Predictions can be wrong, and results depend on your data, your products and your couriers. We do not promise any particular reduction in returns. You make the final decision on every order and are responsible for those decisions.",
    ],
  },
  {
    h: "Your data",
    p: [
      "You keep ownership of your data. You allow us to process it to provide the service, including sending WhatsApp messages on your behalf, and to improve our models in a way that does not expose your customers' details to others. Our Privacy Policy explains how data is handled.",
    ],
  },
  {
    h: "Third-party services",
    p: [
      "ZRTO relies on providers such as Meta (WhatsApp), Razorpay, Brevo and cloud hosts. We are not responsible for outages, delays or policy changes at those providers, including WhatsApp delivery limits, template approvals and fees charged by Meta to your own WhatsApp Business account.",
    ],
  },
  {
    h: "Availability",
    p: ["We work to keep ZRTO available but cannot promise uninterrupted or error-free service. We may carry out maintenance and improvements from time to time."],
  },
  {
    h: "Limitation of liability",
    p: [
      "To the extent permitted by law, ZRTO is not liable for indirect or consequential loss, lost profit or lost orders, and our total liability for any claim is limited to the amount you paid us in the three months before the claim arose. Nothing in these Terms limits liability that cannot be limited by law.",
    ],
  },
  {
    h: "Suspension and termination",
    p: [
      "You can delete your account at any time from the Account page. We may suspend or end access if these Terms are broken, if payment is fraudulent, or if needed to protect the service or other users.",
    ],
  },
  {
    h: "Changes",
    p: ["We may update these Terms. If a change is significant we will tell you by email or in the product. Using ZRTO after a change means you accept it."],
  },
  {
    h: "Governing law",
    p: ["These Terms are governed by the laws of India. Courts in Hyderabad, Telangana have jurisdiction, subject to any rights you have under applicable consumer law."],
  },
];

export default function Terms() {
  return (
    <LegalLayout
      title="Terms of Service"
      intro="These Terms govern your use of ZRTO. Please read them before you use the service."
      sections={sections}
    />
  );
}