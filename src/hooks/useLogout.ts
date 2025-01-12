import {AuthApi} from '@/api/AuthApi';
import {useFlagsStore} from '@/store/useFlagsStore';
import {flagNames} from '@/models';

export const useLogout = () => {
    const {setFlags} = useFlagsStore();

    return async () => {
        try {
            await AuthApi.logout();
        } catch (e) {
            setFlags(flagNames.ERROR, true);
            alert('Error, try again'); // TODO MAKE A MODAL WITH ERROR
        }
    };
};