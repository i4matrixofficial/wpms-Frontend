export default function Testimonials() {
  return (
    <section className="testi">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow" style={{ justifyContent: "center" }}>Testimonials</div>
          <h2>Loved by customers and pros alike.</h2>
        </div>

        <div className="testi-card">
          <div className="testi-stars">★★★★★</div>
          <p className="testi-quote">
            &ldquo;Booked an electrician at 9pm on a Sunday. He arrived in 40
            minutes, fixed everything, and I paid inside the app. Fixora just
            works.&rdquo;
          </p>
          <div className="testi-person">
            <img src="https://randomuser.me/api/portraits/men/54.jpg" alt="Shihan Mihiranga" />
            <div>
              <strong>Shihan Mihiranga</strong>
              <small>Colombo, Sri Lanka</small>
            </div>
          </div>
        </div>

        <div className="testi-dots">
          <span className="active"></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </section>
  );
}