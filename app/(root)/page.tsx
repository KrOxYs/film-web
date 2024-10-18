"use client";
import { useState, useEffect } from "react";
import { fetchPopularMovies, fetchTrending } from "@actions/movieData";
import Navbar from "@components/Navbar";
import { Movie } from "@lib/types"; // Pastikan tipe Movie didefinisikan
import Hero from "@components/Hero";
import MovieCard from "@components/MovieCard";

const Home: React.FC = () => {
  const [page, setPage] = useState<number>(1); // State untuk halaman
  const [movies, setMovies] = useState<Movie[]>([]); // State untuk menyimpan semua film
  const [visibleMovies, setVisibleMovies] = useState<Movie[]>([]); // State untuk film yang ditampilkan di UI
  const [loading, setLoading] = useState<boolean>(false); // State untuk loading
  const [tranding, setTrending] = useState(); // State untuk menyimpan film populer
  const moviesPerPage = 6; // Jumlah film yang akan ditampilkan per batch

  // Ambil film ketika komponen pertama kali di-mount
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const initialMovies = await fetchPopularMovies(1); // Ambil film untuk halaman pertama
      setMovies(initialMovies);
      setVisibleMovies(initialMovies.slice(0, moviesPerPage)); // Tampilkan hanya 6 film pertama
      setLoading(false);
    };

    fetchMovies();
  }, []); // Hanya dijalankan sekali saat komponen pertama kali dimuat

  console.log("movies", movies);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const trendingMovies = await fetchTrending();
      const randonNumber = Math.floor(Math.random() * trendingMovies.length);
      const trendingMovie = trendingMovies[randonNumber];
      setTrending(trendingMovie);
    };
    fetchTrendingMovies();
  }, []);

  console.log("trending", tranding);

  // Fungsi untuk memuat lebih banyak film
  const loadMoreMovies = async () => {
    setLoading(true);
    const nextPage = page + 1;
    const newMovies = await fetchPopularMovies(nextPage); // Ambil film baru

    setMovies((prevMovies) => [...prevMovies, ...newMovies]); // Gabungkan dengan film sebelumnya
    setVisibleMovies((prevVisibleMovies) => [
      ...prevVisibleMovies,
      ...newMovies.slice(0, moviesPerPage), // Tambahkan hanya 6 film tambahan
    ]);
    setPage(nextPage); // Update halaman
    setLoading(false);
  };

  // hero
  return (
    <div>
      <Navbar />
      <div className=" w-fit overflow-x-hidden">
        <Hero trendingMovies={tranding} />
      </div>
      <div className="all-movies grid grid-cols-3 gap-6 p-4">
        {/* Tampilkan daftar film */}
        <div className="flex flex-wrap gap-9">
          {visibleMovies.map((movie) => (
            <div className="flex">
              <MovieCard key={movie.id} movie={movie} />
            </div>
          ))}
        </div>

        {/* Tombol Load More */}
        <div className="load-more col-span-3 text-center mt-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <button
              onClick={loadMoreMovies}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

interface MovieCardProps {
  movie: Movie;
}

// const MovieCards: React.FC<MovieCardProps> = ({ movie }) => {
//   return (
//     <div className="relative group overflow-hidden rounded-lg shadow-lg">
//       {/* Gambar film */}
//       <img
//         src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//         alt={movie.title}
//         className="w-[13vw] h-full object-cover"
//       />

//       {/* Overlay saat hover */}
//       <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//         <h3 className="text-white text-lg font-bold mb-2">{movie.title}</h3>
//         <button className="text-white bg-red-500 p-2 rounded-full">❤️</button>
//       </div>
//     </div>
//   );
// };

export default Home;
