import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

export default function AlignItemsList({ message }) {
  return (
    <ListItem
      alignItems="flex-start"
      sx={{
        border: !message.isRead ? "3px solid #1976d2" : "1px solid #1976d2",
        borderRadius: "10px",
        marginBottom: "0.5rem",
      }}
    >
      <ListItemText
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
        primary={
          <Typography
            variant="h5"
            color="text.primary"
            fontWeight={!message.isRead && 700}
            sx={{ textDecoration: "underline" }}
            mb={1}
          >
            {message.subject}
          </Typography>
        }
        secondary={
          <Typography
            sx={{ display: "inline" }}
            variant="body2"
            color="text.primary"
          >
            {message.content}
          </Typography>
        }
      />
    </ListItem>
  );
}
