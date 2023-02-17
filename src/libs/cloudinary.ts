import { v2 as cloudinaryApp } from "cloudinary"

const cloudinary = () => {
  cloudinaryApp.config({
    cloud_name: process.env.CLOUDYNARY_NAME,
    api_key: process.env.CLOUDYNARY_API_KEY,
    api_secret: process.env.CLOUDYNARY_API_SECRET,
    secure: true
  })
  return cloudinaryApp
}

export default cloudinary