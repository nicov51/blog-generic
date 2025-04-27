import Link from "next/link";
import { Drawer, Box, List, ListItem, ListItemText } from "@mui/material";
export default function SidebarAdmin() {
  return (
    <Drawer
    sx={{
      width: 240,
    }}
    variant="permanent"
    anchor="left"
    >

      <List>
        <ListItem component={Link} href="/admin/create-article">
          <ListItemText primary="Creer un article"></ListItemText>
        </ListItem>

        <ListItem component={Link} href="/admin/manage-articles">
          <ListItemText primary="Gerer les articles"></ListItemText>
        </ListItem>

        <ListItem component={Link} href="/admin/moderate-reviews">
          <ListItemText primary="Moderer les Avis"></ListItemText>
        </ListItem>

        <ListItem component={Link} href="/admin/article-performance">
          <ListItemText primary="Suivi des performances"></ListItemText>
        </ListItem>

        <ListItem component={Link} href="/admin/create-newsletter">
          <ListItemText primary="Creer une newsletter"></ListItemText>
        </ListItem>
      </List>
    </Drawer>
  )
}