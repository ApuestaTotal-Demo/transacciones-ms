import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { TransaccionRepository } from '../../repositories/transaccion.repository';
import { KafkaService } from '../../../shared/kafka/kafka.service';
import { RegistrarTransaccionCommand } from '../impl/registrar-transaccion.command';

@CommandHandler(RegistrarTransaccionCommand)
export class RegistrarTransaccionHandler implements ICommandHandler<RegistrarTransaccionCommand> {
    constructor(
        private readonly repository: TransaccionRepository
    ) { }

    async execute(command: RegistrarTransaccionCommand): Promise<void> {
        const { usuario_id, monto, tipo } = command;

        // Registrar la transacción
        const transaccion = await this.repository.crear(usuario_id, monto, tipo);
        console.log("RegistrarTransaccionCommand:execute", transaccion);
    }
}