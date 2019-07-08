import React from 'react'

export default {
  onDragOver(e: DragEvent | React.DragEvent<any>) {
    e.preventDefault()
    const transfer = e.dataTransfer
    if (transfer) {
      transfer.dropEffect = 'move'
    }
  },
  onDrop(e: DragEvent | React.DragEvent<any>, cb: (data: File) => void) {
    e.stopPropagation()
    e.preventDefault()
    const transfer = e.dataTransfer
    if (transfer) {
      const file: File = transfer.files[0]
      cb(file)
    }
  }
}
