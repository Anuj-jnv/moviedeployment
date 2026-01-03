import { motion } from "framer-motion";
import CountUp from "react-countup";

import SecondaryCard from "./SecondaryCard";
import VideoCard from "./VideoCard";
import RealTimeCard from "./RealTimeCard";

import {
  useGetTopMoviesQuery,
  useGetAllMoviesQuery,
} from "../../../../redux/api/movies";
import { useGetUsersQuery } from "../../../../redux/api/users";

/* Simple entrance animation (runs once) */
const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

const Main = () => {
  const { data: topMovies = [] } = useGetTopMoviesQuery();
  const { data: visitors = [] } = useGetUsersQuery();
  const { data: allMovies = [] } = useGetAllMoviesQuery();

  const totalComments = allMovies.reduce(
    (acc, movie) => acc + movie.numReviews,
    0
  );

  return (
    <div className="space-y-12">
      {/* ===================== STATS ===================== */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.3 }}
        >
          <SecondaryCard
            pill="Users"
            content={<CountUp end={visitors.length} duration={0.6} />}
            info="20.2k more than usual"
            gradient="from-teal-500 to-emerald-400"
          />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.35 }}
        >
          <SecondaryCard
            pill="Movies"
            content={<CountUp end={allMovies.length} duration={0.6} />}
            info="372+ more than usual"
            gradient="from-emerald-500 to-lime-400"
          />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.4 }}
        >
          <SecondaryCard
            pill="Comments"
            content={<CountUp end={totalComments} duration={0.6} />}
            info="742+ more than usual"
            gradient="from-amber-400 to-yellow-300"
          />
        </motion.div>
      </section>

      {/* ===================== TOP CONTENT ===================== */}
      <section className="bg-gray-800/80 backdrop-blur rounded-2xl p-6 border border-gray-700/50 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">
            Top Content
          </h2>
          <span className="text-sm text-gray-400">
            Most commented movies
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topMovies.map((movie, index) => (
            <motion.div
              key={movie._id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
            >
              <VideoCard
                image={movie.image}
                title={movie.name}
                date={movie.year}
                comments={movie.numReviews}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===================== REAL TIME ===================== */}
      <section className="bg-gray-800/80 backdrop-blur rounded-2xl p-6 border border-gray-700/50 shadow-xl">
        <RealTimeCard />
      </section>
    </div>
  );
};

export default Main;
