import {IFile, IGetFileInput, ISearchFileInput} from '@/modules/storage/models/fileReader';
import axios from 'axios';
import {useUserStore} from '@/store/useUserStore';

export class FileReaderApi {
    static BASE_URL = `${__API__}/file/reader`;
    static ACCESS_TOKEN = useUserStore.getState().accessToken;
    static HEADERS = {
        authorization: `Bearer ${this.ACCESS_TOKEN}`
    };

    static async getFiles(data: IGetFileInput): Promise<IFile[]> {
        // @ts-ignore
        return await axios.get(this.BASE_URL, {
            headers: this.HEADERS,
            params: data
        }).then(response => response.data);
    }

    static async searchFiles(data: ISearchFileInput): Promise<IFile[]> {
        // @ts-ignore
        return await axios.get(`${this.BASE_URL}/search`, {
            headers: this.HEADERS,
            params: data
        }).then(response => response.data)
    }

    static async downloadFile(id: string) {
        // @ts-ignore
        return await axios.get(`${this.BASE_URL}/${id}`, {
            headers: this.HEADERS,
        }).then(response => response.data);
    }
}