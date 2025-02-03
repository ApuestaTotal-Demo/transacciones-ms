import { Controller, Get, Param } from '@nestjs/common';

import { TransaccionesService } from './transacciones.service';

@Controller('api/transacciones')
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
     * Obtener transacciones por tipo (deposito, retiro, compra).
     * @param tipo - Tipo de transacción.
     * @returns Lista de transacciones.
     */
    @Get('tipo/:tipo')
    async obtenerTransaccionesPorTipo(@Param('tipo') tipo: string): Promise<any> {
        return this.transaccionesService.obtenerTransaccionesPorTipo(tipo);
    }
}