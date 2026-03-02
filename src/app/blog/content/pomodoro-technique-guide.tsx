// src/app/blog/content/pomodoro-technique-guide.tsx
export default function Post() {
  return (
    <>
      <p>
        In 1987, a university student named Francesco Cirillo was struggling to focus. He grabbed a kitchen timer shaped like a tomato, set it for 25 minutes, and committed to doing one thing until it rang. That's the entire origin story of the Pomodoro Technique.
      </p>
      <p>
        It's become one of the most widely used productivity methods in the world — which is worth being sceptical about, because most viral productivity advice is either obvious or doesn't generalise. The Pomodoro Technique is somewhat unusual in that the reasons it works are well-understood by cognitive science, and the evidence for its effectiveness in real work settings is reasonably solid.
      </p>

      <h2>The basic structure</h2>
      <ol>
        <li>Choose a single task to work on.</li>
        <li>Set a timer for 25 minutes. Work on that task and only that task until the timer rings.</li>
        <li>When the timer rings, take a 5-minute break. Stand up, look away from the screen, stretch.</li>
        <li>Repeat. After four Pomodoros (2 hours of work), take a longer break of 15–30 minutes.</li>
      </ol>
      <p>
        Each 25-minute block is one "Pomodoro." You track them — a simple tick mark is enough. Our free <a href="/tools/pomodoro-timer">Pomodoro Timer</a> handles the timing and session counting automatically.
      </p>

      <h2>Why it works: the cognitive science</h2>

      <h3>It treats interruptions as expensive</h3>
      <p>
        Research by Gloria Mark at UC Irvine found that after an interruption, it takes an average of 23 minutes to fully regain deep focus on a task. Most modern work environments interrupt people every few minutes — emails, Slack messages, colleagues, notifications. The average worker checks email 36 times per hour in some studies.
      </p>
      <p>
        The Pomodoro Technique addresses this by making interruption a defined event rather than a constant background noise. If something comes up during a Pomodoro, you either write it down and return to it after the timer, or you accept that this Pomodoro is void and start a new one. This creates a psychological commitment to protecting the work block.
      </p>

      <h3>Time boxing creates productive urgency</h3>
      <p>
        Parkinson's Law — the tendency for work to expand to fill the time available — is a real phenomenon. When you have all afternoon to write something, the writing tends to take all afternoon. When you commit to writing for 25 minutes, something different happens: the constraint forces prioritisation and reduces the time spent on low-value refinement.
      </p>

      <h3>Mandatory breaks prevent cognitive fatigue</h3>
      <p>
        Sustained focused attention depletes cognitive resources over time. The breaks built into the Pomodoro system aren't idle time — they let the default mode network (the brain state associated with memory consolidation and creative connection-making) do its work. Consistently skipping breaks degrades performance faster than most people realise.
      </p>

      <h3>It makes procrastination feel manageable</h3>
      <p>
        Procrastination is usually driven not by laziness but by task aversion — an anxiety response to a task that feels large, difficult, or unclear. "I need to write this report" is an open-ended dread. "I'll do one 25-minute session on this report" is concrete and bounded. The technique consistently helps people start tasks they've been avoiding, because starting is easier when the commitment is finite.
      </p>

      <h2>Common mistakes that make it not work</h2>
      <ul>
        <li><strong>Switching tasks mid-Pomodoro.</strong> The point is single-task focus. If you're answering emails and writing code in the same 25 minutes, you're not doing Pomodoros, you're just working with a timer running.</li>
        <li><strong>Using breaks to check your phone.</strong> The break is for mental disengagement. Social media and email keep your brain in processing mode. Look out a window, walk around, make a drink.</li>
        <li><strong>Working through the break.</strong> "I'm in the flow, I don't need a break" usually means you're about to hit a wall. The breaks are what make the next session good.</li>
        <li><strong>Not capturing interruptions.</strong> Keep a notebook nearby. When a stray thought or to-do surfaces, write it down in 5 seconds and return to the task. Don't pursue it.</li>
      </ul>

      <h2>When to adapt the 25-minute default</h2>
      <p>
        The standard 25/5 ratio is a starting point, not a rule. Many people find it works better modified:
      </p>
      <ul>
        <li><strong>50/10 ratio:</strong> Longer sessions for deep creative or analytical work that takes time to build momentum — writing, coding, design. The 25-minute default can feel too short for work that requires significant mental context-loading.</li>
        <li><strong>15/5 ratio:</strong> Shorter sessions for work requiring intense concentration over short bursts, or for people building the focus habit for the first time.</li>
        <li><strong>90-minute blocks:</strong> Some researchers (including sleep scientist Nathaniel Kleitman) suggest that human ultradian rhythms — natural energy cycles — run approximately 90 minutes. Some people find 90-minute focus sessions with 20-minute breaks more natural than the 25-minute default.</li>
      </ul>
      <p>
        Try the standard ratio for a week before adapting. Most people who abandon it quickly haven't given it enough time to become habitual.
      </p>

      <h2>The tracking component people undervalue</h2>
      <p>
        Recording how many Pomodoros each task actually takes builds a form of self-knowledge that has downstream value. Over time, you'll notice which tasks consistently take more sessions than you estimated, which types of work drain you fastest, and what your realistic productive capacity per day is. This makes planning and project estimation much more accurate.
      </p>
      <p>
        Start with our free <a href="/tools/pomodoro-timer">Pomodoro Timer</a> — just hit start and it handles the rest.
      </p>
    </>
  );
}
