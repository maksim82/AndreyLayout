import { useState } from 'react';

import Chart from './Chart';
import Almanac from './Almanac';

import styles from './statistics.module.scss';

const Statistics = () => {
    const [handleView, setHandleView] = useState(false);

    return (
        <div className={styles.wrapperStatistic}>
            <div className={styles.infoStatistic}>
                <h2>План</h2>
                <div className={styles.statisticLoad}>
                    <div></div>
                </div>
                <div className={styles.subTextLoad}>
                    <span className={styles.textStyle}>Часы</span> &nbsp;
                    <span>23/176</span>
                </div>
                <div className={styles.daysOff}>
                    <div className={styles.textStyle}>Отработано дней <span>6</span></div>
                    <div className={styles.textStyle}>Отпускные <span>2</span></div>
                    <div className={styles.textStyle}>Больничные <span>0</span></div>
                </div>
                <div className={styles.salary}>
                    <div className={styles.textStyle}>Зарплата по окладу <span>34500</span></div>
                    <div className={styles.textStyle}>Зарплата c учетом пов. коэф: <span>47800</span></div>
                </div>
            </div>
            <div className={styles.viewStatistic}>
                {handleView ? <Chart/> : <Almanac />}
                <div className={styles.wrapperBtn}>
                    <button className={styles.calendarBtn} onClick={() => setHandleView(false)}>Календарь</button>
                    <button className={styles.chartBtn} onClick={() => setHandleView(true)}>График</button>
                </div>
            </div>
        </div>
    )
}

export default Statistics;