import React, { useRef, useEffect, useState }  from 'react';
import Header from './components/Header/Header';
import About from './components/About/About';
import Experience from './components/Experience/Experience';
import ThreeBackground from './components/ThreejsBackground/Background';
import Projects from './components/Projects/Projects';

function App() {
    const scrollableRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 500, height: 2000 });
    useEffect(() => {
        if (scrollableRef.current) {
            const { width, height } = scrollableRef.current.getBoundingClientRect();
            setDimensions({ width, height });
        }
    }, []);


    return (
        <div>
            <div className="background">
                <ThreeBackground scrollableHeight={dimensions.height}/>
            </div>
            <div className="overlay"></div>
            <div className="App">
                <a className="skip" href="#content">Skip to Content</a>
                <div className="wrapper">
                    <Header />
                    <main id='content' className='MainContent' ref={scrollableRef}>
                        <About />
                        <Experience />
                        <Projects />
                    </main>
                </div>
            </div>
        </div>
    );
}

export default App;
