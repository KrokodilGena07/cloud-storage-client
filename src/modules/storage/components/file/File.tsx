import React, {FC, useEffect, useRef, useState} from 'react';
import styles from './File.module.css';
import {IFile} from '@/modules/storage/models/fileReader';
import FolderIcon from '@/assets/svg/folder.svg';
import FileIcon from '@/assets/svg/file.svg';
import {convertDate} from '@/modules/storage/utils/convertDate';
import {convertSize} from '@/modules/storage/utils/convertSize';

interface IFileProps {
    item: IFile;
    format: string;
    openFolder: (folderId: string, name: string) => void;
    setSelectedIds: (ids: string[]) => void;
    selectIds: string[];
}

const File: FC<IFileProps> = ({item, format, openFolder, setSelectedIds, selectIds}) => {
    const [menuFlag, setMenuFlag] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const listRef = useRef<HTMLDivElement>(null);

    const name = item.name.length > 14 ? item.name.slice(0, 14) + '...' : item.name;
    const listName = item.name.length > 18 ? item.name.slice(0, 18) + '...' : item.name;

    const options = [
        {text: 'Download'},
        {text: 'Rename'},
        {text: 'Replace'},
        {text: 'Delete'}
    ];

    const handleClickOutside = (e: MouseEvent) => {
        if (listRef.current && !listRef.current.contains(e.target as Node)) {
            setMenuFlag(false);
            listRef.current.classList.remove(styles.SelectedFile);
        }
    };

    useEffect(() => {
        if (menuFlag) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuFlag]);

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();

        listRef.current.classList.add(styles.SelectedFile);

        if (e.clientX + 150 > window.innerWidth) {
            setPosition({y: e.clientY + scrollY, x: window.innerWidth - 170})
        }
        else if (e.clientY + 170 > window.innerHeight) {
            setPosition({x: e.clientX, y: window.innerHeight - 170 + scrollY - 5})
        } else {
            setPosition({ x: e.clientX, y: e.clientY + scrollY });
        }
        setMenuFlag(true);
    };

    const select = (e: React.MouseEvent) => {
        if (e.ctrlKey) {
            setSelectedIds([...selectIds, item.id]);
        }
    }

    if (format === 'list') {
        return (
            <div
                className={styles.ListFile}
                onDoubleClick={item.type === 'FOLDER' ?
                    () => openFolder(item.id, item.name)
                    :
                    () => alert('This is file')
                }
                onContextMenu={handleContextMenu}
                ref={listRef}
            >
                {menuFlag &&
                    <ul
                        className={styles.Options}
                        style={{
                            left: position.x,
                            top: position.y
                        }}
                    >
                        {options.map(item =>
                            <li
                                key={item.text}
                                className={styles.Option}
                            >
                                {item.text}
                            </li>
                        )}
                    </ul>
                }
                {item.type === 'FOLDER' ?
                    <FolderIcon className={styles.listIcon}/>
                    :
                    <FileIcon className={styles.listIcon}/>
                }
                <span>
                    {listName}
                </span>
                <div/>
                <span>
                    {convertDate(item.date)}
                </span>
                {item.type !== 'FOLDER' &&
                    <span>
                        {convertSize(item.size)}
                    </span>
                }
            </div>
        );
    }

    return (
        <div
            className={`${styles.File} ${styles[format]}`}
            onDoubleClick={item.type === 'FOLDER' ?
                () => openFolder(item.id, item.name)
                :
                () => alert('This is file')
            }
            onContextMenu={handleContextMenu}
            ref={listRef}
            onClick={e => select(e)}
        >
            {menuFlag &&
                <ul className={styles.Options}
                    style={{
                        left: position.x,
                        top: position.y
                    }}
                >
                    {options.map(item =>
                        <li
                            key={item.text}
                            className={styles.Option}
                        >
                            {item.text}
                        </li>
                    )}
                </ul>
            }
            <div>
                {item.type === 'FOLDER' ?
                    <FolderIcon className={styles[`${format}Icon`]}/>
                    :
                    <FileIcon className={styles[`${format}Icon`]}/>
                }
            </div>
            <div>
                {name}
            </div>
        </div>
    );
};

export default File;