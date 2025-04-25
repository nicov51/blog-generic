import { Typography, Container } from "@mui/material";

export default function CGVPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        Conditions Générales de Vente
      </Typography>
      <Typography component="p">
        Les présentes conditions générales de vente s'appliquent à toutes les prestations fournies par notre entreprise.
      </Typography>
      <Typography component="p">
        Toute commande implique l’adhésion sans réserve du client à ces CGV. Les prestations sont décrites précisément dans le devis accepté.
      </Typography>
      <Typography component="p">
        Les tarifs sont exprimés en euros TTC. Le paiement s’effectue selon les modalités définies dans le devis.
      </Typography>
      <Typography component="p">
        Pour toute réclamation ou litige, le droit français est applicable et les tribunaux compétents seront ceux du siège de l’entreprise.
      </Typography>
    </Container>
  );
}