
"use client"

import {signOut, useSession} from "next-auth/react";
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
export default function Header() {
  const { data: session } = useSession();
  if (!session?.user) return null;

  return(
    <Box className="bg-green-100 text-green-800 px-4 py-2">
      <Typography variant ="body1">
        Bonjour { session.user.name } !
        <Button
          onClick={() =>signOut({ callbackUrl: "/login"})}
          variant="outlined"
          size="small"
          sx={{ ml:4}}
          >
          Se deconnecter
        </Button>
      </Typography>

    </Box>
  )
}