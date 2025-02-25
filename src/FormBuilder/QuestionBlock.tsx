import { useEffect, useState } from "react"
import { Question } from "../types"
import { useFormContext } from "../contexts/FormContext"
import Input from "../components/Input"
import Dropdown from "../components/Dropdown"
import { questionTypeOptions } from "../constants"
import { isQuestionValid, saveItemToLocalStorage } from "../helpers"
import QuestionInputByType from "./QuestionInputByType"

interface Props {
  question: Question
}

const QuestionBlock = (props: Props) => {
  const { formInfo, setFormInfo } = useFormContext()
  const { question } = props
  const [saving, setSaving] = useState(false)
  const [questionState, setQuestionState] = useState<Question>(question)
  const [debouncedQuestionState, setDebouncedQuestionState] =
    useState<Question>(questionState)

  useEffect(() => {
    const timer = setTimeout(() => {
      const isValidQuestion = isQuestionValid(questionState)
      if (!isValidQuestion) return
      setSaving(true)
      setDebouncedQuestionState(questionState)
    }, 500)

    return () => clearTimeout(timer)
  }, [questionState])

  useEffect(() => {
    if (!debouncedQuestionState.question) return
    const timer = setTimeout(() => {
      setSaving(false)

      setFormInfo((prevFormInfo) => {
        let isUpdated = false

        const modifiedQuestions = prevFormInfo.questions.map((q) => {
          if (q.id === debouncedQuestionState.id) {
            isUpdated = true
            return { ...q, ...debouncedQuestionState }
          }
          return q
        })

        const updatedQuestionList = isUpdated
          ? modifiedQuestions
          : [...modifiedQuestions, debouncedQuestionState] // if question doesn't exist, add it

        const updatedFormInfo = {
          ...prevFormInfo,
          questions: updatedQuestionList,
        }

        saveItemToLocalStorage("formInfo", updatedFormInfo)

        return updatedFormInfo
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [debouncedQuestionState, setFormInfo])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement
    const { name, type, value, checked } = target

    setQuestionState((prev) => {
      const updatedValue = type === "checkbox" ? checked : value
      return {
        ...prev,
        [name]: updatedValue,
        options:
          name === "type" && e.target.value === "select"
            ? [{ id: `${Date.now()}`, label: "Option 1" }]
            : prev.options,
      }
    })
  }

  const handleRangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionState({
      ...questionState,
      ...(questionState.range && {
        range: { ...questionState.range, [e.target.name]: e.target.value },
      }),
    })
  }

  const handleDeleteQuestion = () => {
    const updatedQuestions = formInfo.questions.filter(
      (q) => q.id !== question.id
    )
    const updatedFormInfo = { ...formInfo, questions: updatedQuestions }
    setFormInfo(updatedFormInfo)
    saveItemToLocalStorage("formInfo", updatedFormInfo)
  }

  return (
    <div className="my-4 border border-gray-300 p-4 rounded-xl w-full">
      <div className="flex justify-between gap-x-4">
        <Input
          value={questionState.question}
          label="Question title *"
          name="question"
          onChange={handleChange}
        />
        <Dropdown
          name="type"
          label="Type"
          value={questionState.type}
          options={questionTypeOptions}
          onChange={handleChange}
        />
        {/* TODO: update saving loader */}
        {saving && <span>{saving ? "saving.." : "saved"}</span>}
      </div>
      <QuestionInputByType
        questionState={questionState}
        setQuestionState={setQuestionState}
      />
      {questionState.type === "number" && (
        <div className="flex items-center gap-x-2 mt-2">
          <input
            type="checkbox"
            name="isRangeEnabled"
            id="isRange"
            checked={questionState.isRangeEnabled}
            onChange={handleChange}
          />
          <label>Enable range </label>
          {questionState.isRangeEnabled && (
            <div className="flex w-fit ml-auto gap-x-4">
              <Input
                label="Min *"
                name="min"
                type="number"
                value={question.range?.min}
                onChange={handleRangeInput}
              />
              <Input
                label="Max *"
                name="max"
                type="number"
                value={question.range?.max}
                onChange={handleRangeInput}
              />
            </div>
          )}
        </div>
      )}
      <div className="flex items-center gap-x-2">
        <input
          type="checkbox"
          name="isRequired"
          id="isRequired"
          checked={questionState.isRequired}
          onChange={handleChange}
        />
        <label>Mandatory</label>
        <button
          className="border w-fit my-4 ml-auto px-2 py-1 rounded-sm"
          onClick={handleDeleteQuestion}
        >
          Delete question
        </button>
      </div>
    </div>
  )
}

export default QuestionBlock
