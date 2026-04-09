// src/app/blog/content/binary-hexadecimal-decimal-number-systems-explained.tsx
export default function Post() {
  return (
    <>
      <p>
        Binary, hexadecimal, decimal, octal four number systems, all
        representing the same values, all used in different computing contexts.
        Understanding why each one exists and where each one appears makes a
        surprising amount of computing more legible: colour codes, file
        permissions, memory addresses, network masks, bitwise operations. None
        of this is arcane it's just a different way of writing numbers.
      </p>

      <h2>Why multiple number systems exist in computing</h2>
      <p>
        Computers store everything as binary (base-2) combinations of 0 and 1.
        But binary is verbose and hard for humans to read. Hexadecimal (base-16)
        is a compact way to represent binary: one hex digit represents exactly
        four binary bits, so a byte (8 bits) is always exactly two hex digits.
        This makes hex the natural language for anything close to the hardware.
      </p>
      <p>
        Decimal (base-10) is what humans use naturally, so it's used in
        interfaces file sizes, port numbers, line counts. Octal (base-8) appears
        mainly in Unix file permissions.
      </p>
      <p>
        Our <a href="/tools/binary-hex-converter">Binary & Hex Converter</a>{" "}
        converts between all four systems instantly.
      </p>

      <h2>How each system works</h2>

      <h3>Decimal (base-10)</h3>
      <p>
        Each digit position represents a power of 10: ones, tens, hundreds,
        thousands. Ten digits (0–9). The number 247 means 2×100 + 4×10 + 7×1.
      </p>

      <h3>Binary (base-2)</h3>
      <p>
        Each position represents a power of 2: 1, 2, 4, 8, 16, 32, 64, 128...
        Two digits (0 and 1). The decimal number 13 in binary is 1101: 1×8 + 1×4
        + 0×2 + 1×1 = 13.
      </p>

      <h3>Hexadecimal (base-16)</h3>
      <p>
        Sixteen digits: 0–9 then A–F (A=10, B=11, C=12, D=13, E=14, F=15). Each
        hex digit represents four binary bits. The decimal number 255 (a full
        byte) is FF in hex: F=15=1111 in binary, so FF=11111111. Hex values are
        prefixed with <code>0x</code> in code (<code>0xFF</code>) or sometimes
        with a hash in CSS (<code>#FF0000</code>).
      </p>

      <h3>Octal (base-8)</h3>
      <p>
        Eight digits (0–7). Each digit represents three binary bits. Used in
        Unix/Linux file permissions: <code>chmod 755</code> sets owner
        permissions to 7 (rwx = 111 binary = 7), group to 5 (r-x = 101 = 5),
        others to 5. Reading permissions directly in octal is more concise than
        binary.
      </p>

      <h2>Common places each system appears</h2>

      <h3>Hexadecimal</h3>
      <ul>
        <li>
          CSS colour codes: <code>#FF5733</code> is R=255, G=87, B=51 in decimal
        </li>
        <li>Memory addresses in debugging output</li>
        <li>
          Network MAC addresses: <code>00:1A:2B:3C:4D:5E</code>
        </li>
        <li>SHA and MD5 hashes</li>
        <li>Unicode code points: U+1F600 is the grinning face emoji</li>
        <li>Byte representation in hex editors</li>
      </ul>

      <h3>Binary</h3>
      <ul>
        <li>
          Network subnet masks explained in detail (<code>/24</code> means 24
          binary 1s)
        </li>
        <li>Bitwise operations in code</li>
        <li>Boolean flags packed into integers</li>
        <li>Low-level hardware register values</li>
      </ul>

      <h3>Octal</h3>
      <ul>
        <li>Unix file permissions</li>
        <li>
          Escape sequences in some programming languages (<code>\077</code> in
          C)
        </li>
      </ul>

      <h2>Converting between systems: the logic</h2>
      <p>
        <strong>Binary to hex:</strong> Group binary digits in sets of four from
        the right; convert each group to its hex digit. <code>11010110</code> →{" "}
        <code>1101</code> = D, <code>0110</code> = 6 → <code>D6</code>.
      </p>
      <p>
        <strong>Hex to decimal:</strong> Multiply each digit by its positional
        power of 16. <code>FF</code> = 15×16 + 15×1 = 240 + 15 = 255.
      </p>
      <p>
        For anything beyond quick mental conversions, the{" "}
        <a href="/tools/binary-hex-converter">Binary & Hex Converter</a> handles
        all four systems with no arithmetic required.
      </p>

      <h2>FAQ</h2>

      <h3>
        Why does <code>0x</code> prefix hex values?
      </h3>
      <p>
        The <code>0x</code> prefix distinguishes hexadecimal literals from
        decimal ones in code. Without it, <code>10</code> is ambiguous decimal
        10 or hex 10 (which is decimal 16)?
      </p>

      <h3>How do I read hex colour codes?</h3>
      <p>
        A hex colour is three pairs of hex digits representing red, green, blue:{" "}
        <code>#RRGGBB</code>. <code>#FF0000</code> is full red (255), no green
        (0), no blue (0). <code>#808080</code> is medium grey (128, 128, 128).
        Converting hex pairs to decimal gives the 0–255 RGB values.
      </p>

      <h3>Is there a quick way to convert hex to decimal mentally?</h3>
      <p>
        For single hex digits: A=10, B=11, C=12, D=13, E=14, F=15. For two-digit
        hex: the first digit × 16, plus the second digit. <code>3F</code> = 3×16
        + 15 = 48 + 15 = 63. For anything larger, use the converter.
      </p>

      <h2>Conclusion</h2>
      <p>
        Binary, hex, decimal, and octal are all ways of writing the same numbers
        for different purposes. Hex for hardware proximity and compact binary
        representation; decimal for human interfaces; binary for understanding
        bitwise logic; octal for Unix permissions. Use the{" "}
        <a href="/tools/binary-hex-converter">Binary & Hex Converter</a> for all
        your number system conversions.
      </p>
    </>
  );
}
