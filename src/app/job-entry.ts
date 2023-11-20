export interface JobEntry {
    id: number,
    company: string,
    title: string,
    country: string,
    province: string,
    city: string,
    type_id: number,
    status_id: number,
    applied: Date,
    updated: Date,
    link: string,
    description: string,
    comment: string
}