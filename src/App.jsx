import React from 'react';
import Header from './components/Header/Header';
import About from './components/About/About';

function App() {
    return (
        <div className="App">
            <Header />
            <main id='content' className='MainContent'>
                <About />
            </main>
        </div>
    );
}

export default App;
