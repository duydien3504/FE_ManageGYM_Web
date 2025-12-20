/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validate phone number (Vietnamese format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid
 */
export const isValidPhone = (phone) => {
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    return phoneRegex.test(phone);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} Validation result with isValid and message
 */
export const validatePassword = (password) => {
    if (password.length < 8) {
        return { isValid: false, message: 'Mật khẩu phải có ít nhất 8 ký tự' };
    }
    if (!/[A-Z]/.test(password)) {
        return { isValid: false, message: 'Mật khẩu phải có ít nhất 1 chữ hoa' };
    }
    if (!/[a-z]/.test(password)) {
        return { isValid: false, message: 'Mật khẩu phải có ít nhất 1 chữ thường' };
    }
    if (!/[0-9]/.test(password)) {
        return { isValid: false, message: 'Mật khẩu phải có ít nhất 1 số' };
    }
    return { isValid: true, message: 'Mật khẩu hợp lệ' };
};
