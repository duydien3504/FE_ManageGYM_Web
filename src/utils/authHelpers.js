/**
 * Check if user has admin role
 * @param {Object} user - User object from auth context
 * @returns {boolean} True if user is admin
 */
export const isAdmin = (user) => {
   console.log('isAdmin() - Checking user:', user);

   if (!user) {
      console.log('isAdmin() - No user, returning false');
      return false;
   }

   // Check multiple possible admin indicators
   const hasAdminRole = (
      user.role === 'admin' ||
      user.role === 'ADMIN' ||
      user.is_admin === true ||
      user.isAdmin === true ||
      user.user_role === 'admin' ||
      user.user_role === 'ADMIN'
   );

   // TEMPORARY: Check by email if backend doesn't return role
   // TODO: Remove this after backend adds role field to user response
   const adminEmails = [
      'admin@gym.com',
      'dondeptrai.com', // Add your admin email here
   ];
   const isAdminByEmail = user.email && adminEmails.includes(user.email.toLowerCase());

   const result = hasAdminRole || isAdminByEmail;

   console.log('isAdmin() - Result:', result, {
      'user.role': user.role,
      'user.email': user.email,
      'hasAdminRole': hasAdminRole,
      'isAdminByEmail': isAdminByEmail
   });

   return result;
};

/**
 * Check if user is authenticated
 * @param {Object} user - User object
 * @param {string} token - Auth token
 * @returns {boolean} True if authenticated
 */
export const isAuthenticated = (user, token) => {
   return !!user && !!token;
};
