import axios from 'axios';
import {useUserStore} from '@/store/useUserStore';
import {IImageData} from '@/modules/imageForm/models';
import {IUser} from '@/models/auth';

export class ImageApi {
    static ACCESS_TOKEN = useUserStore.getState().accessToken;
    static HEADERS = {
        authorization: `Bearer ${this.ACCESS_TOKEN}`
    };

    static async setImage(data: IImageData): Promise<IUser> {
        const formData = new FormData();
        for (const formDataKey in data) {
            formData.append(formDataKey, data[formDataKey as keyof typeof data]);
        }

        return await axios.put(`${__API__}/user/images`, formData, {
            headers: this.HEADERS,
            withCredentials: true
        }).then(response => response.data);
    }

    static async deleteImage() {

    }
}