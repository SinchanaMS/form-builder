import React from "react"
import { Question } from "../types"
import Input from "../components/Input"
import { FaPlus, FaXmark } from "react-icons/fa6"

interface Props {
  questionState: Question
  setQuestionState: React.Dispatch<React.SetStateAction<Question>>
}
const QuestionInputByType = (props: Props) => {
  const { questionState, setQuestionState } = props

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id?: string
  ) => {
    const updatedOptions = questionState.options.map((opt) =>
      opt.id === id ? { ...opt, label: e.target.value } : opt
    )
    setQuestionState((prevQuestionState) => ({
      ...prevQuestionState,
      options: updatedOptions,
    }))
  }

  const handleInputBlur = (id?: string) => {
    setQuestionState((prevQuestionState) => ({
      ...prevQuestionState,
      options: prevQuestionState.options.map((opt, idx) =>
        opt.id === id && !opt.label.trim()
          ? {
              ...opt,
              label: `Option ${idx + 1}`,
            }
          : opt
      ),
    }))
  }

  const handleAddOption = () => {
    setQuestionState((prevQuestionState) => ({
      ...prevQuestionState,
      options: [
        ...prevQuestionState.options,
        {
          id: `${Date.now()}`,
          label: `Option ${prevQuestionState.options.length + 1}`,
        },
      ],
    }))
  }

  const handleDeleteOption = (id: string) => {
    const updatedOptions = questionState.options.filter((opt) => opt.id !== id)
    setQuestionState((prevQuestionState) => ({
      ...prevQuestionState,
      options: updatedOptions,
    }))
  }

  if (questionState.type === "select") {
    return (
      <div className="flex flex-col">
        {questionState.options.map((option, idx) => (
          <div key={option.id} className="relative mt-2">
            <Input
              key={option.id}
              placeholder={`Option ${idx + 1}`}
              value={option.label}
              wrapperClass="border-0 rounded-none"
              inputClass="border-b border-gray-200 focus:border-b focus:border-indigo-600 focus:outline-hidden"
              onChange={(e) => handleInputChange(e, option.id)}
              onBlur={() => handleInputBlur(option.id)}
            />
            {idx !== 0 && (
              <FaXmark
                onClick={() => handleDeleteOption(option.id)}
                color="grey"
                className="absolute top-1/2 right-6 -translate-y-1/2 cursor-pointer"
              />
            )}
          </div>
        ))}
        <button
          className="flex items-center gap-x-2 mr-auto my-4 px-2 py-1 cursor-pointer hover:bg-indigo-50 rounded-sm"
          onClick={handleAddOption}
        >
          <FaPlus /> Add option
        </button>
      </div>
    )
  }
  return null
}

export default QuestionInputByType
