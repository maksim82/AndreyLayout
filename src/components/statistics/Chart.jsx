import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { useEffect, useState } from 'react';

import EmployeeBoxSearch from './EmployeeBoxSearch';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
            legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Работник: Бархатов Андрей',
        },
    },
};

// const fakeData = {
//   name: "Бархатов Андрей",
//   date: []
//   hours: []
// }


const labels = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресение",
"Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресение",
"Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресение",
"Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресение",
"Понедельник", "Вторник", "Среда"];

export const data = {
    labels,
    datasets: [
        {
            label: 'работник 1',
            data: [15, 50, 20, 65, 5, 50, 100],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            tension: 0.4
        },
        {
            label: 'работник 2',
            data: [36, 9, 33, 18, 90, 5, 120],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            tension: 0.4
        },
    ],
};

const Chart = () => {
    const [date, setDate] = useState({
        body: {},
        countDay: 7
    });

    const [employee, setEmployee] = useState("");

    const getData = async (count) => {
        const res = await fetch('http://localhost:8080/getData');
        const body = await res.json();
        setDate({
            ...date,
            body
        });
    };

    const calculationDate = (count) => {

    };

    const compareEmployees = () => {

    };

    console.log(employee);

    useEffect(() => {
        getData();
    }, [date]);

    return (
        <>
            <div style={{width: '550px'}}>
                <Line options={options} data={data} height='250' />
            </div>
            {/* <div>
                <button onClick={() => calculationDate(7)}>Неделя</button>
                <button onClick={() => calculationDate(30)}>Месяц</button>
                <button onClick={() => calculationDate(365)}>Год</button>
                <EmployeeBoxSearch setEmployee={setEmployee} employee={employee} />
                <button onClick={() => compareEmployees()}>Сравнить</button>
            </div> */}
        </>
    )
}

export default Chart;