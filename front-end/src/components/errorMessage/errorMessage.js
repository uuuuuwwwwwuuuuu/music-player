import React from "react";
import './errorMessage.scss';

const ErrorMessage = ({message}) => {
    return (
        <div className="error_message">
            <span>Ошибка: {message}</span>
        </div>
    )
}

export default ErrorMessage;