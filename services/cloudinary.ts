import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from '../constants';

export async function uploadImageToCloudinary(imageUri: string): Promise<string> {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    throw new Error('Cloudinary no está configurado en el archivo .env');
  }

  const formData = new FormData();

  formData.append('file', {
    uri: imageUri,
    type: 'image/jpeg',
    name: `product-${Date.now()}.jpg`,
  } as any);

  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.error?.message || 'No se pudo subir la imagen a Cloudinary');
  }

  return result.secure_url;
}