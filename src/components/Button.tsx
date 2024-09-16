import React from 'react'

type ButtonProps = {
  children: React.ReactNode
  disabled?: boolean
  onClick?: () => void
  type?: HTMLButtonElement['type']
}

export function Button({
  children,
  disabled = false,
  onClick,
  type = 'button',
  ...rest
}: ButtonProps) {
  const handleClick = () => {
    if (disabled) return
    onClick?.()
  }

  return (
    <button
      /**
       * It's more accessible to use aria-disabled than the disabled attribute,
       * according to https://css-tricks.com/making-disabled-buttons-more-inclusive
       */
      aria-disabled={disabled}
      className="relative rounded bg-rose-400 px-4 py-2 transition-all hover:bg-pink-500 active:top-[1px] aria-disabled:cursor-not-allowed aria-disabled:opacity-80"
      onClick={handleClick}
      type={type}
      {...rest}
    >
      {children}
    </button>
  )
}
