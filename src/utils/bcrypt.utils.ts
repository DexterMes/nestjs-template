import * as bcrypt from "bcrypt"

export const createHashPassword = (string: string) => {
  return bcrypt.hash(string, 10)
}

export const compareHashPassword = async (newPassword: string, oldPassword: string) => {
  try {
    const result = await bcrypt.compare(newPassword, oldPassword)
    return result
  } catch {
    return false
  }
}
