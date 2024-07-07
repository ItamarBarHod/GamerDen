import { Box, Grid, Button } from "@mui/material";
import GameSelector from "../components/PreferencesComponents/GameSelector";
import { useState, useEffect } from "react";
import { UserPreferences, Game, NullUserPreferences, Gender } from "../api/types";
import PlatformSelector from "../components/PreferencesComponents/PlatformSelector";
import VoiceSelector from "../components/PreferencesComponents/VoiceSelector";
import PreferredGenderSelector from "../components/PreferencesComponents/PreferredGenderSelector";
import RegionSelector from "../components/PreferencesComponents/RegionSelector";
import AgeRangeSelector from "../components/PreferencesComponents/AgeRangeSelector";
import UsePreferencesSelector from "../components/PreferencesComponents/UsePreferencesSelector";

type Props = {
  buttonLabel: string;
  onSubmitClick: (userPreferences: UserPreferences) => void;
  userPref: UserPreferences;
  useExistingPreferences?: boolean;
  useExistingButton: boolean;
};

const PreferencesSection = ({
  buttonLabel,
  onSubmitClick,
  userPref,
  useExistingPreferences = true,
  useExistingButton,
}: Props) => {
  const [tempPreferences, setTempPreferences] =
    useState<UserPreferences>(userPref);

  const [useGamingPreferences, setUseGamingPreferences] = useState<boolean>(useExistingPreferences);
  const [errors, setErrors] = useState({
    games: "",
    platform: "",
    preferred_gender: "",
    teammate_platform: "",
  });

  const handleUseGamingPrefClick = () => {
    setUseGamingPreferences(!useGamingPreferences);
  };

  useEffect(() => {
    if (useGamingPreferences) {
      setTempPreferences(userPref);
    } else {
      setTempPreferences(NullUserPreferences);
    }
  }, [useGamingPreferences]);

  const handleGamesChange = (newGame: Game) => {
    setTempPreferences((prev) => ({
      ...prev,
      games: prev.games?.some((game) => game.id === newGame.id)
        ? prev.games?.filter((game) => game.id !== newGame.id) ?? []
        : [...(prev.games ?? []), newGame],
    }));
  };

  const handleVoiceClick = () => {
    setTempPreferences((prev) => ({
      ...prev,
      voice: !prev.voice,
    }));
  };

  const handlePreferenceChange = (key: keyof UserPreferences, value: any) => {
    setTempPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAgeRangeChange = (newRange: number[]) => {
    setTempPreferences((prevState) => ({
      ...prevState,
      min_age: newRange[0],
      max_age: newRange[1],
    }));
  };

  const handleButtonClick = () => {
    if (validateFields()) {
      onSubmitClick(tempPreferences);
    }
  };

  const validateFields = () => {
    const newErrors = {
      games: tempPreferences.games.length !== 0 ? "" : "Please select at least 1 game.",
      platform: tempPreferences.platform.length !== 0 ? "" : "Please select at least 1 platform.",
      preferred_gender: tempPreferences.preferred_gender !== Gender.None ? "" : "Please select gender.",
      teammate_platform: tempPreferences.teammate_platform.length !== 0 ? "" : "Please select at least 1 platform.",

    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  return (
    <Grid container className="flex justify-center mt-10 mb-5">
      <Box
        className="p-10 bg-white/80 backdrop-blur-sm rounded-2xl w-[600px] shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
        {useExistingButton && (
          <UsePreferencesSelector
            isUse={useGamingPreferences}
            onChange={handleUseGamingPrefClick}
          />
        )}
        <GameSelector
          selectedGames={tempPreferences.games}
          onChange={handleGamesChange}
          useGamingPreferences={useGamingPreferences}
          gameError={errors.games}
        />
        <PlatformSelector
          label="Select Platform"
          selectedPlatforms={tempPreferences.platform}
          onChange={(_event, newPlatform) =>
            handlePreferenceChange("platform", newPlatform)
          }
          platformError={errors.platform}
        />
        <RegionSelector
          region={tempPreferences.region}
          onChange={(selectedRegion) =>
            handlePreferenceChange("region", selectedRegion)
          }
        />
        <PreferredGenderSelector
          selectedGender={tempPreferences.preferred_gender}
          onChange={(gender) =>
            handlePreferenceChange("preferred_gender", gender)
          }
          genderError={errors.preferred_gender}
        />

        <PlatformSelector
          label="Select teammate Platforms"
          selectedPlatforms={tempPreferences.teammate_platform}
          onChange={(_event, newPlatform) =>
            handlePreferenceChange("teammate_platform", newPlatform)
          }
          platformError={errors.teammate_platform}
        />
        <AgeRangeSelector
          useUserRange={useExistingPreferences}
          min_age={tempPreferences.min_age}
          max_age={tempPreferences.max_age}
          onChange={handleAgeRangeChange}
        />
        <VoiceSelector
          isVoice={tempPreferences.voice}
          onChange={handleVoiceClick}
        />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button onClick={handleButtonClick} variant="contained" size="medium">
            {buttonLabel}
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default PreferencesSection;
