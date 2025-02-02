import { ICommand } from '@nestjs/cqrs';

export class RegistrarTransaccionCommand implements ICommand {
    constructor(
        public readonly usuario_id: string,
        public readonly monto: number,
        public readonly tipo: string,
    ) { }
}