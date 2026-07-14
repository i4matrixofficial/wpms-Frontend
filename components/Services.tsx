const services = [
  {
    title: "Plumbing",
    color: "var(--blue)",
    highlight: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
        <path d="M12 2s6 7 6 11.5A6 6 0 0 1 6 13.5C6 9 12 2 12 2Z" />
      </svg>
    ),
  },
  {
    title: "Electrical",
    color: "var(--gold)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
        <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
      </svg>
    ),
  },
  {
    title: "Cleaning",
    color: "var(--teal)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
        <path d="M4 15c2-1 4-1 6 0s4 1 6 0 4-1 4-1M4 19c2-1 4-1 6 0s4 1 6 0 4-1 4-1" />
        <path d="M8 11V6a4 4 0 0 1 8 0v5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Painting",
    color: "var(--pink)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
        <path d="m18 3 3 3-9.5 9.5-4 1 1-4L18 3Z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Carpentry",
    color: "var(--wine)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
        <path d="M6 6 2 2M22 22l-6.5-6.5M14.5 3.5 3.5 14.5a2 2 0 0 0 0 3l3 3a2 2 0 0 0 3 0L20.5 9.5a2 2 0 0 0 0-3l-3-3a2 2 0 0 0-3 0Z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "AC Repair",
    color: "var(--purple)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
        <path d="M17.5 9.5A5.5 5.5 0 0 0 12 4a5.5 5.5 0 0 0-4.9 3M6.5 14.5A5.5 5.5 0 0 0 12 20a5.5 5.5 0 0 0 4.9-3" strokeLinecap="round" />
        <path d="M4 8v4h4M20 16v-4h-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Gardening",
    color: "var(--green)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
        <path d="M12 22c5-3 8-6 8-11a8 8 0 0 0-16 0c0 5 3 8 8 11Z" strokeLinejoin="round" />
        <path d="M12 12v6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Tutoring",
    color: "var(--purple)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13Z" strokeLinejoin="round" />
        <path d="M9 8h7M9 11h5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow" style={{ justifyContent: "center" }}>Services</div>
          <h2>Any job. Any time. Any expert.</h2>
          <p>From a leaking tap to a full-home makeover — Fixora has the right pro.</p>
        </div>

        <div className="svc-grid">
          {services.map((s) => (
            <div
              className="svc-card"
              key={s.title}
              style={s.highlight ? { borderColor: "var(--orange)" } : undefined}
            >
              <div className="svc-icon" style={{ background: s.color }}>
                {s.icon}
              </div>
              <h4>{s.title}</h4>
              <span>Book Now →</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}