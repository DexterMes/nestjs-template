import { ArgumentsHost, Catch, HttpStatus } from "@nestjs/common"
import { BaseExceptionFilter } from "@nestjs/core"
import { Prisma } from "@prisma/client"
import { logger } from "src/utils"

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const response = context.getResponse()
    let fields: Array<string>
    let message: string

    logger.error(JSON.stringify(exception.message))

    switch (exception.code) {
      case "P2002":
        fields = exception.meta?.target as Array<string>
        message = `Unique constraint failed on the fields '${fields.join(",")}'`
        response.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message
        })
        break
      case "P2006":
        fields = exception.meta?.target as Array<string>
        message = `The provide value for '${fields.join(",")}' is invalid`
        response.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message
        })
        break
      case "P2014":
        fields = exception.meta?.target as Array<string>
        message = `Invalid ID: '${fields.join(",")}'`
        response.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message
        })
        break
      case "P2025":
        fields = exception.meta?.target as Array<string>
        message = "Database Record not found"
        response.status(HttpStatus.NOT_FOUND).json({
          success: false,
          message
        })
        break
      default:
        logger.error("Prisma Error", exception)
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: "Internal Server Error"
        })
        break
    }
  }
}
