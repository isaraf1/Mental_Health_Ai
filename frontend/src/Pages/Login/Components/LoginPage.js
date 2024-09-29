import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import '../Styles/login.styles.css';

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);

    const switchToSignup = () => {
        setIsLogin(false);
    };

    const switchToLogin = () => {
        setIsLogin(true);
    };

    return (
        <div className="login-page-flex">
            <div className="login-grid-wrapper">
                <div className="login-grid">
                    <div className="login-left">
                        <div className="login-left-flex">
                            <h2>Get Started</h2>
                            <hr style={{ maxWidth: '300px' }}></hr>
                            <p>Getting the help you need, made accessible</p>
                            {isLogin ? (
                                <>
                                    <span>Don't have an account? You can </span>
                                    <button onClick={switchToSignup} style={{ display: 'inline-block' }}>
                                        Sign up
                                    </button>
                                    <span> for free.</span>
                                </>
                            ) : (
                                <>
                                    <span>Already have an account? </span>
                                    <button onClick={switchToLogin} style={{ display: 'inline-block' }}>
                                        Login
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="black-divider"></div>

                    <div className="loginform">
                        <div className="login-flex">
                            <h2 style={{ marginBottom: '2rem' }}>{isLogin ? 'Login' : 'Sign Up'}</h2>
                            {isLogin ? (
                                <LoginForm switchToSignup={switchToSignup} />
                            ) : (
                                <SignupForm />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
