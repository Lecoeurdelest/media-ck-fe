import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    primary: {
      main: "#3B82F6",
      light: "#60A5FA",
      dark: "#2563EB",
      contrastText: "#fff",
    },
    secondary: {
      main: "#10B981",
      light: "#34D399",
      dark: "#059669",
      contrastText: "#fff",
    },
    error: { main: "#EF4444" },
    warning: { main: "#F59E0B" },
    background: {
      default: "#FFFFFF",
      paper: "#F9FAFB",
    },
    text: {
      primary: "#1F2937",
      secondary: "#6B7280",
    },
    divider: "#E5E7EB",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          borderRadius: "0.375rem",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#F9FAFB",
          "& .MuiTableCell-head": {
            backgroundColor: "#F9FAFB",
            fontWeight: 600,
            color: "#6B7280",
          },
        },
      },
    },
  },
})

export default theme
