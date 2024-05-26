import React from 'react';

const InputField = ({labelId, labelValue, type, inputId, inputValue, onChange }) => {
  return (
    <div className="mb-4">
      <label id={labelId} className="block text-gray-700 mb-2">
        {labelValue}
      </label>
      <input
        type={type}
        id={inputId}
        value={inputValue}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  );
};

export default InputField;
