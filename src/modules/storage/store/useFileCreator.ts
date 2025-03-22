import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {IFileInput, IFolderInput} from '@/modules/storage/models/fileCreator';
import {FileCreatorApi} from '@/modules/storage/api/FileCreatorApi';

interface IFileCreatorStore {
    isLoading: boolean;
    createFolder: (data: IFolderInput) => Promise<void>;
    uploadFile: (data: IFileInput, file: File) => Promise<void>;
}

export const useFileCreator = create<IFileCreatorStore>()(immer(set => ({
    isLoading: false,
    createFolder: async (data) => {
        set({isLoading: true});
        try {
            await FileCreatorApi.createFolder(data);
            set({isLoading: false});
        } catch (e) {
            set({isLoading: false});
            throw e;
        }
    },
    uploadFile: async (data, file) => {
        set({isLoading: true});
        try {
            await FileCreatorApi.uploadFile(data, file);
            set({isLoading: false});
        } catch (e) {
            set({isLoading: false});
            throw e;
        }
    }
})));