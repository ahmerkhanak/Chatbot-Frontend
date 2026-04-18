import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../css/LandingPage.css';

function LandingPage() {
    return (
        <div className="landing-wrap">
            {/* Header / Navbar */}
            <header className="landing-header">
                <div className="landing-logo">
                    Chat.X<span className="logo-accent">®</span>
                </div>
                <nav className="landing-nav">
                    <Link to="/login" className="nav-link">Log In</Link>
                    <Link to="/register" className="nav-btn">Get Started</Link>
                </nav>
            </header>

            {/* Hero Section */}
            <main className="hero-section">
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="hero-title">
                        The <span className="text-gradient">Cinematic</span> Chat Experience
                    </h1>
                    <p className="hero-subtitle">
                        Elevate your conversations with an AI assistant that feels alive.
                        Immersive, intelligent, and designed with a premium aesthetic.
                    </p>
                    <div className="hero-buttons">
                        <Link to="/register" className="btn-primary">Start Chatting Now</Link>
                        <a href="#features" className="btn-secondary">Explore Features</a>
                    </div>
                </motion.div>

                {/* Abstract Visual / Mockup */}
                <motion.div
                    className="hero-visual"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <div className="glass-mockup">
                        <div className="mockup-header">
                            <span className="dot bg-red"></span>
                            <span className="dot bg-yellow"></span>
                            <span className="dot bg-green"></span>
                        </div>
                        <div className="mockup-body">
                            <div className="mock-message bot">Hello! How can I assist you today?</div>
                            <div className="mock-message user">I need a highly complex algorithmic solution.</div>
                            <div className="mock-message bot typing">
                                <span>●</span><span>●</span><span>●</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>

            {/* Features Section */}
            <section id="features" className="features-section">
                <div className="feature-card">
                    <div className="feature-icon">⚡</div>
                    <h3>Lightning Fast</h3>
                    <p>Powered by the latest generative models, delivering answers in milliseconds.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">🔒</div>
                    <h3>Secure & Private</h3>
                    <p>Your chat histories are strongly isolated. Each session belongs uniquely to you.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">✨</div>
                    <h3>Stunning UI</h3>
                    <p>A beautifully crafted glassmorphic interface that reduces eye strain and looks incredible.</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <p>&copy; {new Date().getFullYear()} Chat.X AI Systems. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default LandingPage;
