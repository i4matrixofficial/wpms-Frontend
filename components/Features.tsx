const features = [
  {
    title: "Real-time Booking",
    desc: "Book any service instantly, 24/7.",
    highlight: true,
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Live Worker Tracking",
    desc: "See your pro on the map in real time.",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
        <path d="M12 21s-7-4.5-7-10a7 7 0 0 1 14 0c0 5.5-7 10-7 10Z" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="11" r="2.5" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "In-app Chat",
    desc: "Message workers before, during and after.",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
        <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Secure Payments",
    desc: "Cards, UPI and wallets — all encrypted.",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M3 10h18" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "Ratings & Reviews",
    desc: "Transparent feedback from real customers.",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
        <path d="m12 3 2.6 5.6 6.2.6-4.6 4.2 1.3 6.1L12 16.9 6.5 19.5l1.3-6.1L3.2 9.2l6.2-.6L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Complaint Management",
    desc: "24/7 support with fast resolution.",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Worker Verification",
    desc: "ID, background, skills — all verified.",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
        <path d="M9 12.5 11 15l4.5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 3l7 3v6c0 5-3 8-7 9-4-1-7-4-7-9V6l7-3Z" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "Earnings Dashboard",
    desc: "Track jobs, payouts and growth in one place.",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
        <path d="M4 20V10M12 20V4M20 20v-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section className="features" id="features">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow" style={{ justifyContent: "center" }}>Features</div>
          <h2>Everything you need, beautifully packaged.</h2>
          <p>A full toolkit for customers and workers — nothing bloated, nothing missing.</p>
        </div>

        <div className="feat-grid">
          {features.map((f) => (
            <div className={`feat-card ${f.highlight ? "on" : ""}`} key={f.title}>
              <div className="feat-icon">{f.icon}</div>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}