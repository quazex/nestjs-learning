/**
 * Shared converter for message payload
 * We can easily change format of data in one place
 */
export class KafkaPayload {
    public parse<TData = unknown>(data: unknown): TData | null {
        if (Buffer.isBuffer(data)) {
            const value = data.toString();
            return JSON.parse(value) as TData;
        }
        return null;
    }

    public encode<TData = unknown>(data: TData): string {
        return JSON.stringify(data);
    }
}
