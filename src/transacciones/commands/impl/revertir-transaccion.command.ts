import { ICommand } from '@nestjs/cqrs';

export class RevertirTransaccionCommand implements ICommand {
    constructor(public readonly transaccion_id: string) { }
}