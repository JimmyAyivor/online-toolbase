// src/app/blog/content/how-to-create-strong-passwords.tsx
export default function Post() {
  return (
    <>
      <p>
        Password security fails in predictable ways: passwords that are too
        short, too simple, reused across multiple accounts, or stored
        insecurely. A single compromised password becomes a vulnerability across
        every account that shares it. Understanding what makes passwords strong
        and how credential attacks actually work produces better security
        decisions than any generic advice about "mixing letters and numbers."
      </p>

      <h2>How password attacks work</h2>
      <p>Most password compromises happen through one of three methods:</p>
      <ul>
        <li>
          <strong>Data breaches:</strong> A service you use is compromised and
          password hashes (or plaintext passwords) are stolen. Attackers then
          crack the hashes offline. If you reuse passwords, any breach
          compromises all accounts using that password.
        </li>
        <li>
          <strong>Brute force:</strong> Systematically trying every possible
          combination. Short passwords are vulnerable a 6-character lowercase
          password has only 308 million combinations, crackable in seconds with
          modern hardware.
        </li>
        <li>
          <strong>Dictionary attacks:</strong> Trying known words, common
          passwords, and variants. "P@ssw0rd", "password123", and "qwerty" are
          in every attack dictionary.
        </li>
        <li>
          <strong>Phishing:</strong> Tricking you into entering credentials on a
          fake site. Strong passwords don't protect against phishing that
          requires vigilance and multi-factor authentication.
        </li>
      </ul>
      <p>
        Use our <a href='/tools/password-generator'>Password Generator</a> to
        create cryptographically random passwords that resist all automated
        attack methods.
      </p>

      <h2>What makes a password strong</h2>
      <p>Two factors matter most: length and randomness.</p>
      <p>
        <strong>Length:</strong> Each additional character multiplies the search
        space exponentially. A 12-character random password has approximately
        95^12 ≈ 540 quadrillion possible combinations using a full ASCII
        character set. This takes centuries to brute force at any feasible
        attack rate. A 16-character password is not proportionally harder it's
        exponentially harder.
      </p>
      <p>
        <strong>Randomness:</strong> The unpredictability of the password. A
        20-character password based on a dictionary word with substitutions
        ("C0ff33L0v3r!") is far weaker than 20 random characters because
        attackers specifically target substitution patterns. True random
        generation (from a cryptographic source) is fundamentally different from
        "random-looking" patterns.
      </p>

      <h2>Passphrase vs random characters</h2>
      <p>
        Passphrases (four or five random words: "correct-horse-battery-staple")
        are both strong and memorable. A five-word passphrase from a 2,048-word
        dictionary has 2,048^5 ≈ 34 quadrillion possible combinations comparable
        to a 12-character random password and far easier to remember and type.
      </p>
      <p>
        For passwords you must type regularly (your device login, password
        manager master password), a passphrase is practical. For all other
        passwords, a password manager generates and stores random character
        passwords, so memorability doesn't matter.
      </p>

      <h2>Password managers are essential</h2>
      <p>
        The only practical way to have strong, unique passwords for every
        account is a password manager. Trying to memorise a unique 16-character
        random password for 50+ accounts is not realistic. Password managers
        generate, store, and auto-fill credentials. The security model: one very
        strong master password protects all others.
      </p>
      <p>
        Reputable password managers: Bitwarden (open source, free tier),
        1Password, Dashlane. Use any of these rather than browser-saved
        passwords for sensitive accounts.
      </p>

      <h2>Multi-factor authentication (MFA)</h2>
      <p>
        Enable MFA on every account that supports it, starting with email,
        financial accounts, and anywhere sensitive data is stored. MFA means a
        compromised password alone isn't enough to access an account the
        attacker also needs the second factor (TOTP app, hardware key, or SMS
        code). Authenticator apps (Google Authenticator, Authy) are more secure
        than SMS-based codes, which can be intercepted via SIM-swapping attacks.
      </p>

      <h2>FAQ</h2>

      <h3>How long should a password be?</h3>
      <p>
        Minimum 12 characters for any account. 16+ characters for sensitive
        accounts (email, banking, password manager master password). Longer is
        always better use the maximum the site allows.
      </p>

      <h3>Should I change passwords regularly?</h3>
      <p>
        Current guidance from security bodies (NIST) has moved away from
        mandatory regular rotation. Frequent rotation encourages weaker,
        predictable passwords ("Password1!" → "Password2!"). Change passwords
        when: you suspect compromise, after a breach notification, or when
        starting fresh with a password manager.
      </p>

      <h3>Is writing passwords down unsafe?</h3>
      <p>
        A written password in a physically secure location (locked drawer, safe)
        is more secure than a weak password or reused password stored only in
        memory. The threat model matters online attackers can't access your
        locked desk drawer. Physical security threats are much rarer.
      </p>

      <h2>Conclusion</h2>
      <p>
        Strong password security requires: long, random passwords (use the{" "}
        <a href='/tools/password-generator'>Password Generator</a>), a password
        manager so you only need to remember one strong master password, and MFA
        on all sensitive accounts. Check the strength of any existing password
        with the{" "}
        <a href='/tools/password-strength-checker'>Password Strength Checker</a>
        .
      </p>
    </>
  );
}
