"use client";

import { useState } from "react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section
      style={{
        backgroundColor: "#F0F0F0",
        padding: "80px 40px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: "560px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "11px",
            color: "#777373",
            letterSpacing: "3px",
            textTransform: "uppercase",
            margin: 0,
            fontFamily: "Lato, sans-serif",
          }}
        >
          NEWSLETTER
        </p>
        <h2
          style={{
            fontSize: "22px",
            color: "#A18F7A",
            letterSpacing: "4px",
            textTransform: "uppercase",
            fontWeight: 300,
            margin: 0,
            fontFamily: "Lato, sans-serif",
          }}
        >
          STAY UPDATED
        </h2>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-MAIL"
              required
              style={{
                width: "100%",
                border: "none",
                borderBottom: "1px solid #A18F7A",
                padding: "12px 0",
                fontSize: "14px",
                color: "#A18F7A",
                background: "transparent",
                outline: "none",
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontFamily: "Lato, sans-serif",
              }}
            />
            <p
              style={{
                fontSize: "11px",
                color: "#777373",
                lineHeight: "1.6",
                margin: 0,
                fontFamily: "Lato, sans-serif",
              }}
            >
              I have read and authorize the use of my personal data. * Required
              field
            </p>
            <button
              type="submit"
              style={{
                backgroundColor: "#A18F7A",
                color: "white",
                border: "none",
                padding: "14px 40px",
                fontSize: "13px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                cursor: "pointer",
                fontFamily: "Lato, sans-serif",
                fontWeight: 400,
              }}
            >
              SUBSCRIBE
            </button>
          </form>
        ) : (
          <p
            style={{
              fontSize: "16px",
              color: "#A18F7A",
              fontFamily: "Lato, sans-serif",
            }}
          >
            Thank you for subscribing!
          </p>
        )}
      </div>
    </section>
  );
}
