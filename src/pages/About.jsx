/**
 * /about — The story behind BioTrax.
 *
 * Uses the shared PageLayout (same dark theme, typography, and rhythm
 * as /privacy-policy, /terms, /support, /faq) so this page feels like
 * a native part of the BioTrax site, not a bolted-on bio.
 *
 * Structure:
 *  - Header: kicker "OUR STORY" + display headline + subhead
 *  - Section: A 15-Year Vision
 *  - Section: The Breakthrough — Triangulating Human Behavior
 *  - PullQuote (small visual rest beat)
 *  - Section: The Mission — Healing Through Insight
 *  - Section: Built on Uncompromising Security (incl. founder bio)
 */
import PageLayout, { Section, P, Strong } from './PageLayout.jsx';

const C = {
  green: '#34d399',
  ink: '#ffffff',
  inkDim: 'rgba(255,255,255,0.66)',
  border: 'rgba(255,255,255,0.08)',
};
const fontDisplay = '"Cormorant Garamond", "Times New Roman", Georgia, serif';
const fontBody = '"Inter", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';
const fontMono = '"JetBrains Mono", ui-monospace, Menlo, monospace';

// Small visual rest beat between dense sections — uses the same
// Cormorant italic + green-accent treatment as the "Sense" wordmark
// and homepage headline emphasis ("the quietest."). Keeps the
// design language unified across pages.
function PullQuote({ children, attribution }) {
  return (
    <figure style={{
      margin: '12px 0',
      paddingLeft: 22,
      borderLeft: `2px solid ${C.green}`,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    }}>
      <blockquote style={{
        margin: 0,
        fontFamily: fontDisplay,
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: 22,
        lineHeight: 1.4,
        color: C.ink,
        letterSpacing: -0.2,
      }}>
        {children}
      </blockquote>
      {attribution && (
        <figcaption style={{
          fontFamily: fontMono,
          fontSize: 11,
          color: C.green,
          letterSpacing: 0.8,
          textTransform: 'uppercase',
        }}>
          {attribution}
        </figcaption>
      )}
    </figure>
  );
}

// Founder credit block — sits at the end as a small signed byline,
// echoing the "About the Author" tail you'd see on a longform piece.
function FounderCard() {
  return (
    <div style={{
      marginTop: 12,
      padding: '24px 0 0',
      borderTop: `1px solid ${C.border}`,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    }}>
      <div style={{
        fontFamily: fontMono,
        fontSize: 11,
        color: C.green,
        letterSpacing: 1,
        fontWeight: 600,
      }}>
        FOUNDER &amp; CHIEF ARCHITECT
      </div>
      <div style={{
        fontFamily: fontDisplay,
        fontSize: 28,
        fontWeight: 500,
        color: C.ink,
        letterSpacing: -0.4,
        lineHeight: 1.1,
      }}>
        Michael Reid
      </div>
      <p style={{
        margin: 0,
        fontFamily: fontBody,
        fontSize: 15.5,
        lineHeight: 1.7,
        color: C.inkDim,
      }}>
        With over 20 years of experience operating at the highest levels of cybersecurity and data privacy, Michael engineered BioTrax with the exact same rigor required of secure enterprise environments. He takes data protection personally, ensuring that the deeply sensitive behavioral data empowering users&rsquo; mental health remains strictly private, secure, and entirely within their control.
      </p>
    </div>
  );
}

export default function About() {
  return (
    <PageLayout
      pageTitle="About"
      kicker="OUR STORY"
      title={<>The story behind <em style={{ fontFamily: fontDisplay, fontStyle: 'italic', color: C.green, fontWeight: 400 }}>BioTrax.</em></>}
      subhead="A father&ndash;son collaboration, a fifteen-year vision, and a deeply personal mission to make clinical-grade biofeedback effortless for everyone."
    >
      <Section heading="A 15-year vision">
        <P>
          The foundation of BioTrax was laid more than 15 years ago as a collaboration between father and son. With a PhD in psychology specialising in clinical biofeedback, <Strong>Dr. Reid</Strong> spent his career treating stress, phobias, PTSD, and severe mental illness. Together, we shared a singular vision: to take the powerful, clinical benefits of biofeedback and make them accessible to the general public.
        </P>
        <P>
          At the time, consumer technology couldn&rsquo;t support this vision. Driven to make it a reality, we engineered and built our own custom biofeedback hardware from scratch to begin testing and tracking behavioural states.
        </P>
      </Section>

      <Section heading="The breakthrough — triangulating human behaviour">
        <P>
          For years, clinical biofeedback relied on cumbersome equipment like EEG sensors. The pivotal &ldquo;aha&rdquo; moment for BioTrax came as smartwatch technology matured. We realised that by cross-referencing passive data points &mdash; sleep patterns, heart rate variability (HRV), resting heart rate, and geolocation &mdash; we no longer needed clinical sensors.
        </P>
        <P>
          We had enough precise data from devices like the Apple Watch to accurately triangulate a person&rsquo;s behavioural state in real time, without them ever having to log a journal entry or attach an electrode.
        </P>
      </Section>

      <PullQuote attribution="Michael Reid, Founder">
        BioTrax isn&rsquo;t just a technical achievement &mdash; it was born out of personal necessity.
      </PullQuote>

      <Section heading="The mission — healing through insight">
        <P>
          As the founder, I personally suffered from severe anxiety and periods of depression. By applying these exact biofeedback concepts to my own life, I was able to make a full recovery. BioTrax was built to share that capability with the world.
        </P>
        <P>
          The goal is simple: to give people effortless, invisible feedback on their daily behaviours so they can take control of their mental health and reclaim their lives.
        </P>
      </Section>

      <Section heading="Built on uncompromising security">
        <P>
          Because this data is so personal and so powerful, it demands the highest level of protection. Bringing BioTrax to life required merging psychological science with enterprise-grade IT architecture &mdash; every layer designed so that the people whose data flows through the system stay completely in control of it.
        </P>
        <FounderCard />
      </Section>
    </PageLayout>
  );
}
