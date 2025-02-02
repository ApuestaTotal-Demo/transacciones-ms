export class SaldoReservadoEvent {
    constructor(
        public readonly usuario_id: string,
        public readonly cuenta_id: string,
        public readonly monto: number,
    ) { }
}