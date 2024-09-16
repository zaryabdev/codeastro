import React from 'react'

export type InputProps = {
  id?: string
  label?: string
  required?: boolean
  type?: HTMLInputElement['type']
} & Record<string, unknown>

export function Input({
  id,
  label,
  required = false,
  type = 'text',
  ...rest
}: InputProps) {
  return (
    <label className="flex flex-col gap-2" htmlFor={id}>
      {label && <div className="text-xl">{label}</div>}

      <input
        {...rest}
        className="w-full rounded bg-white p-2 text-black"
        id={id}
        name={id}
        required={required}
        type={type}
      />
    </label>
  )
}
