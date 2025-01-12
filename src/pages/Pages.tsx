import React from 'react';
import {RouteObject} from 'react-router-dom';
import LazyMain from '@/pages/main/LazyMain';
import LazyAuth from '@/pages/auth/LazyAuth';
import LazyUser from '@/pages/user/LazyUser';

export enum Pages {
    AUTH_REGISTRATION = '/registration',
    AUTH_LOGIN = '/login',
    MAIN = '/',
    PROFILE = '/profile'
}

export const privateRoutes: RouteObject[] = [
    {path: Pages.PROFILE, element: <LazyUser/>},
    {path: '*', element: <LazyMain/>}
];

export const publicRoutes: RouteObject[] = [
    {path: '*', element: <LazyAuth/>}
];