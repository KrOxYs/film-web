"use client";

import { baseImgUrl } from "@lib/constants";
import { Movie } from "@lib/types";
import { useState } from "react";
import Modal from "./Modal";
import { AiOutlineEye, AiOutlineHeart } from "react-icons/ai"; // Import ikon dari React Icons

const MovieCard = ({ movie }: { movie: Movie }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <div className="relative movie-card group" onClick={openModal}>
        <img
          src={
            movie?.backdrop_path || movie?.poster_path
              ? `${baseImgUrl}${movie?.backdrop_path || movie?.poster_path}`
              : "/assets/no-image.png"
          }
          className="thumbnail"
          alt={movie?.title || movie?.name}
        />
        <div className="border"></div>

        {/* Ikon Mata dan Love yang muncul saat di-hover */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex flex-col items-center text-white">
            <AiOutlineEye size={24} />
            <span className="text-sm">Lihat</span>
          </div>
          <div className="flex flex-col items-center text-white">
            <AiOutlineHeart size={24} />
            <span className="text-sm">Suka</span>
          </div>
        </div>
      </div>

      {showModal && <Modal movie={movie} closeModal={closeModal} />}
    </>
  );
};

export default MovieCard;
