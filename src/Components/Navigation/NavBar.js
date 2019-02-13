import logo from './mh_logo_white.png';
import NavButton from '../NavButton/NavButton';
import React from 'react';

const NavBar = (props) => {
    return(
        <div>
            <header className='bg-black w-100 pv0-ns'>
                <nav className="f6 fw6 ttu tracked">
                    <img 
                        className="v-mid dib h2 w2 pointer" 
                        alt='logo' 
                        src={logo}
                        onClick={() => props.onRouteChange('home')}
                    />
                    <NavButton
                        buttonLabel="Daily Maintenance"
                        onRouteChange={props.onRouteChange}
                        route='dm'
                    />
                    <NavButton
                        buttonLabel="PHQ-9"
                        onRouteChange={props.onRouteChange}
                        route='phq9'
                        
                    />
                    <NavButton
                        buttonLabel="CBT"
                        onRouteChange={props.onRouteChange}
                        route='cbt'
                    />
                    <NavButton
                        buttonLabel="Coping Skills"
                        onRouteChange={props.onRouteChange}
                        route='coping'
                    />
                    <NavButton
                        buttonLabel="History"
                        onRouteChange={props.onRouteChange}
                        route='hist'
                    />
                </nav>
            </header>
        </div>
    )
}

export default NavBar;