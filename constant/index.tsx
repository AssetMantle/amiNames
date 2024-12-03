export const rpc = "https://rpc.assetmantle.one/";
export const restApi = "https://rest.assetmantle.one/";
export const chain = "assetmantle";
export const defaultChainDenom = "umntl";
export const defaultFeeAmount = "2000";
export const defaultFeeGas = "250000";
export const heroSecHeadingText = "Unleash the future of";
export const heroSecHeadingGradientText = "Digital Asset Management";
export const heroSecDescHeadingText = "Introducing AMI Names - ";
export const heroSecDescText = (
  <>
    Your Exclusive Gateway to Simplified Asset Control, Protecting Your Privacy
  </>
);
export const heroSecBtnText = "Claim your own AMI Name";
export const heroSecSupportText =
  "Note: You need to have a referral link to claim AMI Name.";
export const featureSecHeading = (
  <>
    Pioneering Decentralized Verifiable Credentials <br /> in Web3
  </>
);
export const feature1Heading = "Passwordless Login";
export const feature1Desc =
  "Enhance security & user experience by eliminating passwords.";
export const feature2Heading = "Interoperability";
export const feature2Desc =
  " Same digital identity across platforms and services, including web2 platforms like Auth0";
export const feature3Heading = "Beyond Cosmos";
export const feature3Desc =
  "In the future, AMI Names will have the potential to extend their utility beyond the cosmos ecosystem.";
export const referralProgramSecHeading = (
  <>
    This is exclusively a referral program at the <br /> moment
  </>
);
export const referralProgramSecDesc = "Join us in spreading the word!";
export const faqHeading = "Frequently Asked Questions";
export const twitterUrl = "https://twitter.com/AssetMantle";
export const telegramUrl = "https://t.me/assetmantlechat";
export const linkedinUrl = "https://in.linkedin.com/";
export const discordUrl = "https://discord.com/invite/BSdBQ4495d";
export const instaUrl = "https://www.instagram.com/assetmantle/";
export const warpcastUrl = "https://warpcast.com/";
export const instagramUrl = "https://instagram.com/";
export const blocktheoryUrl = "https://blocktheory.com/";
export const blogsUrl =
  "https://blog.assetmantle.one/2023/09/29/introducing-aminames/";
export const docsUrl = "https://docs.assetmantle.one/AMIName_Terminology/";
export const contactUsUrl = "mailto:hello@assetmantle.one";
export const homePageHeadingText = "Claim your permanant";
export const homePageHeadingGradientText = "AMI Name";
export const homePageHeadingFree = "for free!";
export const mintModalHeadingText = "My AMI Name";
export const premiumAddress = "mantle1pkkayn066msg6kn33wnl5srhdt3tnu2vuet86j";
export const reservedAddress = "mantle1cgjgrp3fl2ef98me8v7nywtz4nnvjcx6yqu3t7";
export const referralText = "Referral link";
export const referralLink = "https://mantle-web3id.vercel.app/";
export const assetmantleUrlLink = "https://www.assetmantle.one/";

/* export const websiteUrlRegEx =
  /^(?:(?:(?:https?|ftp|mailto):)?\/\/(?:www\.)?)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})?(:\d+)?(\/[^\s]*)?$/; */
/* export const websiteUrlRegEx =
  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/; */
export const websiteUrlRegEx =
  /^(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})(:\d+)?(\/[^\s]*)?$/;

// export const wwwUrlRegEx = /^www\.[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\S*)$/;
export const wwwUrlRegEx = /^www\./i;

export const twitterUrlRegEx =
  /^(?:https?:\/\/)?(?:www\.)?(?:mobile\.)?twitter\.com\/(?:\w+\/)?(?:i\/profiles\/show\/\d+\/?)?(?:\w+\/?)?(?:status\/\d+\/?(?:with_replies\/?)?)?$/;
export const twitterHandleRegEx = /^(?:@)?[a-zA-Z0-9_]{1,15}$/;

export const telegramUrlRegEx =
  /^(?:https?:\/\/)?(?:www\.)?t\.me\/[a-zA-Z0-9_]{5,32}$/;
export const telegramHandleRegEx = /^(?:@)?[a-zA-Z0-9_]{5,32}$/;

/* export const instagramUrlRegEx =
  /^https:\/\/(?:www\.)?instagram\.com\/[a-zA-Z0-9_](?:[a-zA-Z0-9_.]{0,28}[a-zA-Z0-9_])?\/?$/; */
