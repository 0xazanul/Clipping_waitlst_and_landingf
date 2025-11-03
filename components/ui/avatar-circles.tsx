"use client"

import { cn } from "@/lib/utils"

interface Avatar {
  imageUrl: string
  profileUrl: string
}
interface AvatarCirclesProps {
  className?: string
  numPeople?: number
  avatarUrls: Avatar[]
}

export const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls,
}: AvatarCirclesProps) => {
  return (
    <div className={cn("z-10 flex -space-x-1 sm:-space-x-1.5 rtl:space-x-reverse", className)}>
      {avatarUrls.map((url, index) => (
        <img
          key={index}
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full border-2 border-white/20 object-cover"
          src={url.imageUrl}
          width={40}
          height={40}
          alt={`Avatar ${index + 1}`}
        />
      ))}
      {(numPeople ?? 0) > 0 && (
        <div
          className="flex w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 items-center justify-center rounded-full border-2 border-white/20 bg-gradient-to-br from-slate-800 to-slate-900 text-center text-[10px] sm:text-xs font-medium text-white/90"
        >
          +{numPeople}
        </div>
      )}
    </div>
  )
}
