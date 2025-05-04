
"use client"

import { useSession } from "next-auth/react";
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";

export default function Header() {
  const { data: session } = useSession();
  if (!session?.user) return null;

  return(
    <Box className="bg-green-100 text-green-800 px-4 py-2">
      <Typography variant ="body1">
        Bonjour { session.user.name } !
      </Typography>

    </Box>
  )
}