export const instagramUrlRegEx =
  /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9_.]{1,30}\/?$/;

export const instagramHandleRegEx =
  /^(?:@)?[a-zA-Z0-9_](?:[a-zA-Z0-9_.]{0,28}[a-zA-Z0-9_])?$/;

export const LinksList = [
  {
    key: "twitter",
    icon: "/assets/images/icons/twitter-t.svg",
    text: "Twitter",
    profileUrl: (username: string) => `https://twitter.com/${username}`,
    validationRegex: /^[a-zA-Z0-9_]{1,15}$/, // Letters, numbers, underscores, 1-15 chars
    classNames: "bg-black",
  },
  {
    key: "telegram",
    icon: "/assets/images/icons/telegram-t.svg",
    text: "Telegram",
    profileUrl: (username: string) => `https://t.me/${username}`,
    validationRegex: /^[a-zA-Z0-9_]{5,32}$/, // Telegram usernames, 5-32 chars
    classNames: "am-ami-bg-telegram",
  },
  {
    key: "instagram",
    icon: "/assets/images/icons/instagram-t.svg",
    text: "Instagram",
    profileUrl: (username: string) => `https://instagram.com/${username}`,
    validationRegex: /^[a-zA-Z0-9._]{1,30}$/, // Letters, numbers, dots, underscores, 1-30 chars
    classNames: "am-ami-bg-instagram",
  },
  {
    key: "website",
    icon: "/assets/images/icons/globe-w.svg",
    text: "Website",
    profileUrl: (url: string) => url, // Directly use user-provided URL
    validationRegex: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}.*$/, // Valid HTTP/HTTPS URLs
    classNames: "bg-black",
  },
  {
    key: "linkedin",
    icon: "/assets/images/icons/linkedin.svg",
    text: "LinkedIn",
    profileUrl: (username: string) => `https://www.linkedin.com/in/${username}`,
    validationRegex: /^[a-zA-Z0-9-]{1,100}$/, // LinkedIn public profile URL slug
    classNames: "am-ami-bg-linkedin",
  },
  {
    key: "facebook",
    icon: "/assets/images/icons/facebook.svg",
    text: "Facebook",
    profileUrl: (username: string) => `https://facebook.com/${username}`,
    validationRegex: /^[a-zA-Z0-9.]{5,50}$/, // Facebook usernames, 5-50 chars
    classNames: "am-ami-bg-facebook",
  },
  {
    key: "youtube",
    icon: "/assets/images/icons/youtube.svg",
    text: "YouTube",
    profileUrl: (channelId: string) => `https://www.youtube.com/@${channelId}`,
    validationRegex: /^[a-zA-Z0-9_-]{1,50}$/, // Channel/user IDs
    classNames: "am-ami-bg-youtube",
  },
  {
    key: "github",
    icon: "/assets/images/icons/github.svg",
    text: "GitHub",
    profileUrl: (username: string) => `https://github.com/${username}`,
    validationRegex: /^[a-zA-Z0-9-]{1,39}$/, // GitHub usernames, 1-39 chars
    classNames: "bg-black",
  },
  {
    key: "medium",
    icon: "/assets/images/icons/medium.svg",
    text: "Medium",
    profileUrl: (username: string) => `https://${username}.medium.com`,
    validationRegex: /^[a-zA-Z0-9-]{1,50}$/, // Medium usernames, 1-50 chars
    classNames: "bg-black",
  },
];

export const formatWebsiteUrl = (input: string) => {
  // Trim spaces
  input = input.trim();

  // Get the length of the input
  const n = input.length;

  // If the input length is up to 8 characters
  if (n <= 8) {
    // Slice both "http://" and "https://" to the length of input
    const httpSlice = "http://".slice(0, n);
    const httpsSlice = "https://".slice(0, n);

    // If either slice matches the input, return it as is
    if (input.startsWith(httpSlice) || input.startsWith(httpsSlice)) {
      return input;
    }

    // Otherwise, add "https://" as the default protocol
    return "https://" + input;
  }

  // If the input length is more than 8 characters, handle it as a full URL
  // Compare first 7 chars with "https://"
  if (input.slice(0, 7) !== "https://") {
    // Compare first 8 chars with "https://"
    if (input.slice(0, 8) !== "https://") {
      // If neither match, prepend "https://"
      return "https://" + input;
    }
  }

  // Otherwise, if it's already starting with "https://", return it as is
  return input;
};
