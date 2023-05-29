import Image from "next/image";
import { FC } from "react";
import { VscAccount } from "react-icons/vsc";

interface ProfileImageProps {
  src?: string | null;
  className?: string;
}

const ProfileImage: FC<ProfileImageProps> = ({ src, className = "" }) => {
  return (
    <div
      className={`relative h-12 w-12 overflow-hidden rounded-full ${className}`}
    >
      {src == null ? (
        <VscAccount className="h-full w-full" />
      ) : (
        <Image src={src} alt="profile image" quality={100} fill />
      )}
    </div>
  );
};

export default ProfileImage;
