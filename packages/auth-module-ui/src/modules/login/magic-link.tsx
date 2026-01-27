import React, { useEffect } from "react";
import { useFirebaseLogin } from "shared/modules/auth-module/hooks";
import { FlexBox, Spinner, Text, View } from "nettle-design/src";
import styled from "styled-components";
import NettleLogo from "../../components/svg-logo";

const StyledGradientBackground = styled(FlexBox)`
  width: 100vw;
  height: 100dvh;
  position: relative;
  overflow: hidden;
  background-color: #020408;

  background-image: radial-gradient(
      circle at 80% 20%,
      rgba(84, 105, 250, 0.25) 0%,
      transparent 45%
    ),
    radial-gradient(
      circle at 20% 80%,
      rgba(175, 99, 30, 0.3) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at center,
      rgba(26, 56, 147, 0.15) 0%,
      transparent 70%
    );

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background-image: radial-gradient(#af631e 1.5px, transparent 1.5px),
      radial-gradient(rgba(175, 99, 30, 0.4) 2px, transparent 2px);
    background-size: 20px 20px;
    background-position: center center;
    opacity: 0.3;
    mask-image: radial-gradient(circle at center, black 60%, transparent 100%);
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    opacity: 0.04;
    filter: brightness(0.5) contrast(150%);
  }

  @media (max-width: 1100px) {
    display: none;
  }
`;

function MagicLinkPage(): JSX.Element {
  const magicLinkErrorCallback = () => {
    window.localStorage.removeItem("emailForSignIn");
    window.location.href = "/login";
  };

  const loginSuccessCallback = () => {
    window.localStorage.removeItem("emailForSignIn");
    window.location.href = "/dashboard";
  };

  const { signInWithMagicLinkHandler } = useFirebaseLogin(loginSuccessCallback);

  const handleSignIn = async () => {
    const email = localStorage.getItem("emailForSignIn") || "";
    await signInWithMagicLinkHandler(email, magicLinkErrorCallback);
  };

  useEffect(() => {
    handleSignIn();
  }, []);

  return (
    <View position="fixed">
      <StyledGradientBackground>
        <FlexBox flex={1} alignItems={"center"} justifyContent={"center"}>
          <FlexBox
            alignItems={"center"}
            flexDirection={"column"}
            width={"420px"}
          >
            <FlexBox>
              <Spinner
                size={32}
                color={"#AF631E"}
                spinColor={"rgba(255, 255, 255, 0.05)"}
                borderSize={4}
              />
            </FlexBox>
            <FlexBox mt={6} alignItems={"center"} justifyContent={"center"}>
              <FlexBox>
                <NettleLogo size={40} />
              </FlexBox>
            </FlexBox>
            <FlexBox mt={4}>
              <Text
                fontSize={3}
                fontWeight={"regular"}
                color={"text2"}
                textAlign={"center"}
              >
                Hang tight while we validate your magic login link...
              </Text>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </StyledGradientBackground>
    </View>
  );
}

export default MagicLinkPage;
