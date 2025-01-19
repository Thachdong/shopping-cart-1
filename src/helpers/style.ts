export function joinClass(...rest: (string | undefined)[]): string {
  return rest.filter((cls): cls is string => !!cls).join(" ");
}
