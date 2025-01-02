import React, {FC} from 'react';
import styles from './Loader.module.css';

const Loader: FC = () => {
    return (
        <div className={styles.LoaderContainer}>
            <div className={styles.Loader}/>
        </div>
    );
};

export default Loader;