"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

export default function LoginPage() {
  const { login, googleLogin, facebookLogin } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check for saved email
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async () => {
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      
      // Save remember me preference
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Login failed";

      if (msg.toLowerCase().includes("pending")) {
        const nameFromEmail = email
          .split("@")[0]
          .replace(/[._-]/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());
        router.push(`/PendingApproval?name=${encodeURIComponent(nameFromEmail)}`);
        return;
      } else if (
        msg.toLowerCase().includes("invalid") ||
        msg.toLowerCase().includes("credentials")
      ) {
        setError("Incorrect email or password.");
      } else if (msg.toLowerCase().includes("not active")) {
        setError("Your account is inactive. Please contact support.");
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "facebook") => {
    setSocialLoading(provider);
    setError(null);
    try {
      if (provider === "google") {
        await googleLogin();
      } else {
        await facebookLogin();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : `${provider} login failed`;
      setError(msg);
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        .lp-root{display:flex;min-height:100vh;background:#fff;font-family:'Segoe UI',sans-serif}
        .lp-left{display:flex;flex-direction:column;justify-content:center;width:100%;max-width:520px;padding:48px 56px;overflow-y:auto;min-height:100vh}
        .lp-right{display:none;flex:1;padding:16px;position:sticky;top:0;height:100vh}
        @media(min-width:1024px){.lp-right{display:block}}
        @media(max-width:1023px){.lp-left{max-width:100%;padding:40px 48px}}
        @media(max-width:600px){.lp-left{padding:36px 20px;justify-content:flex-start;padding-top:48px}}
        .lp-socials{display:flex;gap:10px;margin-top:22px}
        .lp-social-btn{flex:1;display:flex;align-items:center;justify-content:center;padding:10px 0;border:1.5px solid #eee;border-radius:10px;background:#fff;cursor:pointer;transition:background .18s,border-color .18s;gap:6px;font-size:12px;font-weight:600;color:#444;font-family:'Segoe UI',sans-serif}
        .lp-social-btn:hover:not(:disabled){background:#f8f9fa;border-color:#ddd}
        .lp-social-btn:disabled{opacity:0.6;cursor:not-allowed}
        .lp-social-btn img{width:17px;height:17px;flex-shrink:0}
        .lp-social-label{display:none}
        @media(min-width:400px){.lp-social-label{display:inline}}
        .lp-divider{display:flex;align-items:center;gap:12px;margin:22px 0}
        .lp-divider::before,.lp-divider::after{content:'';flex:1;height:1px;background:#eee}
        .lp-divider span{font-size:11px;color:#bbb;white-space:nowrap}
        .lp-wrap{position:relative;margin-top:6px}
        .lp-icon{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:#ccc;display:flex;align-items:center;pointer-events:none}
        .lp-inp{width:100%;padding:11px 12px 11px 38px;border-radius:10px;border:1.5px solid #eee;background:#f8f9fa;font-size:13px;color:#1a1a2e;outline:none;font-family:'Segoe UI',sans-serif;transition:border-color .2s,box-shadow .2s}
        .lp-inp::placeholder{color:#bbb}
        .lp-inp:focus{border-color:#e63946;box-shadow:0 0 0 3px rgba(230,57,70,.09);background:#fff}
        .lp-eye{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#bbb;display:flex;align-items:center;padding:0;transition:color .15s}
        .lp-eye:hover{color:#666}
        .lp-err{background:#fff5f5;border:1px solid #fdd;border-radius:9px;padding:10px 14px;font-size:12.5px;color:#c1121f;line-height:1.5;margin-bottom:16px}
        .lp-btn{width:100%;padding:13px;background:linear-gradient(135deg,#e63946,#c1121f);border:none;border-radius:10px;color:#fff;font-size:14px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 6px 20px rgba(230,57,70,.32);font-family:'Segoe UI',sans-serif;transition:all .2s;margin-top:4px}
        .lp-btn:hover:not(:disabled){opacity:.92;transform:translateY(-1px);box-shadow:0 10px 28px rgba(230,57,70,.42)}
        .lp-btn:disabled{opacity:.65;cursor:not-allowed}
        .lp-img-card{width:100%;height:100%;border-radius:24px;overflow:hidden;position:relative}
        .lp-img-card img{width:100%;height:100%;object-fit:cover;display:block}
        .lp-img-ov{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.68) 0%,rgba(0,0,0,.08) 52%,transparent 100%)}
        .lp-badge{position:absolute;top:22px;left:22px;background:rgba(255,255,255,.18);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.28);border-radius:40px;padding:6px 14px;color:#fff;font-size:11px;font-weight:700;letter-spacing:.4px;display:flex;align-items:center;gap:7px}
        .lp-badge::before{content:'';width:7px;height:7px;border-radius:50%;background:#4ade80;display:inline-block;flex-shrink:0}
        .lp-caption{position:absolute;bottom:40px;left:28px;right:28px;color:#fff}
        .lp-caption h2{font-size:22px;font-weight:800;margin-bottom:7px;letter-spacing:-.3px}
        .lp-caption p{font-size:13px;opacity:.83;line-height:1.55}
        @keyframes spin{to{transform:rotate(360deg)}}
        .spin{animation:spin .8s linear infinite}
      `}</style>

      <div className="lp-root">
        <div className="lp-left">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 34 }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg,#e63946,#c1121f)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 17, color: "#fff" }}>T</div>
            <span style={{ fontSize: 20, fontWeight: 800, color: "#1a1a2e", letterSpacing: -0.5 }}>TourGo</span>
          </div>

          <h1 style={{ fontSize: "clamp(22px,4vw,28px)", fontWeight: 800, color: "#1a1a2e", margin: "0 0 6px", letterSpacing: -0.5 }}>Welcome back 👋</h1>
          <p style={{ fontSize: 13, color: "#999", margin: 0, lineHeight: 1.55 }}>Sign in to your TourGo account to continue your journey.</p>

          {/* Social Login Buttons */}
          <div className="lp-socials">
            <button 
              className="lp-social-btn" 
              onClick={() => handleSocialLogin("google")}
              disabled={!!socialLoading}
            >
              {socialLoading === "google" ? (
                <Loader2 size={16} className="spin" />
              ) : (
                <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" />
              )}
              <span className="lp-social-label">Google</span>
            </button>
            <button 
              className="lp-social-btn" 
              onClick={() => handleSocialLogin("facebook")}
              disabled={!!socialLoading}
            >
              {socialLoading === "facebook" ? (
                <Loader2 size={16} className="spin" />
              ) : (
                <img src="https://www.svgrepo.com/show/512120/facebook-176.svg" alt="Facebook" />
              )}
              <span className="lp-social-label">Facebook</span>
            </button>
          </div>

          <div className="lp-divider"><span>or continue with email</span></div>

          {error && <div className="lp-err">⚠️ {error}</div>}

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ fontSize: 10, fontWeight: 700, color: "#666", letterSpacing: 0.6, textTransform: "uppercase", display: "block", marginBottom: 5 }}>Email Address</label>
              <div className="lp-wrap">
                <span className="lp-icon"><Mail size={15} /></span>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(null); }}
                  onKeyDown={e => e.key === "Enter" && handleSubmit()}
                  className="lp-inp" 
                  autoComplete="email" 
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: 10, fontWeight: 700, color: "#666", letterSpacing: 0.6, textTransform: "uppercase", display: "block", marginBottom: 5 }}>Password</label>
              <div className="lp-wrap">
                <span className="lp-icon"><Lock size={15} /></span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(null); }}
                  onKeyDown={e => e.key === "Enter" && handleSubmit()}
                  className="lp-inp"
                  style={{ paddingRight: 40 }}
                  autoComplete="current-password"
                />
                <button type="button" className="lp-eye" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 7, cursor: "pointer" }}>
                <input 
                  type="checkbox" 
                  checked={rememberMe} 
                  onChange={e => setRememberMe(e.target.checked)}
                  style={{ accentColor: "#e63946", width: 14, height: 14 }} 
                />
                <span style={{ fontSize: 12, color: "#666" }}>Remember me</span>
              </label>
              <Link href="/forgot-password" style={{ fontSize: 12, fontWeight: 700, color: "#e63946", textDecoration: "none" }}>
                Forgot Password?
              </Link>
            </div>

            <button className="lp-btn" onClick={handleSubmit} disabled={loading}>
              {loading ? <><Loader2 size={16} className="spin"/> Signing in…</> : "Sign In →"}
            </button>
          </div>

          <p style={{ textAlign: "center", fontSize: 13, color: "#888", marginTop: 24 }}>
            Don't have an account?{" "}
            <Link href="/register" style={{ color: "#e63946", fontWeight: 700, textDecoration: "none" }}>Sign Up</Link>
          </p>
        </div>

        <div className="lp-right">
          <div className="lp-img-card">
            <img src="https://images.unsplash.com/photo-1562602833-0f4ab2fc46e3?w=1200&auto=format&fit=crop" alt="Sri Lanka" />
            <div className="lp-img-ov"/>
            <div className="lp-badge">12,000+ Active Travelers</div>
            <div className="lp-caption">
              <h2>Explore Sri Lanka</h2>
              <p>From misty tea hills to ancient rock fortresses — your next adventure is one sign-in away.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}