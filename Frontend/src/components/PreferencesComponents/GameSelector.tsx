import { useState, useEffect } from "react";
import { TextField, Chip, Grid, FormHelperText } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { Game } from "../../api/types";
import { getGames } from "../../api/api.endpoints";

type Props = {
  selectedGames: Game[];
  onChange: (newGame: Game) => void;
  useGamingPreferences?: boolean;
  gameError?: string;
};

const GameSelector = ({
  selectedGames = [],
  onChange,
  useGamingPreferences,
  gameError = "",
}: Props) => {
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [gamesList, setGamesList] = useState<Game[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      const games = await getGames();
      setAllGames(games);
      setGamesList(
        games.filter(
          (game) =>
            !selectedGames.some((selectedGame) => selectedGame.id === game.id)
        )
      );
    };
    fetchGames();
  }, []);

  useEffect(() => {
    if (useGamingPreferences) {
      setGamesList(
        allGames.filter(
          (game) =>
            !selectedGames.some((selectedGame) => selectedGame.id === game.id)
        )
      );
    } else {
      setGamesList(allGames);
    }
  }, [useGamingPreferences, allGames, selectedGames]);

  const handleAdd = (selectedGame: string) => {
    const theGame: Game | undefined = gamesList.find(
      (game) => game.name === selectedGame
    );
    if (theGame) {
      onChange(theGame);
      setGamesList(gamesList.filter((game) => game.name !== selectedGame));
    }
  };

  const handleRemove = (selectedGame: string) => {
    const theGame: Game | undefined = allGames.find(
      (game) => game.name === selectedGame
    );
    if (theGame) {
      onChange(theGame);
      setGamesList([...gamesList, theGame]);
    }
  };

  return (
    <Grid className="mb-2">
      <Autocomplete
        id="game"
        options={gamesList.map((game) => game.name)}
        freeSolo
        renderInput={(params) => <TextField {...params} label="Select Game" />}
        onChange={(_event, value) => value && handleAdd(value)}
      />
      {gameError && <FormHelperText error>{gameError}</FormHelperText>}
      <Grid className="mt-2">
        {selectedGames.map((game) => (
          <Chip
            key={game.name}
            label={game.name}
            onDelete={(_event) => {
              handleRemove(game.name);
            }}
            variant="filled"
            color="primary"
            style={{ margin: "2px" }}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default GameSelector;
