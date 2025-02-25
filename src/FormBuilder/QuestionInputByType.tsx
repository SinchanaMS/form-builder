import React from "react"
import { Question } from "../types"
import Input from "../components/Input"

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

  switch (questionState.type) {
    case "number":
      return (
        <p className="border-b border-dashed border-slate-300 mt-5 p-1 text-gray-500 text-sm font-light w-full">
          Number type answer
        </p>
      )
    case "select":
      return (
        <div className="flex flex-col">
          {questionState.options.map((option, idx) => (
            <div key={option.id} className="relative mt-2">
              <Input
                key={option.id}
                placeholder={`Option ${idx + 1}`}
                value={option.label}
                wrapperClass="border-b border-0 rounded-none w-fit"
                onChange={(e) => handleInputChange(e, option.id)}
                onBlur={() => handleInputBlur(option.id)}
              />
              {idx !== 0 && (
                <button
                  className="absolute hover:bg-gray-200 top-1/2 right-6 -translate-y-1/2 px-2.5 py-0.5 rounded-sm flex items-center"
                  onClick={() => handleDeleteOption(option.id)}
                >
                  x
                </button>
              )}
            </div>
          ))}
          <button
            className="mr-auto my-4 px-2 py-1 cursor-pointer hover:bg-gray-200 rounded-sm"
            onClick={handleAddOption}
          >
            Add option
          </button>
        </div>
      )
    case "text":
    default:
      return (
        <p className="border-b border-dashed border-slate-300 mt-5 p-1 text-gray-500 text-sm font-light w-full">
          Text type answer
        </p>
      )
  }
}

export default QuestionInputByType
