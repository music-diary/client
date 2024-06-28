export function trimTitle(title: string, maxLength: number) {
  if (title.length > maxLength) {
    return title.substring(0, maxLength) + '...';
  }
  return title;
}
