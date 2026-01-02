import SecondaryCard from "./SecondaryCard";
import VideoCard from "./VideoCard";
// import ReactTimeCard from "./RealTimeCard";

import {
  useGetTopMoviesQuery,
  useGetAllMoviesQuery,
} from "../../../../redux/api/movies";
import { useGetUsersQuery } from "../../../../redux/api/users";
import RealTimeCard from "./RealTimeCard";
import Skeleton from "../../../../components/common/Skelton";

const Main = () => {
  const { data: topMovies, isLoading: topMoviesLoading } = useGetTopMoviesQuery();
  const { data: visitors, isLoading: visitorsLoading } = useGetUsersQuery();
  const { data: allMovies, isLoading: allMoviesLoading } = useGetAllMoviesQuery();

  const totalCommentsLength = allMovies?.map((m) => m.numReviews);
  const sumOfCommentsLength = totalCommentsLength?.reduce(
    (acc, length) => acc + length,
    0
  );

  return (
    <div className="space-y-8">
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {visitorsLoading || allMoviesLoading ? (
          <>
            <Skeleton variant="card" className="h-[12rem]" />
            <Skeleton variant="card" className="h-[12rem]" />
            <Skeleton variant="card" className="h-[12rem]" />
          </>
        ) : (
          <>
            <SecondaryCard
              pill="Users"
              content={visitors?.length || 0}
              info="20.2k more than usual"
              gradient="from-teal-500 to-lime-400"
            />
            <SecondaryCard
              pill="Movies"
              content={allMovies?.length || 0}
              info="372+ more than usual"
              gradient="from-green-500 to-lime-400"
            />
            <SecondaryCard
              pill="Comments"
              content={sumOfCommentsLength || 0}
              info="742.8 more than usual"
              gradient="from-[#CCC514] to-[#CDCB8E]"
            />
          </>
        )}
      </section>

      <div className="bg-gray-700 rounded-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between w-full text-white font-bold mb-6 gap-2">
          <p className="text-xl">Top Content</p>
          <p className="text-gray-400">Comments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topMoviesLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} variant="card" className="h-32" />
            ))
          ) : (
            topMovies?.map((movie) => (
              <VideoCard
                key={movie._id}
                image={movie.image}
                title={movie.name}
                date={movie.year}
                comments={movie.numReviews}
              />
            ))
          )}
        </div>
      </div>

      <div className="bg-gray-700 rounded-lg p-6">
        <RealTimeCard />
      </div>
    </div>
  );
};

export default Main;