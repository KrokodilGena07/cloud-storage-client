import React, {useState} from 'react';
import styles from './ProfileForm.module.css';
import Modal from '@/UI/modal/Modal';
import {useFlagsStore} from '@/store/useFlagsStore';
import Avatar from '@/UI/avatar/Avatar';
import Pencil from '@/assets/svg/pencil.svg';
import {useUserStore} from '@/store/useUserStore';
import Button from '@/UI/button/Button';
import ModalHeader from '@/components/modalHeader/ModalHeader';
import {IUserInput} from '@/modules/profileForm/models';
import FormItem from '@/modules/profileForm/compomemts/formItem/FormItem';
import {flagNames} from '@/models';

export const ProfileForm = () => {
    const {flags, setFlag} = useFlagsStore();
    const {user} = useUserStore();

    const [userData, setUserData] = useState<IUserInput>({
        username: user.username, email: user.email, password: ''
    });
    const [passwordFlag, setPasswordFlag] = useState(false);

    return (
        <Modal
            isVisible={flags.profile}
            setIsVisible={() => setFlag(flagNames.PROFILE, false)}
            classNameToWindow={styles.Modal}
        >
            <form>
                <ModalHeader
                    text='Your data'
                    setFlag={() => setFlag(flagNames.PROFILE, false)}
                />
                <div className={styles.Body}>
                    <div className={styles.Image}>
                        <Avatar className={styles.Avatar}/>
                        <button
                            className={styles.EditButton}
                            onClick={() => setFlag(flagNames.IMAGE, true)}
                            type='button'
                        >
                            <Pencil className={styles.EditIcon}/>
                        </button>
                    </div>
                    <FormItem
                        id='username'
                        value={userData.username}
                        onChange={setUserData}
                        text='Username'
                        userData={userData}
                        className={styles.Input}
                        field='username'
                        required
                        max={255}
                    />
                    <FormItem
                        id='email'
                        value={userData.email}
                        type='email'
                        onChange={setUserData}
                        text='Email'
                        userData={userData}
                        className={styles.Input}
                        field='email'
                        required
                        max={255}
                    />
                    {passwordFlag &&
                        <FormItem
                            id='password'
                            type='password'
                            value={userData.password}
                            onChange={setUserData}
                            text='Password'
                            userData={userData}
                            field='password'
                            required
                            max={30}
                        />
                    }
                    <Button
                        size='lg'
                        className={styles.PasswordButton}
                        onClick={() => setPasswordFlag(!passwordFlag)}
                        type='button'
                    >
                        {passwordFlag ? 'Save current password' : 'Create new password'}
                    </Button>
                    <Button
                        size='lg'
                        variant='primary'
                        className={styles.SaveButton}
                    >
                        Save
                    </Button>
                </div>
            </form>
        </Modal>
    );
};