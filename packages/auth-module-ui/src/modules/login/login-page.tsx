import React, { useState } from "react";
import {
  Button,
  FlexBox,
  Input,
  NettleIcon,
  Text,
  View,
} from "nettle-design/src";
import { useFirebaseLogin } from "shared/modules/auth-module/hooks";
import LoginPageLeft from "./login-page-left";
import {
  DividerText,
  GoogleLoginButton,
  LinkSentButton,
  LoginEmailPasswordButton,
  MagicLinkLoginButton,
  TertiaryLoginButton,
  TitleText,
} from "./login-button";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import styled from "styled-components";

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
  padding: 5px 0px 5px 0px;
  border: 0px solid #26262e;
  border-top-width: 1px;
`;

function LoginPage(): JSX.Element {
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

  return (
    <View position="fixed">
      <FlexBox flex={1} width={"100%"}>
        <LoginPageLeft />
        {screenState === "signup_email_password" && (
          <FlexBox
            minWidth={"560px"}
            flex={2}
            style={{ backgroundColor: "#000307" }}
            flexDirection={"column"}
          >
            <FlexBox
              alignItems={"center"}
              justifyContent={"center"}
              flex={1}
              px={31}
            >
              <FlexBox flexDirection={"column"} maxWidth={"306px"} flex={1}>
                {loginError && (
                  <StyledErrorContainer mb={5}>
                    <Text color={"error"} fontSize={1}>
                      {loginError}
                    </Text>
                  </StyledErrorContainer>
                )}
                {!isMagicLinkSent && !isForgotPasswordEmailSent && (
                  <TitleText screenState={screenState} />
                )}
                <FlexBox flexDirection="column">
                  <FlexBox flexDirection={"column"}>
                    <FlexBox mt={8}>
                      <GoogleLoginButton
                        handleGoogleLogin={handleGoogleLogin}
                      />
                    </FlexBox>
                    <FlexBox mt={8}>
                      <DividerText />
                    </FlexBox>
                  </FlexBox>
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
                          <NettleIcon
                            icon={EyeSlash}
                            size={18}
                            color={"icon1"}
                          />
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
                          <NettleIcon
                            icon={EyeSlash}
                            size={18}
                            color={"icon1"}
                          />
                        </FlexBox>
                      )
                    }
                  />
                </FlexBox>

                {!isMagicLinkSent && !isForgotPasswordEmailSent && (
                  <FlexBox mt={4}>
                    <Button
                      label={isSignupLoading ? "Signing Up..." : "Sign Up"}
                      onClick={handleContinue}
                      variant="primary"
                      background="gradient"
                    />
                  </FlexBox>
                )}
                <FlexBox flexDirection="column">
                  <FlexBox mt={5}>
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
              </FlexBox>
            </FlexBox>
            <StyledFooterContainer
              alignItems={"center"}
              justifyContent={"center"}
            >
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
        )}
        {screenState === "login_email_password" && (
          <FlexBox
            minWidth={"560px"}
            flex={2}
            style={{ backgroundColor: "#000307" }}
            flexDirection={"column"}
          >
            <FlexBox
              alignItems={"center"}
              justifyContent={"center"}
              flex={1}
              px={31}
            >
              <FlexBox flexDirection={"column"} maxWidth={"306px"} flex={1}>
                {loginError && (
                  <StyledErrorContainer mb={5}>
                    <Text color={"error"} fontSize={1}>
                      {loginError}
                    </Text>
                  </StyledErrorContainer>
                )}
                {!isMagicLinkSent && !isForgotPasswordEmailSent && (
                  <TitleText screenState={screenState} />
                )}
                <FlexBox flexDirection="column">
                  <FlexBox flexDirection={"column"}>
                    <FlexBox mt={8}>
                      <GoogleLoginButton
                        handleGoogleLogin={handleGoogleLogin}
                      />
                    </FlexBox>
                    <FlexBox>
                      <FlexBox mt={5} flex={1}>
                        <MagicLinkLoginButton
                          handleMagicLink={() => {
                            resetErrorState();
                            setLoginError("");
                            setScreenState("magic_link");
                          }}
                        />
                      </FlexBox>
                    </FlexBox>
                  </FlexBox>
                  <FlexBox mt={8}>
                    <DividerText />
                  </FlexBox>
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
                          <NettleIcon
                            icon={EyeSlash}
                            size={18}
                            color={"icon1"}
                          />
                        </FlexBox>
                      )
                    }
                  />
                </FlexBox>
                <FlexBox mt={1}>
                  <FlexBox>
                    <Button
                      label="Forgot Password?"
                      onClick={() => {
                        resetErrorState();
                        setLoginError("");
                        setScreenState("forgot_password");
                      }}
                      variant="tertiary"
                      size="md"
                    />
                  </FlexBox>
                </FlexBox>

                {!isMagicLinkSent && !isForgotPasswordEmailSent && (
                  <FlexBox mt={4}>
                    <Button
                      label={isLoginLoading ? "Continue..." : "Continue"}
                      onClick={handleContinue}
                      variant="primary"
                      background="gradient"
                    />
                  </FlexBox>
                )}

                <FlexBox flexDirection="column">
                  <FlexBox mt={5}>
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
              </FlexBox>
            </FlexBox>
            <StyledFooterContainer
              alignItems={"center"}
              justifyContent={"center"}
            >
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
        )}
        {screenState === "magic_link" && (
          <FlexBox
            minWidth={"560px"}
            flex={2}
            style={{ backgroundColor: "#000307" }}
            flexDirection={"column"}
          >
            <FlexBox
              alignItems={"center"}
              justifyContent={"center"}
              flex={1}
              px={31}
            >
              <FlexBox flexDirection={"column"} maxWidth={"306px"} flex={1}>
                {loginError && (
                  <StyledErrorContainer mb={5}>
                    <Text color={"error"} fontSize={1}>
                      {loginError}
                    </Text>
                  </StyledErrorContainer>
                )}
                {!isMagicLinkSent && !isForgotPasswordEmailSent && (
                  <TitleText screenState={screenState} />
                )}
                <FlexBox mt={8}>
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

                {!isMagicLinkSent && !isForgotPasswordEmailSent && (
                  <FlexBox mt={4}>
                    <Button
                      label={
                        isMagicLinkSendLoading
                          ? "Sending magic link..."
                          : "Continue"
                      }
                      onClick={handleContinue}
                      variant="primary"
                      background="gradient"
                    />
                  </FlexBox>
                )}
                {!isMagicLinkSent && (
                  <FlexBox flexDirection="column">
                    <FlexBox flexDirection={"column"}>
                      <FlexBox mt={8}>
                        <DividerText />
                      </FlexBox>
                      <FlexBox mt={5}>
                        <GoogleLoginButton
                          handleGoogleLogin={handleGoogleLogin}
                        />
                      </FlexBox>

                      <FlexBox>
                        <FlexBox mt={5} flex={1}>
                          <LoginEmailPasswordButton
                            handleLoginEmailPassword={() => {
                              resetErrorState();
                              setLoginError("");
                              setScreenState("login_email_password");
                            }}
                          />
                        </FlexBox>
                      </FlexBox>
                    </FlexBox>
                    <FlexBox mt={3}>
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
            </FlexBox>
            <StyledFooterContainer
              alignItems={"center"}
              justifyContent={"center"}
            >
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
        )}
        {screenState === "forgot_password" && (
          <FlexBox
            minWidth={"560px"}
            flex={2}
            style={{ backgroundColor: "#000307" }}
            flexDirection={"column"}
          >
            <FlexBox
              alignItems={"center"}
              justifyContent={"center"}
              flex={1}
              px={31}
            >
              <FlexBox flexDirection={"column"} maxWidth={"306px"} flex={1}>
                {loginError && (
                  <StyledErrorContainer mb={5}>
                    <Text color={"error"} fontSize={1}>
                      {loginError}
                    </Text>
                  </StyledErrorContainer>
                )}
                {!isMagicLinkSent && !isForgotPasswordEmailSent && (
                  <TitleText screenState={screenState} />
                )}
                <FlexBox mt={8}>
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

                {!isMagicLinkSent && !isForgotPasswordEmailSent && (
                  <FlexBox mt={4}>
                    <Button
                      label={
                        isForgotPasswordSendEmailLoading
                          ? "Sending link..."
                          : "Continue"
                      }
                      onClick={handleContinue}
                      variant="primary"
                      background="gradient"
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
            </FlexBox>
            <StyledFooterContainer
              alignItems={"center"}
              justifyContent={"center"}
            >
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
        )}
      </FlexBox>
    </View>
  );
}

export default LoginPage;
