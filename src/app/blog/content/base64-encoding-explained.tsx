// src/app/blog/content/base64-encoding-explained.tsx
export default function Post() {
  return (
    <>
      <p>
        Base64 encoding is one of those things you encounter constantly in web
        development in Authorization headers, JWT tokens, data URIs, email
        attachments, API payloads and most developers use it without really
        understanding what it does or why it exists. That's fine until you hit a
        bug involving it, at which point "it's just encoding" stops being
        sufficient.
      </p>
      <p>
        Here's a clear explanation of what Base64 actually is, why it was
        invented, and when you should and shouldn't use it.
      </p>

      <h2>The problem Base64 solves</h2>
      <p>
        Binary data images, files, arbitrary bytes doesn't travel safely through
        systems designed for text. Email protocols, HTTP headers, and certain
        parts of URLs were designed to handle ASCII text. Binary data contains
        bytes that correspond to ASCII control characters, null bytes, or values
        that some systems interpret as formatting instructions rather than data.
        These can get corrupted, stripped, or misinterpreted in transit.
      </p>
      <p>
        Base64 solves this by encoding binary data as a string of safe ASCII
        characters. Every possible byte value gets represented as a combination
        of 64 printable characters (A–Z, a–z, 0–9, + and /). The result is a
        string that can safely pass through any text-based system without
        corruption.
      </p>

      <h2>How it works</h2>
      <p>
        Base64 takes your binary data three bytes at a time (3 bytes = 24 bits)
        and splits it into four groups of 6 bits each. Each 6-bit group (values
        0–63) is mapped to one of the 64 characters in the Base64 alphabet. So
        three bytes of input become four characters of output.
      </p>
      <p>
        This is why Base64-encoded data is always larger than the original
        specifically, about 33% larger. Three bytes become four characters. A
        100KB image becomes roughly 133KB as Base64. This is a deliberate
        trade-off: safe transmission in exchange for size overhead.
      </p>
      <p>
        If the input isn't divisible by three, <code>=</code> padding characters
        are added to the end to make the output length a multiple of four.
      </p>

      <h2>Where you'll encounter Base64</h2>

      <h3>HTTP Authorization headers</h3>
      <p>
        HTTP Basic Auth sends credentials as <code>username:password</code>{" "}
        encoded in Base64:{" "}
        <code>Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=</code>. This isn't
        encryption it's just encoding. Anyone who intercepts the header can
        decode it instantly. HTTPS provides the actual security here; Basic Auth
        over HTTP is insecure regardless of encoding.
      </p>

      <h3>JWT tokens</h3>
      <p>
        JSON Web Tokens consist of three sections separated by dots. Each
        section is Base64-encoded (technically Base64URL a variant that replaces
        + with - and / with _ to make it safe in URLs). The header and payload
        are just Base64-encoded JSON no encryption. Anyone can decode them. The
        signature section is what provides security. Our{" "}
        <a href='/tools/jwt-decoder'>JWT Decoder</a> decodes all three sections
        and displays the contents.
      </p>

      <h3>Data URIs</h3>
      <p>
        Data URIs embed binary content directly in HTML or CSS:{" "}
        <code>data:image/png;base64,iVBORw0KGgo...</code>. Useful for embedding
        small images that would otherwise require a separate HTTP request,
        though large Base64-encoded assets can significantly bloat HTML
        documents.
      </p>

      <h3>Email attachments</h3>
      <p>
        MIME email attachments are Base64-encoded because SMTP (the email
        protocol) was designed for 7-bit ASCII text. Binary files like images
        and PDFs get encoded before transmission and decoded by the recipient's
        email client.
      </p>

      <h2>URL-safe Base64</h2>
      <p>
        Standard Base64 uses + and / characters, which have special meaning in
        URLs. URL-safe Base64 replaces + with - and / with _ to make encoded
        strings safe for use in URL parameters and path segments without
        requiring percent-encoding. Many systems (OAuth tokens, JWT, signed
        URLs) use URL-safe Base64. Our{" "}
        <a href='/tools/base64-encoder-decoder'>Base64 Encoder/Decoder</a>{" "}
        supports both variants.
      </p>

      <h2>When not to use Base64</h2>
      <p>
        Base64 is for encoding, not encryption. It provides zero security anyone
        can decode it in seconds. Don't use Base64 to "hide" sensitive data.
      </p>
      <p>
        Also avoid Base64 for large files embedded in HTML or CSS. The 33% size
        overhead combined with the string not being separately cacheable makes
        it inefficient compared to a properly served external file. Data URIs
        make sense for small icons and images (under ~2KB); for anything larger,
        use a regular image request.
      </p>
    </>
  );
}
