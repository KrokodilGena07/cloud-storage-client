export enum SidebarItems {
    FILES = 'FILES',
    PHOTOS = 'PHOTOS',
    ALBUMS = 'ALBUMS',
    TRASH = 'TRASH',
    SEARCH = 'SEARCH'
}

export interface ISidebarItem {
    title: string;
    value: SidebarItems;
}