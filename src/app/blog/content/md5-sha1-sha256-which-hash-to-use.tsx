// src/app/blog/content/md5-sha1-sha256-which-hash-to-use.tsx
export default function Post() {
  return (
    <>
      <p>
        Hash functions are one of the workhorses of modern computing used in
        password storage, data integrity verification, digital signatures,
        blockchain, and half a dozen other security-critical applications. MD5,
        SHA-1, SHA-256, SHA-512: you've probably seen all of these in
        documentation or code, but the differences between them matter
        enormously depending on the context. Using the wrong one is a security
        vulnerability, not just a style choice.
      </p>

      <h2>What a hash function does</h2>
      <p>
        A hash function takes an input of any length and produces a fixed-length
        output (the hash or digest) that appears random. The key properties:
      </p>
      <ul>
        <li>
          <strong>Deterministic:</strong> The same input always produces the
          same hash.
        </li>
        <li>
          <strong>One-way:</strong> You cannot reconstruct the original input
          from the hash.
        </li>
        <li>
          <strong>Avalanche effect:</strong> A tiny change in the input produces
          a completely different hash.
        </li>
        <li>
          <strong>Collision resistant:</strong> It should be computationally
          infeasible to find two different inputs that produce the same hash.
        </li>
      </ul>
      <p>
        Our <a href="/tools/hash-generator">Hash Generator</a> computes MD5,
        SHA-1, SHA-256, and SHA-512 hashes for any input text instantly in your
        browser.
      </p>

      <h2>MD5: fast but broken for security</h2>
      <p>
        MD5 produces a 128-bit (32-character hex) hash and is extremely fast.
        It's also cryptographically broken researchers have demonstrated
        practical collision attacks (finding two different inputs with the same
        hash) since 2004.
      </p>
      <p>
        <strong>Do not use MD5 for:</strong> password hashing, digital
        signatures, or any security-critical integrity verification.
      </p>
      <p>
        <strong>Still acceptable for:</strong> non-security checksums where
        speed matters and collision resistance isn't a security requirement
        verifying a file downloaded correctly (when the hash was distributed
        over a secure channel), generating cache keys, deduplication
        identifiers. If someone breaks the MD5 of your cache key, the worst
        outcome is a cache miss, not a security breach.
      </p>

      <h2>SHA-1: deprecated for security use</h2>
      <p>
        SHA-1 produces a 160-bit (40-character hex) hash. Google demonstrated a
        practical SHA-1 collision in 2017 (the SHAttered attack). Certificate
        authorities stopped issuing SHA-1 SSL certificates; most browsers now
        reject them. Major version control systems have moved away from SHA-1.
      </p>
      <p>
        <strong>Do not use SHA-1</strong> for anything security-related. It's
        been deprecated for security use by NIST and most standards bodies. Like
        MD5, it may still appear in legacy systems or for non-security
        applications, but new code shouldn't use it.
      </p>

      <h2>SHA-256: the current standard</h2>
      <p>
        SHA-256 is part of the SHA-2 family and produces a 256-bit (64-character
        hex) hash. No practical attacks exist against it. It's the current
        standard for most cryptographic applications:
      </p>
      <ul>
        <li>TLS certificates (HTTPS)</li>
        <li>Code signing</li>
        <li>Bitcoin and most cryptocurrencies</li>
        <li>Data integrity verification</li>
        <li>HMAC authentication</li>
        <li>JWT signatures (using HMAC-SHA256)</li>
      </ul>
      <p>
        <strong>SHA-256 is the right default</strong> for any new cryptographic
        application where you need a hash function.
      </p>

      <h2>SHA-512: when you need more strength</h2>
      <p>
        SHA-512 produces a 512-bit (128-character hex) hash. It's
        computationally stronger than SHA-256 and can actually be faster on
        64-bit processors (SHA-256 operates on 32-bit words; SHA-512 on 64-bit
        words, making it more efficient on modern hardware for large data).
      </p>
      <p>
        Use SHA-512 when you need maximum hash strength high-security key
        derivation, long-term data integrity or when you're on a 64-bit system
        hashing large amounts of data and performance matters.
      </p>

      <h2>Hash functions vs password hashing</h2>
      <p>
        SHA-256 and SHA-512 are fast which is a good property for most uses but
        a bad one for password hashing. Fast hashes mean attackers can run
        billions of guesses per second against a stolen password database.
      </p>
      <p>
        For password storage, use dedicated password-hashing algorithms designed
        to be slow and memory-intensive: bcrypt, Argon2, or scrypt. These are
        intentionally slower and scale difficulty with a configurable work
        factor. Never use MD5, SHA-1, or raw SHA-256 to hash passwords this is a
        critical security mistake even if you salt the hash.
      </p>

      <h2>Verifying file integrity with hashes</h2>
      <p>
        When you download software, many providers publish a SHA-256 hash of the
        download file. After downloading, you hash the file yourself and compare
        if they match, the file is intact and unmodified. If they don't match,
        the file was corrupted or tampered with.
      </p>
      <p>
        This only works when the reference hash was distributed securely (over
        HTTPS, or published separately from the download). A hash posted
        alongside a malicious file provides no security the attacker can just
        update the hash too.
      </p>

      <h2>FAQ</h2>

      <h3>Can two different inputs produce the same hash?</h3>
      <p>
        Theoretically yes this is called a collision. For MD5 and SHA-1,
        practical collision attacks exist. For SHA-256, no practical collision
        has been demonstrated and finding one is computationally infeasible with
        current technology.
      </p>

      <h3>Is a hash the same as encryption?</h3>
      <p>
        No. Encryption is reversible you can decrypt ciphertext back to
        plaintext with the right key. Hashing is one-way you cannot recover the
        original input from the hash. These serve different purposes and
        shouldn't be confused.
      </p>

      <h3>What's a salt in the context of hashing?</h3>
      <p>
        A salt is a random value added to a password before hashing. It ensures
        that two users with the same password have different hashes, preventing
        rainbow table attacks (precomputed hash lookups). Good password-hashing
        libraries (bcrypt, Argon2) handle salting automatically.
      </p>

      <h2>Conclusion</h2>
      <p>
        For most new applications: SHA-256. For password storage: Argon2 or
        bcrypt, not a raw hash function. MD5 and SHA-1 are legacy still useful
        for non-security checksum applications, but should not be used for
        anything where cryptographic integrity matters. Use the{" "}
        <a href="/tools/hash-generator">Hash Generator</a> to quickly compute
        and compare hashes for any of these algorithms.
      </p>
    </>
  );
}
