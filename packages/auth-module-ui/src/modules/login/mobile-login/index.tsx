import React, { useEffect, useState } from "react";
import { Button, FlexBox, Input, NettleIcon, Text } from "nettle-design/src";
import { useFirebaseLogin } from "shared/modules/auth-module/hooks";
import { ArrowLeft, Eye, EyeSlash } from "@phosphor-icons/react";
import {
  DividerText,
  GoogleLoginButton,
  LinkSentButton,
  LoginEmailPasswordButton,
  MagicLinkLoginButton,
  TertiaryLoginButton,
  TitleText,
} from "../login-button";
import styled from "styled-components";
import { toastError } from "../../../utils/custom-toast";

import NettleLogo from "../../../components/svg-logo";

type ScreenState =
  | "login_email_password"
  | "signup_email_password"
  | "magic_link"
  | "forgot_password";

const StyledErrorContainer = styled(FlexBox)`
  padding: 8px;
  border: 1px dashed #df5050;
  border-radius: 8px;
`;

const StyledAnchorTag = styled.a`
  :hover {
    color: #4c8aff;
  }
  text-decoration: none;
`;

const LinkText = styled(Text)`
  cursor: pointer;
  text-decoration: none;
`;

const StyledFooterContainer = styled(FlexBox)`
  padding: 4px 0px 8px 0px;
  border: 0px solid #26262e;
  border-top-width: 1px;
  margin-top: auto;
`;

