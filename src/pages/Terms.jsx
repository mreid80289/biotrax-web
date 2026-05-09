import PageLayout, { Section, P, UL, Strong } from './PageLayout.jsx';

export default function Terms() {
  return (
    <PageLayout
      pageTitle="Terms of Service"
      kicker="LEGAL"
      title="Terms of Service"
      lastUpdated="May 2026"
      subhead="These terms govern your use of the BioTrax website and the BioTrax iOS application during our closed beta. They&apos;re short on purpose — we&apos;ll keep them that way."
    >

      <Section heading="Plain-language summary">
        <P>
          Before the legal language: BioTrax is a passive monitoring tool, not a medical device or a substitute for professional care. Use it for what it&apos;s designed for. If you&apos;re in crisis, call emergency services. We&apos;re still in closed beta, so things may break and features may change. By using BioTrax, you agree to the rest of this document.
        </P>
      </Section>

      <Section heading="Who these terms are between">
        <P>
          These terms (&quot;Terms&quot;) form a binding agreement between <Strong>BioTrax</Strong>, a Swedish entity (&quot;BioTrax,&quot; &quot;we,&quot; &quot;us,&quot; &quot;our&quot;), and you, the person using our website or our iOS application (the &quot;Service&quot;).
        </P>
      </Section>

      <Section heading="What BioTrax is, and isn&apos;t">
        <P>
          BioTrax is a wellness-monitoring tool for iPhone and Apple Watch. It reads signals from Apple HealthKit and other on-device sources to compute a Baseline Score and surface gentle nudges.
        </P>
        <P>
          <Strong>BioTrax is not a medical device.</Strong> It is not intended to diagnose, treat, cure, or prevent any disease, including depression, anxiety, or any other mental health condition. The Service is not a substitute for professional medical, psychological, or psychiatric advice, diagnosis, or treatment. Always seek the advice of a qualified clinician with any questions about your health.
        </P>
        <P>
          <Strong>If you are in crisis, do not rely on BioTrax.</Strong> Call emergency services on 112 (Sweden), 988 (United States), or the equivalent number for your region. The app is designed to surface signals before a crisis develops; it is not designed to intervene in an active one.
        </P>
      </Section>

      <Section heading="Eligibility">
        <P>
          You must be at least 16 years old to use BioTrax. By using the Service, you confirm that you meet this requirement.
        </P>
      </Section>

      <Section heading="Beta status">
        <P>
          BioTrax is currently in <Strong>closed beta</Strong>. That means:
        </P>
        <UL>
          <li>The Service may be unavailable, change, or break without notice.</li>
          <li>Features may be added, removed, or changed at any time.</li>
          <li>You may be asked to participate in feedback discussions, but you&apos;re never required to.</li>
          <li>The Service is provided free during beta. We&apos;ll write to you about pricing well before any billing begins.</li>
        </UL>
      </Section>

      <Section heading="Your account, your data, your devices">
        <P>
          You are responsible for the security of the Apple ID and the device on which you use BioTrax. Protect your device with a passcode and biometric lock — much of what BioTrax processes is sensitive health data, and device-level security is the first line of defence.
        </P>
        <P>
          You retain ownership of your data. We process it only as described in our <Strong>Privacy Policy</Strong>, which is part of these Terms by reference.
        </P>
      </Section>

      <Section heading="Acceptable use">
        <P>
          When using BioTrax, you agree not to:
        </P>
        <UL>
          <li>Use the Service in any way that violates Swedish or applicable law.</li>
          <li>Attempt to reverse-engineer, decompile, or extract source code from the app, except as expressly permitted by Swedish law.</li>
          <li>Interfere with the operation of the Service, including by overloading our infrastructure, attempting to bypass security controls, or scraping the website.</li>
          <li>Misrepresent yourself in any communications with us or with a Trusted Contact.</li>
          <li>Use the Service to harm, surveil, or coerce another person — including a Trusted Contact who has not freely consented.</li>
        </UL>
      </Section>

      <Section heading="Intellectual property">
        <P>
          BioTrax, our logo, the app, this website, and the underlying software, designs, and content are owned by us and protected by Swedish and international intellectual property law. We grant you a limited, personal, non-transferable, non-exclusive licence to use the Service for its intended purpose. We don&apos;t grant any other rights.
        </P>
      </Section>

      <Section heading="Third-party services">
        <P>
          BioTrax depends on Apple HealthKit, the App Store, iOS, and a small number of subprocessors listed in our Privacy Policy. We&apos;re not responsible for outages, errors, or policy changes at those services, and our Service may stop working in ways outside our control if they change.
        </P>
      </Section>

      <Section heading="Termination">
        <P>
          You can stop using the Service at any time by uninstalling the app and asking us to delete any data we hold about you (write to support@biotrax.se).
        </P>
        <P>
          We can suspend or terminate your access if you violate these Terms — in which case we&apos;ll tell you why, in writing, and give you a fair opportunity to remedy the issue where reasonable.
        </P>
      </Section>

      <Section heading="Disclaimers">
        <P>
          The Service is provided <Strong>&quot;as is&quot; and &quot;as available.&quot;</Strong> While we put serious work into making it reliable and accurate, we don&apos;t guarantee it will be uninterrupted, error-free, or that the signals it surfaces will catch every relevant pattern. The Baseline Score is a model output, not a clinical diagnosis.
        </P>
        <P>
          To the fullest extent permitted by Swedish law, we disclaim all implied warranties — including merchantability, fitness for a particular purpose, and non-infringement — except those that cannot be excluded under mandatory consumer protection law.
        </P>
      </Section>

      <Section heading="Limitation of liability">
        <P>
          To the maximum extent permitted by applicable law, BioTrax is not liable for indirect, incidental, special, consequential, or punitive damages arising from or related to your use of the Service. Our total liability for any direct damages is limited to the amount you have paid us for the Service in the 12 months before the event giving rise to the claim — which, during beta, is zero.
        </P>
        <P>
          Nothing in these Terms limits liability that cannot lawfully be limited under Swedish consumer protection law, including liability for gross negligence, intentional misconduct, or death and personal injury caused by negligence.
        </P>
      </Section>

      <Section heading="Governing law and disputes">
        <P>
          These Terms are governed by the laws of <Strong>Sweden</Strong>. Disputes will be resolved in the Swedish courts. If you are a consumer, you also retain the right to bring claims under the mandatory law of your country of residence in the EU.
        </P>
        <P>
          For consumer disputes, you can also use the EU Online Dispute Resolution platform at ec.europa.eu/consumers/odr.
        </P>
      </Section>

      <Section heading="Changes to these terms">
        <P>
          We may update these Terms from time to time. When we make material changes, we&apos;ll update the &quot;Last updated&quot; date at the top and — for changes that meaningfully affect your rights — notify you by email (if you&apos;re on the waitlist) or in the app, at least 30 days before the changes take effect.
        </P>
      </Section>

      <Section heading="Contact">
        <P>
          Questions about these Terms? Write to <Strong>support@biotrax.se</Strong>.
        </P>
      </Section>

    </PageLayout>
  );
}
