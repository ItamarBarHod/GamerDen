import { Slider, Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";

type Props = {
  useUserRange: boolean;
  min_age: number;
  max_age: number;
  onChange: (newRange: number[]) => void;
};

const ageRange = { minAge: 18, maxAge: 100 };

const AgeRangeSelector = ({
  useUserRange,
  min_age,
  max_age,
  onChange,
}: Props) => {
  const [currentRange, setCurrentRange] = useState<[number, number]>(
    useUserRange ? [min_age, max_age] : [ageRange.minAge, ageRange.maxAge]
  );

  useEffect(() => {
    if (useUserRange) {
      setCurrentRange([min_age, max_age]);
    } else {
      setCurrentRange([ageRange.minAge, ageRange.maxAge]);
    }
  }, [useUserRange, min_age, max_age]);

  const handleChange = (_event: Event, newValues: number | number[]) => {
    if (Array.isArray(newValues)) {
      setCurrentRange(newValues as [number, number]);
      onChange(newValues as [number, number]);
    }
  };

  return (
    <Box>
      <Typography gutterBottom>
        What is the age range of your ideal teammates?
      </Typography>
      <Slider
        value={currentRange}
        onChange={handleChange}
        valueLabelDisplay="on"
        min={ageRange.minAge}
        max={ageRange.maxAge}
        disableSwap
        sx={{ marginTop: "30px" }}
      />
    </Box>
  );
};


export default AgeRangeSelector;
