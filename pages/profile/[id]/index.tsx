"use client";
import { readUserSocials } from "@/config/dbApi";
import Header from "@/layout/Header";
import ProfilePrivateView from "@/views/profile/ProfilePrivateView";
import ProfilePublicView from "@/views/profile/ProfilePublicView";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

export default function Profile() {
  const router = useRouter();
  const PROFILE_NAME: string = `${router?.query?.id}`;

  const [IsMyProfile, setIsMyProfile] = useState(false);
  const [SocialData, setSocialData] = useState<any>({});
  const BODY = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const socialData: any = async () => await readUserSocials(PROFILE_NAME);
    setSocialData(socialData);
  }, [PROFILE_NAME]);

  return (
    <>
      <Header profileName={PROFILE_NAME} />
      <main
        className="am-ami-container-sm p-6 h-[calc(100dvh-97.02px)] overflow-y-auto scroll-smooth"
        style={{ scrollSnapType: "y mandatory" }}
        ref={BODY}
      >
        {IsMyProfile ? (
          <ProfilePrivateView PROFILE_NAME={PROFILE_NAME} BODY={BODY} />
        ) : (
          <ProfilePublicView
            SocialData={SocialData}
            profileName={PROFILE_NAME}
          />
        )}
      </main>
    </>
  );
}
