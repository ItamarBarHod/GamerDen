import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

type DatePickerComponentProps = {
  selectedDate?: Date;
  onChange: (date: Date) => void;
  dateError?: string;
};

const DatePickerComponent = ({
  selectedDate,
  onChange,
  dateError = "",
}: DatePickerComponentProps) => {
  const maxDate = dayjs().subtract(18, "year");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={selectedDate ? dayjs(selectedDate) : null}
        label="Enter birthday"
        maxDate={maxDate}
        format="DD/MM/YYYY"
        onChange={(newDate) =>
          onChange(newDate ? newDate.toDate() : new Date(0))
        }
        slotProps={{
          textField: {
            helperText: dateError,
            error: !!dateError,
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
