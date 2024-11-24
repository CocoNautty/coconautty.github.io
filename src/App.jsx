import React, { useRef, useEffect, useState }  from 'react';
import Header from './components/Header/Header';
import About from './components/About/About';
import ThreeBackground from './components/ThreejsBackground/Background';

function App() {
    const scrollableRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    useEffect(() => {
        if (scrollableRef.current) {
            const { width, height } = scrollableRef.current.getBoundingClientRect();
            setDimensions({ width, height });
        }
    }, []);

    console.log(dimensions);

    return (
        <div>
            <div className="App">
                <a className="skip" href="#content">Skip to Content</a>
                <div className="wrapper">
                    <Header />
                    <main id='content' className='MainContent' ref={scrollableRef}>
                        <About />
                    </main>
                </div>
            </div>
            <ThreeBackground scrollableheight={dimensions.height}/>
        </div>
    );
}

export default App;
