import { useEffect } from "react";
import { useLocation } from "react-router-dom";


//scrolls back to top when changing url
//code credit: react doc.
export default function ScrollToTop() {

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}