export function isArray(value: any): value is any[] {
  return Array.isArray(value);
}

export function isNumber(value: any): value is number {
  return typeof value === "number";
}

export function isNumberArray(value: any): value is number[] {
  if (Array.isArray(value)) {
    return value.every((item) => typeof item === "number");
  }
  return false;
}
