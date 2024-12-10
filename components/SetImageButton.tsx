'use client'

import ImageButton from '@/components/ImageButton'
import { useFabricCanvas } from '@/lib/hooks'
import * as fabric from 'fabric'

export default function SetImageButton({
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
      image.scale(0.5)
      canvas.centerObject(image)
      canvas.add(image)
    })
  }

  return <ImageButton onClick={handleClick} imageUrl={imageUrl} index={index} />
}
