import {UserApi} from '@/modules/profile/api';
import {useFlagsStore} from '@/store/useFlagsStore';
import {flagNames} from '@/models';
import {useUserStore} from '@/store/useUserStore';

export const useDeleteUser = () => {
    const {setFlag} = useFlagsStore();
    const {removeUser} = useUserStore();

    return async (id: string) => {
        try {
            await UserApi.deleteUser(id);
            removeUser();
        } catch (e) {
            setFlag(flagNames.ERROR, true);
            alert('Error'); // TODO MAKE A MODAL WITH ERROR
        }
    }
};