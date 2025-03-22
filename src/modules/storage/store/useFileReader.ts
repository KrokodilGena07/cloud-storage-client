import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {IFile, IGetFileInput, ISearchFileInput} from '@/modules/storage/models/fileReader';
import {FileReaderApi} from '@/modules/storage/api/FileReaderApi';

interface UseFileReader {
    isLoading: boolean;
    error: null | {};
    data: null | IFile[];
    getFiles: (data: IGetFileInput) => void;
    searchFiles: (data: ISearchFileInput) => void;
    download: (id: string) => void;
}

export const useFileReaderStore = create<UseFileReader>()(immer(set => ({
    isLoading: false,
    error: null,
    data: null,
    getFiles: async (data) => {
        set({isLoading: true});
        try {
            const files = await FileReaderApi.getFiles(data);
            set({isLoading: false, data: files});
        } catch (e) {
            console.log(e);
            set({error: e, isLoading: false});
        }
    },
    searchFiles: async (data) => {
        set({isLoading: true});
        try {
            const files = await FileReaderApi.searchFiles(data);
            set({isLoading: false, data: files});
        } catch (e) {
            console.log(e);
            set({error: e, isLoading: false});
        }
    },
    download: async (id) => {
        const data = await FileReaderApi.downloadFile(id);
    }
})));