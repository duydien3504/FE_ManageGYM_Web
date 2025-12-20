import React from 'react';

const Card = ({
    children,
    className = '',
    padding = true,
    hover = false,
    ...props
}) => {
    const baseClasses = 'card bg-white rounded-xl shadow-soft';
    const hoverClasses = hover ? 'hover:shadow-lg transition-shadow duration-300' : '';
    const paddingClasses = padding ? 'p-6' : '';

    const classes = `${baseClasses} ${hoverClasses} ${paddingClasses} ${className}`;

    return (
        <div className={classes} {...props}>
            {children}
        </div>
    );
};

export default Card;
