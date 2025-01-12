import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import {FC, Suspense} from 'react';
import Loader from '@/UI/loader/Loader';
import {useUserStore} from '@/store/useUserStore';
import {privateRoutes, publicRoutes} from '@/pages/Pages';
import {useRefreshStore} from '@/store/useRefreshStore';
import {logout} from '@/utils/logout';
import {flagNames} from '@/models';
import {useFlagsStore} from '@/store/useFlagsStore';

const AppRouter: FC = () => {
    const {user, setUser, removeUser} = useUserStore();
    const {
        error,
        isLoading,
        data,
        refresh
    } = useRefreshStore();
    const {setFlag} = useFlagsStore();

    const isAuth = !!user?.id;
    const routes = isAuth ? privateRoutes : publicRoutes;

    const fallback = <Loader/>;

    useEffect(() => {
        refresh();
    }, []);

    useEffect(() => {
        if (data) {
            setUser(data);
        }
        if (error?.status === 401) {
            logout();
            removeUser();
        }
    }, [data, error]);

    const headerHandler = () => setFlag(flagNames.MOBILE, window.innerWidth < 1000);

    useEffect(() => {
        window.addEventListener('resize', headerHandler);

        return () => {
            window.removeEventListener('resize', headerHandler);
        };
    }, [window.outerWidth]);

    if (isLoading) {
        return <Loader/>;
    }

    return (
        <Suspense fallback={fallback}>
            <Routes>
                {routes.map(route =>
                    <Route
                        path={route.path}
                        element={route.element}
                        key={route.path}
                    />
                )}
            </Routes>
        </Suspense>
    );
};

export default AppRouter;