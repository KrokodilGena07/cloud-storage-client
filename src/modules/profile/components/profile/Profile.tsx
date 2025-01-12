import React, {FC, useState} from 'react';
import styles from './Profile.module.css';
import Header from '@/UI/header/Header';
import {useUserStore} from '@/store/useUserStore';
import Modal from '@/UI/modal/Modal';
import Warning from '@/modules/profile/components/warning/Warning';
import ConfirmBox from '@/modules/profile/components/confirmBox/ConfirmBox';
import UserData from '@/modules/profile/components/userData/UserData';
import {useFlagsStore} from '@/store/useFlagsStore';
import {useProfileStore} from '@/modules/profile/store/useProfileStore';
import {logout} from '@/utils/logout';
import {flagNames} from '@/models';

export const Profile: FC = () => {
    const {user, removeUser} = useUserStore();
    const {deleteUser} = useProfileStore();
    const {setFlag} = useFlagsStore();

    const [warningFlag, setWarningFlag] = useState(!!user.isActivated);
    const [deleteAccountFlag, setDeleteAccountFlag] = useState(false);
    const [logoutFlag, setLogoutFlag] = useState(false);

    const deleteAccount = () => {
        deleteUser(user?.id);
        removeUser();
    };

    const signOut = () => {
        logout();
        removeUser();
    };

    return (
        <div>
            <Modal
                setIsVisible={setDeleteAccountFlag}
                isVisible={deleteAccountFlag}
                className={styles.DeleteAccountModal}
            >
                <ConfirmBox
                    text='Are you sure you want to delete your account?'
                    buttonText='Delete my account'
                    function={deleteAccount}
                    status='danger'
                />
            </Modal>
            <Modal
                setIsVisible={setLogoutFlag}
                isVisible={logoutFlag}
                className={styles.LogoutModal}
            >
                <ConfirmBox
                    text='Are you sure you want to logout?'
                    buttonText='Logout'
                    function={signOut}
                    status='warning'
                />
            </Modal>
            <Warning
                isVisible={warningFlag}
                setIsVisible={setWarningFlag}
            />
            <Header/>
            <UserData
                setEditFlag={() => setFlag(flagNames.PROFILE, true)}
                setLogoutFlag={setLogoutFlag}
                setDeleteAccountFlag={setDeleteAccountFlag}
                user={user}
            />
        </div>
    );
};