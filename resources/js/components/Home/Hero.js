import React from 'react'

function Hero() {
    return (
        <div className="hero ">
            <nav className='container pt-4'>
                <img className='logo' src="/images/logo.png" alt="logo" />
            </nav>
            <div className="jumbotron container">
                <div className="row">
                    <div className="col-md-6">
                        <h1 className="display-4">Reading is Sowing,<br /> Rereading is Harvest.</h1>
                        <p className="lead"></p>
                        <p> - Johny Uzan</p>

                    </div>
                    <div className="col-md-6 d-flex justify-content-center">
                        <div className="hero-images">
                            <img src="/images/laravel.png" alt="book1" />
                            <img src="/images/php8.jpg" alt="book1" />
                            <img src="/images/react.png" alt="book1" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero