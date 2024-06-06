import { View, ViewProps } from "react-native";
import { Card } from "./Card";
import { twMerge } from "tailwind-merge";
import { StyledPressable } from "./StyledPressable";
import { StyledText } from "./StyledText";
import { StyledStarRating } from "./StarRating";
import { StyledTextInput } from "./StyledTextInput";
import { CheckBox } from "./Checkbox";
import { useFormik } from "formik";
import * as Yup from "yup";
import colors from "../../colors";
import { useScreenInfo } from "../hooks/useScreenInfo";
import { useEffect, useMemo, useState } from "react";
import { IconButton } from "./IconButton";
import { Connection, User } from "../types";
import { useSendReview } from "../hooks/useSendReview";
import { useMyReviewForUser } from "../hooks/useMyReviewForUser";
import { ErrorLabel } from "./ErrorLabel";
import { StyledModal } from "./StyledModal";
import { useDeleteReview } from "../hooks/useDeleteReview";
import { useUpdateReview } from "../hooks/useUpdateReview";
import { ReviewState } from "../types/Review";
import { ReviewCard } from "./ReviewCard";

export type ReviewSubmittedModalProps = {
  isVisible: boolean;
  setVisibility: (isVisible: boolean) => void;
};
export const ReviewSubmitedModal = ({
  isVisible,
  setVisibility,
}: ReviewSubmittedModalProps) => {
  return (
    <StyledModal isVisible={isVisible} setVisibility={setVisibility}>
      <View className="items-center md:pb-20 md:px-20 md:pt-8">
        <StyledText weight={600}>Review Submitted</StyledText>
        <StyledText weight={600} xl2>
          Review submitted
        </StyledText>
        <StyledText color="gray33" center>{`
Thank you for submitting your review.

          `}</StyledText>
        <StyledPressable
          className="min-w-32"
          onPress={() => setVisibility(false)}
          color="primary"
          textVariant={{
            color: "white",
          }}
        >
          Close
        </StyledPressable>
      </View>
    </StyledModal>
  );
};

export type DeleteReviewModalProps = {
  isVisible: boolean;
  setVisibility: (isVisible: boolean) => void;
  onDeleteConfirmation: () => void;
};

export const DeleteReviewModal = ({
  isVisible,
  setVisibility,
  onDeleteConfirmation,
}: DeleteReviewModalProps) => {
  return (
    <StyledModal isVisible={isVisible} setVisibility={setVisibility}>
      <View className="min-w-3/4 px-20 my-6">
        <StyledText weight={600} xl2 center>
          Are you sure you want do delete your review?
        </StyledText>
        <StyledText center lg className="mt-4">
          This action cannot be undone!
        </StyledText>
        <View className="flex-row justify-between mt-16">
          <StyledPressable
            color="transparent"
            textVariant={{ color: "deep-red" }}
            onPress={async () => {
              await onDeleteConfirmation();
              setVisibility(false);
            }}
          >
            Yes, proceed
          </StyledPressable>
          <StyledPressable
            onPress={() => setVisibility(false)}
            color="transparent"
          >
            No, cancel
          </StyledPressable>
        </View>
      </View>
    </StyledModal>
  );
};

export type GiveReviewCardProps = {
  className?: ViewProps["className"];
  isWhiteBg?: boolean;
  ratedUser: Connection;
};

