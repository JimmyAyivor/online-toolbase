// src/app/blog/content/freelancer-invoicing-guide.tsx
export default function Post() {
  return (
    <>
      <p>
        Getting the work done is the obvious part of freelancing. Getting paid for it — on time, in full, without awkward chasing — is the part most freelancers learn through painful trial and error.
      </p>
      <p>
        A professional invoice does more than ask for money. It's a legal document, a record of the agreement, and a signal that you run a serious operation. Here's exactly what needs to go in one.
      </p>

      <h2>What a freelance invoice must include</h2>

      <h3>Your business details</h3>
      <p>
        Your name or business name, address, email address, and phone number. If you're VAT registered, your VAT number. If you're operating as a limited company, your registered company number and address.
      </p>

      <h3>Client's details</h3>
      <p>
        The name of the business (not just a contact person), their address, and the name of whoever is actually processing the invoice on their end. Getting the right legal entity name is important — invoices addressed to the wrong company can cause payment delays and create problems if a dispute arises.
      </p>

      <h3>A unique invoice number</h3>
      <p>
        Every invoice should have a sequential number. This makes it easy to reference specific invoices in communication, track which ones are paid or outstanding, and maintain organised accounting records. Start from 001 if you're new. Many freelancers use a year prefix (2025-001) to restart the sequence annually.
      </p>

      <h3>Invoice date and payment due date</h3>
      <p>
        The invoice date is the date you issue it. The payment due date is when you expect payment. Standard terms are Net 30 (payment due 30 days from invoice date) for most B2B work, though Net 14 or even Net 7 is reasonable for smaller projects or one-off work. Some freelancers include a specific date rather than "Net 30" to reduce ambiguity — "payment due 15 February 2025" leaves no room for calculation arguments.
      </p>

      <h3>Itemised services</h3>
      <p>
        List each service or deliverable separately with a clear description, quantity (hours, units, or fixed), rate, and line total. Vague descriptions like "web work" or "design services" create disputes. Specific descriptions like "Brand identity design — logo, colour palette, brand guidelines" make it clear exactly what the client is paying for.
      </p>

      <h3>Subtotal, tax, and total</h3>
      <p>
        Show the subtotal before tax, then tax separately (VAT, GST, sales tax — whatever applies in your jurisdiction), then the total amount due. Our <a href="/tools/vat-calculator">VAT Calculator</a> can help you work out the correct VAT amount if you're VAT registered.
      </p>

      <h3>Payment methods</h3>
      <p>
        Include your bank details (sort code and account number in the UK, routing and account number in the US, IBAN for international transfers). If you accept PayPal or Stripe, include those details too. Never make a client guess how to pay you.
      </p>

      <h2>Optional but valuable elements</h2>
      <ul>
        <li><strong>Purchase order number.</strong> Many larger businesses require a PO number on the invoice to process payment. Ask for this before you invoice — without it, your invoice may sit in a queue for weeks.</li>
        <li><strong>Late payment terms.</strong> Including a late payment fee (commonly 2–3% per month on overdue balances) and mentioning it upfront sets expectations and gives you leverage if payment is delayed. In the UK, you have statutory right to charge interest on late B2B payments under the Late Payment of Commercial Debts Act.</li>
        <li><strong>Project or reference number.</strong> If you worked on a specific project, including that reference makes matching your invoice to their records easier for the client's accounts team.</li>
        <li><strong>Your logo.</strong> It doesn't change the legal status of the invoice, but it looks professional and makes your invoices immediately recognisable.</li>
      </ul>

      <h2>Common mistakes that delay payment</h2>
      <ul>
        <li><strong>Sending to the wrong email address.</strong> Always confirm the accounts payable contact before invoicing — particularly with larger companies where your project contact and their finance team are different people.</li>
        <li><strong>Not following up.</strong> A polite chase email three days before the due date is normal business practice, not pushiness. Many late payments are simply forgotten, not withheld.</li>
        <li><strong>Incorrect company details.</strong> A misspelled company name, wrong address, or incorrect VAT number can result in a rejected invoice that has to be reissued, resetting the payment clock.</li>
        <li><strong>Vague descriptions.</strong> "Services rendered" on an invoice is a red flag for accounts teams. Be specific enough that someone who didn't commission the work can understand what was delivered.</li>
        <li><strong>No payment terms.</strong> An invoice without a due date defaults to "whenever they get around to it." Always include specific terms.</li>
      </ul>

      <h2>Getting paid faster</h2>
      <p>
        The biggest practical lever for getting paid faster is invoicing promptly. Every day between delivering work and sending the invoice is a day added to how long you wait for payment. Send it the same day if possible.
      </p>
      <p>
        For longer projects, consider milestone invoicing — billing at defined project stages rather than waiting until the end. This improves your cash flow, reduces the risk of non-payment at project completion, and gives the client regular touch points with your work.
      </p>
      <p>
        Our free <a href="/tools/invoice-generator">Invoice Generator</a> creates professional invoices with all required fields — add your logo, enter line items, and download as a PDF. No subscription, no signup.
      </p>
    </>
  );
}
