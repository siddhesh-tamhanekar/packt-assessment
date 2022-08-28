import React from 'react'
import Books from './Home/Books'
import Hero from './Home/Hero'
import Modal from './Home/Modal'

function App() {
    return (
        <div>
            <Hero />
            <div className="container">
                <Books />
            </div>
            <Modal />
        </div>
    );
}

export default App;

