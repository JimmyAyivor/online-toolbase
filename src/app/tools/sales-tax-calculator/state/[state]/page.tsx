import { Metadata } from "next";
import { stateTaxData } from "@/lib/stateTaxData";
import SalesTaxCalculatorClient from "@/app/tools/sales-tax-calculator/SalesTaxCalculatorClient";
import SidebarAdLayout from "@/components/SidebarAdLayout";
import PageEditorial from "@/app/tools/sales-tax-calculator/PageEditorial";
import ToolEngagement from "@/components/ToolEngagement";
import { tools } from "@/lib/tools";
type Props = {
  params: Promise<{ state: string }>;
};
const tool = tools.find((t) => t.slug === "sales-tax-calculator");

export function generateStaticParams() {
  return stateTaxData.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const state = stateTaxData.find((s) => s.slug === stateSlug);

  if (!state) return {};

  return {
    title: `${state.name} Sales Tax Calculator (2026) – Calculate Total Price`,
    description: `Use our free ${state.name} sales tax calculator to quickly estimate total price, tax amount, and after-tax cost.`,
  };
}

export default async function StatePage({ params }: Props) {
  const { state: stateSlug } = await params;
  const state = stateTaxData.find((s) => s.slug === stateSlug);

  if (!state) {
    return <div>State not found</div>;
  }

  return (
    <SidebarAdLayout tool={tool}>
      <main id="main-content" aria-label="Sales Tax Calculator tool">
        <h1 className="text-3xl font-bold mb-4">
          {state.name} Sales Tax Calculator
        </h1>

        <p className="text-gray-600 mb-6">
          {state.rate === 0
            ? `${state.name} has no statewide sales tax. Some local jurisdictions may still levy their own tax — check your city or county rate for a precise figure.`
            : `Calculate sales tax and total price in ${state.name}. The base state sales tax rate is ${state.rate}% (excluding local taxes).`}
        </p>

        {/* Calculator prefilled */}

        <SalesTaxCalculatorClient defaultRate={state.rate} />
        <section className="mt-10 space-y-6">
          <h2 className="text-2xl font-semibold">Sales Tax in {state.name}</h2>

          <p>
            The statewide base sales tax rate in {state.name} is {state.rate}%.
            Local cities and counties may add additional taxes, increasing the
            final rate.
          </p>

          <h2 className="text-2xl font-semibold">Example Calculation</h2>

          <p>
            If you buy an item for $100 in {state.name}, the estimated tax would
            be:
          </p>

          <ul className="list-disc ml-6">
            <li>Tax: ${((100 * state.rate) / 100).toFixed(2)}</li>
            <li>Total: ${(100 + (100 * state.rate) / 100).toFixed(2)}</li>
          </ul>

          <h2 className="text-2xl font-semibold">Reverse Sales Tax</h2>

          <p>
            To remove tax from a total price in {state.name}, divide the total
            by (1 + tax rate).
          </p>

          <h2 className="text-2xl font-semibold">Related Tools</h2>

          <ul className="list-disc ml-6">
            <li>Discount Calculator</li>
            <li>Percentage Calculator</li>
            <li>VAT Calculator</li>
          </ul>
        </section>
      </main>
      <PageEditorial />
      <ToolEngagement
        toolSlug="sales-tax-calculator"
        toolName="Sales Tax Calculator"
      />
    </SidebarAdLayout>
  );
}
