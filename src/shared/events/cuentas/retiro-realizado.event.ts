export class RetiroRealizadoEvent {
    constructor(
        public readonly usuario_id: string,
        public readonly monto: number,
    ) { }
}