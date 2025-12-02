import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";

/**
 * Define the structure for each item in the options array.
 * T is the type of the underlying value (e.g., number, string, object).
 */
export interface Option<T> {
  value: T;
  label: string;
}

// Define the properties (props) using the Generic type <T>
interface GenericSelectProps<T> {
  /** The currently selected value. */
  selectedValue: T;
  /** The handler function to call when the selection changes. */
  onValueChange: (newValue: T) => void;
  /** The array of options to display. */
  options: Option<T>[];
  /** Optional custom label for the select input. Defaults to "Items per page". */
  label?: string;
  /** Optional custom minimum width for the FormControl. Defaults to 150. */
  minWidth?: number;
}

// We use React.FC and pass the Generic type <T> through
export function FormControlSelect<T>({
  selectedValue,
  onValueChange,
  options,
  label = "Select Option",
  minWidth = 150,
}: GenericSelectProps<T>) {
  // The value must be cast to a string for the native HTML <select> element
  const stringifiedValue = String(selectedValue);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const newValueString = event.target.value;

    // Find the original typed value (T) from the options array
    const selectedOption = options.find(
      (opt) => String(opt.value) === newValueString
    );

    if (selectedOption) {
      // Pass the fully typed value (T) back to the parent handler
      onValueChange(selectedOption.value);
    }
  };

  return (
    <FormControl sx={{ minWidth: minWidth }}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={stringifiedValue}
        label={label}
        onChange={handleChange}
        size="small"
        sx={{
          background: "#f5f7fa",
          "&:hover": {
            background: "#f0f2f5",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#667eea",
          },
        }}
      >
        {/* Map the options array to MenuItem components */}
        {options.map((option, index) => (
          // The MenuItem value must be the string representation of the underlying value
          <MenuItem key={index} value={String(option.value)}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
