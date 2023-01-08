import { useEffect, useState } from 'react';

import TimeModal from './TimeModal';
import Modal from './Modal';

import styles from './accounting.module.scss'; 

const date = new Date();
const arrMonthName = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 
    'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
const dateNow = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

const getStartMonth = () => {
    return date.getMonth();
};

const getStartYear = () => {
    return date.getFullYear();
};

const Accounting = () => {
    const [viewModal, setViewModal] = useState({
        type: "",
        checkModal: false,
        num: 0
    });
    
    const [step, setStep] = useState(0);
    const [finishStep, setFinishStep] = useState(false);
    const limit = 7;
    const [stepMonth, setStepMonth] = useState(getStartMonth);
    const [stepYear, setStepYear] = useState(getStartYear);
    const [visibleAllTable, setVisibleAllTable] = useState(false);
    const [employee, setEmployee] = useState([
        {FIO: "dsdsd", date: dateNow},
        {FIO: "dsdsd", date: dateNow},
        {FIO: "dsdsd", date: dateNow},
        {FIO: "dsdsd", date: dateNow},
        {FIO: "dsdsd", date: dateNow},
        {FIO: "dsdsd", date: dateNow},
        {FIO: "dsdsd", date: dateNow},
        {FIO: "dsdsd", date: dateNow},
        {FIO: "dsdsd", date: dateNow}
    ]);
    const [checkAdd, setCheckAdd] = useState("Внести");



    const [radioObj, setRadioObj] = useState({
        hob: "",
        ach: ""
    });

    const [employeeAll, setEmployeeAll] = useState([]);

    const getWorksHours = async () => {
        // const res = await fetch("http://localhost:8080/hours"); // массив сотрудников с числом часов в месяц
        // const answer = await res.json();
        const answer = [
           {FIO: "Maksim asas", hours: 160},
           {FIO: "Andrey asas", hours: 190},
           {FIO: "qewsdf asas", hours: 120},
           {FIO: "Ivan Ivanov Invas", hours: 210},
           {FIO: "Mews #ew", hours: 181},
           {FIO: "ew13qd A12", hours: 158},
           {FIO: "Danik Daew", hours: 145},
           {FIO: "Evgengo Iylev", hours: 167}
        ];
        const newEmployeeArr = answer.map(({FIO, hours}) => ({
            FIO,
            hours,
            salary: "",
            badHabits: false,
            achievements: false
        }));

        setEmployeeAll(newEmployeeArr);
    };

    useEffect(() => {
        getWorkers();
        getWorksHours();
    }, []);

    const checkAddHours = async () => {
        const res = await fetch(`http://localhost:8080/getHours/${dateNow}`);
        const answer = await res.json();
        console.log(answer);
    };

    useEffect(() => {
        checkAddHours();
    }, [checkAdd]);

    const getWorkers = async () => {
        const res = await fetch("http://localhost:8080/workers");
        const answer = await res.json();
        const employeeArr = answer.map(({Name, surName}) => ({
            FIO: `${Name} ${surName}`,
            hours: "",
            date: dateNow,
            vacation: null, 
            medical: null
        }));
        setEmployee(employeeArr);
    };
    
    const addWorkInfo = async () => {
        const newArr = employee.map(({FIO, date, hours, medical, vacation}) => ({
            FIO,
            date,
            hours,
            vacation_begin: vacation?.dateStart,
            vacation_end: vacation?.dateEnd,
            medical_begin: medical?.dateStart,
            medical_end: medical?.dateEnd
        }));
        
        const res = await fetch("http://localhost:8080/hours/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newArr)
        });

        const answer = await res.json();
        setCheckAdd(answer);
    };

    const handleValue = (e, num) => {
        setEmployee(arrEmployee => [
                ...arrEmployee.slice(0, num),
                arrEmployee[num] = {
                    ...arrEmployee[num],
                    hours: e.target.value
                },
                ...arrEmployee.slice(num + 1)
            ]
        );
    };

    const handleVacation = (date, num) => {
        setEmployee(arrEmployee => [
                ...arrEmployee.slice(0, num),
                arrEmployee[num] = {
                    ...arrEmployee[num],
                    vacation: date
                },
                ...arrEmployee.slice(num + 1)
            ]
        );
    };

    const handleMedical = (date, num) => {
        setEmployee(arrEmployee => [
                ...arrEmployee.slice(0, num),
                arrEmployee[num] = {
                    ...arrEmployee[num],
                    medical: date
                },
                ...arrEmployee.slice(num + 1)
            ]
        );
    };

    const handleModal = (type, num) => {
        if (type) {
            setViewModal(() => ({
                type,
                checkModal: true,
                num
            }));
        } else {
            setViewModal(() => ({
                checkModal: false
            }));
        }
    };

    const changeStep = (num) => {
        if (finishStep && num < 0) {
            setFinishStep(false);
        }
        setStep(step => step + num);
    };

    const newArrEmployee = employee.map((item, i) => (
        <div key={i} className={styles.colTable}>
            <div>{item.FIO}</div>
            <div>
                <input type="text" value={item.hours} onChange={e => handleValue(e, i)} />
            </div>
            <div>{item.date}</div>
            <div onClick={() => handleModal("medical", i)} className={styles.openModal}>
                {
                item.medical 
                    ?
                <div className={styles.wrapperDate}>
                    <div className={styles.startWeek}>{`с: ${item.medical.dateStart}`}</div>
                    <div className={styles.endWeek}>{`по: ${item.medical.dateEnd}`}</div>
                </div>
                    :
                "Нет"
                }
            </div>
            <div onClick={() => handleModal("vacation", i)} className={styles.openModal}>
                {
                item.vacation 
                    ?
                <div className={styles.wrapperDate}>
                    <div className={styles.startWeek}>с: {item.vacation.dateStart}</div>
                    <div className={styles.endWeek}>по: {item.vacation.dateEnd}</div>
                </div>
                    :
                "Нет"
                }
            </div>
        </div>
    ));

    const cycleDOM = (word) => {
        const visibleArrEmployee = [];
        const startNum = step === 0 ? 0 : step * limit;
        for (let i = startNum; i < startNum + limit; i++) {
            if (newArrEmployee[i]) {
                visibleArrEmployee[i] = newArrEmployee[i];
            }; 
        }

        if (visibleArrEmployee.length - step * limit < 7 && !word) {
            setFinishStep(true);
        }

        return visibleArrEmployee;
    }

    const handleMonth = (month) => {
        if (stepMonth + month === 12) {
            setStepMonth(0);
            setStepYear(lastYear => lastYear + 1);
        } else if (stepMonth + month === -1) {
            setStepMonth(11)
            setStepYear(lastYear => lastYear - 1);
        } else {
            setStepMonth(stepMonth => stepMonth + month)
        }

        getWorksHours();
    };

    const handleRadio = e => {
        setRadioObj(previewObj => ({
            ...previewObj,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div>
            <div className={styles.hoursTable}>
                <div className={styles.colTable}>
                    <div>Ф.И.О.</div>
                    <div>Часы</div>
                    <div>Дата</div>
                    <div>Больничный</div>
                    <div>Отпускные</div>
                </div>               
                {finishStep ? cycleDOM("finish") : cycleDOM()}
            </div>
            <div className={styles.stepChange}>
                {step ? <div onClick={() => changeStep(-1)}>Предыдущая</div> : <div></div>} 
                {finishStep ? <div></div> : <div onClick={() => changeStep(1)}>Следующая</div>}
            </div>
            <div className={styles.wrapperBtn}>
                <button className={styles.visibleBtn} onClick={() => setVisibleAllTable(true)}>Расчет з/п</button>
                <button className={styles.salaryBtn} onClick={() => addWorkInfo()}>{checkAdd}</button>
            </div>
            {
            visibleAllTable 
                ?
            <div>
                <div className={styles.changeMonth}>
                    Месяц
                    <div className={styles.arrowMonth} onClick={() => handleMonth(-1)}>{"<"}</div>
                    <div>{arrMonthName[stepMonth]} {stepYear}</div>
                    <div className={styles.arrowMonth} onClick={() => handleMonth(1)}>{">"}</div>
                </div>
                <div className={styles.tableSalaryAll}>К выдаче <span></span></div>
                <div className={styles.hoursTable}>
                    <div className={styles.generateTable}>
                        <div>Ф.И.О.</div>
                        <div>Часы</div>
                        <div>Оклад</div>
                        <div>Вредные привычки</div>
                        <div>Достижения</div>
                        <div>Без доп</div>
                        <div>С доп</div>
                        <div>ЛК</div>
                    </div>  
                    {employeeAll.map((item, i) => (
                        <div key={i} className={styles.generateTable}>
                            <div>{item.FIO}</div>
                            <div>{item.hours}</div>
                            <div>
                                <input type="text" />
                            </div>
                            {/* <div>
                                <input type="radio" id={`contactHob${i}`} name={`hob${i}`} />
                                <label for="contactHob1">Да</label>
                                <input type="radio" id={`contactHob${i + 1}`} name={`hob${i}`} />
                                <label for="contactHob2">Нет</label>
                            </div>
                            <div>
                                <input type="radio" id={`contactAch${i}`} name={`ach${i}`} />
                                <label for="contactAch1">Да</label>
                                <input type="radio" id={`contactAch${i + 1}`} name={`ach${i}`} />
                                <label for="contactAch2">Нет</label>
                            </div> */}
                            <div>
                                <label htmlFor="">Да</label>
                                <input type="radio" name="hob" value={radioObj.hob} onClick={handleRadio} />
                                <label htmlFor="">Нет</label>
                                <input type="radio" name="hob" value={radioObj.hob} onClick={handleRadio} />
                            </div>
                            <div>
                                <label htmlFor="">Да</label>
                                <input type="radio" name="ach" value={radioObj.hob} onClick={handleRadio} />
                                <label htmlFor="">Нет</label>
                                <input type="radio" name="ach" value={radioObj.hob} onClick={handleRadio} />
                            </div>
                            <div>20004</div>
                            <div>120000</div>
                            <div>Профиль</div>
                        </div>
                    ))}
                </div>
            </div>
                :
            null
            }
            {
            viewModal.checkModal
                ? 
            <Modal>
                <TimeModal handleModal={handleModal} handleMedical={handleMedical} 
                    type={viewModal.type} handleVacation={handleVacation} num={viewModal.num} />
            </Modal>
                :
            null
            }
        </div>
    )
};

export default Accounting;