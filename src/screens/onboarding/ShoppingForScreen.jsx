const MALE_PICKS = "/welcome/looking-for-today/surpriseme/shopfor/malepicks";
const FEMALE_PICKS = "/welcome/looking-for-today/surpriseme/shopfor/femalepicks";
import OptionCard from "../../components/OptionCard.jsx";
import AppHeader from "../../components/AppHeader.jsx";
import { useState } from "react";
import { useNavigate,useLocation, useSearchParams  } from "react-router-dom";

export default function ShoppingForScreen() {
    const { state } = useLocation();
  const [params] = useSearchParams();
  const searchid = state?.id ?? params.get("category");
  console.log(searchid);
      const navigate = useNavigate();
         const handleNavigationforMen = (route) => {
    navigate(`${MALE_PICKS}?category=${encodeURIComponent(searchid)}`, {
      state: { route },
    });
  }; 
    const handleNavigationforWomen = (route) => {
    navigate(`${FEMALE_PICKS}?category=${encodeURIComponent(searchid)}`, {
      state: { route },
    });
  }; 
    return(
     <div className="screen">
            <AppHeader />
            <div className="screen__content" style={{ gap: 300 }}> 
                <h1 className="title title--inset">Who are we shopping for?</h1>
                    <div className="button-row">
                      <OptionCard label="Womenswear" width="w500" onClick={() =>handleNavigationforWomen(searchid)} />
                      <OptionCard label="Menswear" width="w500" onClick={() => handleNavigationforMen(searchid)} />
                    </div>
                  </div>
                  </div>
    )

}