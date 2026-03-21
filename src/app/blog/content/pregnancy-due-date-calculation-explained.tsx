// src/app/blog/content/pregnancy-due-date-calculation-explained.tsx
export default function Post() {
  return (
    <>
      <p>
        A due date or Estimated Due Date (EDD) is a calculated estimate, not a
        certainty. Only about 4% of babies arrive on their exact due date.
        Understanding how it's calculated, what it represents, and how accurate
        it is helps set realistic expectations and understand why your
        healthcare provider might adjust the date after an early ultrasound.
      </p>

      <h2>How due date is calculated: Naegele's rule</h2>
      <p>
        The standard method is Naegele's rule, developed in 1812 and still the
        primary calculation used today:
      </p>
      <p>EDD = First day of Last Menstrual Period + 280 days (40 weeks)</p>
      <p>
        Or equivalently: add 1 year, subtract 3 months, add 7 days to the first
        day of your LMP.
      </p>
      <p>Example: LMP started 15 January 2025 → Due date = 22 October 2025.</p>
      <p>
        Our{" "}
        <a href='/tools/pregnancy-due-date-calculator'>
          Pregnancy Due Date Calculator
        </a>{" "}
        computes this automatically from your LMP date and shows your
        week-by-week pregnancy timeline.
      </p>

      <h2>Why 40 weeks?</h2>
      <p>
        Pregnancy is conventionally measured from the last menstrual period, not
        from conception. Ovulation and fertilisation typically occur around 2
        weeks after the LMP. So "40 weeks pregnant" is typically about 38 weeks
        from conception. The 40-week convention accounts for this 2-week offset.
      </p>

      <h2>How gestational age is tracked</h2>
      <p>
        Weeks of pregnancy are counted from the LMP. Week 1 begins on the first
        day of your period; ovulation occurs around week 2; the embryo implants
        around week 3–4. At the time of a first missed period, you're typically
        "4 weeks pregnant" by this convention though only 2 weeks
        post-conception.
      </p>

      <h2>Ultrasound and due date adjustment</h2>
      <p>
        First-trimester ultrasound (typically 10–13 weeks) measures the embryo's
        size to estimate gestational age. This is more accurate than LMP
        calculation when:
      </p>
      <ul>
        <li>
          Cycles are irregular (LMP-based calculation assumes a regular 28-day
          cycle with ovulation on day 14)
        </li>
        <li>The LMP date is uncertain</li>
        <li>The embryo size doesn't match the LMP-calculated dates</li>
      </ul>
      <p>
        If the ultrasound date differs from the LMP-calculated date by more than
        a week (first trimester) or 2 weeks (second trimester), healthcare
        providers typically revise the due date to match the ultrasound
        measurement.
      </p>

      <h2>What the due date actually means</h2>
      <p>
        The EDD is the midpoint of a normal delivery window. Full-term delivery
        is defined as 39–40 weeks; early term is 37–38 weeks; late term is 41
        weeks; post-term is 42 weeks or more. Approximately 80% of babies arrive
        within 2 weeks of the due date.
      </p>
      <p>
        Medical management typically considers whether induction is appropriate
        if pregnancy extends to 41–42 weeks, depending on maternal and foetal
        health status.
      </p>

      <h2>Pregnancy trimesters</h2>
      <ul>
        <li>
          <strong>First trimester:</strong> Weeks 1–12. Embryo → foetus
          development. Most miscarriages occur in this period.
        </li>
        <li>
          <strong>Second trimester:</strong> Weeks 13–26. Growth accelerates;
          most women feel foetal movement by weeks 18–22.
        </li>
        <li>
          <strong>Third trimester:</strong> Weeks 27–40. Final development and
          preparation for birth.
        </li>
      </ul>

      <h2>FAQ</h2>

      <h3>What if my cycles aren't 28 days?</h3>
      <p>
        Naegele's rule assumes a 28-day cycle with ovulation on day 14. For
        longer or shorter cycles, due date can be adjusted by the same number of
        days. A 32-day cycle (ovulation day 18 rather than 14) shifts the due
        date approximately 4 days later. This adjustment is commonly made during
        dating ultrasound.
      </p>

      <h3>Can I calculate due date from conception date?</h3>
      <p>
        Yes add 266 days (38 weeks) to the date of conception. The{" "}
        <a href='/tools/pregnancy-due-date-calculator'>Due Date Calculator</a>{" "}
        supports both LMP-based and conception date calculation.
      </p>

      <h3>What is the most accurate predictor of birth date?</h3>
      <p>
        First-trimester ultrasound (Crown-Rump Length measurement) is the most
        accurate method for dating a pregnancy, with an error margin of ±5–7
        days.
      </p>

      <h2>Conclusion</h2>
      <p>
        Your due date is an estimate derived from a standard 40-week
        calculation. Most births occur within 2 weeks of this estimate. Use the{" "}
        <a href='/tools/pregnancy-due-date-calculator'>
          Pregnancy Due Date Calculator
        </a>{" "}
        to find your EDD and follow your week-by-week pregnancy timeline, with
        the understanding that the first trimester ultrasound may refine the
        date.
      </p>
    </>
  );
}
