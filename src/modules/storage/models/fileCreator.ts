export interface IFolderInput extends IFileInput {
    name: string;
}

export interface IFileInput {
    folderId?: string;
    userId: string;
}