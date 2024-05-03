import { twMerge } from "tailwind-merge";
import { StyledTextInput, StyledTextInputProps } from "./StyledTextInput";
import colors from "../../colors";

export type SearchBarProps = StyledTextInputProps & {
  onSubmit?: (value: string | undefined) => void;
};
export const SearchBar = ({
  containerClassName,
  onSubmit,
  ...props
}: SearchBarProps) => {
  return (
    <StyledTextInput
      leftIconProps={{ name: "search", className: "mx-4" }}
      containerClassName={twMerge(
        "rounded-3xl border border-light-primary pr-1 py-1",
        containerClassName
      )}
      placeholderTextColor={colors["gray8B"]}
      submitProps={
        onSubmit && {
          color: "primary",
          children: "Submit",
          textVariant: { color: "white" },
          rounded: true,
          onSubmit,
        }
      }
      {...props}
    />
  );
};
