"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // The root layout itself threw, so app components and globals.css are gone —
  // styles stay inline and self-contained. Like the segment error page, the raw
  // message is shown only in development; production surfaces just the digest.
  const isDev = process.env.NODE_ENV !== "production";

  return (
    <html lang="de">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px 24px",
          background: "#f1ede4",
          color: "#0e1612",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
        }}
      >
        <div style={{ maxWidth: 640 }}>
          <div
            style={{
              fontFamily: "ui-monospace, 'SFMono-Regular', monospace",
              fontSize: 11,
              letterSpacing: 2,
              color: "#d96a3f",
              marginBottom: 16,
            }}
          >
            ERROR · 500
          </div>
          <h1
            style={{
              fontSize: 56,
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            The atlas lost its bearings.
          </h1>
          <p
            style={{
              marginTop: 20,
              fontSize: 17,
              lineHeight: 1.55,
              color: "#3d4a44",
            }}
          >
            Something on our side gave way. Try again, and if it keeps happening
            the cartographers are already on it.
          </p>
          <div
            style={{
              marginTop: 24,
              border: "1px solid #0e1612",
              background: "#e8e3d6",
              padding: "10px 12px",
              fontFamily: "ui-monospace, 'SFMono-Regular', monospace",
              fontSize: 11,
              letterSpacing: 1,
              lineHeight: 1.7,
              color: "#3d4a44",
            }}
          >
            <div>
              <span style={{ color: "#7d8479" }}>REF&nbsp;&nbsp;&nbsp;</span>
              {error.digest ?? "—"}
            </div>
            {isDev && error.message ? (
              <div style={{ marginTop: 6 }}>
                <span style={{ color: "#7d8479" }}>MSG&nbsp;&nbsp;</span>
                {error.message}
              </div>
            ) : null}
          </div>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 28,
              background: "#0e1612",
              color: "#f1ede4",
              border: "none",
              padding: "14px 24px",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.06em",
              cursor: "pointer",
            }}
          >
            TRY AGAIN ↻
          </button>
        </div>
      </body>
    </html>
  );
}
