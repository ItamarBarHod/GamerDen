import { Divider } from "@mui/material";

type Props = {
  color?: string;
};

const MyDivider = ({ color = "white" }: Props) => {
  return (
    <Divider
      variant="middle"
      sx={{
        borderBottomWidth: "3px",
        borderBottomColor: color,
        marginTop: 2,
        marginBottom: 2,
      }}
    />
  );
};

export default MyDivider;
