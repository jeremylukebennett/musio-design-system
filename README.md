# Musio Design System Snapshot

Interactive style guide and token workbench for the Musio brand. Tweak colors, typography, buttons, and container tokens, see changes instantly, and copy ready-to-use CSS from the UI.

## Highlights
- Live editing for Musio colors, typography (H1–H6 + paragraph), button states (primary/secondary, default/hover), container radius scale, and typefaces.
- Code blocks surface generated CSS variables and component styles as you edit.
- Save, save-as, load, and reset flows; tokens persist to Firestore when reachable and fall back to localStorage if not.
- Built with Vite, React, TypeScript, Tailwind CSS, shadcn/ui, and React Query.

## Getting Started
Prerequisites: Node.js 18+ and npm.

```sh
npm install
npm run dev
```

Optional scripts:
- `npm run build` – production bundle
- `npm run preview` – serve the production build locally
- `npm run lint` – lint the codebase

## Persistence & Data Flow
- Canonical tokens live in `src/lib/tokens.ts` (`canonicalTokens`).
- Runtime state comes from `useTokens`:
  - Loads from Firestore (`tokens/musio-design-tokens` and `saved-configs`) when the configured project is reachable.
  - Falls back to `localStorage` (`musio-tokens`) if Firestore fails.
  - Save/Save As updates Firestore and local storage; Reset restores canonical tokens.
- Firebase configuration is defined in `src/lib/firebase.ts` (project: `musio-token-studio`).

## UI Map
- Colors: edit the palette, add tokens, and copy generated CSS variables.
- Typefaces: primary UI and accent font samples with adjustable families, line heights, and labels.
- Typography: adjust H1–H6 and paragraph tokens with live preview and text shadow controls.
- Buttons: tune primary/secondary default and hover states; copy generated CSS for each class.
- Containers: radius scale and shell reference used in Musio pricing modules.
- Sidebar: save, save as, load, and reset controls, plus section quick links.

## Project Structure
- `src/pages/Index.tsx` – main experience and layout
- `src/components/design-system/` – individual token editors and preview sections
- `src/hooks/useTokens.ts` – token state, persistence, and saved-config logic
- `src/lib/` – token definitions and Firebase setup

## Deployment
Build the static bundle (`npm run build`) and host the `dist/` directory on your preferred static host (e.g., Vercel, Netlify, S3/CloudFront). No server is required beyond Firestore access for persistence.
