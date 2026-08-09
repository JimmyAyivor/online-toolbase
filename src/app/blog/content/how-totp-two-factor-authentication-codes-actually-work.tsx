// src/app/blog/content/how-totp-two-factor-authentication-codes-actually-work.tsx
export default function Post() {
  return (
    <>
      <p>
        Every 30 seconds, the six digits on your authenticator app change,
        and somehow the website you're logging into knows exactly what the
        new number is going to be — without your phone and the server
        exchanging a single message in between. That's not magic, and it's
        not the server phoning your phone in the background either. It's a
        surprisingly simple piece of math both sides compute independently,
        called TOTP.
      </p>

      <h2>The two ingredients: a shared secret and the current time</h2>
      <p>
        TOTP stands for Time-based One-Time Password, defined in RFC 6238.
        When you scan a QR code to set up two-factor authentication, that QR
        code isn't a login link — it's encoding a secret key, a random
        string that gets stored on your phone and, simultaneously, on the
        service's server. That's the one and only handshake. After that
        point, your phone and the server never need to talk about the code
        itself again.
      </p>
      <p>
        From then on, both sides independently compute the same thing:
        they take the shared secret, combine it with the current time
        rounded down to the nearest 30-second window, run the result through
        HMAC (a keyed hashing algorithm), and extract six digits from the
        output using a step called dynamic truncation. Because both sides
        have the same secret and are (roughly) reading the same clock,
        they land on the same six digits without ever communicating.
      </p>
      <p>
        This is also exactly why your phone's clock being wrong breaks
        TOTP — if your device's clock drifts far enough from the server's,
        you and the server are computing the code for different 30-second
        windows, and the numbers won't match no matter how many times you
        retry.
      </p>

      <h2>Why this is meaningfully more secure than SMS codes</h2>
      <ul>
        <li>
          <strong>Nothing gets transmitted.</strong> An SMS code travels over
          the cell network and can be intercepted through SIM-swapping
          attacks, where an attacker convinces your carrier to port your
          number to a new SIM they control. TOTP codes are computed locally
          — there's no message to intercept.
        </li>
        <li>
          <strong>It works offline.</strong> Since it's just math based on a
          shared secret and the time, TOTP works with no signal or internet
          connection at all, unlike SMS.
        </li>
        <li>
          <strong>Each code is genuinely short-lived.</strong> A 30-second
          window is a small target — even if a code were somehow observed,
          it's useless within seconds.
        </li>
      </ul>

      <h2>What the settings you sometimes see actually control</h2>
      <p>
        Most services never expose these, but if you're setting up your own
        TOTP integration or troubleshooting one, three parameters define the
        exact code you get:
      </p>
      <ul>
        <li>
          <strong>Digits</strong> — almost always 6, occasionally 8 for
          services wanting extra resistance to brute-force guessing.
        </li>
        <li>
          <strong>Period</strong> — almost always 30 seconds; 60-second
          windows exist but are less common.
        </li>
        <li>
          <strong>Algorithm</strong> — almost always SHA-1, which is fine
          here despite SHA-1 being deprecated elsewhere, since TOTP is using
          it inside HMAC in a way that isn't affected by SHA-1's known
          weaknesses. SHA-256 and SHA-512 variants exist but require both
          sides to agree on the change.
        </li>
      </ul>
      <p>
        Our{" "}
        <a href="/tools/totp-code-generator">TOTP / 2FA Code Generator</a>{" "}
        lets you plug in a secret and see the live code alongside a
        countdown to the next refresh, with all three parameters
        adjustable, useful for testing a setup or debugging why a generated
        code isn't matching what you expect.
      </p>

      <h2>FAQ</h2>

      <h3>Can someone reverse-engineer my secret from a code?</h3>
      <p>
        No — HMAC is a one-way function. Seeing a handful of six-digit codes
        gives an attacker essentially nothing useful for recovering the
        underlying secret. The actual risk is the secret itself being
        exposed directly, such as through a screenshot of the setup QR code
        or a leaked backup file.
      </p>

      <h3>What happens if I lose my phone?</h3>
      <p>
        You lose the ability to generate codes for that account, which is
        exactly why services show backup codes during 2FA setup — save
        them somewhere safe, because they're usually your only recovery
        path besides going through account support.
      </p>

      <h3>Is TOTP the same as an authenticator app?</h3>
      <p>
        TOTP is the algorithm; Google Authenticator, Authy, 1Password, and
        similar apps are implementations of it (along with secure storage
        for your secrets and a decent interface). Any correct TOTP
        implementation will produce identical codes from the same secret,
        which is why you can move a TOTP secret between apps if you saved it
        during setup.
      </p>

      <h2>Conclusion</h2>
      <p>
        TOTP's elegance is that it needs no ongoing communication at all —
        just a one-time shared secret and a clock both sides can read. That
        simplicity is exactly why it's more resistant to interception than
        SMS-based codes, and why it's become the default for anyone serious
        about account security. If you're setting up or debugging a 2FA
        flow, the{" "}
        <a href="/tools/totp-code-generator">TOTP / 2FA Code Generator</a>{" "}
        is a fast way to see exactly what code a given secret should be
        producing right now.
      </p>
    </>
  );
}
