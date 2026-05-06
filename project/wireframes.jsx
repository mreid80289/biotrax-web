// BioTrax landing-page wireframes — 4 distinct directions.
// Sketchy, low-fi, b&w with one warm accent.

const ACCENT = '#3b6ea5'; // muted clinical blue (BioTrax-ish)
const INK = '#1a1a1a';
const PAPER = '#fafaf7';
const RULE = '#1a1a1a';
const MUTED = '#6b6b6b';

const W = 720;       // artboard width
const H = 2400;      // tall scroll-page mock height

// ─── Primitive sketch components ─────────────────────────────────────
const wfFont = '"Caveat", "Comic Sans MS", "Marker Felt", cursive';
const wfBody = '"Architects Daughter", "Caveat", "Comic Sans MS", cursive';
const wfSans = '"Inter", system-ui, -apple-system, sans-serif';

function Box({ children, style = {}, dashed, thick, fill, accent, ...rest }) {
  return (
    <div
      style={{
        border: `${thick ? 2 : 1.25}px ${dashed ? 'dashed' : 'solid'} ${accent ? ACCENT : INK}`,
        background: fill || 'transparent',
        position: 'relative',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

function Lbl({ children, size = 11, weight = 400, mono, italic, accent, muted, style = {} }) {
  return (
    <span style={{
      fontFamily: mono ? 'ui-monospace, Menlo, monospace' : wfFont,
      fontSize: size,
      fontWeight: weight,
      fontStyle: italic ? 'italic' : 'normal',
      color: accent ? ACCENT : muted ? MUTED : INK,
      letterSpacing: mono ? 0.2 : 0,
      ...style,
    }}>{children}</span>
  );
}

// Squiggly scribbled line — for placeholder text runs
function Scribble({ width = 120, height = 8, density = 1, color = INK }) {
  const pts = [];
  const seg = 6 / density;
  const n = Math.floor(width / seg);
  for (let i = 0; i <= n; i++) {
    const x = i * seg;
    const y = height / 2 + (i % 2 ? -1.5 : 1.5);
    pts.push(`${x},${y}`);
  }
  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

// A run of "text" rendered as multiple scribble lines
function TextLines({ lines = 3, width = 300, lineGap = 8, lastShort = true, color = INK }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: lineGap }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Scribble key={i} width={lastShort && i === lines - 1 ? width * 0.6 : width} height={6} color={color} />
      ))}
    </div>
  );
}

function Btn({ label, primary, width = 130, height = 32, style = {} }) {
  return (
    <div style={{
      width, height,
      border: `1.5px solid ${primary ? ACCENT : INK}`,
      background: primary ? ACCENT : 'transparent',
      borderRadius: 999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      ...style,
    }}>
      <Lbl size={13} style={{ color: primary ? '#fff' : INK, fontFamily: wfFont }}>{label}</Lbl>
    </div>
  );
}

// Phone mockup — generic blank frame with optional content slot
function Phone({ width = 180, height = 360, label, content, tilt = 0, dim = false, style = {} }) {
  return (
    <div style={{
      width, height, transform: `rotate(${tilt}deg)`,
      border: `1.5px solid ${INK}`,
      borderRadius: 28,
      padding: 8,
      background: dim ? '#eee' : '#fff',
      opacity: dim ? 0.5 : 1,
      position: 'relative',
      ...style,
    }}>
      {/* notch */}
      <div style={{
        position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)',
        width: 50, height: 8, background: INK, borderRadius: 4,
      }} />
      <div style={{
        width: '100%', height: '100%',
        border: `1px dashed ${INK}`,
        borderRadius: 22,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 6, padding: 10, boxSizing: 'border-box',
      }}>
        {content || <Lbl size={11} muted italic>{label || 'app screen'}</Lbl>}
      </div>
    </div>
  );
}

// Generic "image goes here" placeholder
function Placeholder({ width, height, label, style = {} }) {
  return (
    <div style={{
      width, height,
      border: `1px dashed ${INK}`,
      background: 'repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(0,0,0,0.04) 6px, rgba(0,0,0,0.04) 7px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative',
      ...style,
    }}>
      <Lbl size={11} muted italic mono style={{ background: PAPER, padding: '2px 6px' }}>{label}</Lbl>
    </div>
  );
}

