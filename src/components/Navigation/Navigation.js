import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if(isSignedIn) {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end'}} >
                <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange('signin')}>Déconnexion</p>
            </nav>
        );
    } else {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end'}} >
                <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange('signin')}>Se Connecter</p>
                <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange('register')}>S'inscrire</p>
            </nav>
        );
    }
        
};

export default Navigation;