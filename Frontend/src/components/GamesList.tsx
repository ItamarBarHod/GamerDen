import { useState } from "react";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import { Game } from "../api/types";

type Props = {
  games: Game[];
  initialSlice?: number;
};

const GamesList = ({ games = [], initialSlice = 3 }: Props) => {
  const [slice, setSlice] = useState<number>(initialSlice);

  const handleMoreClick = () => {
    setSlice((prevSlice) => Math.min(prevSlice + 3, games.length));
  };

  return (
    <>
      <Grid container mt={1} spacing={1} justifyContent="center">
        {games.slice(0, slice).map((game, index) => (
          <Grid item xs={12} key={index}>
            <Box className="flex items-center">
              <Avatar
                alt={game.name}
                src={game.cover}
                sx={{ width: 30, height: 30, mr: 2, borderRadius: "4px" }}
              />
              <Typography>{game.name}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      {slice < games.length && (
        <Typography
          onClick={handleMoreClick}
          className="cursor-pointer mt-2 hover:underline"
        >
          More...
        </Typography>
      )}
    </>
  );
};

export default GamesList;
