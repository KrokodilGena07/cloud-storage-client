import React, {FC, useState} from 'react';
import styles from './ImageForm.module.css';
import Modal from '@/UI/modal/Modal';
import {useFlagsStore} from '@/store/useFlagsStore';
import ModalHeader from '@/components/modalHeader/ModalHeader';
import Avatar from '@/UI/avatar/Avatar';
import Photo from '@/assets/svg/photo.svg';
import manAvatar from '@/assets/images/manAvatar.png';
import womanAvatar from '@/assets/images/womanAvatar.png';
import Button from '@/UI/button/Button';
import {flagNames} from '@/models';

export const ImageForm: FC = () => {
    const {flags, setFlag} = useFlagsStore();

    const [newImage, setNewImage] = useState<string | null>(null);

    return (
        <div>
            <Modal
                isVisible={flags.image}
                setIsVisible={() => setFlag(flagNames.IMAGE, false)}
                className={styles.ModalWrapper}
                classNameToWindow={styles.Modal}
            >
                <form>
                    <ModalHeader
                        text='New image'
                        setFlag={() => setFlag(flagNames.IMAGE, false)}
                    />
                    <div className={styles.NewImage}>
                        {newImage ?
                            <img
                                src={newImage}
                                alt='New image'
                                className={styles.Image}
                            />
                            :
                            <Avatar className={styles.Avatar}/>
                        }
                    </div>
                    <div className={styles.Panel}>
                        <label
                            className={styles.Button}
                            htmlFor='newImage'
                        >
                            <Photo className={styles.PhotoIcon}/>
                        </label>
                        <button
                            className={styles.Button}
                            type='button'
                            onClick={() => setNewImage(manAvatar)}
                        >
                            <img
                                src={manAvatar}
                                alt="Man avatar"
                                className={styles.AvatarImage}
                            />
                        </button>
                        <button
                            type='button'
                            className={styles.Button}
                            onClick={() => setNewImage(womanAvatar)}
                        >
                            <img
                                src={womanAvatar}
                                alt="Woman avatar"
                                className={styles.AvatarImage}
                            />
                        </button>
                    </div>
                    <Button
                        size='lg'
                        variant='primary'
                        className={styles.SaveButton}
                    >
                        Save
                    </Button>
                </form>
            </Modal>
        </div>
    );
};