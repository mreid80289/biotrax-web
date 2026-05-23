import { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link, NavLink } from 'react-router-dom';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import Terms from './pages/Terms.jsx';
import Support from './pages/Support.jsx';
import FAQ from './pages/FAQ.jsx';
import About from './pages/About.jsx';

const C = {
  bg: '#0a0d0c',
  bgAlt: '#0f1413',
  ink: '#ffffff',
  inkDim: 'rgba(255,255,255,0.66)',
  inkMuted: 'rgba(255,255,255,0.42)',
  green: '#34d399',
  greenDeep: '#10b981',
  blue: '#3b82f6',
  amber: '#fbbf24',
  coral: '#fb923c',
  border: 'rgba(255,255,255,0.08)',
  borderStrong: 'rgba(255,255,255,0.14)',
  paper: '#f5f3ef',
  paperInk: '#0a0d0c',
};

const fontDisplay = '"Cormorant Garamond", "Times New Roman", Georgia, serif';
const fontBody = '"Inter", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';
const fontMono = '"JetBrains Mono", ui-monospace, Menlo, monospace';

// ─────────────────────────── Responsive hook ───────────────────────────
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= breakpoint : false
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [breakpoint]);
  return isMobile;
}

function useIsWide(breakpoint = 1150) {
  const [isWide, setIsWide] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= breakpoint : false
  );
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const handler = (e) => setIsWide(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [breakpoint]);
  return isWide;
}

// ─────────────────────────── iPhone frame ───────────────────────────
function IPhone({ src, width = 280, alt, style = {}, shadow = true, tilt = 0, innerStyle = {}, imgStyle = {}, eager = false }) {
  const aspect = 2796 / 1290;
  const height = width * aspect;
  const radius = width * 0.135;
  const bezel = Math.max(4, width * 0.022);
  const screenRadius = radius - bezel * 0.65;
  return (
    <div style={{
      width, height,
      borderRadius: radius,
      background: 'linear-gradient(135deg, #b8c9b8 0%, #8aa898 22%, #6e8c7a 50%, #95b09e 80%, #c8d6c5 100%)',
      padding: bezel,
      boxShadow: shadow ? '0 40px 80px rgba(0,0,0,0.5), 0 12px 32px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.22), inset 0 0 0 1.5px rgba(0,0,0,0.5)' : 'none',
      position: 'relative',
      transform: tilt ? `rotate(${tilt}deg)` : undefined,
      flexShrink: 0,
      ...style,
    }}>
      <div style={{ position: 'absolute', left: -1.5, top: '14%', width: 2, height: '4%', background: '#5a7268', borderRadius: 1.5 }} />
      <div style={{ position: 'absolute', left: -1.5, top: '22%', width: 2, height: '7%', background: '#5a7268', borderRadius: 1.5 }} />
      <div style={{ position: 'absolute', left: -1.5, top: '32%', width: 2, height: '7%', background: '#5a7268', borderRadius: 1.5 }} />
      <div style={{ position: 'absolute', right: -1.5, top: '24%', width: 2, height: '12%', background: '#5a7268', borderRadius: 1.5 }} />
      <div style={{
        width: '100%', height: '100%',
        borderRadius: screenRadius,
        background: '#000',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: 'inset 0 0 0 1.5px #000',
        ...innerStyle,
      }}>
        <img
          src={src}
          alt={alt || ''}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          fetchpriority={eager ? 'high' : undefined}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'top center',
            display: 'block',
            ...imgStyle,
          }}
        />
        <div style={{
          position: 'absolute',
          top: width * 0.030,
          left: '50%',
          transform: 'translateX(-50%)',
          width: width * 0.30,
          height: width * 0.078,
          background: '#000',
          borderRadius: 999,
          zIndex: 2,
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)',
        }} />
      </div>
    </div>
  );
}

