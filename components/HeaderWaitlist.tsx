"use client";

import { useRealtimeWaitlist } from "@/hooks/useRealtimeWaitlist";
import { useState } from "react";
import { AvatarCircles } from "@/components/ui/avatar-circles";
import { RainbowButton } from "@/components/ui/rainbow-button";
import EnhancedWaitlistModal from "@/components/EnhancedWaitlistModal";

const avatarUrls = [
  {
    imageUrl: "https://avatars.githubusercontent.com/u/16860528",
    profileUrl: "https://github.com/dillionverma",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/20110627",
    profileUrl: "https://github.com/tomonarifeehan",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/106103625",
    profileUrl: "https://github.com/BankkRoll",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59228569",
    profileUrl: "https://github.com/safethecode",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59442788",
    profileUrl: "https://github.com/sanjay-mali",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/89768406",
    profileUrl: "https://github.com/itsarghyadas",
  },
];

export default function HeaderWaitlist() {
  const waitlistCount = useRealtimeWaitlist();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (waitlistCount === null || waitlistCount === 0) return null;

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="w-full px-2 sm:px-4">
        <div className="flex flex-col items-center justify-center gap-3 sm:gap-4">
          
          <div className="flex items-center flex-wrap justify-center gap-1 sm:gap-1.5 text-center">
            <span className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400 font-normal antialiased">
              Join
            </span>
            <span className="font-semibold text-xs sm:text-sm md:text-base lg:text-lg text-orange-400 antialiased">
              {waitlistCount.toLocaleString()}+
            </span>
            <span className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400 font-normal antialiased whitespace-nowrap">
              others on the waitlist
            </span>
          </div>

          <div className="relative flex items-center justify-center">
            <RainbowButton 
              onClick={() => setIsModalOpen(true)}
              className="px-6 sm:px-8 md:px-10 h-8 sm:h-9"
            >
              Join Waitlist
            </RainbowButton>
          </div>

          <AvatarCircles 
            avatarUrls={avatarUrls}
            className="justify-center"
          />
        </div>
      </div>

      <EnhancedWaitlistModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
