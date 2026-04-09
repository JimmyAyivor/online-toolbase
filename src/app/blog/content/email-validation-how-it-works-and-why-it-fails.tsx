// src/app/blog/content/email-validation-how-it-works-and-why-it-fails.tsx
export default function Post() {
  return (
    <>
      <p>
        Email validation is one of those tasks that looks simple "just check if
        it has an @ sign" right up until you try to do it properly. The actual
        specification for valid email addresses is surprisingly permissive
        (technically, <code>user+tag@sub.domain.co.uk</code>,{" "}
        <code>"spaces allowed"@example.com</code>, and even <code>@</code>{" "}
        symbols in certain positions are all valid). What most applications
        actually need is something between strict RFC compliance and accepting
        obviously broken input.
      </p>

      <h2>What email validation actually checks</h2>
      <p>
        Our <a href="/tools/email-validator">Email Validator</a> checks whether
        an email address is syntactically valid that it conforms to the correct
        format. This catches the most common input errors: missing @ signs,
        double dots, invalid characters, missing domains, and malformed
        extensions.
      </p>
      <p>
        Syntactic validation is the fast, offline check. It doesn't tell you
        whether the address belongs to a real person, whether the mailbox
        accepts email, or whether the address will bounce. For those deeper
        checks, you need either a DNS lookup (checking whether the domain's MX
        records exist) or an actual send.
      </p>

      <h2>The three levels of email validation</h2>

      <h3>Level 1: Format validation (syntax check)</h3>
      <p>
        Does the string look like an email address? The standard approach:
        validate against a regex or a proper email parsing library. This catches
        "user@" (no domain), "user.example.com" (no @), "@example.com" (no local
        part), and similar obvious errors. Should happen on form submit,
        client-side.
      </p>

      <h3>Level 2: Domain validation (DNS check)</h3>
      <p>
        Does the domain exist and have mail exchange records? An email to{" "}
        <code>user@thisdomaindoesnotexist.com</code> will always bounce. A DNS
        MX record lookup can verify the domain accepts email before you attempt
        delivery. This requires a server-side check and a small latency cost,
        but catches a large category of fake or mistyped emails.
      </p>

      <h3>Level 3: Deliverability verification</h3>
      <p>
        Does this specific mailbox exist and accept email? This requires
        actually attempting delivery (or using a verification service that
        does). It catches <code>notreal@gmail.com</code>,{" "}
        <code>disposable@temp-mail.org</code>, and role addresses like{" "}
        <code>noreply@</code> where actual delivery isn't wanted. Third-party
        email verification services provide this as an API.
      </p>

      <h2>Common validation mistakes in applications</h2>

      <h3>Rejecting valid addresses</h3>
      <p>
        Overly strict regex patterns reject legitimate email addresses.
        Addresses with plus signs (<code>user+filter@gmail.com</code>) are valid
        and commonly used. Subdomains (<code>user@mail.company.co.uk</code>) are
        valid. Numeric TLDs are valid. International domain names are valid. A
        surprising number of sign-up forms reject valid emails from users who
        then assume your product is broken.
      </p>

      <h3>Only validating on the server</h3>
      <p>
        Client-side validation should happen immediately on form submit telling
        users about a typo before a page reload is a better experience.
        Server-side validation must also happen regardless, since client-side
        validation can be bypassed.
      </p>

      <h3>Using validation as a deliverability guarantee</h3>
      <p>
        A valid email format doesn't mean the address will receive your message.
        Spam filters, full inboxes, deactivated accounts, and temporary domains
        all cause delivery failures that format validation cannot predict.
      </p>

      <h2>Email validation for forms: practical approach</h2>
      <p>
        For most applications, a combination of syntax validation on submit and
        a domain DNS check on registration provides a good balance of coverage
        and performance overhead. Add email confirmation (sending a link the
        user must click) for anything where deliverability matters newsletter
        signup, account creation, order confirmation.
      </p>

      <h2>FAQ</h2>

      <h3>
        Is <code>user+tag@gmail.com</code> a valid email?
      </h3>
      <p>
        Yes the plus sign is valid in the local part of an email address (before
        the @). Gmail uses the plus sign for filtering: mail sent to{" "}
        <code>user+tag@gmail.com</code> is delivered to{" "}
        <code>user@gmail.com</code>. Many users use this deliberately. Rejecting
        it in validation is a mistake.
      </p>

      <h3>Can an email address have multiple @ symbols?</h3>
      <p>
        The unquoted local part cannot contain @. However, a quoted local part
        technically can: <code>"user@name"@example.com</code> is technically
        valid per the RFC but almost never encountered in practice and many
        systems don't support it.
      </p>

      <h3>Should I validate email on the front end or back end?</h3>
      <p>
        Both. Front-end validation gives users immediate feedback on obvious
        typos. Back-end validation ensures invalid data never enters your system
        even if someone bypasses the form. Never rely solely on front-end
        validation for security or data quality.
      </p>

      <h2>Conclusion</h2>
      <p>
        For quick format checking, use the{" "}
        <a href="/tools/email-validator">Email Validator</a> to verify an
        address before use. For applications, implement format validation on the
        client and DNS/MX checks on the server. For high-stakes deliverability
        (email marketing, transactional email), add an email verification step
        or use a verification service.
      </p>
    </>
  );
}
