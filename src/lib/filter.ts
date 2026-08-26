export function matchesKeywordQuery(fields: string[], query: string): boolean {
  return fields.join(" ").toLowerCase().includes(query.trim().toLowerCase());
}
