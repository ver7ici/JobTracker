interface FormOption {
  id: number;
  name: string;
}

class FormOptions {
  constructor(private items: FormOption[] = []) {}

  public toList(): FormOption[] {
    return this.items;
  }
  
  public getName(id: number): string {
    return this.items.find(o => o.id == id)?.name ?? "";
  }

  public getId(name: string): number {
    return this.items.find(o => o.name === name)?.id ?? 0;
  }
}

export {
  FormOption,
  FormOptions
}