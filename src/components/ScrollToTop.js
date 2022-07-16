import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    // scrolls back to top when changing url
    //code credit: react doc.
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}