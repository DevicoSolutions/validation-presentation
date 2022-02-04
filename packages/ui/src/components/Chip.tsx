import { memo } from 'react'
import cx from '../utils/cx.js'
import stail from 'stail'

export interface ChipProps {
  size?: 'small' | 'medium'
  icon?: JSX.Element
  label: any
  className?: string
  spanClassName?: string
}

export interface ChipInnerProps {
  $size?: 'small' | 'medium'
}

export const ChipSpan = stail.span`overflow-hidden overflow-ellipsis whitespace-nowrap
  // Small size has smaller paddings
  ${(props: ChipInnerProps) =>
    props.$size === 'small' ? 'pl-2 pr-2' : 'pl-3 pr-3'}
`

export const ChipContainer = stail.div`text-sm inline-flex items-center justify-center text-white rounded-2xl whitespace-nowrap bg-[#332d36a5] ${(
  props: ChipInnerProps,
) => (props.$size === 'small' ? 'h-6' : 'h-8')}`

export const Chip = memo(
  ({
    className,
    spanClassName,
    label,
    // @ts-ignore
    icon: { type: Icon, props } = {},
    size,
  }: ChipProps) => (
    <ChipContainer $size={size} className={className}>
      {Icon ? (
        <Icon
          {...props}
          className={cx(
            'text-[#e0e0e0]',
            size === 'small' && 'ml-1 -mr-1 text-lg last:mr-1',
            size !== 'small' && 'ml-1.5 -mr-1.5 last:mr-1.5',
            props.className,
          )}
        />
      ) : undefined}
      {label ? (
        <ChipSpan $size={size} className={spanClassName}>
          {label}
        </ChipSpan>
      ) : undefined}
    </ChipContainer>
  ),
)
Chip.displayName = 'Chip'
