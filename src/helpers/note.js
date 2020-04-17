/**
 * Get filename from file URL
 */
export function getFilename (url) {
  if (url) {
    const arr = url.split('/')
    return arr[arr.length - 1]
  }
}
