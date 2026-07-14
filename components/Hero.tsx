export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-grid">
        <div>
          <div className="badge">
            <span className="dot"></span> Trusted by 10,000+ customers
          </div>
          <h1>
            Find Trusted
            <br />
            Workers.
            <br />
            Book <span className="tone">Instantly.</span>
            <br />
            Get Things Done.
          </h1>
          <p className="lead">
            Fixora helps you connect with verified workers for home repairs,
            cleaning, electrical, plumbing, tutoring and more — right from
            your phone.
          </p>
          <div className="hero-actions">
            <a href="#download" className="btn btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 17.5c-.4 0-.8-.15-1.06-.44l-4.5-4.5a1.5 1.5 0 0 1 2.12-2.12l2.44 2.44V3.5a1.5 1.5 0 0 1 3 0v9.38l2.44-2.44a1.5 1.5 0 1 1 2.12 2.12l-4.5 4.5c-.26.29-.66.44-1.06.44Z" />
                <path d="M4 19.5A1.5 1.5 0 0 1 5.5 18h13a1.5 1.5 0 0 1 0 3h-13A1.5 1.5 0 0 1 4 19.5Z" />
              </svg>
              Download App
            </a>
            <a href="#services" className="link-arrow">
              Explore Services
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
          <div className="proof">
            <div className="avatars">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Customer" />
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Customer" />
              <img src="https://randomuser.me/api/portraits/men/65.jpg" alt="Customer" />
              <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Customer" />
            </div>
            <div>
              <span className="stars">
                ★★★★★{" "}
                <b style={{ color: "var(--ink)", fontWeight: 700, fontSize: "13px" }}>
                  4.9
                </b>
              </span>
              <small>from 12,000+ reviews</small>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="glow"></div>

          <div className="phone phone-b">
            <div className="phone-screen">
              <div className="phone-topbar"><span>9:41</span><span>●●●</span></div>
              <div className="phone-brand">FIX<span>ORA</span></div>
              <div style={{ fontSize: "15px", fontWeight: 700, marginBottom: "14px" }}>
                Who are you?
              </div>
              <div className="phone-field" style={{ height: "70px" }}></div>
              <div className="phone-field" style={{ height: "70px" }}></div>
            </div>
          </div>

          <div className="phone phone-a">
            <div className="phone-screen">
              <div className="phone-topbar"><span>9:41</span><span>●●●</span></div>
              <div className="phone-brand">FIX<span>ORA</span></div>
              <div className="phone-welcome">Welcome</div>
              <div className="phone-tabs">
                <span className="active">Login</span>
                <span>Register</span>
              </div>
              <div className="phone-field"></div>
              <div className="phone-field"></div>
              <div className="phone-cta"></div>
            </div>
          </div>

          <div className="float-pill pill-1"><span className="ok"></span> Verified · 2,500+ Pros</div>
          <div className="float-pill pill-2"><span className="ok"></span> Verified · 2,500+ Pros</div>
        </div>
      </div>
    </section>
  );
}