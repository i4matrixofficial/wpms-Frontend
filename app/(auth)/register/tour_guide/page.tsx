"use client";

import { useState } from "react";
import {
  User, Mail, Lock, Phone, Eye, EyeOff,
  ArrowRight, FileText, ChevronLeft, Upload, CheckCircle, Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { authApi } from "../../../lib/api";

type GuideType = "Tour Guide" | "Driver Guide" | "Tour & Driver Guide";

interface Form {
  firstName: string; lastName: string; email: string; phone: string;
  password: string; confirm: string;
  guideType: GuideType;
  yearsOfExperience: string; streetAddress: string; city: string; zipCode: string;
  vehicleNumber: string; vehicleModel: string; seats: string;
  languages: string; description: string;
  licenceNumber: string; guideLicenseNumber: string;
}
type FErr = Partial<Record<keyof Form, string>>;

// ─── Email sanitizer — whitelist only valid email chars ───────────────────────
function sanitizeEmail(raw: string): string {
  return raw
    .replace(/[^a-zA-Z0-9@._+\-]/g, "")
    .toLowerCase()
    .trim();
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function TourGuideRegisterForm() {
  const router = useRouter();

  const [step,    setStep]    = useState<1 | 2>(1);
  const [form,    setForm]    = useState<Form>({
    firstName: "", lastName: "", email: "", phone: "",
    password: "", confirm: "",
    guideType: "Tour Guide",
    yearsOfExperience: "", streetAddress: "", city: "", zipCode: "",
    vehicleNumber: "", vehicleModel: "", seats: "",
    languages: "", description: "",
    licenceNumber: "", guideLicenseNumber: "",
  });
  const [errs,    setErrs]    = useState<FErr>({});
  const [error,   setError]   = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [agreed,  setAgreed]  = useState(false);
  const [showPw,  setShowPw]  = useState(false);
  const [showCf,  setShowCf]  = useState(false);

  // File states — names match backend field names exactly
  const [guideIdFront, setGuideIdFront] = useState<File | null>(null);
  const [guideIdBack,  setGuideIdBack]  = useState<File | null>(null);
  const [licFront,     setLicFront]     = useState<File | null>(null);
  const [licBack,      setLicBack]      = useState<File | null>(null);

  // ── onChange ────────────────────────────────────────────────────────────────
  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = e.target.value;
    if (e.target.name === "email") {
      value = sanitizeEmail(value);
    }
    setForm(p => ({ ...p, [e.target.name]: value }));
    setErrs(p => ({ ...p, [e.target.name]: undefined }));
    setError(null);
  };

  // ── onPaste for email — intercept before markdown reaches state ─────────────
  const onEmailPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const clean = sanitizeEmail(e.clipboardData.getData("text"));
    setForm(p => ({ ...p, email: clean }));
    setErrs(p => ({ ...p, email: undefined }));
    setError(null);
  };

  // ── Step 1 validation ───────────────────────────────────────────────────────
  const validateStep1 = (): boolean => {
    const e: FErr = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim())  e.lastName  = "Required";

    const cleanEmail = sanitizeEmail(form.email);
    if (!cleanEmail) {
      e.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(cleanEmail)) {
      e.email = "Please enter a valid email address";
    }

    if (!form.phone.trim())  e.phone    = "Required";
    if (!form.password)      e.password = "Required";
    else if (form.password.length < 8) e.password = "Minimum 8 characters";
    if (!form.confirm)       e.confirm  = "Please confirm your password";
    else if (form.password !== form.confirm) e.confirm = "Passwords don't match";

    setErrs(e);
    return Object.keys(e).length === 0;
  };

  // ── Step 2 validation ───────────────────────────────────────────────────────
  const validateStep2 = (): boolean => {
    const e: FErr = {};
    const hasV = form.vehicleNumber || form.vehicleModel || form.seats;
    if (hasV) {
      if (!form.vehicleNumber) e.vehicleNumber = "Required when adding vehicle";
      if (!form.vehicleModel)  e.vehicleModel  = "Required when adding vehicle";
      if (!form.seats)         e.seats         = "Required when adding vehicle";
    }
    setErrs(e);
    return Object.keys(e).length === 0;
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!validateStep2()) return;
    if (!agreed) { setError("Please accept the Terms & Conditions."); return; }

    setLoading(true);
    setError(null);

    try {
      const cleanEmail = sanitizeEmail(form.email); // final safety pass

      const fd = new FormData();

      // Required fields
      fd.append("firstName",    form.firstName.trim());
      fd.append("lastName",     form.lastName.trim());
      fd.append("email",        cleanEmail);           // ✅ always clean
      fd.append("password",     form.password);
      fd.append("role",         "Guide");
      fd.append("mobileNumber", form.phone.trim());
      fd.append("guideType",    form.guideType);

      // Optional text fields
      if (form.yearsOfExperience)  fd.append("yearsOfExperience",  form.yearsOfExperience);
      if (form.streetAddress)      fd.append("streetAddress",       form.streetAddress.trim());
      if (form.city)               fd.append("city",                form.city.trim());
      if (form.zipCode)            fd.append("zipCode",             form.zipCode.trim());
      if (form.vehicleNumber)      fd.append("vehicleNumber",       form.vehicleNumber.trim());
      if (form.vehicleModel)       fd.append("vehicleModel",        form.vehicleModel.trim());
      if (form.seats)              fd.append("seats",               form.seats);
      if (form.languages)          fd.append("languages",           form.languages.trim());
      if (form.description)        fd.append("description",         form.description.trim());
      if (form.licenceNumber)      fd.append("licenceNumber",       form.licenceNumber.trim());
      if (form.guideLicenseNumber) fd.append("guideLicenseNumber",  form.guideLicenseNumber.trim());

      // Files — field names match backend multer config exactly
      if (guideIdFront) fd.append("guideIdFrontImage", guideIdFront);
      if (guideIdBack)  fd.append("guideIdBackImage",  guideIdBack);
      if (licFront)     fd.append("licenceFrontImage", licFront);
      if (licBack)      fd.append("licenceBackImage",  licBack);

      await authApi.register(fd);
      router.push("/register/pending");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Registration failed. Please try again.";
      if (msg.toLowerCase().includes("already")) {
        setStep(1);
        setErrs(p => ({ ...p, email: "This email is already registered" }));
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const isDriver = form.guideType === "Driver Guide" || form.guideType === "Tour & Driver Guide";

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        .g2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
        @media(max-width:480px){.g2{grid-template-columns:1fr}.gbr{flex-direction:column!important}}
        .gi{transition:border-color .2s}
        .gi:focus{border-color:#e63946!important;box-shadow:0 0 0 3px rgba(230,57,70,.08)}
        .gi-e{border-color:#e63946!important;background:#fff8f8!important}
        .gsub{transition:all .2s}
        .gsub:hover:not(:disabled){opacity:.9;transform:translateY(-1px)}
        .gsub:disabled{opacity:.65;cursor:not-allowed}
        .gbk:hover{background:#ececec!important}
        .gup{transition:border-color .2s,background .2s;cursor:pointer}
        .gup:hover{border-color:#e63946!important;background:#fff8f8!important}
        @keyframes spin{to{transform:rotate(360deg)}}
        .spin{animation:spin .8s linear infinite}
      `}</style>

      {/* Step progress bar */}
      <div style={{ display:"flex",alignItems:"center",background:"#f8f9fa",borderRadius:10,padding:"8px 14px",marginBottom:20 }}>
        <SDot n={1} cur={step} label="Personal Info" />
        <div style={{ flex:1,height:2,margin:"0 8px",background:step>=2?"#e63946":"#ddd",transition:"background .4s" }}/>
        <SDot n={2} cur={step} label="Guide Profile" />
      </div>

      {/* Error banner */}
      {error && (
        <div style={{ background:"#fff5f5",border:"1px solid #fdd",borderRadius:9,padding:"10px 14px",fontSize:12.5,color:"#c1121f",marginBottom:14 }}>
          ⚠️ {error}
        </div>
      )}

      {/* ── STEP 1 — Personal Info ── */}
      {step === 1 && (
        <div style={{ display:"flex",flexDirection:"column",gap:13 }}>

          <div className="g2">
            <F label="First Name" icon={<User size={12} color="#e63946"/>} err={errs.firstName}>
              <input name="firstName" value={form.firstName} onChange={set}
                placeholder="Kasun" autoComplete="given-name"
                className={`gi${errs.firstName?" gi-e":""}`} style={inp}/>
            </F>
            <F label="Last Name" icon={<User size={12} color="#e63946"/>} err={errs.lastName}>
              <input name="lastName" value={form.lastName} onChange={set}
                placeholder="Perera" autoComplete="family-name"
                className={`gi${errs.lastName?" gi-e":""}`} style={inp}/>
            </F>
          </div>

          {/* ✅ type="text" + onPaste — prevents markdown email */}
          <F label="Email Address" icon={<Mail size={12} color="#e63946"/>} err={errs.email}>
            <input
              name="email"
              type="text"
              inputMode="email"
              value={form.email}
              onChange={set}
              onPaste={onEmailPaste}
              placeholder="kasun@example.com"
              autoComplete="email"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              className={`gi${errs.email?" gi-e":""}`}
              style={inp}
            />
          </F>

          <F label="Mobile Number" icon={<Phone size={12} color="#e63946"/>} err={errs.phone}>
            <input name="phone" value={form.phone} onChange={set}
              placeholder="+94 71 234 5678" inputMode="tel"
              className={`gi${errs.phone?" gi-e":""}`} style={inp}/>
          </F>

          <div className="g2">
            <F label="Password" icon={<Lock size={12} color="#e63946"/>} err={errs.password}>
              <div style={{ position:"relative" }}>
                <input name="password" type={showPw?"text":"password"} value={form.password}
                  onChange={set} placeholder="Min. 8 chars" autoComplete="new-password"
                  className={`gi${errs.password?" gi-e":""}`} style={{ ...inp,paddingRight:38 }}/>
                <button type="button" style={eyeBtn} onClick={()=>setShowPw(!showPw)}>
                  {showPw ? <EyeOff size={13}/> : <Eye size={13}/>}
                </button>
              </div>
            </F>
            <F label="Confirm Password" icon={<Lock size={12} color="#e63946"/>} err={errs.confirm}>
              <div style={{ position:"relative" }}>
                <input name="confirm" type={showCf?"text":"password"} value={form.confirm}
                  onChange={set} placeholder="Repeat" autoComplete="new-password"
                  className={`gi${errs.confirm?" gi-e":""}`} style={{ ...inp,paddingRight:38 }}/>
                <button type="button" style={eyeBtn} onClick={()=>setShowCf(!showCf)}>
                  {showCf ? <EyeOff size={13}/> : <Eye size={13}/>}
                </button>
              </div>
            </F>
          </div>

          <button className="gsub" style={subBtn} onClick={() => validateStep1() && setStep(2)}>
            Continue to Profile <ArrowRight size={14}/>
          </button>

        </div>
      )}

      {/* ── STEP 2 — Guide Profile ── */}
      {step === 2 && (
        <div style={{ display:"flex",flexDirection:"column",gap:13 }}>

          {/* Guide Type */}
          <F label="Guide Type" icon={<FileText size={12} color="#e63946"/>}>
            <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
              {(["Tour Guide","Driver Guide","Tour & Driver Guide"] as GuideType[]).map(t => (
                <button key={t} type="button" onClick={() => setForm(p => ({ ...p, guideType: t }))}
                  style={{ flex:1,minWidth:90,padding:"9px 8px",borderRadius:8,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"'Segoe UI',sans-serif",border:`1.5px solid ${form.guideType===t?"#e63946":"#eee"}`,background:form.guideType===t?"#fff5f5":"#f8f9fa",color:form.guideType===t?"#e63946":"#888",transition:"all .2s" }}>
                  {t}
                </button>
              ))}
            </div>
          </F>

          {/* Address */}
          <div className="g2">
            <F label="City" icon={<FileText size={12} color="#e63946"/>}>
              <input name="city" value={form.city} onChange={set} placeholder="Kandy" className="gi" style={inp}/>
            </F>
            <F label="Zip Code" icon={<FileText size={12} color="#e63946"/>}>
              <input name="zipCode" value={form.zipCode} onChange={set} placeholder="20000" className="gi" style={inp}/>
            </F>
          </div>

          <F label="Street Address" icon={<FileText size={12} color="#e63946"/>}>
            <input name="streetAddress" value={form.streetAddress} onChange={set}
              placeholder="123 Temple Road" className="gi" style={inp}/>
          </F>

          {/* Experience + Languages */}
          <div className="g2">
            <F label="Years of Experience" icon={<FileText size={12} color="#e63946"/>}>
              <input name="yearsOfExperience" type="number" min="0" value={form.yearsOfExperience}
                onChange={set} placeholder="5" className="gi" style={inp}/>
            </F>
            <F label="Languages (comma separated)" icon={<FileText size={12} color="#e63946"/>}>
              <input name="languages" value={form.languages} onChange={set}
                placeholder="English, Sinhala" className="gi" style={inp}/>
            </F>
          </div>

          {/* Vehicle fields — only for Driver / Tour & Driver */}
          {isDriver && (
            <div className="g2">
              <F label="Vehicle Number" icon={<FileText size={12} color="#e63946"/>} err={errs.vehicleNumber}>
                <input name="vehicleNumber" value={form.vehicleNumber} onChange={set}
                  placeholder="WP CAB-1234" className={`gi${errs.vehicleNumber?" gi-e":""}`} style={inp}/>
              </F>
              <F label="Vehicle Model" icon={<FileText size={12} color="#e63946"/>} err={errs.vehicleModel}>
                <input name="vehicleModel" value={form.vehicleModel} onChange={set}
                  placeholder="Toyota KDH" className={`gi${errs.vehicleModel?" gi-e":""}`} style={inp}/>
              </F>
              <F label="Seats" icon={<FileText size={12} color="#e63946"/>} err={errs.seats}>
                <input name="seats" type="number" min="1" value={form.seats} onChange={set}
                  placeholder="8" className={`gi${errs.seats?" gi-e":""}`} style={inp}/>
              </F>
            </div>
          )}

          {/* Licence numbers */}
          <div className="g2">
            <F label="Driving Licence Number" icon={<FileText size={12} color="#e63946"/>}>
              <input name="licenceNumber" value={form.licenceNumber} onChange={set}
                placeholder="SL-0000-0000" className="gi" style={inp}/>
            </F>
            <F label="Guide License Number" icon={<FileText size={12} color="#e63946"/>}>
              <input name="guideLicenseNumber" value={form.guideLicenseNumber} onChange={set}
                placeholder="GL-0000" className="gi" style={inp}/>
            </F>
          </div>

          {/* Description */}
          <F label="About You" icon={<FileText size={12} color="#e63946"/>}>
            <textarea name="description" value={form.description} onChange={set}
              placeholder="Describe your experience and specialties..." rows={3}
              style={{ ...inp, resize:"vertical" }} className="gi"/>
          </F>

          {/* Document uploads */}
          <p style={{ fontSize:10,fontWeight:700,color:"#666",letterSpacing:.6,textTransform:"uppercase",marginBottom:-4 }}>
            Upload Documents (optional — can add later)
          </p>
          <div className="g2">
            <UpBox label="Guide ID — Front" file={guideIdFront} onChange={setGuideIdFront}/>
            <UpBox label="Guide ID — Back"  file={guideIdBack}  onChange={setGuideIdBack}/>
            <UpBox label="Licence — Front"  file={licFront}     onChange={setLicFront}/>
            <UpBox label="Licence — Back"   file={licBack}      onChange={setLicBack}/>
          </div>

          {/* Info notice */}
          <div style={{ background:"#fff5f5",border:"1px solid #fdd",borderRadius:9,padding:"11px 13px",fontSize:12,color:"#c1121f",lineHeight:1.6 }}>
            ℹ️ Your account will be reviewed by an admin. You'll receive access once verified — usually within 24 hours.
          </div>

          {/* Terms */}
          <label style={{ display:"flex",alignItems:"flex-start",gap:8,cursor:"pointer" }}>
            <input type="checkbox" checked={agreed}
              onChange={e => { setAgreed(e.target.checked); setError(null); }}
              style={{ marginTop:2,accentColor:"#e63946",flexShrink:0 }}/>
            <span style={{ fontSize:12,color:"#888",lineHeight:1.5 }}>
              I agree to the{" "}
              <a href="/terms" style={{ color:"#e63946",fontWeight:600 }}>Terms &amp; Conditions</a>
              {" "}&amp;{" "}
              <a href="/privacy" style={{ color:"#e63946",fontWeight:600 }}>Privacy Policy</a>
            </span>
          </label>

          {/* Back + Submit */}
          <div className="gbr" style={{ display:"flex",gap:10,marginTop:2 }}>
            <button className="gbk" onClick={() => setStep(1)}
              style={{ padding:"12px 18px",background:"#f4f4f6",border:"none",borderRadius:10,color:"#555",fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:6,fontFamily:"'Segoe UI',sans-serif",transition:"background .2s" }}>
              <ChevronLeft size={14}/> Back
            </button>
            <button className="gsub" onClick={handleSubmit} disabled={loading}
              style={{ ...subBtn, flex:1, margin:0, width:"auto" }}>
              {loading
                ? <><Loader2 size={14} className="spin"/> Creating account…</>
                : <>Create Guide Account <ArrowRight size={14}/></>
              }
            </button>
          </div>

        </div>
      )}
    </>
  );
}

// ─── Upload box ───────────────────────────────────────────────────────────────
function UpBox({ label, file, onChange }: { label: string; file: File | null; onChange: (f: File) => void }) {
  return (
    <label className="gup" style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:7,padding:"18px 10px",border:`1.5px dashed ${file?"#4caf50":"#ddd"}`,borderRadius:10,background:file?"#f0fff4":"#f8f9fa" }}>
      <input type="file" accept="image/*,application/pdf" style={{ display:"none" }}
        onChange={e => { const f = e.target.files?.[0]; if (f) onChange(f); }}/>
      {file
        ? <><CheckCircle size={20} color="#4caf50"/><span style={{ fontSize:10,color:"#4caf50",fontWeight:600,textAlign:"center",wordBreak:"break-all" }}>{file.name}</span></>
        : <><Upload size={20} color="#ccc"/><span style={{ fontSize:10,color:"#bbb",fontWeight:600,textAlign:"center" }}>{label}</span></>
      }
    </label>
  );
}

// ─── Step dot ─────────────────────────────────────────────────────────────────
function SDot({ n, cur, label }: { n: number; cur: number; label: string }) {
  const on = cur >= n;
  return (
    <div style={{ display:"flex",alignItems:"center",gap:6 }}>
      <div style={{ width:22,height:22,borderRadius:"50%",flexShrink:0,background:on?"linear-gradient(135deg,#e63946,#c1121f)":"#ddd",color:on?"#fff":"#999",fontSize:10,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .3s" }}>
        {n}
      </div>
      <span style={{ fontSize:11,fontWeight:700,color:on?"#1a1a2e":"#aaa",whiteSpace:"nowrap" }}>{label}</span>
    </div>
  );
}

// ─── Field wrapper ────────────────────────────────────────────────────────────
function F({ label, icon, err, children }: { label: string; icon: React.ReactNode; err?: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display:"flex",alignItems:"center",gap:4,fontSize:10,fontWeight:700,color:"#666",marginBottom:5,letterSpacing:.6,textTransform:"uppercase" }}>
        {icon} {label}
      </label>
      {children}
      {err && <p style={{ fontSize:11,color:"#e63946",marginTop:4 }}>{err}</p>}
    </div>
  );
}

// ─── Shared styles ────────────────────────────────────────────────────────────
const inp: React.CSSProperties = {
  width: "100%", padding: "10px 12px", borderRadius: 9, fontSize: 13,
  background: "#f8f9fa", border: "1.5px solid #eee", color: "#1a1a2e",
  outline: "none", boxSizing: "border-box", fontFamily: "'Segoe UI', sans-serif",
};

const eyeBtn: React.CSSProperties = {
  position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
  background: "none", border: "none", cursor: "pointer", color: "#bbb",
  display: "flex", alignItems: "center", padding: 0,
};

const subBtn: React.CSSProperties = {
  width: "100%", padding: "13px",
  background: "linear-gradient(135deg, #e63946, #c1121f)",
  border: "none", borderRadius: 10, color: "#fff", fontSize: 14, fontWeight: 700,
  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
  gap: 8, boxShadow: "0 6px 20px rgba(230,57,70,.35)", marginTop: 2,
  fontFamily: "'Segoe UI', sans-serif",
};