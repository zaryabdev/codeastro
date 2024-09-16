import React from 'react'

export type TextareaProps = {
  id?: string
  label?: string
  required?: boolean
  rows?: number
}

export function Textarea({
  id,
  label,
  required = false,
  rows = 4,
}: TextareaProps) {
  return (
    <label className="flex flex-col gap-2" htmlFor={id}>
      {label && <div className="text-xl">{label}</div>}

      <textarea
        className="w-full rounded p-2 text-black"
        id={id}
        name={id}
        required={required}
        rows={rows}
      ></textarea>
    </label>
  )
}
