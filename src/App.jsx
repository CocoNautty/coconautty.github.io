import React from 'react';
import Header from './components/Header/Header';
import About from './components/About/About';
import ThreeBackground from './components/ThreejsBackground/Background';

function App() {
    return (
        <div>
            <ThreeBackground />
            <div className="App">
                <a class="skip" href="#content">Skip to Content</a>
                <div className="wrapper">
                    <Header />
                    <main id='content' className='MainContent'>
                        <About />
                    </main>
                </div>
            </div>
        </div>
    );
}

export default App;
