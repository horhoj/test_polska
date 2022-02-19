import React, { FC } from 'react';
import ReactSelect, { StylesConfig, Options } from 'react-select';

const customStyles: StylesConfig = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'white' : 'black',
    cursor: 'pointer',
  }),
};

interface CustomOption {
  id: number;
  name: string;
}

interface ChangeValue {
  value: number;
  label: string;
}

interface SelectProps {
  placeholder: string;
  label: string;
  value: number;
  options: Options<CustomOption>;
  onChange(value: number): void;
  name: string;
}

export const Select: FC<SelectProps> = ({
  options,
  label,
  value,
  onChange,
  placeholder,
  name,
}) => {
  const optionsValues = options.map((option) => ({
    value: option.id,
    label: option.name,
  }));
  const currentLabelIdx = optionsValues.findIndex(
    (item) => item.value === value,
  );
  const currentValue =
    value === 0 ? null : { value, label: optionsValues[currentLabelIdx].label };

  const handleChange = (e: unknown) => {
    const value = (e as ChangeValue).value;
    onChange(value);
  };

  return (
    <div className={'w-100'}>
      <label className="form-label m-0">{label}</label>
      {options?.length > 0 ? (
        <ReactSelect
          options={optionsValues}
          styles={customStyles}
          value={currentValue}
          placeholder={placeholder}
          onChange={handleChange}
          name={name}
        />
      ) : null}
      {options?.length === 0 ? (
        <div className="msg-helper">нет элементов для вывода</div>
      ) : null}
    </div>
  );
};
