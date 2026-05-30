import { Link } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import PublicPageLayout from "../components/publicPageLayout";
import Footer from "../components/footer";
export default function About() {
    return (
        <PublicLayout>
            <div className="bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-700 text-white">

                {/* HERO */}
                <div className="text-center py-24 px-6">
                    <h1 className="text-5xl font-extrabold mb-4">
                        Stop Losing Money on COD Orders
                    </h1>
                    <p className="text-indigo-200 max-w-2xl mx-auto text-lg">
                        ZRTO helps Indian ecommerce brands predict risky COD orders
                        before shipping — saving thousands every month.
                    </p>
                </div>

                {/* SECTION 1 (LEFT TEXT + RIGHT VISUAL) */}
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6 py-20">

                    {/* LEFT */}
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Why We Built This</h2>
                        <p className="text-indigo-200 mb-4 leading-relaxed">
                            Most D2C brands in India lose 20–40% of COD orders due to fake or
                            unverified customers.
                        </p>
                        <p className="text-indigo-200 leading-relaxed">
                            Existing solutions rely on manual calls or WhatsApp confirmations —
                            which are slow, inconsistent, and still miss risky orders.
                        </p>
                    </div>

                    {/* RIGHT (visual placeholder) */}
                    <div className="h-64 bg-white/10 rounded-xl flex items-center justify-center overflow-hidden">
                        <img
                            src="/ai_image.png"
                            alt="Dashboard Illustration"
                            className="w-full h-full object-cover rounded-xl"
                        />
                    </div>

                </div>

                {/* SECTION 2 (REVERSE) */}
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6 py-20">

                    {/* LEFT VISUAL */}
                    <div className="h-64 bg-white/10 rounded-xl flex items-center justify-center overflow-hidden">
                        <img
                            src="/ai_image2.png"
                            alt="AI Engine Visual"
                            className="w-full h-full object-cover rounded-xl"
                        />
                    </div>

                    {/* RIGHT TEXT */}
                    <div>
                        <h2 className="text-3xl font-bold mb-4">How We Solve It</h2>
                        <p className="text-indigo-200 mb-4 leading-relaxed">
                            RTO Shield AI uses machine learning to analyze customer behavior,
                            pincode risk, and order patterns.
                        </p>
                        <p className="text-indigo-200 leading-relaxed">
                            Instead of guessing, you get a clear risk score and decision —
                            whether to allow, verify, or block COD orders.
                        </p>
                    </div>

                </div>

                {/* FULL WIDTH IMPACT STRIP */}
                <div className="py-16 px-6 bg-gradient-to-r from-orange-500 to-orange-600 text-center">
                    <h2 className="text-2xl font-bold mb-2">Real Impact</h2>
                    <p className="text-lg">
                        Brands reduce RTO by up to <b>70%</b> and save over <b>₹30,000+ monthly</b>
                    </p>
                </div>

                {/* STATS */}
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-10 py-20 px-6">

                    <div>
                        <h3 className="text-3xl font-bold">70%</h3>
                        <p className="text-indigo-200 text-sm">RTO Reduction</p>
                    </div>

                    <div>
                        <h3 className="text-3xl font-bold">₹30K+</h3>
                        <p className="text-indigo-200 text-sm">Saved Monthly</p>
                    </div>

                    <div>
                        <h3 className="text-3xl font-bold">50+</h3>
                        <p className="text-indigo-200 text-sm">Free Predictions</p>
                    </div>

                    <div>
                        <h3 className="text-3xl font-bold">AI</h3>
                        <p className="text-indigo-200 text-sm">Powered Decisions</p>
                    </div>

                </div>

                {/* CTA */}
                <div className="text-center py-20 px-6">
                    <h2 className="text-3xl font-bold mb-4">
                        Stop guessing. Start predicting.
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