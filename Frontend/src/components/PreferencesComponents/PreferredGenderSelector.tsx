import { Typography, ToggleButton, ToggleButtonGroup, Grid, FormHelperText } from "@mui/material";
import { Gender } from "../../api/types";
import theme from "../Theme";

type props = {
  selectedGender: Gender;
  onChange: (gender: Gender) => void;
  genderError: string;
};

const PreferredGenderSelector = ({
  selectedGender = Gender.None,
  onChange,
  genderError = "",
}: props) => {

  const genderValues = Object.values(Gender);
  const filteredGenderValues = genderValues.filter(value => value !== Gender.None);

  const handleGenderChange = (_event: any, newGender: Gender | null) => {
    if (newGender !== Gender.None && newGender !== null) {
      onChange(newGender);
    }
  };

  return (
    <Grid className="mb-2">
      <Typography gutterBottom >
        Which gender do you prefer to play with?
      </Typography>
      <ToggleButtonGroup
        color="primary"
        value={selectedGender}
        exclusive
        fullWidth
        onChange={handleGenderChange}
      >
        {filteredGenderValues.map((gender, i) =>
          <ToggleButton
            key={i}
            value={gender}
            sx={{
              '&.Mui-selected': {
                backgroundColor: theme.palette.primary.main,
                color: '#fff',
              },
            }}
          >
            {gender}
          </ToggleButton>)}
      </ToggleButtonGroup>
      {genderError && <FormHelperText error>{genderError}</FormHelperText>}
    </Grid>
  );
};
export default PreferredGenderSelector;
