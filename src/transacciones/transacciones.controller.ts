import { Controller, Get, Param, Query } from '@nestjs/common';

import { TransaccionesService } from './transacciones.service';

@Controller('transacciones')
export class TransaccionesController {
    constructor(private readonly transaccionesService: TransaccionesService) { }

    /**
     * Obtener todas las transacciones de un usuario.
     * @param usuario_id - ID del usuario.
     * @returns Lista de transacciones.
     */
    @Get('usuario/:usuario_id')
    async obtenerTransaccionesPorUsuario(@Param('usuario_id') usuario_id: string): Promise<any> {
        return this.transaccionesService.obtenerTransaccionesPorUsuario(usuario_id);
    }

    /**
     * Obtener transacciones por tipo (depósito, retiro, compra).
     * @param tipo - Tipo de transacción.
     * @returns Lista de transacciones.
     */
    @Get('tipo')
    async obtenerTransaccionesPorTipo(@Query('tipo') tipo: string): Promise<any> {
        return this.transaccionesService.obtenerTransaccionesPorTipo(tipo);
    }
}