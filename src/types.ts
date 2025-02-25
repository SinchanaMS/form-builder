export type QuestionType = "text" | "number" | "select"

export interface Option {
    id: string;
    label: string
}

export interface Question {
    id: string;
    question: string;
    description?: string;
    type: QuestionType;
    options: Option[];
    isRequired: boolean;
    isRangeEnabled?: boolean;
    range?: { min: number, max: number };
}

export interface FormInfo {
    id: string;
    name: string
    description: string
    questions: Question[]
}
