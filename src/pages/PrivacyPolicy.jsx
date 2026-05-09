import PageLayout, { Section, P, UL, Strong } from './PageLayout.jsx';

export default function PrivacyPolicy() {
  return (
    <PageLayout
      pageTitle="Privacy Policy"
      kicker="LEGAL"
      title="Privacy Policy"
      lastUpdated="May 2026"
      subhead="This policy explains what data BioTrax collects, why we collect it, and the rights you have over it under the EU General Data Protection Regulation (GDPR) and Swedish data protection law."
    >

      <Section heading="Who we are">
        <P>
          <Strong>BioTrax</Strong> (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;) is a registered Swedish entity that builds passive nervous-system monitoring software for iPhone and Apple Watch. We are the data controller for the personal data described in this policy. You can reach us at <Strong>support@biotrax.se</Strong>.
        </P>
      </Section>

      <Section heading="The principles we operate on">
        <P>
          Two ideas shape every decision in this policy:
        </P>
        <UL>
          <li><Strong>Data minimisation.</Strong> We collect the smallest amount of data needed to make the product work, and we don&apos;t collect data we don&apos;t need.</li>
          <li><Strong>Privacy by default.</Strong> The most private setting is the default. We never widen the data we collect without asking you first.</li>
        </UL>
      </Section>

      <Section heading="Data we collect on this website">
        <P>
          When you join the waitlist, we collect <Strong>your email address</Strong>. That&apos;s the only data this website actively collects from you.
        </P>
        <P>
          Submissions are routed through Web3Forms, a third-party form processor. See &quot;Subprocessors&quot; below for details on how they handle your email.
        </P>
        <P>
          We do not use Google Analytics, Mixpanel, Hotjar, Meta Pixel, advertising trackers, or any other behavioural-tracking tool on this website. Cloudflare (our hosting provider) records standard server logs — IP address, user agent, request timestamps — for the limited purposes of security, abuse prevention, and basic uptime monitoring. These logs are retained for short periods and are not used to build profiles about you.
        </P>
      </Section>

      <Section heading="Data the BioTrax app processes on your device">
        <P>
          The BioTrax iOS app is designed so that the data needed to compute your Baseline Score is read from Apple HealthKit, processed entirely on your device, and never leaves your phone unless you explicitly choose to share with a Trusted Contact. Specifically, the app reads:
        </P>
        <UL>
          <li><Strong>Heart rate variability</Strong> (SDNN and RMSSD) from your Apple Watch, via HealthKit, to compute stress-resilience signals.</li>
          <li><Strong>Sleep data</Strong> (total time, efficiency, continuity, breathing rate) via HealthKit, to compute sleep-pattern signals.</li>
          <li><Strong>Step counts and movement</Strong> via HealthKit, to contextualise stress and sleep.</li>
          <li><Strong>Coarse location patterns</Strong> via CoreLocation significant-location-change events, to compute home-stay patterns. We do not collect continuous GPS tracks, do not record specific places you visit, and do not transmit raw coordinates.</li>
          <li><Strong>Aggregated screen-time category usage</Strong> via Apple&apos;s Screen Time and DeviceActivity APIs (e.g. how many minutes you spent in &quot;Communication&quot; vs. &quot;Social&quot; categories overall). We do not collect a list of which specific apps you use, your messages, your contacts, your browsing history, or anything you type or view.</li>
        </UL>
        <P>
          All of the above is processed in an on-device extension. The only data that ever leaves your device is a summary of your scores, and only after you explicitly enable sharing with a Trusted Contact (described below).
        </P>
      </Section>

      <Section heading="Data we transmit when you share with a Trusted Contact">
        <P>
          If you choose to invite a Trusted Contact, the BioTrax app sends a small summary payload — your Baseline Score, category statuses (sleep, stress, social, location), and timestamps — to your contact&apos;s BioTrax app. This payload is end-to-end encrypted in transit. We do not store the contents of this payload in plain text on our servers.
        </P>
        <P>
          You can revoke a Trusted Contact at any time from inside the app. When you do, sharing stops immediately and any cached payloads on your contact&apos;s device are scheduled for deletion the next time their app syncs.
        </P>
      </Section>

      <Section heading="The legal basis for processing your data">
        <P>
          Under the GDPR, we rely on the following legal bases:
        </P>
        <UL>
          <li><Strong>Explicit consent (Article 9(2)(a)).</Strong> Heart-rate variability, sleep, location patterns, and screen-time category data fall under &quot;special category&quot; data under the GDPR. We process them only after you give explicit consent in the app, with a clear description of what each category is used for. You can withdraw any of these consents at any time, signal-by-signal.</li>
          <li><Strong>Performance of a contract (Article 6(1)(b)).</Strong> Processing your waitlist email so we can write to you about beta access and product launch.</li>
          <li><Strong>Legitimate interests (Article 6(1)(f)).</Strong> Limited server-log processing by Cloudflare for security and abuse prevention.</li>
        </UL>
      </Section>

      <Section heading="Subprocessors">
        <P>
          We use the following third-party services to operate. Each of them processes a narrow slice of data on our behalf and is bound by appropriate data-processing terms:
        </P>
        <UL>
          <li><Strong>Cloudflare, Inc.</Strong> — website hosting, DNS, edge security. Receives standard server-log data (IP, timestamps).</li>
          <li><Strong>Web3Forms</Strong> — receives waitlist email submissions and forwards them to our team inbox.</li>
          <li><Strong>Apple, Inc.</Strong> — App Store distribution, push notifications (for Trusted Contact alerts only). Push payloads are encrypted; Apple cannot read their contents.</li>
        </UL>
        <P>
          We do not use third-party analytics, advertising networks, profile-builders, or data brokers. We do not sell your data. We do not share data with anyone outside the subprocessors above.
        </P>
      </Section>

      <Section heading="International transfers">
        <P>
          Some of our subprocessors (Cloudflare, Web3Forms, Apple) are based in or transfer data to the United States. Where this happens, transfers rely on the EU-U.S. Data Privacy Framework or, where that is not applicable, on Standard Contractual Clauses approved by the European Commission, in line with Article 46 of the GDPR.
        </P>
      </Section>

      <Section heading="How long we keep your data">
        <UL>
          <li><Strong>Waitlist emails</Strong> are retained until product launch plus 12 months, or until you ask us to delete them — whichever comes first.</li>
          <li><Strong>On-device data</Strong> stays on your device for as long as you keep the app installed. Uninstalling the app removes our data alongside it.</li>
          <li><Strong>Trusted Contact share payloads</Strong> are retained on the receiving device only, and only for as long as the sharing relationship exists. They are not retained on our servers.</li>
          <li><Strong>Server logs</Strong> at our hosting provider are retained for short, standard operational windows (typically under 30 days).</li>
        </UL>
      </Section>

      <Section heading="Your rights under the GDPR">
        <P>
          You have, at any time, the right to:
        </P>
        <UL>
          <li><Strong>Access</Strong> the personal data we hold about you.</li>
          <li><Strong>Rectify</Strong> any inaccurate data.</li>
          <li><Strong>Erase</Strong> your data (the &quot;right to be forgotten&quot;).</li>
          <li><Strong>Restrict</Strong> our processing of your data.</li>
          <li><Strong>Object</Strong> to processing based on legitimate interest.</li>
          <li><Strong>Data portability</Strong> — receive your data in a machine-readable format.</li>
          <li><Strong>Withdraw consent</Strong> at any time, for any of the consents you&apos;ve given. Withdrawal does not affect processing already done before withdrawal.</li>
          <li><Strong>Lodge a complaint</Strong> with the Swedish data protection authority, the Integritetsskyddsmyndigheten (IMY), at imy.se.</li>
        </UL>
        <P>
          To exercise any of these rights, write to <Strong>support@biotrax.se</Strong>. We respond within 30 days as required by the GDPR.
        </P>
      </Section>

      <Section heading="Children">
        <P>
          BioTrax is not intended for users under 16 years of age, and we do not knowingly collect personal data from children under 16. If you believe a child under 16 has signed up to our waitlist or installed our app, contact us at <Strong>support@biotrax.se</Strong> and we will delete the data.
        </P>
      </Section>

      <Section heading="Security">
        <P>
          We protect your data with technical and organisational measures appropriate to the nature of the data, including end-to-end encryption for Trusted Contact share payloads, encryption in transit (TLS) for all network communications, on-device processing for sensitive health and location data, and the principle of least-privilege access for our team.
        </P>
        <P>
          No system is perfectly secure, and we&apos;ll be honest with you if something goes wrong. In the event of a personal data breach that creates a risk to your rights, we will notify the IMY within 72 hours and contact affected users without undue delay, as required by the GDPR.
        </P>
      </Section>

      <Section heading="Changes to this policy">
        <P>
          We may update this policy from time to time. When we make material changes, we&apos;ll update the &quot;Last updated&quot; date at the top and — for changes that meaningfully affect how your data is handled — notify you by email (if you&apos;re on the waitlist) or in the app.
        </P>
      </Section>

      <Section heading="Contact">
        <P>
          For any privacy-related question or to exercise a GDPR right, write to <Strong>support@biotrax.se</Strong>. We&apos;ll come back to you within 30 days, usually faster.
        </P>
      </Section>

    </PageLayout>
  );
}
