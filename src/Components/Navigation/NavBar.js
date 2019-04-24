import logo from './mh_logo_white.png';
import NavButtonLi from '../NavButton/NavButtonLi';
import React from 'react';

import './NavBar.scss';

const NavBar = (props) => {
    return(
        <header className='navHeader'>
            <nav className="navClass"
                role='navigation'
                >
                <ul>
                    <li>
                        <img 
                            className="" 
                            alt='home' 
                            src={logo}
                            onClick={() => props.onRouteChange('home')}
                        />
                    </li>
                    <NavButtonLi
                        buttonLabel="Daily Maintenance"
                        onRouteChange={props.onRouteChange}
                        route='dm'
                    />
                    <NavButtonLi
                        buttonLabel="PHQ-9"
                        onRouteChange={props.onRouteChange}
                        route='phq9'
                    />
                    <NavButtonLi
                        buttonLabel="CBT"
                        onRouteChange={props.onRouteChange}
                        route='cbt'
                    />
                    <NavButtonLi
                        buttonLabel="Coping Skills"
                        onRouteChange={props.onRouteChange}
                        route='coping'
                    />
                    <NavButtonLi
                        buttonLabel="History"
                        onRouteChange={props.onRouteChange}
                        route='hist'
                    />
                    <NavButtonLi
                        buttonLabel="Sign in"
                        onRouteChange={props.onRouteChange}
                        route='signin'
                    />
                </ul>
            </nav>
        </header>
    )
}

export default NavBar;