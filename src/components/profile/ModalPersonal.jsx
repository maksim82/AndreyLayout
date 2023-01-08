import { useState } from 'react';

import ModalInputs from './ModalInputs';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";  

import styles from './profile.module.scss';

const ModalPersonal = ({close}) => {
    const [value, setValue] = useState({
        name: "",
        Birthday: "",
        married: "",
        Education: "",
        Address: "",
        Phone: "",
        email: ""
    });

    const handleValue = e => {
        setValue(value => ({
            ...value,
            [e.target.name]: e.target.value
        }));
    }

    const [answerBtn, setAnswerBtn] = useState("");

    const [err, setErr] = useState({
        nameErr: "",
        BirthdayErr: "",
        marriedErr: "",
        EducationErr: "",
        AddressErr: "",
        PhoneErr: "",
        emailErr: "",
        fetchErr: ""
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

    const updateInfo = async () => {
        const FIO = value.name.split(" ");
        const checkValue = Object.fromEntries(Object.entries(value).filter(item => item[1].length !== 0));

        if (value.name.trim().length !== 0) {
            checkValue.Name = FIO[0];
            checkValue.surName = FIO[1];
            checkValue.patronymic = FIO[2];
        }

        const res = await fetch(`http://localhost:8080/edit/${localStorage.getItem("user")}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(checkValue)
        });

        if (res.ok) {
            const answer = await res.json();
            setAnswerBtn(answer);
        } else {
            setErr(err => ({
                ...err,
                fetchErr: "Неопознаная ошибка"
            }));
        }
    };

    const { name, Birthday, married, Education, Address, Phone, email } = value;

    const data = [
        { type: "text", name: "name", value: name, placeholder: "ФИО" },
        { type: "date", name: "Birthday", value: Birthday },
        { type: "text", name: "married", value: married, placeholder: "Женат / замужем", },
        { type: "text", name: "Education", value: Education, placeholder: "Образование", },
        { type: "text", name: "Address", value: Address, placeholder: "Адресс", },
        { type: "text", name: "Phone", value: Phone, placeholder: "Номер телефона", },
    ];

    return (
        <div className={styles.modal}>
            <div className={styles.xmarkWrapper}>
                <FontAwesomeIcon className={styles.xmark} onClick={() => close("")} icon={faXmark} color="#ff2400" />
            </div>
            <div className={styles.modalInput}>
                <ModalInputs err={err} checkBlur={checkBlur} data={data} handleValue={handleValue} />
                <button onClick={updateInfo}>{answerBtn ? answerBtn : "Редактировать"}</button>
                <div className={styles.errInput}>{err.fetchErr}</div>
            </div>
        </div>
    )
}

export default ModalPersonal;