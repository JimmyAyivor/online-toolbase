// src/app/blog/content/how-to-encrypt-text-with-a-passphrase-aes-explained.tsx
export default function Post() {
  return (
    <>
      <p>
        Sometimes you need to send something sensitive through a channel you
        don't fully trust — an API key over Slack, a set of temporary
        credentials in an email, a note you don't want sitting in plain text
        in someone's inbox forever. You don't always need a dedicated
        encrypted messaging app for this. Sometimes you just need to turn
        text into unreadable text, send it, and let the recipient turn it
        back.
      </p>
      <p>
        That's a solved problem, and it's simpler than it sounds once you
        understand the two building blocks doing the actual work: AES for
        the encryption itself, and PBKDF2 for turning a human-memorable
        passphrase into something strong enough to encrypt with.
      </p>

      <h2>Why you can't just use your passphrase directly as a key</h2>
      <p>
        AES-256 needs a 256-bit key — an exact, fixed-length string of
        essentially random bits. Your passphrase, "correct horse battery
        staple" or whatever you chose, is not that. It's shorter, it's not
        random in the cryptographic sense, and it's the wrong format
        entirely.
      </p>
      <p>
        <strong>PBKDF2</strong> (Password-Based Key Derivation Function 2)
        bridges that gap. It runs your passphrase through a hashing
        function repeatedly — tens or hundreds of thousands of times — combined
        with a random value called a salt, and produces a proper 256-bit
        key on the other end. The repetition is deliberate: it makes brute-forcing
        the passphrase computationally expensive, since an attacker
        has to redo all those iterations for every guess. A tool doing this
        properly uses at least 100,000 iterations; ours uses 150,000.
      </p>
      <p>
        The salt matters too. Without it, the same passphrase would always
        produce the same key, which means an attacker could precompute keys
        for common passphrases once and reuse that work against anyone. A
        random salt, generated fresh for every encryption, makes that kind
        of precomputation useless.
      </p>

      <h2>What AES-GCM actually does</h2>
      <p>
        Once you have a proper key, <strong>AES-GCM</strong> (Galois/Counter
        Mode) handles the encryption. It's what's called an authenticated
        encryption mode, which matters more than it might sound like: it
        doesn't just scramble your text, it also generates a tag that lets
        the decrypting side verify the ciphertext hasn't been altered.
        Tamper with an AES-GCM message — even flip a single bit — and
        decryption fails outright rather than silently producing corrupted
        garbage.
      </p>
      <p>
        AES-GCM also needs a fresh, unique <strong>IV</strong> (initialization
        vector) for every encryption operation, similar in spirit to the
        salt but serving a different purpose — it ensures that encrypting
        the exact same text twice with the exact same key still produces
        different ciphertext. A tool that generates a new random salt and IV
        every time you hit "encrypt," and bundles them with the ciphertext
        so decryption can find them again, is doing this correctly.
      </p>

      <h2>Using this without overthinking it</h2>
      <p>
        Our{" "}
        <a href="/tools/text-encryption-tool">Text Encryption Tool</a> runs
        this exact flow — PBKDF2 key derivation, AES-256-GCM encryption —
        entirely in your browser via the Web Crypto API. Nothing is sent to
        a server at any point.
      </p>
      <ol>
        <li>Paste the text you want to protect and choose a passphrase.</li>
        <li>
          Copy the encrypted output and send it through your normal channel.
        </li>
        <li>
          Share the passphrase separately, through a different channel if
          possible — a text message or phone call rather than the same
          email thread.
        </li>
        <li>
          The recipient pastes the encrypted text and the passphrase back
          into the tool to decrypt it.
        </li>
      </ol>

      <h2>FAQ</h2>

      <h3>Why send the passphrase through a different channel?</h3>
      <p>
        If someone intercepts the email containing your encrypted text, the
        encryption does its job as long as they don't also have the
        passphrase. If you'd put the passphrase in the same email, you've
        handed them everything they need. Splitting the two across separate
        channels is a cheap way to make a single point of compromise much
        less useful to an attacker.
      </p>

      <h3>What if I forget the passphrase?</h3>
      <p>
        There's no recovery. That's not a limitation of this particular
        tool — it's inherent to how the encryption works. Nobody, including
        us, has a copy of your key or a backdoor into it. Store the
        passphrase somewhere reliable, like a password manager, before you
        rely on it.
      </p>

      <h3>Is this good enough for highly sensitive, ongoing communication?</h3>
      <p>
        For a single note or message, yes — the cryptography here is sound
        and standard. For an ongoing conversation, a dedicated end-to-end
        encrypted messenger is the better tool, because it handles key
        exchange, forward secrecy (so a single compromised key doesn't
        expose your entire message history), and metadata protection in
        ways a one-off text encryption tool isn't designed to.
      </p>

      <h2>Conclusion</h2>
      <p>
        You don't need to understand every detail of PBKDF2 or AES-GCM to
        use them safely — that's the point of good tooling. But knowing
        roughly what's happening under the hood makes it a lot easier to
        trust the result, and to use it correctly: strong unique
        passphrases, shared through a separate channel, for the specific
        job of protecting a piece of text in transit. Try the{" "}
        <a href="/tools/text-encryption-tool">Text Encryption Tool</a> next
        time you need to send something sensitive somewhere you don't fully
        trust.
      </p>
    </>
  );
}
