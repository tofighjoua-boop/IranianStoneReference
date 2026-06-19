import Image from "next/image";
import { FacebookIcon, InstagramIcon } from "@/components/icons";

const footerLinks = [
  { label: "STORE LOCATOR", href: "/en/store-locator" },
  { label: "CONTACTS", href: "/en/contacts" },
  { label: "TERMS", href: "/en/condvendita.php" },
  { label: "LEGAL NOTES", href: "/en/legal-notes" },
  { label: "COOKIES", href: "/en/cookies" },
];

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#090808",
        color: "#A18F7A",
        width: "100%",
        padding: "60px 0 40px",
      }}
    >
      <div
        className="antolini-container"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "40px",
            flexWrap: "wrap",
          }}
        >
          {/* Left: logo + address */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <a href="/en/" style={{ display: "block", lineHeight: 0 }}>
              <Image
                src="/images/logo_white.png"
                alt="Antolini®"
                width={125}
                height={34}
                style={{ objectFit: "contain", height: "auto" }}
              />
            </a>
            <p
              style={{
                fontSize: "13px",
                color: "#A18F7A",
                lineHeight: "1.8",
                margin: 0,
                fontFamily: "Lato, sans-serif",
              }}
            >
              Antolini Luigi® &amp; C. S.p.a.
              <br />
              Sant&apos;Ambrogio di Valpolicella
              <br />
              VERONA
            </p>
          </div>

          {/* Middle: nav links */}
          <nav style={{ display: "flex", flexDirection: "column" }}>
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontSize: "13px",
                  color: "#A18F7A",
                  textDecoration: "none",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  lineHeight: "2.2",
                  fontFamily: "Lato, sans-serif",
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: social icons */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <a
              href="https://www.facebook.com/Antolini.Luigi"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#A18F7A", lineHeight: 0 }}
              aria-label="Facebook"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://www.instagram.com/Antolini/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#A18F7A", lineHeight: 0 }}
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            borderTop: "1px solid rgba(161,143,122,0.3)",
            paddingTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "11px",
            color: "#A18F7A",
            flexWrap: "wrap",
            gap: "12px",
            fontFamily: "Lato, sans-serif",
          }}
        >
          <span>P.IVA IT 0044809 023 3</span>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <a
              href="mailto:al.spa@pec.antolini.it"
              style={{ color: "#A18F7A", textDecoration: "none" }}
            >
              al.spa@pec.antolini.it
            </a>
            <a
              href="mailto:privacy@antolini.it"
              style={{ color: "#A18F7A", textDecoration: "none" }}
            >
              privacy@antolini.it
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
