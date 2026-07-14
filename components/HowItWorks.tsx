"use client";

import { useState } from "react";

const customerSteps = [
  { no: "01", title: "Choose a Service", desc: "Browse categories or search for exactly what you need." },
  { no: "02", title: "Book a Worker", desc: "Pick a verified pro, schedule a time, confirm in seconds." },
  { no: "03", title: "Get It Done", desc: "Track them live, chat, pay securely — all in one app." },
];

const workerSteps = [
  { no: "01", title: "Create Your Profile", desc: "Add your skills, verify your ID, showcase your work." },
  { no: "02", title: "Get Bookings", desc: "Receive nearby job requests and accept the ones you want." },
  { no: "03", title: "Earn Money", desc: "Complete jobs, get 5-star reviews, cash out instantly." },
];

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<"customers" | "workers">("customers");
  const steps = activeTab === "customers" ? customerSteps : workerSteps;

  return (
    <section className="how" id="how">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow" style={{ justifyContent: "center" }}>How it Works</div>
          <h2>Simple for everyone. Powerful for both sides.</h2>
          <p>Whether you're hiring or hustling, Fixora makes it effortless.</p>
        </div>

        <div className="tab-toggle">
          <button
            className={`tab-btn ${activeTab === "customers" ? "active" : ""}`}
            onClick={() => setActiveTab("customers")}
          >
            <span className="num">1</span> For Customers
          </button>
          <button
            className={`tab-btn ${activeTab === "workers" ? "active" : ""}`}
            onClick={() => setActiveTab("workers")}
          >
            <span className="num">2</span> For Workers
          </button>
        </div>

        <div className="tab-panel active">
          <div className="step-grid">
            {steps.map((step) => (
              <div className="step-card" key={step.title}>
                <div className="step-no">{step.no}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}