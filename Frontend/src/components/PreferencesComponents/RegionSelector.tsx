import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Region } from "../../api/types";

type Props = {
  region: Region;
  onChange: (region: Region) => void;
};

const RegionSelector = ({ region, onChange }: Props) => {
  const [regionsList, setRegionsList] = useState<Region[]>([]);

  useEffect(() => {
    const regions = Object.values(Region);
    setRegionsList(regions);
  }, []);

  return (
    <Box sx={{ minWidth: 120, marginBottom: 1 }}>
      <Typography marginBottom={1}>
        Select Region
      </Typography>
      <FormControl>
        <InputLabel> Region </InputLabel>
        {regionsList.length > 0 ? (
          <Select
            sx={{ minWidth: "170px" }}
            value={region}
            label="Region"
            onChange={(event) => {
              onChange(event.target.value as Region);
            }}
          >
            {regionsList.map((region) => (
              <MenuItem key={region} value={region}>
                {region}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <Typography>Loading regions...</Typography>
        )}
      </FormControl>
    </Box>
  );
};

export default RegionSelector;
