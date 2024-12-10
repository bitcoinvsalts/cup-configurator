import { Canvas as FabricCanvasBase, IText } from 'fabric'

/* Prettify<T> is a utility type that takes an object type
 * and makes the hover overlay more readable. */
type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}
export type AlignValue =
  | 'justify-center'
  | 'justify-right'
  | 'justify-left'
  | 'justify'
  | 'center'
  | 'right'
  | 'left'
export interface FabricCanvas extends FabricCanvasBase {
  lowerCanvasEl: HTMLCanvasElement
  wrapperEl: HTMLDivElement
}
export type TextSettings = Prettify<IText>
export type PartialTextSettings = Partial<TextSettings>
