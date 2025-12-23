import React, { useState, useEffect } from 'react';
import { exercisesService } from '../../services/api/exercises.service';
import { adminService } from '../../services/api/admin.service';
import MuscleGroupForm from './MuscleGroupForm';

const MuscleGroupsTab = () => {
   const [muscleGroups, setMuscleGroups] = useState([]);
   const [selectedGroup, setSelectedGroup] = useState(null);
   const [showForm, setShowForm] = useState(false);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      loadMuscleGroups();
   }, []);

   const loadMuscleGroups = async () => {
      try {
         setLoading(true);
         const response = await exercisesService.getMuscleGroups();
         setMuscleGroups(response || []);
      } catch (error) {
         console.error('Failed to load muscle groups:', error);
      } finally {
         setLoading(false);
      }
   };

   const handleEdit = (group) => {
      setSelectedGroup(group);
      setShowForm(true);
   };

   const handleCreate = () => {
      setSelectedGroup(null);
      setShowForm(true);
   };

   const handleDelete = async (group) => {
      if (!window.confirm(`Bạn có chắc muốn xóa nhóm cơ "${group.group_name}"?`)) return;

      try {
         await adminService.deleteMuscleGroup(group.group_id);
         loadMuscleGroups();
      } catch (error) {
         alert('Failed to delete muscle group: ' + error.message);
      }
   };

   const handleFormSuccess = () => {
      loadMuscleGroups();
   };

   return (
      <div className="space-y-4">
         {/* Header */}
         <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-moss-text">Quản lý nhóm cơ</h2>
            <button
               onClick={handleCreate}
               className="h-10 px-6 rounded-full bg-primary hover:bg-[#b8c755] text-moss-deep font-bold transition-all hover:scale-[1.02] flex items-center gap-2"
            >
               <span className="material-symbols-outlined !text-lg">add</span>
               <span>Tạo mới</span>
            </button>
         </div>

         {/* Table */}
         {loading ? (
            <div className="text-center py-12">
               <div className="inline-block size-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
         ) : muscleGroups.length === 0 ? (
            <div className="text-center py-12 bg-moss-card rounded-xl border border-moss-border">
               <span className="material-symbols-outlined text-moss-muted !text-6xl mb-4">
                  category
               </span>
               <p className="text-moss-muted">Chưa có nhóm cơ nào</p>
            </div>
         ) : (
            <div className="bg-moss-card rounded-xl border border-moss-border overflow-hidden">
               <table className="w-full">
                  <thead className="bg-moss-surface border-b border-moss-border">
                     <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-moss-muted uppercase tracking-wider">
                           ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-moss-muted uppercase tracking-wider">
                           Tên nhóm cơ
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-moss-muted uppercase tracking-wider">
                           Mô tả
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-moss-muted uppercase tracking-wider">
                           Thumbnail
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-moss-muted uppercase tracking-wider">
                           Thao tác
                        </th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-moss-border">
                     {muscleGroups.map((group) => (
                        <tr key={group.group_id} className="hover:bg-moss-surface transition-colors">
                           <td className="px-6 py-4 whitespace-nowrap text-sm text-moss-muted">
                              {group.group_id}
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-moss-text">
                                 {group.group_name}
                              </div>
                           </td>
                           <td className="px-6 py-4">
                              <div className="text-sm text-moss-muted line-clamp-2 max-w-md">
                                 {group.description || '-'}
                              </div>
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap">
                              {group.thumbnail_url ? (
                                 <img
                                    src={group.thumbnail_url}
                                    alt={group.group_name}
                                    className="size-10 rounded-lg object-cover"
                                 />
                              ) : (
                                 <div className="size-10 rounded-lg bg-moss-deep flex items-center justify-center">
                                    <span className="material-symbols-outlined text-moss-muted !text-lg">
                                       image
                                    </span>
                                 </div>
                              )}
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                              <div className="flex items-center justify-end gap-2">
                                 <button
                                    onClick={() => handleEdit(group)}
                                    className="size-8 rounded-full hover:bg-moss-deep text-moss-muted hover:text-primary transition-all flex items-center justify-center"
                                 >
                                    <span className="material-symbols-outlined !text-lg">edit</span>
                                 </button>
                                 <button
                                    onClick={() => handleDelete(group)}
                                    className="size-8 rounded-full hover:bg-moss-deep text-moss-muted hover:text-red-400 transition-all flex items-center justify-center"
                                 >
                                    <span className="material-symbols-outlined !text-lg">delete</span>
                                 </button>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         )}

         {/* Form Modal */}
         <MuscleGroupForm
            isOpen={showForm}
            onClose={() => {
               setShowForm(false);
               setSelectedGroup(null);
            }}
            muscleGroup={selectedGroup}
            onSuccess={handleFormSuccess}
         />
      </div>
   );
};

export default MuscleGroupsTab;
