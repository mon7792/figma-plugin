
export type FileResp = {
    id: number;
    name: string;
    processed: boolean;
}

export type FileMsg = {
    path: string;
}

export type DbFileStatus = {
    fid: string;
    name: string;
    processed: boolean;
    predicted: string;
}