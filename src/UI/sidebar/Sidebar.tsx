import React, {FC} from 'react';
import styles from './Sidebar.module.css';
import Button from '@/UI/button/Button';
import {ISidebarItem, SidebarItems} from '@/models/sidebar';
import {useFlagsStore} from '@/store/useFlagsStore';
import {flagNames} from '@/models';

interface ISidebarProps {
    sidebarItem: SidebarItems;
    setSidebarItem: (v: SidebarItems) => void;
}

const Sidebar: FC<ISidebarProps> = ({sidebarItem, setSidebarItem}) => {
    const {setFlag} = useFlagsStore();

    const isItemSelected = (value: SidebarItems) => {
        return sidebarItem === value ? styles.SelectedItem : '';
    };

    const sidebarItems: ISidebarItem[] = [
        {value: SidebarItems.FILES, title: 'Files'},
        {value: SidebarItems.PHOTOS, title: 'Photos'},
        {value: SidebarItems.ALBUMS, title: 'Alums'},
        {value: SidebarItems.TRASH, title: 'Trash'}
    ];

    return (
        <aside className={styles.Sidebar}>
            <div className={styles.Buttons}>
                <Button
                    variant='primary'
                    className={styles.Button}
                    onClick={() => setFlag(flagNames.FOLDER, true)}
                >
                    Create folder
                </Button>
                <Button
                    className={styles.Button}
                    onClick={() => setFlag(flagNames.FILE, true)}
                >
                    Upload file
                </Button>
            </div>
            <ul className={styles.Menu}>
                {sidebarItems.map(item =>
                    <li
                        key={item.value}
                        onClick={() => setSidebarItem(item.value)}
                        className={`${styles.MenuItem} ${isItemSelected(item.value)}`}
                    >
                        {item.title}
                    </li>
                )}
            </ul>
        </aside>
    );
};

export default Sidebar;