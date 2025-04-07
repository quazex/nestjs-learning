/**
 * Unique identifier to link CustomTransportStrategy with EventPattern.
 * Allows to use multiple strategies with different handlers in one service.
 */
export const KafkaConsumerTransport = Symbol('KafkaConsumerTransport');
