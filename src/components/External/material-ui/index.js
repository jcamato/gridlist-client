import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

export const LightTooltip = withStyles((theme) => ({
  arrow: {
    color: theme.palette.common.white,
  },
  tooltip: {
    fontFamily: "Open Sans",
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 12,
  },
}))(Tooltip);
