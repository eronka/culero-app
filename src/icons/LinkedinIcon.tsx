import * as React from "react";
import Svg, {
  Path,
  Defs,
  G,
  ClipPath,
  Circle,
  SvgProps,
} from "react-native-svg";

export const LinkedinIcon = ({
  size = 51,
  ...props
}: SvgProps & { size?: number }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 51 51"
      fill="none"
      // @ts-ignore
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_421_869)">
        <Circle cx={25.5} cy={25.5} r={25.5} fill="#0A66C2" />
        <Path
          d="M16.644 19.596a2.917 2.917 0 100-5.835 2.917 2.917 0 000 5.835zM22.316 21.996V38.18h5.026v-8.004c0-2.112.397-4.157 3.016-4.157 2.582 0 2.614 2.415 2.614 4.29v7.873H38v-8.876c0-4.36-.938-7.711-6.034-7.711-2.447 0-4.087 1.343-4.758 2.613h-.068v-2.213h-4.824zm-8.189 0h5.033V38.18h-5.033V21.996z"
          fill="#fff"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_421_869">
          <Path fill="#fff" d="M0 0H51V51H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
