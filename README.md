This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Advertising delivery

Public placement names live in `src/ads/placements.ts`. Configure the public
Revive delivery URL and zone IDs shown in `.env.example`; never put the Revive
admin or XML-RPC credentials in this repository.

Each `AdPlacement` requests Revive first. Configure the corresponding Revive
zone with direct campaigns at higher priority and the existing network unit as
its remnant banner. The React fallback is used only when that placement has no
valid Revive configuration, so direct and network requests are not fired in
parallel.

The `/advertise` page links advertisers to the self-serve studio at
`https://ads.utilvia.com`; publisher pages do not share Ad Studio credentials or
database access.

Run `npm run test:pagespeed` against the deployed site before and after changing
ad delivery. Set `PAGESPEED_URL` to test a preview deployment and optionally set
`PAGESPEED_API_KEY` when the public API quota requires it.
