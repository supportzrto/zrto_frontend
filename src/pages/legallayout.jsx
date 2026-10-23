import PublicLayout from "../layouts/PublicLayout";
import { brand } from "../config/theme";
import { CONTACT, LEGAL } from "../config/siteContent";

// Shared page for Privacy / Terms / Refund. Each section: { h, p: [paragraphs], ul: [bullets] }.
export default function LegalLayout({ title, intro, sections }) {
  return (
    <PublicLayout>
      <div className="font-sans" style={{ background: "#f8f9ff" }}>
        <section className="px-6 py-16 md:py-20 text-center" style={{ background: brand.panelGradient }}>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">{title}</h1>
          <p className="text-sm" style={{ color: "#c7d2fe" }}>Last updated: {LEGAL.updated}</p>
        </section>

        <div className="px-6 py-14">
          <article className="max-w-3xl mx-auto rounded-3xl p-7 md:p-12 shadow-xl" style={{ background: "#fff", border: `2px solid ${brand.border}`, color: "#374151" }}>
            {intro && <p className="mb-8 leading-relaxed">{intro}</p>}

            {sections.map((sec, i) => (
              <section key={sec.h} className="mb-8">
                <h2 className="text-lg md:text-xl font-extrabold mb-3" style={{ color: brand.ink }}>
                  {i + 1}. {sec.h}
                </h2>
                {(sec.p || []).map((para, k) => (
                  <p key={k} className="mb-3 leading-relaxed text-[15px]">{para}</p>
                ))}
                {sec.ul && (
                  <ul className="list-disc ml-6 mb-3 space-y-2 text-[15px] leading-relaxed">
                    {sec.ul.map((li, k) => <li key={k}>{li}</li>)}
                  </ul>
                )}
              </section>
            ))}

            <section className="mt-10 pt-6 text-[15px]" style={{ borderTop: `1px solid ${brand.border}` }}>
              <h2 className="text-lg font-extrabold mb-3" style={{ color: brand.ink }}>Contact us</h2>
              <p className="mb-1"><strong>{LEGAL.entityName}</strong></p>
              <p className="mb-1">{LEGAL.address}</p>
              <p className="mb-1">Email: <a className="underline" style={{ color: brand.primary }} href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
              <p className="mb-1">Phone: {CONTACT.phone}</p>
              {LEGAL.grievanceOfficer && <p>Grievance Officer: {LEGAL.grievanceOfficer}</p>}
            </section>
          </article>
        </div>
      </div>
    </PublicLayout>
  );
}