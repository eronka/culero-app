import { View, ViewProps } from "react-native";
import { Card } from "./Card";
import { twMerge } from "tailwind-merge";
import { StyledPressable } from "./StyledPressable";
import { StyledText } from "./StyledText";
import { StyledStarRating } from "./StarRating";
import { StyledTextInput } from "./StyledTextInput";
import { CheckBox } from "./Checkbox";
import { Formik } from "formik";
import { Alert } from "react-native";
import * as Yup from "yup";
import colors from "../../colors";
import { useScreenInfo } from "../hooks/useScreenInfo";

export type GiveReviewCardProps = {
  className?: ViewProps["className"];
  isWhiteBg?: boolean;
  onSubmit?: (values: any) => void;
};

export const GiveReviewCard = ({
  className,
  isWhiteBg = false,
  onSubmit,
}: GiveReviewCardProps) => {
  const { isPhone } = useScreenInfo();
  return (
    <Card
      className={twMerge("bg-transparent", className)}
      bodyComponent={
        <View>
          <Formik
            initialValues={{
              anonymous: true,
              comment: "",
              professionalism: 0,
              reliability: 0,
              communication: 0,
            }}
            onSubmit={async (values, { resetForm }) => {
              if (onSubmit) {
                await onSubmit(values);
                resetForm();
              }

              // check developer console on web
              console.log(`Send with: ${JSON.stringify(values)}`);
              Alert.alert(`Send with: ${JSON.stringify(values)}`);
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={Yup.object().shape({
              comment: Yup.string().required(),
              professionalism: Yup.number().min(0.5),
              reliability: Yup.number().min(0.5),
              communication: Yup.number().min(0.5),
            })}
          >
            {({ values, handleSubmit, setFieldValue, errors }) => (
              <>
                <View className="md:flex-row">
                  <View className="md:w-3/4 md:pr-8">
                    <StyledText weight={700} color="primary" className="mb-2">
                      Write Review:
                    </StyledText>
                    <StyledTextInput
                      placeholder="Text area to write your review comments ...."
                      multiline={true}
                      numberOfLines={10}
                      error={errors.comment}
                      value={values.comment}
                      containerClassName="bg-[#dfdfdf]"
                      placeholderTextColor={colors["gray33"]}
                      onChangeText={(value) => setFieldValue("comment", value)}
                    />
                    <CheckBox
                      className="hidden md:flex mt-2"
                      color="primary"
                      value={values.anonymous}
                      onPress={() =>
                        setFieldValue("anonymous", !values.anonymous)
                      }
                      label="Submit Anonymously"
                      description="Your honest feedback is valuable. If you prefer, you can submit this review anonymously by checking the box."
                    />
                  </View>
                  <View className="mt-4 md:mt-0 md:w-1/4">
                    <StyledText weight={700} color="primary" className="mb-2">
                      Star Rating:
                    </StyledText>
                    <View className="flex-row justify-between">
                      <View className="mr-2 w-32">
                        <StyledText weight={600} color="darkgrey">
                          Professionalism
                        </StyledText>
                      </View>

                      <View>
                        <StyledStarRating
                          isDarkBg={!isWhiteBg}
                          isDarkStarBorder={true}
                          color="primary"
                          jumpValue={0.5}
                          startingValue={values.professionalism}
                          onFinishRating={(rating: number) => {
                            setFieldValue("professionalism", rating);
                          }}
                        />
                      </View>
                    </View>
                    <View className="flex-row justify-between my-4">
                      <View className="mr-2 w-32 ">
                        <StyledText weight={600} color="darkgrey">
                          Reliability
                        </StyledText>
                      </View>

                      <View>
                        <StyledStarRating
                          isDarkBg={!isWhiteBg}
                          isDarkStarBorder={true}
                          color="primary"
                          jumpValue={0.5}
                          startingValue={values.reliability}
                          onFinishRating={(rating: number) => {
                            setFieldValue("reliability", rating);
                          }}
                        />
                      </View>
                    </View>

                    <View className="flex-row justify-between">
                      <View className="mr-2 w-32">
                        <StyledText weight={600} color="darkgrey">
                          Communication
                        </StyledText>
                      </View>

                      <View>
                        <StyledStarRating
                          isDarkBg={!isWhiteBg}
                          isDarkStarBorder={true}
                          color="primary"
                          jumpValue={0.5}
                          startingValue={values.communication}
                          onFinishRating={(rating: number) => {
                            setFieldValue("communication", rating);
                          }}
                        />
                      </View>
                    </View>
                  </View>
                  <CheckBox
                    className="md:hidden mt-8"
                    color="primary"
                    checkMarkSize={isPhone ? 14 : 24}
                    value={values.anonymous}
                    onPress={() =>
                      setFieldValue("anonymous", !values.anonymous)
                    }
                    label="Submit Anonymously"
                    description="Your honest feedback is valuable. If you prefer, you can submit this review anonymously by checking the box."
                  />
                </View>

                <StyledPressable
                  fw={isPhone}
                  onPress={() => {
                    handleSubmit();
                  }}
                  className="self-end mt-8 md:mt-2"
                  color="primary"
                  textVariant={{ color: "white" }}
                >
                  Submit review
                </StyledPressable>
              </>
            )}
          </Formik>
        </View>
      }
    />
  );
};
