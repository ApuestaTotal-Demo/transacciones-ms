import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TransaccionRevertidaEvent } from '../impl/transaccion-revertida.event';

@EventsHandler(TransaccionRevertidaEvent)
export class TransaccionRevertidaHandler implements IEventHandler<TransaccionRevertidaEvent> {
    constructor() { }

    async handle(event: TransaccionRevertidaEvent): Promise<void> {

    }
}