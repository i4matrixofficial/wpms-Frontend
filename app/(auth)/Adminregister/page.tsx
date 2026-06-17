"use client";

import { useState } from "react";
import {
  Eye, EyeOff, Shield, Crown,
  Lock, Mail, User, Key, ChevronRight, Loader2,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type RoleId = "SuperAdmin" | "Admin";

interface RoleConfig {
  id: RoleId;
  label: string;
  icon: React.ElementType;
  desc: string;
  color: string;
  glow: string;
  bg: string;
  border: string;
}

interface FormState {
  username: string;
  email: string;
  password: string;
  setupKey: string;
}

// ─── Role definitions ─────────────────────────────────────────────────────────
const ROLES: RoleConfig[] = [
  {
    id: "SuperAdmin",
    label: "Super Admin",
    icon: Crown,
    desc: "Full system control. Manages admins, guides, and all platform settings.",
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.3)",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.25)",
  },
  {
    id: "Admin",
    label: "Admin",
    icon: Shield,
    desc: "Manages passengers, guides approval, and platform moderation.",
    color: "#6366F1",
    glow: "rgba(99,102,241,0.3)",
    bg: "rgba(99,102,241,0.08)",
    border: "rgba(99,102,241,0.25)",
  },
];

// ─── Floating particles background ───────────────────────────────────────────
interface Dot {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  dur: number;
}

const DOTS: Dot[] = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  delay: Math.random() * 4,
  dur: 3 + Math.random() * 4,
}));

