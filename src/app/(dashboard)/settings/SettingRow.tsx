import { ReactNode } from "react"

interface Props {
  label: string
  description?: string
  children: ReactNode
}

export function SettingRow({ label, description, children }: Props) {
  return (
    <div className="flex items-center justify-between gap-6 py-4">
      <div className="space-y-1">
        <p className="text-sm font-semibold">{label}</p>
        {description && (
          <p className="text-xs text-gray-500 max-w-md">
            {description}
          </p>
        )}
      </div>
      <div>{children}</div>
    </div>
  )
}
