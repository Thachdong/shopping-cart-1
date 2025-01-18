export function joinClass(...rest: string[]): string {
  return rest.filter((cls: string) => !!cls).join(" ");
}
