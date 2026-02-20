// Cloudinary upload helper
// Requires your Cloudinary unsigned upload_preset and cloud_name

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/";
const CLOUD_NAME = "dvd0jsife"; 
const UPLOAD_PRESET = "tpywhdwr"; 

export async function uploadImageToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(`${CLOUDINARY_URL}${CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) throw new Error("Image upload failed");
  const data = await response.json();
  return data.secure_url;
}
