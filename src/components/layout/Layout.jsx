import { Outlet } from 'react-router-dom';

import Navbar from '../navbar/Navbar';

import styles from './layout.module.scss';

const Layout = () => {
    return (
        <div className={styles.global_wrapper}>
            <Navbar />
            <div className={styles.container}>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;