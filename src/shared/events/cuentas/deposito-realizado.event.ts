export class DepositoRealizadoEvent {
    constructor(
        public readonly usuario_id: string,
        public readonly monto: number,
    ) { }
}