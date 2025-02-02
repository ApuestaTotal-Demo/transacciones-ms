export class TransaccionRegistradaEvent {
    constructor(
        public readonly transaccion_id: string,
        public readonly usuario_id: string,
        public readonly cuenta_id: string,
        public readonly monto: number,
        public readonly tipo: string,
    ) { }
}