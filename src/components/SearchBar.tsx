'use client'

import { TextField } from '@mui/material'

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <TextField
      fullWidth
      label="Rechercher un article"
      variant="outlined"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{ mb: 3 }}
    />
  )
}
