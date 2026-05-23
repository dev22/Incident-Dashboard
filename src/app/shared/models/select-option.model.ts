export interface SelectOption<T extends string | number = string | number> {
  readonly label: string;
  readonly value: T;
}
