import { Nav } from "@/components/nav";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-16 prose-invert">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        <div className="space-y-6 text-zinc-400 text-sm leading-relaxed">
          <p>Last updated: February 2026</p>

          <p>
            ogpix (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates
            the ogpix.dev website and API service. This Privacy Policy explains
            how we collect, use, and protect your personal information in
            compliance with the Act on the Protection of Personal Information of
            Japan (個人情報保護法 / APPI) and other applicable laws.
          </p>

          <Section title="1. Information We Collect">
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Account information:</strong> Email address, name, and
                password hash when you sign up.
              </li>
              <li>
                <strong>OAuth data:</strong> If you sign in via GitHub, we
                receive your public profile information (name, email, avatar).
              </li>
              <li>
                <strong>Payment information:</strong> Processed by Stripe. We do
                not store credit card numbers. We store your Stripe customer ID
                for subscription management.
              </li>
              <li>
                <strong>Usage data:</strong> API call counts per month for
                billing and rate limiting.
              </li>
              <li>
                <strong>Log data:</strong> IP addresses and request metadata for
                security and abuse prevention.
              </li>
            </ul>
          </Section>

          <Section title="2. Purpose of Use (利用目的)">
            <p>We use your personal information for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Providing and operating the ogpix service</li>
              <li>Managing user accounts and authentication</li>
              <li>Processing payments and managing subscriptions</li>
              <li>Tracking API usage for billing and rate limiting</li>
              <li>Communicating service updates and support</li>
              <li>Preventing fraud and abuse</li>
              <li>Improving the service</li>
            </ul>
            <p>
              We will not use your personal information beyond the scope of these
              stated purposes without your prior consent, except as permitted by
              law.
            </p>
          </Section>

          <Section title="3. Third-Party Sharing (第三者提供)">
            <p>
              We do not sell your personal information. We share data with the
              following third parties only as necessary to operate the service:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Stripe, Inc.</strong> - Payment processing (US-based;
                see Stripe&apos;s privacy policy)
              </li>
              <li>
                <strong>Vercel Inc.</strong> - Hosting infrastructure (US-based)
              </li>
              <li>
                <strong>GitHub, Inc.</strong> - OAuth authentication, only if you
                choose to sign in with GitHub
              </li>
            </ul>
            <p>
              These transfers to entities outside Japan are conducted in
              compliance with APPI Article 28 (cross-border transfer
              requirements).
            </p>
          </Section>

          <Section title="4. Data Security (安全管理措置)">
            <p>
              We implement appropriate organizational and technical measures to
              protect your personal information, including:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Passwords are hashed using bcrypt</li>
              <li>All data transmitted over HTTPS</li>
              <li>API keys are generated using cryptographic random bytes</li>
              <li>Database access is restricted</li>
            </ul>
          </Section>

          <Section title="5. Your Rights (開示等の請求)">
            <p>
              Under the APPI, you have the right to request disclosure,
              correction, deletion, or cessation of use of your personal
              information. To exercise these rights, contact us at the email
              below. We will respond without delay after verifying your identity.
            </p>
            <p>You can also:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Delete your API keys from the dashboard at any time</li>
              <li>Cancel your subscription at any time</li>
              <li>Request complete account deletion by contacting us</li>
            </ul>
          </Section>

          <Section title="6. Cookies">
            <p>
              We use essential cookies for authentication (session management).
              We do not use third-party tracking cookies or advertising cookies.
            </p>
          </Section>

          <Section title="7. Data Retention">
            <p>
              We retain your account data for as long as your account is active.
              After account deletion, we delete your personal data within 30
              days, except where retention is required by law (e.g., tax
              records).
            </p>
          </Section>

          <Section title="8. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. Material
              changes will be notified via the email associated with your
              account.
            </p>
          </Section>

          <Section title="9. Contact (個人情報取扱事業者)">
            <p>
              For privacy-related inquiries, including requests for disclosure,
              correction, or deletion of personal information:
            </p>
            <p>Email: support@ogpix.dev</p>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-zinc-200 mb-2">{title}</h2>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
