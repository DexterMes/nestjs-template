export const API_ERROR_MESSAGE_CONSTANT = {
  INTERNAL_SERVER_ERROR: "Internal Server Error.",
  UNAUTHORIZED_ERROR: "Invalid Credentials!",
  BAD_REQUEST_ERROR: "Bad Request",
  NOT_FOUND_ERROR: "Request not found",
  VALIDATION_ERROR: "Request Validation Error",
  TOKEN_EXPIRED: "Jwt token expired",
  SESSION_EXPIRED: "Session has expired"
}

export enum HttpStatusEnum {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_ERROR = 500,
  REQUES_VALIDATION_ERROR = 412
}
