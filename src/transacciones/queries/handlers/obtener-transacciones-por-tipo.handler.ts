import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TransaccionRepository } from '../../repositories/transaccion.repository';
import { ObtenerTransaccionesPorTipoQuery } from '../impl/obtener-transacciones-por-tipo.query';

@QueryHandler(ObtenerTransaccionesPorTipoQuery)
export class ObtenerTransaccionesPorTipoHandler
    implements IQueryHandler<ObtenerTransaccionesPorTipoQuery> {
    constructor(private readonly repository: TransaccionRepository) { }

    async execute(query: ObtenerTransaccionesPorTipoQuery): Promise<any> {
        const { tipo } = query;
        return this.repository.obtenerPorTipo(tipo);
    }
}