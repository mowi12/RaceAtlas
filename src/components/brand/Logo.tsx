interface LogoProps {
  size?: number;
  className?: string;
}

/**
 * The RaceAtlas logo mark: a running figure (source artwork: `public/raceatlas-logo-black.svg`).
 * Fill uses `currentColor`, so set the color via the parent's text color (defaults to
 * foreground in the top bar).
 */
export function Logo({ size = 28, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 2000 2000"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      aria-hidden="true"
      className={className}
      style={{ color: "var(--foreground)" }}
    >
      <path
        d="M212.862,1825.876C681.973,1696.585 749.347,1681.62 1054.454,1491.88C993.552,1373.994 873.549,1296.474 862.007,1289.627C697.923,1524.113 429.005,1689.145 212.862,1825.876Z"
        transform="matrix(1.821995,0,0,1.98447,-337.834268,-1673.395623)"
      />
      <path
        d="M729.995,2119.423C1006.761,1371.369 332.712,1236.249 -60.696,1515.005C526.263,1429.874 819.88,1795.131 729.995,2119.423Z"
        transform="matrix(1.821995,0,0,1.98447,314.439941,-2350.099956)"
      />
      <path
        d="M1232,1364C1234.718,1292.153 1219.003,1241.229 1189.534,1181.966C1252.329,1176.771 1268.407,1174.511 1319.378,1144.781C1317.951,1241.969 1297.33,1280.826 1232,1364Z"
        transform="matrix(1.821995,0,0,1.98447,-453.900217,-1545.603824)"
      />
      <ellipse
        cx="1649.5"
        cy="323.5"
        rx="141.5"
        ry="155.5"
        transform="matrix(1.395361,0,0,1.472566,-682.823007,-197.391143)"
      />
    </svg>
  );
}
