// src/app/blog/content/how-to-calculate-crypto-profit-and-loss.tsx
export default function Post() {
  return (
    <>
      <p>
        Calculating profit or loss on a cryptocurrency trade is straightforward
        in concept but complicated in practice fees, multiple purchase prices,
        partial sales, and exchange rate conversions all affect the final
        figure. Understanding what you actually gained or lost matters both for
        personal financial tracking and for tax compliance in most
        jurisdictions.
      </p>

      <h2>The basic calculation</h2>
      <p>
        Profit / Loss = (Sale price − Purchase price) × Quantity sold − Fees
      </p>
      <p>
        Example: bought 0.5 BTC at £20,000 each (total £10,000), sold at £28,000
        each (total £14,000), total fees £200.
      </p>
      <p>Profit = £14,000 − £10,000 − £200 = £3,800.</p>
      <p>
        Our{" "}
        <a href="/tools/crypto-profit-calculator">Crypto Profit Calculator</a>{" "}
        handles the calculation for any cryptocurrency, entry price, exit price,
        quantity, and fees.
      </p>

      <h2>Fees: the hidden cost that compounds</h2>
      <p>
        Exchange fees typically range from 0.1% to 0.5% per trade. On a £10,000
        trade, that's £10–50 each way. Over many trades, fees accumulate
        significantly. Including fees in your profit/loss calculation is
        essential ignoring them produces a consistently optimistic picture of
        your performance.
      </p>
      <p>Fee types to account for:</p>
      <ul>
        <li>
          <strong>Trading fees:</strong> Maker/taker fees charged by the
          exchange per trade
        </li>
        <li>
          <strong>Withdrawal fees:</strong> Charged when moving assets off an
          exchange
        </li>
        <li>
          <strong>Network (gas) fees:</strong> Paid to blockchain validators,
          particularly significant on Ethereum
        </li>
        <li>
          <strong>Spread:</strong> The difference between buy and sell prices on
          some exchanges effectively an implicit fee not always shown explicitly
        </li>
      </ul>

      <h2>Cost basis methods for multiple purchases</h2>
      <p>
        If you've bought the same cryptocurrency at multiple prices over time,
        your cost basis (purchase price for tax purposes) depends on which
        accounting method you use. The main approaches:
      </p>
      <ul>
        <li>
          <strong>FIFO (First In, First Out):</strong> The first coins you
          bought are treated as the first sold. Used by default in many
          jurisdictions.
        </li>
        <li>
          <strong>LIFO (Last In, First Out):</strong> Most recently purchased
          coins are treated as sold first. Allowed in some jurisdictions.
        </li>
        <li>
          <strong>Specific identification:</strong> You identify which specific
          coins you're selling and use their actual purchase price.
        </li>
        <li>
          <strong>Average cost:</strong> Total amount paid ÷ total coins held =
          average cost per coin. Used in the UK for crypto capital gains
          calculations.
        </li>
      </ul>
      <p>
        Different methods produce different profit figures and therefore
        different tax bills for the same trades. Use the method required by your
        tax authority, not just the one that produces the lowest number.
      </p>

      <h2>Crypto taxation overview</h2>
      <p>
        In most jurisdictions, cryptocurrency is taxed as a capital asset.
        Selling crypto, swapping one cryptocurrency for another, spending crypto
        on goods or services, and receiving crypto as payment are all taxable
        events in many countries.
      </p>
      <ul>
        <li>
          <strong>UK:</strong> Capital Gains Tax applies. Annual CGT allowance
          applies. HMRC uses Section 104 pooling (average cost) for crypto.
        </li>
        <li>
          <strong>US:</strong> Crypto gains are subject to capital gains tax.
          Short-term gains (under 1 year) taxed as ordinary income; long-term
          gains at preferential rates.
        </li>
        <li>
          <strong>EU:</strong> Varies by country. Germany exempts gains on
          crypto held over 1 year. France, Spain, and others tax crypto gains at
          different rates.
        </li>
      </ul>
      <p>
        This is an overview, not tax advice. Crypto tax rules are evolving and
        complex consult a tax professional for your specific situation.
      </p>

      <h2>ROI percentage for crypto trades</h2>
      <p>Return on Investment = (Profit ÷ Initial Investment) × 100</p>
      <p>
        On the example above: (£3,800 ÷ £10,000) × 100 = 38% ROI. This is the
        total return, not annualised. To annualise, use the CAGR formula: if the
        trade was held for 18 months, CAGR = (1.38)^(1/1.5) − 1 = 23.9% per
        year.
      </p>

      <h2>FAQ</h2>

      <h3>Do I pay tax on unrealised crypto gains?</h3>
      <p>
        In most jurisdictions, no tax events are triggered by disposal (selling,
        swapping, or spending), not by simply holding an asset that has
        increased in value. Unrealised gains are not taxable until the asset is
        sold.
      </p>

      <h3>Is swapping one cryptocurrency for another a taxable event?</h3>
      <p>
        In the UK, US, and most other jurisdictions, yes swapping BTC for ETH,
        for example, is treated as selling BTC at its market value and buying
        ETH. Any gain on the BTC from its purchase price to the swap price is a
        taxable event.
      </p>

      <h3>How do I keep track of crypto trades for tax purposes?</h3>
      <p>
        Maintain a complete record of every trade: date, amount, price in local
        currency at time of trade, fees. Most exchanges provide transaction
        history exports. Crypto tax software (Koinly, CoinTracker, TaxBit) can
        aggregate data from multiple exchanges and generate tax reports.
      </p>

      <h2>Conclusion</h2>
      <p>
        Crypto profit calculation requires including fees, using the correct
        cost basis method for your jurisdiction, and accounting for all taxable
        events. Use the{" "}
        <a href="/tools/crypto-profit-calculator">Crypto Profit Calculator</a>{" "}
        for quick trade-by-trade calculations, and use dedicated crypto tax
        software for filing compliance across multiple trades.
      </p>
    </>
  );
}
