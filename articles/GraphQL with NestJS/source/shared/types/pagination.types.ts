export interface TPaginationMeta {
    next?: number;
    total: number;
}

export interface TPaginationResult<TData> {
    items: TData[];
    meta: TPaginationMeta;
}