function Particles() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      {DOTS.map((d) => (
        <div
          key={d.id}
          style={{
            position: "absolute",
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            animation: `float ${d.dur}s ease-in-out ${d.delay}s infinite`,
          }}
        />
      ))}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.03 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function AdminRegisterPage() {
  const [role, setRole] = useState<RoleId>("Admin");
  const [form, setForm] = useState<FormState>({ username: "", email: "", password: "", setupKey: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const selected = ROLES.find((r) => r.id === role) as RoleConfig;

  const set = (k: keyof FormState, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    setError(null);
  };

  const passwordStrength = Math.min(4, Math.floor(form.password.length / 3));
  const strengthColors = ["#EF4444", "#F59E0B", "#6366F1", "#10B981"];

  const handleSubmit = async () => {
    if (!form.username.trim())              return setError("Username is required.");
    if (!form.email.trim())                 return setError("Email is required.");
    if (form.password.length < 8)          return setError("Password must be at least 8 characters.");
    if (!form.setupKey.trim())             return setError("Setup key is required.");

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:4001/api/setup-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          setupKey: form.setupKey,
          username: form.username,
          email:    form.email,
          password: form.password,
          role,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Registration failed");
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const focusClass = (field: string) =>
    focused === field
      ? role === "SuperAdmin"
        ? "focused-amber"
        : "focused-indigo"
      : "";

  // ── Success screen ──────────────────────────────────────────────────────────
  if (success) {
    return (
      <div style={s.root}>
        <style>{css}</style>
        <Particles />
        <div style={s.successCard}>
          <div style={{ fontSize: 56, marginBottom: 16, color: selected.color }}>✦</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
            {selected.label} Created
          </h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", marginBottom: 32, lineHeight: 1.7 }}>
            <strong style={{ color: "#fff" }}>{form.email}</strong> now has {selected.label} access.<br />
            They can log in immediately.
          </p>
          <button
            style={{ ...s.btn, background: selected.color, boxShadow: `0 8px 32px ${selected.glow}` }}
            onClick={() => { setSuccess(false); setForm({ username: "", email: "", password: "", setupKey: "" }); }}
          >
            Create Another →
          </button>
        </div>
      </div>
    );
  }

  // ── Main form ───────────────────────────────────────────────────────────────
  return (
    <div style={s.root}>
      <style>{css}</style>
      <Particles />

      {/* ── Left decorative panel ── */}
      <div style={s.leftPanel}>
        <div style={s.leftContent}>
          {/* Logo */}
          <div style={{ marginBottom: 52 }}>
            <div style={s.logo}><span style={{ fontSize: 20 }}>T</span></div>
            <div style={s.logoText}>TourGo</div>
          </div>

          {/* Headline */}
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: 20 }}>
            System<br />
            <span style={{ color: selected.color, transition: "color 0.3s" }}>Authority</span><br />
            Access
          </div>

          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.9, marginBottom: 52, maxWidth: 260 }}>
            Restricted registration portal for platform administrators and super administrators only.
          </p>

          {/* Role list */}
          {ROLES.map((r) => (
            <div
              key={r.id}
              style={{
                display: "flex", alignItems: "center", gap: 12, marginBottom: 18,
                opacity: role === r.id ? 1 : 0.3,
                transition: "opacity 0.3s",
              }}
            >
              <div style={{ width: 38, height: 38, borderRadius: 11, background: `${r.color}22`, border: `1px solid ${r.color}44`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <r.icon size={16} style={{ color: r.color }} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{r.label}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{r.desc.slice(0, 42)}…</div>
              </div>
              {role === r.id && (
                <div style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: r.color, boxShadow: `0 0 8px ${r.color}` }} />
              )}
            </div>
          ))}

          <div style={{ marginTop: "auto", paddingTop: 52, fontSize: 11, color: "rgba(255,255,255,0.15)", lineHeight: 2 }}>
            ✦ Authorized Personnel Only<br />
            ✦ All actions are logged and audited<br />
            ✦ TourGo Platform v2.0
          </div>
        </div>

        {/* Decorative orb */}
        <div style={{
          position: "absolute", bottom: -80, left: -80,
          width: 300, height: 300, borderRadius: "50%",
          background: `radial-gradient(circle, ${selected.color}22 0%, transparent 70%)`,
          transition: "background 0.4s", pointerEvents: "none",
        }} />
      </div>

      {/* ── Right form panel ── */}
      <div style={s.rightPanel}>
        <div style={s.card}>

          {/* Header */}
          <div style={{ marginBottom: 32, textAlign: "center" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: `${selected.color}18`, border: `1px solid ${selected.color}33`,
              borderRadius: 40, padding: "6px 16px", marginBottom: 20,
              transition: "all 0.3s",
            }}>
              <selected.icon size={13} style={{ color: selected.color }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: selected.color, letterSpacing: 1 }}>
                ADMIN PORTAL
              </span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: "#fff", marginBottom: 6 }}>
              Create {selected.label}
            </h1>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
              Requires a valid system setup key to proceed
            </p>
          </div>

          {/* Role toggle */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 28 }}>
            {ROLES.map((r) => (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                style={{
                  cursor: "pointer", borderRadius: 14, padding: 14,
                  border: `1px solid ${role === r.id ? r.border : "rgba(255,255,255,0.06)"}`,
                  background: role === r.id ? r.bg : "rgba(255,255,255,0.02)",
                  boxShadow: role === r.id ? `0 0 20px ${r.glow}` : "none",
                  textAlign: "left", transition: "all 0.25s", fontFamily: "'DM Sans', sans-serif",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                  <r.icon size={14} style={{ color: role === r.id ? r.color : "rgba(255,255,255,0.3)" }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: role === r.id ? "#fff" : "rgba(255,255,255,0.4)" }}>
                    {r.label}
                  </span>
                  {role === r.id && (
                    <div style={{ marginLeft: "auto", width: 5, height: 5, borderRadius: "50%", background: r.color }} />
                  )}
                </div>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", lineHeight: 1.5 }}>
                  {r.desc.slice(0, 48)}…
                </p>
              </button>
            ))}
          </div>

          {/* Error */}
          {error && (
            <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#FCA5A5", marginBottom: 20, display: "flex", gap: 8 }}>
              <span>⚠</span> {error}
            </div>
          )}

          {/* Form fields */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            {/* Username */}
            <div>
              <label style={s.label}>Username</label>
              <div style={{ position: "relative" }}>
                <User size={15} style={s.icon} />
                <input
                  className={`field-inp ${focusClass("username")}`}
                  placeholder="Enter username"
                  value={form.username}
                  autoComplete="username"
                  onChange={(e) => set("username", e.target.value)}
                  onFocus={() => setFocused("username")}
                  onBlur={() => setFocused(null)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label style={s.label}>Email Address</label>
              <div style={{ position: "relative" }}>
                <Mail size={15} style={s.icon} />
                <input
                  className={`field-inp ${focusClass("email")}`}
                  type="email"
                  placeholder="admin@tourgo.com"
                  value={form.email}
                  autoComplete="email"
                  onChange={(e) => set("email", e.target.value)}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={s.label}>Password</label>
              <div style={{ position: "relative" }}>
                <Lock size={15} style={s.icon} />
                <input
                  className={`field-inp ${focusClass("password")}`}
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={form.password}
                  autoComplete="new-password"
                  onChange={(e) => set("password", e.target.value)}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  style={{ paddingRight: 44 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={s.eyeBtn}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {form.password && (
                <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1, height: 3, borderRadius: 4,
                        background: i <= passwordStrength ? strengthColors[passwordStrength - 1] : "rgba(255,255,255,0.08)",
                        transition: "background 0.3s",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Setup Key */}
            <div>
              <label style={s.label}>System Setup Key</label>
              <div style={{ position: "relative" }}>
                <Key size={15} style={s.icon} />
                <input
                  className={`field-inp ${focusClass("key")}`}
                  type={showKey ? "text" : "password"}
                  placeholder="Enter ADMIN_SETUP_KEY from .env"
                  value={form.setupKey}
                  autoComplete="off"
                  onChange={(e) => set("setupKey", e.target.value)}
                  onFocus={() => setFocused("key")}
                  onBlur={() => setFocused(null)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  style={{ paddingRight: 44, fontFamily: "'DM Mono', monospace", fontSize: 13 }}
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  style={s.eyeBtn}
                >
                  {showKey ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.18)", marginTop: 6, fontFamily: "'DM Mono', monospace" }}>
                Found in backend .env → ADMIN_SETUP_KEY
              </p>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                ...s.btn, marginTop: 8,
                background: `linear-gradient(135deg, ${selected.color}, ${selected.color}bb)`,
                boxShadow: `0 8px 32px ${selected.glow}`,
              }}
            >
              {loading ? (
                <><Loader2 size={16} className="spin" /> Creating {selected.label}…</>
              ) : (
                <>
                  {role === "SuperAdmin" ? <Crown size={15} /> : <Shield size={15} />}
                  Create {selected.label}
                  <ChevronRight size={15} />
                </>
              )}
            </button>
          </div>

          {/* Footer */}
          <p style={{ textAlign: "center", marginTop: 24, fontSize: 12, color: "rgba(255,255,255,0.18)" }}>
            Already have an account?{" "}
            <a href="/login" style={{ color: selected.color, textDecoration: "none", fontWeight: 500 }}>
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const s: Record<string, React.CSSProperties> = {
  root: {
    display: "flex", minHeight: "100vh",
    background: "#080810",
    fontFamily: "'DM Sans', sans-serif",
    position: "relative", overflow: "hidden",
  },
  leftPanel: {
    width: 380, flexShrink: 0,
    background: "linear-gradient(160deg, #0f0f1a 0%, #080810 100%)",
    borderRight: "1px solid rgba(255,255,255,0.05)",
    position: "relative", overflow: "hidden",
    padding: "48px 40px",
    flexDirection: "column",
    display: "none",
  },
  leftContent: {
    position: "relative", zIndex: 1,
    display: "flex", flexDirection: "column", height: "100%",
  },
  logo: {
    width: 42, height: 42, borderRadius: 12,
    background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 800, color: "#fff", marginBottom: 8,
    boxShadow: "0 8px 24px rgba(99,102,241,0.4)",
  },
  logoText: { fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: -0.5 },
  rightPanel: {
    flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
    padding: "32px 20px", position: "relative", zIndex: 1,
  },
  card: {
    width: "100%", maxWidth: 460,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 24, padding: "40px 36px",
    backdropFilter: "blur(20px)",
    boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
  },
  label: {
    display: "block", fontSize: 11, fontWeight: 600,
    color: "rgba(255,255,255,0.35)", letterSpacing: 0.8,
    textTransform: "uppercase", marginBottom: 8,
  },
  icon: {
    position: "absolute", left: 14, top: "50%",
    transform: "translateY(-50%)", color: "rgba(255,255,255,0.2)",
    pointerEvents: "none",
  },
  eyeBtn: {
    position: "absolute", right: 14, top: "50%",
    transform: "translateY(-50%)", background: "none",
    border: "none", cursor: "pointer",
    color: "rgba(255,255,255,0.3)", display: "flex",
    alignItems: "center", padding: 0,
  },
  btn: {
    width: "100%", padding: "15px", border: "none",
    borderRadius: 12, fontSize: 15, fontWeight: 600,
    cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
    display: "flex", alignItems: "center", justifyContent: "center",
    gap: 8, transition: "all 0.2s", letterSpacing: 0.3, color: "#fff",
  },
  successCard: {
    position: "relative", zIndex: 1, margin: "auto",
    textAlign: "center",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 24, padding: "56px 48px",
    backdropFilter: "blur(20px)",
  },
};

// ─── Global CSS ───────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }

  @media (min-width: 1024px) {
    div[data-left-panel] { display: flex !important; }
  }

  .field-inp {
    width: 100%;
    padding: 14px 16px 14px 44px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    color: #fff;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    outline: none;
    transition: all 0.2s;
  }
  .field-inp::placeholder { color: rgba(255,255,255,0.2); }
  .field-inp:focus {
    border-color: rgba(255,255,255,0.2);
    background: rgba(255,255,255,0.07);
  }
  .field-inp.focused-amber {
    border-color: rgba(245,158,11,0.5) !important;
    box-shadow: 0 0 0 3px rgba(245,158,11,0.1);
  }
  .field-inp.focused-indigo {
    border-color: rgba(99,102,241,0.5) !important;
    box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-12px); }
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .spin { animation: spin 0.8s linear infinite; }
`;