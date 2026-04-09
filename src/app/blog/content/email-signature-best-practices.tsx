// src/app/blog/content/email-signature-best-practices.tsx
export default function Post() {
  return (
    <>
      <p>
        An email signature is a small but persistent brand touchpoint it appears
        on every email you send and communicates your professionalism, contact
        information, and what you do. Most people either have no signature, a
        bare-bones signature from 2015 that hasn't been updated, or an
        overwrought mess of fonts, logos, quotes, and social icons that takes
        longer to load than the email itself.
      </p>

      <h2>What a good email signature includes</h2>
      <p>The essential elements:</p>
      <ul>
        <li>
          <strong>Full name</strong>
        </li>
        <li>
          <strong>Title and company</strong>
        </li>
        <li>
          <strong>Phone number</strong> (if you want people to call you)
        </li>
        <li>
          <strong>Website URL</strong>
        </li>
        <li>
          <strong>LinkedIn profile URL</strong> (for professional contexts)
        </li>
      </ul>
      <p>Optional elements that add value in the right contexts:</p>
      <ul>
        <li>Company logo (small, properly optimised image under 20KB)</li>
        <li>Scheduling link (Calendly, etc.) to reduce back-and-forth</li>
        <li>Current role or tagline if it's not self-evident from title</li>
        <li>
          Social links relevant to the recipient (Twitter for tech contacts,
          Instagram for creative contacts)
        </li>
        <li>A short, relevant CTA ("Currently accepting projects for Q3 →")</li>
      </ul>
      <p>
        Use our <a href="/tools/signature-generator">Signature Generator</a> to
        create a clean, formatted email signature you can copy directly into
        your email client settings.
      </p>

      <h2>What to leave out</h2>
      <ul>
        <li>
          <strong>Inspirational quotes:</strong> Universally disliked by
          recipients and do nothing for your professional image
        </li>
        <li>
          <strong>Disclaimer text in large blocks:</strong> "This email is
          confidential..." paragraphs are ignored by everyone and may not be
          legally meaningful anyway; keep any required disclaimer brief
        </li>
        <li>
          <strong>Every social network you're on:</strong> Include 1–2 relevant
          platforms, not 8 icons
        </li>
        <li>
          <strong>Excessive colours and fonts:</strong> HTML signature
          formatting renders inconsistently across email clients; simple is more
          reliable
        </li>
        <li>
          <strong>Large images:</strong> A 500KB logo in every email is annoying
          and marks your emails as potential spam
        </li>
      </ul>

      <h2>Signature length</h2>
      <p>
        A signature that's longer than the email body looks absurd. Aim for 4–6
        lines maximum for most professional contexts. Internal emails within a
        company can use shorter signatures (name, title) since recipients
        already know your company.
      </p>
      <p>
        Set up different signatures for different contexts if your email client
        supports it: full signature for first emails to new contacts, brief
        signature for replies and internal emails.
      </p>

      <h2>HTML vs plain text signatures</h2>
      <p>
        HTML signatures support formatting, logos, and clickable links. Plain
        text signatures work everywhere without rendering issues. The practical
        trade-off: HTML signatures look polished when they render correctly but
        can look broken in email clients that don't support them fully. Test
        your HTML signature in multiple email clients before deploying it
        company-wide.
      </p>

      <h2>FAQ</h2>

      <h3>Should my signature include my physical address?</h3>
      <p>
        For business-to-consumer marketing emails, yes the CAN-SPAM Act (US) and
        similar laws in other jurisdictions require a physical mailing address.
        For regular professional emails, your address is optional and often
        unnecessary. Include it if clients need it for invoicing or
        correspondence; omit it if it's just adding noise.
      </p>

      <h3>How do I add an HTML signature to Gmail/Outlook?</h3>
      <p>
        Gmail: Settings → See all settings → General → Signature. Paste HTML or
        use the visual editor. Outlook: File → Options → Mail → Signatures.
        Create a new signature with the formatted content from the{" "}
        <a href="/tools/signature-generator">Signature Generator</a>.
      </p>

      <h3>Is it unprofessional to have no email signature?</h3>
      <p>
        For internal company emails, no signature is fine everyone knows who you
        are. For external professional emails (clients, partners, job
        applications), having no signature misses an opportunity and can come
        across as casual when formality is expected.
      </p>

      <h2>Conclusion</h2>
      <p>
        A good email signature is short, informative, and consistent. Include
        your name, title, company, phone, and one or two key links. Leave out
        quotes, excessive icons, and large images. Use the{" "}
        <a href="/tools/signature-generator">Signature Generator</a> to create a
        clean formatted signature in seconds and update it any time your details
        change.
      </p>
    </>
  );
}
