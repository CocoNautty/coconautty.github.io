import React from 'react';
import { useThreeScene } from '../../hooks/useThreeScene';

const ThreeBackground = ({ scrollableHeight }) => {
    const mountRef = useThreeScene(scrollableHeight);

    return (
        <div 
            ref={mountRef} 
            style={{ 
                position: 'fixed', 
                top: '-20%', 
                left: '-20%', 
                width: '140%', 
                height: '140%', 
                zIndex: -1 
            }} 
        />
    );
};

export default React.memo(ThreeBackground);
