import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("transacciones")
export class Transaccion {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    usuario_id: string;

    @Column('decimal', { precision: 10, scale: 2 })
    monto: number;

    @Column({ type: 'enum', enum: ['deposito', 'retiro', 'compra'], default: 'deposito' })
    tipo: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fecha: Date;
}