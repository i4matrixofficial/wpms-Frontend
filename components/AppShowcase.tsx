export default function AppShowcase() {
  return (
    <section className="showcase">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow" style={{ justifyContent: "center" }}>App Showcase</div>
          <h2>Designed for the way you actually live.</h2>
          <p>Take a tour through the moments that make Fixora feel effortless.</p>
        </div>

        <div className="showcase-grid">
          <div className="showcase-visual">
            <div className="phone phone-b" style={{ right: "14%", top: "6%", transform: "rotate(6deg)" }}>
              <div className="phone-screen">
                <div className="phone-topbar"><span>9:41</span><span>●●●</span></div>
                <div className="phone-brand">FIX<span>ORA</span></div>
                <div style={{ fontSize: "14px", fontWeight: 700, marginBottom: "10px" }}>
                  Who are you?
                </div>
                <div className="phone-field" style={{ height: "60px" }}></div>
              </div>
            </div>

            <div className="phone phone-a" style={{ left: "14%", top: "0", transform: "rotate(-6deg)" }}>
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
          </div>

          <div className="showcase-copy">
            <div className="idx">01 / 06</div>
            <h3>Customer Home</h3>
            <p>
              Browse popular services and top-rated pros, all sorted by
              distance and rating the moment you open the app.
            </p>
            <div className="carousel-ctrl">
              <button aria-label="Previous">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className="active" aria-label="Next">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 6l6 6-6 6" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="carousel-dots">
                <span className="active"></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}