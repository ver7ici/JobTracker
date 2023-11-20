export class Job {
    constructor(
        public id: number = 0,
        public company: string = "",
        public title: string = "",
        public country: string = "",
        public province: string = "",
        public city: string = "",
        public type: string = "",
        public status: string = "",
        public applied: Date = new Date(),
        public updated: Date = new Date(),
        public link: string = "",
        public description: string = "",
        public comment: string = ""
    ) {}
}