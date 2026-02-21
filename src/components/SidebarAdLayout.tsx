// src/components/SidebarAdLayout.tsx
// Wraps tool page content with a sticky sidebar ad on desktop (Zone F).
// On mobile the sidebar collapses and ads flow inline.
// Usage in a tool page.tsx:
//
//   import SidebarAdLayout from "@/components/SidebarAdLayout";
//
//   export default function MyToolPage() {
//     return (
//       <SidebarAdLayout>
//         <MyToolClient />
//       </SidebarAdLayout>
//     );
//   }

import AdSlot from "./AdSlot";

// Slot IDs — replace with your real AdSense slot IDs
const SIDEBAR_SLOT_ID = process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR ?? "0000000000";

interface SidebarAdLayoutProps {
  children: React.ReactNode;
}

export default function SidebarAdLayout({ children }: SidebarAdLayoutProps) {
  return (
    <div className='max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
      <div className='flex gap-6 items-start'>
        {/* ── Main content ──────────────────────────────────────────────── */}
        <div className='flex-1 min-w-0'>{children}</div>

        {/* ── Sticky sidebar ad — desktop only ─────────────────────────── */}
        {/* hidden on screens < lg (1024px); appears to the right of tool */}
        <aside
          className='hidden lg:block w-[320px] flex-shrink-0'
          aria-label='Sidebar advertisement'
        >
          <div className='sticky top-20'>
            {" "}
            {/* top-20 = below sticky header */}
            <AdSlot variant='halfpage' slotId={SIDEBAR_SLOT_ID} />
          </div>
        </aside>
      </div>
    </div>
  );
}
