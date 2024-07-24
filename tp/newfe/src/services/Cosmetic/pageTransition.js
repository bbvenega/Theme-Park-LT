// PageTransition is used to wrape the children components and provide a fade-in and fade-out effect when navigating between pages.

import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useLocation } from 'react-router-dom';
import '../../Styles/PageTransition.css';

const PageTransition = ({ children }) => {
    const location = useLocation();

    return (
        <TransitionGroup>
            <CSSTransition
                key={location.key}
                classNames="fade"
                timeout={300}
            >
                <div className="page-transition">
                    {children}
                </div>
            </CSSTransition>
        </TransitionGroup>
    );
};

export default PageTransition;
