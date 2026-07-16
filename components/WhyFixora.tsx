const customerPoints = [
  "Fast booking in under 60 seconds",
  "Every worker background-verified",
  "Cards, UPI, wallets — all secure",
  "Real-time chat & support 24/7",
];

const workerPoints = [
  "Steady stream of nearby jobs",
  "Flexible hours, you set the schedule",
  "Higher earnings, transparent payouts",
  "Simple tools to manage everything",
];

export default function WhyFixora() {
  return (
    <section className="why" id="customers">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow" style={{ justifyContent: "center" }}>Why Fixora</div>
          <h2>A win for both sides of the door.</h2>
          <p>Take a tour through the moments that make Fixora feel effortless.</p>
        </div>

        <div className="why-grid">
          <div className="why-card customer">
            <div className="why-tag">For Customers</div>
            <h3>Life, made lighter.</h3>
            <ul>
              {customerPoints.map((point) => (
                <li key={point}>
                  <span className="check">✓</span> {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="why-card worker" id="workers">
            <div className="why-tag">For Workers</div>
            <h3>Work, made worth it.</h3>
            <ul>
              {workerPoints.map((point) => (
                <li key={point}>
                  <span className="check">✓</span> {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}