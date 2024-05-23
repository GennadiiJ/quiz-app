import { Container, Box, Typography, Stack } from "@mui/material";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <Container maxWidth="lg">
    <Stack direction={"column"} alignItems={"stretch"} sx={{ my: 7 }}>
      <Typography
        variant="h3"
        sx={{
          mb: 5,
          py: 5,
          width: "100%",
          borderRadius: 1,
          backgroundColor: "primary.main",
          color: "common.white",
          textAlign: "center",
        }}
      >
        Quiz App
      </Typography>
      <Box>{children}</Box>
    </Stack>
  </Container>
);

export default Layout;
