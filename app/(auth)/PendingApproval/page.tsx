"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

export default function PendingApprovalPage() {
  const { logout }   = useAuth();
  const searchParams = useSearchParams();

  const nameParam   = searchParams.get("name");
  const displayName = nameParam ? decodeURIComponent(nameParam) : "there";

  const [dots,    setDots]    = useState(0);
  const [visible, setVisible] = useState(false);
  const [orbs,    setOrbs]    = useState<{ x: number; y: number; size: number; delay: number; dur: number; blue: boolean }[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => { setTimeout(() => setVisible(true), 80); }, []);

  useEffect(() => {
    const id = setInterval(() => setDots(d => (d + 1) % 4), 500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setOrbs(
      Array.from({ length: 8 }, (_, i) => ({
        x:     5 + Math.random() * 90,
        y:     5 + Math.random() * 90,
        size:  80 + Math.random() * 140,
        delay: i * 0.7,
        dur:   7 + Math.random() * 6,
        blue:  i % 2 === 0,
      }))
    );
  }, []);

  // Canvas particle network
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const W = canvas.width, H = canvas.height;

    const pts = Array.from({ length: 60 }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - .5) * .3,
      vy: (Math.random() - .5) * .3,
      r:  .8 + Math.random() * 1.5,
      green: Math.random() > .6,
    }));

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.green ? "rgba(52,211,153,.5)" : "rgba(56,189,248,.5)";
        ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(56,189,248,${.14 * (1 - d / 120)})`;
            ctx.lineWidth = .5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(animId);
  }, []);

  const dotsStr = ".".repeat(dots);

  const steps = [
    { label: "Application submitted",            state: "done"   },
    { label: "Documents uploaded",               state: "done"   },
    { label: `Admin review in progress${dotsStr}`, state: "active" },
    { label: "Account activated",                state: "idle"   },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #e0f2fe; }

        .pa-root {
          min-height: 100vh;
          background: linear-gradient(150deg, #dbeafe 0%, #d1fae5 40%, #e0f7fa 75%, #ecfeff 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Outfit', sans-serif;
          position: relative;
          overflow: hidden;
          padding: 24px;
        }

        .pa-canvas {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .pa-orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(55px);
          pointer-events: none;
          z-index: 0;
          animation: float-orb var(--dur) ease-in-out var(--delay) infinite alternate;
        }
        @keyframes float-orb {
          from { transform: translateY(0)    scale(1);    }
          to   { transform: translateY(-28px) scale(1.1); }
        }

        /* ── Card ─────────────────────────────────────────────── */
        .pa-card {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 510px;
          background: rgba(255,255,255,.75);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1.5px solid rgba(56,189,248,.28);
          border-radius: 28px;
          padding: 52px 46px 44px;
          text-align: center;
          box-shadow:
            0 0 0 1px rgba(255,255,255,.9) inset,
            0 4px 24px rgba(14,165,233,.1),
            0 24px 64px rgba(14,165,233,.09),
            0 2px 4px rgba(0,0,0,.04);
          opacity: 0;
          transform: translateY(32px) scale(.96);
          transition: opacity .65s cubic-bezier(.22,1,.36,1),
                      transform .65s cubic-bezier(.22,1,.36,1);
        }
        .pa-card.visible {
          opacity: 1;
          transform: none;
        }

        /* Rainbow top stripe */
        .pa-topbar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          border-radius: 28px 28px 0 0;
          background: linear-gradient(90deg,
            #38bdf8 0%, #34d399 33%, #38bdf8 66%, #34d399 100%);
          background-size: 300% 100%;
          animation: stripe-move 3s linear infinite;
        }
        @keyframes stripe-move {
          from { background-position: 0%   0; }
          to   { background-position: 300% 0; }
        }

        /* Decorative corner accents */
        .pa-corner {
          position: absolute;
          width: 18px; height: 18px;
          border-color: rgba(56,189,248,.4);
          border-style: solid;
        }
        .pa-corner.tl { top:14px;    left:14px;  border-width:2px 0 0 2px; }
        .pa-corner.tr { top:14px;    right:14px; border-width:2px 2px 0 0; }
        .pa-corner.bl { bottom:14px; left:14px;  border-width:0 0 2px 2px; }
        .pa-corner.br { bottom:14px; right:14px; border-width:0 2px 2px 0; }

        /* ── Icon ─────────────────────────────────────────────── */
        .pa-icon-wrap {
          position: relative;
          width: 100px; height: 100px;
          margin: 0 auto 28px;
        }
        .pa-ripple {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid rgba(56,189,248,.5);
          opacity: 0;
          animation: ripple 2.6s ease-out infinite;
        }
        .pa-ripple:nth-child(2) { animation-delay: .85s; border-color: rgba(52,211,153,.5); }
        .pa-ripple:nth-child(3) { animation-delay: 1.7s; }
        @keyframes ripple {
          0%   { transform: scale(.82); opacity: .7; }
          100% { transform: scale(1.75); opacity: 0; }
        }
        .pa-icon-circle {
          position: absolute;
          inset: 14px;
          border-radius: 50%;
          background: linear-gradient(135deg, #38bdf8 0%, #34d399 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          box-shadow: 0 6px 22px rgba(14,165,233,.3), 0 2px 6px rgba(52,211,153,.2);
          animation: glow-pulse 3s ease-in-out infinite;
        }
        @keyframes glow-pulse {
          0%,100% { box-shadow: 0 6px 22px rgba(14,165,233,.3), 0 2px 6px rgba(52,211,153,.2); }
          50%      { box-shadow: 0 10px 32px rgba(52,211,153,.4), 0 4px 12px rgba(14,165,233,.3); }
        }

        /* ── Badge ────────────────────────────────────────────── */
        .pa-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg,
            rgba(56,189,248,.14) 0%,
            rgba(52,211,153,.14) 100%);
          border: 1.5px solid rgba(56,189,248,.3);
          border-radius: 100px;
          padding: 6px 18px;
          font-size: 10px;
          font-family: 'JetBrains Mono', monospace;
          color: #0369a1;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 20px;
          font-weight: 600;
        }
        .pa-badge-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 0 0 rgba(16,185,129,.5);
          animation: ping 1.5s ease-in-out infinite;
        }
        @keyframes ping {
          0%   { box-shadow: 0 0 0 0   rgba(16,185,129,.6); }
          70%  { box-shadow: 0 0 0 6px rgba(16,185,129,0);  }
          100% { box-shadow: 0 0 0 0   rgba(16,185,129,0);  }
        }

        /* ── Title ────────────────────────────────────────────── */
        .pa-title {
          font-size: 27px;
          font-weight: 800;
          color: #0c4a6e;
          line-height: 1.25;
          margin-bottom: 12px;
          letter-spacing: -.6px;
        }
        .pa-title .name { color: #0ea5e9; }
        .pa-title .sub  {
          display: block;
          background: linear-gradient(90deg, #0ea5e9, #10b981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .pa-desc {
          font-size: 13px;
          color: #7db9d4;
          line-height: 1.8;
          margin-bottom: 30px;
          font-family: 'JetBrains Mono', monospace;
        }

        /* ── Steps ────────────────────────────────────────────── */
        .pa-steps {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 26px;
          text-align: left;
        }
        .pa-step {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 12px;
          border: 1px solid rgba(56,189,248,.15);
          background: rgba(240,249,255,.55);
          font-size: 12.5px;
          color: #94bdd4;
          font-family: 'JetBrains Mono', monospace;
          transition: all .3s;
        }
        .pa-step.done {
          border-color: rgba(52,211,153,.28);
          background: rgba(236,253,245,.65);
          color: #059669;
        }
        .pa-step.active {
          border-color: rgba(56,189,248,.4);
          background: rgba(224,242,254,.7);
          color: #0284c7;
          box-shadow: 0 2px 14px rgba(14,165,233,.1);
        }
        .pa-step-icon {
          width: 26px; height: 26px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          flex-shrink: 0;
        }
        .pa-step.done   .pa-step-icon {
          background: linear-gradient(135deg,#34d399,#10b981);
          color:#fff;
          box-shadow:0 2px 8px rgba(52,211,153,.4);
        }
        .pa-step.active .pa-step-icon {
          background: linear-gradient(135deg,#38bdf8,#0ea5e9);
          color:#fff;
          box-shadow:0 2px 8px rgba(56,189,248,.4);
          animation: ping-dot 1.5s ease-in-out infinite;
        }
        .pa-step.idle   .pa-step-icon {
          background: rgba(56,189,248,.1);
          color:#b0d4e8;
          border:1.5px solid rgba(56,189,248,.2);
        }
        @keyframes ping-dot {
          0%,100% { box-shadow:0 2px 8px rgba(56,189,248,.4); }
          50%      { box-shadow:0 4px 18px rgba(56,189,248,.7); }
        }

        /* ── ETA ──────────────────────────────────────────────── */
        .pa-eta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-radius: 14px;
          background: linear-gradient(135deg,
            rgba(219,234,254,.7) 0%,
            rgba(209,250,229,.7) 100%);
          border: 1px solid rgba(56,189,248,.22);
          margin-bottom: 18px;
          box-shadow: 0 2px 10px rgba(14,165,233,.07);
        }
        .pa-eta-label {
          font-size: 9.5px;
          font-family: 'JetBrains Mono', monospace;
          color: #7db9d4;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        .pa-eta-value {
          font-size: 15px;
          font-family: 'JetBrains Mono', monospace;
          color: #0284c7;
          font-weight: 600;
        }
        .pa-eta-icon {
          font-size: 34px;
          animation: tick 2s ease-in-out infinite;
        }
        @keyframes tick {
          0%,100% { transform: rotate(-6deg); }
          50%      { transform: rotate( 6deg); }
        }

        /* Progress bar */
        .pa-bar-wrap {
          height: 5px;
          background: rgba(56,189,248,.1);
          border-radius: 10px;
          margin-bottom: 18px;
          overflow: hidden;
        }
        .pa-bar {
          height: 100%;
          width: 65%;
          border-radius: 10px;
          background: linear-gradient(90deg, #38bdf8, #34d399, #38bdf8);
          background-size: 200% 100%;
          animation: bar-move 2s linear infinite;
        }
        @keyframes bar-move {
          from { background-position: 0%   0; }
          to   { background-position: 200% 0; }
        }

        .pa-processing {
          font-size: 10px;
          font-family: 'JetBrains Mono', monospace;
          color: #a8d4e8;
          margin-bottom: 22px;
          letter-spacing: 1.4px;
          min-height: 16px;
        }

        /* Logout */
        .pa-logout {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,.65);
          border: 1.5px solid rgba(56,189,248,.3);
          border-radius: 10px;
          padding: 11px 26px;
          color: #0284c7;
          font-size: 13px;
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          cursor: pointer;
          transition: all .25s;
          letter-spacing: .1px;
        }
        .pa-logout:hover {
          background: rgba(56,189,248,.1);
          border-color: #38bdf8;
          color: #0369a1;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(14,165,233,.18);
        }

        /* Stagger entrance */
        .pa-card.visible .pa-icon-wrap  { animation: rise .55s ease .08s both; }
        .pa-card.visible .pa-badge      { animation: rise .55s ease .16s both; }
        .pa-card.visible .pa-title      { animation: rise .55s ease .24s both; }
        .pa-card.visible .pa-desc       { animation: rise .55s ease .32s both; }
        .pa-card.visible .pa-steps      { animation: rise .55s ease .40s both; }
        .pa-card.visible .pa-eta        { animation: rise .55s ease .48s both; }
        .pa-card.visible .pa-bar-wrap   { animation: rise .55s ease .54s both; }
        .pa-card.visible .pa-processing { animation: rise .55s ease .58s both; }
        .pa-card.visible .pa-logout     { animation: rise .55s ease .64s both; }

        @keyframes rise {
          from { opacity:0; transform:translateY(18px); }
          to   { opacity:1; transform:none; }
        }
      `}</style>

      <div className="pa-root">
        <canvas ref={canvasRef} className="pa-canvas" />

        {/* Floating colour orbs */}
        {orbs.map((o, i) => (
          <div key={i} className="pa-orb" style={{
            left:   `${o.x}%`,
            top:    `${o.y}%`,
            width:  `${o.size}px`,
            height: `${o.size}px`,
            background: o.blue
              ? `rgba(56,189,248,${0.08 + (i % 3) * 0.02})`
              : `rgba(52,211,153,${0.07 + (i % 3) * 0.02})`,
            ["--dur"   as any]: `${o.dur}s`,
            ["--delay" as any]: `${o.delay}s`,
          }} />
        ))}

        <div className={`pa-card${visible ? " visible" : ""}`}>
          <div className="pa-topbar" />
          <div className="pa-corner tl" />
          <div className="pa-corner tr" />
          <div className="pa-corner bl" />
          <div className="pa-corner br" />

          {/* Ripple icon */}
          <div className="pa-icon-wrap">
            <div className="pa-ripple" />
            <div className="pa-ripple" />
            <div className="pa-ripple" />
            <div className="pa-icon-circle">⏳</div>
          </div>

          {/* Badge */}
          <div className="pa-badge">
            <div className="pa-badge-dot" />
            Under Review
          </div>

          {/* Title with gradient name */}
          <h1 className="pa-title">
            Hey <span className="name">{displayName}</span>,
            <span className="sub">you're in the queue!</span>
          </h1>

          <p className="pa-desc">
            Your guide application has been received.<br />
            Our team is verifying your documents.
          </p>

          {/* Steps */}
          <div className="pa-steps">
            {steps.map((s, i) => (
              <div key={i} className={`pa-step ${s.state}`}>
                <div className="pa-step-icon">
                  {s.state === "done"   ? "✓" :
                   s.state === "active" ? "◉" :
                   i + 1}
                </div>
                {s.label}
              </div>
            ))}
          </div>

          {/* ETA */}
          <div className="pa-eta">
            <div>
              <div className="pa-eta-label">Estimated wait</div>
              <div className="pa-eta-value">Up to 24 hours</div>
            </div>
            <div className="pa-eta-icon">🕐</div>
          </div>

          {/* Progress bar */}
          <div className="pa-bar-wrap">
            <div className="pa-bar" />
          </div>

          <div className="pa-processing">SYSTEM PROCESSING{dotsStr}</div>

          <button className="pa-logout" onClick={logout}>
            ← Sign out &amp; return to login
          </button>
        </div>
      </div>
    </>
  );
}