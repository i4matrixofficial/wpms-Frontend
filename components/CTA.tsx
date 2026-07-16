export default function CTA() {
  return (
    <section id="download">
      <div className="cta-wrap">
        <div className="cta">
          <div>
            <div className="cta-badge">🎉 Free to download</div>
            <h2>Ready to Fix Anything?</h2>
            <p>
              Join thousands who&apos;ve made Fixora their go-to for anything
              that needs doing. Available on iOS and Android.
            </p>
            <div className="store-row">
              <a href="#" className="store-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8.96-.19 1.87-.87 3.08-.79 1.28.09 2.24.55 2.9 1.36-2.55 1.53-2.14 4.91.35 5.9-.35 1.08-.85 2.15-1.41 2.7ZM12.03 7.25c-.15-2.23 1.66-4.09 3.74-4.25.28 2.29-2.08 4.32-3.74 4.25Z" />
                </svg>
                <span><small>Download on the</small><strong>App Store</strong></span>
              </a>
              <a href="#" className="store-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                  <path d="M3 3.5v17c0 .3.15.55.4.7l10-9.2-10-9.2c-.25.15-.4.4-.4.7Zm12 8.5-2.5-2.3L4.4 2 15 12l-10.6 8L15 12Zm.9-.9L18.5 12l3.1-1.8c.4-.24.4-.8 0-1L18.5 7.4l-2.6 3.6Zm0 1.8 2.6 3.6 3.1-1.8c.4-.24.4-.8 0-1L18.5 12l-2.6 1.6Z" />
                </svg>
                <span><small>GET IT ON</small><strong>Google Play</strong></span>
              </a>
            </div>
          </div>

          <div className="cta-visual">
            <div className="cta-phone p1">
              <div className="phone-screen" style={{ padding: "16px 12px" }}>
                <div className="phone-brand" style={{ fontSize: "10px" }}>FIX<span>ORA</span></div>
                <div style={{ fontSize: "14px", fontWeight: 800, margin: "10px 0" }}>Welcome</div>
                <div className="phone-field" style={{ height: "24px" }}></div>
                <div className="phone-field" style={{ height: "24px" }}></div>
                <div className="phone-cta" style={{ height: "26px" }}></div>
              </div>
            </div>
            <div className="cta-phone p2">
              <div className="phone-screen" style={{ padding: "16px 12px" }}>
                <div className="phone-brand" style={{ fontSize: "10px" }}>FIX<span>ORA</span></div>
                <div style={{ fontSize: "13px", fontWeight: 800, margin: "10px 0" }}>Who are you?</div>
                <div className="phone-field" style={{ height: "44px" }}></div>
                <div className="phone-field" style={{ height: "44px" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}