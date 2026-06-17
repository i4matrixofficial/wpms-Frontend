"use client";

import { useState } from "react";
import Link from "next/link";
import PassengerRegisterForm from "@/app/(auth)/register/passenger/page";
import TourGuideRegisterForm from "@/app/(auth)/register/tour_guide/page";

export default function RegisterPage() {
  const [tab, setTab] = useState<"passenger"|"tourguide">("passenger");

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        .rp-root{display:flex;min-height:100vh;font-family:'Segoe UI',sans-serif;background:#fff}
        .rp-left{width:100%;max-width:520px;display:flex;flex-direction:column;justify-content:center;padding:48px 56px;overflow-y:auto;min-height:100vh}
        .rp-right{display:none;flex:1;padding:16px;position:sticky;top:0;height:100vh}
        @media(min-width:1024px){.rp-right{display:block}}
        @media(max-width:768px){.rp-left{max-width:100%;padding:36px 24px}}
        @media(max-width:480px){.rp-left{padding:28px 16px;justify-content:flex-start;padding-top:40px}}
        .rp-tabs{display:flex;background:#f4f4f6;border-radius:12px;padding:4px;gap:4px}
        .rp-tab{flex:1;padding:10px 0;border:none;border-radius:9px;font-size:13px;font-weight:700;cursor:pointer;transition:all .22s;background:transparent;color:#999;font-family:'Segoe UI',sans-serif;white-space:nowrap}
        .rp-tab.on{background:#fff;color:#1a1a2e;box-shadow:0 2px 10px rgba(0,0,0,.1)}
        .rp-tab:hover:not(.on){color:#555}
        .rp-img-card{width:100%;height:100%;border-radius:24px;overflow:hidden;position:relative}
        .rp-img-card img{width:100%;height:100%;object-fit:cover;display:block}
        .rp-ov{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.65) 0%,rgba(0,0,0,.1) 55%,transparent 100%)}
        .rp-cap{position:absolute;bottom:36px;left:32px;right:32px;color:#fff}
        .rp-cap h2{font-size:22px;font-weight:800;margin-bottom:6px;letter-spacing:-.3px}
        .rp-cap p{font-size:13px;opacity:.82;line-height:1.5}
        .rp-stats{position:absolute;top:28px;left:24px;right:24px;display:flex;gap:10px}
        .rp-stat{background:rgba(255,255,255,.18);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.25);border-radius:12px;padding:10px 16px;color:#fff;flex:1;text-align:center}
        .rp-stat-n{font-size:18px;font-weight:800;display:block}
        .rp-stat-l{font-size:10px;opacity:.8;letter-spacing:.5px}
        .rp-div{display:flex;align-items:center;gap:10px;margin:4px 0}
        .rp-div::before,.rp-div::after{content:'';flex:1;height:1px;background:#eee}
        .rp-div span{font-size:11px;color:#ccc}
      `}</style>

      <div className="rp-root">
        {/* ── Left Panel ── */}
        <div className="rp-left">
          {/* Logo */}
          <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:32 }}>
            <div style={{ width:34,height:34,borderRadius:9,background:"linear-gradient(135deg,#e63946,#c1121f)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:17,color:"#fff" }}>T</div>
            <span style={{ fontSize:20,fontWeight:800,color:"#1a1a2e",letterSpacing:-.5 }}>TourGo</span>
          </div>

          <h1 style={{ fontSize:"clamp(20px,4vw,26px)",fontWeight:800,color:"#1a1a2e",margin:"0 0 6px",letterSpacing:-.5 }}>Create your account</h1>
          <p style={{ fontSize:13,color:"#999",margin:"0 0 26px",lineHeight:1.5 }}>Join thousands exploring Sri Lanka with TourGo</p>

          {/* Tab Toggle */}
          <div className="rp-tabs" style={{ marginBottom:26 }}>
            <button className={`rp-tab${tab==="passenger"?" on":""}`} onClick={()=>setTab("passenger")}>🧳 Passenger</button>
            <button className={`rp-tab${tab==="tourguide"?" on":""}`} onClick={()=>setTab("tourguide")}>🗺️ Tour Guide</button>
          </div>

          {/* Forms */}
          {tab === "passenger" ? <PassengerRegisterForm/> : <TourGuideRegisterForm/>}

          <div className="rp-div" style={{ marginTop:20 }}><span>or</span></div>
          <p style={{ textAlign:"center",fontSize:13,color:"#888",marginTop:14 }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color:"#e63946",fontWeight:700,textDecoration:"none" }}>Sign in</Link>
          </p>
        </div>

        {/* ── Right Panel ── */}
        <div className="rp-right">
          <div className="rp-img-card">
            <img src="https://images.unsplash.com/photo-1540206395-68808572332f?w=1200&auto=format&fit=crop" alt="Sri Lanka"/>
            <div className="rp-ov"/>
            <div className="rp-stats">
              <div className="rp-stat"><span className="rp-stat-n">12K+</span><span className="rp-stat-l">Travelers</span></div>
              <div className="rp-stat"><span className="rp-stat-n">850+</span><span className="rp-stat-l">Guides</span></div>
              <div className="rp-stat"><span className="rp-stat-n">4.9★</span><span className="rp-stat-l">Rating</span></div>
            </div>
            <div className="rp-cap">
              <h2>Discover Sri Lanka</h2>
              <p>Connect with expert local guides and create unforgettable journeys through the Pearl of the Indian Ocean.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}