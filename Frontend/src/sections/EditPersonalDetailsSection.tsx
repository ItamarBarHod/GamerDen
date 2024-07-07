import {
  Avatar,
  Box,
  Typography,
  Button,
  FormControl,
  RadioGroup,
  Radio,
  TextField,
  FormControlLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import { User } from "../api/types";
import { Person } from "@mui/icons-material";
import MyDivider from "../components/MyDivider";
import { Gender } from "../api/types";
import DatePickerComponent from "../components/SignUpComponents/DatePickerComponent";
import CountrySelector from "../components/SignUpComponents/CountrySelector";
import LanguageSelector from "../components/SignUpComponents/LanguagesSelector";
import BioTextarea from "../components/SignUpComponents/BioTextarea";

type Props = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  onSaveClick: (formData: FormData) => void;
  errors: {
    username: string;
    discord: string;
    languages: string;
  };
};

const EditPersonalDetailsSection = ({
  user,
  setUser,
  onSaveClick,
  errors,
}: Props) => {
  const [image, setImage] = useState<string>();
  const [file, setFile] = useState<File>();

  const genderValues = Object.values(Gender);
  const filteredGenderValues = genderValues.filter(
    (value) => value !== Gender.None && value !== Gender.Both
  );

  useEffect(() => {
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  }, [file]);

  const handleChange = (name: keyof User, value: any) => {
    setUser({ ...user, [name]: value });
  };

  const handleSaveClick = () => {
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    formData.append("data", JSON.stringify(user));
    onSaveClick(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <Box
      className="p-10 rounded-3xl flex flex-col mb-20 mt-5 bg-white bg-opacity-80 backdrop-blur-sm"
      sx={{
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
        width: "500px",
      }}
    >
      <Box className="flex justify-center mb-2">
        <label htmlFor="avatar-input">
          <Avatar
            className="cursor-pointer rounded-full overflow-hidden"
            sx={{ width: 150, height: 150 }}
          >
            {image ? (
              <img src={image} className="w-full h-full object-cover" />
            ) : user.avatar ? (
              <img src={user.avatar} className="w-full h-full object-cover" />
            ) : (
              <Person sx={{ width: "95%", height: "95%" }} />
            )}
            <input
              id="avatar-input"
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </Avatar>
        </label>
      </Box>
      <MyDivider color="black" />
      <Box>
        <TextField
          error={!!errors.username}
          helperText={errors.username}
          margin="normal"
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          value={user.username}
          onChange={(e) => handleChange("username", e.target.value)}
        />
        <TextField
          error={!!errors.discord}
          helperText={errors.discord}
          margin="normal"
          fullWidth
          id="discord"
          label="Discord"
          name="discord"
          autoComplete="discord"
          value={user.discord}
          onChange={(e) => handleChange("discord", e.target.value)}
        />

        <FormControl component="fieldset" margin="normal">
          <Typography gutterBottom>Gender</Typography>

          <RadioGroup
            name="gender"
            value={user.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
            sx={{ marginBottom: 1 }}
          >
            {filteredGenderValues.map((gender: Gender, index) => (
              <FormControlLabel
                key={index}
                value={gender}
                control={<Radio />}
                label={gender}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <Box margin="normal">
          <DatePickerComponent
            selectedDate={user.dob}
            onChange={(date) => handleChange("dob", date || new Date())}
          />
        </Box>
        <CountrySelector
          country={user.country}
          onChange={(value) => handleChange("country", value)}
        ></CountrySelector>
        <LanguageSelector
          languages={user.languages}
          onChange={(languages) => handleChange("languages", languages)}
          languageError={errors.languages}
        ></LanguageSelector>
        <BioTextarea
          bio={user.bio}
          onChange={(value) => handleChange("bio", value)}
        ></BioTextarea>
        <Box className="flex items-center justify-center">
          <Button onClick={handleSaveClick} variant="contained" size="medium">
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditPersonalDetailsSection;
