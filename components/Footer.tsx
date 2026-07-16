import Link from "next/link";

const footerColumns = [
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Blog"],
  },
  {
    title: "Product",
    links: ["Features", "Services", "Download", "Changelog"],
  },
  {
    title: "Support",
    links: ["Help Center", "Contact", "Trust & Safety", "Status"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Cookies", "Licenses"],
  },
];

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <Link href="/" className="brand">
              <span className="mark">F</span>
              <span>FIX<span className="tone">ORA</span></span>
            </Link>
            <p>
              The worker hiring marketplace for modern homes. Verified pros,
              instant booking, secure payments.
            </p>
            <div className="foot-social">
              <a href="#" aria-label="Instagram">◎</a>
              <a href="#" aria-label="Twitter">✕</a>
              <a href="#" aria-label="LinkedIn">in</a>
            </div>
          </div>

          {footerColumns.map((col) => (
            <div className="foot-col" key={col.title}>
              <h5>{col.title}</h5>
              <ul>
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="foot-bottom">
          <span>© 2026 Fixora Technologies. All rights reserved.</span>
          <span>Made for people who get things done.</span>
        </div>
      </div>
    </footer>
  );
}