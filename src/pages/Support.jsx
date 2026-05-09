import { useState } from 'react';
import PageLayout, { Section, P, Strong } from './PageLayout.jsx';

const C = {
  ink: '#ffffff',
  inkDim: 'rgba(255,255,255,0.66)',
  inkMuted: 'rgba(255,255,255,0.42)',
  green: '#34d399',
  border: 'rgba(255,255,255,0.08)',
  borderStrong: 'rgba(255,255,255,0.14)',
};
const fontBody = '"Inter", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';
const fontMono = '"JetBrains Mono", ui-monospace, Menlo, monospace';

export default function Support() {
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [topic, setTopic]       = useState('General question');
  const [message, setMessage]   = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]       = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const trimmedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmedEmail) || trimmedEmail.length > 254) {
      setError('Please enter a valid email address.');
      return;
    }
    if (message.trim().length < 5) {
      setError('Please describe your question or issue (at least a few words).');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: '6a1edf3e-d02b-42eb-ad05-a5eed821db50',
          subject: `BioTrax Support — ${topic}`,
          from_name: name.trim() || 'Anonymous',
          email: trimmedEmail,
          name: name.trim(),
          topic,
          message: message.trim(),
          source: 'biotrax-web.pages.dev/support',
          submitted_at: new Date().toISOString(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setSubmitted(true);
        return;
      }
      setError(data.message || 'Something went wrong. Please try again or email support@biotrax.se directly.');
    } catch {
      setError('Could not reach the support service. Please email support@biotrax.se directly.');
    } finally {
      setSubmitting(false);
    }
  };

  // Shared input/textarea styles
  const fieldBase = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: 12,
    border: `1px solid ${error ? 'rgba(239,68,68,0.5)' : C.borderStrong}`,
    background: 'rgba(255,255,255,0.03)',
    fontSize: 15,
    color: C.ink,
    fontFamily: fontBody,
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s, opacity 0.2s',
    opacity: submitting ? 0.6 : 1,
  };

  return (
    <PageLayout
      pageTitle="Support"
      kicker="HELP"
      title="Get in touch."
      subhead="Send us a note and we&apos;ll come back to you. Most messages get a reply within a day or two."
    >

      {submitted ? (
        <div style={{
          padding: '24px 28px', borderRadius: 16,
          border: `1px solid rgba(52,211,153,0.4)`,
          background: 'rgba(52,211,153,0.06)',
          fontFamily: fontBody, fontSize: 15.5, color: C.green, lineHeight: 1.6,
        }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>Message received. ✓</div>
          <div style={{ color: C.inkDim, fontWeight: 400 }}>
            Thanks for getting in touch. We&apos;ll write back to <Strong>{email}</Strong> shortly.
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontFamily: fontMono, fontSize: 11, color: C.inkMuted, letterSpacing: 0.6, textTransform: 'uppercase' }}>Your name (optional)</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} disabled={submitting} style={fieldBase} maxLength={100} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontFamily: fontMono, fontSize: 11, color: C.inkMuted, letterSpacing: 0.6, textTransform: 'uppercase' }}>Email *</label>
            <input
              type="email" required value={email}
              onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
              disabled={submitting} style={fieldBase} maxLength={254}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontFamily: fontMono, fontSize: 11, color: C.inkMuted, letterSpacing: 0.6, textTransform: 'uppercase' }}>What&apos;s this about?</label>
            <select value={topic} onChange={(e) => setTopic(e.target.value)} disabled={submitting}
              style={{ ...fieldBase, appearance: 'none', cursor: submitting ? 'wait' : 'pointer' }}>
              <option>General question</option>
              <option>Beta access</option>
              <option>Bug report</option>
              <option>Privacy / data request</option>
              <option>Press inquiry</option>
              <option>Investor inquiry</option>
              <option>Partnership</option>
              <option>Other</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontFamily: fontMono, fontSize: 11, color: C.inkMuted, letterSpacing: 0.6, textTransform: 'uppercase' }}>Message *</label>
            <textarea
              required value={message}
              onChange={(e) => { setMessage(e.target.value); if (error) setError(''); }}
              disabled={submitting} rows={6} maxLength={4000}
              style={{ ...fieldBase, resize: 'vertical', minHeight: 140, lineHeight: 1.55 }}
              placeholder="Tell us what you'd like to discuss…"
            />
          </div>

          {error && (
            <div style={{ fontFamily: fontBody, fontSize: 13.5, color: '#fca5a5' }}>{error}</div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <button type="submit" disabled={submitting} style={{
              background: C.green, color: '#04201a', border: 'none',
              padding: '14px 26px', borderRadius: 999,
              fontSize: 15, fontWeight: 600, fontFamily: fontBody,
              cursor: submitting ? 'wait' : 'pointer',
              boxShadow: `0 0 32px rgba(52,211,153,0.35)`,
              opacity: submitting ? 0.7 : 1,
              minWidth: 160,
              transition: 'opacity 0.2s',
            }}>
              {submitting ? 'Sending…' : 'Send message →'}
            </button>
            <span style={{ fontFamily: fontBody, fontSize: 13, color: C.inkMuted }}>
              or write us at <a href="mailto:support@biotrax.se" style={{ color: C.green, textDecoration: 'none' }}>support@biotrax.se</a>
            </span>
          </div>

        </form>
      )}

      <Section heading="Before you write — quick answers">
        <P>
          A few common questions are answered on our <a href="/faq" style={{ color: C.green, textDecoration: 'none' }}>FAQ page</a>. If your question is there, that&apos;s the fastest path. If not, we&apos;d love to hear from you.
        </P>
        <P>
          For privacy or data-related requests (access, deletion, etc.), you can reach us either through this form (pick &quot;Privacy / data request&quot;) or directly at <Strong>support@biotrax.se</Strong>. We respond to all GDPR requests within 30 days.
        </P>
      </Section>

    </PageLayout>
  );
}