// ─────────────────────────── Tilt Phone ───────────────────────────
function TiltPhone({ src, width = 360, alt }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, mx: 50, my: 50, active: false });

  useEffect(() => {
    let raf;
    const start = performance.now();
    const loop = (t) => {
      const dt = (t - start) / 1000;
      setTilt((s) => s.active ? s : ({
        x: Math.sin(dt * 0.6) * 6,
        y: Math.cos(dt * 0.45) * 8,
        mx: 50 + Math.cos(dt * 0.5) * 18,
        my: 50 + Math.sin(dt * 0.6) * 14,
        active: false,
      }));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTilt({ x: (0.5 - py) * 22, y: (px - 0.5) * 26, mx: px * 100, my: py * 100, active: true });
  };
  const onLeave = () => setTilt((s) => ({ ...s, active: false }));

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        position: 'relative',
        perspective: 1400,
        cursor: 'pointer',
        padding: '40px 20px',
      }}
    >
      <div className={tilt.active ? '' : 'biotrax-breath'} style={{
        position: 'absolute',
        width: 480, height: 480,
        left: `calc(${tilt.mx}% - 240px)`,
        top: `calc(${tilt.my}% - 240px)`,
        background: 'radial-gradient(circle, rgba(52,211,153,0.42), transparent 60%)',
        filter: 'blur(48px)',
        pointerEvents: 'none',
        transition: tilt.active ? 'none' : 'left 0.8s ease-out, top 0.8s ease-out',
      }} />
      <div style={{
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: 'preserve-3d',
        transition: tilt.active ? 'transform 0.08s linear' : 'transform 0.6s cubic-bezier(.2,.7,.3,1)',
        position: 'relative',
        willChange: 'transform',
      }}>
        <IPhone
          src={src}
          width={width}
          alt={alt}
          eager
          innerStyle={{
            backgroundImage: `radial-gradient(circle at ${tilt.mx}% ${tilt.my}%, rgba(255,255,255,0.18), transparent 45%)`,
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(circle at ${tilt.mx}% ${tilt.my}%, rgba(255,255,255,0.14), transparent 38%)`,
          mixBlendMode: 'screen',
          borderRadius: width * 0.135,
          pointerEvents: 'none',
          transition: tilt.active ? 'none' : 'background 0.6s ease-out',
        }} />
        <div className="biotrax-chip biotrax-chip-score" style={{
          position: 'absolute',
          left: '-18%', top: '36%',
          transform: 'translateZ(60px)',
          background: 'rgba(10,16,14,0.85)',
          backdropFilter: 'blur(12px)',
          border: `1px solid rgba(52,211,153,0.4)`,
          borderRadius: 14,
          padding: '10px 14px',
          fontFamily: fontMono,
          fontSize: 11,
          color: C.green,
          letterSpacing: 0.6,
          boxShadow: '0 16px 40px rgba(0,0,0,0.55), 0 0 24px rgba(52,211,153,0.25)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}>
          <span className="biotrax-chip-dot" style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: C.green, boxShadow: `0 0 8px ${C.green}`, marginRight: 8, verticalAlign: 'middle' }} />
          SCORE 77
        </div>
        <div className="biotrax-chip biotrax-chip-stress" style={{
          position: 'absolute',
          right: '-22%', top: '14%',
          transform: 'translateZ(80px)',
          background: 'rgba(10,16,14,0.85)',
          backdropFilter: 'blur(12px)',
          border: `1px solid ${C.borderStrong}`,
          borderRadius: 14,
          padding: '10px 14px',
          fontFamily: fontMono,
          fontSize: 10.5,
          color: C.inkDim,
          letterSpacing: 0.6,
          boxShadow: '0 16px 40px rgba(0,0,0,0.55)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}>
          <span className="biotrax-chip-dot" style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: C.blue, boxShadow: `0 0 8px ${C.blue}`, marginRight: 8, verticalAlign: 'middle' }} />
          STRESS MODERATE
        </div>
        <div className="biotrax-chip biotrax-chip-contact" style={{
          position: 'absolute',
          right: '-14%', bottom: '20%',
          transform: 'translateZ(50px)',
          background: 'rgba(10,16,14,0.85)',
          backdropFilter: 'blur(12px)',
          border: `1px solid ${C.borderStrong}`,
          borderRadius: 14,
          padding: '10px 14px',
          fontFamily: fontMono,
          fontSize: 10.5,
          color: C.inkDim,
          letterSpacing: 0.6,
          boxShadow: '0 16px 40px rgba(0,0,0,0.55)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}>
          <span className="biotrax-chip-dot" style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: C.green, boxShadow: `0 0 8px ${C.green}`, marginRight: 8, verticalAlign: 'middle' }} />
          CONTACT LINKED
        </div>
      </div>
      <div style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        fontFamily: fontMono, fontSize: 10, color: C.inkMuted, letterSpacing: 1.5,
        opacity: tilt.active ? 0 : 0.7,
        transition: 'opacity 0.4s',
        pointerEvents: 'none',
      }}>
        ↻ MOVE YOUR CURSOR
      </div>
    </div>
  );
}

// ─────────────────────────── Logo ───────────────────────────
function Logo({ size = 28 }) {
  return (
    <img
      src="/biotrax-logo.png"
      alt="BioTrax"
      style={{
        height: size, width: 'auto', display: 'block',
        objectFit: 'cover', objectPosition: 'top center',
        aspectRatio: '1 / 1',
      }}
    />
  );
}

// ─────────────────────────── Nav ───────────────────────────
function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { pathname } = useLocation();

  // Smooth-scroll to an in-page anchor. If the user isn't currently on
  // the homepage, navigate there first and let the hash do the scroll
  // after the homepage renders.
  const goToAnchor = (id) => {
    setMenuOpen(false);
    if (pathname === '/') {
      // Already on home — scroll directly.
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 30);
    } else {
      // Different page — go home with the hash, then the homepage's
      // mount effect (smooth scroll-behavior on <html>) handles the jump.
      window.location.href = `/#${id}`;
    }
  };

  // Mix of in-page anchors (homepage sections) and real routes (FAQ, Support).
  const links = [
    { l: 'How It Works',   kind: 'anchor', target: 'how-it-works' },
    { l: 'About',          kind: 'route',  target: '/about' },
    { l: 'FAQ',            kind: 'route',  target: '/faq' },
    { l: 'Support',        kind: 'route',  target: '/support' },
    { l: 'Stay Connected', kind: 'anchor', target: 'shared-support' },
  ];

  // Brand mark click — always goes home.
  const goHome = () => {
    setMenuOpen(false);
    if (pathname !== '/') window.location.href = '/';
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(10,13,12,0.7)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: `1px solid ${C.border}`,
      padding: isMobile ? '12px 20px' : '14px 48px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      fontFamily: fontBody,
    }}>
      <button onClick={goHome} aria-label="BioTrax — home" style={{
        background: 'transparent', border: 'none', padding: 0, cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <Logo size={26} />
        <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: -0.2, color: C.ink }}>BioTrax <em style={{ fontFamily: fontDisplay, fontStyle: 'italic', fontWeight: 500, color: C.green, letterSpacing: 0 }}>Sense</em></span>
      </button>

      {!isMobile && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {links.map(({ l, kind, target }) =>
              kind === 'route' ? (
                <Link key={l} to={target}
                  style={{ fontSize: 13.5, color: C.inkDim, textDecoration: 'none', fontWeight: 450 }}>{l}</Link>
              ) : (
                <a key={l} href={`/#${target}`}
                  onClick={(e) => { e.preventDefault(); goToAnchor(target); }}
                  style={{ fontSize: 13.5, color: C.inkDim, textDecoration: 'none', fontWeight: 450 }}>{l}</a>
              )
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={() => goToAnchor('waitlist')}
              style={{
                background: C.green, color: '#04201a',
                border: 'none', padding: '9px 18px', borderRadius: 999,
                fontSize: 13.5, fontWeight: 600, cursor: 'pointer',
                fontFamily: fontBody,
              }}>Join Waitlist</button>
          </div>
        </>
      )}

      {isMobile && (
        <button
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            width: 40, height: 40, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 5, padding: 0,
          }}>
          <span style={{
            display: 'block', width: 22, height: 1.5, background: C.ink,
            transition: 'transform 0.25s, opacity 0.25s',
            transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
          }} />
          <span style={{
            display: 'block', width: 22, height: 1.5, background: C.ink,
            transition: 'opacity 0.2s',
            opacity: menuOpen ? 0 : 1,
          }} />
          <span style={{
            display: 'block', width: 22, height: 1.5, background: C.ink,
            transition: 'transform 0.25s',
            transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
          }} />
        </button>
      )}

      {isMobile && menuOpen && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0, bottom: 0,
          background: 'rgba(10,13,12,0.98)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          padding: '32px 24px',
          display: 'flex', flexDirection: 'column', gap: 4,
          zIndex: 49,
          animation: 'fadeIn 0.2s ease-out',
        }}>
          {links.map(({ l, kind, target }) =>
            kind === 'route' ? (
              <Link
                key={l}
                to={target}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: fontDisplay, fontSize: 32, fontWeight: 400,
                  color: C.ink, textDecoration: 'none',
                  padding: '16px 4px',
                  borderBottom: `1px solid ${C.border}`,
                  letterSpacing: -0.5,
                }}>{l}</Link>
            ) : (
              <a
                key={l}
                href={`/#${target}`}
                onClick={(e) => { e.preventDefault(); goToAnchor(target); }}
                style={{
                  fontFamily: fontDisplay, fontSize: 32, fontWeight: 400,
                  color: C.ink, textDecoration: 'none',
                  padding: '16px 4px',
                  borderBottom: `1px solid ${C.border}`,
                  letterSpacing: -0.5,
                }}>{l}</a>
            )
          )}
          <button
            onClick={() => goToAnchor('waitlist')}
            style={{
              marginTop: 16,
              background: C.green, color: '#04201a',
              border: 'none', padding: '16px 24px', borderRadius: 999,
              fontSize: 16, fontWeight: 600, cursor: 'pointer',
              fontFamily: fontBody,
              boxShadow: `0 0 32px rgba(52,211,153,0.35)`,
            }}>Join the Waitlist →</button>
        </div>
      )}
    </nav>
  );
}

