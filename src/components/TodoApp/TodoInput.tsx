import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface TodoInputProps {
  onSubmit: (text: string) => void;
}

export function TodoInput({ onSubmit }: TodoInputProps) {
  const [value, setValue] = useState("");

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit(value);
      setValue("");
    }
  };

  return (
    <TextField
      fullWidth
      placeholder="What needs to be done?"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyPress={handleKeyPress}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <KeyboardArrowDownIcon color="disabled" />
          </InputAdornment>
        ),
      }}
      sx={{
        '& .MuiInput-root': {
          fontSize: '24px',
          padding: '16px',
        },
        '& .MuiInput-input': {
          padding: '0 16px',
        },
      }}
    />
  );
} 