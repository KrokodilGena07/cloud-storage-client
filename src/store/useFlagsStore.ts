import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {flagNames} from '@/models';

interface IFlagsStore {
    flags: {
        profile: boolean;
        image: boolean;
        error: boolean;
        mobile: boolean;
        canvas: boolean;
        folder: boolean;
        file: boolean;
    }
    setFlag: (flagName: flagNames, value: boolean) => void;
}

export const useFlagsStore = create<IFlagsStore>()(immer(set => ({
    flags: {
        profile: false,
        image: false,
        error: false,
        mobile: window.innerWidth < 1000,
        canvas: false,
        folder: false,
        file: false
    },
    setFlag: (flagName, value) => set(state => {
        state.flags[flagName] = value;
    })
})));