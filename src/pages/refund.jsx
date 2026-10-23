import LegalLayout from "../components/LegalLayout";

const sections = [
  {
    h: "What you are paying for",
    p: [
      "The Pro plan is a one-time payment of ₹4,999 that gives you 30 days of access and 5,000 predictions for that period. It is a digital service, activated automatically in your account within moments of a successful payment, so there is nothing to ship.",
    ],
  },
  {
    h: "Cancellation",
    ul: [
      "Pro does not renew automatically. You will not be charged again unless you choose to pay again, so there is nothing to cancel.",
      "You can delete your account at any time from the Account page. Any unused days of a paid plan end when the account is deleted.",
    ],
  },
  {
    h: "Refunds",
    p: ["Payments are non-refundable once your plan is active, except in these cases, where we will refund in full:"],
    ul: [
      "You were charged more than once for the same plan (duplicate payment).",
      "Money was deducted but your plan was not activated and we could not activate it within 48 hours.",
      "ZRTO was unavailable to you because of a fault on our side for a long period and we could not fix it within a reasonable time.",
    ],
  },
  {
    h: "How to ask for a refund",
    p: [
      "Email us within 7 days of the payment with the email address on your account and your Razorpay payment ID (it is on the receipt we email you). We review requests quickly and tell you the outcome by email.",
      "Approved refunds are sent to the original payment method. Banks usually take 5 to 7 business days to show the money.",
    ],
  },
  {
    h: "Failed payments",
    p: ["If a payment fails or is declined, you are not charged. If money was deducted without a confirmation, your bank or Razorpay normally reverses it automatically within a few days. If it does not, contact us with the payment details."],
  },
];

export default function Refund() {
  return (
    <LegalLayout
      title="Refund & Cancellation Policy"
      intro="This policy explains how cancellation and refunds work for ZRTO plans."
      sections={sections}
    />
  );
}