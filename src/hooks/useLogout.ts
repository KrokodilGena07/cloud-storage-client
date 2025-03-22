import {AuthApi} from '@/api/AuthApi';
import {useFlagsStore} from '@/store/useFlagsStore';
import {flagNames} from '@/models';
import {useUserStore} from '@/store/useUserStore';

export const useLogout = () => {
    const {setFlag} = useFlagsStore();
    const {user, removeUser} = useUserStore();

    return async () => {
        try {
            await AuthApi.logout();
            removeUser();
        } catch (e) {
            if (user) {
                setFlag(flagNames.ERROR, true);
                alert('Error, try again'); // TODO MAKE A MODAL WITH ERROR
            }
        }
    };
};