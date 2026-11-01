import AppHeader from "../../components/AppHeader.jsx";

/** Figma: Onboarding / "Catagories" (2043:9928) */
export default function BuildYourProfileScreen({ onNext }) {
  return (
    <div className="screen" onClick={onNext}>
      <AppHeader />
      <div className="screen__content">
        <h1 className="title">Let’s find the best fit for you by building your profile</h1>
      </div>
    </div>
  );
}
