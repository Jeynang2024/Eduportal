import React from 'react';
import toast from 'react-hot-toast';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <header>
                <h1>Welcome to Our Application</h1>
                <p>Your journey starts here.</p>
            </header>
            <main>
                <button onClick={() => toast.success("STARTED")}>Get Started</button>
            </main>
        </div>
    );
};

export default LandingPage;