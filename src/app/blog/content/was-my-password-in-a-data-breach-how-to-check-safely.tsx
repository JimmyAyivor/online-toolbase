// src/app/blog/content/was-my-password-in-a-data-breach-how-to-check-safely.tsx
export default function Post() {
  return (
    <>
      <p>
        Somewhere between 2013 and now, your email address has almost
        certainly shown up in a data breach. Have I Been Pwned tracks over 12
        billion breached accounts at this point, spanning everything from
        small forum hacks to the Adobe, LinkedIn, and Collection #1 mega
        breaches. The question isn't really whether you've been caught up in
        one. It's whether any of the passwords sitting in those dumps are
        ones you're still using.
      </p>
      <p>
        That's a different question from "was my email breached," and it's
        the one that actually determines your risk. Attackers don't need
        your email and password paired together from the same breach — they
        run huge lists of leaked passwords against other services and see
        what sticks. This is called credential stuffing, and it's the reason
        password reuse is so much more dangerous than most people realize.
      </p>

      <h2>How breach checking actually works</h2>
      <p>
        The naive way to check a password against a breach database would be
        to send the password to a server and let it search. That's obviously
        a terrible idea — you'd be handing a random third party the exact
        thing you're trying to protect.
      </p>
      <p>
        The method that actually gets used, pioneered by Troy Hunt's Have I
        Been Pwned project, is called <strong>k-anonymity</strong>. Here's
        the trick: your password gets hashed with SHA-1 locally, in your
        browser. That hash is a 40-character string that's unique to your
        password but can't be reversed back into it. Instead of sending the
        whole hash, only the first five characters get sent to the API.
      </p>
      <p>
        The API responds with every hash in its database that starts with
        those same five characters — often hundreds of them. Your device
        then checks locally whether the rest of your hash appears anywhere
        in that list. The server never sees your full hash, let alone your
        password, and it has no way of knowing which of the hundreds of
        results was actually yours.
      </p>
      <p>
        Our{" "}
        <a href="/tools/password-breach-checker">Password Breach Checker</a>{" "}
        uses exactly this method, so you can check a password without ever
        transmitting it.
      </p>

      <h2>What to actually do if a password comes back "pwned"</h2>
      <ul>
        <li>
          <strong>Stop using it everywhere, not just where you noticed it.</strong>{" "}
          If a password leaked once, treat it as burned for every account,
          including ones you haven't checked.
        </li>
        <li>
          <strong>Don't just tweak it.</strong> Changing "Summer2019!" to
          "Summer2020!" defeats the purpose. Credential-stuffing tools try
          common variations automatically.
        </li>
        <li>
          <strong>Check where else you reused it.</strong> Password managers
          usually have a built-in "reused passwords" report — that's often
          faster than checking accounts one by one.
        </li>
        <li>
          <strong>Turn on two-factor authentication</strong> on anything
          that supports it, especially email, since a compromised email
          often becomes the key to everything else.
        </li>
      </ul>

      <h2>A breach check isn't a strength check</h2>
      <p>
        This trips people up: a password that comes back clean from a breach
        check isn't necessarily a good password. It just means that specific
        string hasn't shown up in a known breach dump yet. "Tr0ub4dor&3" or
        your dog's name plus your street number might not be in any breach
        database today, but they're still guessable, and they might be in
        tomorrow's dump.
      </p>
      <p>
        Breach checking and strength checking answer two different
        questions. One tells you whether a password has already been
        compromised. The other tells you how hard it would be to crack if it
        hasn't been. You want both answers before you trust a password with
        anything important.
      </p>

      <h2>FAQ</h2>

      <h3>Does this tell me if my account was hacked?</h3>
      <p>
        No — it tells you whether the password itself has appeared in a
        breach, not whether a specific account of yours was compromised. For
        checking whether your email address specifically has been involved
        in a breach, Have I Been Pwned's main site handles that separately.
      </p>

      <h3>Why SHA-1? Isn't that outdated?</h3>
      <p>
        SHA-1 is considered broken for things like digital signatures, but
        it's still perfectly fine here — it's only being used to create a
        fingerprint for a database lookup, not to protect the password
        cryptographically. The security of the k-anonymity method comes from
        only sending a partial hash, not from which hash function is used.
      </p>

      <h3>How often should I re-check my passwords?</h3>
      <p>
        Whenever you're about to reuse an old password somewhere, or
        periodically if you know a service you use has had a breach
        disclosed. Password managers that offer continuous breach monitoring
        automate this so you don't have to remember to do it manually.
      </p>

      <h2>Conclusion</h2>
      <p>
        Reusing passwords is still the single biggest reason accounts get
        compromised, and breach databases are exactly how attackers exploit
        it. Checking a password before you commit to using it everywhere
        takes ten seconds and tells you something you genuinely can't know
        otherwise. Try the{" "}
        <a href="/tools/password-breach-checker">Password Breach Checker</a>{" "}
        before your next password change, and pair it with a{" "}
        <a href="/tools/password-strength-checker">
          Password Strength Checker
        </a>{" "}
        for the full picture.
      </p>
    </>
  );
}
