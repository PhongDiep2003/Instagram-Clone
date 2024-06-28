import React, {useState} from 'react'
import useToasts from './useToast'
const usePreviewImg = () => {
  const [seletecImg, setSelectedImg] = useState(null)
  const {showToast} = useToasts()
  // allow loaded img to have a max size of 2MB
  const maxImgSize = 2 * 1024 * 1024
  const handleImageSelect = (e) => {
    // retrieve the selected file from e object
    const file = e.target.files[0]
    // check if a file has been selected and if the file is the image file
    if (file && file.type.startsWith("image/")) {
      if (file.size > maxImgSize) {
        showToast('Error', 'File size must be less than 2MB', 'error')
        setSelectedImg(null)
        return
      }
      // FileReader object in JavaScript is used to read the contents of files (or raw data buffers) stored on the user's computer
      const reader = new FileReader()
      // readAsDataURL() is a asynchronou function that is used to convert the file into a base64-encoded string so that it can be used to display on web. When a read operation is initiated, it runs in the background. The FileReader object emits events to signal the progress, completion, or failure of the read operation.
      reader.readAsDataURL(file)
      // Since file reading is asynchronous, we need a way to know when the data is ready. onloadend provides a clean way to execute code after the asynchronous operation completes. Onloadend handles both success and failure cases of the read operation. If you need to handle these cases separately, you could use onload for success and onerror for failures instead. If the read operation fail, selectImg will be set to null
      reader.onloadend = () => {
        setSelectedImg(reader.result)
      }
    }
    else {
      showToast("Error", 'Please select an image file', 'error')
      setSelectedImg(null)
    }
  }
  return {
    seletecImg, handleImageSelect, setSelectedImg
  }
}

export default usePreviewImg
