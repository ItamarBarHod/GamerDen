import { TextareaAutosize, Box, Typography } from "@mui/material";

type BioTextareaProps = {
  bio: string;
  onChange: (value: string) => void;
};

const BioTextarea = ({ bio, onChange }: BioTextareaProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 255) {
      onChange(value);
    }
  };

  return (
    <Box sx={{ width: "100%", marginBottom: 2, mt: 2 }}>
      <Typography
        gutterBottom
      >
        Bio (Optional)
      </Typography>
      <TextareaAutosize
        placeholder="Type your biography here..."
        value={bio}
        onChange={handleChange}
        className="w-full resize-none p-2 border border-gray-300 rounded-md text-gray-800"

      />
    </Box>
  );
};

export default BioTextarea;
