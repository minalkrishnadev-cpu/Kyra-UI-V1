import { useState } from "react";
import ScreenFrame from "./components/ScreenFrame.jsx";
import SplashScreen from "./screens/onboarding/SplashScreen.jsx";
import WelcomeScreen from "./screens/onboarding/WelcomeScreen.jsx";
import { CameraProvider } from "./context/CameraContext.jsx";
import LookingForTodayScreen from "./screens/onboarding/LookingForTodayScreen.jsx";
import {HandTrackingProvider} from "./context/HandTrackingContext.jsx"
import HowCanIHelpYouScreen from "./screens/onboarding/HowCanIHelpYouScreen.jsx";
import WhatAreYouLookingForScreen from "./screens/onboarding/WhatAreYouLookingForScreen.jsx";
import SurpriseMeScreen from "./screens/onboarding/SurpriseMeScreen.jsx";
import FemaleSomethingSpecificScreen from "./screens/onboarding/FemaleSomethingSpecificScreen.jsx";
import MaleSomethingSpecificScreen from "./screens/onboarding/MaleSomethingSpecificScreen.jsx";
import TellUsWhatYouHaveInMindScreen from "./screens/onboarding/TellUsWhatYouHaveInMindScreen.jsx";
import SpecificScreen from "./screens/onboarding/SpecificScreen.jsx";
import BuildYourProfileScreen from "./screens/onboarding/BuildYourProfileScreen.jsx";
import ListeningScreen from "./screens/onboarding/ListeningScreen.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AnalysisScreen from "./screens/onboarding/AnalysisScreen.jsx";

/**
 * Onboarding flow. The transitions below are inferred from the Figma notes
 * ("I'M JUST BROWSING -> what are you looking for -> if OUTFIT -> analysis
 * else PICK A PIECE (male/female)"). Anything marked TODO needs confirming.
 */
export default function App() {
  return (

  <BrowserRouter>
  <CameraProvider>
    <HandTrackingProvider>
  <ScreenFrame>
  <Routes>
    <Route path="/" element={<SplashScreen />} />
     <Route path="/welcome" element={<WelcomeScreen />} />
     <Route path="/welcome/looking-for-today" element={<LookingForTodayScreen />} />
     <Route path="/welcome/looking-for-today/surpriseme" element={<SurpriseMeScreen />} />
     <Route path="/welcome/looking-for-today/specificscreen" element={<SpecificScreen />} />
      <Route path="/welcome/looking-for-today/surpriseme/malepicks" element={<MaleSomethingSpecificScreen />} />
        <Route path="/welcome/looking-for-today/surpriseme/femalepicks" element={<FemaleSomethingSpecificScreen />} />
        <Route path="/welcome/looking-for-today/surpriseme/analysis" element={<AnalysisScreen />} />
         <Route path="/welcome/looking-for-today/specificscreen/voicesearch" element={<TellUsWhatYouHaveInMindScreen />} />
          <Route path="/welcome/looking-for-today/specificscreen/voicesearch/listening" element={<ListeningScreen />} />
           <Route path="/welcome/looking-for-today/specificscreen/voicesearch/listening" element={<ListeningScreen />} />
  </Routes>
  </ScreenFrame>
  </HandTrackingProvider>
  </CameraProvider>
  </BrowserRouter>
  );
}
