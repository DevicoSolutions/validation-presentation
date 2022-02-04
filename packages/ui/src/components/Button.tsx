import { ElementType, MouseEventHandler } from 'react'
import stail from 'stail'

export interface ButtonProps {
  active?: boolean
  className?: string
  onClick?: MouseEventHandler
  label?: string
  leftIcon?: JSX.Element
  rightIcon?: JSX.Element
  as?: ElementType<any> | undefined
}
const shouldForwardProp = (prop: string) => prop !== 'active'

export const Button = stail(
  ({ label, leftIcon, rightIcon, ...rest }: ButtonProps) => (
    <button {...rest}>
      {leftIcon}
      {label && <div>{label}</div>}
      {rightIcon}
    </button>
  ),
  {
    shouldForwardProp,
    displayName: 'Button',
  },
)`
cursor-pointer h-10 font-normal px-4 py-2 text-white/70 whitespace-nowrap
flex items-center rounded-lg transition-colors justify-center

// Icon
child-svg:mx-2 child-svg:my-0 child-svg:first:ml-0 child-svg:last:mr-0

${({ active }: { active?: boolean }) =>
  active
    ? 'bg-white/30 hover:bg-white/40 active:bg-white/50'
    : 'bg-white/10 hover:bg-white/25 active:bg-white/40'}
`
