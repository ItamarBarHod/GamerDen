import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { countries as CountriesListing } from "../../countries.json";
import { useEffect, useState } from "react";

type CountrySelectorProps = {
  country: string;
  onChange: (value: string) => void;
  countryError?: string;
};

const CountrySelector = ({
  country,
  onChange,
  countryError = "",
}: CountrySelectorProps) => {

  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    setCountries(CountriesListing);
  }, []);

  return (
    <FormControl fullWidth margin="normal" error={countryError !== ""}>
      <InputLabel id="country-label">Country</InputLabel>
      <Select
        labelId="country-label"
        id="country"
        value={country}
        onChange={(e) => onChange(e.target.value)}
        label="Country"
      >
        {countries.map((country, index) => (
          <MenuItem key={index} value={country}>
            {country}
          </MenuItem>
        ))}
      </Select>
      {countryError && <FormHelperText error>{countryError}</FormHelperText>}
    </FormControl>
  );
};

export default CountrySelector;
