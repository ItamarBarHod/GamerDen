import { Button } from "@mui/material";

type SubmitButtonProps = {
  onClick: () => void;
};

const SubmitButton = ({ onClick }: SubmitButtonProps) => {
  return (
    <Button
      type="button"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
      onClick={onClick}
    >
      Register
    </Button>
  );
};

export default SubmitButton;
