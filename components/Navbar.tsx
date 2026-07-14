import Link from "next/link";

export default function Navbar() {
  return (
    <header>
      <nav>
        <Link href="/" className="brand">
          <span className="mark">F</span>
          <span className="gray">
            FIX<span className="tone">ORA</span>
          </span>
        </Link>

        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#how">How it Works</a></li>
          <li><a href="#customers">For Customers</a></li>
          <li><a href="#workers">For Workers</a></li>
          <li><a href="#download">Download App</a></li>
        </ul>

        <div className="nav-right">
          <button className="icon-btn" aria-label="Search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M21 21l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <a href="#download" className="btn btn-orange">
            Get Started
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </nav>
    </header>
  );
}