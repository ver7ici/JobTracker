export class Job {

  constructor(
    public id: number = 0, 
    public company: string = "", 
    public title: string = "",
    public country: string = "CA", 
    public province: string = "ON", 
    public city: string = "",
    public type: string = "", 
    public status: string = "Applied",
    public applied: string = "0000-00-00", 
    public updated: string = "0000-00-00",
    public link: string = "", 
    public description: string = "", 
    public comment: string = ""
  ) {}
  
}
