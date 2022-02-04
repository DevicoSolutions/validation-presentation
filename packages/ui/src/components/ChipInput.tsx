import ArrowDropDownOutlined from './icons/ArrowDropDownOutlined.js'
import CheckBoxOutlineBlank from './icons/CheckBoxOutlineBlank.js'
import CheckBoxOutlined from './icons/CheckBoxOutlined.js'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Chip } from './Chip.js'

export interface ChipInputProps<T> {
  onChange: (values: T[]) => any
  value?: T[]
  options: { label: string; value: T; disabled?: boolean }[]
  className?: string
  placeholder?: string
  menuClassName?: string
  placement?: 'top' | 'bottom'
}

export interface ChipInputItemProps<T> {
  label: string
  value: T
  select: (value: T) => any
  isSelected: boolean
  disabled?: boolean
}

export function ChipInputItem({
  label,
  value,
  select,
  isSelected,
  disabled,
}: ChipInputItemProps<any>) {
  const onClick = useCallback(() => select(value), [value, select])
  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={`${
        disabled ? 'text-gray-500' : 'cursor-pointer'
      } w-full transition-colors bg-gray-700 hover:bg-gray-800`}
    >
      <div className="flex w-full p-2 pl-2">
        {isSelected ? <CheckBoxOutlined /> : <CheckBoxOutlineBlank />}
        <div className="flex-1 mx-2 leading-6">{label}</div>
      </div>
    </div>
  )
}

export const ChipInput = memo(function ChipInput({
  value = [],
  options,
  onChange,
  className,
  placeholder,
  menuClassName = '',
  placement = 'bottom',
}: ChipInputProps<any>) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)
  const selected = useMemo(
    () =>
      options
        .filter((item) => value.includes(item.value))
        .map((value) => (
          <Chip size="small" label={value.label} key={value.value} />
        )),
    [value, options],
  )
  const toggleDropdown = useCallback(() => setOpen(!open), [setOpen, open])
  const select = useCallback(
    (change) =>
      onChange(
        value.includes(change)
          ? value.filter((item) => item !== change)
          : [...value, change].sort(),
      ),
    [value, onChange],
  )

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
    <div ref={containerRef} className={`relative ${className || ''}`}>
      <div
        className={`min-h-10 relative transition-colors my-2 rounded bg-white ${
          open
            ? 'bg-opacity-25 hover:bg-opacity-30'
            : 'bg-opacity-15 hover:bg-opacity-25'
        } w-full cursor-pointer flex items-center`}
        onClick={toggleDropdown}
      >
        {selected.length ? (
          <div className="flex flex-wrap flex-1 gap-1 px-4 py-1">
            {selected}
          </div>
        ) : (
          <div className="flex flex-wrap flex-1 gap-1 px-4 py-1 text-gray-400">
            {placeholder}
          </div>
        )}
        <ArrowDropDownOutlined className="mr-4" />
      </div>
      <div
        className={`absolute ${
          placement === 'top' ? 'bottom-full mb-2' : ''
        } shadow overflow-hidden z-10 rounded  w-full bg-gray-700 transition-max-height ${
          open ? 'max-h-64 overflow-y-scroll py-1' : 'max-h-0'
        } ${menuClassName}`}
      >
        {options.map((option) => (
          <ChipInputItem
            key={option.value}
            isSelected={value.includes(option.value)}
            select={select}
            {...option}
          />
        ))}
      </div>
    </div>
  )
})
