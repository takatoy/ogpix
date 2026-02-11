import { Nav } from "@/components/nav";

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        <div className="space-y-6 text-zinc-400 text-sm leading-relaxed">
          <p>Last updated: February 2026</p>

          <Section title="1. Acceptance of Terms">
            <p>
              By accessing or using ogpix (&quot;the Service&quot;), you agree to
              be bound by these Terms of Service. If you do not agree, do not use
              the Service.
            </p>
          </Section>

          <Section title="2. Service Description">
            <p>
              ogpix provides an API and web dashboard for generating Open Graph
              images. The Service is provided on a subscription basis with free
              and paid tiers.
            </p>
          </Section>

          <Section title="3. Accounts">
            <p>
              You must provide accurate information when creating an account. You
              are responsible for maintaining the confidentiality of your account
              credentials and API keys. You are responsible for all activity
              under your account.
            </p>
          </Section>

          <Section title="4. API Usage">
            <ul className="list-disc pl-5 space-y-1">
              <li>
                You must not use the API to generate illegal, harmful, or
                infringing content.
              </li>
              <li>
                You must not attempt to circumvent rate limits or usage
                restrictions.
              </li>
              <li>
                You must not share your API keys publicly or with unauthorized
                parties.
              </li>
              <li>
                We reserve the right to suspend accounts that violate these
                terms or engage in abusive behavior.
              </li>
            </ul>
          </Section>

          <Section title="5. Pricing and Payment">
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Free tier: 100 image generations per month at no cost.
              </li>
              <li>
                Paid plans are billed monthly via Stripe. Prices are listed on
                the pricing page and are inclusive of applicable taxes where
                required.
              </li>
              <li>
                You may cancel your subscription at any time. Cancellation takes
                effect at the end of the current billing period.
              </li>
              <li>
                We reserve the right to change pricing with 30 days advance
                notice.
              </li>
            </ul>
          </Section>

          <Section title="6. Intellectual Property">
            <p>
              Images generated through the Service are owned by you. The ogpix
              service, including its templates, code, and branding, are owned by
              us and protected by applicable intellectual property laws.
            </p>
          </Section>

          <Section title="7. Disclaimer of Warranties">
            <p>
              The Service is provided &quot;as is&quot; without warranties of any
              kind, express or implied. We do not guarantee uninterrupted or
              error-free service. The Business plan includes an SLA as described
              on the pricing page.
            </p>
          </Section>

          <Section title="8. Limitation of Liability">
            <p>
              To the maximum extent permitted by law, our liability for any
              claims arising from the use of the Service is limited to the
              amount you paid us in the 12 months preceding the claim. We are not
              liable for indirect, incidental, or consequential damages.
            </p>
            <p>
              Nothing in these terms excludes or limits liability that cannot be
              excluded or limited under applicable Japanese law, including the
              Consumer Contract Act (消費者契約法).
            </p>
          </Section>

          <Section title="9. Termination">
            <p>
              We may suspend or terminate your account if you violate these
              terms. You may delete your account at any time by contacting us.
              Upon termination, your right to use the Service ceases immediately.
            </p>
          </Section>

          <Section title="10. Governing Law and Jurisdiction">
            <p>
              These Terms are governed by and construed in accordance with the
              laws of Japan. Any disputes arising from these Terms shall be
              subject to the exclusive jurisdiction of the Tokyo District Court
              as the court of first instance.
            </p>
          </Section>

          <Section title="11. Changes to Terms">
            <p>
              We may modify these Terms at any time. Material changes will be
              notified via email or a prominent notice on the website at least 14
              days before taking effect. Continued use after the effective date
              constitutes acceptance.
            </p>
          </Section>

          <Section title="12. Contact">
            <p>
              For questions about these Terms, contact us at: support@ogpix.dev
            </p>
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
