import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Icon from "@mui/material/Icon";

interface IMenuButtonProps {
  to: string;
  icon: string;
  label: string;
  onClick: (() => void) | undefined;
}

const MenuButtonOption: React.FC<IMenuButtonProps> = ({
  icon,
  label,
  to,
  onClick,
}) => {
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };
  return (
    <ListItem
      key={label}
      disablePadding
      sx={{
        "&:hover": {
          backgroundColor: "#E34832",
          "& .MuiListItemText-primary, & .MuiIcon-root": {
            color: "#fff",
          },
        },
      }}
    >
      <ListItemButton
        onClick={handleClick}
        selected={!!match}
        sx={{
          py: 2,
          "&.Mui-selected": {
            backgroundColor: "#E34832",
          },
        }}
      >
        <ListItemIcon>
          <Icon sx={{ color: match ? "#fff" : "#000" }}>{icon}</Icon>
        </ListItemIcon>
        <ListItemText primary={label} sx={{ color: match ? "#fff" : "#000" }} />
      </ListItemButton>
    </ListItem>
  );
};

export default MenuButtonOption;
