import { useState } from "react"
import { useFormContext } from "../contexts/FormContext"
import { isFieldValid } from "../helpers"
import { Question } from "../types"

const renderInput = (
  item: Question,
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    question: string,
    optionId?: string
  ) => void,
  value: string | number | string[],
  error?: { [k: string]: string }
) => {
  const { id: questionId, type, options } = item
  switch (type) {
    case "number":
      return (
        <div className="flex flex-col">
          <input
            className="font-normal text-gray-600 border-b border-gray-300 w-full border-dotted p-2"
            type="number"
            value={value as number}
            onChange={(e) => handleInputChange(e, questionId)}
          />
          {error?.[questionId] && (
            <p className="text-red-600 text-sm my-2">{error[questionId]}</p>
          )}
        </div>
      )

    case "select":
      return (
        <div className="flex flex-col">
          {options.map((option) => (
            <div key={option.id} className="flex gap-x-3">
              <input
                type="radio"
                value={value as string | number}
                id={option.id}
                name={`select-${item.id}`}
                checked={option.id === value}
                onChange={(e) => handleInputChange(e, questionId, option.id)}
              />
              <label htmlFor={option.id}>{option.label}</label>
            </div>
          ))}
          {error?.[questionId] && (
            <p className="text-red-600 text-sm my-2">{error[questionId]}</p>
          )}
        </div>
      )
    case "text":
    default:
      return (
        <div className="flex flex-col">
          <input
            className="font-normal text-gray-600 border-b border-gray-300 w-full border-dotted p-2"
            type="text"
            value={value as string}
            onChange={(e) => handleInputChange(e, questionId)}
          />
          {error?.[questionId] && (
            <p className="text-red-600 text-sm my-2">{error[questionId]}</p>
          )}
        </div>
      )
  }
}

const Form = () => {
  const { formInfo } = useFormContext()
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<{
    [k: string]: string | number | string[]
  }>({})

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    questionId: string,
    optionId?: string
  ) => {
    setFormData({ ...formData, [questionId]: optionId || e.target.value })
  }

  const handleSubmit = () => {
    let hasError = false
    formInfo.questions.forEach((question) => {
      const fieldError = isFieldValid(question, formData[question.id])
      if (fieldError) {
        setErrors((prev) => ({ ...prev, [question.id]: fieldError }))
        hasError = true
      }
    })
    if (!hasError) {
      setIsSubmitted(true)
    }
  }

  return (
    <div className="h-full w-full">
      <p className="text-xl font-bold">{formInfo.name}</p>
      {formInfo.description && (
        <p className="text-sm font-medium text-gray-500 mb-4">
          {formInfo.description}
        </p>
      )}
      {formInfo.questions?.map((item) => {
        const value = formData[item.id] || ""
        return (
          <div
            key={item.id}
            className="border border-gray-100 p-4 rounded-md my-2"
          >
            <div className="font-medium">{item.question}</div>
            {isSubmitted ? (
              <p className="text-sm text-gray-700 mt-2 bg-gray-50 p-4 rounded-md">
                {value}
              </p>
            ) : (
              renderInput(item, handleInputChange, value, errors)
            )}
          </div>
        )
      })}
      {isSubmitted ? (
        <p className="text-green-700 text-sm">Submitted successfully! ✅</p>
      ) : (
        <button
          type="submit"
          className="bg-indigo-700 px-5 py-2 rounded-sm text-white text-sm my-2"
          onClick={handleSubmit}
        >
          Submit
        </button>
      )}
    </div>
  )
}

export default Form
