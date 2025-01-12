import React, {FC} from 'react';
import styles from './Storage.module.css';
import Header from '@/UI/header/Header';

export const Storage: FC = () => {
    return (
        <div>
            <Header/>
            <div className={styles.Storage}>
                <aside className={styles.Sidebar}>

                </aside>
            </div>
        </div>
    );
};