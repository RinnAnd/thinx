import { type NextPage } from "next";
import NewThinxForm from "~/components/NewThinxForm";
import InfiniteThinxList from "~/components/InfiniteThinxList";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useState } from "react";

const TABS = ["Recent", "Following"] as const;

const Home: NextPage = () => {
  const [selectedTab, setSelectedTab] =
    useState<(typeof TABS)[number]>("Recent");

  const session = useSession();
  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-white pt-2">
        <h1 className="mb-2 px-4 text-lg font-bold">Home</h1>
        {session.status === "authenticated" && (
          <div className="flex">
            {TABS.map((tab) => {
              return (
                <button
                  key={tab}
                  className={`flex-grow p-2 hover:bg-gray-200 focus-visible:bg-gray-200 ${
                    tab === selectedTab
                      ? "border-b-4 border-b-blue-500 font-bold"
                      : ""
                  }`}
                  onClick={() => setSelectedTab(tab)}
                >{tab}</button>
              );
            })}
          </div>
        )}
      </header>
      <NewThinxForm />
      <RecentThinx />
    </>
  );
};

function RecentThinx() {
  const thinx = api.thinx.infiniteFeed.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  return (
    <InfiniteThinxList
      thinx={thinx.data?.pages.flatMap((page) => page.thinx)}
      isError={thinx.isError}
      isLoading={thinx.isLoading}
      hasMore={thinx.hasNextPage}
      fetchNewThinx={thinx.fetchNextPage}
    />
  );
}

export default Home;
