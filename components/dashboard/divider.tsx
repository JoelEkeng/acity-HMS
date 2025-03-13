import clsx from 'clsx'

export function Divider({
  soft = false,
  className,
  ...props
}: { soft?: boolean } & React.ComponentPropsWithoutRef<'hr'>) {
  return (
    <hr
      role="presentation"
      {...props}
      className={clsx(
        className,
        'w-full border-t',
        soft && 'border-red-600 dark:border-600',
        !soft && 'border-zinc-950/10 dark:border-white/10'
      )}
    />
  )
}
