import classNames from 'classnames';

interface Props extends GCommonCompnentProperties {
  name: string;
  rows?: number;
  value: string;
  label?: string;
  readOnly?: boolean;
  required?: boolean;
  placeholder?: string;
  isMultiRow?: boolean;
  inputClassName?: string;
  type?: 'number' | 'text' | 'email';
  onChange: ({ name, value }: { name: string; value: string }) => void;
}

export function Input({
  name,
  label,
  value,
  required,
  onChange,
  rows = 4,
  readOnly,
  className,
  placeholder,
  type = 'text',
  inputClassName,
  isMultiRow = false
}: Props) {
  const classes = {
    input:
      'w-full duration-300 bg-transparent border border-solid border-white outline-none px-3 mt-2 focus:border-sky-500 text-sm',
    required: 'text-red-500 text-lg',
    label: 'text-sm'
  };

  const changeValue = ({
    target
  }: {
    target: HTMLTextAreaElement | HTMLInputElement;
  }) => {
    const value = target?.value || '';
    if (onChange && name) {
      onChange({ name, value });
    }
  };

  if (isMultiRow && rows > 0) {
    return (
      <label className={classNames(classes.label, className)}>
        {label} {required && <span className={classes.required}>*</span>}
        <textarea
          rows={rows}
          name={name}
          value={value}
          readOnly={readOnly}
          required={required}
          onChange={changeValue}
          placeholder={placeholder}
          className={classNames('leading-6 py-2', classes.input, inputClassName)}
        />
      </label>
    );
  }

  return (
    <label className={classNames(classes.label, className)}>
      {label}
      {required && <span className={classes.required}>*</span>}
      <input
        name={name}
        type={type}
        value={value}
        readOnly={readOnly}
        required={required}
        onChange={changeValue}
        placeholder={placeholder}
        className={classNames('leading-9', classes.input, inputClassName)}
      />
    </label>
  );
}
