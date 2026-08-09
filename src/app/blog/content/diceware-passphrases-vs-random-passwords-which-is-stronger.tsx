// src/app/blog/content/diceware-passphrases-vs-random-passwords-which-is-stronger.tsx
export default function Post() {
  return (
    <>
      <p>
        For years, "strong password" meant one thing: cram in uppercase,
        lowercase, a number, and a symbol, and make it at least eight
        characters. That advice produced a generation of passwords like{" "}
        <code>P@ssw0rd1</code> — technically compliant, practically
        worthless, because humans are predictable about how they satisfy
        arbitrary rules. Security researchers have mostly moved on from that
        advice, and the replacement is worth understanding: length beats
        complexity, and passphrases beat passwords.
      </p>

      <h2>The math that changed the advice</h2>
      <p>
        Password strength against brute-force guessing comes down to
        entropy: how many possible combinations an attacker would have to
        try. A password's entropy is roughly the character-set size raised
        to the power of its length. An 8-character password using the full
        94-character keyboard set has about 52 bits of entropy. That sounds
        reasonable until you realize a modern GPU rig can try billions of
        guesses per second against an offline hash — 52 bits doesn't hold up
        as long as it used to.
      </p>
      <p>
        A passphrase built from random dictionary words works differently.
        If you're picking from a list of, say, 750 words, each word you add
        contributes about 9.5 bits of entropy (that's log base 2 of 750).
        String together five random words and you're at roughly 47 bits.
        Six words gets you to about 57 bits. Eight words clears 75 bits —
        far beyond what's practical to brute-force, and dramatically easier
        to type and remember than an equivalent-strength random string.
      </p>

      <h2>Where the "words are less secure" myth comes from</h2>
      <p>
        The pushback usually goes: "words are easier to guess than random
        characters, because attackers can just try dictionary words." This
        is true if you pick a single memorable phrase — "iloveyou2" is a
        dictionary word, essentially, and it's one of the first things any
        cracking tool tries.
      </p>
      <p>
        It's not true for genuinely{" "}
        <em>random</em> word selection. The entire point of the Diceware
        method — originally literal dice rolls against a numbered word list
        — is that the words aren't chosen for meaning. There's no sentence,
        no theme, no pattern an attacker could reason about. Four or five
        completely unrelated words selected by a random number generator are
        just as unguessable, word for word, as random characters are,
        character for character — and because each "unit" carries more
        entropy than a single character, you need fewer of them.
      </p>

      <h2>Building a passphrase that's actually random</h2>
      <ul>
        <li>
          <strong>Use a real random source.</strong> Don't pick words
          yourself — humans are bad at being random, and you'll
          unconsciously gravitate toward common or personally meaningful
          words. Use a tool that selects from a wordlist using a
          cryptographically secure random number generator.
        </li>
        <li>
          <strong>Five to six words for most accounts</strong>, seven or
          eight for something high-value like a password manager's master
          password or a disk encryption key.
        </li>
        <li>
          <strong>A separator or two won't hurt</strong> — hyphens make
          passphrases easier to read and type without meaningfully reducing
          entropy, since the separator is fixed and predictable rather than
          random.
        </li>
        <li>
          <strong>Adding a random digit or symbol</strong> helps satisfy
          services that still enforce old-style complexity rules, without
          undermining the word-based approach.
        </li>
      </ul>
      <p>
        Our{" "}
        <a href="/tools/diceware-passphrase-generator">
          Diceware Passphrase Generator
        </a>{" "}
        handles the random selection for you and shows a live entropy
        estimate as you adjust word count and add-ons.
      </p>

      <h2>FAQ</h2>

      <h3>Is a passphrase harder to type than a password?</h3>
      <p>
        Individual keystrokes, maybe — but total effort is usually lower,
        because you're typing recognizable words instead of a random jumble
        of symbols you have to look at character by character. Most people
        find they can type a five-word passphrase from memory faster than
        an equivalent-strength random password.
      </p>

      <h3>Should I use passphrases for every account?</h3>
      <p>
        For anything you have to type or remember, yes. For accounts stored
        entirely in a password manager and never typed manually, a
        randomly generated character string is equally fine — the
        readability advantage of a passphrase matters most when a human is
        actually recalling and typing it.
      </p>

      <h3>Does word list size actually matter that much?</h3>
      <p>
        Yes, proportionally. A 1,000-word list gives about 10 bits per word;
        a 7,776-word list (the classic Diceware size, chosen because it's
        6<sup>5</sup>, matching five dice rolls) gives about 12.9 bits per
        word. The difference compounds — at five words, that's roughly a
        15-bit gap, which meaningfully changes how long a brute-force attack
        would take.
      </p>

      <h2>Conclusion</h2>
      <p>
        The password-complexity rules most of us grew up with optimized for
        the wrong thing. Length, generated randomly and not by a human
        trying to be clever, is what actually resists modern cracking
        hardware — and passphrases get you there while staying memorable.
        Give the{" "}
        <a href="/tools/diceware-passphrase-generator">
          Diceware Passphrase Generator
        </a>{" "}
        a try next time you need something you'll actually have to
        remember.
      </p>
    </>
  );
}
