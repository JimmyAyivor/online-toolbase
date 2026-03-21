// src/app/blog/content/how-to-calculate-days-between-dates.tsx
export default function Post() {
  return (
    <>
      <p>
        Calculating the number of days between two dates seems simple until you
        account for month lengths, leap years, and whether to include or exclude
        the start and end dates. Doing it manually for dates far apart is
        tedious and error-prone. Whether you're tracking project timelines,
        calculating age-based eligibility, figuring out how long until an event,
        or computing interest on a loan with day-count conventions, a reliable
        date difference calculation matters.
      </p>

      <h2>How date difference calculation works</h2>
      <p>
        The most reliable approach: convert both dates to a day count from a
        fixed reference point, then subtract. Our{" "}
        <a href='/tools/date-difference-calculator'>
          Date Difference Calculator
        </a>{" "}
        calculates the exact number of days, weeks, months, and years between
        any two dates, handling all edge cases automatically.
      </p>

      <h2>Inclusive vs exclusive counting</h2>
      <p>
        Whether the start and/or end date counts toward the total depends on
        context:
      </p>
      <ul>
        <li>
          <strong>Exclusive counting</strong> (most common for durations):
          counts the days from the start date up to but not including the end
          date. From 1 January to 31 January = 30 days.
        </li>
        <li>
          <strong>Inclusive counting</strong> (used in legal and financial
          contexts, interest calculations): counts both the start and end date.
          From 1 January to 31 January = 31 days.
        </li>
        <li>
          <strong>Actual days</strong> vs <strong>business days</strong>: some
          contexts exclude weekends and public holidays. A 10 business day
          deadline is not the same as 10 calendar days.
        </li>
      </ul>
      <p>
        Legal documents, financial agreements, and project deadlines often
        specify their counting convention. When in doubt, clarify before
        committing.
      </p>

      <h2>Leap year handling</h2>
      <p>
        A year is a leap year if it's divisible by 4, except for century years
        which must be divisible by 400. So 2000 was a leap year; 1900 was not;
        2024 is; 2100 won't be. February has 29 days in a leap year, 28
        otherwise.
      </p>
      <p>
        For most date difference calculations this is handled automatically, but
        it matters for month-based calculations: "add one month to 31 January"
        28 February is the answer in a non-leap year, 29 February in a leap
        year.
      </p>

      <h2>Working days calculation</h2>
      <p>
        For project management and deadline tracking, business days are often
        what matters. The general formula: total days minus weekends. For a
        precise count, you also need to account for public holidays in the
        relevant jurisdiction which vary by country and sometimes by region.
      </p>
      <p>
        A rough conversion: multiply calendar weeks by 5 to get approximate
        business days. 3 calendar weeks ≈ 15 business days. For precision, use a
        calendar tool or the date calculator with business day mode.
      </p>

      <h2>Common uses for date difference calculation</h2>
      <ul>
        <li>
          <strong>Age calculation:</strong> The exact number of years, months,
          and days between a birthdate and today. Our{" "}
          <a href='/tools/age-calculator'>Age Calculator</a> handles this
          specifically.
        </li>
        <li>
          <strong>Loan interest:</strong> Many loan agreements calculate daily
          interest knowing the exact number of days in a period matters for
          correct interest accrual.
        </li>
        <li>
          <strong>Contract deadlines:</strong> Delivery periods, notice periods,
          option exercise windows all defined by day count.
        </li>
        <li>
          <strong>Countdown to events:</strong> Days until a trip, a deadline, a
          product launch, a personal milestone.
        </li>
        <li>
          <strong>Service duration:</strong> How long a subscription has been
          active, how long an employee has been with a company, how long a
          warranty runs.
        </li>
      </ul>

      <h2>FAQ</h2>

      <h3>How many days is 6 months?</h3>
      <p>
        It depends on which 6 months. The half-year from January to June (181
        days in a non-leap year, 182 in a leap year) differs from July to
        December (184 days). There's no fixed number of days in "6 months" it's
        always a date-specific calculation.
      </p>

      <h3>How do I count business days in a spreadsheet?</h3>
      <p>
        Excel and Google Sheets both have a{" "}
        <code>NETWORKDAYS(start, end, [holidays])</code> function that counts
        business days between dates, excluding weekends and optionally a list of
        specified holidays.
      </p>

      <h3>What's the difference between a calendar month and 30 days?</h3>
      <p>
        A calendar month ends on the same date in the following month (1 March
        to 1 April = one calendar month). 30 days is an absolute count of days.
        For a 30-day period starting 1 March, the end date is 31 March (30 days
        later); for a one-calendar-month period, it's 1 April.
      </p>

      <h2>Conclusion</h2>
      <p>
        Date difference calculations require care about counting conventions,
        month lengths, and leap years. Use the{" "}
        <a href='/tools/date-difference-calculator'>
          Date Difference Calculator
        </a>{" "}
        for reliable results across any time period, and specify your counting
        convention (inclusive vs exclusive, calendar vs business days) when
        precision matters.
      </p>
    </>
  );
}
