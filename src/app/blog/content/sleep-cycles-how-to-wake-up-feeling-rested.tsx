// src/app/blog/content/sleep-cycles-how-to-wake-up-feeling-rested.tsx
export default function Post() {
  return (
    <>
      <p>
        Why you sometimes wake up after 7 hours feeling groggy and other times
        feel sharp after 6 hours comes down to where you were in your sleep
        cycle when the alarm went off. Sleep happens in repeating cycles of
        approximately 90 minutes, and waking mid-cycle particularly during deep
        sleep produces the disoriented, heavy feeling called sleep inertia.
        Timing your alarm to the end of a cycle is the most actionable sleep
        improvement most people can make without changing how long they sleep.
      </p>

      <h2>The 90-minute sleep cycle</h2>
      <p>
        Each sleep cycle lasts approximately 90 minutes and consists of several
        stages:
      </p>
      <ul>
        <li>
          <strong>Stage 1 (N1):</strong> Light sleep, the transition from
          wakefulness. Easily disrupted. 1–7 minutes.
        </li>
        <li>
          <strong>Stage 2 (N2):</strong> Deeper light sleep. Heart rate slows,
          body temperature drops. Makes up the largest proportion of total sleep
          time.
        </li>
        <li>
          <strong>Stage 3 (N3):</strong> Deep (slow-wave) sleep. Hardest to wake
          from; produces the worst sleep inertia if woken during this stage.
          Most restorative for physical recovery. Concentrated in the first half
          of the night.
        </li>
        <li>
          <strong>REM (Rapid Eye Movement):</strong> Active dreaming stage.
          Memory consolidation, emotional processing. Brain activity similar to
          wakefulness. Dominates the second half of the night.
        </li>
      </ul>
      <p>
        Waking naturally at the end of a REM period when you're in the lightest
        sleep produces the cleanest, most alert awakening.
      </p>

      <h2>How to time your sleep</h2>
      <p>
        Our <a href="/tools/sleep-calculator">Sleep Calculator</a> calculates
        ideal bedtimes to wake up at a target time (or ideal wake times from a
        target bedtime), aligning with 90-minute cycle completions.
      </p>
      <p>
        The formula: sleep time + (90 × number of cycles) + 15 minutes to fall
        asleep = wake time.
      </p>
      <p>
        For a 7am wake time: working backwards from 7am in 90-minute increments
        (allowing 15 minutes to fall asleep): bedtimes of 11:45pm (5 cycles),
        10:15pm (6 cycles), 8:45pm (7 cycles).
      </p>

      <h2>How many cycles do you need?</h2>
      <p>
        Most adults need 5–6 complete cycles (7.5–9 hours) for full cognitive
        performance and physical recovery. 5 cycles (7.5 hours) is sufficient
        for most people under 65. 6 cycles (9 hours) is appropriate during
        periods of illness, intense training, or recovery from sleep debt.
      </p>
      <p>
        Fewer than 4 cycles (under 6 hours) consistently impairs cognitive
        function, immune response, and metabolic health regardless of subjective
        feeling. People who report functioning well on 5 hours typically show
        measurable impairment in objective testing; the sensation of adaptation
        is not evidence of actual adaptation.
      </p>

      <h2>Sleep debt and catching up</h2>
      <p>
        Sleep debt accumulates when you consistently sleep less than needed.
        Short-term debt (a few nights) can be partially recovered with extra
        sleep at the weekend though the cognitive costs of the deficit occur
        regardless. Chronic sleep debt (weeks to months) produces longer-lasting
        effects on metabolism, cardiovascular health, and mental health that
        aren't fully resolved by a single extended sleep.
      </p>
      <p>
        Prioritising consistent adequate sleep over time is more effective than
        irregular long sleep to compensate for habitual restriction.
      </p>

      <h2>Practical tips for better sleep timing</h2>
      <ul>
        <li>
          <strong>Consistent wake time:</strong> Waking at the same time daily
          anchors your circadian rhythm more important than consistent bedtime.
          Even after a short night, wake at your usual time and go to bed
          earlier the following night.
        </li>
        <li>
          <strong>Light exposure:</strong> Bright light (especially sunlight) in
          the morning advances sleep timing. Light exposure in the evening
          (including screens) delays it.
        </li>
        <li>
          <strong>Temperature:</strong> Core body temperature drops to initiate
          sleep. A cool room (16–19°C) supports faster sleep onset and more deep
          sleep.
        </li>
        <li>
          <strong>Caffeine:</strong> Has a half-life of approximately 5–7 hours.
          Caffeine at 3pm is still 25–50% active at 11pm for most people.
        </li>
      </ul>

      <h2>FAQ</h2>

      <h3>Is 6 hours of sleep really enough?</h3>
      <p>
        For most adults, no 6 hours consistently impairs cognitive performance,
        reaction time, and mood even when it stops feeling "bad." A small
        percentage of people (estimated at under 3%) are genuine short sleepers
        due to a genetic variant; for everyone else, 6 hours is insufficient.
      </p>

      <h3>Does napping count toward daily sleep?</h3>
      <p>
        A short nap (10–20 minutes) improves alertness and performance without
        producing sleep inertia or significantly affecting nighttime sleep.
        Longer naps (over 30 minutes) enter deep sleep and can disrupt nighttime
        sleep timing. Napping after 3pm is more likely to interfere with evening
        sleep onset.
      </p>

      <h3>What's the best time to go to sleep?</h3>
      <p>
        The best bedtime is determined by your required wake time minus sleep
        duration. For a 6:30am wake time needing 7.5 hours: 10:45pm (allowing 15
        minutes to fall asleep). The calculator handles this automatically for
        any target wake time.
      </p>

      <h2>Conclusion</h2>
      <p>
        Aligning your alarm to 90-minute sleep cycle completions is the simplest
        sleep quality improvement most people can make. Use the{" "}
        <a href="/tools/sleep-calculator">Sleep Calculator</a> to find the ideal
        bedtime for your wake time, target 5–6 complete cycles, and prioritise a
        consistent wake time as the anchor of your sleep schedule.
      </p>
    </>
  );
}
