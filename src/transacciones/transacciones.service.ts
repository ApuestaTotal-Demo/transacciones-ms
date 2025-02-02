import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { ObtenerTransaccionesPorUsuarioQuery } from './queries/impl/obtener-transacciones-por-usuario.query';
import { ObtenerTransaccionesPorTipoQuery } from './queries/impl/obtener-transacciones-por-tipo.query';

@Injectable()
export class TransaccionesService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) { }

    async obtenerTransaccionesPorUsuario(usuario_id: string): Promise<any> {
        return this.queryBus.execute(new ObtenerTransaccionesPorUsuarioQuery(usuario_id));
    }

    async obtenerTransaccionesPorTipo(tipo: string): Promise<any> {
        return this.queryBus.execute(new ObtenerTransaccionesPorTipoQuery(tipo));
    }
}