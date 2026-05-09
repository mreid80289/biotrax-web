/**
 * Shared layout for /privacy-policy, /terms, /support, /faq.
 *
 * Renders:
 *  - Kicker (e.g. "LEGAL", "HELP")
 *  - Display-serif headline
 *  - Optional "Last updated" line in mono
 *  - Optional dim subhead paragraph
 *  - The page body content (paragraphs, lists, sections)
 *
 * Keeps the dark theme + typography rhythm consistent across all
 * secondary pages so they feel like part of the BioTrax product, not
 * stitched-on PDFs.
 *
 * Color values are intentionally hard-coded here (instead of imported
 * from App.jsx) to avoid a circular import with the rest of the app.
 * They mirror App.jsx's C object.
 */
import { useEffect } from 'react';

const C = {
  bg: '#0a0d0c',
  bgAlt: '#0f1413',
  ink: '#ffffff',
  inkDim: 'rgba(255,255,255,0.66)',
  inkMuted: 'rgba(255,255,255,0.42)',
  green: '#34d399',
  border: 'rgba(255,255,255,0.08)',
  borderStrong: 'rgba(255,255,255,0.14)',
};
const fontDisplay = '"Cormorant Garamond", "Times New Roman", Georgia, serif';
const fontBody = '"Inter", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';
const fontMono = '"JetBrains Mono", ui-monospace, Menlo, monospace';

export default function PageLayout({ kicker, title, lastUpdated, subhead, children, pageTitle }) {
  // Update document.title when this page mounts so /privacy-policy doesn't
  // keep the homepage's title (matters for browser tabs and SEO).
  useEffect(() => {
    if (pageTitle) {
      const previous = document.title;
      document.title = `${pageTitle} — BioTrax`;
      return () => { document.title = previous; };
    }
  }, [pageTitle]);

  // Snapshot mobile breakpoint at render time. Page content is mostly
  // text and reflows naturally on resize without re-evaluating sizes.
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  return (
    <main style={{
      padding: isMobile ? '64px 20px 80px' : '120px 48px 140px',
      borderTop: `1px solid ${C.border}`,
      minHeight: '60vh',
    }}>
      <article style={{
        maxWidth: 760,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? 18 : 24,
      }}>
        <header style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 12 }}>
          {kicker && (
            <div style={{ fontFamily: fontMono, fontSize: 12, color: C.green, letterSpacing: 1, fontWeight: 600 }}>
              {kicker}
            </div>
          )}
          <h1 style={{
            margin: 0, fontFamily: fontDisplay,
            fontSize: isMobile ? 44 : 64,
            fontWeight: 400, lineHeight: 1.0, letterSpacing: isMobile ? -0.8 : -1.2,
            color: C.ink,
          }}>
            {title}
          </h1>
          {lastUpdated && (
            <div style={{ fontFamily: fontMono, fontSize: 11, color: C.inkMuted, letterSpacing: 0.5, textTransform: 'uppercase' }}>
              Last updated: {lastUpdated}
            </div>
          )}
          {subhead && (
            <p style={{ margin: 0, fontFamily: fontBody, fontSize: isMobile ? 16 : 17, lineHeight: 1.6, color: C.inkDim, maxWidth: 640 }}>
              {subhead}
            </p>
          )}
        </header>
        <div className="biotrax-prose" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {children}
        </div>
      </article>
    </main>
  );
}

// Small typed building blocks used by the page content for consistency.
export function Section({ heading, children }) {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h2 style={{
        margin: 0, fontFamily: fontDisplay, fontSize: 28, fontWeight: 500,
        lineHeight: 1.2, letterSpacing: -0.4, color: C.ink,
      }}>{heading}</h2>
      {children}
    </section>
  );
}

export function P({ children }) {
  return (
    <p style={{
      margin: 0, fontFamily: fontBody, fontSize: 15.5,
      lineHeight: 1.7, color: C.inkDim,
    }}>{children}</p>
  );
}

export function UL({ children }) {
  return (
    <ul style={{
      margin: 0, paddingLeft: 22, fontFamily: fontBody, fontSize: 15.5,
      lineHeight: 1.7, color: C.inkDim, display: 'flex', flexDirection: 'column', gap: 6,
    }}>{children}</ul>
  );
}

export function Strong({ children }) {
  return <strong style={{ color: '#fff', fontWeight: 600 }}>{children}</strong>;
}
