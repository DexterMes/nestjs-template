import { ApiBody, ApiConsumes, ApiOperation, ApiResponse } from "@nestjs/swagger"

import { EVENT_SUCCESS_MESSAGE } from "./event.constant"

const exampleEvent = {
  title: "Tech Talk 2025",
  description: "An exciting tech event featuring industry leaders.",
  contact: "9876543210",
  date: "2025-06-20T10:00:00Z",
  venue: "Auditorium",
  timeSlot: "10:00-12:00",
  category: "Seminar",
  capacity: 150,
  department: "Computer Science",
  club: "Tech Club",
  images: ["https://example.com/image1.jpg"],
  files: ["https://example.com/file1.pdf"],
  banner: "https://example.com/banner.jpg"
}

export const createEventDocs = {
  operation: ApiOperation({
    summary: "Create a new event",
    description: "Uploads banner, optional images/files, and creates a new event."
  }),
  consumes: ApiConsumes("multipart/form-data"),
  body: ApiBody({
    description: "Event creation data",
    schema: {
      type: "object",
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        contact: { type: "string" },
        date: { type: "string", format: "date-time" },
        venue: { type: "string" },
        timeSlot: { type: "string", example: "10:00-12:00" },
        category: { type: "string" },
        capacity: { type: "integer", nullable: true },
        department: { type: "string", nullable: true },
        club: { type: "string", nullable: true },
        banner: { type: "string", format: "binary" },
        images: { type: "array", items: { type: "string", format: "binary" } },
        files: { type: "array", items: { type: "string", format: "binary" } }
      }
    }
  }),
  responses: {
    success: ApiResponse({
      status: 201,
      description: "Event created successfully.",
      schema: {
        example: {
          success: true,
          message: EVENT_SUCCESS_MESSAGE.SUCCESS_ON_CREATE,
          data: exampleEvent
        }
      }
    }),
    badRequest: ApiResponse({
      status: 400,
      description: "Missing required fields or invalid data."
    })
  }
}

export const getAllEventsDocs = {
  operation: ApiOperation({
    summary: "Get all events",
    description: "Returns a list of all events."
  }),
  responses: {
    success: ApiResponse({
      status: 200,
      description: "All events fetched successfully.",
      schema: {
        example: {
          success: true,
          message: EVENT_SUCCESS_MESSAGE.SUCCESS_ON_FIND,
          data: [exampleEvent]
        }
      }
    })
  }
}

export const getEventByIdDocs = {
  operation: ApiOperation({
    summary: "Get a single event",
    description: "Returns the details of a specific event by ID."
  }),
  responses: {
    success: ApiResponse({
      status: 200,
      description: "Event found successfully.",
      schema: {
        example: {
          success: true,
          message: EVENT_SUCCESS_MESSAGE.SUCCESS_ON_FINDONE,
          data: exampleEvent
        }
      }
    }),
    notFound: ApiResponse({
      status: 404,
      description: "Event not found."
    })
  }
}

export const getAllMyEventsDocs = {
  operation: ApiOperation({
    summary: "Get all events of creator.",
    description: "Returns a list of all events of requestor."
  }),
  responses: {
    success: ApiResponse({
      status: 200,
      description: "All events fetched successfully.",
      schema: {
        example: {
          success: true,
          message: EVENT_SUCCESS_MESSAGE.SUCCESS_ON_FIND,
          data: [exampleEvent]
        }
      }
    })
  }
}

export const updateEventDocs = {
  operation: ApiOperation({
    summary: "Update an event",
    description: "Updates event details and manages media files."
  }),
  consumes: ApiConsumes("multipart/form-data"),
  body: ApiBody({
    description: "Event update data",
    schema: {
      type: "object",
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        contact: { type: "string" },
        date: { type: "string", format: "date-time" },
        venue: { type: "string" },
        timeSlot: { type: "string", example: "10:00-12:00" },
        category: { type: "string" },
        capacity: { type: "integer", nullable: true },
        department: { type: "string", nullable: true },
        club: { type: "string", nullable: true },
        banner: { type: "string", format: "binary" },
        images: { type: "array", items: { type: "string", format: "binary" } },
        files: { type: "array", items: { type: "string", format: "binary" } }
      }
    }
  }),
  responses: {
    success: ApiResponse({
      status: 200,
      description: "Event updated successfully.",
      schema: {
        example: {
          success: true,
          message: EVENT_SUCCESS_MESSAGE.SUCCESS_ON_UPDATE,
          data: exampleEvent
        }
      }
    }),
    notFound: ApiResponse({
      status: 404,
      description: "Event not found."
    }),
    badRequest: ApiResponse({
      status: 400,
      description: "Validation failed or file upload limits exceeded."
    })
  }
}
