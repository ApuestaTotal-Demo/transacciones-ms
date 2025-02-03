import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch(Error)
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        console.log("GlobalExceptionFilter", {message: exception.message});

        // Manejar "invalid input value for enum transacciones_tipo_enum"
        if (exception.message.includes("invalid input value for enum transacciones_tipo_enum")) {
            response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'El tipo de valor proporcionado es inválido (deposito, retiro, compra)',
            });
        }
        // Manejar otros errores genéricos
        else {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Error interno del servidor',
            });
        }
    }
}