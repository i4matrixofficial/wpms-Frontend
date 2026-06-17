"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { authApi } from "../../../lib/api";

interface Form {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirm: string;
}
type FieldErr = Partial<Record<keyof Form, string>>;

// ─── Nuclear email sanitizer ──────────────────────────────────────────────────
// Whitelist approach: only keep characters valid in an email address.
// Handles ALL cases: markdown links, mailto:, nested brackets, etc.
function sanitizeEmail(raw: string): string {
  return raw
    .replace(/[^a-zA-Z0-9@._+\-]/g, "") // keep ONLY valid email chars
    .toLowerCase()
    .trim();
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function PassengerRegisterForm() {
  const router = useRouter();

  const [form, setForm]       = useState<Form>({ firstName: "", lastName: "", email: "", password: "", confirm: "" });
  const [errs, setErrs]       = useState<FieldErr>({});
  const [error, setError]     = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed]   = useState(false);
  const [showPw, setShowPw]   = useState(false);
  const [showCf, setShowCf]   = useState(false);

  // ── onChange ──────────────────────────────────────────────────────────────
  const set = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (e.target.name === "email") {
      value = sanitizeEmail(value);
    }
    setForm(p => ({ ...p, [e.target.name]: value }));
    setErrs(p => ({ ...p, [e.target.name]: undefined }));
    setError(null);
  };

  // ── onPaste for email — intercept BEFORE it hits the input ────────────────
  // This is the key fix: paste events bypass onChange, so we intercept here.
  const onEmailPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();                              // block the raw paste
    const pasted = e.clipboardData.getData("text"); // get plain text from clipboard
    const clean  = sanitizeEmail(pasted);            // strip markdown/mailto/brackets
    setForm(p => ({ ...p, email: clean }));
    setErrs(p => ({ ...p, email: undefined }));
    setError(null);
  };

  // ── Validation ────────────────────────────────────────────────────────────
  const validate = (): boolean => {
    const e: FieldErr = {};

    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim())  e.lastName  = "Required";

    const cleanEmail = sanitizeEmail(form.email);
    if (!cleanEmail) {
      e.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(cleanEmail)) {
      e.email = "Please enter a valid email address";
    }

    if (!form.password) {
      e.password = "Required";
    } else if (form.password.length < 8) {
      e.password = "Minimum 8 characters";
    }

    if (!form.confirm) {
      e.confirm = "Please confirm your password";
    } else if (form.password !== form.confirm) {
      e.confirm = "Passwords don't match";
    }

    setErrs(e);
    return Object.keys(e).length === 0;
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!validate()) return;
    if (!agreed) { setError("Please accept the Terms of Service."); return; }

    setLoading(true);
    setError(null);

    try {
      const cleanEmail = sanitizeEmail(form.email); // final safety pass

      const fd = new FormData();
      fd.append("firstName", form.firstName.trim());
      fd.append("lastName",  form.lastName.trim());
      fd.append("email",     cleanEmail);
      fd.append("password",  form.password);
      fd.append("role",      "Passenger");

      await authApi.register(fd);
      router.push("/login?registered=1");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Registration failed. Please try again.";
      if (msg.toLowerCase().includes("already")) {
        setErrs(p => ({ ...p, email: "This email is already registered" }));
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        .p2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        @media (max-width: 480px) { .p2 { grid-template-columns: 1fr; } }
        .pi { transition: border-color .2s; }
        .pi:focus { border-color: #e63946 !important; box-shadow: 0 0 0 3px rgba(230,57,70,.08); }
        .pi-e { border-color: #e63946 !important; background: #fff8f8 !important; }
        .psub { transition: all .2s; }
        .psub:hover:not(:disabled) { opacity: .9; transform: translateY(-1px); }
        .psub:disabled { opacity: .65; cursor: not-allowed; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin .8s linear infinite; }
      `}</style>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

        {/* Global error banner */}
        {error && (
          <div style={{ background: "#fff5f5", border: "1px solid #fdd", borderRadius: 9, padding: "10px 14px", fontSize: 12.5, color: "#c1121f" }}>
            ⚠️ {error}
          </div>
        )}

        {/* Name row */}
        <div className="p2">
          <F label="First Name" icon={<User size={12} color="#e63946" />} err={errs.firstName}>
            <input
              name="firstName"
              value={form.firstName}
              onChange={set}
              placeholder="John"
              autoComplete="given-name"
              className={`pi${errs.firstName ? " pi-e" : ""}`}
              style={inp}
            />
          </F>
          <F label="Last Name" icon={<User size={12} color="#e63946" />} err={errs.lastName}>
            <input
              name="lastName"
              value={form.lastName}
              onChange={set}
              placeholder="Silva"
              autoComplete="family-name"
              className={`pi${errs.lastName ? " pi-e" : ""}`}
              style={inp}
            />
          </F>
        </div>

        {/* Email — onPaste intercepts markdown before it reaches state */}
        <F label="Email Address" icon={<Mail size={12} color="#e63946" />} err={errs.email}>
          <input
            name="email"
            type="text"
            inputMode="email"
            value={form.email}
            onChange={set}
            onPaste={onEmailPaste}
            placeholder="john@example.com"
            autoComplete="email"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            className={`pi${errs.email ? " pi-e" : ""}`}
            style={inp}
          />
        </F>

        {/* Password row */}
        <div className="p2">
          <F label="Password" icon={<Lock size={12} color="#e63946" />} err={errs.password}>
            <div style={{ position: "relative" }}>
              <input
                name="password"
                type={showPw ? "text" : "password"}
                value={form.password}
                onChange={set}
                placeholder="Min. 8 chars"
                autoComplete="new-password"
                className={`pi${errs.password ? " pi-e" : ""}`}
                style={{ ...inp, paddingRight: 38 }}
              />
              <button type="button" style={eyeBtn} onClick={() => setShowPw(!showPw)}>
                {showPw ? <EyeOff size={13} /> : <Eye size={13} />}
              </button>
            </div>
          </F>
          <F label="Confirm Password" icon={<Lock size={12} color="#e63946" />} err={errs.confirm}>
            <div style={{ position: "relative" }}>
              <input
                name="confirm"
                type={showCf ? "text" : "password"}
                value={form.confirm}
                onChange={set}
                placeholder="Repeat"
                autoComplete="new-password"
                className={`pi${errs.confirm ? " pi-e" : ""}`}
                style={{ ...inp, paddingRight: 38 }}
              />
              <button type="button" style={eyeBtn} onClick={() => setShowCf(!showCf)}>
                {showCf ? <EyeOff size={13} /> : <Eye size={13} />}
              </button>
            </div>
          </F>
        </div>

        {/* Terms */}
        <label style={{ display: "flex", alignItems: "flex-start", gap: 8, cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={agreed}
            onChange={e => { setAgreed(e.target.checked); setError(null); }}
            style={{ marginTop: 2, accentColor: "#e63946", flexShrink: 0 }}
          />
          <span style={{ fontSize: 12, color: "#888", lineHeight: 1.5 }}>
            I agree to the{" "}
            <a href="/terms" style={{ color: "#e63946", fontWeight: 600 }}>Terms of Service</a>
            {" "}and{" "}
            <a href="/privacy" style={{ color: "#e63946", fontWeight: 600 }}>Privacy Policy</a>
          </span>
        </label>

        {/* Submit */}
        <button className="psub" style={subBtn} onClick={handleSubmit} disabled={loading}>
          {loading
            ? <><Loader2 size={14} className="spin" /> Creating account…</>
            : <>Create Passenger Account <ArrowRight size={14} /></>
          }
        </button>

      </div>
    </>
  );
}

// ─── Field wrapper ────────────────────────────────────────────────────────────
function F({ label, icon, err, children }: {
  label: string;
  icon: React.ReactNode;
  err?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 700, color: "#666", marginBottom: 5, letterSpacing: 0.6, textTransform: "uppercase" }}>
        {icon} {label}
      </label>
      {children}
      {err && <p style={{ fontSize: 11, color: "#e63946", marginTop: 4 }}>{err}</p>}
    </div>
  );
}

// ─── Shared styles ────────────────────────────────────────────────────────────
const inp: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 9,
  fontSize: 13,
  background: "#f8f9fa",
  border: "1.5px solid #eee",
  color: "#1a1a2e",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "'Segoe UI', sans-serif",
};

const eyeBtn: React.CSSProperties = {
  position: "absolute",
  right: 10,
  top: "50%",
  transform: "translateY(-50%)",
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "#bbb",
  display: "flex",
  alignItems: "center",
  padding: 0,
};

const subBtn: React.CSSProperties = {
  width: "100%",
  padding: "13px",
  background: "linear-gradient(135deg, #e63946, #c1121f)",
  border: "none",
  borderRadius: 10,
  color: "#fff",
  fontSize: 14,
  fontWeight: 700,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  boxShadow: "0 6px 20px rgba(230,57,70,.35)",
  marginTop: 2,
  fontFamily: "'Segoe UI', sans-serif",
};