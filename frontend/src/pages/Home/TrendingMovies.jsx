import { useGetNewMoviesQuery, useGetTopMoviesQuery, useGetRandomMoviesQuery } from "../../redux/api/movies";
import SliderUtil from "../../components/SliderUtil";
import Skeleton from "../../components/common/Skelton";

const TrendingMovies = () => {
  const { data: newMovies, isLoading: loadingNew } = useGetNewMoviesQuery();
  const { data: topMovies, isLoading: loadingTop } = useGetTopMoviesQuery();
  const { data: randomMovies, isLoading: loadingRandom } = useGetRandomMoviesQuery();

  return (
    <section className="py-16 px-4 bg-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* New Movies Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">New Releases</h2>
          {loadingNew ? (
            <div className="flex gap-4 overflow-hidden">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex-shrink-0 w-48">
                  <Skeleton variant="card" className="h-72" />
                </div>
              ))}
            </div>
          ) : (
            <SliderUtil data={newMovies || []} />
          )}
        </div>

        {/* Top Movies Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Top Rated Movies</h2>
          {loadingTop ? (
            <div className="flex gap-4 overflow-hidden">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex-shrink-0 w-48">
                  <Skeleton variant="card" className="h-72" />
                </div>
              ))}
            </div>
          ) : (
            <SliderUtil data={topMovies || []} />
          )}
        </div>

        {/* Random Movies Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">You Might Like</h2>
          {loadingRandom ? (
            <div className="flex gap-4 overflow-hidden">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex-shrink-0 w-48">
                  <Skeleton variant="card" className="h-72" />
                </div>
              ))}
            </div>
          ) : (
            <SliderUtil data={randomMovies || []} />
          )}
        </div>
      </div>
    </section>
  );
};

export default TrendingMovies;