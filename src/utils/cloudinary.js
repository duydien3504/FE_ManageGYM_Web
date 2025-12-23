/**
 * Upload image to Cloudinary
 * @param {File} file - Image file to upload
 * @param {string} uploadPreset - Cloudinary upload preset (e.g., 'gym_exercises')
 * @returns {Promise<string>} - Cloudinary image URL
 */
export const uploadToCloudinary = async (file, uploadPreset = 'gym_exercises') => {
   const cloudName = 'danmykugj'; // Your Cloudinary cloud name

   const formData = new FormData();
   formData.append('file', file);
   formData.append('upload_preset', uploadPreset);

   try {
      const response = await fetch(
         `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
         {
            method: 'POST',
            body: formData,
         }
      );

      if (!response.ok) {
         throw new Error('Failed to upload image to Cloudinary');
      }

      const data = await response.json();
      return data.secure_url;
   } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw error;
   }
};

/**
 * Upload video to Cloudinary
 * @param {File} file - Video file to upload
 * @param {string} uploadPreset - Cloudinary upload preset
 * @returns {Promise<string>} - Cloudinary video URL
 */
export const uploadVideoToCloudinary = async (file, uploadPreset = 'gym_exercises') => {
   const cloudName = 'danmykugj'; // Your Cloudinary cloud name

   const formData = new FormData();
   formData.append('file', file);
   formData.append('upload_preset', uploadPreset);
   formData.append('resource_type', 'video');

   try {
      const response = await fetch(
         `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
         {
            method: 'POST',
            body: formData,
         }
      );

      if (!response.ok) {
         throw new Error('Failed to upload video to Cloudinary');
      }

      const data = await response.json();
      return data.secure_url;
   } catch (error) {
      console.error('Cloudinary video upload error:', error);
      throw error;
   }
};
