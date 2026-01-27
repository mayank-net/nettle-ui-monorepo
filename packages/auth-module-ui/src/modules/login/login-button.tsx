import React from "react";
import { Button, FlexBox, Text } from "nettle-design/src";
import GoogleLogo from "theme/assets/images/google-logo-colored.png";
import EnvelopStar from "theme/assets/images/envelop-star.png";
import {
  MagicWand,
  Link,
  EnvelopeOpen,
  ArrowLeft,
} from "@phosphor-icons/react";
import styled from "styled-components";

const DividerContainer = styled(FlexBox)`
  display: flex;
  align-items: center;
  text-align: center;
`;

const Line = styled(FlexBox)`
  flex-grow: 1;
  height: 1px;
  background-color: #6e6e7a;
`;

export function GoogleLoginButton({
  handleGoogleLogin,
}: {
  handleGoogleLogin: () => void;
}): JSX.Element {
  return (
    <Button
      label="Continue with Google"
      onClick={handleGoogleLogin}
      background="#001F3E"
      icon={
        <img
          src={GoogleLogo}
          style={{
            height: 18,
            marginRight: 8,
          }}
          alt="Google"
        />
      }
      iconPlacement="left"
      hover
    />
  );
}

export function MagicLinkLoginButton({
  handleMagicLink,
}: {
  handleMagicLink: () => void;
}): JSX.Element {
  return (
    <Button
      label="Login with Magic Link"
      onClick={handleMagicLink}
      background="#001F3E"
      icon={
        <MagicWand
          size={18}
          weight="fill"
          color="#ffffff"
          style={{ marginRight: "8px" }}
        />
      }
      iconPlacement="left"
      hover
    />
  );
}

export function LoginEmailPasswordButton({
  handleLoginEmailPassword,
}: {
  handleLoginEmailPassword: () => void;
}): JSX.Element {
  return (
    <Button
      label="Login with password"
      onClick={handleLoginEmailPassword}
      background="#001F3E"
      iconPlacement="left"
      icon={
        <FlexBox mr={2}>
          <ArrowLeft size={16} color={"#ffffff"} weight="bold" />
        </FlexBox>
      }
      hover
    />
  );
}

export function TitleText({
  screenState,
}: {
  screenState: string;
}): JSX.Element {
  return (
    <FlexBox>
      {screenState === "forgot_password" ? (
        <FlexBox>
          <Text fontSize={5} fontWeight={"regular"} color={"text1"}>
            Forgot password
          </Text>
        </FlexBox>
      ) : screenState === "magic_link" ? (
        <FlexBox>
          <Text fontSize={5} fontWeight={"regular"} color={"text1"}>
            Sign in with{" "}
            <Text
              fontSize={5}
              fontWeight={"regular"}
              style={{ color: "#D3A353" }}
            >
              Magic Link
            </Text>
          </Text>
        </FlexBox>
      ) : screenState === "signup_email_password" ? (
        <FlexBox>
          <Text fontSize={5} fontWeight={"regular"} color={"text1"}>
            Lets get you started
          </Text>
        </FlexBox>
      ) : (
        <FlexBox>
          <Text fontSize={5} fontWeight={"regular"} color={"text1"}>
            Sign in to{" "}
            <Text
              fontSize={5}
              fontWeight={"regular"}
              style={{ color: "#D3A353" }}
            >
              Nettle
            </Text>
          </Text>
        </FlexBox>
      )}
    </FlexBox>
  );
}

export function TertiaryLoginButton({
  screenState,
  setScreenState,
}: {
  screenState: string;
  setScreenState: (arg: string) => void;
}): JSX.Element {
  return (
    <FlexBox flex={1} alignItems={"center"} justifyContent={"center"}>
      <FlexBox mr={1}>
        {screenState === "signup_email_password" ? (
          <Text fontSize={2} fontWeight={"regular"} color={"text1"}>
            Already have an account?
          </Text>
        ) : (
          <Text fontSize={2} fontWeight={"regular"} color={"text1"}>
            Don't have an account?
          </Text>
        )}
      </FlexBox>
      <FlexBox>
        {screenState === "signup_email_password" ? (
          <FlexBox
            onClick={() => setScreenState("login_email_password")}
            style={{ cursor: "pointer" }}
            alignItems={"center"}
          >
            <Text
              style={{ textDecoration: "underline" }}
              fontSize={2}
              fontWeight={"medium"}
              color={"text1"}
            >
              Login now
            </Text>
          </FlexBox>
        ) : (
          <FlexBox
            onClick={() => setScreenState("signup_email_password")}
            style={{ cursor: "pointer" }}
            alignItems={"center"}
          >
            <Text
              style={{ textDecoration: "underline" }}
              fontSize={2}
              fontWeight={"medium"}
              color={"text1"}
            >
              Sign up
            </Text>
          </FlexBox>
        )}
      </FlexBox>
    </FlexBox>
  );
}

export function DividerText(): JSX.Element {
  return (
    <DividerContainer flex={1}>
      <Line />
      <FlexBox mx={1}>
        <Text fontSize={0} color={"text2"}>
          OR
        </Text>
      </FlexBox>
      <Line />
    </DividerContainer>
  );
}

export function LinkSentButton({
  email,
  resend,
  reset,
  isForgotPassword,
  isLoading,
}: {
  email: string;
  resend: () => void;
  reset: () => void;
  isForgotPassword?: boolean;
  isLoading: boolean;
}): JSX.Element {
  return (
    <FlexBox
      flex={1}
      alignItems={"center"}
      justifyContent={"center"}
      p={2}
      flexDirection={"column"}
    >
      <FlexBox>
        {isForgotPassword ? (
          <EnvelopeOpen size={56} color="#ffffff" />
        ) : (
          <img
            src={EnvelopStar}
            style={{
              height: 56,
            }}
            alt="EnvelopStar"
          />
        )}
      </FlexBox>
      <FlexBox mt={5}>
        <Text
          fontSize={4}
          fontWeight={"bold"}
          color={"text1"}
          textAlign={"center"}
        >
          {isForgotPassword
            ? "We have emailed your password reset link."
            : "We have emailed your magic login link."}
        </Text>
      </FlexBox>
      <FlexBox mt={5}>
        <Text
          fontSize={1}
          fontWeight={"semibold"}
          color={"text1"}
          textAlign={"center"}
        >
          Check your email at {email}. Still not received it?
        </Text>
      </FlexBox>
      <FlexBox mt={10}>
        <Button
          label={isLoading ? "Sending link..." : "Send link again"}
          onClick={resend}
          background="#001F3E"
          icon={<Link size={18} color="#ffffff" />}
        />
      </FlexBox>

      <FlexBox mt={10}>
        <FlexBox flex={1} alignItems={"center"} justifyContent={"center"}>
          <FlexBox>
            <Text
              fontSize={1}
              fontWeight={"semibold"}
              color={"text2"}
              textAlign={"center"}
            >
              <Text
                style={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={reset}
              >
                Click here
              </Text>{" "}
              {isForgotPassword
                ? "to change email address."
                : "to change email address or login with socials."}
            </Text>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
