import { Typography, ToggleButton, ToggleButtonGroup, Grid, FormHelperText } from "@mui/material";
import { MouseEvent } from "react";
import { Platform } from "../../api/types";
import theme from "../Theme";

type props = {
  label: string;
  selectedPlatforms: Platform[];
  onChange: (event: MouseEvent<HTMLElement>, newPlatform: Platform[]) => void;
  platformError?: string;
};

const PlatformSelector = ({
  selectedPlatforms = [],
  onChange,
  label = "Select teammate Platforms",
  platformError="",
}: props) => {

  const platformValues = Object.values(Platform);

  return (
    <Grid className="mb-2">
      <Typography gutterBottom>
        {label}
      </Typography>
      <ToggleButtonGroup
        color="secondary"
        value={selectedPlatforms}
        exclusive={false}
        fullWidth
        onChange={(event, newValue) => onChange(event, newValue)}
      >
        {platformValues.map((platform) => (
          <ToggleButton key={platform} value={platform}
            sx={{
              '&.Mui-selected': {
                backgroundColor: theme.palette.primary.main,
                color: '#fff',
              },
            }}

          >
            {platform}
          </ToggleButton>
        ))}

      </ToggleButtonGroup>
      {platformError && <FormHelperText error>{platformError}</FormHelperText>}
    </Grid>
  );
};
export default PlatformSelector;
