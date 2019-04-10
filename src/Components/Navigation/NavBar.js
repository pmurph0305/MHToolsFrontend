import logo from './mh_logo_white.png';
import NavButtonLi from '../NavButton/NavButtonLi';
import React from 'react';

const NavBar = (props) => {
    return(
        <div>
            <header className='bg-black w-100'>
                <nav className="f6 fw6 overflow-hidden"
                    role='navigation'
                    >
                    
                    <ul>
                        <li className='dib'>
                            <img 
                                className="v-mid h2 w2 pointer" 
                                alt='logo' 
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
                            liClass='fr'
                            onRouteChange={props.onRouteChange}
                            route='signin'
                        />
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default NavBar;