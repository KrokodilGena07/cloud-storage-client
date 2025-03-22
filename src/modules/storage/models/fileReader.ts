export interface IGetFileInput {
    userId: string;
    folderId?: string;
    sort?: FilesSort;
}

export interface ISearchFileInput {
    userId: string;
    search: string;
}

export interface IFile {
    id: string;
    name: string;
    size: number;
    date: string;
    type: string;
    path: string;
    folderId: string | null;
    isTrash: boolean;
}

export type FilesSort =
    'name_up'|
    'name_down' |
    'size_up' |
    'size_down' |
    'date_up' |
    'date_down';