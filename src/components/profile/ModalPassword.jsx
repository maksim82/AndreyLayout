import { useState } from 'react';

import ModalInputs from './ModalInputs';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";  

import styles from './profile.module.scss';

const ModalPassword = ({close}) => {
    const [value, setValue] = useState({
        oldPassword: "",
        newPassword: "",
        repeatNewPassword: ""
    });

    const [disabled, setDisabled] = useState(true);
    const [answerBtn, setAnswerBtn] = useState("");

    const [err, setErr] = useState({
        oldPasswordErr: "",
        newPasswordErr: "",
        repeatNewPasswordErr: ""
    });

    const checkBlur = (e, placeholder) => {
        let answer = "";

        if (!e.target.value) {
            answer = `Поле ${placeholder} пустое`;
        }

        const variable = `${e.target.name}Err`;
        setErr(err => ({
            ...err,
            [variable]: answer
        }));
    };

    const { oldPassword, newPassword, repeatNewPassword } = value;

    const handleValue = async e => {
        setValue(value => ({
            ...value,
            [e.target.name]: e.target.value
        }));

        if (e.target.name === "oldPassword" && e.target.value.length !== 0) {
            setDisabled(false);
        }
    };

    const updatePass = async () => {
        if (newPassword !== repeatNewPassword) {
            setErr(err => ({
                ...err,
                repeatNewPasswordErr: "Пароли не совпадают"
            }));
        } else {
            const res = await fetch(`http://localhost:8080/profile/password/${localStorage.getItem("user")}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({password: newPassword})
            });

            if (res.ok) {
                const answer = await res.json();
                setAnswerBtn(answer);
            } else {
                setErr(err => ({
                    ...err,
                    oldPassword: "Старый пароль неверен"
                }));
            }
        }
    };

    const data = [
        { type: "password", name: "oldPassword", value: oldPassword, placeholder: "Старый пароль" },
        { type: "password", name: "newPassword", value: newPassword, placeholder: "Новый пароль" },
        { type: "password", name: "repeatNewPassword", value: repeatNewPassword, placeholder: "Повторите новый пароль" }
    ];

    return (
        <div className={styles.modal}>
            <div className={styles.xmarkWrapper}>
                <FontAwesomeIcon className={styles.xmark} onClick={() => close("")} icon={faXmark} color="#ff2400" />
            </div>
            <div className={styles.modalInput}>
                <ModalInputs data={data} err={err} handleValue={handleValue} checkBlur={checkBlur} disabled={disabled} />
                <button onClick={updatePass}>{answerBtn ? answerBtn : "Изменить пароль"}</button>
            </div>
        </div>
    )
}

export default ModalPassword