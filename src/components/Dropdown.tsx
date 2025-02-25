interface DropdownProps {
  name?: string
  label?: string
  options: { id: string; label: string }[]
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  value: string
}

const Dropdown = (props: DropdownProps) => {
  return (
    <div className="flex flex-col relative border rounded-md border-gray-300 w-64">
      <label className="text-xs text-gray-500 absolute -top-2 left-1 bg-white px-2">
        {props.label}
      </label>
      <select
        name={props.name}
        className=" p-3 rounded-md border-gray-300"
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
