// Public-site content that should only ever contain TRUE statements.
//
// ── HOW TO ADD CUSTOMER TESTIMONIALS ─────────────────────────────────────────
// Paste real quotes from real customers (with their permission) into TESTIMONIALS
// below. As soon as there is at least one entry, the "What our customers say"
// section appears on the home page and the cards scroll right-to-left on loop
// (hover pauses it). Four to six cards looks best. Example entry:
//
//   {
//     name: "Full Name",
//     role: "Founder",            // optional
//     company: "Brand Name",      // optional
//     location: "City",           // optional
//     quote: "What they actually said, in their words.",
//   },
//
// Run `npm run dev` with this list empty to preview the strip with demo cards
// (demo cards never appear on the live site).
// ─────────────────────────────────────────────────────────────────────────────
export const TESTIMONIALS = [];
export const LOGOS = [];

// Contact details shown on the Contact page.
export const CONTACT = {
  email: "ashokcivil27@gmail.com",
  phone: "+91 7093419456",
  phoneHref: "tel:+917093419456",
  location: "Hyderabad, India",
};

// Shown on the Privacy, Terms and Refund pages. Fill these in with your registered details
// (a legal entity name and a named grievance officer are expected under Indian law).
export const LEGAL = {
  productName: "ZRTO",
  entityName: "ZRTO", // e.g. "ZRTO Technologies Private Limited"
  address: "Hyderabad, India", // full registered address
  grievanceOfficer: "", // e.g. "Full Name, Founder"; leave empty to omit the line
  updated: "October 2026",
};