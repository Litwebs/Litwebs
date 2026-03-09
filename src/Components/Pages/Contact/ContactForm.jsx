// ContactForm.jsx
import React, { useMemo, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { ContentContext } from "../../../Context/Content/ContentState";
import { FaFacebook, FaInstagram, FaSnapchatGhost } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import "./Contact.css";

const ContactForm = () => {
  const { CreateAlert } = useContext(ContentContext);

  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSending, setIsSending] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    message: false,
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  // const API_BASE = "http://localhost:5001";
  const API_BASE = "https://admin.litwebs.co.uk";
  const setField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const setFieldTouched = (name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const pushAlert = (type, msg) => {
    CreateAlert({ id: uuidv4(), alert: msg, type });
  };

  const errors = useMemo(() => {
    const e = {};
    const firstName = formData.firstName.trim();
    const lastName = formData.lastName.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const message = formData.message.trim();

    if (!firstName) e.firstName = "First name is required";
    if (!lastName) e.lastName = "Last name is required";

    if (!email) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.email = "Please enter a valid email";
    }

    if (!message) e.message = "Message is required";
    else if (message.length < 15) e.message = "Please add a bit more detail";
    else if (message.length > 1200)
      e.message = "Message is too long (max 1200)";

    if (!phone) e.phone = "Phone is required";
    else {
      const digits = phone.replace(/\D/g, "");
      if (digits.length < 7) e.phone = "Please enter a valid phone number";
    }

    return e;
  }, [formData]);

  const isFormValid = Object.keys(errors).length === 0;

  // Only show validation messages after the user clicks submit
  const showError = () => submitted;
  const fieldHasError = (field) => showError(field) && !!errors[field];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!isFormValid) {
      const msg = "Please fix the highlighted fields.";
      setStatus({ type: "error", message: msg });
      pushAlert("warning", msg);
      return;
    }

    if (!API_BASE) {
      const msg =
        "API URL is not configured. Set REACT_APP_API_URL in your .env";
      setStatus({ type: "error", message: msg });
      pushAlert("error", msg);
      return;
    }

    setIsSending(true);
    setStatus({ type: "info", message: "Sending..." });

    const payload = {
      name: `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      message: formData.message.trim(),
      subject: "Contact form enquiry",
      sourcePage:
        typeof window !== "undefined" ? window.location.pathname : "/contact",
    };

    try {
      console.log(
        "➡️ POST /api/submissions",
        `${API_BASE}/api/submissions`,
        payload,
      );

      const res = await fetch(`${API_BASE}/api/submissions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const raw = await res.text();
      let data = null;
      try {
        data = JSON.parse(raw);
      } catch (_) {}

      console.log("⬅️ Response", res.status, raw);

      if (res.ok && data?.success) {
        setStatus({
          type: "success",
          message: "Message sent! We’ll reply ASAP.",
        });
        pushAlert("success", "Message Sent!");

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });

        setTouched({
          firstName: false,
          lastName: false,
          email: false,
          phone: false,
          message: false,
        });

        setSubmitted(false);
        return;
      }

      const msg =
        data?.message ||
        data?.error?.message ||
        `Error sending message (${res.status}).`;

      setStatus({ type: "error", message: msg });
      pushAlert("error", msg);
    } catch (err) {
      console.error("❌ Network error:", err);
      setStatus({
        type: "error",
        message: "Network error. Is the backend running?",
      });
      pushAlert("error", "Network error. Is the backend running?");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="contact-section max-wid2">
      <div className="contact-card">
        <div className="contact-grid">
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-form-header">
              <h2 className="contact-title">Send us a message</h2>
              <p className="contact-subtitle">
                Fill the form and we’ll get back to you as soon as we can.
              </p>
            </div>

            <div className="row two">
              <div className="field">
                <label className="label" htmlFor="firstName">
                  First name
                </label>
                <input
                  id="firstName"
                  disabled={isSending}
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={(e) => setField("firstName", e.target.value)}
                  onBlur={() => setFieldTouched("firstName")}
                  placeholder="Enter your first name"
                  className={fieldHasError("firstName") ? "invalid" : ""}
                  autoComplete="given-name"
                  required
                />
                {fieldHasError("firstName") ? (
                  <small className="err">{errors.firstName}</small>
                ) : null}
              </div>

              <div className="field">
                <label className="label" htmlFor="lastName">
                  Last name
                </label>
                <input
                  id="lastName"
                  disabled={isSending}
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={(e) => setField("lastName", e.target.value)}
                  onBlur={() => setFieldTouched("lastName")}
                  placeholder="Enter your last name"
                  className={fieldHasError("lastName") ? "invalid" : ""}
                  autoComplete="family-name"
                  required
                />
                {fieldHasError("lastName") ? (
                  <small className="err">{errors.lastName}</small>
                ) : null}
              </div>
            </div>

            <div className="row">
              <div className="field">
                <label className="label" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  disabled={isSending}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setField("email", e.target.value)}
                  onBlur={() => setFieldTouched("email")}
                  placeholder="Enter your email address"
                  className={fieldHasError("email") ? "invalid" : ""}
                  autoComplete="email"
                  required
                />
                {fieldHasError("email") ? (
                  <small className="err">{errors.email}</small>
                ) : null}
              </div>
            </div>

            <div className="row">
              <div className="field">
                <label className="label" htmlFor="phone">
                  Phone
                </label>
                <input
                  id="phone"
                  disabled={isSending}
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  onBlur={() => setFieldTouched("phone")}
                  placeholder="Enter your phone number"
                  className={fieldHasError("phone") ? "invalid" : ""}
                  autoComplete="tel"
                  required
                />
                {fieldHasError("phone") ? (
                  <small className="err">{errors.phone}</small>
                ) : null}
              </div>
            </div>

            <div className="row">
              <div className="field">
                <div className="label-row">
                  <label className="label" htmlFor="message">
                    Message
                  </label>
                  <span className="counter">
                    {formData.message.trim().length}/1200
                  </span>
                </div>

                <textarea
                  id="message"
                  disabled={isSending}
                  name="message"
                  value={formData.message}
                  onChange={(e) => setField("message", e.target.value)}
                  onBlur={() => setFieldTouched("message")}
                  placeholder="Write your message here"
                  className={fieldHasError("message") ? "invalid" : ""}
                  required
                />
                {fieldHasError("message") ? (
                  <small className="err">{errors.message}</small>
                ) : null}
              </div>
            </div>

            <div className="actions">
              <button
                className="lw-btn lw-btn-fill"
                disabled={isSending}
                type="submit"
              >
                {isSending ? "Sending..." : "Send message"}
              </button>
            </div>

            {status.message ? (
              <div className={`status ${status.type}`}>{status.message}</div>
            ) : null}
          </form>

          <aside className="contact-aside">
            <h2 className="aside-title">Get in touch</h2>
            <p className="aside-sub">
              Prefer socials or email? Pick your channel.
            </p>

            <div className="aside-list">
              <button
                type="button"
                className="aside-item"
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/company/litwebs/",
                    "_blank",
                  )
                }
              >
                <FaLinkedin size={18} className="aside-icon" />
                <span>LinkedIn</span>
              </button>

              <button
                type="button"
                className="aside-item"
                onClick={() =>
                  window.open("https://www.instagram.com/litwebs/", "_blank")
                }
              >
                <FaInstagram size={18} className="aside-icon" />
                <span>Instagram</span>
              </button>

              <button
                type="button"
                className="aside-item"
                onClick={() =>
                  window.open(
                    "https://www.facebook.com/people/Lit-Webs/61572395225801/",
                    "_blank",
                  )
                }
              >
                <FaFacebook size={18} className="aside-icon" />
                <span>Facebook</span>
              </button>

              <button
                type="button"
                className="aside-item"
                onClick={() =>
                  window.open("https://www.snapchat.com/add/litwebs", "_blank")
                }
              >
                <FaSnapchatGhost size={18} className="aside-icon" />
                <span>Snapchat</span>
              </button>

              <a
                href="tel:+447309843038"
                className="aside-item"
                aria-label="Call us at +44 7309 843038"
              >
                <FaPhoneAlt size={18} className="aside-icon" />
                <span>+44 7309 843038</span>
              </a>

              <button
                type="button"
                className="aside-item"
                onClick={() =>
                  window.open("mailto:litwebs@outlook.co.uk", "_blank")
                }
              >
                <MdEmail size={18} className="aside-icon" />
                <span>Email</span>
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
