import { IconName } from "@/models";
import { IconButton, InputAdornment } from "@mui/material";
import Icon from "../../icon/Icon";

export type IconInputSlotProps = {
  iconDirection?: string;
  icon?: IconName;
  onClick?: () => void;
};

export const getIconInputSlot = ({
  icon,
  iconDirection,
  onClick,
}: IconInputSlotProps = {}) => {
  const isDirectionRight = iconDirection === "right" && icon;

  return {
    [isDirectionRight ? "endAdornment" : "startAdornment"]: icon ? (
      <InputAdornment position={isDirectionRight ? "end" : "start"}>
        <IconButton
          onClick={onClick}
          onMouseDown={(e) => e.preventDefault()}
          edge={isDirectionRight ? "end" : "start"}
          size="small"
          sx={{
            ml: isDirectionRight ? 0 : -1, // pull closer to the input
            mr: isDirectionRight ? -1 : 0, // reduce spacing on opposite side
          }}
        >
          <Icon icon={icon} />
        </IconButton>
      </InputAdornment>
    ) : undefined,
  };
};
