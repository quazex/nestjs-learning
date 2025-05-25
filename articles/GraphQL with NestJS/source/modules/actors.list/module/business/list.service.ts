import { Injectable } from '@nestjs/common';
import { TPaginationResult } from '../../../../shared/types/pagination.types';
import { TActorsListQuery } from '../../types/list.types';
import { TActorListModel } from '../../types/model.types';
import { ActorsListDao } from '../integration/list.dao';

@Injectable()
export class ActorsListService {
    constructor(private readonly dao: ActorsListDao) {}

    public async getList(query: TActorsListQuery): Promise<TPaginationResult<TActorListModel>> {
        const total = await this.dao.count();
        const models = await this.dao.find(query);

        const latest = models.pop();

        return {
            items: models.map<TActorListModel>((item) => ({
                id: item.id,
                name: item.name,
                films: 0,
            })),
            meta: {
                next: latest?.id,
                total,
            },
        };
    }
}
