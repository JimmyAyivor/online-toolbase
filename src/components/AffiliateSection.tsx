import { getAffiliateOffers } from "@/affiliate/affiliate-engine";
import type { Tool } from "@/types/tool";

export default function AffiliateSection({ tool }: { tool: Tool }) {
  const offers = getAffiliateOffers(tool);

  return (
    <div className='mt-12'>
      <h2 className='text-xl font-bold mb-4'>
        🚀 Recommended Tools to Go Further
        <p className='text-sm text-gray-600 mb-4'>
          People using this tool often pair it with these to save time and
          improve results:
        </p>
      </h2>

      <div className='grid md:grid-cols-3 gap-4'>
        {offers.map((offer) => (
          <div key={offer.key} className='border rounded-xl p-4 shadow-sm'>
            <h3 className='font-semibold'>{offer.name}</h3>
            <p className='text-sm text-gray-500'>{offer.description}</p>

            <a
              href={`/go?offer=${offer.key}&tool=${tool.slug}`}
              className='mt-3 inline-block bg-black text-white px-4 py-2 rounded-lg'
            >
              Try {offer.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
