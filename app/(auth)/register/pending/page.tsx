"use client";

import Link from "next/link";
import { Clock, Mail, CheckCircle, ArrowLeft } from "lucide-react";

export default function PendingApprovalPage() {
  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Segoe UI',sans-serif}
        .pa-root{min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f8f9fa;padding:20px}
        .pa-card{background:#fff;border-radius:20px;padding:48px 40px;width:100%;max-width:480px;box-shadow:0 8px 40px rgba(0,0,0,.08);text-align:center}
        @media(max-width:480px){.pa-card{padding:36px 24px}}
        .pa-step{display:flex;align-items:flex-start;gap:14px;text-align:left;padding:14px 16px;border-radius:12px;background:#f8f9fa;margin-bottom:10px}
        .pa-step-ico{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#e63946,#c1121f);display:flex;align-items:center;justify-content:center;flex-shrink:0}
      `}</style>

      <div className="pa-root">
        <div className="pa-card">
          {/* Icon */}
          <div style={{ width:72,height:72,borderRadius:"50%",background:"linear-gradient(135deg,#fff5f5,#ffe4e4)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px",border:"2px solid #fdd" }}>
            <Clock size={34} color="#e63946"/>
          </div>

          {/* Logo */}
          <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:20 }}>
            <div style={{ width:28,height:28,borderRadius:7,background:"linear-gradient(135deg,#e63946,#c1121f)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:13,color:"#fff" }}>T</div>
            <span style={{ fontSize:16,fontWeight:800,color:"#1a1a2e",letterSpacing:-.3 }}>TourGo</span>
          </div>

          <h1 style={{ fontSize:24,fontWeight:800,color:"#1a1a2e",marginBottom:10,letterSpacing:-.3 }}>Application Submitted!</h1>
          <p style={{ fontSize:13,color:"#888",lineHeight:1.7,marginBottom:28 }}>
            Thank you for registering as a Tour Guide. Our team will review your documents and activate your account — usually within <strong style={{ color:"#1a1a2e" }}>24 hours</strong>.
          </p>

          {/* Steps */}
          <div style={{ marginBottom:28 }}>
            {[
              { icon:<CheckCircle size={15} color="#fff"/>, title:"Registration complete", desc:"Your account has been created successfully." },
              { icon:<Clock size={15} color="#fff"/>,       title:"Under review",          desc:"Our team is verifying your documents." },
              { icon:<Mail size={15} color="#fff"/>,        title:"Email confirmation",    desc:"You'll receive an email once approved." },
            ].map((s,i)=>(
              <div key={i} className="pa-step">
                <div className="pa-step-ico">{s.icon}</div>
                <div>
                  <div style={{ fontSize:13,fontWeight:700,color:"#1a1a2e",marginBottom:2 }}>{s.title}</div>
                  <div style={{ fontSize:12,color:"#888",lineHeight:1.5 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background:"#fff5f5",border:"1px solid #fdd",borderRadius:10,padding:"12px 16px",fontSize:12,color:"#c1121f",lineHeight:1.6,marginBottom:24,textAlign:"left" }}>
            💡 <strong>Tip:</strong> Make sure your license images are clear and legible. Blurry documents may delay approval.
          </div>

          <Link href="/login"
            style={{ display:"inline-flex",alignItems:"center",gap:7,fontSize:13,fontWeight:700,color:"#e63946",textDecoration:"none" }}>
            <ArrowLeft size={14}/> Back to Sign In
          </Link>
        </div>
      </div>
    </>
  );
}