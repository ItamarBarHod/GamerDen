import { TextField, Box, FormControl, RadioGroup, FormControlLabel, Radio, Typography, FormHelperText } from "@mui/material";
import { User, Gender } from "../../api/types";

type UserDetailsProps = {
  user: User;
  confirmPassword: string;
  onChange: (name: keyof User, value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  errors: {
    username: string;
    email: string;
    discord: string;
    password: string;
    confirmPassword: string;
    gender: string;
  };
};

const UserDetails = ({
  user,
  confirmPassword,
  onChange,
  onConfirmPasswordChange,
  errors,
}: UserDetailsProps) => {

  const genderValues = Object.values(Gender);
  const filteredGenderValues = genderValues.filter(value => value !== Gender.None && value !== Gender.Both);

  const fields = [
    { name: "username", label: "Username", value: user.username, error: errors.username },
    { name: "email", label: "Email Address", value: user.email, error: errors.email },
    { name: "discord", label: "Discord", value: user.discord, error: errors.discord },
    { name: "password", label: "Password", value: user.password, error: errors.password, type: "password" },
    { name: "confirmPassword", label: "Confirm Password", value: confirmPassword, error: errors.confirmPassword, type: "password" },
  ];

  return (
    <Box>
      {fields.map(({ name, label, value, error, type }, index) => (
        <TextField
          key={index}
          error={!!error}
          helperText={error}
          margin="normal"
          fullWidth
          label={label}
          type={type || "text"}
          value={value}
          onChange={(e) => {
            if (name === "confirmPassword") {
              onConfirmPasswordChange(e.target.value);
            } else {
              onChange(name as keyof User, e.target.value);
            }
          }}
        />
      ))}
      <FormControl component="fieldset" margin="normal">
        <Typography
          variant="subtitle1"
          gutterBottom
          color={errors.gender ? "error" : "inherit"}
        >
          Gender
        </Typography>
        <RadioGroup
          sx={{ marginBottom: 2 }}
          value={user.gender}
          onChange={(e) => onChange("gender", e.target.value)}
        >
          {filteredGenderValues.map((gender: Gender, index) => (
            <FormControlLabel
              key={index}
              value={gender}
              control={<Radio/>}
              label={gender}
              
            />
          ))}
          {errors.gender && <FormHelperText error>{errors.gender}</FormHelperText>}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default UserDetails;
