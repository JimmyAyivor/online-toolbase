// src/app/blog/content/morse-code-history-and-how-it-works.tsx
export default function Post() {
  return (
    <>
      <p>
        Morse code is 180 years old and still in active use. Amateur radio
        operators, maritime emergency signalling, and aviation navigation
        beacons still use it. More practically for most people, Morse code is a
        useful teaching example for information theory how you can represent any
        text as a sequence of two symbols. Understanding how it works also
        reveals why certain letters got shorter codes than others.
      </p>
      <h2>How Morse code works</h2>
      <p>
        Morse code represents text using two symbols: a short signal (dot,
        "dit") and a long signal (dash, "dah"). Each letter is assigned a unique
        combination of dots and dashes. Spaces between characters and words
        indicate when one letter ends and the next begins.
      </p>
      <p>
        Common letters: E = · (one dot), T = (one dash), A = · , N = · , I = ··
        , S = ··· , M = .
      </p>
      <p>
        Use our <a href='/tools/morse-code-translator'>Morse Code Translator</a>{" "}
        to convert any text to Morse code and decode Morse code back to text
        instantly.
      </p>
      <h2>Why E and T get the shortest codes</h2>
      <p>
        Morse code was designed by Samuel Morse and Alfred Vail in the
        1830s–1840s, optimised for the English language. The most frequent
        letters in English got the shortest codes fewer signals per letter means
        faster transmission overall. E (the most common English letter) is a
        single dot. T is a single dash. S, I, O, A, N all very common have two
        or three signals each. Q, Z, X rare have four signals.
      </p>
      <p>
        This is an early example of frequency-based encoding the same principle
        used in modern data compression (Huffman coding), where more frequent
        symbols get shorter binary representations.
      </p>
      <h2>Timing in Morse code</h2>
      <p>Morse code timing is relative to the dot duration (T):</p>
      <ul>
        <li>Dot: 1T</li>
        <li>Dash: 3T</li>
        <li>Space between elements in a letter: 1T</li>
        <li>Space between letters: 3T</li>
        <li>Space between words: 7T</li>
      </ul>
      <p>
        The speed of transmission (measured in words per minute, or WPM) is
        determined by how fast T is. Skilled Morse operators can send and
        receive 20–40 WPM; trained military operators have exceeded 60 WPM.
      </p>
      <h2>Modern uses</h2>
      <p>
        Morse code remains the international distress signal SOS (··· ···) three
        dots, three dashes, three dots. Amateur (ham) radio operators use it for
        long-distance communication where voice would degrade at weak signal
        strengths. Aviation VOR and NDB navigation beacons still transmit their
        identifiers in Morse code for pilot identification. Some accessibility
        tools use Morse code as an alternative input method.
      </p>
      <h2>FAQ</h2>
      <h3>Is learning Morse code still useful?</h3>
      <p>
        For amateur radio licensing in many countries, yes some licence classes
        still require Morse proficiency, though requirements have been reduced
        significantly since the early 2000s. As a survival skill or for interest
        in radio communication, it's a worthwhile niche skill. For everyday
        communication, it's purely a curiosity.
      </p>
      <h3>What does SOS actually stand for?</h3>
      <p>
        Nothing SOS was chosen as a distress signal specifically because it's
        easy to transmit in Morse (··· ···) and easy to recognise. Backronyms
        like "Save Our Ship" were applied after the fact. The signal is written
        as SOS or ···//··· with no spaces between letters, making it a
        continuous unique pattern.
      </p>
      <h2>Conclusion</h2>
      <p>
        Morse code is a beautifully simple encoding system that demonstrates
        fundamental principles of information theory. Use the{" "}
        <a href='/tools/morse-code-translator'>Morse Code Translator</a> to
        convert between text and Morse instantly whether for a practical radio
        application, an educational exercise, or just curiosity.
      </p>
    </>
  );
}
