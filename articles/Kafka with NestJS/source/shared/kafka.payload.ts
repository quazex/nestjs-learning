export class KafkaPayload {
    public parse<TData = unknown>(data: any): TData {
        return JSON.parse(data) as TData;
    }

    public encode<TData = unknown>(data: TData): string {
        return JSON.stringify(data);
    }
}
