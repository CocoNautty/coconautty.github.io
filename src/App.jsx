import React from 'react';
import Header from './components/Header/Header';
import About from './components/About/About';

function App() {
    return (
        <div className="App">
            <a class="skip" href="#content">Skip to Content</a>
            <div className="wrapper">
                <Header />
                <main id='content' className='MainContent'>
                    <About />
                </main>
            </div>
        </div>
    );
}

export default App;
