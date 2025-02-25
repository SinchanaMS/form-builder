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
            String(range.max)?.trim() !== "" && range.min < range.max
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
const isRangeValid = (range?: { min?: number; max?: number }): range is { min: number; max: number } =>
    range !== undefined && typeof range.min === "number" && typeof range.max === "number";

export const isFieldValid = (field: Question, value: string | number | string[]) => {

    if (field.isRequired && !value) return "*This field is required" //TODO: based on value type
    if (field.type === 'number') {
        if (field.isRequired && isNaN(value as number)) return "The value must be a number"
        if (field.isRangeEnabled && isRangeValid(field.range)) {
            const { min, max } = field.range;
            if ((value as number) < min || (value as number) > max) {
                return `Value must be between ${min} and ${max}`;
            }
        }
    }
    return null
}

export const delay = (time: number = 0) =>
    new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
