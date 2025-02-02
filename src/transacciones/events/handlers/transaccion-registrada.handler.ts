import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TransaccionRegistradaEvent } from '../impl/transaccion-registrada.event';

@EventsHandler(TransaccionRegistradaEvent)
export class TransaccionRegistradaHandler implements IEventHandler<TransaccionRegistradaEvent> {
    constructor() { }

    async handle(event: TransaccionRegistradaEvent): Promise<void> {

    }
}