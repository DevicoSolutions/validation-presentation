import ArrowDropDownOutlined from './icons/ArrowDropDownOutlined.js'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import cx from '../utils/cx.js'

export interface SelectProps<T> {
  onChange: (values: T) => any
  value: T
  options: { label: string; value: T }[]
  className?: string
  placeholder?: string
  menuClassName?: string
  placement?: 'top' | 'bottom'
}

export interface SelectItemProps<T> {
  label: string
  value: T
  select: (value: T) => any
  isSelected: boolean
}

export function SelectItem({
  label,
  value,
  select,
  isSelected,
}: SelectItemProps<any>) {
  const onClick = useCallback(() => select(value), [value, select])
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer w-full transition-colors ${
        isSelected ? 'bg-gray-500 hover:bg-gray-400' : 'hover:bg-gray-600'
      } `}
    >
      <div className="flex p-2 pl-2 w-full">
        <div className="flex-1 mx-2 leading-6">{label}</div>
      </div>
    </div>
  )
}

export const Select = memo(function Select({
  value,
  options,
  onChange,
  className,
  placeholder,
  placement = 'bottom',
  menuClassName = '',
}: SelectProps<any>) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)
  const selected = useMemo(
    () => options.find((item) => value === item.value)?.label || '',
    [value, options],
  )
  const toggleDropdown = useCallback(() => setOpen(!open), [setOpen, open])
  const select = useCallback((change) => onChange(change), [onChange])

  useEffect(() => {
    if (open) {
      const handler = (e: MouseEvent) => {
        if (
          // @ts-ignore
          !containerRef.current?.contains(e.target) &&
          containerRef.current !== e.target
        ) {
          setOpen(false)
        }
      }
      document.addEventListener('click', handler)
      return () => document.removeEventListener('click', handler)
    }
  }, [open, setOpen])

  return (
    <div ref={containerRef} className={cx('relative', className)}>
      <div
        className={cx(
          'min-h-10 relative flex items-center my-2 w-full bg-white rounded cursor-pointer transition-colors',
          {
            'bg-opacity-25 hover:bg-opacity-30': open,
            'bg-opacity-15 hover:bg-opacity-25': !open,
          },
        )}
        onClick={toggleDropdown}
      >
        {selected ? (
          <div className="flex flex-1 flex-wrap gap-1 px-4 py-1">
            {selected}
          </div>
        ) : (
          <div className="flex flex-1 flex-wrap gap-1 px-4 py-1 text-gray-400">
            {placeholder}
          </div>
        )}
        <ArrowDropDownOutlined className="mr-4" />
      </div>
      <div
        className={cx(
          'transition-max-height absolute z-10 w-full bg-gray-700 rounded shadow overflow-hidden',
          placement === 'top' && 'bottom-full mb-2',
          open ? 'max-h-56 overflow-y-scroll py-1' : 'max-h-0 py-0',
          menuClassName,
        )}
      >
        {options.map((option) => (
          <SelectItem
            key={option.value}
            isSelected={value === option.value}
            select={select}
            {...option}
          />
        ))}
      </div>
    </div>
  )
})
