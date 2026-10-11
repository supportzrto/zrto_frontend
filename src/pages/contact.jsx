import { useState } from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import Reveal from "../components/Reveal";
import { useToast } from "../components/Toast.jsx";
import { API_URL } from "../config/api";
import { brand, inputStyle as baseInput, focusBorder, blurBorder } from "../config/theme";
import { CONTACT } from "../config/siteContent";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_MESSAGE = 2000;

const cards = [
  { icon: "📧", label: "Email us", value: CONTACT.email, href: `mailto:${CONTACT.email}`, tint: "#eef2ff", ring: "#c7d2fe" },
  { icon: "📞", label: "Call us", value: CONTACT.phone, href: CONTACT.phoneHref, tint: "#f0fdf4", ring: "#bbf7d0" },
  { icon: "📍", label: "Visit us", value: CONTACT.location, href: null, tint: "#fff7ed", ring: "#fed7aa" },
];

const next = [
  "You send us a message.",
  "We read it and get back to you within 24–48 hours.",
  "If it helps, we set up a quick walkthrough for your store.",
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success
  const toast = useToast();

  const set = (key) => (e) => {
    setForm({ ...form, [key]: e.target.value });
    if (errors[key]) setErrors({ ...errors, [key]: "" });
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!EMAIL_RE.test(form.email.trim())) e.email = "Please enter a valid email address.";
    if (form.message.trim().length < 5) e.message = "Please write a short message (at least 5 characters).";
    if (form.message.length > MAX_MESSAGE) e.message = `Message is too long (max ${MAX_MESSAGE} characters).`;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name.trim(), email: form.email.trim(), message: form.message.trim() }),
      });
      if (res.status === 429) {
        toast.error("Too many messages. Please wait a minute and try again.");
        setStatus("idle");
        return;
      }
      if (res.status === 422) {
        toast.error("Please check your details and try again.");
        setStatus("idle");
        return;
      }
      if (!res.ok) throw new Error();
      setForm({ name: "", email: "", message: "" });
      setStatus("success");
      toast.success("Message sent. We'll be in touch soon.");
    } catch {
      toast.error(`Couldn't send your message. Please email us at ${CONTACT.email}.`);
      setStatus("idle");
    }
  };

  const field = (hasError) => ({
    ...baseInput,
    border: `2px solid ${hasError ? "#fca5a5" : brand.border}`,
  });

  return (
    <PublicLayout>
      <div className="font-sans" style={{ background: "#f8f9ff" }}>
        {/* HERO */}
        <section className="relative overflow-hidden px-6 py-24 md:py-28 text-center" style={{ background: brand.panelGradient }}>
          <div className="absolute -top-24 -left-24 w-[400px] h-[400px] rounded-full opacity-25 pointer-events-none" style={{ background: `radial-gradient(circle, ${brand.accent}, transparent 65%)` }} />
          <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "26px 26px" }} />
          <div className="relative max-w-3xl mx-auto">
            <span className="inline-flex px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6" style={{ background: "rgba(255,255,255,0.14)", color: "#e0e7ff", border: "1px solid rgba(255,255,255,0.2)" }}>Contact</span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white mb-5">Let's talk about your COD losses</h1>
            <p className="text-lg leading-relaxed" style={{ color: "#c7d2fe" }}>
              Questions about ZRTO, pricing or setup? Send us a message and a real person will reply.
            </p>
          </div>
        </section>

        {/* CARDS + FORM */}
        <section className="px-6 -mt-10 pb-24 relative z-10">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-8">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-5">
              {cards.map((c, i) => {
                const inner = (
                  <div className="flex items-center gap-4 rounded-2xl p-5 shadow-md transition-transform hover:-translate-y-1" style={{ background: "#fff", border: `2px solid ${c.ring}` }}>
                    <span className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: c.tint }}>{c.icon}</span>
                    <div className="min-w-0">
                      <div className="text-xs font-bold uppercase tracking-wide" style={{ color: brand.faint }}>{c.label}</div>
                      <div className="font-extrabold truncate" style={{ color: brand.ink }}>{c.value}</div>
                    </div>
                  </div>
                );
                return (
                  <Reveal key={c.label} delay={i * 90}>
                    {c.href ? <a href={c.href} className="block">{inner}</a> : inner}
                  </Reveal>
                );
              })}

              <Reveal delay={280}>
                <div className="rounded-2xl p-6 text-white" style={{ background: "linear-gradient(135deg, #1e1b4b, #312e81)" }}>
                  <div className="font-extrabold mb-4">What happens next</div>
                  <ol className="space-y-3">
                    {next.map((t, i) => (
                      <li key={t} className="flex items-start gap-3 text-sm" style={{ color: "#c7d2fe" }}>
                        <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold text-white flex-shrink-0" style={{ background: `linear-gradient(135deg, ${brand.accent}, ${brand.accentLight})` }}>{i + 1}</span>
                        <span className="pt-0.5">{t}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            </div>

            {/* Form */}
            <Reveal className="lg:col-span-3" delay={120}>
              <div className="rounded-3xl p-7 md:p-10 shadow-2xl" style={{ background: "#fff", border: `2px solid ${brand.border}` }}>
                {status === "success" ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-5" style={{ background: brand.successBg }}>✅</div>
                    <h2 className="text-2xl font-extrabold mb-2" style={{ color: brand.ink }}>Message sent!</h2>
                    <p className="text-sm mb-7" style={{ color: brand.muted }}>Thanks for reaching out. We'll reply within 24–48 hours.</p>
                    <button onClick={() => setStatus("idle")} className="font-extrabold px-6 py-3 rounded-xl text-white" style={{ background: brand.gradient, boxShadow: "0 4px 16px rgba(79,70,229,0.35)" }}>
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submit} noValidate>
                    <h2 className="text-2xl font-extrabold mb-1" style={{ color: brand.ink }}>Send us a message</h2>
                    <p className="text-sm mb-7" style={{ color: brand.muted }}>Fill in the form and we'll get back to you.</p>

                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="c-name" className="text-xs font-bold uppercase tracking-wide mb-1.5 block" style={{ color: brand.muted }}>Your name</label>
                        <input id="c-name" type="text" autoComplete="name" placeholder="John Doe" value={form.name} onChange={set("name")} maxLength={100}
                          className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors" style={field(errors.name)} onFocus={focusBorder} onBlur={blurBorder}
                          aria-invalid={!!errors.name} aria-describedby={errors.name ? "c-name-err" : undefined} />
                        {errors.name && <p id="c-name-err" className="text-xs mt-1.5" style={{ color: brand.error }}>{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="c-email" className="text-xs font-bold uppercase tracking-wide mb-1.5 block" style={{ color: brand.muted }}>Email address</label>
                        <input id="c-email" type="email" autoComplete="email" placeholder="john@yourbrand.com" value={form.email} onChange={set("email")}
                          className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors" style={field(errors.email)} onFocus={focusBorder} onBlur={blurBorder}
                          aria-invalid={!!errors.email} aria-describedby={errors.email ? "c-email-err" : undefined} />
                        {errors.email && <p id="c-email-err" className="text-xs mt-1.5" style={{ color: brand.error }}>{errors.email}</p>}
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="c-message" className="text-xs font-bold uppercase tracking-wide mb-1.5 block" style={{ color: brand.muted }}>Message</label>
                      <textarea id="c-message" rows={6} placeholder="Tell us about your store and what you'd like help with..." value={form.message} onChange={set("message")}
                        className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors resize-y" style={field(errors.message)} onFocus={focusBorder} onBlur={blurBorder}
                        aria-invalid={!!errors.message} aria-describedby={errors.message ? "c-message-err" : undefined} />
                      <div className="flex justify-between mt-1.5">
                        <p id="c-message-err" className="text-xs" style={{ color: brand.error }}>{errors.message || ""}</p>
                        <span className="text-xs" style={{ color: form.message.length > MAX_MESSAGE ? brand.error : brand.faint }}>{form.message.length}/{MAX_MESSAGE}</span>
                      </div>
                    </div>

                    <button type="submit" disabled={status === "loading"} className="w-full py-3.5 rounded-xl font-extrabold text-white transition-transform hover:scale-[1.02] disabled:hover:scale-100"
                      style={{ background: status === "loading" ? brand.disabled : brand.gradient, boxShadow: status === "loading" ? "none" : "0 4px 16px rgba(79,70,229,0.35)", cursor: status === "loading" ? "not-allowed" : "pointer" }}>
                      {status === "loading" ? "⏳ Sending..." : "Send message →"}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </section>

        {/* MAP */}
        <section className="px-6 pb-24">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-8" style={{ color: brand.ink }}>Find us in Hyderabad</h2>
              <div className="w-full h-[380px] rounded-3xl overflow-hidden shadow-xl" style={{ border: `2px solid ${brand.border}` }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d951.3653345960236!2d78.39361596962617!3d17.485477498963657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb918e14d0926d%3A0xdfcdb475a7c86614!2sBSNL%20Office%20Rd%2C%20KPHB%20Phase%20III%2C%20Kukatpally%2C%20Hyderabad%2C%20Telangana%20500072!5e0!3m2!1sen!2sin!4v1775379550516!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ZRTO location map"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-24">
          <Reveal className="max-w-4xl mx-auto rounded-3xl p-10 md:p-14 text-center shadow-2xl relative overflow-hidden" style={{ background: brand.gradient }}>
            <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] rounded-full opacity-25 pointer-events-none" style={{ background: `radial-gradient(circle, ${brand.accent}, transparent 65%)` }} />
            <div className="relative">
              <h2 className="text-3xl font-extrabold text-white mb-3">Want to see it for yourself?</h2>
              <p className="mb-8" style={{ color: "#e0e7ff" }}>Try ZRTO free. No credit card required.</p>
              <Link to="/register" className="inline-block font-extrabold px-8 py-4 rounded-xl text-white transition-transform hover:scale-105" style={{ background: `linear-gradient(135deg, ${brand.accent}, ${brand.accentLight})`, boxShadow: "0 8px 24px rgba(249,115,22,0.45)" }}>
                Start free: 50 predictions →
              </Link>
            </div>
          </Reveal>
        </section>
      </div>
    </PublicLayout>
  );
}