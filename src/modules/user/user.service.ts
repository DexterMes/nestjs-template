import { Injectable } from "@nestjs/common"
import { CloudinaryService } from "src/cloudinary/cloudinary.service"
import { NotAuthorizedError } from "src/errors/api-error"

import { UserRepository } from "./user.repository"

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  async getProfile(id: string) {
    const user = await this.repository.getUser(id)
    if (!user) throw new NotAuthorizedError()

    return user
  }

  async update(id: string, data: any, avatar?: Express.Multer.File) {
    const user = await this.repository.getUser(id)
    if (!user) throw new NotAuthorizedError()

    let uploadedAvatarUrl = user.avatarURL
    if (avatar) uploadedAvatarUrl = await this.cloudinaryService.upload(avatar, "avatar")

    const updatedUser = await this.repository.updateUser(id, { ...data, avatarURL: uploadedAvatarUrl })

    if (user.avatarURL && user.avatarURL !== uploadedAvatarUrl) await this.cloudinaryService.deleteByUrl(user.avatarURL, "avatar")

    return updatedUser
  }
}
