import styles from './home.module.scss';
import quoteImg from '../../utils/quoteImg.png';

const Home = () => {
    return (
        <>
            <h1>Новости</h1>
            <div className={styles.quote}>
                <h2>Цитата дня</h2>
                <div className={styles.wrapper}>
                    <div className={styles.img}>
                        <img src={quoteImg} alt="Цитата" style={{width: '200px'}} />
                    </div>
                    <div className={styles.text}>
                        <div className={styles.description}>
                            «Мотивация появляется, когда мы работаем над тем, что нам дорого. 
                            А ещё она появляется, когда мы работаем с теми, кто нам дорог»
                        </div>
                        <div className={styles.author}>
                            — Хоуп Соло
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.wrapperNews}>
                <div className={styles.news}>
                    <h3>Новость</h3>
                    <div className={styles.wrapper}>
                        <div className={styles.img}>
                            <img src={quoteImg} alt="Цитата" />
                        </div>
                        <div className={styles.text}>
                            <div className={styles.description}>
                                Ясность нашей позиции очевидна: повышение уровня гражданского сознания обеспечивает широкому кругу 
                                (специалистов) участие в формировании приоретизации разума над эмоциями.
                            </div>
                            <div className={styles.link}>
                                Подробнее
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.news}>
                    <h3>Новость</h3>
                    <div className={styles.wrapper}>
                        <div className={styles.img}>
                            <img src={quoteImg} alt="Цитата" />
                        </div>
                        <div className={styles.text}>
                            <div className={styles.description}>
                                Ясность нашей позиции очевидна: повышение уровня гражданского сознания обеспечивает широкому кругу 
                                (специалистов) участие в формировании приоретизации разума над эмоциями.
                            </div>
                            <div className={styles.link}>
                                Подробнее
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home