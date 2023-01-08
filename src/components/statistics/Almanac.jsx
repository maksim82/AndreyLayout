import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import './calendar.scss';

const Almanac = () => {
    const [date, setDate] = useState(new Date());

    const options = {
        year: 'numeric',
        month: 'long',
        weekday: 'long',
        day: 'numeric',
        timezone: 'UTC'
    };

    return (
        <div className='app'>
            <h1 className='text-center'>Рабочий календарь</h1>
            <div className='calendar-container'>
                <Calendar
                    onChange={setDate}
                    value={date}
                    selectRange={true}
                />
            </div>
            {date.length > 0 ? (
                    <p className='text-center'>
                        <span className='bold'>Начало:</span>{' '}
                        {date[0].toLocaleString("ru", options)}
                        &nbsp;|&nbsp;
                        <span className='bold'>Конец:</span> {date[1].toLocaleString("ru", options)}
                    </p>
                ) : (
                    <p className='text-center'>
                        <span className='bold'>Сегодня:</span>{' '}
                        {date.toLocaleString("ru", options)}
                    </p>
                )
            }
        </div>
    );
}

export default Almanac;