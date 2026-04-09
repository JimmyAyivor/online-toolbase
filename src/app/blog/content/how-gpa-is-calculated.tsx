// src/app/blog/content/how-gpa-is-calculated.tsx
export default function Post() {
  return (
    <>
      <p>
        GPA (Grade Point Average) is the single number that summarises your
        academic performance the weighted average of all your grades, expressed
        on a 4.0 scale in most US institutions. Understanding exactly how it's
        calculated helps you predict the impact of each course and make informed
        decisions about course selection and grade recovery.
      </p>

      <h2>The standard 4.0 GPA scale</h2>
      <p>The conventional US GPA conversion:</p>
      <ul>
        <li>A+ = 4.0, A = 4.0, A− = 3.7</li>
        <li>B+ = 3.3, B = 3.0, B− = 2.7</li>
        <li>C+ = 2.3, C = 2.0, C− = 1.7</li>
        <li>D+ = 1.3, D = 1.0, D− = 0.7</li>
        <li>F = 0.0</li>
      </ul>
      <p>
        Note: some institutions don't use plus/minus grading, which changes the
        scale. Always use your institution's specific conversion scale.
      </p>
      <p>
        Our <a href="/tools/gpa-calculator">GPA Calculator</a> computes both
        semester GPA and cumulative GPA from any combination of grades and
        credit hours.
      </p>

      <h2>How GPA is calculated</h2>
      <p>
        GPA is a weighted average where each course is weighted by its credit
        hours:
      </p>
      <p>
        <strong>Quality Points</strong> = Grade Points × Credit Hours (for each
        course)
      </p>
      <p>
        <strong>GPA</strong> = Total Quality Points ÷ Total Credit Hours
      </p>
      <p>
        Example: Three courses English (3 credits, A = 4.0), Maths (4 credits,
        B+ = 3.3), History (3 credits, A− = 3.7):
      </p>
      <ul>
        <li>English: 4.0 × 3 = 12.0 quality points</li>
        <li>Maths: 3.3 × 4 = 13.2 quality points</li>
        <li>History: 3.7 × 3 = 11.1 quality points</li>
      </ul>
      <p>Total: 36.3 quality points ÷ 10 credit hours = 3.63 GPA.</p>
      <p>
        Higher-credit courses have more weight a poor grade in a 4-credit course
        damages GPA more than the same grade in a 1-credit course.
      </p>

      <h2>Cumulative vs semester GPA</h2>
      <p>
        <strong>Semester GPA</strong> reflects only the current semester's
        courses. <strong>Cumulative GPA</strong> is the running weighted average
        across all courses taken. A strong semester doesn't immediately repair a
        low cumulative GPA the impact depends on how many total credit hours
        you've already accumulated.
      </p>
      <p>
        If you have 60 credit hours accumulated at a 2.8 GPA and want to raise
        it to 3.0, you need to calculate the minimum GPA required in your
        remaining credits to achieve that target the calculator handles this
        reverse calculation.
      </p>

      <h2>Weighted vs unweighted GPA</h2>
      <p>
        <strong>Unweighted GPA</strong> (the standard 4.0 scale) treats all
        courses equally regardless of difficulty. <strong>Weighted GPA</strong>,
        common in US high schools, gives extra grade points for Advanced
        Placement (AP) or International Baccalaureate (IB) courses, resulting in
        GPAs that can exceed 4.0. Most college admissions processes use
        unweighted GPA for comparison.
      </p>

      <h2>FAQ</h2>

      <h3>What GPA do I need for graduate school?</h3>
      <p>
        Requirements vary significantly by program and institution. Most
        selective graduate programs look for 3.0+ as a minimum; top programs
        often prefer 3.5+. A lower GPA can be offset by strong GRE/GMAT scores,
        relevant experience, and a compelling personal statement, but GPA
        remains a significant screening criterion.
      </p>

      <h3>Can I raise my GPA in my final year?</h3>
      <p>
        Yes, but the math gets harder as total credit hours increase. With 90
        credits at 3.0, completing 30 credits at 4.0 raises the cumulative GPA
        to 3.25 meaningful but limited. Earlier semesters have proportionally
        greater impact on final GPA.
      </p>

      <h3>Does GPA matter after university?</h3>
      <p>
        In the first 2–3 years post-graduation, GPA matters for some employers
        (particularly finance, consulting, and some graduate programs). After
        several years of work experience, it becomes largely irrelevant
        employers focus on your professional record instead.
      </p>

      <h2>Conclusion</h2>
      <p>
        Understanding GPA as a weighted average not a simple average changes how
        you think about course selection and grade recovery. Higher-credit
        courses are higher stakes. Use the{" "}
        <a href="/tools/gpa-calculator">GPA Calculator</a> to compute your
        current GPA, model the impact of upcoming grades, and calculate what you
        need in remaining courses to hit a target.
      </p>
    </>
  );
}
