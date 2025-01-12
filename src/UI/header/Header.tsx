import React, {FC, useEffect, useState} from 'react';
import styles from './Header.module.css';
import {Pages} from '@/pages/Pages';
import logo from '@/assets/images/logo.png';
import {Link} from 'react-router-dom';
import Input from '@/UI/input/Input';
import Avatar from '@/UI/avatar/Avatar';
import {useFlagsStore} from '@/store/useFlagsStore';

const Header: FC = () => {
    const [search, setSearch] = useState('');

    const {flags} = useFlagsStore();

    return (
        <header className={styles.Header}>
            <Link
                to={Pages.MAIN}
                className={styles.Logo}
            >
                <img
                    src={logo}
                    alt="logo"
                    className={styles.Image}
                />
                {!flags.mobile &&
                    <span className={styles.Text}>Cloud storage</span>
                }
            </Link>
            <Input
                value={search}
                onChange={setSearch}
                className={styles.Input}
                size={flags.mobile ? 'md' : 'lg'}
                placeholder='Search...'
            />
            <Link
                to={Pages.PROFILE}
                className={styles.AvatarLink}
            >
                <Avatar className={styles.Avatar}/>
            </Link>
        </header>
    );
};

export default Header;