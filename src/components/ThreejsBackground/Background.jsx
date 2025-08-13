import React from 'react';
import { useThreeScene } from '../../hooks/useThreeScene';

const ThreeBackground = ({ scrollableHeight }) => {
    const mountRef = useThreeScene(scrollableHeight);

    return (
        <div 
            ref={mountRef} 
            style={{ 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                zIndex: -1 
            }} 
        />
    );
};

export default React.memo(ThreeBackground);
