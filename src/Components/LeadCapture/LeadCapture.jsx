// LeadCapture.jsx — Simple funnel lead form
import React, { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { ContentContext } from "../../Context/Content/ContentState";
import "./LeadCapture.css";

const API_BASE = "https://admin.litwebs.co.uk";

const LeadCapture = () => {
  const { CreateAlert } = useContext(ContentContext);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.phone.trim()) e.phone = "Phone is required";
    else if (form.phone.replace(/\D/g, "").length < 7)
      e.phone = "Enter a valid phone number";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSending(true);
    try {
      const res = await fetch(`${API_BASE}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: uuidv4(),
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: "Lead capture form — homepage",
        }),
      });
      if (!res.ok) throw new Error("Server error");
      setDone(true);
      CreateAlert &&
        CreateAlert({
          id: uuidv4(),
          alert: "We'll be in touch soon!",
          type: "success",
        });
    } catch {
      CreateAlert &&
        CreateAlert({
          id: uuidv4(),
          alert: "Something went wrong. Please try again.",
          type: "error",
        });
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <section className="lc-section">
        <div className="lc-wrap lc-success">
          <h2>You're all set! 🎉</h2>
          <p>We'll reach out within 24 hours to book your free call.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="lc-section" id="lead-form">
      <div className="lc-wrap">
        {/* Left — pitch panel */}
        <div className="lc-left">
          <p className="lc-eyebrow">Free · No commitment</p>
          <h2>Ready to Get More Clients?</h2>
          <p>
            Drop your details and we'll reach out within 24 hours to book your
            free strategy call. No pushy sales — just an honest conversation
            about your website.
          </p>
          <ul className="lc-perks">
            {[
              "Live website in 14 days",
              "100% bespoke — no templates",
              "Ongoing support included",
              "Reply within 24 hours",
            ].map((perk) => (
              <li key={perk}>
                <span className="lc-perk-dot" />
                {perk}
              </li>
            ))}
          </ul>
        </div>

        {/* Right — form */}
        <div className="lc-right">
          <form className="lc-form" onSubmit={handleSubmit} noValidate>
            <div className={`lc-field ${errors.name ? "lc-field--err" : ""}`}>
              <label htmlFor="lc-name">Full Name</label>
              <input
                id="lc-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Jane Smith"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && <span className="lc-err">{errors.name}</span>}
            </div>

            <div className={`lc-field ${errors.email ? "lc-field--err" : ""}`}>
              <label htmlFor="lc-email">Email Address</label>
              <input
                id="lc-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="jane@example.com"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <span className="lc-err">{errors.email}</span>}
            </div>

            <div className={`lc-field ${errors.phone ? "lc-field--err" : ""}`}>
              <label htmlFor="lc-phone">Phone Number</label>
              <input
                id="lc-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+44 7000 000000"
                value={form.phone}
                onChange={handleChange}
              />
              {errors.phone && <span className="lc-err">{errors.phone}</span>}
            </div>

            <button type="submit" className="lc-submit" disabled={sending}>
              {sending ? "Sending…" : "Book a Free Call"}
            </button>

            <p className="lc-fine">
              No spam, ever. We'll only use your details to contact you about
              your website.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LeadCapture;
