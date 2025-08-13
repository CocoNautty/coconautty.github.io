import React from 'react';
import { useThreeScene } from '../../hooks/useThreeScene';

const ThreeBackground = ({ scrollableHeight }) => {
    const mountRef = useThreeScene(scrollableHeight);

    return (
        <div 
            ref={mountRef} 
            style={{ 
                position: 'fixed', 
                top: '-10%', 
                left: '-10%', 
                width: '120%', 
                height: '120%', 
                zIndex: -1 
            }} 
        />
    );
};

export default React.memo(ThreeBackground);
