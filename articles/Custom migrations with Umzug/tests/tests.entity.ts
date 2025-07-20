import { Column, Entity, PrimaryColumn } from 'typeorm';
import { TestsDoc } from './tests.types';

@Entity({
    name: 'tests_table',
})
export class TestsEntity implements TestsDoc {
    @PrimaryColumn({ type: 'uuid' })
    public id: string;

    @Column({ type: 'text' })
    public name: string;

    @Column({ type: 'int4' })
    public count: number;

    @Column({ type: 'int4' })
    public timestamp: number;
}