function MobileLoginUI() {
  const [screenState, setScreenState] = useState<ScreenState>(
    "login_email_password"
  );

  const [loginError, setLoginError] = useState("");

  const authenticateCallback = (arg: string) => {
    if (arg === "success") {
      window.location.href = "/dashboard";
    } else {
      setLoginError(arg);
    }
  };

  const {
    handleGoogleLogin,
    handleMagicLink,
    handleSignInWithEmailPassword,
    handleCreateUserWithEmailPassword,
    handleForgotPasswordLink,
    signInErrorState,
    isMagicLinkSent,
    isForgotPasswordEmailSent,
    resetErrorState,
    isMagicLinkSendLoading,
    isForgotPasswordSendEmailLoading,
    isSignupLoading,
    isLoginLoading,
  } = useFirebaseLogin(authenticateCallback);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleSetEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    resetErrorState();
    const value = e.target.value;
    setEmail(value);
  };

  const handleSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    resetErrorState();
    const value = e.target.value;
    setPassword(value);
  };

  const handleSetPassword2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    resetErrorState();
    const value = e.target.value;
    setPassword2(value);
  };

  const handleContinue = () => {
    if (
      isMagicLinkSendLoading ||
      isForgotPasswordSendEmailLoading ||
      isSignupLoading ||
      isLoginLoading
    )
      return;
    setLoginError("");
    if (
      !(screenState === "magic_link" && isMagicLinkSent) &&
      !(screenState === "forgot_password" && isForgotPasswordEmailSent)
    ) {
      resetErrorState();
    }
    if (screenState === "login_email_password") {
      handleSignInWithEmailPassword({
        email,
        password,
      });
    } else if (screenState === "magic_link") {
      handleMagicLink({ email });
    } else if (screenState === "signup_email_password") {
      handleCreateUserWithEmailPassword({
        email,
        password,
      });
    } else if (screenState === "forgot_password") {
      handleForgotPasswordLink({ email });
    }
  };

  useEffect(() => {
    if (
      (signInErrorState?.type === "login_with_microsoft" ||
        signInErrorState?.type === "login_with_google") &&
      signInErrorState.isError
    ) {
      toastError(
        signInErrorState?.message || "Failed to login. Please try again."
      );
    }
  }, [signInErrorState]);

  return (
    <FlexBox
      style={{ backgroundColor: "#151519", minHeight: "100dvh" }}
      flexDirection={"column"}
      px={4}
    >
      <FlexBox
        style={{ borderBottom: "1px solid #26262e" }}
        py={6}
        alignItems={"center"}
        justifyContent={"center"}
        mb={10}
      >
        <NettleLogo />
      </FlexBox>
      {loginError && (
        <StyledErrorContainer mb={5}>
          <Text color={"error"} fontSize={1}>
            {loginError}
          </Text>
        </StyledErrorContainer>
      )}
      {!isMagicLinkSent && !isForgotPasswordEmailSent && (
        <FlexBox alignItems={"center"} justifyContent={"center"}>
          <TitleText screenState={screenState} />
        </FlexBox>
      )}

      {screenState === "login_email_password" && (
        <FlexBox mt={8} flexDirection={"column"}>
          <FlexBox>
            <GoogleLoginButton handleGoogleLogin={handleGoogleLogin} />
          </FlexBox>
          <FlexBox mt={5}>
            <MagicLinkLoginButton
              handleMagicLink={() => {
                resetErrorState();
                setLoginError("");
                setScreenState("magic_link");
              }}
            />
          </FlexBox>
          <FlexBox mt={8}>
            <DividerText />
          </FlexBox>
          <FlexBox mt={8}>
            <Input
              placeholderText="Enter email address"
              value={email}
              onChange={handleSetEmail}
              label="Email Address"
              type="email"
              isError={
                (signInErrorState?.type === "email_password_login" ||
                  signInErrorState?.type === "email_password_signup" ||
                  signInErrorState?.type === "magic_link" ||
                  signInErrorState?.type === "forgot_password") &&
                signInErrorState?.isError === true
              }
              errorText={
                signInErrorState?.type === "magic_link" ||
                signInErrorState?.type === "forgot_password"
                  ? signInErrorState?.message
                  : ""
              }
            />
          </FlexBox>
          <FlexBox mt={5}>
            <Input
              placeholderText="Enter password"
              value={password}
              onChange={handleSetPassword}
              label="Password"
              type={showPassword1 ? "text" : "password"}
              isError={
                (signInErrorState?.type === "email_password_login" ||
                  signInErrorState?.type === "email_password_signup") &&
                signInErrorState?.isError === true
              }
              errorText={
                signInErrorState?.type === "email_password_login"
                  ? signInErrorState?.message
                  : ""
              }
              icon={
                showPassword1 ? (
                  <FlexBox
                    onClick={() => setShowPassword1(false)}
                    style={{ cursor: "pointer" }}
                    pr={2}
                  >
                    <NettleIcon icon={Eye} size={18} color={"icon1"} />
                  </FlexBox>
                ) : (
                  <FlexBox
                    onClick={() => setShowPassword1(true)}
                    style={{ cursor: "pointer" }}
                    pr={2}
                  >
                    <NettleIcon icon={EyeSlash} size={18} color={"icon1"} />
                  </FlexBox>
                )
              }
            />
          </FlexBox>
          <FlexBox>
            <FlexBox>
              <Button
                label="Forgot Password?"
                onClick={() => {
                  resetErrorState();
                  setLoginError("");
                  setScreenState("forgot_password");
                }}
                iconPlacement="right"
                variant="tertiary"
                size="sm"
              />
            </FlexBox>
          </FlexBox>
          <FlexBox mt={5}>
            <Button
              label={isLoginLoading ? "Continue..." : "Continue"}
              onClick={handleContinue}
              background={"#1A3893"}
            />
          </FlexBox>
          <FlexBox mt={5} mb={15}>
            <TertiaryLoginButton
              screenState={screenState}
              setScreenState={(arg: ScreenState) => {
                resetErrorState();
                setLoginError("");
                setScreenState(arg);
              }}
            />
          </FlexBox>
        </FlexBox>
      )}

      {screenState === "signup_email_password" && (
        <FlexBox mt={8} flexDirection={"column"}>
          <FlexBox>
            <GoogleLoginButton handleGoogleLogin={handleGoogleLogin} />
          </FlexBox>

          <FlexBox mt={8}>
            <DividerText />
          </FlexBox>
          <FlexBox mt={8}>
            <Input
              placeholderText="Enter email address"
              value={email}
              onChange={handleSetEmail}
              label="Email Address"
              type="email"
              isError={
                (signInErrorState?.type === "email_password_login" ||
                  signInErrorState?.type === "email_password_signup" ||
                  signInErrorState?.type === "magic_link" ||
                  signInErrorState?.type === "forgot_password") &&
                signInErrorState?.isError === true
              }
              errorText={
                signInErrorState?.type === "magic_link" ||
                signInErrorState?.type === "forgot_password"
                  ? signInErrorState?.message
                  : ""
              }
            />
          </FlexBox>
          <FlexBox mt={5}>
            <Input
              placeholderText="Enter password"
              value={password}
              onChange={handleSetPassword}
              label="Password"
              type={showPassword1 ? "text" : "password"}
              isError={
                (signInErrorState?.type === "email_password_login" ||
                  signInErrorState?.type === "email_password_signup") &&
                signInErrorState?.isError === true
              }
              errorText={
                signInErrorState?.type === "email_password_login"
                  ? signInErrorState?.message
                  : ""
              }
              icon={
                showPassword1 ? (
                  <FlexBox
                    onClick={() => setShowPassword1(false)}
                    style={{ cursor: "pointer" }}
                    pr={2}
                  >
                    <NettleIcon icon={Eye} size={18} color={"icon1"} />
                  </FlexBox>
                ) : (
                  <FlexBox
                    onClick={() => setShowPassword1(true)}
                    style={{ cursor: "pointer" }}
                    pr={2}
                  >
                    <NettleIcon icon={EyeSlash} size={18} color={"icon1"} />
                  </FlexBox>
                )
              }
            />
          </FlexBox>
          <FlexBox mt={5}>
            <Input
              placeholderText="Enter password again"
              value={password2}
              onChange={handleSetPassword2}
              label="Re-enter Password"
              type={showPassword2 ? "text" : "password"}
              isError={
                signInErrorState?.type === "email_password_signup" &&
                signInErrorState?.isError === true
              }
              errorText={signInErrorState?.message}
              icon={
                showPassword2 ? (
                  <FlexBox
                    onClick={() => setShowPassword2(false)}
                    style={{ cursor: "pointer" }}
                    pr={2}
                  >
                    <NettleIcon icon={Eye} size={18} color={"icon1"} />
                  </FlexBox>
                ) : (
                  <FlexBox
                    onClick={() => setShowPassword2(true)}
                    style={{ cursor: "pointer" }}
                    pr={2}
                  >
                    <NettleIcon icon={EyeSlash} size={18} color={"icon1"} />
                  </FlexBox>
                )
              }
            />
          </FlexBox>
          <FlexBox mt={5}>
            <Button
              label={isSignupLoading ? "Signing Up..." : "Sign Up"}
              onClick={handleContinue}
              background={"#1A3893"}
            />
          </FlexBox>
          <FlexBox mt={5} mb={15}>
            <TertiaryLoginButton
              screenState={screenState}
              setScreenState={(arg: ScreenState) => {
                resetErrorState();
                setLoginError("");
                setScreenState(arg);
              }}
            />
          </FlexBox>
        </FlexBox>
      )}

      {screenState === "magic_link" && (
        <FlexBox mt={8} flexDirection={"column"}>
          <FlexBox>
            {isMagicLinkSent ? (
              <LinkSentButton
                email={email}
                resend={handleContinue}
                reset={() => {
                  resetErrorState();
                  setLoginError("");
                  setScreenState("magic_link");
                }}
                isLoading={isMagicLinkSendLoading}
              />
            ) : (
              <Input
                placeholderText="Enter email address"
                value={email}
                onChange={handleSetEmail}
                label="Email Address"
                type="email"
                isError={
                  (signInErrorState?.type === "email_password_login" ||
                    signInErrorState?.type === "email_password_signup" ||
                    signInErrorState?.type === "magic_link" ||
                    signInErrorState?.type === "forgot_password") &&
                  signInErrorState?.isError === true
                }
                errorText={
                  signInErrorState?.type === "magic_link" ||
                  signInErrorState?.type === "forgot_password"
                    ? signInErrorState?.message
                    : ""
                }
              />
            )}
          </FlexBox>
          {!isMagicLinkSent && (
            <FlexBox mt={4}>
              <Button
                label={
                  isMagicLinkSendLoading ? "Sending magic link..." : "Continue"
                }
                onClick={handleContinue}
                background={"#1A3893"}
              />
            </FlexBox>
          )}
          {!isMagicLinkSent && (
            <FlexBox mt={8} flexDirection="column">
              <FlexBox>
                <DividerText />
              </FlexBox>
              <FlexBox mt={5}>
                <GoogleLoginButton handleGoogleLogin={handleGoogleLogin} />
              </FlexBox>

              <FlexBox mt={5}>
                <LoginEmailPasswordButton
                  handleLoginEmailPassword={() => {
                    resetErrorState();
                    setLoginError("");
                    setScreenState("login_email_password");
                  }}
                />
              </FlexBox>
              <FlexBox mt={5} mb={15}>
                <TertiaryLoginButton
                  screenState={screenState}
                  setScreenState={(arg: ScreenState) => {
                    resetErrorState();
                    setLoginError("");
                    setScreenState(arg);
                  }}
                />
              </FlexBox>
            </FlexBox>
          )}
        </FlexBox>
      )}

      {screenState === "forgot_password" && (
        <FlexBox mt={8} flexDirection={"column"}>
          <FlexBox>
            {isForgotPasswordEmailSent ? (
              <LinkSentButton
                email={email}
                resend={handleContinue}
                reset={() => {
                  resetErrorState();
                  setLoginError("");
                  setScreenState("forgot_password");
                }}
                isForgotPassword
                isLoading={isForgotPasswordSendEmailLoading}
              />
            ) : (
              <Input
                placeholderText="Enter email address"
                value={email}
                onChange={handleSetEmail}
                label="Email Address"
                type="email"
                isError={
                  (signInErrorState?.type === "email_password_login" ||
                    signInErrorState?.type === "email_password_signup" ||
                    signInErrorState?.type === "magic_link" ||
                    signInErrorState?.type === "forgot_password") &&
                  signInErrorState?.isError === true
                }
                errorText={
                  signInErrorState?.type === "magic_link" ||
                  signInErrorState?.type === "forgot_password"
                    ? signInErrorState?.message
                    : ""
                }
              />
            )}
          </FlexBox>
          {!isForgotPasswordEmailSent && (
            <FlexBox mt={4}>
              <Button
                label={
                  isForgotPasswordSendEmailLoading
                    ? "Sending link..."
                    : "Continue"
                }
                onClick={handleContinue}
                background={"#1A3893"}
              />
            </FlexBox>
          )}
          {!isForgotPasswordEmailSent && (
            <FlexBox>
              <Button
                label="Back to sign-in"
                onClick={() => {
                  resetErrorState();
                  setLoginError("");
                  setScreenState("login_email_password");
                }}
                iconPlacement="left"
                variant="tertiary"
                icon={<ArrowLeft color="#ffffff" size={18} />}
              />
            </FlexBox>
          )}
        </FlexBox>
      )}

      <StyledFooterContainer alignItems={"center"} justifyContent={"center"}>
        <StyledAnchorTag
          target={"_blank"}
          style={{ marginRight: "8px" }}
          href="https://nettle.llc/terms-and-conditions"
        >
          <LinkText color={"text2"} fontSize={1}>
            T&C
          </LinkText>
        </StyledAnchorTag>
        <FlexBox>
          <StyledAnchorTag
            target={"_blank"}
            href="https://nettle.llc/privacy-policy"
          >
            <LinkText color={"text2"} fontSize={1}>
              Privacy Policy
            </LinkText>
          </StyledAnchorTag>
        </FlexBox>
      </StyledFooterContainer>
    </FlexBox>
  );
}

export default MobileLoginUI;
