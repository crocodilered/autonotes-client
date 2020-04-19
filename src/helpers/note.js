/**
 * Get filename from file URL
 */
export function getFilename (url) {

  let decodedUrl

  if (url) {
    try {
      decodedUrl = decodeURI(url)
    } catch(e) { // catches a malformed URI
      decodedUrl = url
    }

    const arr = decodedUrl.split('/')
    return arr[arr.length - 1]
    
  }
}
