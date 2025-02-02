import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TransaccionRepository } from '../../repositories/transaccion.repository';
import { ObtenerTransaccionesPorUsuarioQuery } from '../impl/obtener-transacciones-por-usuario.query';

@QueryHandler(ObtenerTransaccionesPorUsuarioQuery)
export class ObtenerTransaccionesPorUsuarioHandler
    implements IQueryHandler<ObtenerTransaccionesPorUsuarioQuery> {
    constructor(private readonly repository: TransaccionRepository) { }

    async execute(query: ObtenerTransaccionesPorUsuarioQuery): Promise<any> {
        const { usuario_id } = query;
        return this.repository.obtenerPorUsuario(usuario_id);
    }
}