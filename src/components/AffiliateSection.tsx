import { getAffiliateOffers } from "@/affiliate/affiliate-engine";
import type { Tool } from "@/types/tool";

export default function AffiliateSection({ tool }: { tool: Tool }) {
  const offers = getAffiliateOffers(tool);

  return (
    <div className="mt-12">
      <div className="grid md:grid-cols-3 gap-4">
        {offers.map((offer) => (
          <div key={offer.key} className="border rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold">{offer.name}</h3>
            <p className="text-sm text-gray-500">{offer.description}</p>

            <a
              href={`/go?offer=${offer.key}&tool=${tool.slug}`}
              className="mt-3 inline-block bg-black text-white px-4 py-2 rounded-lg"
            >
              Try {offer.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
