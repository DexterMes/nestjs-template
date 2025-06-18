import { Injectable } from "@nestjs/common"
import { CloudinaryService } from "src/cloudinary/cloudinary.service"
import { BadRequestError, NotFoundError } from "src/errors/api-error"

import { EVENT_ERROR_MESSAGE } from "./event.constant"
import { EventBodyDto, EventDto } from "./event.dto"
import { EventRepository } from "./event.repository"

@Injectable()
export class EventService {
  constructor(
    private readonly repository: EventRepository,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  async postCreate(payload: EventBodyDto, files: { images?: Express.Multer.File[]; files?: Express.Multer.File[]; banner?: Express.Multer.File[] }) {
    if (!files.banner || !files.banner[0]) throw new BadRequestError(EVENT_ERROR_MESSAGE.BANNER_MISSING)

    const uploadedImages = await Promise.all((files.images || []).map((file) => this.cloudinaryService.upload(file, "events/images")))
    const uploadedFiles = await Promise.all((files.files || []).map((file) => this.cloudinaryService.upload(file, "events/files")))
    const uploadedBanner = await this.cloudinaryService.upload(files.banner[0], "events/banner")

    const event = await this.repository.create({ ...payload, images: uploadedImages, files: uploadedFiles, banner: uploadedBanner })
    return event
  }

  async getFindAll() {
    const event = await this.repository.find()
    return event
  }

  async getFindOne(id: string) {
    const event = await this.repository.findById(id)
    if (!event) throw new NotFoundError()
    return event
  }

  async patchUpdate(id: string, payload: EventDto, files: { images?: Express.Multer.File[]; files?: Express.Multer.File[]; banner?: Express.Multer.File[] }) {
    const existingImages = payload.images ?? []
    const existingFiles = payload.files ?? []
    const newImages = files?.images ?? []
    const newFiles = files?.files ?? []

    if (existingImages.length + newImages.length > 3) throw new BadRequestError(EVENT_ERROR_MESSAGE.IMAGES_EXCEEDED_LIMIT)
    if (existingFiles.length + newFiles.length > 3) throw new BadRequestError(EVENT_ERROR_MESSAGE.FILES_EXCEEDED_LIMIT)

    const event = await this.repository.findById(id)
    if (!event) throw new NotFoundError()

    const uploadedImages = await Promise.all(newImages.map((file) => this.cloudinaryService.upload(file, "events/images")))
    const uploadedFiles = await Promise.all(newFiles.map((file) => this.cloudinaryService.upload(file, "events/files")))

    let uploadedBanner = event.banner
    if (files.banner?.[0]) uploadedBanner = await this.cloudinaryService.upload(files.banner[0], "events/banner")

    const updatedEvent = await this.repository.update(id, {
      ...payload,
      banner: uploadedBanner,
      images: [...uploadedImages, ...existingImages],
      files: [...uploadedFiles, ...existingFiles]
    })

    if (event.banner !== uploadedBanner) await this.cloudinaryService.deleteByUrl(event.banner, "events/banner")

    const removedImages = (event.images ?? []).filter((img) => !existingImages.includes(img))
    const removedFiles = (event.files ?? []).filter((file) => !existingFiles.includes(file))

    await Promise.allSettled([
      ...removedImages.map((url) => this.cloudinaryService.deleteByUrl(url, "events/images")),
      ...removedFiles.map((url) => this.cloudinaryService.deleteByUrl(url, "events/files"))
    ])

    return updatedEvent
  }
}
