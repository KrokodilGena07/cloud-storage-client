import React, {useEffect, useState} from 'react';
import styles from './ProfileForm.module.css';
import Modal from '@/UI/modal/Modal';
import {useFlagsStore} from '@/store/useFlagsStore';
import Avatar from '@/UI/avatar/Avatar';
import Pencil from '@/assets/svg/pencil.svg';
import {useUserStore} from '@/store/useUserStore';
import Button from '@/UI/button/Button';
import ModalHeader from '@/components/modalHeader/ModalHeader';
import FormItem from '@/modules/profileForm/compomemts/formItem/FormItem';
import {flagNames} from '@/models';
import {useProfileStore} from '@/modules/profile/store/useProfileStore';
import {IUserInput} from '@/modules/profile/models';
import {useRefreshStore} from '@/store/useRefreshStore';
import {getInputError} from '@/utils/getInputError';
import {inputHandler} from '@/utils/inputHandler';
import {useSubmit} from '@/hooks/useSubmit';

export const ProfileForm = () => {
    const {flags, setFlag} = useFlagsStore();
    const {refresh, data} = useRefreshStore();
    const {user, setUser} = useUserStore();
    const {isLoading, updateUser} = useProfileStore();

    const [userData, setUserData] = useState<IUserInput>({
        username: user.username, email: user.email, password: '', id: user.id
    });
    const [passwordFlag, setPasswordFlag] = useState(false);

    useEffect(() => {
        if (data) {
            setUserData({
                username: data.user.username, email: data.user.email, password: '', id: user.id
            });
        }
    }, [data, flags.profile]);

    const {submit, errors, setErrors, errorText} = useSubmit(updateUser, userData, (data) => {
        setFlag(flagNames.PROFILE, false);
        refresh();
    }, () => {
        for (const dataKey in userData) {
            if (!userData[dataKey as keyof typeof userData]) {
                delete userData[dataKey as keyof typeof userData];
            }
        }
    });

    const inputError = getInputError(errors);
    const userHandler = inputHandler(errors, setErrors, userData, setUserData);

    return (
        <Modal
            isVisible={flags.profile}
            setIsVisible={() => setFlag(flagNames.PROFILE, false)}
            classNameToWindow={styles.Modal}
        >
            <form
                onSubmit={e => submit(e)}
            >
                <ModalHeader
                    text='Your data'
                    setFlag={() => setFlag(flagNames.PROFILE, false)}
                />
                <div className={styles.Body}>
                    <div className={styles.Image}>
                        <Avatar size={100}/>
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
                        onChange={v => userHandler(v.username, 'username')}
                        text='Username'
                        userData={userData}
                        className={styles.Input}
                        field='username'
                        required
                        max={255}
                        isInvalid={!!inputError('username')}
                        error={inputError('username')}
                    />
                    <FormItem
                        id='email'
                        value={userData.email}
                        type='email'
                        onChange={v => userHandler(v.email, 'email')}
                        text='Email'
                        userData={userData}
                        className={styles.Input}
                        field='email'
                        required
                        max={255}
                        isInvalid={!!inputError('email')}
                        error={inputError('email')}
                    />
                    {passwordFlag &&
                        <FormItem
                            id='password'
                            type='password'
                            value={userData.password}
                            onChange={v => userHandler(v.password, 'password')}
                            text='Password'
                            userData={userData}
                            field='password'
                            required
                            max={30}
                            isInvalid={!!inputError('password')}
                            error={inputError('password')}
                        />
                    }
                    <Button
                        size='lg'
                        className={styles.PasswordButton}
                        onClick={() => {
                            setPasswordFlag(!passwordFlag)
                            setUserData({...userData, password: ''})
                            setErrors(errors?.filter(err => err.path !== 'password'));
                        }}
                        type='button'
                    >
                        {passwordFlag ? 'Save current password' : 'Create new password'}
                    </Button>
                    {errorText &&
                        <span className={styles.Error}>
                            {errorText}
                        </span>
                    }
                    <Button
                        size='lg'
                        variant='primary'
                        className={styles.SaveButton}
                    >
                        {isLoading ? 'Loading...' : 'Save'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};