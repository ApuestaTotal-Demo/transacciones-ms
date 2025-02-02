import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Transaccion } from '../entities/transaccion.entity';

@Injectable()
export class TransaccionRepository {
    constructor(
        @InjectRepository(Transaccion)
        private readonly repository: Repository<Transaccion>,
    ) { }

    async crear(usuario_id: string, monto: number, tipo: string): Promise<Transaccion> {
        const transaccion = this.repository.create({ usuario_id, monto, tipo });
        return this.repository.save(transaccion);
    }

    async eliminar(transaccion_id: string): Promise<void> {
        await this.repository.delete(transaccion_id);
    }

    async obtenerPorUsuario(usuario_id: string): Promise<Transaccion[]> {
        return this.repository.find({ where: { usuario_id } });
    }

    async obtenerPorTipo(tipo: string): Promise<Transaccion[]> {
        return this.repository.find({ where: { tipo } });
    }
}