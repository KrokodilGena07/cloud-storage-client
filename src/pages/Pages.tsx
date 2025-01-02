import {RouteObject} from 'react-router-dom';
import LazyError from '@/pages/error/LazyError';
import LazyStorage from '@/pages/storage/LazyStorage';
import LazyAuth from '@/pages/auth/LazyAuth';

export enum Pages {
    AUTH_REGISTRATION = '/registration',
    AUTH_LOGIN = '/login',
    STORAGE = '/'
}

export const privateRoutes: RouteObject[] = [
    {path: Pages.STORAGE, element: <LazyStorage/>},
    {path: '*', element: <LazyError/>}
];

export const publicRoutes: RouteObject[] = [
    {path: '*', element: <LazyAuth/>}
];