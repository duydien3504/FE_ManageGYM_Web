import React, { useState } from 'react';
import Modal from '../common/Modal';
import { plansService } from '../../services/api/plans.service';
import { toast } from 'react-hot-toast';

const CreatePlanModal = ({ isOpen, onClose, onSuccess }) => {
   const [formData, setFormData] = useState({
      plan_name: '',
      start_date: '',
      end_date: '',
      description: '',
   });
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');

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
         const response = await plansService.createPlan(formData);

         toast.success('Đã tạo kế hoạch thành công!');

         if (onSuccess) {
            onSuccess(response);
         }

         // Reset form and close
         setFormData({
            plan_name: '',
            start_date: '',
            end_date: '',
            description: '',
         });
         onClose();
      } catch (err) {
         const errorMessage = err.message || 'Failed to create plan. Please try again.';
         setError(errorMessage);
         toast.error(errorMessage);
      } finally {
         setLoading(false);
      }
   };

   return (
      <Modal isOpen={isOpen} onClose={onClose} title="Tạo kế hoạch tập luyện mới">
         <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message */}
            {error && (
               <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {error}
               </div>
            )}

            {/* Plan Name */}
            <div>
               <label className="block text-sm font-medium text-moss-text mb-2">
                  Tên kế hoạch <span className="text-red-500">*</span>
               </label>
               <input
                  type="text"
                  name="plan_name"
                  value={formData.plan_name}
                  onChange={handleChange}
                  required
                  placeholder="Ví dụ: Summer Body 2024"
                  className="w-full px-4 py-3 bg-moss-surface border border-moss-border rounded-lg text-moss-text placeholder-moss-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
               />
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium text-moss-text mb-2">
                     Ngày bắt đầu <span className="text-red-500">*</span>
                  </label>
                  <input
                     type="date"
                     name="start_date"
                     value={formData.start_date}
                     onChange={handleChange}
                     required
                     className="w-full px-4 py-3 bg-moss-surface border border-moss-border rounded-lg text-moss-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
               </div>
               <div>
                  <label className="block text-sm font-medium text-moss-text mb-2">
                     Ngày kết thúc <span className="text-red-500">*</span>
                  </label>
                  <input
                     type="date"
                     name="end_date"
                     value={formData.end_date}
                     onChange={handleChange}
                     required
                     min={formData.start_date}
                     className="w-full px-4 py-3 bg-moss-surface border border-moss-border rounded-lg text-moss-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
               </div>
            </div>

            {/* Description */}
            <div>
               <label className="block text-sm font-medium text-moss-text mb-2">
                  Mô tả
               </label>
               <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Mô tả mục tiêu và chi tiết kế hoạch..."
                  className="w-full px-4 py-3 bg-moss-surface border border-moss-border rounded-lg text-moss-text placeholder-moss-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
               />
            </div>

            {/* Submit Button */}
            <button
               type="submit"
               disabled={loading}
               className="w-full h-12 px-6 rounded-full bg-primary hover:bg-[#b8c755] text-moss-deep font-bold transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[0_0_20px_rgba(201,216,98,0.2)]"
            >
               {loading ? 'Đang tạo...' : 'Tạo kế hoạch'}
            </button>
         </form>
      </Modal>
   );
};

export default CreatePlanModal;
