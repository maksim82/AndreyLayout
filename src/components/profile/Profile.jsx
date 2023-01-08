import { useEffect, useState } from 'react';

import ModalPassword from './ModalPassword';
import ModalPersonal from './ModalPersonal';
import Modal from './Modal';

import styles from './profile.module.scss';

import avatar from '../../utils/avatar.png';

const Profile = () => {
    const [handleType, setHandleType] = useState("");
    const [data, setData] = useState({
        salary: "",
        employment: "",
        specialization: "",
        badhabits: "",
        achievement: "",
        email: "",
        Name: "",
        patronymic: "",
        surName: "",
        married: "",
        Birthday: "",
        Education: "",
        Address: "",
        Phone: "",
        password: ""
    });

    const getInfo = async () => {
        const urls = [
            `http://localhost:8080/user/${localStorage.getItem("user")}`,
            `http://localhost:8080/profile/${localStorage.getItem("user")}`,
            `http://localhost:8080/profile/work/${localStorage.getItem("user")}`
        ];

        const requestArr = urls.map(request => fetch(request));

        const validationBody = (body) => {
            setData(data => ({
                ...data,
                ...body
            }));
        };

        await Promise.all(requestArr)
            .then(responses => responses.forEach(res => res.json()
            .then(body => validationBody(body))));
    };

    useEffect(() => {
        getInfo();
    }, []);

    const handleModal = type => {
        setHandleType(type);
    };

    const { salary, employment, specialization, Birthday, surName,
        badhabits, achievement, Education, patronymic,
        email, Name, married, Address, Phone } = data;

    return (
        <div className={styles.wrapper_profile}>
            <h2>Привет {Name}</h2> 
            <div className={styles.content_data}>
                <div className={styles.personal_data}>
                    <div className={styles.data}>
                        <h3>Личные данные</h3>
                            <div className={styles.info_block}>
                                <span>Имя, фамилия и отчество(если присутствует)</span>
                                <div>{`${Name} ${surName} ${patronymic}`.trim() || "Неизвестно"}</div>
                            </div>
                            <div className={styles.info_block}>
                                <span>Дата рождения</span>
                                <div>{Birthday || "Неизвестно"}</div>
                            </div>
                            <div className={styles.info_block}>
                                <span>Семейное положение</span>
                                <div>{married || "Неизвестно"}</div>
                            </div>
                            <div className={styles.info_block}>
                                <span>Образование</span>
                                <div>{Education || "Неизвестно"}</div>
                            </div>
                            <div className={styles.info_block}>
                                <span>Адрес</span>
                                <div>{Address || "Неизвестно"}</div>
                            </div>
                        <div className={styles.btn_wrapper}>
                            <button onClick={() => handleModal("personal")}>Редактировать данные</button>
                            <button onClick={() => handleModal("password")}>Сменить пароль</button>
                        </div>
                    </div>
                    <div className={styles.wrapper_img}>
                        <img src={avatar} alt="Аватар" />
                    </div>
                </div>
                <div className={styles.work_data}>
                    <div className={styles.contact}>
                        <h3>Контактные данные</h3>
                            <div className={styles.info_block}>
                                <span>Номер телефона</span>
                                <div>{Phone || "Неизвестно"}</div>
                            </div>
                            <div className={styles.info_block}>
                                <span>Почта</span>
                                <div>{email || "Неизвестно"}</div>
                            </div>
                    </div>
                    <div className={styles.work}>
                        <h3>Рабочие данные</h3>
                            <div className={styles.info_block}>
                                <span>Оклад</span>
                                <div>{salary + "р/ч" || "Неизвестно"}</div>
                            </div>
                            <div className={styles.info_block}>
                                <span>Трудоустройство</span>
                                <div>{employment || "Неизвестно"}</div>
                            </div>
                            <div className={styles.info_block}>
                                <span>Специализация</span>
                                <div>{specialization || "Неизвестно"}</div>
                            </div>
                            <div className={styles.info_block}>
                                <span>Вредные привычки</span>
                                <div>{badhabits ? "Присутствуют" : "Отсутствуют"}</div>
                            </div>
                            <div className={styles.info_block}>
                                <span>Достижения</span>
                                <div>{achievement ? "Присутствуют" : "Отсутствуют"}</div>
                            </div>
                    </div>
                </div>
            </div>
            <Modal>
                {handleType === "personal" ? <ModalPersonal close={handleModal} /> : null }
                {handleType === "password" ? <ModalPassword close={handleModal} /> : null }
            </Modal>
        </div>
    )
}

export default Profile;