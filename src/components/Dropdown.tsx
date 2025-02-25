interface DropdownProps {
  name?: string
  label?: string
  options: { id: string; label: string }[]
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  value: string
  wrapperClass?: string
}

const Dropdown = (props: DropdownProps) => {
  return (
    <div
      className={`flex flex-col relative rounded-md w-64 ${props.wrapperClass}`}
    >
      <label className="text-xs text-gray-500 absolute -top-2 left-1 bg-white px-2">
        {props.label}
      </label>
      <select
        name={props.name}
        className="border px-3 py-2.5 rounded-md border-gray-300 focus:outline-hidden focus:border-indigo-700"
        onChange={props.onChange}
        value={props.value}
      >
        {props.options.map((optionItem) => (
          <option key={optionItem.id} value={optionItem.id}>
            {optionItem.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Dropdown
