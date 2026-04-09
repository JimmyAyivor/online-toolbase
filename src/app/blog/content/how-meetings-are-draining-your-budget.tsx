// src/app/blog/content/how-meetings-are-draining-your-budget.tsx
export default function Post() {
  return (
    <>
      <p>
        Most organisations have no idea what their meetings actually cost. A
        one-hour meeting with 8 people doesn't cost one hour it costs eight
        hours of collective labour, plus the time lost to context-switching
        before and after. When you see that number in dollars rather than
        abstract "time," the calculus around which meetings to have, and how
        long to hold them, changes significantly.
      </p>

      <h2>Calculating the real cost of a meeting</h2>
      <p>
        The basic formula: Meeting cost = Average hourly rate of attendees ×
        Number of attendees × Duration in hours.
      </p>
      <p>
        A 60-minute meeting with 10 people at an average fully-loaded cost of
        $75/hour: $75 × 10 × 1 = $750. For a recurring weekly meeting, that's
        $39,000 per year.
      </p>
      <p>
        "Fully-loaded cost" includes salary plus employer overhead (benefits,
        payroll tax, office space, equipment) typically 1.25–1.5× salary. A
        $60,000/year employee costs approximately $30–45/hour fully loaded.
      </p>
      <p>
        Our <a href="/tools/meeting-cost-calculator">Meeting Cost Calculator</a>{" "}
        computes the cost in real time based on attendee count, average salary,
        and meeting duration.
      </p>

      <h2>The hidden costs beyond the direct calculation</h2>
      <p>The arithmetic cost is the floor. The full cost is higher:</p>
      <ul>
        <li>
          <strong>Context-switching cost:</strong> Research on cognitive
          switching suggests it takes 10–20 minutes to fully re-enter focused
          work after an interruption. A 30-minute meeting in the middle of a
          focus block effectively consumes 50–70 minutes of productive capacity.
        </li>
        <li>
          <strong>Opportunity cost:</strong> The meeting is replacing something
          else. Deep work, customer deliverables, creative output whatever isn't
          getting done during those hours has its own value.
        </li>
        <li>
          <strong>Preparation and follow-up:</strong> A well-run meeting
          involves preparation (agenda, pre-reading) and follow-up (notes,
          actions, accountability). These extend the true time cost beyond the
          meeting duration.
        </li>
      </ul>

      <h2>When meetings are the right tool</h2>
      <p>Meetings are most valuable for:</p>
      <ul>
        <li>Decisions requiring input from multiple parties simultaneously</li>
        <li>Complex problems where real-time discussion accelerates clarity</li>
        <li>Relationship building and team cohesion</li>
        <li>Anything where the nuance of live back-and-forth matters</li>
      </ul>
      <p>Meetings are poor value for:</p>
      <ul>
        <li>Status updates that could be a written report</li>
        <li>Information sharing that doesn't require discussion</li>
        <li>Decisions one person can make without group input</li>
        <li>
          "Alignment meetings" where the alignment could be achieved
          asynchronously
        </li>
      </ul>

      <h2>Making meetings cheaper</h2>
      <ul>
        <li>
          <strong>Reduce attendees:</strong> Every additional person multiplies
          cost. Invite decision-makers, not observers.
        </li>
        <li>
          <strong>Reduce duration:</strong> Default to 25-minute and 50-minute
          meetings instead of 30 and 60. Parkinson's Law applies meetings expand
          to fill the scheduled time.
        </li>
        <li>
          <strong>Require agendas:</strong> No agenda, no meeting. An agenda
          forces organisers to define the purpose, which often reveals the
          meeting isn't necessary.
        </li>
        <li>
          <strong>Start and end on time:</strong> Meeting lateness has a
          multiplicative effect on cost 10 people waiting 5 minutes is 50
          minutes of wasted labour.
        </li>
      </ul>

      <h2>FAQ</h2>

      <h3>How do I use the meeting cost calculator in practice?</h3>
      <p>
        Share the calculated cost in the meeting invite or at the start of the
        meeting. Some organisations display a running cost counter during long
        meetings. The transparency alone changes behaviour people think twice
        about off-topic tangents when they can see the cost accumulating.
      </p>

      <h3>What's the most cost-effective meeting format?</h3>
      <p>
        Standing meetings (literally, without chairs) are systematically shorter
        research shows they run 33% shorter on average with no reduction in
        decision quality. Daily standups of 10–15 minutes replace longer
        check-in meetings for team coordination.
      </p>

      <h2>Conclusion</h2>
      <p>
        Meetings are an expensive tool that most organisations deploy without
        calculating the cost. Use the{" "}
        <a href="/tools/meeting-cost-calculator">Meeting Cost Calculator</a> to
        put a real number on your recurring meetings the results are often
        sobering and use that number to make better decisions about which
        meetings to have, how long to run them, and who needs to be there.
      </p>
    </>
  );
}
