// src/app/blog/content/jwt-tokens-explained.tsx
export default function Post() {
  return (
    <>
      <p>
        JSON Web Tokens appear in almost every modern web authentication system
        in Authorization headers, cookies, URL parameters, and mobile app
        storage. Most developers use them without fully understanding their
        structure, which leads to security mistakes. A JWT looks like random
        gibberish until you decode it, at which point it's surprisingly readable
        and the security model becomes much clearer.
      </p>

      <h2>What a JWT is</h2>
      <p>
        A JWT (pronounced "jot") is a compact, URL-safe token that encodes a
        JSON object along with a cryptographic signature. It consists of three
        Base64URL-encoded sections separated by dots:
      </p>
      <pre>
        <code>
          eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsaWNlIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
        </code>
      </pre>
      <p>
        The three sections are: <strong>Header</strong>,{" "}
        <strong>Payload</strong>, and <strong>Signature</strong>.
      </p>
      <p>
        Our <a href='/tools/jwt-decoder'>JWT Decoder</a> decodes all three
        sections instantly paste any JWT and see the full contents in readable
        JSON.
      </p>

      <h2>Decoding the three sections</h2>

      <h3>Header</h3>
      <p>
        The first section decodes to a JSON object specifying the token type and
        signing algorithm:
      </p>
      <pre>
        <code>{`{
  "alg": "HS256",
  "typ": "JWT"
}`}</code>
      </pre>
      <p>
        Common algorithms: HS256 (HMAC-SHA256, uses a shared secret), RS256
        (RSA, uses a private/public key pair), ES256 (ECDSA). The algorithm
        matters for verification HS256 requires the secret to verify; RS256 uses
        the public key.
      </p>

      <h3>Payload (claims)</h3>
      <p>The second section decodes to the token's actual data the "claims":</p>
      <pre>
        <code>{`{
  "sub": "1234567890",
  "name": "Alice",
  "email": "alice@example.com",
  "role": "admin",
  "iat": 1516239022,
  "exp": 1516242622
}`}</code>
      </pre>
      <p>Registered claims (standardised meanings):</p>
      <ul>
        <li>
          <code>sub</code> Subject: the entity the token represents (typically a
          user ID)
        </li>
        <li>
          <code>iss</code> Issuer: who created the token
        </li>
        <li>
          <code>aud</code> Audience: who the token is intended for
        </li>
        <li>
          <code>exp</code> Expiration: Unix timestamp after which the token is
          invalid
        </li>
        <li>
          <code>iat</code> Issued at: Unix timestamp when the token was created
        </li>
        <li>
          <code>nbf</code> Not before: Unix timestamp before which the token is
          invalid
        </li>
      </ul>
      <p>
        Custom claims can include any application-specific data user roles,
        permissions, account details.
      </p>

      <h3>Signature</h3>
      <p>
        The signature is computed by taking the encoded header and payload,
        joining with a dot, and signing with the algorithm and key:
      </p>
      <pre>
        <code>
          HMACSHA256(base64url(header) + "." + base64url(payload), secret)
        </code>
      </pre>
      <p>
        The signature proves the token hasn't been tampered with. If anyone
        modifies the header or payload, the signature won't match and the token
        is invalid. The signature cannot be forged without the signing key.
      </p>

      <h2>The critical security point: JWTs are not encrypted</h2>
      <p>
        This is the most important thing to understand about JWTs. The header
        and payload are Base64URL-encoded not encrypted. Anyone who intercepts a
        JWT can decode and read every claim in the payload. The signature
        provides integrity (tamper detection) but not confidentiality.
      </p>
      <p>Implications:</p>
      <ul>
        <li>
          Never put sensitive data in a JWT payload passwords, payment card
          numbers, PII unless the entire token is encrypted (JWE, not JWS)
        </li>
        <li>
          JWTs are safe to transmit over HTTPS (which encrypts the transport),
          but the token itself is readable
        </li>
        <li>
          Anyone with the token can read its contents, so treat JWTs as
          credentials store them securely
        </li>
      </ul>

      <h2>JWT storage and security</h2>
      <p>Where you store a JWT determines its attack surface:</p>
      <ul>
        <li>
          <strong>HTTP-only cookies:</strong> Not accessible to JavaScript,
          protected against XSS. Vulnerable to CSRF (mitigated with SameSite
          cookie attribute).
        </li>
        <li>
          <strong>localStorage:</strong> Accessible to JavaScript vulnerable to
          XSS attacks. If your site has any XSS vector, tokens in localStorage
          are at risk.
        </li>
        <li>
          <strong>sessionStorage:</strong> Same XSS risk as localStorage,
          cleared when tab closes.
        </li>
        <li>
          <strong>Memory (JavaScript variable):</strong> Not persisted across
          page reloads, not accessible to other scripts. Safest against XSS but
          requires re-authentication after reload.
        </li>
      </ul>
      <p>
        For most web applications, HTTP-only cookies with SameSite=Strict is the
        recommended pattern.
      </p>

      <h2>Token expiration and refresh</h2>
      <p>
        JWTs cannot be invalidated once issued the server has no record of
        issued tokens to revoke. The expiration (<code>exp</code>) claim is the
        primary mechanism for limiting token lifetime. Short-lived access tokens
        (15 minutes to 1 hour) combined with longer-lived refresh tokens (days
        to weeks) is the standard pattern:
      </p>
      <ul>
        <li>Access token: short expiry, used in API requests</li>
        <li>
          Refresh token: longer expiry, stored securely, used to obtain new
          access tokens
        </li>
        <li>
          Refresh tokens can be stored server-side with a revocation mechanism,
          solving the "can't invalidate JWTs" problem
        </li>
      </ul>

      <h2>FAQ</h2>

      <h3>Can I trust the data in a JWT's payload?</h3>
      <p>
        Only if you verify the signature first. An unverified JWT payload could
        have been crafted by anyone. Always verify the signature using the
        issuer's public key or shared secret before trusting any claims.
      </p>

      <h3>What's the difference between JWT and session tokens?</h3>
      <p>
        Traditional session tokens are opaque random strings stored server-side
        the server looks up the session ID to find the associated data. JWTs are
        self-contained all the data is in the token itself, and the server only
        needs the signing key to verify it. JWTs enable stateless
        authentication; session tokens require server-side storage.
      </p>

      <h3>Why does my JWT decode to readable JSON if it's "secure"?</h3>
      <p>
        The security comes from the signature, not the encoding. Base64URL
        encoding makes the token URL-safe and compact, not secret. The token is
        designed to be readable it's the signature that prevents tampering. This
        is often surprising to developers first encountering JWTs.
      </p>

      <h2>Conclusion</h2>
      <p>
        JWTs are self-contained tokens whose security depends entirely on
        signature verification, not on the encoding of the payload. Use the{" "}
        <a href='/tools/jwt-decoder'>JWT Decoder</a> to inspect any token's
        claims, verify expiration, and debug authentication issues and remember
        that decoding a JWT requires no secret, because the payload is not
        encrypted.
      </p>
    </>
  );
}
