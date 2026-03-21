// src/app/blog/content/unix-timestamps-explained.tsx
export default function Post() {
  return (
    <>
      <p>
        Unix timestamps appear everywhere in software API responses, database
        fields, log files, URLs, JWTs. They look like large arbitrary integers
        (1710921600) and don't immediately communicate anything human-readable.
        Once you understand what they represent and why they're used, they
        become one of the most sensible date representations in computing.
      </p>

      <h2>What a Unix timestamp is</h2>
      <p>
        A Unix timestamp is the number of seconds that have elapsed since the
        Unix epoch: 00:00:00 UTC on 1 January 1970. The timestamp{" "}
        <code>1710921600</code> represents a specific number of seconds after
        that reference point in this case, 20 March 2026 at 00:00:00 UTC.
      </p>
      <p>
        Use our <a href='/tools/timestamp-converter'>Timestamp Converter</a> to
        convert Unix timestamps to human-readable dates and vice versa
        instantly.
      </p>

      <h2>Why timestamps are used instead of formatted dates</h2>
      <p>
        Formatted date strings are ambiguous. Does "03/04/2025" mean 3 April or
        4 March? Is "12:00" noon or midnight? Is that time in UTC, EST, or the
        local timezone of the server? These ambiguities cause bugs that are
        particularly painful because they're intermittent and
        timezone-dependent.
      </p>
      <p>Unix timestamps have none of these problems:</p>
      <ul>
        <li>
          <strong>Unambiguous:</strong> A timestamp represents exactly one
          moment in time, globally. There's no format variation or locale
          interpretation.
        </li>
        <li>
          <strong>Timezone-independent:</strong> Timestamps are in UTC. Display
          in local time happens at the presentation layer.
        </li>
        <li>
          <strong>Sortable and comparable:</strong> Comparing two timestamps is
          an integer comparison. "Is event A before event B?" is{" "}
          <code>timestampA &lt; timestampB</code>.
        </li>
        <li>
          <strong>Arithmetic-friendly:</strong> "How many seconds ago?" is{" "}
          <code>now - timestamp</code>. "Add 7 days" is{" "}
          <code>timestamp + 604800</code>.
        </li>
        <li>
          <strong>Compact:</strong> A 10-digit integer is smaller than a
          formatted date string like "Monday, 20 March 2026 09:00:00 +0000".
        </li>
      </ul>

      <h2>Milliseconds vs seconds</h2>
      <p>
        The original Unix timestamp standard uses seconds. However, many modern
        systems particularly JavaScript with its <code>Date.now()</code> use
        milliseconds. A second-precision timestamp for 2026 is a 10-digit number
        (~1.7 billion). A millisecond-precision timestamp is a 13-digit number
        (~1.7 trillion).
      </p>
      <p>
        This is a common source of bugs: passing a millisecond timestamp to a
        function expecting seconds (or vice versa) results in dates that are off
        by a factor of 1,000 either impossibly far in the future or appearing
        before the Unix epoch. If your date calculations are wildly wrong, check
        whether you're mixing second and millisecond timestamps.
      </p>

      <h2>The Year 2038 problem</h2>
      <p>
        32-bit signed integers have a maximum value of 2,147,483,647. This
        represents 03:14:07 UTC on 19 January 2038 in Unix timestamp terms.
        Systems using 32-bit signed integers for timestamps will overflow at
        this point, rolling back to 13 December 1901.
      </p>
      <p>
        Modern systems use 64-bit integers for timestamps, which won't overflow
        for approximately 292 billion years. If you're working on embedded
        systems or legacy code using 32-bit timestamps, this is a real concern.
        For typical web development, 64-bit is standard.
      </p>

      <h2>Working with timestamps in common languages</h2>
      <ul>
        <li>
          <strong>JavaScript:</strong> <code>Date.now()</code> returns
          milliseconds. <code>Math.floor(Date.now() / 1000)</code> for seconds.{" "}
          <code>new Date(timestamp * 1000)</code> converts seconds to a Date
          object.
        </li>
        <li>
          <strong>Python:</strong> <code>import time; time.time()</code> returns
          seconds as a float. <code>datetime.fromtimestamp(ts)</code> converts
          to a datetime object.
        </li>
        <li>
          <strong>PHP:</strong> <code>time()</code> returns the current
          timestamp in seconds.
        </li>
        <li>
          <strong>SQL:</strong> <code>UNIX_TIMESTAMP()</code> in MySQL;{" "}
          <code>EXTRACT(EPOCH FROM NOW())</code> in PostgreSQL.
        </li>
      </ul>

      <h2>Converting timestamps to human-readable dates</h2>
      <p>
        When displaying timestamps to users, always convert to their local
        timezone for display. Store timestamps in UTC; display in local time.
        The conversion happens at the presentation layer in the browser (which
        knows the user's timezone) or using explicit timezone conversion on the
        server.
      </p>
      <p>
        For quick conversions during development or debugging, the{" "}
        <a href='/tools/timestamp-converter'>Timestamp Converter</a> converts
        any Unix timestamp to a human-readable date in UTC and shows the
        conversion both ways.
      </p>

      <h2>FAQ</h2>

      <h3>What timezone is a Unix timestamp in?</h3>
      <p>
        Timestamps themselves are timezone-agnostic they count seconds from the
        epoch, which is defined in UTC. When you display a timestamp as a
        date/time, you choose which timezone to express it in. The same
        timestamp represents different local times in different timezones.
      </p>

      <h3>Why do some APIs use ISO 8601 strings instead of timestamps?</h3>
      <p>
        ISO 8601 (e.g., <code>2026-03-20T09:00:00Z</code>) is human-readable in
        a way timestamps aren't, and includes timezone information explicitly.
        Both formats are valid; many APIs use ISO 8601 for readability in
        developer-facing interfaces while storing timestamps internally.
      </p>

      <h3>How do I get the current timestamp in a browser console?</h3>
      <p>
        <code>Math.floor(Date.now() / 1000)</code> gives you the current Unix
        timestamp in seconds. <code>Date.now()</code> alone gives milliseconds.
      </p>

      <h2>Conclusion</h2>
      <p>
        Unix timestamps are the clearest, most portable way to represent a
        specific moment in time in software. Use them for storage and
        computation; convert to formatted dates for display. Use the{" "}
        <a href='/tools/timestamp-converter'>Timestamp Converter</a> to quickly
        convert between timestamps and human-readable dates when debugging or
        working with API data.
      </p>
    </>
  );
}
