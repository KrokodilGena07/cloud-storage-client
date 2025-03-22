import React, {FC, useEffect, useState} from 'react';
import styles from './Files.module.css';
import {useFileReaderStore} from '@/modules/storage/store/useFileReader';
import {useUserStore} from '@/store/useUserStore';
import Dropdown from '@/UI/dropdown/Dropdown';
import {FilesSort} from '@/modules/storage/models/fileReader';
import File from '@/modules/storage/components/file/File';
import ArrowIcon from '@/assets/svg/arrow.svg';
import Modal from '@/UI/modal/Modal';
import {useFlagsStore} from '@/store/useFlagsStore';
import {flagNames} from '@/models';
import {useNavigate} from 'react-router-dom';
import Input from '@/UI/input/Input';
import Button from '@/UI/button/Button';
import {useFileCreator} from '@/modules/storage/store/useFileCreator';
import {useSubmit} from '@/hooks/useSubmit';

interface IPrevFile {
    name: string;
    id: string | null;
}

export const Files: FC = () => {
    const {data, isLoading, error, getFiles, download} = useFileReaderStore();
    const {user} = useUserStore();
    const {flags, setFlag} = useFlagsStore();
    const {createFolder, isLoading: isFolderLoading, uploadFile} = useFileCreator();

    const navigate = useNavigate();

    const [ordering, setOrdering] = useState('up');
    const [sort, setSort] = useState('name');
    const [format, setFormat] = useState('min');
    const [prevFiles, setPrevFiles] = useState<IPrevFile[]>([{
        name: 'Files',
        id: null
    }]);
    const [folderName, setFolderName] = useState('New folder');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const orderList = [
        {title: 'ascending', value: 'up'},
        {title: 'descending', value: 'down'}
    ];
    const sortList = [
        {title: 'sort by name', value: 'name'},
        {title: 'sort by date', value: 'date'},
        {title: 'sort by size', value: 'size'},
    ];
    const formatList = [
        {title: 'small icons', value: 'min'},
        {title: 'big icons', value: 'max'},
        {title: 'list', value: 'list'},
    ];

    const openFolder = (folderId: string, name: string) => {
        setPrevFiles([...prevFiles, {
            name,
            id: folderId
        }]);
        navigate(name)
    }

    useEffect(() => {

    }, [location.pathname]);

    const backFolder = () => {
        setPrevFiles(prevFiles.filter(f => f.id != prevFiles[prevFiles.length - 1].id));
        navigate(-1);
    }

    useEffect(() => {
        getFiles({
            userId: user.id,
            sort: `${sort}_${ordering}` as FilesSort,
            folderId: prevFiles[prevFiles.length - 1].id
        });
    }, [sort, ordering, prevFiles]);

    const {submit, errorText, setErrorText} = useSubmit(createFolder, {
        name: folderName,
        folderId: prevFiles[prevFiles.length - 1].id,
        userId: user.id
    }, data => {
        getFiles({
            userId: user.id,
            sort: `${sort}_${ordering}` as FilesSort,
            folderId: prevFiles[prevFiles.length - 1].id
        });
        setFlag(flagNames.FOLDER, false);
    });

    useEffect(() => {
        if (!flags.folder) {
            setFolderName('New folder');
            setErrorText(null);
        }
    }, [flags.folder]);

    return (
        <div>
            <Modal
                isVisible={flags.folder}
                setIsVisible={() => setFlag(flagNames.FOLDER, false)}
                className={styles.FolderModal}
                classNameToWindow={styles.FolderModalWindow}
            >
                <form
                    className={styles.Form}
                    onSubmit={submit}
                >
                    <h2 className={styles.Title}>Enter name of folder</h2>
                    <Input
                        onChange={setFolderName}
                        value={folderName}
                        className={styles.Input}
                    />
                    {errorText &&
                        <span className={styles.Err}>{errorText}</span>
                    }
                    <div className={styles.ButtonBox}>
                        <Button
                            className={styles.Button}
                            size='lg'
                            variant='primary'
                        >
                            {isFolderLoading ? 'Loading...' : 'Create'}
                        </Button>
                    </div>
                </form>
            </Modal>
            <div className={styles.Head}>
                <div className={styles.FolderName}>
                    {prevFiles[prevFiles.length - 1].id &&
                        <ArrowIcon
                            width={40}
                            height={40}
                            onClick={backFolder}
                            style={{cursor: 'pointer'}}
                        />
                    }
                    <h1 className={styles.CurrentFolder}>
                        {prevFiles[prevFiles.length - 1].name}
                    </h1>
                </div>
                <div className={styles.Menu}>
                    <Dropdown
                        value={sort}
                        onChange={setSort}
                        options={sortList}
                    />
                    <Dropdown
                        value={ordering}
                        onChange={setOrdering}
                        options={orderList}
                    />
                    <Dropdown
                        value={format}
                        onChange={setFormat}
                        options={formatList}
                    />
                </div>
            </div>
            {format === 'list' ?
                <div>
                    {data?.map(item =>
                        <File
                            item={item}
                            format={format}
                            key={item.id}
                            openFolder={openFolder}
                            setSelectedIds={setSelectedIds}
                            selectIds={selectedIds}
                        />
                    )}
                </div>
                :
                <div className={styles.Files}>
                    {data?.map(item =>
                        <File
                            item={item}
                            format={format}
                            key={item.id}
                            openFolder={openFolder}
                            setSelectedIds={setSelectedIds}
                            selectIds={selectedIds}
                        />
                    )}
                </div>
            }
            {data?.length === 0 &&
                <div className={styles.Empty}>This folder is empty</div>
            }
        </div>
    );
};