import React, {useState, useEffect} from "react";
import '../Styles/pageTransition.css';

const PageTransition = ({children}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        return () => setIsVisible(false);
    }, []);

    return (
<div className={`page-transition ${isVisible ? 'fade-in' : 'fade-out'}`}>
        {children}
        </div>
    );
};

export default PageTransition