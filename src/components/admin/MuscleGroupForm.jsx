import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { adminService } from '../../services/api/admin.service';

const MuscleGroupForm = ({ isOpen, onClose, muscleGroup, onSuccess }) => {
   const [formData, setFormData] = useState({
      group_name: '',
      description: '',
      thumbnail_url: '',
   });
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');

   useEffect(() => {
      if (muscleGroup) {
         setFormData({
            group_name: muscleGroup.group_name || '',
            description: muscleGroup.description || '',
            thumbnail_url: muscleGroup.thumbnail_url || '',
         });
      } else {
         setFormData({
            group_name: '',
            description: '',
            thumbnail_url: '',
         });
      }
   }, [muscleGroup, isOpen]);

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
      setError('');
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');

      try {
         if (muscleGroup) {
            await adminService.updateMuscleGroup(muscleGroup.group_id, formData);
         } else {
            await adminService.createMuscleGroup(formData);
         }

         if (onSuccess) onSuccess();
         onClose();
      } catch (err) {
         setError(err.message || 'Failed to save muscle group');
      } finally {
         setLoading(false);
      }
   };

   return (
      <Modal
         isOpen={isOpen}
         onClose={onClose}
         title={muscleGroup ? 'Chỉnh sửa nhóm cơ' : 'Tạo nhóm cơ mới'}
      >
         <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
               <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {error}
               </div>
            )}

            <div>
               <label className="block text-sm font-medium text-moss-text mb-2">
                  Tên nhóm cơ <span className="text-red-500">*</span>
               </label>
               <input
                  type="text"
                  name="group_name"
                  value={formData.group_name}
                  onChange={handleChange}
                  required
                  placeholder="Ví dụ: Chest, Back, Legs..."
                  className="w-full px-4 py-3 bg-moss-surface border border-moss-border rounded-lg text-moss-text placeholder-moss-muted focus:outline-none focus:ring-2 focus:ring-primary"
               />
            </div>

            <div>
               <label className="block text-sm font-medium text-moss-text mb-2">
                  Mô tả
               </label>
               <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Mô tả về nhóm cơ..."
                  className="w-full px-4 py-3 bg-moss-surface border border-moss-border rounded-lg text-moss-text placeholder-moss-muted focus:outline-none focus:ring-2 focus:ring-primary resize-none"
               />
            </div>

            <div>
               <label className="block text-sm font-medium text-moss-text mb-2">
                  Thumbnail URL
               </label>
               <input
                  type="url"
                  name="thumbnail_url"
                  value={formData.thumbnail_url}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-4 py-3 bg-moss-surface border border-moss-border rounded-lg text-moss-text placeholder-moss-muted focus:outline-none focus:ring-2 focus:ring-primary"
               />
            </div>

            <button
               type="submit"
               disabled={loading}
               className="w-full h-12 px-6 rounded-full bg-primary hover:bg-[#b8c755] text-moss-deep font-bold transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
               {loading ? 'Đang lưu...' : muscleGroup ? 'Cập nhật' : 'Tạo mới'}
            </button>
         </form>
      </Modal>
   );
};

export default MuscleGroupForm;
