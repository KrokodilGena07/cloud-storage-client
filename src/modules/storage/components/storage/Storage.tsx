import React, {FC, FormEvent, useState} from 'react';
import styles from './Storage.module.css';
import {SidebarItems} from '@/models/sidebar';
import Sidebar from '@/UI/sidebar/Sidebar';
import Header from '@/UI/header/Header';
import {Files} from '@/modules/storage/components/files/Files';
import Trash from '@/modules/storage/components/trash/Trash';
import Albums from '@/modules/storage/components/albums/Albums';
import Photos from '@/modules/storage/components/photos/Photos';
import {useFlagsStore} from '@/store/useFlagsStore';

export const Storage: FC = () => {
    const [sidebarItem, setSidebarItem] = useState(SidebarItems.FILES);

    const {flags} = useFlagsStore();

    let content = <Files/>

    switch (sidebarItem) {
        case SidebarItems.FILES:
            content = <Files/>
            break;
        case SidebarItems.PHOTOS:
            content = <Photos/>
            break;
        case SidebarItems.ALBUMS:
            content = <Albums/>
            break;
        case SidebarItems.TRASH:
            content = <Trash/>
            break;
    }

    return (
        <div className={flags.folder ? styles.freeze : ''}>
            <Header/>
            <div className={styles.Storage}>
                <Sidebar
                    sidebarItem={sidebarItem}
                    setSidebarItem={setSidebarItem}
                />
                <main className={styles.Content}>
                    {content}
                </main>
            </div>
        </div>
    );
};