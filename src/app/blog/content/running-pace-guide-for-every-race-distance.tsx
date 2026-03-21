// src/app/blog/content/running-pace-guide-for-every-race-distance.tsx
export default function Post() {
  return (
    <>
      <p>
        Pace is the number that determines whether you hit your race target or
        blow up at mile 18. Most runners especially newer ones start too fast on
        race day, spend their glycogen too early, and slow dramatically in the
        back half. Understanding pace mathematics, training zones, and how to
        plan a negative split changes how you train and race.
      </p>

      <h2>Understanding pace vs speed</h2>
      <p>
        Speed: how far you travel per unit of time (km/h or mph). Pace: how long
        it takes to travel one unit of distance (min/km or min/mile). These are
        inverses of each other.
      </p>
      <p>
        Converting: Speed (km/h) = 60 ÷ Pace (min/km). Pace (min/km) = 60 ÷
        Speed (km/h).
      </p>
      <p>
        A 5:00/km pace = 12 km/h. A 6:00/km pace = 10 km/h. A 4:30/km pace =
        13.3 km/h.
      </p>
      <p>
        Use our{" "}
        <a href='/tools/running-pace-calculator'>Running Pace Calculator</a> to
        find your required pace for any goal finish time, or calculate finishing
        time from pace and distance.
      </p>

      <h2>Target paces for common race distances</h2>
      <p>
        Finishing time = Distance × Pace (accounting for the pace being in
        min/km):
      </p>
      <ul>
        <li>
          <strong>5K (5km):</strong> Sub-25min requires under 5:00/km. Sub-20min
          requires under 4:00/km.
        </li>
        <li>
          <strong>10K:</strong> Sub-50min requires under 5:00/km. Sub-45min
          requires under 4:30/km. Sub-40min requires under 4:00/km.
        </li>
        <li>
          <strong>Half marathon (21.1km):</strong> Sub-2hr requires under
          5:41/km. Sub-1:45 requires under 4:59/km. Sub-1:30 requires under
          4:16/km.
        </li>
        <li>
          <strong>Marathon (42.195km):</strong> Sub-4hr requires under 5:41/km.
          Sub-3:30 requires under 4:58/km. Sub-3hr requires under 4:16/km.
        </li>
      </ul>

      <h2>Training pace zones</h2>
      <p>
        Effective running training uses multiple pace zones, each targeting
        different physiological adaptations:
      </p>
      <ul>
        <li>
          <strong>Easy/recovery pace:</strong> Conversational. About 60–70% of
          max heart rate. Should make up 70–80% of total training volume. Many
          runners do this too fast.
        </li>
        <li>
          <strong>Aerobic/base pace:</strong> Comfortable but focused. 70–80%
          max HR. Long runs often fall here.
        </li>
        <li>
          <strong>Tempo/threshold pace:</strong> "Comfortably hard." Roughly
          15–30 sec/km faster than your target race pace for a half marathon.
          Can sustain for ~60 minutes maximum at threshold intensity.
        </li>
        <li>
          <strong>Interval/VO2max pace:</strong> Hard effort for 3–5 minute
          reps. Your 5K race pace or slightly faster. Requires full recovery
          between reps.
        </li>
        <li>
          <strong>Sprint:</strong> Near-maximum effort for short bursts. Used in
          speed work.
        </li>
      </ul>

      <h2>Negative split strategy</h2>
      <p>
        A negative split means running the second half of a race faster than the
        first. It's associated with better performance outcomes because it
        avoids early glycogen depletion and maintains form into the finish.
      </p>
      <p>
        For beginners: start the first mile or km deliberately slower than goal
        pace. For experienced runners: even splits (consistent pace throughout)
        or a modest negative split of 5–10 seconds per km faster in the second
        half.
      </p>

      <h2>FAQ</h2>

      <h3>How do I convert min/mile to min/km?</h3>
      <p>
        Divide min/mile by 1.609 to get min/km. Multiply min/km by 1.609 to get
        min/mile. An 8:00/mile pace = 8 ÷ 1.609 = 4:58/km. A 6:00/km pace = 6 ×
        1.609 = 9:39/mile.
      </p>

      <h3>What's a good 5K pace for a beginner?</h3>
      <p>
        Any pace that finishes the 5K is a good starting pace. A first 5K around
        35–40 minutes (7:00–8:00/km) is typical for someone new to running. With
        consistent training, most people can reach sub-30 minutes (6:00/km)
        within a few months.
      </p>

      <h3>How much should I slow down for longer distances?</h3>
      <p>
        As a rough guide: 10K pace is approximately 10–15 sec/km slower than 5K
        pace. Half marathon pace is approximately 15–20 sec/km slower than 10K
        pace. Marathon pace is approximately 20–30 sec/km slower than half
        marathon pace. These are approximations individual fitness, training,
        and conditions affect the actual relationship.
      </p>

      <h2>Conclusion</h2>
      <p>
        Knowing your required pace before race day removes guesswork and
        prevents the most common mistake going out too fast. Use the{" "}
        <a href='/tools/running-pace-calculator'>Running Pace Calculator</a> to
        find your target pace for any race distance and goal time, and use
        training pace zones to structure workouts that build toward that target.
      </p>
    </>
  );
}
