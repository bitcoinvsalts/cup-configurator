import type { ForwardRefExoticComponent, RefAttributes } from 'react'

import {
  ArrowDownFromLineIcon,
  ChevronRightCircle,
  FileDownIcon,
  XSquareIcon,
  LucideProps,
  LucideIcon,
  XIcon,
} from 'lucide-react'
import { ButtonProps, Button } from '@/components/ui/button'
import { downloadCanvasAsImage, cn } from '@/lib/utils'
import WithTooltip from '@/components/WithTooltip'
import { useFabricCanvas } from '@/lib/hooks'
import { useState, useMemo } from 'react'
import { FabricImage } from 'fabric'
import image from 'next/image'

import IntrinsicAttributes = JSX.IntrinsicAttributes

type CanvasAction = {
  component: {
    element: ForwardRefExoticComponent<
      RefAttributes<HTMLButtonElement> & ButtonProps
    >
    props: ButtonProps
  }
  icon: { props: IntrinsicAttributes & LucideProps; element: LucideIcon }
  name: string
}

export default function Canvas2DActions() {
  const [isActionsVisible, setIsActionsVisible] = useState(false)
  const { canvas } = useFabricCanvas()
  const actions: CanvasAction[] = useMemo(
    () =>
      [
        {
          component: {
            props: {
              onClick: () => {
                if (!canvas) return
                // Remove all objects from fabric canvas
                canvas.remove(...canvas.getObjects())
                // Clear canvas background
                console.log('Clear canvas background....')
                canvas.backgroundImage = null as unknown as FabricImage
                canvas.backgroundColor = '#f2f2f2'
                canvas.requestRenderAll()
              },
            },
            element: Button,
          },
          icon: {
            props: {
              className: '',
              size: 16,
            },
            element: XIcon,
          },
          name: 'Clear canvas',
        },
        {
          component: {
            props: {
              onClick: () => {
                if (!canvas) return
                // Clear canvas background
                console.log('Clear canvas backgroundxx')
                canvas.backgroundImage = null as unknown as FabricImage
                canvas.backgroundColor = '#f2f2f2'
                canvas.requestRenderAll()
              },
            },
            element: Button,
          },
          icon: {
            props: {
              className: '',
              size: 16,
            },
            element: XSquareIcon,
          },
          name: 'Remove background',
        },
        {
          component: {
            props: {
              onClick: () => {
                if (!canvas) return
                const activeObject = canvas.getActiveObject()
                if (!activeObject) return
                canvas.sendObjectToBack(activeObject)
                canvas.discardActiveObject()
                canvas.requestRenderAll()
              },
            },
            element: Button,
          },
          icon: {
            props: {
              className: '',
              size: 16,
            },
            element: ArrowDownFromLineIcon,
          },
          name: 'Send selection to back',
        },
        {
          component: {
            props: {
              onClick: () => {
                if (!canvas) return
                const activeObject = canvas.getActiveObject()
                if (!activeObject) return
                canvas.bringObjectToFront(activeObject)
                canvas.discardActiveObject()
                canvas.requestRenderAll()
              },
            },
            element: Button,
          },
          icon: {
            props: {
              className: 'rotate-180',
              size: 16,
            },
            element: ArrowDownFromLineIcon,
          },
          name: 'Bring selection to front',
        },
        {
          component: {
            props: {
              onClick: () => {
                if (!canvas) return
                downloadCanvasAsImage(canvas.lowerCanvasEl)
              },
            },
            element: Button,
          },
          icon: {
            props: {
              className: '',
              size: 16,
            },
            element: FileDownIcon,
          },
          name: 'Save canvas as image',
        },
      ] satisfies CanvasAction[],
    [canvas]
  )

  const handleToggleActions = () => {
    setIsActionsVisible(!isActionsVisible)
  }

  return (
    <>
      {/* Toggle Button */}
      <WithTooltip tip={isActionsVisible ? 'Hide actions' : 'Show actions'}>
        <Button
          className="z-50 h-10 w-10 rounded-full border border-background/50 p-0 opacity-65"
          onClick={handleToggleActions}
        >
          <ChevronRightCircle
            className={cn(
              'transition-transform duration-150 ease-in-out',
              isActionsVisible && 'rotate-180'
            )}
            size={16}
          />
        </Button>
      </WithTooltip>

      {/* Actions List */}
      {actions.map(
        (
          {
            component: { props: componentProps, element: Element },
            icon: { element: Icon, props },
            name,
          },
          index
        ) => (
          <WithTooltip tip={name} key={name}>
            <Element
              {...componentProps}
              style={{
                transform: isActionsVisible
                  ? 'translateX(0%)'
                  : `translateX(calc(-${(index + 1) * 100}% - 0.5rem))`,
                opacity: isActionsVisible ? 0.65 : 0,
              }}
              className={cn(
                'h-10 w-10 rounded-full border border-background/50 p-0',
                'linear transition-all duration-150',
                componentProps.className
              )}
            >
              <Icon {...props} />
            </Element>
          </WithTooltip>
        )
      )}
    </>
  )
}
