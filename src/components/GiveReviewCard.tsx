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

export type GiveReviewCardProps = {
  className?: ViewProps["className"];
  isWhiteBg?: boolean;
};

export const GiveReviewCard = ({
  className,
  isWhiteBg = false,
}: GiveReviewCardProps) => {
  return (
    <Card
      className={twMerge("bg-transparent", className)}
      bodyComponent={
        <View>
          <Formik
            initialValues={{
              isAnonymous: true,
              review: "",
              professionalsim: 0,
              reliability: 0,
              communication: 0,
            }}
            onSubmit={(values) => {
              // check developer console on web
              console.log(`Send with: ${JSON.stringify(values)}`);
              Alert.alert(`Send with: ${JSON.stringify(values)}`);
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={Yup.string().required()}
          >
            {({ values, handleSubmit, setFieldValue }) => (
              <>
                <View className="flex-row">
                  <View className="w-3/4 pr-8">
                    <StyledText weight={700} color="primary" className="mb-2">
                      Write Review:
                    </StyledText>
                    <StyledTextInput
                      placeholder="Text area to write your review comments ...."
                      multiline={true}
                      numberOfLines={10}
                      value={values.review}
                      containerClassName="bg-grayF2"
                      placeholderTextColor={colors["gray33"]}
                      onChangeText={(value) => setFieldValue("review", value)}
                    />
                    <CheckBox
                      className="mt-2"
                      color="primary"
                      value={values.isAnonymous}
                      onPress={() =>
                        setFieldValue("isAnonymous", !values.isAnonymous)
                      }
                      label="Submit Anonymously"
                      description="Your honest feedback is valuable. If you prefer, you can submit this review anonymously by checking the box."
                    />
                  </View>
                  <View className="w-1/4">
                    <StyledText weight={700} color="primary" className="mb-2">
                      Star Rating:
                    </StyledText>
                    <View className="flex-row justify-between">
                      <View className="mr-2 w-32">
                        <StyledText weight={600} color="darkgrey">
                          Professionalsim
                        </StyledText>
                      </View>

                      <View>
                        <StyledStarRating
                          isDarkBg={!isWhiteBg}
                          isDarkStarBorder={true}
                          color="primary"
                          jumpValue={0.5}
                          startingValue={0}
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
                          startingValue={0}
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
                          startingValue={0}
                          onFinishRating={(rating: number) => {
                            setFieldValue("communication", rating);
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </View>

                <StyledPressable
                  onPress={() => {
                    handleSubmit();
                  }}
                  className="self-end mt-2"
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
