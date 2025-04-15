import Stream from 'stream';

export interface Transform<TData> extends Stream.Transform {
    [Symbol.asyncIterator](): AsyncIterableIterator<TData>;
    _transform(chunk: TData, encoding: BufferEncoding, callback: Stream.TransformCallback): void;
    _write(chunk: TData, encoding: BufferEncoding, callback: (error?: Error | null) => void): void;
    push(chunk: TData, encoding?: BufferEncoding): boolean;
}
