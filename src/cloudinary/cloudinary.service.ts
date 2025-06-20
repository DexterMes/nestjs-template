import { Injectable, OnModuleInit } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import * as toStream from "buffer-to-stream"
import { v2 as cloudinary } from "cloudinary"

@Injectable()
export class CloudinaryService implements OnModuleInit {
  constructor(private readonly config: ConfigService) {}

  onModuleInit() {
    cloudinary.config({
      cloud_name: this.config.get("cloudinaryConfig").CLOUDINARY_CLOUD_NAME,
      api_key: this.config.get("cloudinaryConfig").CLOUDINARY_API_KEY,
      api_secret: this.config.get("cloudinaryConfig").CLOUDINARY_API_SECRET
    })
  }

  private extractPublicId(url: string, folder: string): string {
    const parts = url.split("/")
    const fileWithExt = parts.pop()
    const fileName = fileWithExt?.split(".")[0]
    console.log("Deleting Cloudinary public ID:", `${folder}/${fileName}`)
    return `${folder}/${fileName}`
  }

  async upload(file: Express.Multer.File, folder: string): Promise<string> {
    return new Promise((resolve, reject) => {
      toStream(file.buffer).pipe(
        cloudinary.uploader.upload_stream({ folder }, (error, result) => {
          if (error) return reject(error)
          resolve(result.secure_url)
        })
      )
    })
  }

  async deleteByUrl(url: string, folder: string): Promise<void> {
    const publicId = this.extractPublicId(url, folder)
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error) => {
        if (error) return reject(error)
        resolve()
      })
    })
  }
}