// ─────────────────────────── Hero ───────────────────────────
function Hero({ headline }) {
  const isMobile = useIsMobile();
  return (
    <section style={{
      position: 'relative',
      padding: isMobile ? '48px 20px 64px' : '90px 48px 110px',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 60% at 75% 50%, rgba(52,211,153,0.18), transparent 60%)',
      }} />
      <div style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1.05fr 0.95fr',
        gap: isMobile ? 40 : 64,
        alignItems: 'center',
        maxWidth: 1280,
        margin: '0 auto',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 20 : 28, order: isMobile ? 2 : 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, alignSelf: 'flex-start',
            border: `1px solid ${C.borderStrong}`, padding: '6px 12px', borderRadius: 999,
            fontFamily: fontMono, fontSize: 11, color: C.inkDim, letterSpacing: 0.4 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.green, boxShadow: `0 0 8px ${C.green}`, flexShrink: 0 }} />
            CLOSED BETA · iOS + APPLE WATCH
          </div>
          <h1 style={{
            margin: 0,
            fontFamily: fontDisplay,
            fontSize: isMobile ? 48 : 84,
            fontWeight: 400,
            lineHeight: 0.98,
            letterSpacing: isMobile ? -0.8 : -1.5,
            color: C.ink,
          }}>
            {headline.h1.map((part, i) => (
              <span key={i} style={part.italic ? { fontStyle: 'italic', color: C.green } : {}}>{part.t}</span>
            ))}
          </h1>
          <p style={{
            margin: 0,
            fontFamily: fontBody,
            fontSize: isMobile ? 17 : 21,
            lineHeight: 1.4,
            color: C.ink,
            maxWidth: 520,
            fontWeight: 500,
            letterSpacing: -0.2,
          }}>
            An invisible mental health early-warning system for <span style={{ color: C.green }}>iPhone</span> and <span style={{ color: C.green }}>Apple Watch</span>.
          </p>
          <p style={{
            margin: 0, fontFamily: fontBody, fontSize: isMobile ? 15 : 17, lineHeight: 1.55,
            color: C.inkDim, maxWidth: 480, fontWeight: 400,
          }}>
            {headline.sub}
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 8, flexWrap: 'wrap' }}>
            <button
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: C.green, color: '#04201a', border: 'none',
                padding: '14px 24px', borderRadius: 999, fontSize: 15, fontWeight: 600,
                cursor: 'pointer', fontFamily: fontBody,
                boxShadow: `0 0 32px rgba(52,211,153,0.35)`,
              }}>Join the Waitlist →</button>
            <button
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'transparent', color: C.ink,
                border: `1px solid ${C.borderStrong}`,
                padding: '14px 24px', borderRadius: 999, fontSize: 15, fontWeight: 500,
                cursor: 'pointer', fontFamily: fontBody,
              }}>See how it works</button>
          </div>
          <div style={{ display: 'flex', gap: isMobile ? 20 : 28, marginTop: 16, paddingTop: 24, borderTop: `1px solid ${C.border}` }}>
            {[
              ['100%', 'Encrypted by default'],
              ['0', 'Daily check-ins'],
              ['1', 'Trusted contact'],
            ].map(([v, l]) => (
              <div key={l} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <div style={{ fontFamily: fontDisplay, fontSize: isMobile ? 22 : 28, fontWeight: 400, color: C.ink, letterSpacing: -0.5 }}>{v}</div>
                <div style={{ fontFamily: fontMono, fontSize: isMobile ? 9.5 : 10.5, color: C.inkMuted, letterSpacing: 0.5, textTransform: 'uppercase' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ order: isMobile ? 1 : 2, display: 'flex', justifyContent: 'center' }}>
          <TiltPhone src="/assets/home.png" width={isMobile ? 240 : 360} alt="BioTrax Baseline Score home screen" />
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────── What It Tracks ───────────────────────────
function Tracks() {
  const isMobile = useIsMobile();
  const isWide = useIsWide();
  const items = [
    {
      kicker: '01 / SLEEP',
      title: 'Sleep architecture, scored.',
      body: 'Total time, efficiency, continuity, breathing rate. Below 5h or above 10h, BioTrax surfaces a quiet check-in.',
      src: '/assets/sleep.png',
      accent: C.amber,
    },
    {
      kicker: '02 / STRESS',
      title: 'Stress, watched all day.',
      body: 'Continuous heart rate variability (HRV) from the Apple Watch — the most studied physiological signal of nervous system load and stress resilience.',
      src: '/assets/stress.png',
      accent: C.coral,
    },
    {
      kicker: '03 / ISOLATION',
      title: 'Time at home, watched gently.',
      body: 'A 72-hour rolling window of consecutive home stay. Subtle, never punitive.',
      src: '/assets/location.png',
      accent: C.green,
    },
    {
      kicker: '04 / CONNECTION',
      title: 'Communication vs. doomscroll.',
      body: 'Active comms minutes versus passive social media — the cleanest signal of social withdrawal.',
      src: '/assets/social.png',
      accent: C.blue,
    },
  ];
  return (
    <section style={{ padding: isMobile ? '64px 20px' : '120px 48px', borderTop: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionHeader
          kicker="WHAT IT WATCHES"
          title={[{ t: 'Four quiet signals.\n' }, { t: 'No journaling required.', italic: true }]}
          sub="Apple Watch and Screen Time API do the work in the background. You just live your day."
        />
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: isMobile ? 16 : 18, marginTop: isMobile ? 40 : 72 }}>
          {items.map((it) => (
            <div key={it.kicker} style={{
              border: `1px solid ${C.border}`, borderRadius: 24,
              background: C.bgAlt, padding: 24, display: 'flex', flexDirection: 'column', gap: 16,
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: -1, left: 24, width: 40, height: 2,
                background: it.accent,
              }} />
              <div style={{ fontFamily: fontMono, fontSize: 11, color: it.accent, letterSpacing: 1, fontWeight: 600 }}>{it.kicker}</div>
              <h3 style={{ margin: 0, fontFamily: fontDisplay, fontSize: isWide ? 26 : 24, fontWeight: 400, lineHeight: 1.05, letterSpacing: -0.5, color: C.ink }}>{it.title}</h3>
              <p style={{ margin: 0, fontFamily: fontBody, fontSize: 13.5, lineHeight: 1.55, color: C.inkDim }}>{it.body}</p>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8, paddingTop: 8 }}>
                <IPhone src={it.src} width={isWide ? 200 : 170} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────── How It Works ───────────────────────────
function HowItWorks() {
  const isMobile = useIsMobile();
  const steps = [
    { n: '01', t: 'Pair your watch', d: 'BioTrax pulls sleep, HRV and steps through HealthKit. No setup beyond one tap.' },
    { n: '02', t: 'Choose a trusted contact', d: 'One person in your corner. They get a quiet alert only if your Baseline Score falls below 40.' },
    { n: '03', t: 'Live your life', d: 'No daily check-ins. The app learns your patterns and surfaces a nudge only when needed.' },
  ];
  return (
    <section id="how-it-works" style={{ padding: isMobile ? '64px 20px' : '120px 48px', borderTop: `1px solid ${C.border}`, background: C.bgAlt }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionHeader
          kicker="HOW IT WORKS"
          title={[{ t: 'Set it once.\n' }, { t: 'It does the rest.', italic: true }]}
        />
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 28 : 32, marginTop: isMobile ? 40 : 64 }}>
          {steps.map((s, i) => (
            <div key={s.n} style={{ position: 'relative', paddingTop: 28 }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: C.borderStrong }} />
              <div style={{ position: 'absolute', top: -4, left: 0, width: 80, height: 8, background: C.green, opacity: i === 0 ? 1 : 0.3 }} />
              <div style={{ fontFamily: fontMono, fontSize: 12, color: C.green, letterSpacing: 1, fontWeight: 600 }}>STEP {s.n}</div>
              <h3 style={{ margin: '12px 0 12px', fontFamily: fontDisplay, fontSize: isMobile ? 28 : 36, fontWeight: 400, lineHeight: 1.05, letterSpacing: -0.5, color: C.ink }}>{s.t}</h3>
              <p style={{ margin: 0, fontFamily: fontBody, fontSize: 15, lineHeight: 1.55, color: C.inkDim, maxWidth: 320 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────── Shared Support ───────────────────────────
function PhoneWithLabel({ src, label, sublabel, width, tilt }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <IPhone src={src} width={width} tilt={tilt} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <div style={{
          fontFamily: fontMono, fontSize: 11, fontWeight: 600, letterSpacing: 1.5,
          color: C.green, textTransform: 'uppercase',
          border: `1px solid rgba(52,211,153,0.35)`,
          background: 'rgba(52,211,153,0.06)',
          borderRadius: 999,
          padding: '5px 14px',
        }}>{label}</div>
        {sublabel && (
          <div style={{
            fontFamily: fontBody, fontSize: 12, color: C.inkMuted,
            fontStyle: 'italic', textAlign: 'center',
          }}>{sublabel}</div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────── Stress Section ───────────────────────────
function StressSection() {
  const isMobile = useIsMobile();
  return (
    <section style={{ padding: isMobile ? '64px 20px' : '140px 48px', borderTop: `1px solid ${C.border}`, position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: '15%', right: '5%', width: 480, height: 480,
        background: 'radial-gradient(circle, rgba(251,146,60,0.12), transparent 60%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '0.95fr 1.05fr', gap: isMobile ? 40 : 80, alignItems: 'center', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'center', order: isMobile ? 1 : 1 }}>
          <IPhone src="/assets/stress.png" width={isMobile ? 240 : 320} tilt={-2} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 18 : 24, order: 2 }}>
          <div style={{ fontFamily: fontMono, fontSize: 12, color: C.coral, letterSpacing: 1, fontWeight: 600 }}>STRESS · THE PRIMARY DRIVER</div>
          <h2 style={{ margin: 0, fontFamily: fontDisplay, fontSize: isMobile ? 40 : 64, fontWeight: 400, lineHeight: 1.0, letterSpacing: -1, color: C.ink }}>
            The first thing to slip <span style={{ fontStyle: 'italic', color: C.coral }}>isn't mood.</span>
          </h2>
          <p style={{ margin: 0, fontFamily: fontBody, fontSize: isMobile ? 15 : 16, lineHeight: 1.6, color: C.inkDim, maxWidth: 540 }}>
            Unchecked burnout is the most established precursor to depressive episodes. Before mood crashes, chronic stress drives measurable drops in your heart rate variability (HRV) and dysregulates your nervous system. BioTrax tracks these exact biomarkers continuously through your Apple Watch, catching the slide before it happens.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 8 }}>
            {[
              ['Research-backed HRV', 'Continuous SDNN and RMSSD readings — heart rate variability metrics studied for decades in stress and mental-health research.'],
              ['Patterns, not check-ins', 'Weeks of context, not anxious daily questions. Stress trends often shift weeks before a depressive slump begins.'],
              ['The earliest signal', 'Reduced HRV is one of the first measurable changes in nervous system collapse.'],
            ].map(([t, d]) => (
              <div key={t} style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: 14, alignItems: 'flex-start' }}>
                <div className="bullet-pulse" style={{ width: 8, height: 8, borderRadius: '50%', background: C.coral, marginTop: 7, '--pulse-color': 'rgba(251,146,60,0.55)' }} />
                <div>
                  <div style={{ fontFamily: fontBody, fontSize: 15, fontWeight: 600, color: C.ink }}>{t}</div>
                  <div style={{ fontFamily: fontBody, fontSize: 14, color: C.inkDim, marginTop: 2 }}>{d}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 12,
            paddingTop: 16,
            borderTop: `1px solid ${C.border}`,
            fontFamily: fontMono, fontSize: 11, color: C.inkMuted, letterSpacing: 0.4,
          }}>
            BACKED BY PEER-REVIEWED RESEARCH · HPA AXIS · HRV BIOMARKERS
          </div>
        </div>
      </div>
    </section>
  );
}

function CoachSection() {
  const isMobile = useIsMobile();
  return (
    <section id="shared-support" style={{ padding: isMobile ? '64px 20px' : '140px 48px', borderTop: `1px solid ${C.border}`, position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: '20%', left: '10%', width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(52,211,153,0.10), transparent 60%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 40 : 80, alignItems: 'center', position: 'relative' }}>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: isMobile ? 18 : 28, order: isMobile ? 2 : 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            border: `1px solid ${C.borderStrong}`,
            background: 'rgba(52,211,153,0.06)',
            padding: '7px 16px', borderRadius: 999,
            fontFamily: fontMono, fontSize: 11, color: C.green, letterSpacing: 1.2, fontWeight: 600,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.green, boxShadow: `0 0 8px ${C.green}` }} />
            ONE APP · TWO PROFILES
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: isMobile ? 14 : 32, alignItems: 'flex-end' }}>
            <PhoneWithLabel src="/assets/member.png" label="Your View"      sublabel="your daily companion" width={isMobile ? 150 : 260} tilt={-3} />
            <PhoneWithLabel src="/assets/coach.jpg"  label="Companion View" sublabel="their gentle view"     width={isMobile ? 150 : 260} tilt={3} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 18 : 24, order: isMobile ? 1 : 2 }}>
          <div style={{ fontFamily: fontMono, fontSize: 12, color: C.green, letterSpacing: 1, fontWeight: 600 }}>SHARED SUPPORT</div>
          <h2 style={{ margin: 0, fontFamily: fontDisplay, fontSize: isMobile ? 40 : 64, fontWeight: 400, lineHeight: 1.0, letterSpacing: -1, color: C.ink }}>
            Better with someone <span style={{ fontStyle: 'italic', color: C.green }}>in your corner.</span>
          </h2>
          <p style={{ margin: 0, fontFamily: fontBody, fontSize: isMobile ? 15 : 16, lineHeight: 1.6, color: C.inkDim, maxWidth: 480 }}>
            BioTrax can stay just yours. When you're ready, one tap invites someone you trust — a partner, a friend, a clinician — to act as your safety net. Same app. Companion profile. Only what you've chosen to share.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 8 }}>
            {[
              ['One-tap invitation', 'Send a private code. Your contact installs BioTrax and joins in seconds — no separate account, no separate app.'],
              ['You choose what they see', 'Toggle each signal on, off, or paused — anytime. Pause sharing entirely with one switch.'],
              ['Check-ins on your rhythm', 'Pick days that work for both of you. One tap to say "I\'m here." No streaks to maintain, no guilt for missed days.'],
              ['A gentle voice for both', 'BioTrax surfaces a small action for you. Your contact sees a calm overview — never raw data.'],
            ].map(([t, d]) => (
              <div key={t} style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: 14, alignItems: 'flex-start' }}>
                <div className="bullet-pulse" style={{ width: 8, height: 8, borderRadius: '50%', background: C.green, marginTop: 7, '--pulse-color': 'rgba(52,211,153,0.55)' }} />
                <div>
                  <div style={{ fontFamily: fontBody, fontSize: 15, fontWeight: 600, color: C.ink }}>{t}</div>
                  <div style={{ fontFamily: fontBody, fontSize: 14, color: C.inkDim, marginTop: 2 }}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────── Weekly Report ───────────────────────────
function WeeklyReport() {
  const isMobile = useIsMobile();
  return (
    <section style={{ padding: isMobile ? '64px 20px' : '140px 48px', borderTop: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 0.9fr', gap: isMobile ? 40 : 80, alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 18 : 24, order: isMobile ? 2 : 1 }}>
          <div style={{ fontFamily: fontMono, fontSize: 12, color: C.blue, letterSpacing: 1, fontWeight: 600 }}>WEEKLY BEHAVIOURAL REPORT</div>
          <h2 style={{ margin: 0, fontFamily: fontDisplay, fontSize: isMobile ? 40 : 64, fontWeight: 400, lineHeight: 1.0, letterSpacing: -1, color: C.ink }}>
            Seven days of patterns, <span style={{ fontStyle: 'italic', color: C.blue }}>read like a story.</span>
          </h2>
          <p style={{ margin: 0, fontFamily: fontBody, fontSize: isMobile ? 15 : 16, lineHeight: 1.6, color: C.inkDim, maxWidth: 480 }}>
            Every Sunday, BioTrax compiles a private report on your stress, sleep, location and connection. No charts to decode — just plain language about how the week actually went.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
            {[
              ['Stress patterns', '52/100 avg, peaks 10 AM–3 PM'],
              ['Sleep patterns', '6.2 h avg · 58/100 score'],
              ['Home stay', 'Stable · 3 of 7 days >12h'],
              ['Connection', 'Active comms 1h 5m daily'],
            ].map(([t, d]) => (
              <div key={t} style={{ borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
                <div style={{ fontFamily: fontBody, fontSize: 14, fontWeight: 600, color: C.ink }}>{t}</div>
                <div style={{ fontFamily: fontMono, fontSize: 12, color: C.inkDim, marginTop: 4, letterSpacing: 0.2 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', order: isMobile ? 1 : 2 }}>
          <IPhone src="/assets/report.png" width={isMobile ? 240 : 320} tilt={2} />
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────── Caregivers ───────────────────────────
function Caregivers() {
  const isMobile = useIsMobile();
  return (
    <section style={{ padding: isMobile ? '64px 20px' : '120px 48px', borderTop: `1px solid ${C.border}`, background: C.bgAlt }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: isMobile ? 18 : 24 }}>
        <div style={{ fontFamily: fontMono, fontSize: 12, color: C.green, letterSpacing: 1, fontWeight: 600 }}>FOR THE PEOPLE WHO CARE</div>
        <h2 style={{ margin: 0, fontFamily: fontDisplay, fontSize: isMobile ? 40 : 72, fontWeight: 400, lineHeight: 1.0, letterSpacing: isMobile ? -0.8 : -1.2, color: C.ink, maxWidth: 900 }}>
          They get a heads-up. <span style={{ fontStyle: 'italic', color: C.green }}>You stay in control.</span>
        </h2>
        <p style={{ margin: 0, fontFamily: fontBody, fontSize: isMobile ? 15 : 17, lineHeight: 1.55, color: C.inkDim, maxWidth: 600 }}>
          Trusted contacts see a gentle overview — patterns, not raw data. They get a quiet alert if your Baseline Score drops below 40 — with a tap to reach out.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 24, marginTop: isMobile ? 28 : 48, width: '100%', textAlign: 'left' }}>
          {[
            { who: "IF YOU'RE THE USER", t: 'No surveillance.', items: ['No daily mood prompts', 'No streaks to maintain', 'You choose what your contact sees', 'Pause sharing anytime'] },
            { who: "IF YOU'RE THE CONTACT", t: 'An overview, not a feed.', items: ['A Baseline Score and status — updated when they sync', 'Patterns across sleep, stress, social and home', 'Send a gentle nudge in one tap', 'Only what they\'ve chosen to share'] },
          ].map((c, i) => (
            <div key={i} style={{
              border: `1px solid ${C.border}`, borderRadius: 24, padding: isMobile ? 24 : 32,
              background: C.bg, display: 'flex', flexDirection: 'column', gap: 14,
            }}>
              <div style={{ fontFamily: fontMono, fontSize: 11, color: C.green, letterSpacing: 1, fontWeight: 600 }}>{c.who}</div>
              <div style={{ fontFamily: fontDisplay, fontSize: isMobile ? 28 : 36, fontWeight: 400, color: C.ink, letterSpacing: -0.5 }}>{c.t}</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginTop: 6 }}>
                {c.items.map(x => (
                  <li key={x} style={{ display: 'grid', gridTemplateColumns: '14px 1fr', gap: 10, fontFamily: fontBody, fontSize: 14.5, color: C.inkDim }}>
                    <span style={{ color: C.green, fontWeight: 600 }}>—</span>{x}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────── Score Playground ───────────────────────────
function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }
function tierForSleep(v)  { return v >= 60 ? C.green : v >= 40 ? C.amber : '#ef4444'; }
function tierForStress(v) { return v <= 30 ? C.green : v <= 60 ? C.amber : '#ef4444'; }
function tierForSocial(v) { return v >= 60 ? C.green : v >= 40 ? C.amber : '#ef4444'; }
function tierForHome(v)   { return v <= 18 ? C.green : v <= 48 ? C.amber : '#ef4444'; }

function ScoreRing({ value, tier, tierColor }) {
  const size = 200;
  const stroke = 14;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (value / 100) * c;
  return (
    <div style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
      <div style={{
        position: 'absolute', inset: -20, borderRadius: '50%',
        background: `radial-gradient(circle, ${tierColor}33, transparent 65%)`,
        filter: 'blur(8px)',
      }} />
      <svg width={size} height={size} style={{ position: 'relative', transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} fill="none" />
        <circle cx={size/2} cy={size/2} r={r} stroke={tierColor} strokeWidth={stroke} fill="none"
          strokeDasharray={`${dash} ${c}`} strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.4s cubic-bezier(.2,.7,.3,1), stroke 0.3s' }} />
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ fontFamily: fontBody, fontSize: 64, fontWeight: 700, lineHeight: 1, color: C.ink, letterSpacing: -2.5 }}>{value}</div>
        <div style={{ fontFamily: fontMono, fontSize: 11, color: tierColor, letterSpacing: 1.5, fontWeight: 700, marginTop: 2 }}>{tier}</div>
      </div>
    </div>
  );
}

function Slider({ label, meta, value, setValue, min, max, unit, pts, ptsMax, accent }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px', gap: 16, alignItems: 'center' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
          <div style={{ fontFamily: fontBody, fontSize: 14, fontWeight: 600, color: C.ink }}>{label}</div>
          <div style={{ fontFamily: fontMono, fontSize: 11, color: C.inkMuted, letterSpacing: 0.3 }}>{meta}</div>
        </div>
        <div style={{ position: 'relative', height: 18 }}>
          <div style={{
            position: 'absolute', top: 8, left: 0, right: 0, height: 3,
            background: 'rgba(255,255,255,0.08)', borderRadius: 2,
          }} />
          <div style={{
            position: 'absolute', top: 8, left: 0, width: `${pct}%`, height: 3,
            background: accent, borderRadius: 2, transition: 'background 0.2s, width 0.05s linear',
            boxShadow: `0 0 8px ${accent}88`,
          }} />
          <input
            type="range"
            min={min} max={max}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              WebkitAppearance: 'none', appearance: 'none',
              background: 'transparent', margin: 0, cursor: 'pointer',
            }}
          />
          <div style={{
            position: 'absolute', top: 1, left: `calc(${pct}% - 9px)`,
            width: 18, height: 18, borderRadius: '50%',
            background: accent,
            boxShadow: `0 0 0 4px ${accent}33, 0 2px 8px rgba(0,0,0,0.4)`,
            pointerEvents: 'none',
            transition: 'background 0.2s',
          }} />
        </div>
      </div>
      <div style={{
        textAlign: 'right',
        fontFamily: fontDisplay, fontSize: 28, fontWeight: 400,
        color: accent, letterSpacing: -0.5, lineHeight: 1,
        transition: 'color 0.2s',
      }}>
        {value}{unit}
      </div>
    </div>
  );
}

function Chip({ label, color }) {
  return (
    <div style={{
      border: `1px solid ${color}55`, color: color,
      padding: '5px 11px', borderRadius: 999,
      fontFamily: fontMono, fontSize: 11, fontWeight: 600, letterSpacing: 0.3,
      background: `${color}10`,
    }}>
      {label}
    </div>
  );
}

function ScorePlayground() {
  const isMobile = useIsMobile();
  const [sleep, setSleep] = useState(76);
  const [stress, setStress] = useState(35);
  const [social, setSocial] = useState(75);
  const [home, setHome] = useState(4);

  const sleepPts   = clamp(((sleep - 30) / 50) * 30, 0, 30);
  const stressPts  = clamp(((80 - stress) / 60) * 20, 0, 20);
  const socialPts  = clamp(((social - 30) / 50) * 30, 0, 30);
  const homePts    = clamp(((72 - home) / 54) * 20, 0, 20);
  const total = Math.round(sleepPts + stressPts + socialPts + homePts);

  const tier = total >= 75 ? 'GOOD' : total >= 60 ? 'MODERATE' : total >= 40 ? 'AT RISK' : 'CRITICAL';
  const tierColor = total >= 75 ? C.green : total >= 60 ? C.amber : total >= 40 ? '#f97316' : '#ef4444';
  const insight = total >= 75
    ? 'You are in a good place. A couple of signals are worth keeping an eye on as the week continues.'
    : total >= 60
    ? 'Holding steady. BioTrax surfaces a quiet nudge if any signal slips further.'
    : total >= 40
    ? 'Patterns are wobbling. BioTrax proposes one small action — a walk, a breath, a check-in.'
    : 'Score is critical. A push notification reaches your trusted contact with a check-in prompt.';

  const coachState = total >= 75
    ? { dot: C.green, text: 'Status: Monitoring — all signals within normal range' }
    : total >= 60
    ? { dot: C.amber, text: 'Status: One signal trending — watching, no action yet' }
    : total >= 40
    ? { dot: '#f97316', text: 'Status: Proposing a single action this afternoon' }
    : { dot: '#ef4444', text: 'Status: Contact notified — check-in requested' };

  return (
    <section id="baseline-score" style={{ padding: isMobile ? '64px 20px' : '140px 48px', borderTop: `1px solid ${C.border}`, background: C.bg, position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 50% 50% at 50% 30%, rgba(52,211,153,0.10), transparent 60%)',
      }} />
      <div style={{ maxWidth: 980, margin: '0 auto', position: 'relative' }}>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8,
            border: `1px solid ${C.borderStrong}`, padding: '6px 14px', borderRadius: 999,
            fontFamily: fontMono, fontSize: 11, color: C.green, letterSpacing: 1, fontWeight: 600 }}>
            TRY IT YOURSELF
          </div>
          <h2 style={{ margin: 0, fontFamily: fontDisplay, fontSize: isMobile ? 40 : 64, fontWeight: 400, lineHeight: 1.0, letterSpacing: -1, color: C.ink }}>
            See your score <span style={{ fontStyle: 'italic', color: C.green }}>come to life.</span>
          </h2>
          <p style={{ margin: 0, fontFamily: fontBody, fontSize: isMobile ? 15 : 16, color: C.inkDim, maxWidth: 540 }}>
            Move the sliders and watch BioTrax think in real time. This is the exact colour logic and thresholds the app uses.
          </p>
        </div>

        <div style={{
          marginTop: isMobile ? 32 : 56,
          background: C.bgAlt,
          border: `1px solid ${C.border}`,
          borderRadius: isMobile ? 20 : 28,
          padding: isMobile ? 20 : 36,
          display: 'flex', flexDirection: 'column', gap: 28,
          boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr', gap: isMobile ? 20 : 36, alignItems: 'center', textAlign: isMobile ? 'center' : 'left' }}>
            <ScoreRing value={total} tier={tier} tierColor={tierColor} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ fontFamily: fontMono, fontSize: 11, color: C.inkMuted, letterSpacing: 1, fontWeight: 600 }}>BIOTRAX INSIGHT</div>
              <div style={{ fontFamily: fontDisplay, fontSize: isMobile ? 20 : 24, fontStyle: 'italic', lineHeight: 1.3, color: C.ink, fontWeight: 400 }}>
                {insight}
              </div>
              <div style={{
                marginTop: 4,
                border: `1px solid ${C.borderStrong}`,
                background: 'rgba(255,255,255,0.02)',
                borderRadius: 12,
                padding: '12px 16px',
                display: 'flex', alignItems: 'center', gap: 10,
                fontFamily: fontMono, fontSize: isMobile ? 11.5 : 12.5, color: C.inkDim,
                textAlign: 'left',
              }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: coachState.dot, boxShadow: `0 0 10px ${coachState.dot}`, flexShrink: 0 }} />
                {coachState.text}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 8 }}>
            <Slider label="Sleep quality"     meta="30%  ·  thresholds 60 / 80"     value={sleep}  setValue={setSleep}  min={0} max={100} unit=""  pts={sleepPts}  ptsMax={30} accent={tierForSleep(sleep)} />
            <Slider label="Stress & HRV"      meta="20%  ·  index 0–80 (low→high)"  value={stress} setValue={setStress} min={0} max={80}  unit=""  pts={stressPts} ptsMax={20} accent={tierForStress(stress)} />
            <Slider label="Social connection" meta="30%  ·  thresholds 40 / 70"     value={social} setValue={setSocial} min={0} max={100} unit=""  pts={socialPts} ptsMax={30} accent={tierForSocial(social)} />
            <Slider label="Hours at home"     meta="20%  ·  alerts 24/48/72 hrs"    value={home}   setValue={setHome}   min={0} max={72}  unit="h" pts={homePts}   ptsMax={20} accent={tierForHome(home)} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginTop: 8 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Chip label={`Sleep +${Math.round(sleepPts)}`}    color={tierForSleep(sleep)} />
              <Chip label={`Stress +${Math.round(stressPts)}`}  color={tierForStress(stress)} />
              <Chip label={`Social +${Math.round(socialPts)}`}  color={tierForSocial(social)} />
              <Chip label={`Location +${Math.round(homePts)}`}  color={tierForHome(home)} />
            </div>
            <button
              onClick={() => { setSleep(76); setStress(35); setSocial(75); setHome(4); }}
              style={{
                background: 'transparent', color: C.inkDim,
                border: `1px solid ${C.borderStrong}`, padding: '8px 18px', borderRadius: 999,
                fontFamily: fontBody, fontSize: 13, fontWeight: 500, cursor: 'pointer',
              }}
            >Reset</button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────── Story Bridge ───────────────────────────
// A quiet narrative beat between major sections. No hairlines — just
// the phrase itself, fading up word-by-word as it scrolls into view.
// Each word delayed 80ms after the previous (capped at 600ms total)
// so even longer phrases settle in well under 1.5s.
//
// Triggers exactly once via IntersectionObserver at 40% visibility,
// so the animation feels deliberate rather than re-firing on scroll
// back up. Honours prefers-reduced-motion: those users see the final
// state immediately, no fade or slide.
function StoryBridge({ children }) {
  const isMobile = useIsMobile();
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect prefers-reduced-motion: skip the animation entirely.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(node); // one-shot — don't re-fire on scroll up
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  // Split the phrase into words so each can fade up independently.
  // Only handles string children — keep bridge phrases as plain text.
  const text = typeof children === 'string' ? children : String(children);
  const words = text.split(' ');

  return (
    <section
      ref={ref}
      aria-hidden="true"
      style={{
        padding: isMobile ? '64px 20px' : '96px 48px',
        background: C.bg,
      }}
    >
      <p style={{
        margin: 0,
        maxWidth: 720,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontFamily: fontDisplay,
        fontStyle: 'italic',
        fontSize: isMobile ? 24 : 32,
        fontWeight: 400,
        color: C.inkDim,
        textAlign: 'center',
        letterSpacing: -0.3,
        lineHeight: 1.35,
      }}>
        {words.map((word, i) => {
          // Cap delay at 600ms so a 10-word phrase still feels lively.
          const delay = Math.min(i * 80, 600);
          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(12px)',
                transition: `opacity 600ms cubic-bezier(.2,.7,.3,1) ${delay}ms, transform 600ms cubic-bezier(.2,.7,.3,1) ${delay}ms`,
                whiteSpace: 'pre',
              }}
            >
              {word}{i < words.length - 1 ? ' ' : ''}
            </span>
          );
        })}
      </p>
    </section>
  );
}

// ─────────────────────────── Trust Strip ───────────────────────────
// Compact founder credentials shown right after the hero. Designed
// to read at a glance: kicker label is INLINE with its body text
// (not stacked), and the two credentials sit side-by-side with a
// thin divider between them. The "full story" link is a tiny inline
// anchor at the right edge.
//
// Vertical footprint: ~80px desktop, ~120px mobile (vs. ~200px previously).
function TrustStrip() {
  const isMobile = useIsMobile();
  const rows = [
    {
      kicker: 'CLINICAL',
      body: (
        <>Built on 20+ years of clinical biofeedback research from <em style={{ fontFamily: fontDisplay, fontStyle: 'italic', color: C.green, fontWeight: 500 }}>Dr. Reid, PhD</em></>
      ),
    },
    {
      kicker: 'SECURITY',
      body: (
        <>Engineered by <em style={{ fontFamily: fontDisplay, fontStyle: 'italic', color: C.green, fontWeight: 500 }}>Michael Reid</em> — 20+ years architecting secure enterprise systems</>
      ),
    },
  ];
  return (
    <section
      aria-label="Founder credentials"
      style={{
        padding: isMobile ? '20px' : '22px 48px',
        borderTop: `1px solid ${C.border}`,
        borderBottom: `1px solid ${C.border}`,
        background: C.bgAlt,
      }}
    >
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'center',
        justifyContent: 'space-between',
        gap: isMobile ? 14 : 32,
        flexWrap: 'wrap',
      }}>
        {rows.map((r, i) => (
          <div
            key={r.kicker}
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 12,
              flex: isMobile ? 'none' : 1,
              borderLeft: !isMobile && i > 0 ? `1px solid ${C.border}` : 'none',
              paddingLeft: !isMobile && i > 0 ? 32 : 0,
              minWidth: 0,
            }}
          >
            <span style={{
              fontFamily: fontMono,
              fontSize: 10.5,
              color: C.green,
              letterSpacing: 1.2,
              fontWeight: 600,
              flexShrink: 0,
            }}>
              {r.kicker}
            </span>
            <span style={{
              fontFamily: fontBody,
              fontSize: isMobile ? 13.5 : 14.5,
              lineHeight: 1.5,
              color: C.inkDim,
            }}>
              {r.body}
            </span>
          </div>
        ))}
        <Link
          to="/about"
          style={{
            fontFamily: fontMono,
            fontSize: 10.5,
            color: C.inkMuted,
            letterSpacing: 0.8,
            textTransform: 'uppercase',
            textDecoration: 'none',
            borderBottom: `1px solid ${C.border}`,
            flexShrink: 0,
            paddingBottom: 1,
          }}
        >
          Read the full story →
        </Link>
      </div>
    </section>
  );
}

// ─────────────────────────── Privacy Strip ───────────────────────────
function Privacy() {
  const isMobile = useIsMobile();
  return (
    <section id="privacy" style={{ padding: isMobile ? '48px 20px' : '70px 48px', borderTop: `1px solid ${C.border}`, background: '#040605' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', gap: isMobile ? 24 : 40, flexWrap: 'wrap', flexDirection: isMobile ? 'column' : 'row' }}>
        <h3 style={{ margin: 0, fontFamily: fontDisplay, fontSize: isMobile ? 26 : 36, fontWeight: 400, lineHeight: 1.1, letterSpacing: -0.5, color: C.ink, maxWidth: 480 }}>
          Your data <span style={{ fontStyle: 'italic', color: C.green }}>stays on your device</span> — and is end-to-end encrypted the moment you share with a trusted contact.
        </h3>
        <div style={{ display: 'flex', gap: isMobile ? 16 : 32, flexWrap: 'wrap' }}>
          {['HealthKit', 'Screen Time API', 'CoreLocation', 'On-device ML'].map(t => (
            <div key={t} style={{ borderLeft: `1px solid ${C.borderStrong}`, paddingLeft: 14 }}>
              <div style={{ fontFamily: fontMono, fontSize: 11, color: C.inkMuted, letterSpacing: 0.8, textTransform: 'uppercase' }}>{t}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────── Home FAQ ───────────────────────────
// Four highest-anxiety questions answered inline on the homepage,
// in the order: privacy → data → effort → audience. Defusing the
// objections that would otherwise cause a new visitor to bounce
// before they hit the waitlist CTA. Full FAQ remains at /faq.
function HomeFAQ() {
  const isMobile = useIsMobile();
  const [openIdx, setOpenIdx] = useState(null);
  const items = [
    {
      q: 'What does my Coach actually see?',
      a: 'Your Wellness Score and the signal summaries behind it — sleep quality, stress, social signals. Never your raw location, messages, or sleep details. Only what you choose to share.',
    },
    {
      q: 'Where is my data stored?',
      a: 'Biometric analysis runs on your iPhone. The Coach-relevant signals you choose to share sync to a secured, encrypted database — and only you can decide what flows out of your phone.',
    },
    {
      q: 'Do I have to journal, check in, or log moods every day?',
      a: 'No. BioTrax works passively in the background — that\'s the whole point. Check-ins are completely optional, available if you and your Coach want them, but never required.',
    },
    {
      q: 'Who is BioTrax for?',
      a: 'Anyone tracking their mental health — whether you\'re recovering, supporting someone you love, or just want a quiet system watching your back. No diagnosis required.',
    },
  ];
  return (
    <section
      aria-label="Frequently asked questions"
      style={{
        padding: isMobile ? '64px 20px' : '110px 48px',
        borderTop: `1px solid ${C.border}`,
        background: C.bg,
      }}
    >
      <div style={{ maxWidth: 920, margin: '0 auto' }}>
        <div style={{
          fontFamily: fontMono,
          fontSize: 11,
          color: C.green,
          letterSpacing: 1.2,
          fontWeight: 600,
          marginBottom: 16,
        }}>
          BEFORE YOU JOIN
        </div>
        <h2 style={{
          margin: 0,
          fontFamily: fontDisplay,
          fontSize: isMobile ? 32 : 44,
          fontWeight: 400,
          lineHeight: 1.1,
          letterSpacing: -0.5,
          color: C.ink,
          marginBottom: isMobile ? 32 : 48,
        }}>
          The questions <em style={{ fontStyle: 'italic', color: C.green, fontWeight: 400 }}>everyone asks first.</em>
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', borderTop: `1px solid ${C.border}` }}>
          {items.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    padding: isMobile ? '20px 0' : '24px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 24,
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: fontBody,
                    fontSize: isMobile ? 16.5 : 18.5,
                    fontWeight: 500,
                    color: C.ink,
                    letterSpacing: -0.2,
                  }}
                >
                  <span>{item.q}</span>
                  <span
                    aria-hidden
                    style={{
                      fontFamily: fontMono,
                      fontSize: 22,
                      color: isOpen ? C.green : C.inkMuted,
                      transition: 'transform 0.25s ease, color 0.2s',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      lineHeight: 1,
                      flexShrink: 0,
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  style={{
                    maxHeight: isOpen ? 320 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease',
                  }}
                >
                  <p style={{
                    margin: 0,
                    paddingBottom: isOpen ? (isMobile ? 20 : 28) : 0,
                    fontFamily: fontBody,
                    fontSize: isMobile ? 15 : 16.5,
                    lineHeight: 1.7,
                    color: C.inkDim,
                    maxWidth: 680,
                  }}>
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 32, fontFamily: fontMono, fontSize: 12, color: C.inkMuted, letterSpacing: 0.8, textTransform: 'uppercase' }}>
          <Link to="/faq" style={{ color: C.inkMuted, textDecoration: 'none', borderBottom: `1px solid ${C.border}` }}>
            See all questions →
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────── Waitlist ───────────────────────────
function Waitlist() {
  const isMobile = useIsMobile();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || submitting) return;

    // Basic client-side validation — type=email already gates submit,
    // but a final guard prevents trailing spaces and empty-domain typos.
    const trimmed = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed) || trimmed.length > 254) {
      setError('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      // Web3Forms: cross-origin friendly forwarding service. The user's
      // email gets routed to the inbox associated with the access key
      // (configured in the Web3Forms dashboard). No backend required;
      // their /submit endpoint accepts JSON with permissive CORS.
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: '6a1edf3e-d02b-42eb-ad05-a5eed821db50',
          email: trimmed,
          subject: 'BioTrax — New waitlist signup',
          from_name: 'BioTrax Waitlist',
          // Web3Forms surfaces these in the email body for context.
          source: 'biotrax-web.pages.dev',
          submitted_at: new Date().toISOString(),
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setSubmitted(true);
        return;
      }

      setError(data.message || 'Something went wrong. Please try again in a moment.');
    } catch {
      setError('Could not reach the signup service. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="waitlist" style={{ padding: isMobile ? '64px 20px' : '140px 48px', borderTop: `1px solid ${C.border}`, position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(52,211,153,0.18), transparent 60%)',
      }} />
      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: isMobile ? 18 : 24, position: 'relative' }}>
        <div style={{ fontFamily: fontMono, fontSize: 12, color: C.green, letterSpacing: 1.2, fontWeight: 600 }}>JOIN THE WAITLIST</div>
        <h2 style={{ margin: 0, fontFamily: fontDisplay, fontSize: isMobile ? 44 : 80, fontWeight: 400, lineHeight: 0.98, letterSpacing: isMobile ? -0.8 : -1.5, color: C.ink }}>
          The next thousand seats <span style={{ fontStyle: 'italic', color: C.green }}>open in spring.</span>
        </h2>
        <p style={{ margin: 0, fontFamily: fontBody, fontSize: isMobile ? 15 : 16, color: C.inkDim, maxWidth: 480 }}>
          Free during beta. iPhone + Apple Watch required. We'll write before billing ever starts.
        </p>
        {submitted ? (
          <div style={{
            marginTop: 16, padding: '20px 32px', borderRadius: 16,
            border: `1px solid rgba(52,211,153,0.4)`,
            background: 'rgba(52,211,153,0.06)',
            fontFamily: fontBody, fontSize: 15, color: C.green, fontWeight: 500,
          }}>
            You're on the list. We'll be in touch. ✓
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 12 : 8, marginTop: 16, width: '100%', maxWidth: 460 }}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
                required
                disabled={submitting}
                style={{
                  flex: 1, padding: '15px 20px', borderRadius: 999,
                  border: `1px solid ${error ? 'rgba(239,68,68,0.5)' : C.borderStrong}`,
                  background: 'rgba(255,255,255,0.03)',
                  fontSize: 15, color: C.ink, fontFamily: fontBody, outline: 'none',
                  opacity: submitting ? 0.6 : 1,
                  transition: 'border-color 0.2s, opacity 0.2s',
                }}
              />
              <button type="submit" disabled={submitting} style={{
                background: C.green, color: '#04201a', border: 'none',
                padding: '15px 26px', borderRadius: 999, fontSize: 15, fontWeight: 600,
                cursor: submitting ? 'wait' : 'pointer', fontFamily: fontBody,
                boxShadow: `0 0 32px rgba(52,211,153,0.4)`,
                opacity: submitting ? 0.7 : 1,
                transition: 'opacity 0.2s',
                minWidth: 140,
              }}>
                {submitting ? 'Reserving…' : 'Reserve seat →'}
              </button>
            </form>
            {error && (
              <div style={{
                fontFamily: fontBody, fontSize: 13.5, color: '#fca5a5',
                marginTop: -8, maxWidth: 460,
              }}>
                {error}
              </div>
            )}
          </>
        )}
        <div style={{ fontFamily: fontMono, fontSize: 11, color: C.inkMuted, letterSpacing: 0.4, marginTop: 4 }}>
          NO SPAM · NO TRACKING · UNSUBSCRIBE ANYTIME
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────── Footer ───────────────────────────
function Footer() {
  const isMobile = useIsMobile();
  const exploreCol = [
    { label: 'Stay Connected',    href: '/#shared-support' },
    { label: 'Baseline Score',    href: '/#baseline-score' },
    { label: 'How It Works',      href: '/#how-it-works' },
    { label: 'Privacy',           href: '/#privacy' },
    { label: 'Join the Waitlist', href: '/#waitlist' },
  ];
  const helpCol = [
    { label: 'About',    href: '/about' },
    { label: 'Support',  href: '/support' },
    { label: 'FAQ',      href: '/faq' },
  ];
  const legalCol = [
    { label: 'Privacy policy', href: '/privacy-policy' },
    { label: 'Terms',          href: '/terms' },
  ];
  const socials = [
    { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/biotrax/about/?viewAsMember=true', icon: 'linkedin' },
    { label: 'Instagram', href: 'https://www.instagram.com/biotrax_coach/',                          icon: 'instagram' },
    { label: 'Facebook',  href: 'https://www.facebook.com/BiotraxApp/',                              icon: 'facebook' },
  ];
  return (
    <footer style={{ padding: isMobile ? '40px 20px 32px' : '60px 48px 40px', borderTop: `1px solid ${C.border}`, background: '#040605' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '2fr 1fr 1fr 1fr', gap: isMobile ? 28 : 40 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, gridColumn: isMobile ? '1 / -1' : 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Logo size={28} />
            <span style={{ fontFamily: fontBody, fontSize: 18, fontWeight: 600, color: C.ink }}>BioTrax <em style={{ fontFamily: fontDisplay, fontStyle: 'italic', fontWeight: 500, color: C.green, letterSpacing: 0 }}>Sense</em></span>
          </div>
          <p style={{ margin: 0, fontFamily: fontBody, fontSize: 13.5, color: C.inkDim, maxWidth: 320, lineHeight: 1.5 }}>
            Quiet support, in the background. A passive early-warning system for your mental health, built for iPhone and Apple Watch.
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            {socials.map(s => (
              <a key={s.icon} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                 title={s.label}
                 style={{
                   display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                   width: 36, height: 36, borderRadius: '50%',
                   border: `1px solid ${C.borderStrong}`,
                   color: C.inkDim, textDecoration: 'none',
                   transition: 'border-color 0.2s, color 0.2s',
                 }}
                 onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(52,211,153,0.4)'; e.currentTarget.style.color = C.green; }}
                 onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.borderStrong; e.currentTarget.style.color = C.inkDim; }}
              >
                <SocialIcon name={s.icon} />
              </a>
            ))}
          </div>
        </div>
        {[
          { t: 'Explore', l: exploreCol },
          { t: 'Help',    l: helpCol },
          { t: 'Legal',   l: legalCol },
        ].map(col => (
          <div key={col.t} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontFamily: fontMono, fontSize: 11, color: C.inkMuted, letterSpacing: 0.8, textTransform: 'uppercase' }}>{col.t}</div>
            {col.l.map(x => {
              // External hash links use <a>; internal route links use <Link>
              const isInternalRoute = x.href.startsWith('/') && !x.href.startsWith('/#');
              return isInternalRoute ? (
                <Link key={x.label} to={x.href} style={{ fontFamily: fontBody, fontSize: 13.5, color: C.inkDim, textDecoration: 'none' }}>{x.label}</Link>
              ) : (
                <a key={x.label} href={x.href} style={{ fontFamily: fontBody, fontSize: 13.5, color: C.inkDim, textDecoration: 'none' }}>{x.label}</a>
              );
            })}
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1280, margin: '40px auto 0', paddingTop: 24, borderTop: `1px solid ${C.border}`, display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 10 : 0, justifyContent: 'space-between', fontFamily: fontMono, fontSize: 11, color: C.inkMuted, letterSpacing: 0.4 }}>
        <div>© 2026 BIOTRAX SENSE</div>
        <div>NOT A SUBSTITUTE FOR PROFESSIONAL CARE · IF IN CRISIS, CALL 112 (SE) · 988 (US)</div>
      </div>
    </footer>
  );
}

// Tiny inline SVG icons for the three socials. Pure SVG keeps bundle
// size near zero — no icon library dependency.
function SocialIcon({ name }) {
  const common = { width: 16, height: 16, fill: 'currentColor', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24' };
  if (name === 'linkedin') {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8.34 18.34H5.67V9.67h2.67v8.67zM7 8.5a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1zm11.34 9.84h-2.67v-4.5c0-1.07-.02-2.45-1.5-2.45-1.5 0-1.73 1.17-1.73 2.37v4.58H9.77V9.67h2.56v1.18h.04a2.81 2.81 0 0 1 2.53-1.39c2.71 0 3.21 1.78 3.21 4.1v4.78z"/>
      </svg>
    );
  }
  if (name === 'instagram') {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.86 5.86 0 0 0-2.13 1.38A5.86 5.86 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.73 1.46 1.38 2.13a5.86 5.86 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.86 5.86 0 0 0 2.13-1.38 5.86 5.86 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.86 5.86 0 0 0-1.38-2.13A5.86 5.86 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/>
      </svg>
    );
  }
  if (name === 'facebook') {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.02 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.88v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.09 24 12.07z"/>
      </svg>
    );
  }
  return null;
}

// ─────────────────────────── Section Header ───────────────────────────
function SectionHeader({ kicker, title, sub, align = 'left' }) {
  const isMobile = useIsMobile();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, alignItems: align === 'center' ? 'center' : 'flex-start', textAlign: align }}>
      <div style={{ fontFamily: fontMono, fontSize: 12, color: C.green, letterSpacing: 1, fontWeight: 600 }}>{kicker}</div>
      <h2 style={{ margin: 0, fontFamily: fontDisplay, fontSize: isMobile ? 40 : 64, fontWeight: 400, lineHeight: 1.0, letterSpacing: isMobile ? -0.6 : -1, color: C.ink, whiteSpace: 'pre-line', maxWidth: 800 }}>
        {title.map((p, i) => (
          <span key={i} style={p.italic ? { fontStyle: 'italic', color: C.green } : {}}>{p.t}</span>
        ))}
      </h2>
      {sub && <p style={{ margin: 0, fontFamily: fontBody, fontSize: isMobile ? 15 : 16, lineHeight: 1.6, color: C.inkDim, maxWidth: 600 }}>{sub}</p>}
    </div>
  );
}

// ─────────────────────────── Headline variants ───────────────────────────
const HEADLINES = {
  warm: {
    h1: [{ t: 'The first signal is ' }, { t: 'the quietest.', italic: true }],
    sub: "BioTrax Sense is an early-warning system for your mental health. By passively tracking your stress and sleep, it quietly alerts someone in your corner before a slump takes over.",
  },
};

// ─────────────────────────── Page: Home ───────────────────────────
function Home() {
  const headline = HEADLINES.warm;
  return (
    <>
      <Hero headline={headline} />
      <TrustStrip />
      <StoryBridge>You don&rsquo;t see it coming.</StoryBridge>
      <Tracks />
      <StoryBridge>But your body does.</StoryBridge>
      <HowItWorks />
      <StoryBridge>See it for yourself.</StoryBridge>
      <ScorePlayground />
      <StressSection />
      <StoryBridge>And someone in your corner gets the signal first.</StoryBridge>
      <CoachSection />
      <Caregivers />
      <WeeklyReport />
      <Privacy />
      <HomeFAQ />
      <StoryBridge>Reclaim your life.</StoryBridge>
      <Waitlist />
    </>
  );
}

// ─────────────────────────── App ───────────────────────────
// Routed shell: every page sits between the same Nav and Footer so
// brand surfaces (logo, links, colour world) are consistent across
// the homepage and the legal/support/FAQ pages.

// Reset scroll to top whenever the route changes — without this,
// clicking a footer link on /privacy-policy keeps the scroll position
// from the previous page, which feels broken.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div style={{ background: C.bg, minHeight: '100vh', color: C.ink, fontFamily: fontBody }}>
        <Nav />
        <Routes>
          <Route path="/"               element={<Home />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms"          element={<Terms />} />
          <Route path="/support"        element={<Support />} />
          <Route path="/faq"            element={<FAQ />} />
          <Route path="/about"          element={<About />} />
          <Route path="*"               element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
