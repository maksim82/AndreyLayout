import styles from './profile.module.scss';

const ModalInputs = ({ data, handleValue, checkBlur, disabled, err }) => {
    const errArr = Object.values(err);
    return (
        data.map(({ value, name, type, placeholder }, i) => {
            const checkDisabled = i !== 0 ? disabled : null;
            const fakeAndRealDatePlaceholder = placeholder ? placeholder : "Дата рождения";
            return (
                <div className={styles.inputBox} key={i}>
                    <input type={type} value={value} name={name} onBlur={e => checkBlur(e, fakeAndRealDatePlaceholder)}
                        onChange={handleValue} disabled={checkDisabled} />
                    {value ? null : <span>{placeholder}</span>}
                    <div className={styles.errInput}>{errArr[i] || null}</div>
                </div>
            )
        })
    )
}

export default ModalInputs;