import * as Icon from '@phosphor-icons/react'
import { FunctionComponent } from 'react'

export const iconConfig: Icon.IconProps = {
  size: 32,
  weight: 'light',
}

type ExcludeKeys =
  | 'Icon'
  | 'IconProps'
  | 'IconWeight'
  | 'IconContext'
  | 'IconBase'

export type IconKeyType = Exclude<keyof typeof Icon, ExcludeKeys>
export type IconComponentType = FunctionComponent<Icon.IconProps>

const excludeKeys = [
  'Icon',
  'IconProps',
  'IconWeight',
  'IconContext',
  'IconBase',
]

export const iconKeys = Object.keys(Icon).filter(
  (key) => !excludeKeys.includes(key),
) as IconKeyType[]

export const getRandomIconKey = () =>
  iconKeys[Math.floor(Math.random() * iconKeys.length)]

export const getIconComponent = (iconKey: IconKeyType): IconComponentType => {
  return Icon[iconKey] as IconComponentType
}
