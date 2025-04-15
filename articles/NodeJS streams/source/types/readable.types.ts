import Stream from 'stream';

export interface Readable<TData = unknown> extends Stream.Readable {
    [Symbol.asyncIterator](): AsyncIterableIterator<TData>;
    push(chunk: TData, encoding?: BufferEncoding): boolean;
    on(event: 'close', listener: () => void): this;
    on(event: 'data', listener: (chunk: TData) => void): this;
    on(event: 'end', listener: () => void): this;
    on(event: 'error', listener: (err: Error) => void): this;
    on(event: 'pause', listener: () => void): this;
    on(event: 'readable', listener: () => void): this;
    on(event: 'resume', listener: () => void): this;
}
