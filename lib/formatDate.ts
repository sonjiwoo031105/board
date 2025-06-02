export function formatDate(
  createdAt: string,
  updatedAt?: string
): { text: string; isEdited: boolean } {
  const created = new Date(createdAt);
  const updated = updatedAt ? new Date(updatedAt) : null;

  const base = updated && updated.getTime() !== created.getTime() ? updated : created;

  const text = base.toLocaleString();
  const isEdited = !!updated && updated.getTime() !== created.getTime();

  return { text, isEdited };
}
