import { Question } from "./types";


export const placeholderQuestion: Question = {
    id: `${Date.now()}`,
    question: "",
    description: "",
    type: "text",
    options: [],
    isRequired: false,
    isRangeEnabled: false,
    range: {} as { min: number, max: number }
}

export const questionTypeOptions = [
    { id: "text", label: "Text" },
    { id: "number", label: "Number" },
    { id: "select", label: "Select" },
]

export const initialFormState = {
    id: `${Date.now()}`,
    name: "Sample form",
    description: "",
    questions: [placeholderQuestion],
}