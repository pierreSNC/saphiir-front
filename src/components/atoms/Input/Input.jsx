import React from 'react';

const Input = ({
    placeholderContent,
    defaultClass = 'input',
    type = 'text',
    id,
    onChange
               }) => {
    return (
        <input type={type} placeholder={placeholderContent} className={defaultClass} id={id} onChange={onChange}/>
    );
};

export default Input;