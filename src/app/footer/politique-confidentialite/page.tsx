import { Typography, Container } from "@mui/material";

export default function PolitiqueConfidentialitePage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        Politique de confidentialité
      </Typography>
      <Typography component="p">
        Nous nous engageons à protéger vos données personnelles. Aucune information collectée sur ce site ne sera cédée à des tiers sans votre consentement.
      </Typography>
      <Typography component="p">
        Les données recueillies via le formulaire de contact ou de devis sont utilisées uniquement dans le cadre de la relation commerciale.
      </Typography>
      <Typography component="p">
        Conformément à la loi Informatique et Libertés et au RGPD, vous disposez d’un droit d’accès, de rectification et de suppression de vos données.
      </Typography>
      <Typography component="p">
        Pour toute demande relative à vos données personnelles, veuillez nous contacter via les coordonnées fournies sur le site.
      </Typography>
    </Container>
  );
}