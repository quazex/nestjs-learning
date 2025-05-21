import { CustomScalar, Scalar } from '@nestjs/graphql';
import { GraphQLError, Kind, ValueNode } from 'graphql';
import { DateTime } from 'luxon';

@Scalar('DateTime', () => DateTime)
export class DateTimeScalar implements CustomScalar<string, DateTime> {
    public description = 'DateTime custom scalar type';

    public parseValue(value: unknown): DateTime {
        if (typeof value !== 'string') {
            throw new GraphQLError('Cannot parse Date');
        }

        const dt = DateTime.fromISO(value);
        if (!dt.isValid) {
            throw new GraphQLError('Date is not valid');
        }

        return dt;
    }

    public serialize(value: unknown): string {
        if (!(value instanceof DateTime)) {
            throw new GraphQLError('Cannot encode Date');
        }

        const iso = value.toISO();
        if (typeof iso !== 'string') {
            throw new GraphQLError('Date is not valid');
        }

        return iso;
    }

    public parseLiteral(ast: ValueNode): DateTime {
        if (ast.kind !== Kind.STRING) {
            throw new GraphQLError('Cannot parse Date');
        }

        const dt = DateTime.fromISO(ast.value);
        if (!dt.isValid) {
            throw new GraphQLError('Date is not valid');
        }

        return dt;
    }
}
