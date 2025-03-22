import {create} from 'zustand';
import {IImageData} from '@/modules/imageForm/models';
import {ImageApi} from '@/modules/imageForm/api';

interface IImageStore {
    isLoading: boolean;
    setImage: (data: IImageData) => Promise<string>;
}

export const useImageStore = create<IImageStore>()(set => ({
    isLoading: false,
    setImage: async (data: IImageData) => {
        set({isLoading: true});
        try {
            const {image} = await ImageApi.setImage(data);
            set({isLoading: false});
            return image;
        } catch (e) {
            set({isLoading: false});
            throw e;
        }
    }
}));