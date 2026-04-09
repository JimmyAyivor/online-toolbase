// src/app/blog/content/dice-probability-for-tabletop-gamers.tsx
export default function Post() {
  return (
    <>
      <p>
        Anyone who's played tabletop RPGs, board games, or wargames has
        experienced the moment where you need to know your odds "what's the
        chance I roll 15 or above on a D20?" or "how likely am I to roll at
        least two successes on a pool of five D6s?" Understanding dice
        probability doesn't remove the fun of rolling; it helps you make better
        tactical decisions and stop cursing at statistics you didn't understand.
      </p>

      <h2>Basic dice notation</h2>
      <p>
        Standard dice notation: <code>NdX</code>, where N is the number of dice
        and X is the number of sides.
      </p>
      <ul>
        <li>
          <code>1d6</code> one six-sided die (1–6)
        </li>
        <li>
          <code>2d6</code> two six-sided dice, sum (2–12)
        </li>
        <li>
          <code>1d20</code> one twenty-sided die (1–20), used in D&amp;D
        </li>
        <li>
          <code>3d8+5</code> three eight-sided dice plus 5
        </li>
        <li>
          <code>d%</code> or <code>1d100</code> percentile die (1–100)
        </li>
      </ul>
      <p>
        Our <a href="/tools/dice-roller">Dice Roller</a> simulates any dice
        combination standard RPG dice, custom sides, multiple dice, and
        modifiers.
      </p>

      <h2>Probability basics for common dice</h2>

      <h3>Single die (uniform distribution)</h3>
      <p>
        Each face has equal probability. For a d6: probability of any single
        result = 1/6 ≈ 16.7%. Probability of rolling 4 or higher = 3/6 = 50%.
        Probability of rolling exactly 6 = 1/6 ≈ 16.7%.
      </p>

      <h3>Multiple dice (bell curve)</h3>
      <p>
        Multiple dice produce a bell-curve distribution middle values are more
        likely than extremes. 2d6 produces a range of 2–12 but the probability
        of each value varies: a 7 (six combinations: 1+6, 2+5, 3+4, 4+3, 5+2,
        6+1) is six times more likely than a 2 (only one combination: 1+1).
      </p>
      <p>
        This is why 2d6 and 1d12 feel different even though they have the same
        theoretical range 2d6 clusters around 7, while 1d12 is uniformly
        distributed.
      </p>

      <h2>Advantage and disadvantage (D&amp;D 5e)</h2>
      <p>
        Rolling with advantage means rolling 2d20 and taking the higher result.
        Rolling with disadvantage means taking the lower. This significantly
        affects probability:
      </p>
      <ul>
        <li>Normal d20: probability of rolling 15+ = 30%</li>
        <li>Advantage (2d20 take highest): probability of rolling 15+ ≈ 51%</li>
        <li>
          Disadvantage (2d20 take lowest): probability of rolling 15+ ≈ 9%
        </li>
      </ul>
      <p>
        Advantage is roughly equivalent to a +3 to +5 bonus in the mid-range of
        the DC scale.
      </p>

      <h2>Common games and their dice</h2>
      <ul>
        <li>
          <strong>D&amp;D / Pathfinder:</strong> d4, d6, d8, d10, d12, d20, d100
        </li>
        <li>
          <strong>World of Darkness:</strong> pools of d10s, counting successes
        </li>
        <li>
          <strong>FATE:</strong> Fudge dice (dF) four sides: +1, +1, 0, 0, −1,
          −1
        </li>
        <li>
          <strong>Warhammer:</strong> Custom symbol dice where faces represent
          hits, criticals, misses
        </li>
        <li>
          <strong>Monopoly / most board games:</strong> 2d6
        </li>
      </ul>

      <h2>FAQ</h2>

      <h3>Is a digital dice roller truly random?</h3>
      <p>
        Digital dice use pseudorandom number generators (PRNGs). For gaming
        purposes, they're random enough the sequence is unpredictable without
        knowing the seed. Cryptographically secure PRNGs (which our roller uses)
        produce results indistinguishable from true randomness for all practical
        purposes.
      </p>

      <h3>What's the average roll on a d20?</h3>
      <p>
        The average of any single die with equal faces is (minimum + maximum) ÷
        2 = (1 + 20) ÷ 2 = 10.5. On a d6: (1 + 6) ÷ 2 = 3.5. For 2d6: 3.5 × 2 =
        7.
      </p>

      <h2>Conclusion</h2>
      <p>
        Dice probability follows predictable mathematical rules that help you
        understand risk in tabletop gaming and make better tactical decisions.
        Use the <a href="/tools/dice-roller">Dice Roller</a> to simulate any
        combination of dice for any game system, with automatic sum, individual
        results, and modifier support.
      </p>
    </>
  );
}
