export function genPath(...paths: (string | undefined)[]) {
  const validParams = paths.filter((p) => !!p);

  const pathname = validParams.join("/");

  return "/" + pathname;
}
