import React, { useState } from 'react';
import { userService } from '../../../services/api/user.service';
import { toast } from 'react-hot-toast';

const BodyMetricsModal = ({ onClose, onSuccess }) => {
   const [formData, setFormData] = useState({
      weight: '',
      height: '',
      body_fat_percentage: '',
   });
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });
      setError('');
   };

   const calculateBMI = () => {
      if (formData.weight && formData.height) {
         const heightInMeters = parseFloat(formData.height) / 100;
         const bmi = parseFloat(formData.weight) / (heightInMeters * heightInMeters);
         return bmi.toFixed(1);
      }
      return null;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');

      // Validation
      if (!formData.weight || !formData.height) {
         setError('Weight and height are required');
         setLoading(false);
         return;
      }

      if (parseFloat(formData.weight) <= 0 || parseFloat(formData.height) <= 0) {
         setError('Weight and height must be positive numbers');
         setLoading(false);
         return;
      }

      try {
         const dataToSend = {
            weight: parseFloat(formData.weight),
            height: parseFloat(formData.height),
         };

         // Only include body_fat_percentage if provided
         if (formData.body_fat_percentage) {
            dataToSend.body_fat_percentage = parseFloat(formData.body_fat_percentage);
         }

         const response = await userService.createBodyMetrics(dataToSend);
         console.log('Body metrics recorded:', response);

         // Show success toast
         toast.success('Đã ghi nhận chỉ số cơ thể!');

         if (onSuccess) {
            onSuccess(response);
         }

         onClose();
      } catch (err) {
         console.error('Create body metrics error:', err);
         setError(err.response?.data?.message || err.message || 'Failed to record body metrics');
         toast.error('Không thể ghi nhận chỉ số cơ thể');
      } finally {
         setLoading(false);
      }
   };

   const bmi = calculateBMI();

   return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
         <div className="bg-moss-card rounded-2xl w-full max-w-lg border border-moss-muted/10">
            {/* Header */}
            <div className="bg-moss-card border-b border-moss-muted/10 p-6 flex justify-between items-center">
               <div>
                  <h2 className="text-2xl font-bold text-moss-text">Track Body Metrics</h2>
                  <p className="text-sm text-moss-muted mt-1">Record your current measurements</p>
               </div>
               <button
                  onClick={onClose}
                  className="text-moss-muted hover:text-moss-text transition-colors"
               >
                  <span className="material-symbols-outlined">close</span>
               </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
               {error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg">
                     {error}
                  </div>
               )}

               {/* Weight */}
               <div>
                  <label className="block text-sm font-medium text-moss-text mb-2">
                     Weight (kg) <span className="text-red-400">*</span>
                  </label>
                  <input
                     type="number"
                     name="weight"
                     value={formData.weight}
                     onChange={handleChange}
                     step="0.1"
                     min="0"
                     className="w-full px-4 py-3 bg-moss-deep/50 border border-moss-muted/30 rounded-lg text-white placeholder-moss-muted/60 focus:outline-none focus:border-primary focus:bg-moss-deep/70 transition-colors"
                     placeholder="e.g., 70.5"
                     required
                  />
               </div>

               {/* Height */}
               <div>
                  <label className="block text-sm font-medium text-moss-text mb-2">
                     Height (cm) <span className="text-red-400">*</span>
                  </label>
                  <input
                     type="number"
                     name="height"
                     value={formData.height}
                     onChange={handleChange}
                     step="0.1"
                     min="0"
                     className="w-full px-4 py-3 bg-moss-deep/50 border border-moss-muted/30 rounded-lg text-white placeholder-moss-muted/60 focus:outline-none focus:border-primary focus:bg-moss-deep/70 transition-colors"
                     placeholder="e.g., 175"
                     required
                  />
               </div>

               {/* Body Fat Percentage */}
               <div>
                  <label className="block text-sm font-medium text-moss-text mb-2">
                     Body Fat Percentage (%)
                  </label>
                  <input
                     type="number"
                     name="body_fat_percentage"
                     value={formData.body_fat_percentage}
                     onChange={handleChange}
                     step="0.1"
                     min="0"
                     max="100"
                     className="w-full px-4 py-3 bg-moss-deep/50 border border-moss-muted/30 rounded-lg text-white placeholder-moss-muted/60 focus:outline-none focus:border-primary focus:bg-moss-deep/70 transition-colors"
                     placeholder="e.g., 15.0 (optional)"
                  />
               </div>

               {/* BMI Preview */}
               {bmi && (
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                     <div className="flex items-center justify-between">
                        <span className="text-moss-muted text-sm">Calculated BMI:</span>
                        <span className="text-primary text-xl font-bold">{bmi}</span>
                     </div>
                     <p className="text-xs text-moss-muted mt-2">
                        {parseFloat(bmi) < 18.5 && 'Underweight'}
                        {parseFloat(bmi) >= 18.5 && parseFloat(bmi) < 25 && 'Normal weight'}
                        {parseFloat(bmi) >= 25 && parseFloat(bmi) < 30 && 'Overweight'}
                        {parseFloat(bmi) >= 30 && 'Obese'}
                     </p>
                  </div>
               )}

               {/* Buttons */}
               <div className="flex gap-3 pt-4">
                  <button
                     type="button"
                     onClick={onClose}
                     className="flex-1 px-6 py-3 bg-moss-darker hover:bg-moss-surface text-moss-text rounded-lg transition-colors font-medium"
                  >
                     Cancel
                  </button>
                  <button
                     type="submit"
                     disabled={loading}
                     className="flex-1 px-6 py-3 bg-primary hover:bg-[#b8c755] text-moss-deep rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                     {loading ? 'Recording...' : 'Record Metrics'}
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default BodyMetricsModal;
