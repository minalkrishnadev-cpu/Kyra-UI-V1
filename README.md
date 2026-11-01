# KYRA Mirror: Onboarding (React)

Built from the **Onboarding** section of the "For dev" page in the KYRA Mirror Figma file.
Canvas is 1080 x 3840 (portrait kiosk) and scales to fit the window.

## Run
```bash
npm install
npm run assets   # downloads Figma images into public/assets (see notes below)
npm run dev
```
Preview any screen directly with `?screen=<name>`, e.g. `http://localhost:5173/?screen=listening`.

## Screens (one file each, in `src/screens/onboarding/`)
| File | `?screen=` | Figma node |
|---|---|---|
| SplashScreen | splash | 2043:8300 |
| WelcomeScreen | welcome | 2043:8291 |
| LookingForTodayScreen | lookingForToday | 2043:8311 |
| HowCanIHelpYouScreen | howCanIHelp | 2043:8322 |
| WhatAreYouLookingForScreen | whatAreYouLookingFor | 2043:13023 |
| SurpriseMeScreen | surpriseMe | 2043:13011 |
| FemaleSomethingSpecificScreen | femaleSomethingSpecific | 2043:8334 |
| MaleSomethingSpecificScreen | maleSomethingSpecific | 2043:9935 |
| TellUsWhatYouHaveInMindScreen | tellUs | 2043:9444 |
| BuildYourProfileScreen | buildProfile | 2043:9928 |
| ListeningScreen | listening | 2043:13036 |

Shared pieces live in `src/components/` (AppHeader, KyraLogo, OptionCard, ScreenFrame).

## Things to confirm
- Screen background `#2a2a2a` was sampled from the preview, not a named Figma token.
- Both accessory cards on the female and male screens are labelled "Accessories" in Figma (boots and bag icons).
- Navigation between screens is inferred from the Figma notes; see TODOs in `src/App.jsx`.
- Figma's "Kyra" star is animated in the design notes; only the static mark is implemented.
