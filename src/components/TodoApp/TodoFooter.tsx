import React from 'react';
import { Box, Button, ButtonGroup } from '@mui/material';
import { useClearCompletedMutation } from '@/store/api/todoApi';

interface TodoFooterProps {
  activeCount: number;
  filter: string;
  onFilterChange: (filter: string) => void;
  hasCompleted: boolean;
}

export function TodoFooter({
  activeCount,
  filter,
  onFilterChange,
  hasCompleted
}: TodoFooterProps) {
  const [clearCompleted] = useClearCompletedMutation();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 2,
        py: 1,
        borderTop: 1,
        borderColor: 'divider',
        color: 'text.secondary',
      }}
    >
      <Box>{activeCount} item{activeCount !== 1 ? 's' : ''} left</Box>
      
      <ButtonGroup variant="text" size="small">
        <Button
          onClick={() => onFilterChange('all')}
          sx={{ 
            borderColor: filter === 'all' ? 'primary.main' : 'transparent'
          }}
        >
          All
        </Button>
        <Button
          onClick={() => onFilterChange('active')}
          sx={{ 
            borderColor: filter === 'active' ? 'primary.main' : 'transparent'
          }}
        >
          Active
        </Button>
        <Button
          onClick={() => onFilterChange('completed')}
          sx={{ 
            borderColor: filter === 'completed' ? 'primary.main' : 'transparent'
          }}
        >
          Completed
        </Button>
      </ButtonGroup>

      {hasCompleted && (
        <Button
          size="small"
          onClick={() => clearCompleted()}
          sx={{ color: 'inherit' }}
        >
          Clear completed
        </Button>
      )}
    </Box>
  );
} 