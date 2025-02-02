import { Injectable } from '@nestjs/common';
import { Saga, CommandBus } from '@nestjs/cqrs';
import { Observable, filter, map } from 'rxjs';

import { DepositoRealizadoEvent } from '../../shared/events/cuentas/deposito-realizado.event';
import { RetiroRealizadoEvent } from '../../shared/events/cuentas/retiro-realizado.event';

import { TransaccionRegistradaEvent } from '../events/impl/transaccion-registrada.event';

import { RegistrarTransaccionCommand } from '../commands/impl/registrar-transaccion.command';
//import { RevertirTransaccionCommand } from '../commands/impl/revertir-transaccion.command';

@Injectable()
export class TransaccionesSaga {
    constructor(private readonly commandBus: CommandBus) { }

    @Saga()
    depositoRealizado = (events$: Observable<any>): Observable<void> => {
        return events$.pipe(
            filter((event) => event instanceof DepositoRealizadoEvent),
            map((event: DepositoRealizadoEvent) => {
                console.log('Saga:depositoRealizado', { event });

                const { usuario_id, monto } = event;
                this.commandBus.execute(
                    new RegistrarTransaccionCommand(usuario_id, monto, 'deposito'),
                );
            }),
        );
    };

    @Saga()
    retiroRealizado = (events$: Observable<any>): Observable<void> => {
        return events$.pipe(
            filter((event) => event instanceof RetiroRealizadoEvent),
            map((event: RetiroRealizadoEvent) => {
                console.log('Saga:retiroRealizado', { event });

                const { usuario_id, monto } = event;
                this.commandBus.execute(
                    new RegistrarTransaccionCommand(usuario_id, monto, 'retiro'),
                );
            }),
        );
    };

    @Saga()
    transaccionRegistrada = (events$: Observable<any>): Observable<void> => {
        return events$.pipe(
            filter((event) => event instanceof TransaccionRegistradaEvent),
            map((event: TransaccionRegistradaEvent) => {
                console.log('Saga:transaccionRegistrada', { event });

                const { usuario_id, monto } = event;
                this.commandBus.execute(
                    new RegistrarTransaccionCommand(usuario_id, monto, 'compra'),
                );
            }),
        );
    };
}