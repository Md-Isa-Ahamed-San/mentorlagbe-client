/**
 * Upload an image file to Cloudinary using an unsigned upload preset.
 * Images are stored inside the 'mentorlagbe' folder in your Cloudinary media library.
 * Returns the secure HTTPS URL of the uploaded image.
 *
 * Required env vars (client/.env.local):
 *   NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL     https://api.cloudinary.com/v1_1/djyzlmzoe/image/upload
 *   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET  your unsigned preset name  (e.g. ml_default)
 *   NEXT_PUBLIC_CLOUDINARY_FOLDER         target folder name         (e.g. mentorlagbe)
 */
export async function uploadToCloudinary(file: File): Promise<string> {
  const uploadUrl = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const folder = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER || 'mentorlagbe';

  if (!uploadUrl) {
    throw new Error('Cloudinary upload URL is not configured (NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL).');
  }
  if (!uploadPreset) {
    throw new Error('Cloudinary upload preset is not configured (NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET).');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('folder', folder); // ← organises uploads into this folder in Cloudinary

  const res = await fetch(uploadUrl, {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();

  if (!res.ok || data.error) {
    throw new Error(data.error?.message || 'Image upload to Cloudinary failed.');
  }

  // secure_url is the HTTPS CDN URL including the folder path
  return data.secure_url as string;
}

// Backwards-compatibility alias
export const uploadToImgBB = uploadToCloudinary;
