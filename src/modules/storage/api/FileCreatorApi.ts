import {IFileInput, IFolderInput} from '@/modules/storage/models/fileCreator';
import axios from 'axios';
import {useUserStore} from '@/store/useUserStore';
import {IFile} from '@/modules/storage/models/fileReader';

export class FileCreatorApi {
    // TODO DECOMPOSE
    static BASE_API = `${__API__}/file/creator`;
    static ACCESS_TOKEN = useUserStore.getState().accessToken;
    static HEADERS = {
        authorization: `Bearer ${this.ACCESS_TOKEN}`
    };

    static async createFolder(data: IFolderInput): Promise<IFile> {
        return await axios.post(`${this.BASE_API}/folder`, data, {
            headers: this.HEADERS
        }).then(response => response.data);
    }

    static async uploadFile(data: IFileInput, file: File): Promise<IFile> {
        const formData = new FormData();

        // TODO IMPROVE
        formData.append('userId', data.userId);
        formData.append('file', file);
        if (data.folderId) {
            formData.append('folderId', data.folderId);
        }

        return await axios.post(`${this.BASE_API}/file`, formData, {
            headers: this.HEADERS
        }).then(response => response.data);
    }
}