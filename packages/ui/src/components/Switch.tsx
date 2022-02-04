import { memo } from 'react'
import cx from '../utils/cx.js'

export interface SwitchProps {
  value: boolean
  label?: string
  onChange(value: boolean): any
  className?: string
}

export const Switch = memo(function Switch({
  value,
  onChange,
  label,
  className,
}: SwitchProps) {
  return (
    <div
      className={cx(
        'flex flex-nowrap gap-4 items-center my-1 py-2 cursor-pointer',
        className,
      )}
      onClick={() => onChange(!value)}
    >
      <div
        className={cx('relative w-9 h-3 rounded-full transition-colors', {
          'bg-gamesPrimary/50': value,
          'bg-white/25': !value,
        })}
      >
        <div
          className={cx('absolute -mt-1 w-5 h-5 rounded-full transition-all ', {
            'bg-gamesPrimary left-5': value,
            'bg-gray-300 left-0': !value,
          })}
        />
      </div>
      <div className="flex-1 select-none text-white/70">{label}</div>
    </div>
  )
})
