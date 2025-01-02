import {Route, Routes} from 'react-router-dom';
import {FC, Suspense} from 'react';
import Loader from '@/UI/loader/Loader';
import {useUserStore} from '@/store/useUserStore';
import {privateRoutes, publicRoutes} from '@/pages/Pages';

const AppRouter: FC = () => {
    const {user} = useUserStore();
    const isAuth = !!user?.id;
    const routes = isAuth ? privateRoutes : publicRoutes;
    const fallback = <Loader/>;

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