import React, { useState } from 'react';
import Modal from '../common/Modal';
import { plansService } from '../../services/api/plans.service';
import { toast } from 'react-hot-toast';

const DAYS_OF_WEEK = [
   { value: 'MONDAY', label: 'Thứ 2' },
   { value: 'TUESDAY', label: 'Thứ 3' },
   { value: 'WEDNESDAY', label: 'Thứ 4' },
   { value: 'THURSDAY', label: 'Thứ 5' },
   { value: 'FRIDAY', label: 'Thứ 6' },
   { value: 'SATURDAY', label: 'Thứ 7' },
   { value: 'SUNDAY', label: 'Chủ nhật' },
];

const AddScheduleModal = ({ isOpen, onClose, planId, selectedDay, onSuccess }) => {
   const [formData, setFormData] = useState({
      day_of_week: selectedDay || 'MONDAY',
      title: '',
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
         const response = await plansService.addSchedule(planId, formData);

         toast.success('Đã thêm lịch trình thành công!');

         if (onSuccess) {
            onSuccess(response);
         }

         // Reset form and close
         setFormData({
            day_of_week: 'MONDAY',
            title: '',
         });
         onClose();
      } catch (err) {
         const errorMessage = err.message || 'Failed to add schedule. Please try again.';
         setError(errorMessage);
         toast.error(errorMessage);
      } finally {
         setLoading(false);
      }
   };

   return (
      <Modal isOpen={isOpen} onClose={onClose} title="Thêm lịch trình">
         <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message */}
            {error && (
               <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {error}
               </div>
            )}

            {/* Day of Week */}
            <div>
               <label className="block text-sm font-medium text-moss-text mb-2">
                  Ngày trong tuần <span className="text-red-500">*</span>
               </label>
               <select
                  name="day_of_week"
                  value={formData.day_of_week}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-moss-surface border border-moss-border rounded-lg text-moss-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
               >
                  {DAYS_OF_WEEK.map((day) => (
                     <option key={day.value} value={day.value}>
                        {day.label}
                     </option>
                  ))}
               </select>
            </div>

            {/* Schedule Title */}
            <div>
               <label className="block text-sm font-medium text-moss-text mb-2">
                  Tên lịch trình <span className="text-red-500">*</span>
               </label>
               <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Ví dụ: Chest Day, Leg Day..."
                  className="w-full px-4 py-3 bg-moss-surface border border-moss-border rounded-lg text-moss-text placeholder-moss-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
               />
            </div>

            {/* Submit Button */}
            <button
               type="submit"
               disabled={loading}
               className="w-full h-12 px-6 rounded-full bg-primary hover:bg-[#b8c755] text-moss-deep font-bold transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[0_0_20px_rgba(201,216,98,0.2)]"
            >
               {loading ? 'Đang thêm...' : 'Thêm lịch trình'}
            </button>
         </form>
      </Modal>
   );
};

export default AddScheduleModal;
