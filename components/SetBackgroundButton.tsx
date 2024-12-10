'use client'

import ImageButton from '@/components/ImageButton'
import { useFabricCanvas } from '@/lib/hooks'
import * as fabric from 'fabric'

export default function SetBackgroundButton({
  imageUrl,
  index,
}: {
  imageUrl: string
  index: number
}) {
  const { canvas } = useFabricCanvas()

  const handleClick = () => {
    if (!canvas) return
    fabric.FabricImage.fromURL(imageUrl as string).then((image) => {
      image.scaleToWidth(canvas.width)
      image.scaleToHeight(canvas.height)
      canvas.backgroundImage = image
      canvas.renderAll()
    })
  }

  return <ImageButton onClick={handleClick} imageUrl={imageUrl} index={index} />
}
