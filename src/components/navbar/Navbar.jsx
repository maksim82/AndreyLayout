import { useState } from 'react';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHouse, faChartSimple, faReceipt, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import styles from './navbar.module.scss';

const Navbar = () => {
    const [data, setData] = useState([
        {name: "Главная", link: "/", active: styles.active, icon: faHouse},
        {name: "Профиль", link: "/profile", active: "", icon: faUser},
        {name: "Статистика", link: "/statistic", active: "", icon: faChartSimple},
        {name: "Бухгалтерия", link: "/accounting", active: "", icon: faReceipt},
        {name: "Выход", link: "/login", active: "", icon: faRightFromBracket},
    ]);

    const handleActive = (index, name) => {
        setData(data.map((item, i) => {
            const active = index === i ? styles.active : "";
            return {
                ...item,
                active
            };
        }));

        if (name === "Выход") {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            document.cookie = `${document.cookie}; max-age=-1`;
        }
    };

    return (
        <nav className={styles.navbar}>
           <ul>
                {data.map(({link, name, active, icon}, i) => (
                    <li key={i} className={active} onClick={() => handleActive(i, name)}>
                        <Link to={link}>
                            <span className={styles.icon}>
                                <FontAwesomeIcon icon={icon} color="white" />
                            </span>
                        </Link>
                    </li>
                ))}
                <div className={styles.indicator}></div>
            </ul> 
        </nav>
    )
}

export default Navbar;