import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { Kafka, Consumer } from 'kafkajs';

import { DepositoRealizadoEvent } from '../events/cuentas/deposito-realizado.event';
import { RetiroRealizadoEvent } from '../events/cuentas/retiro-realizado.event';

import { TransaccionRegistradaEvent } from '../../transacciones/events/impl/transaccion-registrada.event';

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
    private consumer: Consumer;

    constructor(private readonly eventBus: EventBus) {
        this.consumer = new Kafka({
            clientId: 'transacciones-service',
            brokers: ['92.118.57.218:9092'],
        }).consumer({ groupId: 'transacciones-group' });
    }

    async onModuleInit() {
        await this.consumer.connect();
        await this.consumer.subscribe({ topic: 'deposito-realizado', fromBeginning: true });
        await this.consumer.subscribe({ topic: 'retiro-realizado', fromBeginning: true });
        await this.consumer.subscribe({ topic: 'transaccion-registrada', fromBeginning: true });

        await this.consumer.run({
            eachMessage: async ({ topic, message }) => {
                const event = JSON.parse(message.value.toString());
                console.log("KafkaConsumerService:run", { topic, event });

                switch (topic) {
                    case 'deposito-realizado':
                        this.eventBus.publish(new DepositoRealizadoEvent(event.usuario_id, event.monto));
                        break;
                    case 'retiro-realizado':
                        this.eventBus.publish(new RetiroRealizadoEvent(event.usuario_id, event.monto));
                        break;
                    case 'transaccion-registrada':
                        this.eventBus.publish(
                            new TransaccionRegistradaEvent(
                                event.transaccion_id,
                                event.usuario_id,
                                event.monto,
                            ),
                        );
                        break;
                }
            },
        });
    }
}