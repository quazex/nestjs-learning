import Streams from 'stream';

export type WritableCallback = (error?: Error | null) => void;

export interface WritableChunks<TData> {
    chunk: TData;
    encoding: BufferEncoding;
}

export interface Writable<TData> extends Streams.Writable {
    _write(chunk: TData, encoding: BufferEncoding, callback: WritableCallback): void;
    _writev?(chunks: WritableChunks<TData>[], callback: WritableCallback): void;
}
