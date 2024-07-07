import { FormControlLabel, Checkbox, Box } from "@mui/material";

type props = {
  isUse: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const UsePreferencesSelector = ({ isUse = false, onChange }: props) => {
  return (
    <Box marginBottom={2}>
      <FormControlLabel
        control={<Checkbox checked={isUse} onChange={onChange} />}
        label="Use My Gaming Preferences"
      ></FormControlLabel>
    </Box>
  );
};

export default UsePreferencesSelector;
