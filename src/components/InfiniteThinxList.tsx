import Link from "next/link";
import { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ProfileImage from "./ProfileImage";
import { useSession } from "next-auth/react";
import { VscHeartFilled, VscHeart } from "react-icons/vsc";
import IconHoverEffect from "./IconHoverEffect";
import { api } from "~/utils/api";

type Thinx = {
  id: string;
  content: string;
  createdAt: Date;
  likeCount: number;
  likedByMe: boolean;
  user: {
    id: string;
    image: string | null;
    name: string | null;
  };
};

interface InfiniteThinxListProps {
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean | undefined;
  fetchNewThinx: () => Promise<unknown>;
  thinx?: Thinx[];
}

const InfiniteThinxList: FC<InfiniteThinxListProps> = ({
  thinx,
  isError,
  isLoading,
  fetchNewThinx,
  hasMore = false,
}) => {
  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error...</h1>;
  if (thinx == null || thinx?.length === 0) {
    return (
      <h2 className="my-4 text-center text-2xl text-gray-500">No Thinx</h2>
    );
  }

  return (
    <ul>
      <InfiniteScroll
        dataLength={thinx.length}
        next={fetchNewThinx}
        hasMore={hasMore}
        loader={"Loading..."}
      >
        {thinx.map((think) => (
          <ThinxCard key={think.id} {...think} />
        ))}
      </InfiniteScroll>
    </ul>
  );
};

const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "short",
});

function ThinxCard({
  id,
  user,
  content,
  createdAt,
  likeCount,
  likedByMe,
}: Thinx) {

  const trpcUtils = api.useContext()
  const toggleLike = api.thinx.toggleLike.useMutation({ 
    onSuccess: ({ addedLike }) => {
    const updateData: Parameters<typeof trpcUtils.thinx.infiniteFeed.setInfiniteData>[1] = (oldData) => {
      if (oldData == null) return

      const countModifier = addedLike ? 1 : -1

      return {
        ...oldData,
        pages: oldData.pages.map(page => {
          return {
            ...page,
            thinx: page.thinx.map(think => {
              if(think.id === id) {
                return {
                  ...think,
                  likeCount: think.likeCount + countModifier,
                  likedByMe: addedLike
                }
              }
              return think
            })
          }
        })
      }
    }
    trpcUtils.thinx.infiniteFeed.setInfiniteData({}, updateData)
  }})

  function handleToggleLike() {
    toggleLike.mutate({ id })
  }

  return (
    <li className="flex gap-4 border-b p-4">
      <Link href={`/profiles/${user.id}`}>
        <ProfileImage src={user.image} />
      </Link>
      <div className="flex flex-grow flex-col">
        <div className="flex gap-1 items-center">
          <Link
            href={`/profiles/${user.id}`}
            className="outline:none font-bold hover:underline focus-visible:underline"
          >
            {user.name}
          </Link>
          <span className="text-gray-500">-</span>
          <span className="text-xs text-gray-500">
            {dateTimeFormatter.format(createdAt)}
          </span>
        </div>
        <p className="whitespace-pre-wrap">{content}</p>
        <HeartButton onClick={handleToggleLike} isLoading={toggleLike.isLoading} likedByMe={likedByMe} likeCount={likeCount} />
      </div>
    </li>
  );
}

interface HeartButtonProps {
  onClick: () => void;
  isLoading: boolean;
  likedByMe: boolean;
  likeCount: number;
}

function HeartButton({ likedByMe, likeCount, isLoading, onClick }: HeartButtonProps) {
  const session = useSession();
  const HeartIcon = likedByMe ? VscHeartFilled : VscHeart;

  if (session.status !== "authenticated") {
    return (
      <div className="mb-1 mt-1 flex items-center gap-3 self-start text-gray-500">
        <HeartIcon />
        <span>{likeCount}</span>
      </div>
    );
  }
  return (
    <button
      disabled={isLoading}
      onClick={onClick}
      className={`group -ml-2 flex items-center gap-1 self-start transition-colors duration-200 ${
        likedByMe
          ? "text-red-500"
          : "text-gray-500 hover:text-red-500 focus-visible:text-red-500"
      }`}
    >
      <IconHoverEffect red>
      <HeartIcon
        className={`transition-colors duration-200 ${
          likedByMe
            ? "fill-red-500"
            : "group-hover:fill-red-500 fill-gray-500 group-focus-visible:fill-red-500"
        }`}
      />
      </IconHoverEffect>
      <span>{likeCount}</span>
    </button>
  );
}

export default InfiniteThinxList;
