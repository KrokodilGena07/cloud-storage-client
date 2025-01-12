import React, {FC} from 'react';
import styles from './UserData.module.css';
import Avatar from '@/UI/avatar/Avatar';
import Button from '@/UI/button/Button';
import {IUser} from '@/models';

interface IUserDataProps {
    setEditFlag: (flag: boolean) => void;
    setLogoutFlag: (flag: boolean) => void;
    setDeleteAccountFlag: (flag: boolean) => void;
    user: IUser;
}

const UserData: FC<IUserDataProps> = props => {
    return (
        <div className={styles.Profile}>
            <Avatar className={styles.Avatar}/>
            <h1 className={styles.Username}>{props.user.username}</h1>
            <span className={styles.Email}>{props.user.email}</span>
            <div className={styles.Buttons}>
                <Button
                    size='lg'
                    variant='primary'
                    onClick={() => props.setEditFlag(true)}
                >
                    Edit profile
                </Button>
                <Button
                    size='lg'
                    onClick={() => props.setLogoutFlag(true)}
                >
                    Logout
                </Button>
                <Button
                    size='lg'
                    onClick={() => props.setDeleteAccountFlag(true)}
                >
                    Delete account
                </Button>
            </div>
        </div>
    );
};

export default UserData;