export const GiveReviewCard = ({
  className,
  isWhiteBg = false,
  ratedUser,
}: GiveReviewCardProps) => {
  const { isPhone } = useScreenInfo();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const sendReviewMutation = useSendReview();
  const myReviewForUser = useMyReviewForUser(ratedUser.id);
  const deleteReview = useDeleteReview();
  const updateReview = useUpdateReview();
  const [isEditingEnabled, setEditingEnabled] = useState(true);

  const form = useFormik({
    initialValues: {
      anonymous: false,
      comment: "",
      professionalism: 0,
      reliability: 0,
      communication: 0,
    },
    onSubmit: async (values, { resetForm }) => {
      if (!myReviewForUser.data) {
        await sendReviewMutation.mutate({
          ratedUserId: ratedUser.id,
          data: values,
        });

        setModalVisible(true);
      } else {
        await updateReview.mutate({
          ratedUserId: ratedUser.id,
          data: values,
          reviewId: myReviewForUser.data.id,
        });
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object().shape({
      comment: Yup.string().required("Required"),
      professionalism: Yup.number().min(1, "Required"),
      reliability: Yup.number().min(1, "Required"),
      communication: Yup.number().min(1, "Required"),
    }),
  });

  const { values, handleSubmit, setFieldValue, errors } = form;

  useEffect(() => {
    if (myReviewForUser.data) {
      setFieldValue("comment", myReviewForUser.data.comment);
      setFieldValue("anonymous", myReviewForUser.data.isAnonymous);
      setFieldValue("professionalism", myReviewForUser.data.professionalism);
      setFieldValue("reliability", myReviewForUser.data.reliability);
      setFieldValue("communication", myReviewForUser.data.communication);
      setEditingEnabled(false);
    } else {
      setFieldValue("comment", "");
      setFieldValue("anonymous", false);
      setFieldValue("professionalism", 0);
      setFieldValue("reliability", 0);
      setFieldValue("communication", 0);
      setEditingEnabled(true);
    }
  }, [myReviewForUser.data, myReviewForUser.isFetched]);

  const buttons = useMemo(
    () =>
      myReviewForUser.data ? (
        <View className="flex-row">
          <IconButton
            className="mr-7"
            iconProps={{ name: "edit", size: 22 }}
            onPress={() => {
              if (isEditingEnabled) {
                setEditingEnabled(false);
                setFieldValue("comment", myReviewForUser.data.comment);
                setFieldValue("anonymous", myReviewForUser.data.isAnonymous);
                setFieldValue(
                  "professionalism",
                  myReviewForUser.data.professionalism
                );
                setFieldValue("reliability", myReviewForUser.data.reliability);
                setFieldValue(
                  "communication",
                  myReviewForUser.data.communication
                );
              } else {
                setEditingEnabled(true);
              }
            }}
          />
          <IconButton
            iconProps={{ name: "delete", size: 22 }}
            onPress={() => {
              setDeleteModalVisible(true);
            }}
          />
        </View>
      ) : null,
    [myReviewForUser.data, isEditingEnabled]
  );

  // Indicates wheter to show just the review card or the form
  const isInEditingMode = useMemo(
    () =>
      !myReviewForUser.data ||
      isEditingEnabled ||
      myReviewForUser.data.state == ReviewState.PENDING,
    [myReviewForUser.data, isEditingEnabled]
  );

  return (
    <>
      <ReviewSubmitedModal
        isVisible={isModalVisible}
        setVisibility={setModalVisible}
      />
      <DeleteReviewModal
        isVisible={isDeleteModalVisible}
        setVisibility={setDeleteModalVisible}
        onDeleteConfirmation={() => {
          return deleteReview.mutateAsync({
            ratedUserId: ratedUser.id,
            reviewId: myReviewForUser.data?.id!,
          });
        }}
      />
      <Card
        className={twMerge("bg-transparent", className)}
        style={
          isWhiteBg || !isInEditingMode
            ? {}
            : {
                borderWidth: 1,
                borderColor: colors.primary,
              }
        }
        bodyComponent={
          <View>
            <>
              {/** Display editing form */}
              {isInEditingMode ? (
                <>
                  <View className="flex md:flex-row">
                    <View className="shrink md:pr-8">
                      <View className="flex-row justify-between">
                        <StyledText
                          weight={700}
                          color="primary"
                          className="mb-2"
                        >
                          {myReviewForUser.data
                            ? `Your review for ${ratedUser.name}`
                            : `Write Review:`}
                        </StyledText>
                        {buttons}
                      </View>
                      <StyledTextInput
                        placeholder="Text area to write your review comments ...."
                        multiline={true}
                        numberOfLines={10}
                        editable={isEditingEnabled}
                        error={errors.comment}
                        value={values.comment}
                        containerClassName="bg-[#dfdfdf]"
                        placeholderTextColor={colors["gray33"]}
                        onChangeText={(value) =>
                          setFieldValue("comment", value)
                        }
                      />
                      <CheckBox
                        disabled={!isEditingEnabled}
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
                    <View className=" flex mt-4 md:mt-0">
                      <StyledText weight={700} color="primary" className="mb-2">
                        Star Rating:
                      </StyledText>
                      <View className="flex-row">
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
                            readonly={!isEditingEnabled}
                            startingValue={values.professionalism}
                            onFinishRating={(rating: number) => {
                              setFieldValue("professionalism", rating);
                            }}
                          />
                        </View>
                      </View>
                      <ErrorLabel error={errors.professionalism} />

                      <View className="flex-row mt-4">
                        <View className="mr-2 w-32">
                          <StyledText weight={600} color="darkgrey">
                            Reliability
                          </StyledText>
                        </View>

                        <View>
                          <StyledStarRating
                            isDarkBg={!isWhiteBg}
                            isDarkStarBorder={true}
                            readonly={!isEditingEnabled}
                            color="primary"
                            jumpValue={0.5}
                            startingValue={values.reliability}
                            onFinishRating={(rating: number) => {
                              setFieldValue("reliability", rating);
                            }}
                          />
                        </View>
                      </View>
                      <ErrorLabel error={errors.reliability} />

                      <View className="flex-row mt-4">
                        <View className="mr-2 w-32">
                          <StyledText weight={600} color="darkgrey">
                            Communication
                          </StyledText>
                        </View>

                        <View>
                          <StyledStarRating
                            isDarkBg={!isWhiteBg}
                            isDarkStarBorder={true}
                            readonly={!isEditingEnabled}
                            color="primary"
                            jumpValue={0.5}
                            startingValue={values.communication}
                            onFinishRating={(rating: number) => {
                              setFieldValue("communication", rating);
                            }}
                          />
                        </View>
                      </View>
                      <ErrorLabel error={errors.communication} />
                    </View>
                    <CheckBox
                      disabled={!isEditingEnabled}
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
                    className="self-end mt-8 md:mt-2 md:min-w-52"
                    color="primary"
                    disabled={!!myReviewForUser.data && !isEditingEnabled}
                    textVariant={{ color: "white" }}
                  >
                    {myReviewForUser.data
                      ? isEditingEnabled
                        ? "Submit edit"
                        : "Pending"
                      : "Submit review"}
                  </StyledPressable>
                </>
              ) : (
                <>
                  <View className="flex-row mb-6 justify-between">
                    <StyledText
                      weight={600}
                      xl2
                    >{`Your review for ${ratedUser.name}`}</StyledText>
                    {buttons}
                  </View>
                  <View>
                    <View
                      className="rounded-md"
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                        backgroundColor: colors.primary,
                        zIndex: 200,
                        opacity: 0.1,
                      }}
                    ></View>
                    <ReviewCard
                      review={myReviewForUser.data!}
                      className="border border-primary"
                    />
                  </View>
                </>
              )}
            </>
          </View>
        }
      />
    </>
  );
};
