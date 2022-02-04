export default function cx(
  ...opts: (string | undefined | null | false | { [key: string]: boolean })[]
) {
  return (
    opts
      .filter((item) => item)
      // @ts-ignore
      .map((item: string | { [key: string]: boolean }) =>
        typeof item === 'string'
          ? item
          : Object.keys(item)
              .filter((key) => item[key])
              .join(' '),
      )
      .join(' ')
  )
}
