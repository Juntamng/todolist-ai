import React, { useState, useRef, useEffect } from 'react';
import { Box, Checkbox, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface TodoItemProps {
  text: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: (text: string) => void;
}

export function TodoItem({ text, completed, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  const handleSubmit = () => {
    const trimmedText = editText.trim();
    if (trimmedText) {
      onEdit(trimmedText);
      setIsEditing(false);
    } else {
      onDelete();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      setEditText(text);
      setIsEditing(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderBottom: 1,
        borderColor: 'divider',
        position: 'relative',
        fontSize: '24px',
        ...(completed && {
          color: 'text.disabled',
          textDecoration: 'line-through',
        }),
      }}
    >
      {isEditing ? (
        <TextField
          fullWidth
          inputRef={editInputRef}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSubmit}
          onKeyDown={handleKeyDown}
          sx={{
            '& .MuiInput-root': {
              fontSize: 'inherit',
            },
          }}
        />
      ) : (
        <>
          <Checkbox
            checked={completed}
            onChange={onToggle}
            sx={{ ml: 1 }}
          />
          <Box
            component="label"
            sx={{
              flex: 1,
              py: 2,
              cursor: 'pointer',
            }}
            onDoubleClick={() => setIsEditing(true)}
          >
            {text}
          </Box>
          <IconButton
            onClick={onDelete}
            size="small"
            sx={{
              opacity: 0,
              '&:hover': { opacity: 1 },
              transition: 'opacity 0.2s',
              position: 'absolute',
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </>
      )}
    </Box>
  );
} 