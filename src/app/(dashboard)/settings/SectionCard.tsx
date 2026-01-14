import { ReactNode } from "react"
import { IconType } from "react-icons"

interface Props {
  title: string
  description: string
  icon: IconType
  children: ReactNode
}

export function SectionCard({
  title,
  description,
  icon: Icon,
  children,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-gray-50/50">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-indigo-600/10 text-indigo-600 flex-shrink-0">
            <Icon size={22} />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500 mt-0.5">{description}</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="divide-y divide-gray-100">{children}</div>
      </div>
    </div>
  )
}
