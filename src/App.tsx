import React, {FC, Suspense} from 'react';
import styles from '@/styles.module.css';
import {Link, Route, Routes} from 'react-router-dom';
import LazyHome from '@/pages/home/LazyHome';
import LazyAbout from '@/pages/about/LazyAbout';

const App: FC = () => {
    return (
        <div className={styles.class}>
            <Link to={'/'}>HOME</Link>
            <br/>
            <Link to={'/about'}>ABOUT</Link>
            <Suspense fallback={'loading...'}>
                <Routes>
                    <Route element={<LazyHome/>} path={'/'}/>
                    <Route element={<LazyAbout/>} path={'/about'}/>
                </Routes>
            </Suspense>
        </div>
    );
};

export default App;