// Sketchy circle (for score viz)
function Ring({ size = 120, label, sub, accent }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      border: `${size > 100 ? 4 : 2.5}px solid ${accent ? ACCENT : INK}`,
      borderRightColor: 'transparent',
      borderBottomColor: 'transparent',
      transform: 'rotate(-30deg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative',
    }}>
      <div style={{ transform: 'rotate(30deg)', textAlign: 'center' }}>
        <div style={{ fontFamily: wfFont, fontSize: size * 0.32, fontWeight: 700, lineHeight: 1 }}>{label}</div>
        {sub && <div style={{ fontFamily: wfFont, fontSize: 11, color: MUTED, marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
}

// Header bar — same across all variants for context
function HeaderBar({ navItems = ['The Coach', 'Try It', 'The App', 'How It Works', 'Investors'], cta = 'Join Waitlist' }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 32px', borderBottom: `1px dashed ${INK}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Box style={{ width: 24, height: 24, borderRadius: 5 }} accent />
        <Lbl size={15} weight={700}>BioTrax</Lbl>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {navItems.map((n) => <Lbl key={n} size={11}>{n}</Lbl>)}
        <Btn label={cta} primary width={100} height={28} />
      </div>
    </div>
  );
}

function FooterBar() {
  return (
    <div style={{
      borderTop: `1px dashed ${INK}`, padding: '24px 32px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 220 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Box style={{ width: 20, height: 20, borderRadius: 4 }} accent />
          <Lbl size={13} weight={700}>BioTrax</Lbl>
        </div>
        <Lbl size={10} muted italic>quiet support, in the background</Lbl>
      </div>
      {['Product', 'Company', 'Privacy'].map((col) => (
        <div key={col} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <Lbl size={11} weight={700}>{col}</Lbl>
          {[1,2,3,4].map(i => <Lbl key={i} size={10} muted>— link {i}</Lbl>)}
        </div>
      ))}
    </div>
  );
}

// Section header helper
function SectionLabel({ kicker, title, lines = 1, align = 'left', titleSize = 28 }) {
  return (
    <div style={{ textAlign: align, display: 'flex', flexDirection: 'column', gap: 8, alignItems: align === 'center' ? 'center' : 'flex-start' }}>
      {kicker && <Lbl size={10} mono accent style={{ letterSpacing: 1, textTransform: 'uppercase' }}>{kicker}</Lbl>}
      <div style={{ fontFamily: wfFont, fontSize: titleSize, fontWeight: 700, lineHeight: 1.05, maxWidth: 520 }}>{title}</div>
    </div>
  );
}

// ─── Direction A: Editorial Quiet ─────────────────────────────────────
function DirectionEditorial({ headline }) {
  return (
    <div style={{ width: W, minHeight: H, background: PAPER, fontFamily: wfFont, color: INK }}>
      <HeaderBar />

      {/* HERO — left-aligned editorial */}
      <div style={{ padding: '80px 64px 60px', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 40, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <Lbl size={10} mono accent style={{ letterSpacing: 1.5 }}>BIOTRAX · iOS + APPLE WATCH</Lbl>
          <div style={{ fontFamily: wfFont, fontSize: 56, fontWeight: 400, lineHeight: 1.0 }}>
            {headline.editorial.split('|').map((part, i) => (
              <span key={i} style={i === 1 ? { fontStyle: 'italic', color: ACCENT } : {}}>{part}</span>
            ))}
          </div>
          <TextLines lines={4} width={360} />
          <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
            <Btn label="Join the waitlist" primary width={150} />
            <Btn label="See how it works" width={140} />
          </div>
          <Lbl size={10} muted italic>free · iPhone + Apple Watch · data stays on device</Lbl>
        </div>
        <div style={{ paddingTop: 8 }}>
          <Phone width={220} height={440} label="wellness dashboard" content={
            <>
              <Ring size={120} label="77" sub="WELLNESS" accent />
              <div style={{ display: 'flex', gap: 14, marginTop: 6 }}>
                <Lbl size={10} muted>67 sleep</Lbl>
                <Lbl size={10} muted>70 stress</Lbl>
                <Lbl size={10} muted>59 social</Lbl>
              </div>
              <div style={{ width: '85%', borderTop: `1px dashed ${INK}`, margin: '8px 0' }} />
              {[1,2,3,4].map(i => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:6, width:'85%' }}>
                  <Box style={{ width: 14, height: 14, borderRadius: 3 }} />
                  <Scribble width={130} height={5} />
                </div>
              ))}
            </>
          } />
        </div>
      </div>

      {/* WHAT IT TRACKS — three column row */}
      <div style={{ padding: '40px 64px 60px', borderTop: `1px solid ${INK}` }}>
        <SectionLabel kicker="01 / WHAT IT WATCHES" title="Three signals. No journaling required." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 28 }}>
          {[
            { t: 'Sleep', s: 'duration · architecture · consistency', m: 'HealthKit' },
            { t: 'Stress', s: 'resting HR · HRV · recovery', m: 'Apple Watch' },
            { t: 'Social', s: 'time at home · communication', m: 'Screen Time' },
          ].map((c, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 14, borderTop: `2px solid ${INK}` }}>
              <Lbl size={10} mono muted>0{i+1}</Lbl>
              <div style={{ fontFamily: wfFont, fontSize: 22, fontWeight: 700 }}>{c.t}</div>
              <Lbl size={11} muted italic>{c.s}</Lbl>
              <Lbl size={9} mono accent style={{ marginTop: 8, letterSpacing: 1 }}>VIA {c.m.toUpperCase()}</Lbl>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS — 3 step */}
      <div style={{ padding: '40px 64px 60px', background: '#f3f0e8' }}>
        <SectionLabel kicker="02 / HOW IT WORKS" title="Set it once. It does the rest." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, marginTop: 24 }}>
          {[
            { n: 1, t: 'Pair your watch', d: 'BioTrax pulls sleep, HRV and steps through HealthKit.' },
            { n: 2, t: 'Pick a sponsor', d: 'One trusted person who gets a quiet alert when you need it.' },
            { n: 3, t: 'Live your life', d: 'No journaling, no daily check-ins. The app watches the patterns for you.' },
          ].map((s) => (
            <div key={s.n} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontFamily: wfFont, fontSize: 64, fontWeight: 400, color: ACCENT, lineHeight: 1 }}>0{s.n}</div>
              <div style={{ fontFamily: wfFont, fontSize: 18, fontWeight: 700 }}>{s.t}</div>
              <Scribble width={220} height={6} />
              <Scribble width={200} height={6} />
              <Scribble width={150} height={6} />
            </div>
          ))}
        </div>
      </div>

      {/* THE COACH */}
      <div style={{ padding: '60px 64px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}>
        <Phone width={220} height={420} label="coach screen" content={
          <>
            <Lbl size={10} mono muted>TODAY · MONDAY</Lbl>
            <div style={{ fontFamily: wfFont, fontSize: 18, fontWeight: 700, textAlign: 'center', padding: '0 12px' }}>
              You've been home 19 hrs. Want to step out for 10 minutes?
            </div>
            <Btn label="okay, let's go" primary width={140} height={28} />
            <Btn label="not today" width={120} height={26} />
            <div style={{ width: '85%', borderTop: `1px dashed ${INK}`, margin: '14px 0 6px' }} />
            <Lbl size={10} muted italic>nudge sent 11:42</Lbl>
          </>
        } />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <SectionLabel kicker="03 / THE COACH" title="A gentle voice when patterns slip." titleSize={26} />
          <TextLines lines={4} width={320} />
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 6 }}>
            {['breath cue', 'step out', 'message a friend', 'sleep wind-down'].map(t => (
              <div key={t} style={{ border: `1px solid ${INK}`, borderRadius: 999, padding: '4px 10px' }}>
                <Lbl size={10}>{t}</Lbl>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CAREGIVER / SPONSOR */}
      <div style={{ padding: '50px 64px 60px', borderTop: `1px solid ${INK}` }}>
        <SectionLabel kicker="04 / FOR THE PEOPLE WHO CARE" title="They get a heads-up. You stay in control." />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30, marginTop: 28, alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Lbl size={11} weight={700}>YOU CHOOSE</Lbl>
            <Lbl size={11}>· who gets alerted</Lbl>
            <Lbl size={11}>· what triggers an alert</Lbl>
            <Lbl size={11}>· what they actually see</Lbl>
            <div style={{ marginTop: 8 }}><TextLines lines={3} width={260} /></div>
          </div>
          {/* Sponsor notification mock */}
          <div style={{ alignSelf: 'center' }}>
            <Box style={{ padding: 14, borderRadius: 12, background: '#fff', maxWidth: 280 }}>
              <Lbl size={9} mono muted style={{ letterSpacing: 1 }}>BIOTRAX · 10:42 AM</Lbl>
              <div style={{ fontFamily: wfFont, fontSize: 14, fontWeight: 700, marginTop: 4 }}>
                Hey — Maya might need a check-in today. Sleep + isolation flags.
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                <Btn label="text her" width={90} height={26} primary />
                <Btn label="snooze" width={70} height={26} />
              </div>
            </Box>
          </div>
        </div>
      </div>

      {/* WAITLIST CTA */}
      <div style={{ padding: '70px 64px', textAlign: 'center', background: ACCENT, color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <Lbl size={10} mono style={{ color: 'rgba(255,255,255,0.7)', letterSpacing: 1.5 }}>JOIN THE WAITLIST</Lbl>
        <div style={{ fontFamily: wfFont, fontSize: 36, fontWeight: 400, color: '#fff', lineHeight: 1.05, maxWidth: 460 }}>
          The next thousand spots open in spring.
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <Box style={{ width: 240, height: 38, borderRadius: 999, background: '#fff', display: 'flex', alignItems: 'center', padding: '0 14px' }}>
            <Lbl size={11} muted italic>your@email.com</Lbl>
          </Box>
          <Btn label="Reserve →" width={110} height={38} style={{ background: '#fff', color: ACCENT, border: 'none' }} />
        </div>
      </div>

      <FooterBar />
    </div>
  );
}

// ─── Direction B: Clinical Grid ─────────────────────────────────────
function DirectionClinical({ headline }) {
  return (
    <div style={{ width: W, minHeight: H, background: PAPER, fontFamily: wfFont, color: INK }}>
      <HeaderBar />

      {/* HERO — split, score-forward */}
      <div style={{ padding: '50px 48px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 32, alignItems: 'stretch', borderBottom: `1px solid ${INK}` }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, paddingRight: 24, borderRight: `1px dashed ${INK}` }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3a9a5a' }} />
            <Lbl size={9} mono style={{ letterSpacing: 1 }}>NOW IN CLOSED BETA · iOS 16+ · WATCHOS 9+</Lbl>
          </div>
          <div style={{ fontFamily: wfFont, fontSize: 44, fontWeight: 700, lineHeight: 1.0 }}>
            {headline.clinical}
          </div>
          <TextLines lines={3} width={380} />
          {/* Stats strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 6, paddingTop: 14, borderTop: `2px solid ${INK}` }}>
            {[
              { v: '0', l: 'check-ins required' },
              { v: '4', l: 'passive signals' },
              { v: '100%', l: 'on-device data' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: wfFont, fontSize: 26, fontWeight: 700, lineHeight: 1 }}>{s.v}</div>
                <Lbl size={10} mono muted>{s.l}</Lbl>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
            <Btn label="Join Waitlist" primary width={130} />
            <Btn label="View Methodology →" width={170} />
          </div>
        </div>

        {/* Score panel */}
        <div style={{ background: '#0e1116', color: '#fff', borderRadius: 8, padding: 20, display: 'flex', flexDirection: 'column', gap: 10, position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Lbl size={9} mono style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: 1 }}>WELLNESS SCORE · TODAY</Lbl>
            <Lbl size={9} mono style={{ color: 'rgba(255,255,255,0.6)' }}>11:54</Lbl>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flex: 1, gap: 4 }}>
            <div style={{ width: 130, height: 130, borderRadius: '50%', border: '5px solid #4ec27a', borderRightColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(-30deg)' }}>
              <div style={{ transform: 'rotate(30deg)', textAlign: 'center' }}>
                <div style={{ fontSize: 40, fontWeight: 700, fontFamily: wfFont }}>77</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)', letterSpacing: 2 }}>GOOD</div>
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.15)' }}>
            {[
              { v: '23', l: '/30 sleep' },
              { v: '17', l: '/20 active' },
              { v: '22', l: '/30 social' },
              { v: '15', l: '/20 bio' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: wfFont, fontSize: 16, fontWeight: 700 }}>{s.v}</div>
                <Lbl size={8} mono style={{ color: 'rgba(255,255,255,0.55)' }}>{s.l}</Lbl>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODULES — 4 col grid mirroring spec */}
      <div style={{ padding: '40px 48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 22 }}>
          <SectionLabel kicker="MODULES · 01–04" title="Four engines. One score." titleSize={28} />
          <Lbl size={10} mono muted>spec v2.0 / dec 2025</Lbl>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
          {[
            { id: 'A', t: 'Biometric Engine', sub: 'sleep · activity · HRV', body: 'detects physical precursors — fatigue, lethargy, high stress.' },
            { id: 'B', t: 'Isolation Engine', sub: 'geofence · screen time', body: 'spots social withdrawal: time at home, communication apps.' },
            { id: 'C', t: 'Intervention System', sub: 'sponsor alerts · SOS', body: 'acts when score drops. push to sponsor. SOS button. avoid-zones.' },
            { id: 'D', t: 'Manual Layer', sub: 'mood · breath', body: 'optional 1–5 mood check, deep-link to Apple Breathe.' },
          ].map((m) => (
            <Box key={m.id} style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8, minHeight: 130 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <Lbl size={9} mono muted style={{ letterSpacing: 1 }}>MODULE {m.id}</Lbl>
                  <div style={{ fontFamily: wfFont, fontSize: 18, fontWeight: 700 }}>{m.t}</div>
                </div>
                <Lbl size={10} mono accent>{m.sub}</Lbl>
              </div>
              <Scribble width={420} height={5} />
              <Scribble width={380} height={5} />
              <Lbl size={10} muted italic>{m.body}</Lbl>
            </Box>
          ))}
        </div>
      </div>

      {/* SCORE METHODOLOGY */}
      <div style={{ padding: '30px 48px 50px', borderTop: `1px solid ${INK}`, background: '#f0ede4' }}>
        <SectionLabel kicker="THE SCORE" title="100 points. Earned passively." titleSize={26} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12, marginTop: 22 }}>
          {[
            { v: 30, l: 'Sleep', d: '±1hr of goal' },
            { v: 20, l: 'Activity', d: 'steps vs goal' },
            { v: 30, l: 'Isolation', d: 'home + comms' },
            { v: 20, l: 'Biometrics', d: 'HRV baseline' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontFamily: wfFont, fontSize: 48, fontWeight: 700, lineHeight: 1, color: ACCENT }}>{s.v}</div>
              <div style={{ fontFamily: wfFont, fontSize: 16, fontWeight: 700 }}>{s.l}</div>
              <Lbl size={10} mono muted>{s.d}</Lbl>
              <div style={{ height: 4, background: INK, marginTop: 4, width: `${s.v * 2}%` }} />
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS — horizontal flow */}
      <div style={{ padding: '40px 48px 50px' }}>
        <SectionLabel kicker="ONBOARDING" title="From install to insight in 4 minutes." titleSize={26} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 24 }}>
          {[
            'Install on iPhone',
            'Pair Apple Watch',
            'Grant HealthKit',
            'Add a sponsor',
            'Start scoring',
          ].map((s, i, arr) => (
            <React.Fragment key={i}>
              <Box style={{ padding: '12px 14px', flex: 1, minHeight: 70, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <Lbl size={9} mono accent>STEP 0{i+1}</Lbl>
                <Lbl size={11} weight={700}>{s}</Lbl>
                <Scribble width={80} height={4} />
              </Box>
              {i < arr.length - 1 && <Lbl size={16} muted>→</Lbl>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* SPONSOR INTERVENTION */}
      <div style={{ padding: '50px 48px', borderTop: `1px solid ${INK}`, background: '#fff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 32, alignItems: 'center' }}>
          <div>
            <SectionLabel kicker="THE SAFETY NET" title="When the score crosses 40, someone is told." titleSize={24} />
            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                ['77+', 'all green. nothing happens.'],
                ['60–76', 'app surfaces a private nudge.'],
                ['40–59', 'coach proposes one small action.'],
                ['<40', 'sponsor receives a check-in alert.'],
              ].map(([t, d], i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: 12, paddingBottom: 10, borderBottom: `1px dashed ${INK}` }}>
                  <Lbl size={14} weight={700} mono accent>{t}</Lbl>
                  <Lbl size={11} muted italic>{d}</Lbl>
                </div>
              ))}
            </div>
          </div>
          {/* Sponsor flow visual */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
            <Phone width={150} height={300} content={<>
              <Lbl size={9} mono muted>USER · 38</Lbl>
              <Ring size={80} label="38" accent />
              <Lbl size={9} muted italic>score critical</Lbl>
            </>} />
            <Lbl size={20} muted>↓</Lbl>
            <Box style={{ padding: 12, background: '#fff', borderRadius: 10, maxWidth: 240 }}>
              <Lbl size={9} mono accent>PUSH · TO SPONSOR</Lbl>
              <div style={{ fontFamily: wfFont, fontSize: 13, fontWeight: 700, marginTop: 4 }}>
                Alert: Maya shows signs of high isolation and stress. Please check in.
              </div>
            </Box>
          </div>
        </div>
      </div>

      {/* PRIVACY STRIP */}
      <div style={{ padding: '30px 48px', background: '#0e1116', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <Lbl size={20} weight={700} style={{ color: '#fff', maxWidth: 360 }}>Your data never leaves the device — until you choose a sponsor.</Lbl>
        <div style={{ display: 'flex', gap: 16 }}>
          {['HealthKit', 'Screen Time API', 'CoreLocation', 'Firebase (sponsor only)'].map(t => (
            <div key={t} style={{ borderLeft: '1px solid rgba(255,255,255,0.3)', paddingLeft: 10 }}>
              <Lbl size={9} mono style={{ color: 'rgba(255,255,255,0.55)', letterSpacing: 1 }}>{t.toUpperCase()}</Lbl>
            </div>
          ))}
        </div>
      </div>

      {/* WAITLIST */}
      <div style={{ padding: '50px 48px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
        <SectionLabel kicker="ACCESS" title="Closed beta. ~1k seats per cohort." align="center" titleSize={26} />
        <Lbl size={11} muted italic style={{ maxWidth: 380, textAlign: 'center' }}>cohorts ship monthly. you'll be told before billing starts (free in beta).</Lbl>
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <Box style={{ width: 280, height: 38, borderRadius: 4, display: 'flex', alignItems: 'center', padding: '0 14px' }}>
            <Lbl size={11} muted italic>your@email.com</Lbl>
          </Box>
          <Btn label="Reserve seat →" primary width={140} height={38} style={{ borderRadius: 4 }} />
        </div>
      </div>

      <FooterBar />
    </div>
  );
}

// ─── Direction C: Caregiver-Pair ─────────────────────────────────────
function DirectionPair({ headline }) {
  return (
    <div style={{ width: W, minHeight: H, background: PAPER, fontFamily: wfFont, color: INK }}>
      <HeaderBar navItems={['For You', 'For Sponsors', 'How It Works', 'Privacy', 'Investors']} />

      {/* HERO — paired duo */}
      <div style={{ padding: '50px 48px 40px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <Lbl size={10} mono accent style={{ letterSpacing: 1.5 }}>BIOTRAX · A QUIET PARTNERSHIP</Lbl>
        <div style={{ fontFamily: wfFont, fontSize: 50, fontWeight: 400, lineHeight: 1.0, maxWidth: 520, textAlign: 'center' }}>
          {headline.pair}
        </div>
        <Lbl size={12} muted italic style={{ maxWidth: 480, textAlign: 'center' }}>
          BioTrax pairs you with one trusted person. The app watches the patterns. They get a heads-up only when it matters.
        </Lbl>
        <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
          <Btn label="Join Waitlist" primary width={130} />
          <Btn label="See the partnership" width={160} />
        </div>

        {/* Paired phones */}
        <div style={{ marginTop: 30, display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 30, alignItems: 'center', width: '100%' }}>
          {/* Left — user's phone */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <Lbl size={10} mono muted style={{ letterSpacing: 1 }}>YOUR PHONE</Lbl>
            <Phone width={200} height={400} content={<>
              <Ring size={120} label="77" sub="WELLNESS" accent />
              <div style={{ display: 'flex', gap: 14 }}>
                <Lbl size={10} muted>67</Lbl>
                <Lbl size={10} muted>70</Lbl>
                <Lbl size={10} muted>59</Lbl>
              </div>
              <Scribble width={140} height={5} />
              <Scribble width={120} height={5} />
              <Scribble width={130} height={5} />
            </>} tilt={-3} />
          </div>
          {/* Connection ribbon */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <svg width="60" height="80">
              <path d="M5 5 Q 30 40 5 75" stroke={ACCENT} strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
              <path d="M55 5 Q 30 40 55 75" stroke={ACCENT} strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
              <circle cx="30" cy="40" r="6" fill="none" stroke={ACCENT} strokeWidth="1.5" />
            </svg>
            <Lbl size={9} mono accent>END-TO-END</Lbl>
          </div>
          {/* Right — sponsor's phone */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <Lbl size={10} mono muted style={{ letterSpacing: 1 }}>YOUR SPONSOR'S PHONE</Lbl>
            <Phone width={200} height={400} content={<>
              <Lbl size={10} mono muted>SPONSOR VIEW</Lbl>
              <div style={{ width: 90, height: 90, borderRadius: '50%', border: `3px solid #3a9a5a`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Lbl size={11} weight={700}>all good</Lbl>
              </div>
              <div style={{ width: '85%', borderTop: `1px dashed ${INK}`, margin: '6px 0' }} />
              <Lbl size={10} muted italic>last alert: 12 days ago</Lbl>
              <Lbl size={10} muted italic>quiet today</Lbl>
              <div style={{ width: '85%', borderTop: `1px dashed ${INK}`, margin: '6px 0' }} />
              <Btn label="say hi anyway" width={130} height={26} />
            </>} tilt={3} />
          </div>
        </div>
      </div>

      {/* TWO-AUDIENCE TABS */}
      <div style={{ padding: '50px 48px', borderTop: `1px solid ${INK}` }}>
        <SectionLabel kicker="TWO PERSPECTIVES" title="Built for the pair, not the patient." titleSize={26} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 22 }}>
          {[
            { who: 'IF YOU\'RE THE USER', t: 'No journaling.', items: ['no daily mood prompts', 'no streaks to maintain', 'you choose what your sponsor sees', 'you can pause sponsor sharing anytime'] },
            { who: 'IF YOU\'RE THE SPONSOR', t: 'No surveillance.', items: ['no live dashboard of their data', 'only a heads-up when score drops', 'one-tap "I\'ve checked in" reply', 'never see the raw biometrics'] },
          ].map((c, i) => (
            <Box key={i} style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 10 }} accent={i === 1}>
              <Lbl size={9} mono accent={i === 1} style={{ letterSpacing: 1 }}>{c.who}</Lbl>
              <div style={{ fontFamily: wfFont, fontSize: 22, fontWeight: 700 }}>{c.t}</div>
              {c.items.map((x, j) => (
                <div key={j} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <Lbl size={11} accent={i === 1}>—</Lbl>
                  <Lbl size={11}>{x}</Lbl>
                </div>
              ))}
            </Box>
          ))}
        </div>
      </div>

      {/* WHAT IT TRACKS */}
      <div style={{ padding: '40px 48px', background: '#f0ede4' }}>
        <SectionLabel kicker="THE SIGNALS" title="Three quiet streams." titleSize={24} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 20 }}>
          {[
            { t: 'Body', s: ['sleep duration', 'HRV', 'resting heart rate', 'steps & activity'] },
            { t: 'Place', s: ['hours at home', 'avoid-zones', 'movement radius'] },
            { t: 'Connection', s: ['communication minutes', 'social-app overuse', 'doomscroll ratio'] },
          ].map((c, i) => (
            <Box key={i} style={{ padding: 14, background: PAPER, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Lbl size={9} mono muted>0{i+1} / 03</Lbl>
              <div style={{ fontFamily: wfFont, fontSize: 22, fontWeight: 700 }}>{c.t}</div>
              {c.s.map((x, j) => <Lbl key={j} size={11} muted>· {x}</Lbl>)}
            </Box>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS — vertical timeline */}
      <div style={{ padding: '50px 48px' }}>
        <SectionLabel kicker="THE FLOW" title="How a quiet day becomes a quiet alert." titleSize={26} />
        <div style={{ marginTop: 28, position: 'relative', paddingLeft: 30 }}>
          <div style={{ position: 'absolute', top: 8, bottom: 8, left: 12, borderLeft: `1px dashed ${INK}` }} />
          {[
            { t: '07:00', l: 'Watch syncs HRV + sleep summary.' },
            { t: '10:30', l: 'Steps below 30% of 7-day average.' },
            { t: '14:20', l: 'Geofence: still home, hour 17.' },
            { t: '16:00', l: 'Score crosses 40. Coach offers a 10-min step-out.' },
            { t: '16:08', l: 'No tap-through. Sponsor receives a check-in nudge.' },
            { t: '16:14', l: 'Sponsor texts. You pick up.' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 16, position: 'relative', paddingBottom: 14 }}>
              <div style={{ position: 'absolute', left: -20, top: 4, width: 10, height: 10, borderRadius: '50%', background: PAPER, border: `1.5px solid ${INK}` }} />
              <Lbl size={11} mono accent>{s.t}</Lbl>
              <Lbl size={12}>{s.l}</Lbl>
            </div>
          ))}
        </div>
      </div>

      {/* PRIVACY */}
      <div style={{ padding: '40px 48px', background: PAPER, borderTop: `1px solid ${INK}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          {[
            { t: 'On device by default', d: 'biometrics live in HealthKit. nothing uploads.' },
            { t: 'Sponsor sees alerts only', d: 'never the raw stream. summaries when it matters.' },
            { t: 'Pause anytime', d: 'a long-press toggle. nothing to explain, nothing logged.' },
          ].map((c, i) => (
            <div key={i}>
              <Lbl size={9} mono accent>0{i+1} PRIVACY</Lbl>
              <div style={{ fontFamily: wfFont, fontSize: 16, fontWeight: 700, marginTop: 4 }}>{c.t}</div>
              <Lbl size={11} muted italic style={{ marginTop: 4 }}>{c.d}</Lbl>
            </div>
          ))}
        </div>
      </div>

      {/* WAITLIST */}
      <div style={{ padding: '60px 48px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, background: '#0e1116', color: '#fff' }}>
        <Lbl size={10} mono style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: 1.5 }}>JOIN WITH SOMEONE</Lbl>
        <div style={{ fontFamily: wfFont, fontSize: 32, fontWeight: 400, color: '#fff', maxWidth: 460, lineHeight: 1.05 }}>
          Save your seat — and one for the person you'd ask to check in.
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <Box style={{ width: 220, height: 38, borderRadius: 4, background: '#fff', display: 'flex', alignItems: 'center', padding: '0 14px' }}>
            <Lbl size={11} muted italic>your@email.com</Lbl>
          </Box>
          <Btn label="Reserve pair →" width={140} height={38} primary style={{ borderRadius: 4 }} />
        </div>
        <Lbl size={10} mono style={{ color: 'rgba(255,255,255,0.5)' }}>they'll get an invite when you're in. they don't need to know your data.</Lbl>
      </div>

      <FooterBar />
    </div>
  );
}

// ─── Direction D: Score-Hero (Bold Display) ─────────────────────────
function DirectionScoreHero({ headline }) {
  return (
    <div style={{ width: W, minHeight: H, background: PAPER, fontFamily: wfFont, color: INK }}>
      <HeaderBar />

      {/* HERO — score IS the hero */}
      <div style={{ padding: '40px 48px 30px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
        <Lbl size={10} mono accent style={{ letterSpacing: 1.5 }}>WELLNESS SCORE · A NEW VITAL</Lbl>
        <div style={{ fontFamily: wfFont, fontSize: 200, fontWeight: 700, lineHeight: 0.85, color: ACCENT }}>77</div>
        <Lbl size={11} mono muted style={{ letterSpacing: 2 }}>YOUR DAILY DEPRESSION-RISK INDEX</Lbl>
        <div style={{ fontFamily: wfFont, fontSize: 38, fontWeight: 400, lineHeight: 1.05, maxWidth: 520, marginTop: 12 }}>
          {headline.score}
        </div>
        <Lbl size={12} muted italic style={{ maxWidth: 460, textAlign: 'center', lineHeight: 1.4 }}>
          BioTrax distills sleep, stress, and isolation into one number — quietly, in the background. When it drops, someone you trust hears about it.
        </Lbl>
        <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
          <Btn label="Join Waitlist" primary width={130} />
          <Btn label="How the score works ↓" width={170} />
        </div>
      </div>

      {/* SCORE BREAKDOWN — full-width strip */}
      <div style={{ padding: '0 48px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '30fr 20fr 30fr 20fr', gap: 4, height: 120, border: `1px solid ${INK}` }}>
          {[
            { l: 'SLEEP', sub: 'duration · architecture · consistency', pts: 30, fill: '#f4d35e' },
            { l: 'ACTIVITY', sub: 'steps · exercise minutes', pts: 20, fill: '#9bc995' },
            { l: 'ISOLATION', sub: 'time at home · communication', pts: 30, fill: '#f29e92' },
            { l: 'BIO', sub: 'HRV · resting HR', pts: 20, fill: '#c8b6e2' },
          ].map((s, i) => (
            <div key={i} style={{ position: 'relative', background: s.fill, padding: 12, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRight: i < 3 ? `1px solid ${INK}` : 'none' }}>
              <div>
                <Lbl size={10} mono weight={700} style={{ letterSpacing: 1 }}>{s.l}</Lbl>
                <div style={{ fontFamily: wfFont, fontSize: 9, color: 'rgba(0,0,0,0.6)' }}>{s.sub}</div>
              </div>
              <div style={{ fontFamily: wfFont, fontSize: 36, fontWeight: 700, lineHeight: 1, textAlign: 'right' }}>{s.pts}<span style={{ fontSize: 14, color: 'rgba(0,0,0,0.5)' }}>pts</span></div>
            </div>
          ))}
        </div>
        <Lbl size={10} mono muted style={{ marginTop: 6, display: 'block', textAlign: 'right' }}>= 100 pts · daily, passive</Lbl>
      </div>

      {/* SCORE-BY-SCENARIO — daily stories */}
      <div style={{ padding: '40px 48px', borderTop: `1px solid ${INK}`, background: '#f0ede4' }}>
        <SectionLabel kicker="A WEEK IN SCORES" title="What the number actually feels like." titleSize={26} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, marginTop: 24, alignItems: 'flex-end', height: 200 }}>
          {[
            { d: 'M', s: 82 },{ d: 'T', s: 78 },{ d: 'W', s: 71 },{ d: 'T', s: 64 },{ d: 'F', s: 52 },{ d: 'S', s: 38 },{ d: 'S', s: 56 },
          ].map((d, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <Lbl size={11} weight={700}>{d.s}</Lbl>
              <div style={{ width: '70%', height: `${d.s * 1.4}px`, background: d.s < 40 ? '#d36b5b' : d.s < 60 ? '#e8b657' : ACCENT, border: `1px solid ${INK}` }} />
              <Lbl size={10} mono muted>{d.d}</Lbl>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginTop: 22 }}>
          {[
            { range: '60–100', t: 'green days', d: 'patterns hold. coach is silent.' },
            { range: '40–59', t: 'yellow days', d: 'a quiet nudge: step out, breath cue, a friend\'s name.' },
            { range: '<40', t: 'red days', d: 'sponsor gets a check-in alert. SOS one tap away.' },
          ].map((c, i) => (
            <div key={i} style={{ borderTop: `2px solid ${INK}`, paddingTop: 8 }}>
              <Lbl size={10} mono accent>{c.range}</Lbl>
              <div style={{ fontFamily: wfFont, fontSize: 16, fontWeight: 700, marginTop: 2 }}>{c.t}</div>
              <Lbl size={11} muted italic>{c.d}</Lbl>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ padding: '40px 48px' }}>
        <SectionLabel kicker="UNDER THE HOOD" title="Three modules, one score." titleSize={26} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 22 }}>
          {[
            { id: 'A', t: 'Biometric', body: 'sleep, activity, HRV. via HealthKit.' },
            { id: 'B', t: 'Behavioral', body: 'home time, comm minutes. via Geofence + Screen Time API.' },
            { id: 'C', t: 'Intervention', body: 'coach nudges, sponsor pings, SOS button.' },
          ].map((m) => (
            <Box key={m.id} thick style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8, minHeight: 120 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Lbl size={9} mono accent>MODULE {m.id}</Lbl>
                <Lbl size={20} muted>·</Lbl>
              </div>
              <div style={{ fontFamily: wfFont, fontSize: 22, fontWeight: 700 }}>{m.t}</div>
              <Lbl size={11} muted italic>{m.body}</Lbl>
            </Box>
          ))}
        </div>
      </div>

      {/* COACH + SPONSOR side-by-side */}
      <div style={{ padding: '50px 48px', borderTop: `1px solid ${INK}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <Box style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Lbl size={10} mono accent>THE COACH · IN-APP</Lbl>
            <div style={{ fontFamily: wfFont, fontSize: 22, fontWeight: 700 }}>Quiet voice in your pocket.</div>
            <Phone width={140} height={260} style={{ alignSelf: 'center' }} content={<>
              <Lbl size={9} mono muted>16:08</Lbl>
              <div style={{ fontFamily: wfFont, fontSize: 12, fontWeight: 700, textAlign: 'center', padding: '0 8px' }}>10 min walk · the sun is still up.</div>
              <Btn label="okay" primary width={80} height={22} />
              <Btn label="not now" width={70} height={20} />
            </>} />
          </Box>
          <Box style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 12 }} accent>
            <Lbl size={10} mono accent>THE SPONSOR · WHEN IT MATTERS</Lbl>
            <div style={{ fontFamily: wfFont, fontSize: 22, fontWeight: 700 }}>One ping when needed.</div>
            <Box style={{ padding: 12, background: '#fff', borderRadius: 10, alignSelf: 'center', maxWidth: 240 }}>
              <Lbl size={9} mono accent>BIOTRAX · NOW</Lbl>
              <div style={{ fontFamily: wfFont, fontSize: 13, fontWeight: 700, marginTop: 4 }}>Maya might need a check-in. Quick text?</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                <Btn label="text" primary width={60} height={22} />
                <Btn label="call" width={60} height={22} />
              </div>
            </Box>
          </Box>
        </div>
      </div>

      {/* WAITLIST */}
      <div style={{ padding: '60px 48px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, background: ACCENT, color: '#fff' }}>
        <Lbl size={10} mono style={{ color: 'rgba(255,255,255,0.7)', letterSpacing: 2 }}>WAITLIST</Lbl>
        <div style={{ fontFamily: wfFont, fontSize: 60, fontWeight: 700, color: '#fff', lineHeight: 1 }}>Get your number.</div>
        <Lbl size={12} style={{ color: 'rgba(255,255,255,0.85)', maxWidth: 380, fontStyle: 'italic' }}>iPhone + Apple Watch · free during beta · cohorts of 1,000</Lbl>
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          <Box style={{ width: 240, height: 40, borderRadius: 999, background: '#fff', display: 'flex', alignItems: 'center', padding: '0 14px' }}>
            <Lbl size={11} muted italic>your@email.com</Lbl>
          </Box>
          <Btn label="Reserve →" width={120} height={40} style={{ background: '#fff', color: ACCENT, border: 'none' }} />
        </div>
      </div>

      <FooterBar />
    </div>
  );
}

// ─── HEADLINE COPY VARIANTS ────────────────────────────────────────
const HEADLINE_SETS = {
  warm: {
    editorial: "You don't have to do this |alone|.",
    clinical: "Catch the dip before it pulls you under.",
    pair: "One quiet partner, watching the patterns you can't.",
    score: "A daily score for the days that get heavy.",
  },
  premium: {
    editorial: "A safety net |you can't see|.",
    clinical: "Continuous wellness intelligence for relapse-prone weeks.",
    pair: "Pair up. Stay seen — without saying anything.",
    score: "One number. The one that matters.",
  },
  direct: {
    editorial: "Depression has patterns. |Now you have a partner|.",
    clinical: "Detect relapse precursors 4 days earlier on average.",
    pair: "Your watch sees the slip. Your sponsor gets the heads-up.",
    score: "Wellness, scored. Privately. Continuously.",
  },
  poetic: {
    editorial: "When the days get |heavy|, someone notices.",
    clinical: "The signal is in the silence.",
    pair: "A whisper between two phones.",
    score: "A number for the unspoken.",
  },
};

// ─── App ──────────────────────────────────────────────────────────
function App() {
  const [tweaks, setTweak] = useTweaks({ headlineSet: 'warm' });
  const headline = HEADLINE_SETS[tweaks.headlineSet] || HEADLINE_SETS.warm;

  return (
    <>
      <DesignCanvas>
        <DCSection id="full-page" title="BioTrax · Landing Page" subtitle="four crisp directions, full scroll-page each">
          <DCArtboard id="editorial" label="A · Editorial Quiet" width={W} height={H + 200}>
            <DirectionEditorial headline={headline} />
          </DCArtboard>
          <DCArtboard id="clinical" label="B · Clinical Grid" width={W} height={H + 200}>
            <DirectionClinical headline={headline} />
          </DCArtboard>
          <DCArtboard id="pair" label="C · Caregiver Pair" width={W} height={H + 200}>
            <DirectionPair headline={headline} />
          </DCArtboard>
          <DCArtboard id="score" label="D · Score-as-Hero" width={W} height={H + 200}>
            <DirectionScoreHero headline={headline} />
          </DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Headline copy">
          <TweakRadio
            value={tweaks.headlineSet}
            onChange={(v) => setTweak('headlineSet', v)}
            options={[
              { value: 'warm', label: 'Warm' },
              { value: 'premium', label: 'Premium' },
              { value: 'direct', label: 'Direct' },
              { value: 'poetic', label: 'Poetic' },
            ]}
          />
          <div style={{ fontSize: 11, color: '#7a6f5f', marginTop: 8, lineHeight: 1.4 }}>
            switches headlines on all four wireframes
          </div>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
