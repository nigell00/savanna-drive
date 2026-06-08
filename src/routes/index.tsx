import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import poloHero from "@/assets/polo-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Trackxis Namibia | Rent Polo 6 TSI — Drive with Confidence" },
      {
        name: "description",
        content:
          "Rent the Volkswagen Polo 6 TSI in Namibia. Fuel-efficient, modern, and perfect for road trips from Windhoek to Sossusvlei and Etosha.",
      },
      { property: "og:title", content: "Trackxis Namibia | Rent Polo 6 TSI" },
      {
        property: "og:description",
        content:
          "Drive Namibia in a brand-new Volkswagen Polo 6 TSI. Free airport delivery, full insurance options, 24/7 roadside assistance.",
      },
      { property: "og:image", content: poloHero },
    ],
  }),
  component: Index,
});

const DAILY_PRICE = 950;

function Index() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    pickup: "",
    ret: "",
    location: "Windhoek Hosea Kutako Airport (Free)",
    message: "",
  });

  const days = useMemo(() => {
    if (!form.pickup || !form.ret) return 0;
    const p = new Date(form.pickup).getTime();
    const r = new Date(form.ret).getTime();
    const diff = Math.ceil((r - p) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }, [form.pickup, form.ret]);

  const total = useMemo(() => {
    let t = days * DAILY_PRICE;
    if (days >= 7) t = t * 0.88;
    return Math.round(t);
  }, [days]);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      alert("📧 Please enter a valid email address.");
      return;
    }
    if (!form.pickup || !form.ret || !form.name || !form.phone) {
      alert("📝 Please fill in all required fields.");
      return;
    }

    const subject = encodeURIComponent("Polo 6 TSI Booking Request — Trackxis Namibia");
    const body = encodeURIComponent(
      `Hello Trackxis Team,\n\nI would like to book the Polo 6 TSI.\n\n` +
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Phone: ${form.phone}\n` +
      `Pick-up: ${form.pickup}\n` +
      `Return: ${form.ret}\n` +
      `Location: ${form.location}\n` +
      `Estimated total: NAD ${total.toLocaleString()}\n` +
      `\nSpecial requests:\n${form.message || "None"}\n\n` +
      `Best regards,\n${form.name}`
    );

    const mailto = `mailto:reservations@trackxisnamibia.com?subject=${subject}&body=${body}`;
    window.location.href = mailto;
  };

  return (
    <div className="trackxis">
      <style>{css}</style>

      <div className="container">
        <header className="navbar">
          <div className="logo">
            <h1>TRACKXIS NAMIBIA</h1>
            <span>drive · explore · trust</span>
          </div>
          <nav className="nav-links">
            <a href="#home">Home</a>
            <a href="#specs">Polo 6 TSI</a>
            <a href="#book">Book now</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <section className="hero" id="home">
          <div className="hero-content">
            <div className="hero-badge">🌍 Namibia's favourite rental</div>
            <h1>
              Rent the iconic <span className="highlight">Volkswagen Polo 6 TSI</span> – for every adventure
            </h1>
            <p className="hero-desc">
              Smooth, fuel-efficient, and perfect for Namibia's open roads. From Sossusvlei to Etosha, drive with confidence and style.
            </p>
            <div className="hero-stats">
              <div className="stat"><i className="fa-solid fa-gas-pump" /> Ultra low consumption</div>
              <div className="stat"><i className="fa-solid fa-snowflake" /> Aircon & Bluetooth</div>
              <div className="stat"><i className="fa-solid fa-shield" /> Full insurance options</div>
            </div>
            <div style={{ marginTop: "1.8rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="#book" className="btn-primary"><i className="fa-solid fa-key" /> Reserve your Polo now</a>
              <a href="#specs" className="btn-outline">Specs</a>
            </div>
          </div>
          <div className="hero-image">
            <img src={poloHero} alt="Volkswagen Polo 6 TSI on a Namibian desert road" width={1024} height={1024} />
          </div>
        </section>

        <section id="specs">
          <h2 className="section-title">🚙 Volkswagen Polo 6 TSI — Drive Excellence</h2>
          <p className="section-sub">
            Experience the perfect balance of performance, comfort, and economy. The ideal companion for Namibia's diverse terrain.
          </p>
          <div className="spec-grid">
            {[
              { i: "fa-solid fa-gauge-high", t: "1.0 TSI Engine", d: "85kW turbocharged – powerful yet efficient. Excellent fuel economy for long distances." },
              { i: "fa-solid fa-gears", t: "Manual / Automatic", d: "Choose your driving style. Smooth gearbox & responsive handling." },
              { i: "fa-solid fa-mobile-screen", t: "Modern tech", d: "Apple CarPlay®, Bluetooth, touchscreen & rearview camera for easy parking." },
              { i: "fa-solid fa-temperature-low", t: "Climate Control", d: "Dual zone A/C, electric windows, and cruise control for relaxed travel." },
            ].map((s) => (
              <div className="spec-card" key={s.t}>
                <i className={s.i} />
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="book" className="booking-panel">
          <div className="price-tag">
            <span className="daily-price">NAD {DAILY_PRICE}</span>
            <span className="price-note">/ per day</span>
            <span className="price-note">• + unlimited km option</span>
          </div>
          <p>✅ Includes basic insurance, 24/7 roadside assistance & free airport delivery (Windhoek)</p>

          <form className="form-grid" onSubmit={submit}>
            <div className="input-group">
              <label>👤 Full name *</label>
              <input required value={form.name} onChange={update("name")} />
            </div>
            <div className="input-group">
              <label>✉️ Email address *</label>
              <input type="email" required placeholder="you@email.com" value={form.email} onChange={update("email")} />
            </div>
            <div className="input-group">
              <label>📱 WhatsApp / Phone *</label>
              <input required value={form.phone} onChange={update("phone")} />
            </div>
            <div className="input-group">
              <label>📅 Pick-up date *</label>
              <input type="date" required value={form.pickup} onChange={update("pickup")} />
            </div>
            <div className="input-group">
              <label>📅 Return date *</label>
              <input type="date" required value={form.ret} onChange={update("ret")} />
            </div>
            <div className="input-group">
              <label>📍 Pick-up location</label>
              <select value={form.location} onChange={update("location")}>
                <option>Windhoek Hosea Kutako Airport (Free)</option>
                <option>Windhoek City Centre</option>
                <option>Swakopmund Office (extra fee)</option>
              </select>
            </div>
            <div className="input-group" style={{ gridColumn: "1 / -1" }}>
              <label>📝 Special requests (child seat, GPS, etc.)</label>
              <textarea rows={3} value={form.message} onChange={update("message")} />
            </div>

            <div className="total-cost" style={{ gridColumn: "1 / -1" }}>
              <span>💰 Estimated total ({days} day{days === 1 ? "" : "s"}, incl. VAT & basic cover):</span>
              <span className="final-price">NAD {total.toLocaleString()}</span>
            </div>

            <button type="submit" className="btn-primary btn-block" style={{ gridColumn: "1 / -1" }}>
              <i className="fa-solid fa-paper-plane" /> Send Booking Request → Trackxis Team
            </button>
            <p style={{ gridColumn: "1 / -1", fontSize: "0.85rem", color: "#6f7c74", textAlign: "center" }}>
              🔒 We respect your privacy. No hidden fees, confirmation within 2 hours.
            </p>
          </form>
        </section>

        <section className="testimonials">
          <h2 className="section-title">❤️ What our Namibia travellers say</h2>
          <div className="spec-grid">
            {[
              { q: "The Polo 6 TSI was spotless and super economical. Trackxis made our Skeleton Coast road trip unforgettable.", a: "Lena & Tom, Germany" },
              { q: "Perfect customer service, brand new Polo, and flexible with drop-off. Will always rent from Trackxis Namibia.", a: "Amutenya, Windhoek" },
              { q: "Fuel efficiency is no joke — we drove from Swakopmund to Lüderitz on a single tank. Highly recommend!", a: "Liam, Cape Town" },
            ].map((t) => (
              <div className="testimonial-card" key={t.a}>
                <div className="stars">★★★★★</div>
                <p>"{t.q}"</p>
                <p style={{ marginTop: "0.8rem", fontWeight: 600 }}>— {t.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" style={{ margin: "3rem 0" }}>
          <div className="spec-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
            <div className="spec-card" style={{ textAlign: "left" }}>
              <h3>📍 Trackxis Namibia HQ</h3>
              <p>9 Werner List Street, Windhoek, Namibia</p>
              <p>📞 +264 81 123 4567 (Call)</p>
              <p>
                <a
                  href="https://wa.me/264811234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--accent)", fontWeight: 600 }}
                >
                  💬 WhatsApp us
                </a>
              </p>
              <p>✉️ reservations@trackxisnamibia.com</p>
              <p>🕒 Mon–Fri: 8:00 – 18:00 | Sat: 9:00 – 15:00</p>
              <div style={{ marginTop: "1rem", display: "flex", gap: "1rem", fontSize: "1.4rem", color: "var(--accent)" }}>
                <i className="fa-brands fa-whatsapp" />
                <i className="fa-brands fa-instagram" />
                <i className="fa-brands fa-facebook" />
              </div>
            </div>
            <div className="spec-card" style={{ textAlign: "left" }}>
              <h3>🎯 Starting with the Polo 6 TSI</h3>
              <p>Our fleet currently focuses on the Polo 6 TSI — perfectly maintained, latest-gen models. More vehicles coming soon as we grow.</p>
              <p style={{ marginTop: "1rem", fontWeight: 600, color: "var(--accent)" }}>
                🎁 Weekly discount: 7+ days → 12% off
              </p>
            </div>
          </div>
        </section>
      </div>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col" style={{ flex: "1 1 260px" }}>
              <h4>🚗 Trackxis Namibia</h4>
              <p>Your trusted local partner for reliable rentals. Starting with the Polo 6 TSI — because quality drives growth.</p>
            </div>
            <div className="footer-col">
              <h4>Quick links</h4>
              <p><a href="#" style={{ color: "inherit" }}>Terms & conditions</a></p>
              <p><a href="#" style={{ color: "inherit" }}>Insurance details</a></p>
              <p><a href="#" style={{ color: "inherit" }}>Privacy policy</a></p>
            </div>
            <div className="footer-col">
              <h4>Emergency support</h4>
              <p>24/7 Roadside: +264 81 999 8888</p>
            </div>
          </div>
          <div className="copyright">
            © 2026 Trackxis Namibia — Drive the moment, rent the Polo 6 TSI. 🧡 Built with love for Namibian explorers.
          </div>
        </div>
      </footer>
    </div>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
.trackxis { font-family: 'Inter', sans-serif; background-color: #fefcf5; color: #1e2a32; scroll-behavior: smooth; }
.trackxis * { box-sizing: border-box; }
.trackxis { --primary: #0a3b2f; --primary-dark: #05261e; --accent: #e67e22; --accent-light: #f39c12; --card-shadow: 0 20px 35px -12px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.02); --transition: all 0.25s ease; }
.trackxis .container { max-width: 1280px; margin: 0 auto; padding: 0 1.5rem; }
.trackxis .btn-primary { background-color: var(--accent); color: white; font-weight: 600; padding: 0.85rem 2rem; border-radius: 40px; border: none; cursor: pointer; transition: var(--transition); display: inline-flex; align-items: center; gap: 0.5rem; font-size: 1rem; box-shadow: 0 4px 8px rgba(230,126,34,0.2); text-decoration: none; }
.trackxis .btn-primary:hover { background-color: #d35400; transform: translateY(-2px); box-shadow: 0 12px 20px -8px rgba(230,126,34,0.4); }
.trackxis .btn-outline { background: transparent; border: 2px solid var(--primary); color: var(--primary); font-weight: 600; padding: 0.7rem 1.8rem; border-radius: 40px; transition: var(--transition); display: inline-flex; align-items: center; gap: 0.5rem; cursor: pointer; text-decoration: none; }
.trackxis .btn-outline:hover { background-color: var(--primary); color: white; }
.trackxis .navbar { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; padding: 1.25rem 0; border-bottom: 1px solid #e9e2d4; }
.trackxis .logo h1 { font-size: 1.8rem; font-weight: 800; letter-spacing: -0.5px; background: linear-gradient(135deg, var(--primary) 0%, #1f6e5a 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }
.trackxis .logo span { font-size: 0.9rem; font-weight: 400; color: var(--accent); }
.trackxis .nav-links a { text-decoration: none; margin-left: 2rem; font-weight: 500; color: #2c3e2f; transition: var(--transition); }
.trackxis .nav-links a:hover { color: var(--accent); }
.trackxis .hero { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 2rem; padding: 3rem 0 2rem; }
.trackxis .hero-content { flex: 1 1 360px; }
.trackxis .hero-badge { background: #eef2f0; display: inline-block; padding: 0.3rem 1rem; border-radius: 30px; font-size: 0.8rem; font-weight: 600; color: var(--primary); margin-bottom: 1.2rem; }
.trackxis .hero-content h1 { font-size: 3.2rem; line-height: 1.2; font-weight: 800; color: #1e2f2a; margin-bottom: 1rem; }
.trackxis .highlight { color: var(--accent); border-bottom: 2px solid var(--accent-light); display: inline-block; }
.trackxis .hero-desc { font-size: 1.1rem; color: #4a5b52; margin: 1.5rem 0; max-width: 90%; }
.trackxis .hero-stats { display: flex; gap: 1.8rem; margin-top: 1.8rem; flex-wrap: wrap; }
.trackxis .stat { display: flex; align-items: center; gap: 0.6rem; }
.trackxis .stat i { font-size: 1.4rem; color: var(--accent); }
.trackxis .hero-image { flex: 1 1 360px; background: linear-gradient(145deg, #f0ede5, #e3ddd2); border-radius: 2rem; padding: 1rem; box-shadow: var(--card-shadow); }
.trackxis .hero-image img { width: 100%; height: auto; border-radius: 1.5rem; object-fit: cover; display: block; }
.trackxis .section-title { font-size: 2rem; font-weight: 700; text-align: center; margin: 2.5rem 0 1rem; color: var(--primary-dark); }
.trackxis .section-sub { text-align: center; color: #5d6e64; max-width: 600px; margin: 0 auto 2rem auto; }
.trackxis .spec-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin: 2rem 0 3rem; }
.trackxis .spec-card { background: white; padding: 1.8rem; border-radius: 1.5rem; text-align: center; box-shadow: var(--card-shadow); transition: var(--transition); border: 1px solid #f0ede5; }
.trackxis .spec-card:hover { transform: translateY(-4px); }
.trackxis .spec-card i { font-size: 2.5rem; color: var(--accent); margin-bottom: 1rem; }
.trackxis .spec-card h3 { margin-bottom: 0.6rem; font-weight: 700; }
.trackxis .spec-card p { color: #4f5e56; }
.trackxis .booking-panel { background: white; border-radius: 2rem; box-shadow: var(--card-shadow); padding: 2rem; margin: 2rem 0 3rem; border: 1px solid #f0e7db; }
.trackxis .price-tag { display: flex; align-items: baseline; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem; }
.trackxis .daily-price { font-size: 2.5rem; font-weight: 800; color: var(--primary); }
.trackxis .price-note { color: #6f7c74; }
.trackxis .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; margin-top: 1.5rem; }
.trackxis .input-group { display: flex; flex-direction: column; gap: 0.4rem; }
.trackxis .input-group label { font-weight: 600; font-size: 0.9rem; color: #2e473b; }
.trackxis .input-group input, .trackxis .input-group select, .trackxis .input-group textarea { padding: 0.8rem 1rem; border: 1px solid #e2dcd0; border-radius: 1.2rem; font-family: 'Inter', sans-serif; background: #fefcf8; transition: 0.2s; font-size: 1rem; }
.trackxis .input-group input:focus, .trackxis .input-group textarea:focus, .trackxis .input-group select:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px rgba(230,126,34,0.1); }
.trackxis .total-cost { background: #f1f4f2; border-radius: 1.5rem; padding: 1rem 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; }
.trackxis .final-price { font-size: 1.8rem; font-weight: 800; color: var(--primary); }
.trackxis .btn-block { width: 100%; justify-content: center; }
.trackxis .testimonials { background: #fefaf4; border-radius: 2rem; padding: 2rem; margin: 2rem 0; }
.trackxis .testimonial-card { background: white; border-radius: 1.2rem; padding: 1.5rem; box-shadow: 0 8px 18px rgba(0,0,0,0.03); border: 1px solid #efe5d9; }
.trackxis .stars { color: #f4b942; margin-bottom: 0.8rem; }
.trackxis .footer { background: #0f2c24; color: #cfdfd8; padding: 2.5rem 0 1.5rem; margin-top: 3rem; border-radius: 2rem 2rem 0 0; }
.trackxis .footer-grid { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 2rem; }
.trackxis .footer-col h4 { color: white; margin-bottom: 1rem; }
.trackxis .footer-col p { margin-bottom: 0.4rem; }
.trackxis .copyright { text-align: center; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #2e5345; font-size: 0.85rem; }
@media (max-width: 820px) {
  .trackxis .hero-content h1 { font-size: 2.4rem; }
  .trackxis .navbar { flex-direction: column; gap: 1rem; }
  .trackxis .nav-links a { margin: 0 0.8rem; }
  .trackxis .hero-desc { max-width: 100%; }
}
`;
