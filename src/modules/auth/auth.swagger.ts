import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger"

import { USER_ERROR_MESSAGE, USER_SUCCESS_MESSAGE } from "./auth.constant"

export const loginDocs = {
  operation: ApiOperation({
    summary: "User login",
    description: "Authenticate a user and return access/refresh tokens."
  }),
  body: ApiBody({
    description: "Login credentials",
    schema: {
      example: {
        email: "user@example.com",
        password: "your_secure_password"
      }
    }
  }),
  responses: {
    success: ApiResponse({
      status: 200,
      description: "Login successful.",
      schema: {
        example: {
          success: true,
          message: USER_SUCCESS_MESSAGE.SUCCESS_ON_LOGIN,
          data: {
            id: "user-id",
            email: "user@example.com",
            firstName: "John",
            lastName: "Doe",
            accessToken: "<jwt_access_token>",
            refreshToken: "<jwt_refresh_token>"
          }
        }
      }
    }),
    badRequest: ApiResponse({
      status: 400,
      description: USER_ERROR_MESSAGE.ERROR_ON_LOGIN
    })
  }
}

export const registerDocs = {
  operation: ApiOperation({
    summary: "User registration",
    description: "Registers a new user and returns tokens upon success."
  }),
  body: ApiBody({
    description: "Registration data",
    schema: {
      example: {
        firstName: "John",
        lastName: "Doe",
        email: "user@example.com",
        password: "your_secure_password"
      }
    }
  }),
  responses: {
    success: ApiResponse({
      status: 201,
      description: "Registration successful.",
      schema: {
        example: {
          success: true,
          message: USER_SUCCESS_MESSAGE.SUCCESS_ON_REGISTRATION,
          data: {
            id: "user-id",
            email: "user@example.com",
            firstName: "John",
            lastName: "Doe",
            accessToken: "<jwt_access_token>",
            refreshToken: "<jwt_refresh_token>"
          }
        }
      }
    }),
    badRequest: ApiResponse({
      status: 400,
      description: USER_ERROR_MESSAGE.USER_ALREADY_EXISTS
    })
  }
}

export const refreshDocs = {
  operation: ApiOperation({
    summary: "Refresh tokens",
    description: "Refresh access and refresh tokens using a valid refresh token."
  }),
  body: ApiBody({
    description: "Refresh token request",
    schema: {
      example: {
        refreshToken: "<jwt_refresh_token>"
      }
    }
  }),
  responses: {
    success: ApiResponse({
      status: 200,
      description: "Tokens refreshed successfully.",
      schema: {
        example: {
          success: true,
          message: USER_SUCCESS_MESSAGE.TOKEN_REFRESH,
          data: {
            id: "user-id",
            email: "user@example.com",
            firstName: "John",
            lastName: "Doe",
            accessToken: "<new_access_token>",
            refreshToken: "<new_refresh_token>"
          }
        }
      }
    }),
    badRequest: ApiResponse({
      status: 400,
      description: USER_ERROR_MESSAGE.USER_NOT_FOUND
    })
  }
}
