export function isLiteralFromSet<T extends readonly string[]>(
  literal: string,
  set: T,
): literal is T[number] {
  return set.includes(literal);
}
