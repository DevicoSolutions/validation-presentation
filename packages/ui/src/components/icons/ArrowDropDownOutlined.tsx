export default function ArrowDropDownOutlined({
  className = '',
}: {
  className?: string
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      className={`fill-current ${className}`}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M7 10l5 5 5-5H7z" />
    </svg>
  )
}