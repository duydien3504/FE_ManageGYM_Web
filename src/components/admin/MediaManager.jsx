import React, { useState } from 'react';
import Modal from '../common/Modal';
import { adminService } from '../../services/api/admin.service';

const MediaManager = ({ isOpen, onClose, exercise, onSuccess }) => {
   const [selectedFiles, setSelectedFiles] = useState([]);
   const [uploading, setUploading] = useState(false);
   const [error, setError] = useState('');

   const handleFileSelect = (e) => {
      const files = Array.from(e.target.files);
      if (files.length > 0) {
         setSelectedFiles(files);
         setError('');
      }
   };

   const handleUploadFiles = async () => {
      if (selectedFiles.length === 0) {
         setError('Vui lòng chọn file để upload');
         return;
      }

      // Validate exercise and exercise_id
      if (!exercise) {
         setError('Không tìm thấy thông tin bài tập');
         console.error('Exercise is null or undefined');
         return;
      }

      const exerciseId = exercise.exercise_id || exercise.id;
      if (!exerciseId) {
         setError('ID bài tập không hợp lệ. Vui lòng đóng và mở lại.');
         console.error('Invalid exercise object:', exercise);
         return;
      }

      setUploading(true);
      setError('');

      try {
         // Upload files to backend (backend will handle Cloudinary upload)
         await adminService.addExerciseMedia(exerciseId, selectedFiles);

         setSelectedFiles([]);
         if (onSuccess) onSuccess();
      } catch (err) {
         console.error('Upload error:', err);
         setError(err.message || 'Failed to upload files');
      } finally {
         setUploading(false);
      }
   };

   const handleDeleteMedia = async (mediaId) => {
      if (!window.confirm('Bạn có chắc muốn xóa media này?')) return;

      try {
         await adminService.deleteExerciseMedia(mediaId);
         if (onSuccess) onSuccess();
      } catch (err) {
         setError(err.message || 'Failed to delete media');
      }
   };

   if (!exercise) return null;

   return (
      <Modal
         isOpen={isOpen}
         onClose={onClose}
         title={`Quản lý Media - ${exercise.name || 'Bài tập'}`}
      >
         <div className="space-y-4">
            {error && (
               <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {error}
               </div>
            )}

            {/* Existing Media */}
            <div>
               <h4 className="text-sm font-semibold text-moss-text mb-3">Media hiện tại</h4>
               {exercise.media && exercise.media.length > 0 ? (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                     {exercise.media.map((media) => (
                        <div
                           key={media.media_id}
                           className="flex items-center justify-between p-3 rounded-lg bg-moss-surface border border-moss-border"
                        >
                           <div className="flex items-center gap-3 flex-1 min-w-0">
                              <span className={`material-symbols-outlined ${media.media_type === 'VIDEO' ? 'text-red-400' : 'text-blue-400'}`}>
                                 {media.media_type === 'VIDEO' ? 'videocam' : 'image'}
                              </span>
                              <div className="flex-1 min-w-0">
                                 <p className="text-xs text-moss-muted">{media.media_type}</p>
                                 <p className="text-sm text-moss-text truncate">{media.url}</p>
                              </div>
                           </div>
                           <button
                              onClick={() => handleDeleteMedia(media.media_id)}
                              className="size-8 rounded-full hover:bg-moss-card text-moss-muted hover:text-red-400 transition-all flex items-center justify-center"
                           >
                              <span className="material-symbols-outlined !text-lg">delete</span>
                           </button>
                        </div>
                     ))}
                  </div>
               ) : (
                  <p className="text-sm text-moss-muted text-center py-4">Chưa có media nào</p>
               )}
            </div>

            {/* Upload Files */}
            <div className="pt-4 border-t border-moss-border">
               <h4 className="text-sm font-semibold text-moss-text mb-3">Thêm media mới</h4>

               <div className="space-y-3">
                  <div>
                     <label className="block text-sm font-medium text-moss-text mb-2">
                        Chọn file (ảnh hoặc video)
                     </label>
                     <input
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        onChange={handleFileSelect}
                        className="w-full px-4 py-2 bg-moss-surface border border-moss-border rounded-lg text-moss-text text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-moss-deep hover:file:bg-[#b8c755]"
                     />
                     {selectedFiles.length > 0 && (
                        <div className="mt-2 space-y-1">
                           {selectedFiles.map((file, index) => (
                              <p key={index} className="text-xs text-moss-muted">
                                 {index + 1}. {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                              </p>
                           ))}
                        </div>
                     )}
                  </div>

                  <button
                     type="button"
                     onClick={handleUploadFiles}
                     disabled={selectedFiles.length === 0 || uploading}
                     className="w-full h-10 px-6 rounded-full bg-primary hover:bg-[#b8c755] text-moss-deep font-bold transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                     {uploading ? 'Đang upload...' : `Upload ${selectedFiles.length} file${selectedFiles.length > 1 ? 's' : ''}`}
                  </button>
               </div>
            </div>
         </div>
      </Modal>
   );
};

export default MediaManager;
