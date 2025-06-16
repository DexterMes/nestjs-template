import { ValidationError } from "joi"

import { API_ERROR_MESSAGE_CONSTANT, HttpStatusEnum } from "./api-error-message"

export abstract class ApiError extends Error {
  abstract readonly statusCode: number

  constructor(message: string) {
    super(message)

    Object.setPrototypeOf(this, ApiError.prototype)
  }

  abstract serializeErrors(): {
    success: boolean
    message: string
    details?: { message: string; param: string | undefined }[]
  }
}

export class BadRequestError extends ApiError {
  readonly statusCode = HttpStatusEnum.BAD_REQUEST

  constructor(message: string) {
    super(message)

    Object.setPrototypeOf(this, BadRequestError.prototype)
  }

  serializeErrors() {
    return {
      success: false,
      message: this.message || API_ERROR_MESSAGE_CONSTANT.BAD_REQUEST_ERROR
    }
  }
}

export class InternalServerError extends ApiError {
  readonly statusCode = HttpStatusEnum.INTERNAL_ERROR

  constructor(message?: string) {
    super(message || API_ERROR_MESSAGE_CONSTANT.INTERNAL_SERVER_ERROR)

    Object.setPrototypeOf(this, InternalServerError.prototype)
  }

  serializeErrors() {
    return {
      success: false,
      message: API_ERROR_MESSAGE_CONSTANT.INTERNAL_SERVER_ERROR
    }
  }
}

export class DatabaseConnectionError extends ApiError {
  override readonly statusCode = HttpStatusEnum.INTERNAL_ERROR
  constructor() {
    super("Error connecting to db")

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  }

  serializeErrors() {
    return { success: false, message: this.message }
  }
}

export class NotAuthorizedError extends ApiError {
  override readonly statusCode = HttpStatusEnum.UNAUTHORIZED

  constructor(message?: string) {
    super(message || API_ERROR_MESSAGE_CONSTANT.UNAUTHORIZED_ERROR)

    Object.setPrototypeOf(this, NotAuthorizedError.prototype)
  }

  serializeErrors() {
    return {
      success: false,
      message: this.message || API_ERROR_MESSAGE_CONSTANT.UNAUTHORIZED_ERROR
    }
  }
}

export class JsonTokenExpiredError extends ApiError {
  override readonly statusCode = HttpStatusEnum.UNAUTHORIZED

  constructor(message?: string) {
    super(message || API_ERROR_MESSAGE_CONSTANT.TOKEN_EXPIRED)

    Object.setPrototypeOf(this, JsonTokenExpiredError.prototype)
  }

  serializeErrors() {
    return {
      success: false,
      message: this.message || API_ERROR_MESSAGE_CONSTANT.TOKEN_EXPIRED,
      isExpired: true
    }
  }
}

export class SessionExpiredError extends ApiError {
  override readonly statusCode = HttpStatusEnum.UNAUTHORIZED

  constructor(message?: string) {
    super(message || API_ERROR_MESSAGE_CONSTANT.SESSION_EXPIRED)

    Object.setPrototypeOf(this, SessionExpiredError.prototype)
  }

  serializeErrors() {
    return {
      success: false,
      message: this.message || API_ERROR_MESSAGE_CONSTANT.TOKEN_EXPIRED,
      isExpired: true
    }
  }
}

export class NotFoundError extends ApiError {
  override readonly statusCode = HttpStatusEnum.NOT_FOUND

  constructor() {
    super("Route not found")

    Object.setPrototypeOf(this, NotFoundError.prototype)
  }

  serializeErrors() {
    return {
      success: false,
      message: API_ERROR_MESSAGE_CONSTANT.NOT_FOUND_ERROR
    }
  }
}

export class ConflictError extends ApiError {
  override readonly statusCode = HttpStatusEnum.CONFLICT

  constructor(message: string) {
    super(message)

    Object.setPrototypeOf(this, ConflictError.prototype)
  }

  serializeErrors() {
    return { success: false, message: this.message }
  }
}

export class ContentNotFound extends ApiError {
  override readonly statusCode = 204

  constructor(message: string) {
    super(message)

    Object.setPrototypeOf(this, ContentNotFound.prototype)
  }

  serializeErrors() {
    return { success: false, message: this.message }
  }
}

export class DatabaseRecordNotFound extends ApiError {
  override readonly statusCode = HttpStatusEnum.NOT_FOUND

  constructor(message: string) {
    super(message)

    Object.setPrototypeOf(this, DatabaseRecordNotFound.prototype)
  }

  serializeErrors() {
    return { success: false, message: this.message }
  }
}

export class RequestValidationError extends ApiError {
  override readonly statusCode = HttpStatusEnum.REQUES_VALIDATION_ERROR

  constructor(public errors: ValidationError) {
    super("Invalid request parameters")

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype)
  }

  serializeErrors() {
    return {
      success: false,
      message: API_ERROR_MESSAGE_CONSTANT.VALIDATION_ERROR,
      details: this.errors.details.map((detail) => ({
        message: detail.message,
        param: detail.context?.key
      }))
    }
  }
}
