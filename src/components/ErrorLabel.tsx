import { ViewProps } from "react-native";
import { StyledText } from "./StyledText";

export type ErrorLabelProps = {
  error?: string;
  className?: ViewProps["className"];
};

export const ErrorLabel = ({ className, error }: ErrorLabelProps) => {
  if (!error) {
    return null;
  }
  return (
    <StyledText className={className} color="deep-red" sm>
      {error}
    </StyledText>
  );
};
