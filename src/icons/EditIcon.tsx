import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, SvgProps } from "react-native-svg";

export const EditIcon = ({
  color = "#000000",
  size = 14,
  ...props
}: SvgProps & { size?: number }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      // @ts-ignore
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_421_2095)" fill={color}>
        <Path d="M1.784 13.416A1.2 1.2 0 01.6 12.021l.409-2.455c.061-.373.238-.718.506-.985l7.467-7.466a1.858 1.858 0 012.566 0l1.338 1.338a1.814 1.814 0 010 2.566l-7.467 7.466a1.804 1.804 0 01-.984.507l-2.456.408a1.2 1.2 0 01-.195.016zm8.48-11.666a.645.645 0 00-.457.19L2.34 9.406a.645.645 0 00-.18.352l-.409 2.454 2.492-.371a.645.645 0 00.351-.18l7.467-7.467a.648.648 0 000-.916L10.722 1.94a.642.642 0 00-.457-.19z" />
        <Path d="M11.19 6.473a.582.582 0 01-.413-.17L7.7 3.224a.583.583 0 01.825-.825l3.077 3.077a.583.583 0 01-.412.996zM12.835 13.417H7a.583.583 0 010-1.167h5.834a.583.583 0 010 1.167z" />
      </G>
      <Defs>
        <ClipPath id="clip0_421_2095">
          <Path fill="#fff" d="M0 0H14V14H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
