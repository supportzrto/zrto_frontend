import { Link } from "react-router-dom";
import PublicPageLayout from "../components/publicPageLayout";
import PublicLayout from "../layouts/PublicLayout";
import Footer from "../components/footer";
export default function Contact() {
  return (
    <PublicLayout>
      <div className="bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-700 text-white">

        {/* HERO */}
        <div className="text-center py-24 px-6">
          <h1 className="text-5xl font-extrabold mb-4">Contact Us</h1>
          <p className="text-indigo-200 max-w-2xl mx-auto text-lg">
            Have questions or want to see how ZRTO can help your business?
            We’re here to help.
          </p>
        </div>

        {/* SECTION 1: CONTACT + FORM */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6 py-20">

          {/* LEFT INFO */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>

            <p className="text-indigo-200 mb-6 leading-relaxed">
              Whether you're a growing D2C brand or scaling ecommerce store,
              our team can help you reduce COD losses and improve profitability.
            </p>

            <div className="space-y-4 text-indigo-200">
              <p>📧 ashokcivil27@gmail.com</p>
              <p>📞 +91 7093419456</p>
              <p>📍 Hyderabad, India</p>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="w-full">

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 outline-none"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 outline-none"
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 outline-none"
              />

              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-bold w-full"
              >
                Send Message →
              </button>
            </form>

          </div>

        </div>

        {/* SECTION 2: MAP */}
        <div className="max-w-7xl mx-auto px-6 pb-20">

          <h2 className="text-2xl font-bold mb-6 text-center">
            Visit Our Location
          </h2>

          <div className="w-full h-[400px] rounded-xl overflow-hidden border border-white/20">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d951.3653345960236!2d78.39361596962617!3d17.485477498963657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb918e14d0926d%3A0xdfcdb475a7c86614!2sBSNL%20Office%20Rd%2C%20KPHB%20Phase%20III%2C%20Kukatpally%2C%20Hyderabad%2C%20Telangana%20500072!5e0!3m2!1sen!2sin!4v1775379550516!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="location"
            ></iframe>
          </div>

        </div>

        {/* CTA */}
        <div className="text-center py-20 px-6">
          <h2 className="text-3xl font-bold mb-4">
            Want to reduce COD losses?
          </h2>
          <p className="text-indigo-200 mb-6">
            Try ZRTO for free — no credit card required.
          </p>

          <Link to="/register">
  <button className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-xl font-bold text-lg">
    Start Free → 50 Predictions
  </button>
</Link>
        </div>

      </div>
    </PublicLayout>
  );
}