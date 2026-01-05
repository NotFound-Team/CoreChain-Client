import { ReactNode } from "react"
import { Card, CardContent } from "@mui/material"
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
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600">
            <Icon size={18} />
          </div>
          <div>
            <h3 className="font-bold">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>

        <div className="divide-y">{children}</div>
      </CardContent>
    </Card>
  )
}
