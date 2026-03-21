// src/app/blog/content/cron-jobs-explained-scheduling-guide.tsx
export default function Post() {
  return (
    <>
      <p>
        Cron is one of those Unix tools that's been around since 1975 and shows
        no signs of being replaced because it solves one problem perfectly and
        does nothing else. If you need to run a script, a command, or any
        automated task on a schedule, cron is almost certainly the right tool.
        The main barrier for most people is the expression syntax, which looks
        cryptic until you understand its structure.
      </p>

      <h2>What a cron job is</h2>
      <p>
        A cron job is a scheduled task that runs automatically at specified
        intervals. The cron daemon runs continuously in the background and
        executes tasks at the times defined in a crontab (cron table) file. Any
        command that can be run manually in a terminal can be run as a cron job.
      </p>
      <p>
        Common use cases: database backups, log rotation, sending scheduled
        emails or reports, fetching data from APIs on a schedule, running
        maintenance scripts, clearing caches.
      </p>
      <p>
        Our <a href='/tools/cron-expression-builder'>Cron Expression Builder</a>{" "}
        lets you build and validate cron expressions visually choose the
        schedule parameters and see the resulting expression alongside a
        human-readable description.
      </p>

      <h2>Anatomy of a cron expression</h2>
      <p>A standard cron expression has five fields, in order:</p>
      <pre>
        <code>{`┌───── minute (0–59)
│ ┌───── hour (0–23)
│ │ ┌───── day of month (1–31)
│ │ │ ┌───── month (1–12 or JAN–DEC)
│ │ │ │ ┌───── day of week (0–7, 0 and 7 = Sunday, or SUN–SAT)
│ │ │ │ │
* * * * *`}</code>
      </pre>
      <p>
        Each field can contain: a specific value, a range (1–5), a step (*/5 =
        every 5 units), a list (1,3,5), or * for "every."
      </p>

      <h2>Common cron expressions</h2>
      <ul>
        <li>
          <code>* * * * *</code> every minute
        </li>
        <li>
          <code>0 * * * *</code> every hour (at minute 0)
        </li>
        <li>
          <code>0 0 * * *</code> once a day at midnight
        </li>
        <li>
          <code>0 9 * * *</code> every day at 9am
        </li>
        <li>
          <code>0 0 * * 0</code> every Sunday at midnight
        </li>
        <li>
          <code>0 0 1 * *</code> first day of every month at midnight
        </li>
        <li>
          <code>*/15 * * * *</code> every 15 minutes
        </li>
        <li>
          <code>0 9-17 * * 1-5</code> every hour from 9am to 5pm, Monday to
          Friday
        </li>
        <li>
          <code>0 0 * * 1-5</code> Monday through Friday at midnight
        </li>
      </ul>

      <h2>Special strings (supported by most modern implementations)</h2>
      <p>
        Many cron implementations support shorthand strings for common
        schedules:
      </p>
      <ul>
        <li>
          <code>@yearly</code> or <code>@annually</code> once a year (0 0 1 1 *)
        </li>
        <li>
          <code>@monthly</code> once a month (0 0 1 * *)
        </li>
        <li>
          <code>@weekly</code> once a week (0 0 * * 0)
        </li>
        <li>
          <code>@daily</code> once a day (0 0 * * *)
        </li>
        <li>
          <code>@hourly</code> once an hour (0 * * * *)
        </li>
        <li>
          <code>@reboot</code> once at startup
        </li>
      </ul>

      <h2>Managing crontab files</h2>
      <p>
        Edit your user's crontab with <code>crontab -e</code>. List existing
        cron jobs with <code>crontab -l</code>. Remove all cron jobs with{" "}
        <code>crontab -r</code> (be careful).
      </p>
      <p>
        Each line in a crontab is either a comment (starting with #) or a cron
        job in the format: <code>expression command</code>. System-wide crontabs
        (in <code>/etc/cron.d/</code> or <code>/etc/crontab</code>) have an
        additional field for the user to run as.
      </p>

      <h2>Common pitfalls</h2>

      <h3>Environment variables</h3>
      <p>
        Cron runs with a minimal environment $PATH, $HOME, and $SHELL may differ
        from your interactive shell. Scripts that work manually may fail in cron
        because the command isn't in cron's PATH. Solution: use absolute paths
        for all commands and scripts (<code>/usr/bin/python3</code> not{" "}
        <code>python3</code>, <code>/home/user/scripts/backup.sh</code> not{" "}
        <code>./backup.sh</code>).
      </p>

      <h3>Timezone</h3>
      <p>
        Cron uses the system timezone by default. On servers set to UTC, a cron
        job scheduled for 9am runs at 9am UTC. If your intended schedule is in a
        different timezone, either convert the times to UTC or set a CRON_TZ
        variable in supported implementations.
      </p>

      <h3>Output and logging</h3>
      <p>
        By default, cron emails output to the local mail spool, which many
        servers ignore. Redirect output explicitly:{" "}
        <code>command &gt;&gt; /var/log/myjob.log 2&gt;&amp;1</code> appends
        stdout and stderr to a log file. Use <code>MAILTO=""</code> at the top
        of the crontab to suppress email output.
      </p>

      <h2>FAQ</h2>

      <h3>Is cron available on Windows?</h3>
      <p>
        Cron is Unix/Linux. Windows uses Task Scheduler for equivalent
        functionality. Windows Subsystem for Linux (WSL) includes cron for those
        working in a Linux environment on Windows.
      </p>

      <h3>What's the difference between cron and at?</h3>
      <p>
        Cron schedules recurring tasks. <code>at</code> schedules a one-time
        task at a specific future time. For recurring automation, cron. For a
        single future execution, <code>at</code>.
      </p>

      <h3>Can cron run more frequently than once a minute?</h3>
      <p>
        Standard cron cannot schedule sub-minute intervals the smallest unit is
        one minute. For sub-minute scheduling, use a loop inside a script called
        by cron, a dedicated job scheduler, or systemd timers which support
        finer granularity.
      </p>

      <h2>Conclusion</h2>
      <p>
        Cron is the standard tool for scheduled automation on Linux and Unix
        systems. The five-field expression syntax covers any recurring schedule
        you need. Use the{" "}
        <a href='/tools/cron-expression-builder'>Cron Expression Builder</a> to
        construct and validate expressions visually before adding them to your
        crontab, and always test new cron jobs manually before relying on
        automated execution.
      </p>
    </>
  );
}
