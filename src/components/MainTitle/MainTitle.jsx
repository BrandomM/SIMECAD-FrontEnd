import styles from './MainTitle.module.scss';

export function MainTitle({label}) {

    return <h1 className={styles.mainTitle}>{label}</h1>;
}