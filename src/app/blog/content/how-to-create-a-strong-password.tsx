// src/app/blog/content/how-to-create-a-strong-password.tsx
export default function Post() {
  return (
    <>
      <p>
        The most common password in 2024 was still "123456." The second most
        common was "password." This isn't because people are careless it's
        because most advice on creating strong passwords is either vague ("use a
        mix of characters!") or impractical (no, I'm not memorising{" "}
        <code>gT#9pKm@2wLx</code> for every site I use).
      </p>
      <p>
        This guide focuses on what actually matters, why some popular "tricks"
        no longer work, and two approaches that genuinely hold up against modern
        attacks.
      </p>

      <h2>Why your current password probably isn't as strong as you think</h2>
      <p>
        There's a mental model most people carry that goes something like: "My
        password has a capital letter, a number, and a symbol that's strong."
        The problem is that attackers know this model too, and they've built it
        into their tools.
      </p>
      <p>
        Modern password cracking software doesn't just try random combinations.
        It runs through dictionaries of real words, then applies common
        modification rules automatically capitalise the first letter, add a
        number at the end, swap 'a' for '@', swap 'o' for '0', add '!' at the
        end. These rule-based variations are hardcoded because they're so
        predictable.
      </p>
      <p>
        "Password" becomes "P@ssw0rd" in milliseconds. "Summer2024!" falls even
        faster because the base word is so common. If a human could guess the
        structure of your password, so can software running a billion attempts
        per second.
      </p>

      <h2>The one thing that actually matters most: length</h2>
      <p>
        Forget complexity for a moment. Length is the single most important
        factor in password security because every additional character
        multiplies the possible combinations exponentially.
      </p>
      <p>
        A random 8-character password using all character types has roughly 6
        quadrillion possible combinations which sounds enormous until you
        realise modern cracking hardware can test hundreds of billions of
        combinations per second. An 8-character password can fall in under a
        minute.
      </p>
      <p>
        A 16-character random password? That's around 10²⁸ combinations. At the
        same attack speed, cracking it would take longer than the current age of
        the universe. Length wins.
      </p>

      <h2>Two approaches that actually work</h2>

      <h3>Approach 1: Random generated passwords + a password manager</h3>
      <p>
        For the vast majority of your accounts, the best strategy is a fully
        random password that you don't try to memorise. Use a generator to
        create something like <code>K7#mPqR2nLx9Wt4v</code>, store it in a
        password manager, and let the manager handle the rest.
      </p>
      <p>
        Our <a href='/tools/password-generator'>Password Generator</a> creates
        cryptographically random passwords in your browser nothing is sent to a
        server. You can set length (go for 16+ characters), toggle character
        sets to match a site's requirements, and generate a new one instantly.
        Copy it straight into your password manager.
      </p>
      <p>
        Good free and paid options for storing passwords include Bitwarden (open
        source, free for unlimited passwords across devices), 1Password, and
        Dashlane. You only need to remember one strong master password
        everything else gets stored and autofilled.
      </p>

      <h3>Approach 2: Passphrases (for passwords you actually need to type)</h3>
      <p>
        Sometimes you genuinely need a password you can remember your password
        manager's master password, your work laptop login, your phone PIN. For
        these, a passphrase is far better than a complex short password.
      </p>
      <p>
        A passphrase is a sequence of four or more random, unrelated words:
        something like <strong>carpet-volcano-eleven-mango</strong>. That's 27
        characters with no special complexity and it has more entropy than most
        10-character "complex" passwords because of its length.
      </p>
      <p>
        The critical requirement is <em>random</em>. "I love my cat Whiskers" is
        terrible it's predictable and based on personal information. The words
        need to be genuinely unrelated, chosen without a theme. Roll dice, use a
        word list, or use a generator. Don't pick words yourself from memory.
      </p>

      <h2>Five mistakes that undermine everything</h2>
      <ul>
        <li>
          <strong>Reusing passwords across sites.</strong> When one site gets
          breached and it will, eventually attackers immediately test those
          credentials on Gmail, banking, Amazon, and everything else. This
          attack, called credential stuffing, is responsible for the majority of
          account takeovers. A unique password for every site is non-negotiable.
        </li>
        <li>
          <strong>Using personal information.</strong> Names, birthdays, phone
          numbers, pet names, favourite sports teams all of this is findable
          through social media and public records. It's the first thing a
          targeted attacker will try.
        </li>
        <li>
          <strong>Predictable structures.</strong> Word + year (Holiday2024),
          word + special character (sunshine!), capitalised word + numbers at
          the end (Football99) these patterns are in every cracking ruleset.
        </li>
        <li>
          <strong>
            Trusting browser-stored passwords without a master password.
          </strong>{" "}
          Browser password storage is convenient, but if someone gets access to
          your unlocked computer, they can export every stored credential in
          seconds. A dedicated password manager with a master password adds a
          meaningful extra layer.
        </li>
        <li>
          <strong>Skipping two-factor authentication.</strong> Even a strong
          password can be phished, leaked in a breach, or guessed by someone
          with enough information about you. Two-factor authentication
          especially an authenticator app rather than SMS means a stolen
          password alone isn't enough to get in.
        </li>
      </ul>

      <h2>What to do right now</h2>
      <p>
        If you're reading this and your passwords are mostly short words with
        predictable modifications, the most impactful thing you can do is:
      </p>
      <ol>
        <li>Install a password manager (Bitwarden is free).</li>
        <li>
          Change your most critical accounts first email, banking, social media.
        </li>
        <li>
          Use the generator to create a random 16+ character password for each.
        </li>
        <li>Enable two-factor authentication on anything that supports it.</li>
        <li>
          Over the following weeks, update other accounts as you log in to them.
        </li>
      </ol>
      <p>
        You don't have to change everything at once. Start with email it's the
        master key to your online life, because it's what you use to reset every
        other password. If someone controls your email, they can reset their way
        into everything else.
      </p>
      <p>
        Use our free <a href='/tools/password-generator'>Password Generator</a>{" "}
        to get started no account, no install, works right now in your browser.
      </p>
    </>
  );
}
