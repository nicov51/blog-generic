import { Container, Typography } from "@mui/material";

export default function MentionsLegalesPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        Mentions légales
      </Typography>
      <Typography component="p">
        Conformément aux dispositions des Articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004
        pour la Confiance dans l’économie numérique, dite L.C.E.N., il est porté à la connaissance
        des utilisateurs du site les présentes mentions légales.
      </Typography>
      <Typography variant="h6" gutterBottom>
        Éditeur du site
      </Typography>
      <Typography component="p">
        Nom de l’entreprise : [Nom à renseigner]<br />
        Adresse : [Adresse complète]<br />
        Email : [Adresse mail]<br />
        Téléphone : [Numéro de téléphone]<br />
        SIRET : [Numéro SIRET]
      </Typography>
      {/* Tu peux rajouter d'autres sections : Hébergement, propriété intellectuelle, etc. */}
    </Container>
  );
}