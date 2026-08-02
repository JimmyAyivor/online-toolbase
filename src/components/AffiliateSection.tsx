import { getAffiliateOffers } from "@/affiliate/affiliate-engine";
import type { Tool } from "@/types/tool";

export default function AffiliateSection({ tool }: { tool: Tool }) {
  const offers = getAffiliateOffers(tool);

  return (
    <div className="mt-12">
      
      <div className="grid md:grid-cols-1 gap-4">
           
        {offers.map((offer) => (
          <div key={offer.key} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden p-4">
            {/* Sponsored badge */}
           <div className=" top-30 right-30 mb-4">
          <span className="text-[9px] font-bold uppercase tracking-widest text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
            Affiliate Offer
          </span>
        </div>
            <h3 className="font-semibold">{offer.name}</h3>
            <p className="text-sm text-gray-500">{offer.description}</p>

            <a
              href={`/go?offer=${offer.key}&tool=${tool.slug}`}
              className="mt-3 inline-block bg-sky-600 text-white border-sky-600 text-white px-4 py-2 rounded-lg p-4"
            >
              Try {offer.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
