import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle }       from 'react-icons/fa';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { SiNaver }        from 'react-icons/si';
import Header from "../components/Header1";
import './LoginPage.css';

import mailIcon   from '../assets/mail.png';
import PWIcon     from '../assets/password.png';
import EyeIcon    from '../assets/eye.png';
import EyeoffIcon from '../assets/eyeoff.png';


export default function LogInPage() {

    const [showPassword, setShowPassword] = useState(false);

    /* 소셜 로그인 */
    const GoogleLogin = () => {
        // 우리 백엔드 구글 시작 url
        window.location.href = 'https://우리백엔드.com/auth/google'
    }
    const NaverLogin = () => {
        // 우리 백엔드 네이버버 시작 url
        window.location.href = 'https://우리백엔드.com/auth/naver'
    }
    const KakaoLogin = () => {
        // 우리 백엔드 카카오 시작 url
        window.location.href = 'https://우리백엔드.com/auth/kakao'
    }

    return (
        <div>
            <div className="Login">
                <Header />
                <div className="Login_form">
                    <div className="form__header">
                        계정이 없으신가요? 
                        {/* <Link to="/signup">Signup</Link> */}
                    </div>
            
                    <h2 className="form__title">로그인</h2>
                    <p className="form__subtitle">이메일과 비밀번호를 입력하세요</p>
            
                    {/* Email */}
                    <label className="form__label email-input-wrapper">
                        Email
                        <input
                          type="email"
                          placeholder="이메일을 입력하세요"
                          className="form__input"
                        />
                        <img src={mailIcon} alt="mail" className="email-input-icon" />
                    </label>
            
                      {/* Password */}
                    <label className="form__label password-input-wrapper">
                        Password
                        <div className="form__password-wrapper">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="비밀번호를 입력하세요"
                            className="form__input"
                          />
                          <img src={PWIcon} alt="lock" className="password-input-icon" />
                          <button
                            type="button"
                            className="form__toggle"
                            onClick={() => setShowPassword((p) => !p)}
                          >
                            <img
                              src={showPassword ? EyeoffIcon : EyeIcon}
                              alt={showPassword ? '숨기기' : '보이기'}
                              className="password-toggle-icon"
                            />
                          </button>
                        </div>
                    </label>
            
                    <div className="form__options">
                        <label>
                          <input type="checkbox" />
                          <span>내 정보 기억하기</span>
                        </label>
                        <a href="/forgot">비밀번호 찾기</a>
                    </div>

                    <Link to='/reservation'>
                      <button className="form__submit">Login</button>
                    </Link>

                    <div className="form__divider">
                        <span>or continue with</span>
                    </div>
            
                    <div className="form__socials">
                        <button
                          type="button"
                          onClick={GoogleLogin} // 클릭 시 네이버 로그인 팝업
                          className="social-btn social-btn--google"
                          aria-label="Google login"
                        >
                        <FaGoogle size={27} />
                        </button>
                        <button
                          type="button"
                          onClick={NaverLogin} // 클릭 시 구글 로그인 팝업
                          className="social-btn social-btn--naver"
                          aria-label="Naver login"
                        >
                        <SiNaver size={24} />
                        </button>
                        <button
                          type="button"
                          onClick={KakaoLogin} // 클릭 시 카카오 로그인 팝업
                          className="social-btn social-btn--kakao"
                          aria-label="Kakao login"
                        >
                        <RiKakaoTalkFill size={32} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}