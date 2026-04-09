// src/components/SidebarAdLayout.tsx
import AdSlot from "./AdSlot";
import AffiliateSection from "./AffiliateSection";
import SidebarRecentPosts from "./SidebarRecentPosts";
import SubscribeForm from "./SubscribeForm";
const SIDEBAR_SLOT_ID = process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR ?? "0000000000";

interface SidebarAdLayoutProps {
  children: React.ReactNode;
  tool?: {
    slug: string;
    name: string;
    category: string;
  };
}

export default function SidebarAdLayout({
  children,
  tool,
}: SidebarAdLayoutProps) {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex gap-6 items-start">
        {/* ── Main content ──────────────────────────────────────────────── */}
        <div className="flex-1 min-w-0">
          {children}

          {tool && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">
                🚀 Recommended Tools to Go Further
                <p className="text-sm text-gray-600 mb-4">
                  People using this tool often pair it with these to save time
                  and improve results:
                </p>
              </h2>
              <AffiliateSection tool={tool} />
            </div>
          )}
        </div>

        {/* ── Sticky sidebar — desktop only ─────────────────────────────── */}
        <aside
          className="hidden lg:block w-[320px] flex-shrink-0"
          aria-label="Sidebar"
        >
          <div className="sticky top-20 space-y-4">
            <AdSlot variant="halfpage" slotId={SIDEBAR_SLOT_ID} />
            <SidebarRecentPosts />
            <SubscribeForm variant="inline" />
          </div>
        </aside>
      </div>
    </div>
  );
}
