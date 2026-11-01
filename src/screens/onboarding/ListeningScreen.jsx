import AppHeader from "../../components/AppHeader.jsx";
import "./ListeningScreen.css";

/** Figma: Onboarding / "Catagories" (2043:13036). The Kyra mark animates while listening. */
export default function ListeningScreen() {
  return (
    <div className="screen">
      <AppHeader />
      <div className="screen__content">
        <h1 className="title title--h4">Listening</h1>
      </div>
      <div className="listening__kyra">
        <img src="/assets/brand/kyra-talking.png" alt="" />
      </div>
    </div>
  );
}
