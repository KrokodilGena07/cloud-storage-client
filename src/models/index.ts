

export type UISize = 'sm' | 'md' | 'lg';

export enum flagNames {
    PROFILE = 'profile',
    IMAGE = 'image',
    ERROR = 'error',
    MOBILE = 'mobile',
    CANVAS = 'canvas',
    FOLDER = 'folder',
    FILE = 'file'
}

export interface IDropdownItem {
    value: any;
    title: string;
}