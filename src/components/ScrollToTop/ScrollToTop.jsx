import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname, searchParams]);
}

export default ScrollToTop;