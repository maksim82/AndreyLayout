import { useState, useRef } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './autherization.module.scss';

import { visiblePasswordFunc } from '../../services/visiblePasswordFunc.js';

const Login = () => {
    const navigate = useNavigate();

    const visiblePassword = useRef(null);
    const [icon, setIcon] = useState(faEye);

    const [remember, setRemember] = useState(false);
    const [value, setValue] = useState({
        login: "",
        password: ""
    });
    const [error, setError] = useState({
        loginErr: "", 
        passwordErr: "",
        fetchErr: ""
    });

    const sendForm = async () => {
        const res = await fetch('http://localhost:8080/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(value)
        });

        if (res.ok) {
            const body = await res.json();
            setError(err => ({
                ...err,
                fetchErr: ""
            }));

            if (remember) {
                localStorage.setItem('accessToken', body.accessToken);
                localStorage.setItem('user', body.id);
                document.cookie = `refreshToken=${body.refreshToken}`;
            }
            navigate('/');
        } else {
            setError(err => ({
                ...err,
                fetchErr: "Такого пользователя не существует"
            }));
        }
    };

    const handleValue = e => {
        setValue(value => ({
            ...value,
            [e.target.name]: e.target.value
        }))
    };

    const checkRemember = () => {
        setRemember(remember => !remember);
    };

    const checkBlur = e => {
        const variable = `${e.target.name}Err`;
        let message = "";

        if (!e.target.value) {
            message = `Заполните поле ${e.target.placeholder}`;
        }

        setError(error => ({
            ...error,
            [variable]: message
        }));
    };

    const handleVisible = () => {
        const typeVisiblePassword = visiblePasswordFunc(visiblePassword);
        setIcon(typeVisiblePassword);
    };

    const { login, password } = value;
    const { loginErr, passwordErr, fetchErr } = error;

    return (
        <section>
            <div className={styles.color}></div>
            <div className={styles.color}></div>
            <div className={styles.color}></div>
            <div className={styles.box}>
                <div className={styles.square} style={{"--count": 0}}></div>
                <div className={styles.square} style={{"--count": 1}}></div>
                <div className={styles.square} style={{"--count": 2}}></div>
                <div className={styles.square} style={{"--count": 3}}></div>
                <div className={styles.square} style={{"--count": 4}}></div>
                <div className={styles.container}>
                    <div className={styles.form}>
                        <h2>Авторизация</h2>
                        <form>
                            <div className={styles.inputBox}>
                                <input type="text" placeholder="Логин" onBlur={checkBlur} value={login} onChange={handleValue} name="login" />
                                <div className={styles.error}>{loginErr || null}</div>
                            </div>
                            <div className={styles.inputBox}>
                                <input type="password" placeholder="Пароль" onBlur={checkBlur} value={password} onChange={handleValue} name="password" ref={visiblePassword} />
                                <FontAwesomeIcon icon={icon} className={styles.seePassword} onClick={handleVisible} />
                                <div className={styles.error}>{passwordErr || null}</div>
                            </div>
                            <label className={styles.remeber}>
                                <input type="checkbox" value={remember} onClick={checkRemember} /> Запомнить меня
                            </label>
                            <div className={styles.inputBox}>
                                <input type="button" value="Вход" onClick={sendForm} />
                                <div className={styles.fetchErr}>{fetchErr || null}</div>
                            </div>
                            <p className={styles.forget}>Нет аккаунта ? &nbsp;
                                <Link to="/registration">Зарегистрироваться</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;