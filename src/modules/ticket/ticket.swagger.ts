import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger"

import { TICKET_SUCCESS_MESSAGE } from "./ticket.constant"

const exampleTicket = {
  id: "f3c8e774-9c4f-4fa7-a1b0-dc00e9e04f8a",
  eventId: "9cfe274d-e5e4-4202-96e0-d304a287894c",
  userId: "7ae9d8d5-e1e1-49a5-9425-d45a14ce67e4",
  amount: 2,
  contact: "9876543210",
  createdAt: "2025-06-20T08:00:00Z"
}

export const createTicketDocs = {
  operation: ApiOperation({
    summary: "Create a new ticket",
    description: "Creates a ticket for a given event by the authenticated user."
  }),
  body: ApiBody({
    description: "Ticket creation data",
    schema: {
      type: "object",
      required: ["eventId", "amount", "contact"],
      properties: {
        eventId: { type: "string", format: "uuid" },
        amount: { type: "integer", example: 2 },
        contact: { type: "string", example: "9876543210" }
      }
    }
  }),
  responses: {
    success: ApiResponse({
      status: 201,
      description: "Ticket created successfully.",
      schema: {
        example: {
          success: true,
          message: TICKET_SUCCESS_MESSAGE.SUCCESS_ON_CREATE,
          data: exampleTicket
        }
      }
    }),
    badRequest: ApiResponse({
      status: 400,
      description: "Missing required fields or invalid data."
    })
  }
}

export const getAllTicketsDocs = {
  operation: ApiOperation({
    summary: "Get all tickets of authenticated user",
    description: "Returns all tickets created by the currently logged-in user."
  }),
  responses: {
    success: ApiResponse({
      status: 200,
      description: "Tickets fetched successfully.",
      schema: {
        example: {
          success: true,
          message: TICKET_SUCCESS_MESSAGE.SUCCESS_ON_FIND,
          data: [exampleTicket]
        }
      }
    })
  }
}

export const getTicketsByEventDocs = {
  operation: ApiOperation({
    summary: "Get tickets of an event by ID",
    description: "Returns all tickets of a specific event. Only accessible by the event's creator."
  }),
  responses: {
    success: ApiResponse({
      status: 200,
      description: "Tickets fetched successfully.",
      schema: {
        example: {
          success: true,
          message: TICKET_SUCCESS_MESSAGE.SUCCESS_ON_FIND,
          data: [exampleTicket]
        }
      }
    }),
    notFound: ApiResponse({
      status: 404,
      description: "Event not found."
    }),
    unauthorized: ApiResponse({
      status: 403,
      description: "Not authorized to access these tickets."
    })
  }
}
