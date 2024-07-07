import { FormControlLabel, Checkbox, Box } from "@mui/material";

type props = {
  isVoice: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const VoiceSelector = ({ isVoice = false, onChange }: props) => {
  return (
    <Box marginBottom={2}>
      <FormControlLabel
        control={<Checkbox checked={isVoice} onChange={onChange} />}
        label="Voice"
      ></FormControlLabel>
    </Box>
  );
};

export default VoiceSelector;
