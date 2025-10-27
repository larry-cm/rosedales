import React from 'react';

interface LoadingSpinnerProps {
    message?: string;
    className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    message = "Cargando datos...",
    className = ""
}) => {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="ml-3 text-xl font-medium text-green-600">{message}</p>
        </div>
    );
};

export default LoadingSpinner;
