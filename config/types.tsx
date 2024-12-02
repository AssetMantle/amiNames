export interface HeaderProps {
  profileName: string | string[] | undefined;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}
