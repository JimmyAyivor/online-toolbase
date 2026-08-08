export function downloadBytes(
  data: Blob | Uint8Array,
  filename: string,
  mimeType = "application/octet-stream",
) {
  const blob =
    data instanceof Blob
      ? data
      : new Blob([new Uint8Array(data).buffer], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
