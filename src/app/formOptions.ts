interface FormOption {
  id: number;
  name: string;
}

interface FormOptions {
  provinces: FormOption[];
  workTypes: FormOption[];
  statuses: FormOption[];
}

export {
  FormOption,
  FormOptions
}