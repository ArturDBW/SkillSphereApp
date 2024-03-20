type BaseStyles = {
  borderColor: string;
  backgroundColor: string;
  color: string;
};

type ControlState = {
  isFocused: boolean;
};

type OptionState = {
  isSelected: boolean;
  isFocused: boolean;
};

export const sortingStyles: {
  [key: string]: (
    baseStyles: BaseStyles,
    state?: ControlState | OptionState,
  ) => BaseStyles;
} = {
  control: (baseStyles: BaseStyles, state?: ControlState) => ({
    ...baseStyles,
    cursor: "pointer",
    borderColor: state?.isFocused ? "#eab308" : baseStyles.borderColor,
    "&:hover": {
      borderColor: "#eab308",
    },
    boxShadow: state?.isFocused ? "0 0 0 1px #eab308" : "none",
  }),
  option: (baseStyles: BaseStyles, state?: OptionState | ControlState) => ({
    ...baseStyles,
    backgroundColor: (state as OptionState)?.isSelected
      ? "#eab308"
      : (state as OptionState)?.isFocused
        ? "#eab308"
        : baseStyles.backgroundColor,
    color: (state as OptionState)?.isSelected ? "#000" : baseStyles.color,
    "&:hover": {
      backgroundColor: "#facc15",
      cursor: "pointer",
    },
  }),
};
