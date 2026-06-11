export type RawSearchParams = Record<string, string | string[] | undefined>;

export function firstSearchParam(
  value: string | string[] | undefined
): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}
