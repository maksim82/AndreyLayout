import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './autherization.module.scss';

import { visiblePasswordFunc } from '../../services/visiblePasswordFunc.js';

const Registration = () => {
    const navigate = useNavigate();

    const visiblePassword = useRef(null);
    const visibleRepeatPassword = useRef(null);

    const [icon, setIcon] = useState(faEye);
    const [value, setValue] = useState({
        login: "",
        email: "",
        password: "",
        repeatPassword: "",
        secretKey: "",
        role: "user"
    });

    const [errors, setErrors] = useState({
        loginErr: "",
        emailErr: "",
        passwordErr: "",
        repeatPasswordErr: "",
        secretKeyErr: "",
        fetchErr: ""
    });

    const handleValue = e => {
        setValue(value => ({
            ...value,
            [e.target.name]: e.target.value
        }));
    };

    const sendForm = async () => {
        if (secretKey === "Aspen_World" && password === repeatPassword) {
            const res = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(value)
            });

            if (res.ok) {
                navigate('/login');
            } else {
                setErrors(previewValue => ({
                    ...previewValue,
                    fetchErr: "Ошибка, не удалось зарегестрировать сотрудника"
                }));
            }
    

        } else if (secretKey !== "Aspen_World") {
            setErrors(previewValue => ({
                ...previewValue,
                secretKeyErr: "Секретное слово некорректно"
            }));
        } else if (password !== repeatPassword) {
            setErrors(previewValue => ({
                ...previewValue,
                repeatPasswordErr: "Пароли не совпадают"
            }));  
        }
    };

    const checkErr = e => {
        const errName = e.target.name + "Err";
        let message = "";
        if (!e.target.value) {
            message = `Заполните поле ${e.target.placeholder}`
        }
        setErrors(err => ({
            ...err,
            [errName]: message
        }));
    };

    const handleVisible = () => {
        const typeVisiblePassword = visiblePasswordFunc(visiblePassword, visibleRepeatPassword);
        setIcon(typeVisiblePassword);
    };

    const { login, email, password, repeatPassword, secretKey } = value;
    const { loginErr, emailErr, passwordErr, repeatPasswordErr, secretKeyErr, fetchErr } = errors;

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
                        <h2>Регистрация</h2>
                        <form>
                            <div className={styles.inputBox}>
                                <input type="text" placeholder="Логин" onBlur={checkErr} value={login} onChange={handleValue} name="login" />
                                <div className={styles.error}>{loginErr || null}</div>
                            </div>
                            <div className={styles.inputBox}>
                                <input type="email" placeholder="Email" onBlur={checkErr} value={email} onChange={handleValue} name="email" />
                                <div className={styles.error}>{emailErr || null}</div>
                            </div>
                            <div className={styles.inputBox}>
                                <input type="password" placeholder="Пароль" onBlur={checkErr} value={password} onChange={handleValue} name="password" ref={visiblePassword} />
                                <FontAwesomeIcon icon={icon} className={styles.seePasswordReg} onClick={handleVisible} />
                                <div className={styles.error}>{passwordErr || null}</div>
                            </div>
                            <div className={styles.inputBox}>
                                <input type="password" placeholder="Повторение пароля" onBlur={checkErr} value={repeatPassword} onChange={handleValue} name="repeatPassword" ref={visibleRepeatPassword} />
                                <FontAwesomeIcon icon={icon} className={styles.repeatSeePassword} onClick={handleVisible} />
                                <div className={styles.error}>{repeatPasswordErr || null}</div>
                            </div>
                            <div className={styles.inputBox}>
                                <input type="text" placeholder="Секретное слово" onBlur={checkErr} value={secretKey} onChange={handleValue} name="secretKey" />
                                <div className={styles.error}>{secretKeyErr || null}</div>
                            </div>
                            <div className={styles.inputBox}>
                                <input type="button" value="Регистрация" onClick={sendForm} />
                                <div className={styles.fetchErr}>{fetchErr || null}</div>
                            </div>
                            <p className={styles.forget}>
                                Уже есть аккаунт ? &nbsp;
                                <Link to="/login">Вход</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Registration;