import {AuthApi} from '@/api/AuthApi';

export const logout = async () => {
    try {
        await AuthApi.logout();
    } catch (e) {

        alert('Error, try again'); // TODO MAKE A MODAL WITH ERROR
    }
};