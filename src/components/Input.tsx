interface InputProps {
  label?: string
  wrapperClass?: string
  inputClass?: string
  labelClass?: string
  placeholder?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: () => void
  value?: string | number
  name?: string
  type?: string
}

const Input = (props: InputProps) => {
  return (
    <div
      className={`flex flex-col relative border rounded-md border-gray-300 w-full ${props.wrapperClass}`}
    >
      {props.label && (
        <label
          className={`text-xs text-gray-500 absolute -top-2 left-1 bg-white px-2 ${props.labelClass}`}
        >
          {props.label}
        </label>
      )}
      <input
        name={props.name}
        value={props.value}
        type={props.type}
        className={`p-2 ${props.inputClass}`}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  )
}

export default Input
