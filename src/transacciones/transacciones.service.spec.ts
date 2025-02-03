import { Test, TestingModule } from '@nestjs/testing';
import { TransaccionesService } from './transacciones.service';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { ObtenerTransaccionesPorUsuarioQuery } from './queries/impl/obtener-transacciones-por-usuario.query';
import { ObtenerTransaccionesPorTipoQuery } from './queries/impl/obtener-transacciones-por-tipo.query';

describe('TransaccionesService', () => {
    let service: TransaccionesService;
    let queryBus: QueryBus;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TransaccionesService,
                {
                    provide: QueryBus,
                    useValue: {
                        execute: jest.fn(),
                    },
                },
                {
                    provide: CommandBus,
                    useValue: {},
                },
            ],
        }).compile();

        service = module.get<TransaccionesService>(TransaccionesService);
        queryBus = module.get<QueryBus>(QueryBus);
    });

    it('debería estar definido', () => {
        expect(service).toBeDefined();
    });

    it('debería ejecutar "obtenerTransaccionesPorUsuario" con el QueryBus', async () => {
        const usuario_id = '123';
        const mockResult = [{ id: 't1', amount: 100 }];

        jest.spyOn(queryBus, 'execute').mockResolvedValueOnce(mockResult);

        const result = await service.obtenerTransaccionesPorUsuario(usuario_id);

        expect(queryBus.execute).toHaveBeenCalledWith(new ObtenerTransaccionesPorUsuarioQuery(usuario_id));
        expect(result).toEqual(mockResult);
    });

    it('debería ejecutar "obtenerTransaccionesPorTipo" con el QueryBus', async () => {
        const tipo = 'compra';
        const mockResult = [{ id: 't2', amount: 200 }];

        jest.spyOn(queryBus, 'execute').mockResolvedValueOnce(mockResult);

        const result = await service.obtenerTransaccionesPorTipo(tipo);

        expect(queryBus.execute).toHaveBeenCalledWith(new ObtenerTransaccionesPorTipoQuery(tipo));
        expect(result).toEqual(mockResult);
    });
});
