import { IQuery } from '@nestjs/cqrs';

export class ObtenerTransaccionesPorTipoQuery implements IQuery {
    constructor(public readonly tipo: string) { }
}