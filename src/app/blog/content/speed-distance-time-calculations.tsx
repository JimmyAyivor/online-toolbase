// src/app/blog/content/speed-distance-time-calculations-for-runners-drivers-cyclists.tsx
export default function Post() {
  return (
    <>
      <p>
        Speed, distance, and time are three variables locked in a simple
        formula. Know any two and you can find the third. This sounds basic
        until you're mid-run trying to figure out your finishing time, a cyclist
        calculating how long a route will take, or a driver checking whether
        you'll make an appointment on time. The maths is straightforward;
        knowing when to apply which version of the formula is the practical
        skill.
      </p>

      <h2>The fundamental formula</h2>
      <p>
        Speed = Distance ÷ Time
        <br />
        Distance = Speed × Time
        <br />
        Time = Distance ÷ Speed
      </p>
      <p>
        Units must be consistent. If distance is in kilometres and time is in
        hours, speed is in km/h. If distance is in miles and time is in hours,
        speed is in mph. Mixing units (kilometres and minutes, for example)
        requires conversion first.
      </p>
      <p>
        Our{" "}
        <a href="/tools/speed-distance-time-calculator">
          Speed Distance Time Calculator
        </a>{" "}
        handles all three calculations and unit conversions in one place.
      </p>

      <h2>Running: pace vs speed</h2>
      <p>
        Runners typically work in pace (minutes per kilometre or minutes per
        mile) rather than speed (km/h or mph). Pace and speed are reciprocals of
        each other expressed in different units:
      </p>
      <p>Pace (min/km) = 60 ÷ Speed (km/h)</p>
      <p>
        A runner moving at 10 km/h has a pace of 60 ÷ 10 = 6:00 min/km. A
        5:00/km pace corresponds to 12 km/h.
      </p>
      <p>
        Finishing time for a race = Distance × Pace. For a 10K at 6:00/km: 10 ×
        6 = 60 minutes. For a half marathon (21.1km) at 5:30/km: 21.1 × 5.5 =
        116.05 minutes = 1 hour 56 minutes.
      </p>

      <h2>Useful conversions</h2>
      <ul>
        <li>1 mile = 1.609 km</li>
        <li>Speed in mph × 1.609 = km/h</li>
        <li>Speed in km/h ÷ 1.609 = mph</li>
        <li>Pace in min/mile ÷ 1.609 = min/km</li>
        <li>Pace in min/km × 1.609 = min/mile</li>
      </ul>
      <p>Quick reference: 60 mph ≈ 96.5 km/h. 100 km/h ≈ 62 mph.</p>

      <h2>Driving: estimated travel time</h2>
      <p>
        Time = Distance ÷ Average Speed. A 240-mile journey at an average 60 mph
        = 4 hours. Note: average speed on a road trip is lower than the speed
        limit acceleration, traffic, fuel stops, and slower sections all reduce
        the average. For realistic journey planning, average 80–90% of the speed
        limit for motorway driving.
      </p>

      <h2>Cycling: average speed by terrain</h2>
      <p>Typical cycling speeds for planning purposes:</p>
      <ul>
        <li>Casual/recreational: 12–16 km/h (7–10 mph)</li>
        <li>Regular fitness cycling: 18–24 km/h (11–15 mph)</li>
        <li>Sportive/enthusiast: 25–35 km/h (16–22 mph)</li>
        <li>
          Headwind reduces these by 20–30%; tailwind increases them; hills vary
          significantly
        </li>
      </ul>
      <p>
        For route planning, use a conservative estimate for your fitness level
        and add 15–20% for unknown terrain variation.
      </p>

      <h2>Physics: acceleration and average speed</h2>
      <p>
        The formula above assumes constant speed. For acceleration from rest or
        between different speeds, average speed = (initial speed + final speed)
        ÷ 2 (for constant acceleration). For variable speed journeys, total time
        is total distance divided by average speed which must account for all
        the varying speed segments.
      </p>

      <h2>FAQ</h2>

      <h3>
        How do I calculate average speed for a journey with different speeds on
        different segments?
      </h3>
      <p>
        Average speed = Total distance ÷ Total time. Calculate the time for each
        segment (segment distance ÷ segment speed), sum the times, then divide
        total distance by total time. Don't average the speeds directly that
        gives the wrong answer if the segments have different lengths.
      </p>

      <h3>What pace do I need to run a sub-4-hour marathon?</h3>
      <p>
        A marathon is 42.195 km. For 4 hours (240 minutes): 240 ÷ 42.195 = 5:41
        per km, or approximately 9:10 per mile. Any pace faster than this
        sustains a sub-4-hour finish.
      </p>

      <h3>How do I convert between km/h and m/s?</h3>
      <p>
        Divide km/h by 3.6 to get m/s. Multiply m/s by 3.6 for km/h. 36 km/h =
        10 m/s. This conversion is useful in physics problems where SI units are
        required.
      </p>

      <h2>Conclusion</h2>
      <p>
        Speed, distance, and time calculations are among the most practical in
        everyday life from training targets to journey planning to physics
        problems. Use the{" "}
        <a href="/tools/speed-distance-time-calculator">
          Speed Distance Time Calculator
        </a>{" "}
        for any of the three calculations with automatic unit handling, and
        combine it with the{" "}
        <a href="/tools/running-pace-calculator">Running Pace Calculator</a> for
        race-specific pace and finish time planning.
      </p>
    </>
  );
}
