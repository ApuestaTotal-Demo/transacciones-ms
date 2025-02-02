import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TransaccionRepository } from '../../repositories/transaccion.repository';
import { KafkaService } from '../../../shared/kafka/kafka.service';
import { TransaccionRevertidaEvent } from '../../events/impl/transaccion-revertida.event';
import { RevertirTransaccionCommand } from '../impl/revertir-transaccion.command';

@CommandHandler(RevertirTransaccionCommand)
export class RevertirTransaccionHandler implements ICommandHandler<RevertirTransaccionCommand> {
    constructor(
        private readonly repository: TransaccionRepository,
        private readonly kafkaService: KafkaService,
    ) { }

    async execute(command: RevertirTransaccionCommand): Promise<void> {
        const { transaccion_id } = command;

        // Eliminar la transacción
        await this.repository.eliminar(transaccion_id);

        // Publicar evento "TransaccionRevertida"
        const evento = new TransaccionRevertidaEvent(transaccion_id);
        await this.kafkaService.emit('transaccion-revertida', evento);
    }
}