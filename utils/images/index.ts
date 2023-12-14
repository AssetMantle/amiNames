import logo from "../../public/assets/images/logo.svg";
import close from "../../public/assets/images/close.svg";
import successTick from "../../public/assets/images/success_tick.svg";
import chevronDown from "../../public/assets/images/chevron_down.svg";
import loader from "../../public/assets/images/loader.gif";
import assetMantleLogo from "../../public/assets/images/asset_mantle_logo.svg";
import amiLogo from "../../public/assets/images/ami_logo.png";
import heroImg from "../../public/assets/images/hero_img.png";
import passwordlessLogin from "../../public/assets/images/passwordless_login.svg";
import interoperability from "../../public/assets/images/interoperability.svg";
import beyondCosmos from "../../public/assets/images/beyond_cosmos.svg";
import twitter from "../../public/assets/images/twitter.png";
import telegram from "../../public/assets/images/telegram.png";
import linkedin from "../../public/assets/images/linkedin.png";
import warpcast from "../../public/assets/images/warpcast.png";
import downArrowRounded from "../../public/assets/images/down_arrow_rounded.svg";
import amiLogoWhite from "../../public/assets/images/ami_logo_white.svg";
import logoWhite from "../../public/assets/images/logo_white.svg";
import speaker from "../../public/assets/images/speaker.svg";
import assetmantleLogo from "../../public/assets/images/assetmantle_logo.svg";
import discordShare from "../../public/assets/images/discord.svg";
import instaShare from "../../public/assets/images/instagram.svg";

export type TImages =
  | "logo"
  | "close"
  | "successTick"
  | "chevronDown"
  | "loader"
  | "assetMantleLogo"
  | "amiLogo"
  | "heroImg"
  | "passwordlessLogin"
  | "interoperability"
  | "beyondCosmos"
  | "twitter"
  | "telegram"
  | "linkedin"
  | "warpcast"
  | "downArrowRounded"
  | "amiLogoWhite"
  | "logoWhite"
  | "speaker"
  | "discordShare"
  | "instaShare"
  | "assetmantleLogo";

export type TNextImage = {
  src: string;
  height: number;
  width: number;
};

export const icons: Record<TImages, TNextImage> = {
  logo,
  close,
  successTick,
  chevronDown,
  loader,
  assetMantleLogo,
  amiLogo,
  heroImg,
  passwordlessLogin,
  interoperability,
  beyondCosmos,
  twitter,
  telegram,
  linkedin,
  warpcast,
  downArrowRounded,
  amiLogoWhite,
  logoWhite,
  speaker,
  assetmantleLogo,
  discordShare,
  instaShare,
};
