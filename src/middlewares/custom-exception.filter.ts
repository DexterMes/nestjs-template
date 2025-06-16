import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  PreconditionFailedException
} from "@nestjs/common"
import { logger } from "src/utils"

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const response = context.getResponse()

    if (exception instanceof HttpException) {
      if (exception instanceof PreconditionFailedException) {
        const errors = exception.getResponse() as { message: unknown; error: string; status: number }
        response.status(exception.getStatus()).json({
          success: false,
          message: errors.error,
          details: errors.message
        })
      } else {
        const errors = exception.getResponse() as { message: string }

        response.status(exception.getStatus()).json({
          success: false,
          message: errors.message
        })
      }
      logger.error(JSON.stringify(exception.getResponse()))
    } else {
      logger.error(JSON.stringify(exception))
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error"
      })
    }
  }
}
