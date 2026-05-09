import { useState } from 'react';
import PageLayout, { P, Strong } from './PageLayout.jsx';

const C = {
  ink: '#ffffff',
  inkDim: 'rgba(255,255,255,0.66)',
  inkMuted: 'rgba(255,255,255,0.42)',
  green: '#34d399',
  border: 'rgba(255,255,255,0.08)',
  borderStrong: 'rgba(255,255,255,0.14)',
};
const fontDisplay = '"Cormorant Garamond", "Times New Roman", Georgia, serif';
const fontBody = '"Inter", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

// Placeholder Q&A — these are scaffold answers chosen to cover topics
// real visitors actually wonder about. Replace each `a:` with real
// content as it becomes ready.
const QUESTIONS = [
  {
    q: 'What is BioTrax, in one sentence?',
    a: '[Placeholder] BioTrax is a passive nervous-system monitor for iPhone and Apple Watch — it watches your sleep, stress, social patterns and home-stay continuously, and quietly alerts a Trusted Contact only if your Baseline Score drops below a threshold you set.',
  },
  {
    q: 'How is this different from Whoop, Oura, or Apple Health?',
    a: '[Placeholder] Those tools optimise for athletic performance and surface raw data for you to interpret. BioTrax is built around mental-health early-warning specifically, fuses signals into a single Baseline Score, and adds the Trusted Contact safety net — none of which the others offer.',
  },
  {
    q: 'Do I need an Apple Watch?',
    a: '[Placeholder] Yes — heart rate variability is the foundation of the Baseline Score, and HRV requires a Watch. iPhone alone won&apos;t work. Apple Watch Series 4 or later is supported.',
  },
  {
    q: 'When does the beta open?',
    a: '[Placeholder] We&apos;re currently in TestFlight closed beta and plan to open public access within the next month. Joining the waitlist is the best way to be in the first cohort of users when it does.',
  },
  {
    q: 'How does my data stay private?',
    a: '[Placeholder] Health and location data are processed entirely on your device — they never reach our servers. The only data we receive is your waitlist email. When you choose to share with a Trusted Contact, only a small encrypted summary payload is sent. Read the full Privacy Policy for the complete picture.',
  },
  {
    q: 'What is a Trusted Contact, and what can they see?',
    a: '[Placeholder] A Trusted Contact is one person you choose to invite — a partner, friend, sibling, clinician — who installs BioTrax with a Companion profile. They see a calm overview of your status (Baseline Score, category trends), never raw biometrics. You control what each signal shares, and you can pause or revoke them anytime.',
  },
  {
    q: 'Will it drain my battery?',
    a: '[Placeholder] No. BioTrax uses passive Apple Watch sensors that are already running, and the iOS app processes data in efficient short bursts using Apple&apos;s recommended background-task and significant-location-change APIs. Typical impact is under 2% of daily battery life.',
  },
  {
    q: 'Is this a medical device? Can it diagnose depression?',
    a: '[Placeholder] No. BioTrax is a wellness tool, not a medical device. It does not diagnose, treat, or cure any condition. It surfaces patterns that — based on peer-reviewed research — often precede depressive episodes, and it gives you and a trusted person an early signal. It is not a substitute for professional mental-health care.',
  },
  {
    q: 'How much will it cost?',
    a: '[Placeholder] Free during beta. We&apos;ll write to you with pricing well before any billing begins, and we&apos;re committed to making the safety-net features available regardless of price tier.',
  },
  {
    q: 'I have feedback or a bug report. How do I reach you?',
    a: '[Placeholder] We read every message. Use the support form on our Support page, or write to support@biotrax.se directly.',
  },
];

function FAQItem({ q, a, isOpen, onToggle }) {
  return (
    <div style={{
      borderTop: `1px solid ${C.border}`,
    }}>
      <button onClick={onToggle} style={{
        width: '100%',
        textAlign: 'left',
        background: 'transparent',
        border: 'none',
        padding: '20px 0',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 24,
        color: C.ink,
        fontFamily: fontDisplay,
        fontSize: 22,
        fontWeight: 400,
        lineHeight: 1.3,
        letterSpacing: -0.3,
      }}>
        <span>{q}</span>
        <span style={{
          flexShrink: 0,
          width: 28, height: 28, borderRadius: '50%',
          border: `1px solid ${C.borderStrong}`,
          color: C.green,
          fontSize: 18, lineHeight: '26px', textAlign: 'center',
          fontFamily: fontBody, fontWeight: 400,
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease-out',
        }}>+</span>
      </button>
      {isOpen && (
        <div style={{ paddingBottom: 24, paddingRight: 56 }}>
          <P>{a}</P>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <PageLayout
      pageTitle="FAQ"
      kicker="HELP"
      title="Frequently asked questions."
      subhead="The questions we hear most often. If yours isn&apos;t here, the support page is the next stop."
    >
      <div style={{
        marginTop: 8,
        borderBottom: `1px solid ${C.border}`,
      }}>
        {QUESTIONS.map((item, i) => (
          <FAQItem
            key={item.q}
            q={item.q}
            a={item.a}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
          />
        ))}
      </div>

      <div style={{
        marginTop: 24,
        padding: '20px 24px',
        borderRadius: 16,
        border: `1px solid ${C.border}`,
        background: 'rgba(255,255,255,0.02)',
      }}>
        <P>
          <Strong>Still have a question?</Strong> Drop us a line on our <a href="/support" style={{ color: C.green, textDecoration: 'none' }}>support page</a>, or email <a href="mailto:support@biotrax.se" style={{ color: C.green, textDecoration: 'none' }}>support@biotrax.se</a>.
        </P>
      </div>
    </PageLayout>
  );
}
