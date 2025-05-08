'use client'

import { TextField } from '@mui/material'

type SearchBarProps = {
  value: string
  onChangeAction: (value: string) => void
}

export default function SearchBar({ value, onChangeAction }: SearchBarProps) {
  return (
    <TextField
      fullWidth
      label="Rechercher un article"
      variant="outlined"
      value={value}
      onChange={(e) => onChangeAction(e.target.value)}
      sx={{ mb: 3 }}
    />
  )
}
