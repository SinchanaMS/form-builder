import { FormInfo, Question } from "../types";

export const isQuestionValid = (questionData: Question) => {
    const { isRangeEnabled, range, question, type, options } = questionData;
    if (!question.trim()) return false

    if (type === 'text') return true
    if (type === 'number') {
        if (!isRangeEnabled) return true
        if (!range) return false
        const hasValidRange = range &&
            Object.keys(range).length === 2 &&
            String(range.min)?.trim() !== "" &&
            String(range.max)?.trim() !== "";
        return hasValidRange
    }
    if (type === 'select' || type == 'multi-select') {
        return !!options.length
    }
}

export const isFormBuilderValid = (formInfo: FormInfo) => {
    if (!formInfo.name) return false;
    return formInfo.questions.every(isQuestionValid);
}

export const saveItemToLocalStorage = (key: string, value: unknown) => {
    return localStorage.setItem(key, JSON.stringify(value))
}

export const getItemFromLocalStorage = <T>(key: string): T | null => {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
}