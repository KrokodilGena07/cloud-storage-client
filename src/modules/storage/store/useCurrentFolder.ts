import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

interface ICurrentFolderStore {
    name: string;
    id: string | null;
    sort: string;
    ids: string[]
}

export const useCurrentFolder = create<ICurrentFolderStore>()(immer(set => ({
    name: 'Files',
    id: null,
    sort: '',
    ids: []
})));