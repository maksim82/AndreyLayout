import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";  

import styles from './modalAccounting.module.scss';

const TimeModal = ({handleModal, type, handleVacation, handleMedical, num}) => {
    const [date, setDate] = useState({
        dateStart: "",
        dateEnd: ""
    });

    const handleDate = (e, type) => {
        setDate(previewDate => ({
            ...previewDate,
            [type]: e.target.value
        }))
    }

    const handleTypeDate = () => {
        type === "medical" ? handleMedical(date, num) : handleVacation(date, num);
    }

    const { dateStart, dateEnd } = date;
    return (
        <div className={styles.modal}>
            <h2>Введите дату начала и конца {type === "medical" ? "больничного" : "отпуска"}</h2>
            <div className={styles.xmarkWrapper}>
                <FontAwesomeIcon className={styles.xmark} onClick={() => handleModal("")} icon={faXmark} color="#ff2400" />
            </div>
            <input type="date" onChange={e => handleDate(e, "dateStart")} value={dateStart} />
            <input type="date" onChange={e => handleDate(e, "dateEnd")} value={dateEnd} />
            <button onClick={handleTypeDate}>Занести</button>
        </div> 
    )
}

export default TimeModal;