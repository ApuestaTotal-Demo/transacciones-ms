import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';

import { TransaccionesController } from './transacciones.controller';
import { TransaccionesService } from './transacciones.service';

import { Transaccion } from './entities/transaccion.entity';

import { TransaccionesSaga } from './sagas/transacciones.saga';
import { KafkaService } from '../shared/kafka/kafka.service';
import { KafkaConsumerService } from '../shared/kafka/kafka-consumer.service';
import { TransaccionRepository } from './repositories/transaccion.repository';

import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';
import { EventHandlers } from './events/handlers';

@Module({
    imports: [CqrsModule, TypeOrmModule.forFeature([Transaccion])],
    controllers: [TransaccionesController],
    providers: [
        TransaccionesService,
        TransaccionRepository,
        
        ...CommandHandlers,
        ...QueryHandlers,
        ...EventHandlers,
        TransaccionesSaga,
        KafkaService,
        KafkaConsumerService,
    ],
})
export class TransaccionesModule { }