import Image from "next/image";

interface TechItem {
  id: string;
  logoSrc: string;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
  description: string;
  href: string;
}

const techItems: TechItem[] = [
  {
    id: "azerocare",
    logoSrc: "/images/logo-azerocare-plus.svg",
    logoAlt: "Azerocare Plus®",
    logoWidth: 269,
    logoHeight: 48,
    description:
      "New technology Developed for surfaces in Lether, Matt and Lux® finish",
    href: "/en/azerocare-plus",
  },
  {
    id: "avp",
    logoSrc: "/images/logo-avp.png",
    logoAlt: "AVP",
    logoWidth: 308,
    logoHeight: 53,
    description: "Advanced Vein Process technology for natural stone",
    href: "/en/avp",
  },
  {
    id: "azerobact",
    logoSrc: "/images/logo-azerobact-plus.png",
    logoAlt: "Azerobact Plus",
    logoWidth: 253,
    logoHeight: 53,
    description: "Antibacterial technology for natural stone surfaces",
    href: "/en/azerobact-plus",
  },
];

export function TechnologySection() {
  return (
    <section
      style={{
        backgroundColor: "#090808",
        width: "100%",
        padding: "80px 0",
      }}
    >
      <div
        className="antolini-container"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "flex-start",
          gap: "60px",
          flexWrap: "wrap",
        }}
      >
        {techItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "20px",
              flex: 1,
              textDecoration: "none",
            }}
          >
            <Image
              src={item.logoSrc}
              alt={item.logoAlt}
              width={item.logoWidth}
              height={item.logoHeight}
              style={{ objectFit: "contain", height: "50px", width: "auto" }}
            />
            <p
              style={{
                fontSize: "14px",
                color: "#A18F7A",
                lineHeight: "1.6",
                maxWidth: "280px",
                margin: 0,
                fontFamily: "Lato, sans-serif",
                fontWeight: 300,
              }}
            >
              {item.description}
            </p>
            <span
              style={{
                fontSize: "13px",
                color: "#A18F7A",
                letterSpacing: "2px",
                textTransform: "uppercase",
                borderBottom: "1px solid #A18F7A",
                paddingBottom: "2px",
                fontFamily: "Lato, sans-serif",
              }}
            >
              Discover more
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
