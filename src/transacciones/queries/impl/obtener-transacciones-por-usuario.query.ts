import { IQuery } from '@nestjs/cqrs';

export class ObtenerTransaccionesPorUsuarioQuery implements IQuery {
    constructor(public readonly usuario_id: string) { }
}