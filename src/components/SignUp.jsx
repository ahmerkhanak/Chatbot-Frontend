import { useState } from 'react';
import '../css/Auth.css'

function SignUp() {

    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const usernameRegex = /^[a-zA-Z0-9_ ]+$/;
        if (!usernameRegex.test(formData.username)) {
            return setError('Username can only contain letters, numbers, and spaces.');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            return setError('Please enter a valid email address.');
        }

        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            return setError('Password must be at least 8 chars, contain an uppercase, lowercase, and a number.');
        }

        try {

            const response = await fetch('https://chatbot-backend-snowy-one.vercel.app/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Account Created Successfully!!');
                window.location.href = '/login';
            } else {
                setError(data.message || 'Account Creation Failed');
                console.error('Account Creation Failed');
            }


        } catch (err) {
            console.error(err, 'Failed');
        }

    }

    return (
        <div className="auth-container">
            <div className="auth-header">
                <h2>Join the Experience</h2>
                <p>Create your cinematic identity to start chatting.</p>
            </div>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                </div>

                <button type="submit" className="auth-btn">Create Account</button>
            </form>

            <div className="auth-footer">
                Already have an account? <a href="/login" className="auth-link">Sign In</a>
            </div>
        </div>
    );

};

export default SignUp;