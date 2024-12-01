import { CircleCheck } from "lucide-react"

interface PropertyHighligthProps {
  highligths: string[]
}

const PropertyHighligths = ({ highligths }: PropertyHighligthProps) => {
  return (
    <div className="flex flex-col p-5">
      <h2 className="mb-2 font-semibold text-primaryDarker">Destaques</h2>
      <div className="flex flex-wrap gap-y-3">
        {highligths.map((highligth) => (
          <div key={highligth} className="flex w-1/2 items-center gap-2">
            <CircleCheck className="text-primary" width={16} height={16} />

            <p className="text-xs text-grayPrimary">{highligth}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PropertyHighligths
