import React, { useEffect, useState } from "react";
import { GenreResponseProps, MovieProps } from "../interfaces/interface";
import { api } from "../services/api";
import { Button } from "./Button";


export interface SideBarProps {
  handleClickButton: (id: number) => void;
  selectedGenreId: number;
}

export function SideBar({handleClickButton, selectedGenreId}: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

    
  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return(
    <nav className="sidebar">
    <span>Watch<p>Me</p></span>

    <div className="buttons-container">
      {genres.map(genre => (
        <Button
          key={String(genre.id)}
          title={genre.title}
          iconName={genre.name}
          onClick={() => handleClickButton(genre.id)}
          selected={selectedGenreId === genre.id}
        />
      ))}
    </div>

    </nav>
  )
}