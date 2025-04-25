import { Typography, Container } from "@mui/material";

export default function ConditionsUtilisationPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        Conditions d'utilisation
      </Typography>
      <Typography component="p">
        L'utilisation de ce site implique l'acceptation pleine et entière des présentes conditions générales d'utilisation.
      </Typography>
      <Typography component="p">
        Le site est accessible à tout moment, mais peut être suspendu pour maintenance. Les contenus sont régulièrement mis à jour.
      </Typography>
      <Typography component="p">
        L’utilisateur s’engage à naviguer sur le site de manière responsable, à ne pas nuire à son bon fonctionnement.
      </Typography>
      <Typography component="p">
        Toute reproduction, représentation ou exploitation du contenu sans autorisation est interdite.
      </Typography>
    </Container>
  );
}
