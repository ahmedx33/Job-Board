
type Status = "Todo" | "Done" | "InProgress"
type Category = "Personal" | "Work"
type Priority = "High" | "Medium" | "Low"

type TodoState = Status | Category | Priority

type TaskType = {
    id: string,
    title: string,
    status: Status,
    category: Category,
    priority: Priority,
}

type JType = "Any" | "Full Time" | "Part Time" | "Internship"

type ExperienceLevelType = "Any" | "Junior" | "Mid-Level" | "Senior"

type JobType = {
    id?: string,
    title: string,
    companyName: string,
    location: string,
    applicationUrl: string,
    shortDesc: string,
    fullDesc: string,
    salary: string,
    type: JType
    experienceLevel: ExperienceLevelType,
    activeCount?: number,
    isPreviewMode?: boolean
}

type DaysLimmit = {
    limmit: number,
    price: string | number
}
