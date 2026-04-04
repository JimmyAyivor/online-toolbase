import AdSlot from "./AdSlot";
import AffiliateSection from "./AffiliateSection"; // 🔥 ADD THIS

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
    <div className='max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
      <div className='flex gap-6 items-start'>
        {/* ── Main content ──────────────────────────────────────────────── */}
        <div className='flex-1 min-w-0'>
          {children}

          {/* 🔥 GLOBAL AFFILIATE INJECTION */}
          {tool && (
            <div className='mt-8'>
              <AffiliateSection tool={tool} />
            </div>
          )}
        </div>

        {/* ── Sticky sidebar ad — desktop only ─────────────────────────── */}
        <aside
          className='hidden lg:block w-[320px] flex-shrink-0'
          aria-label='Sidebar advertisement'
        >
          <div className='sticky top-20'>
            <AdSlot variant='halfpage' slotId={SIDEBAR_SLOT_ID} />
          </div>
        </aside>
      </div>
    </div>
  );
}
