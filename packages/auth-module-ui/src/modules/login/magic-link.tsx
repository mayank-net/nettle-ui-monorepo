import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useFirebaseLogin } from "shared/modules/auth-module/hooks";
import { FlexBox, Spinner, Text, View } from "nettle-design/src";
import styled from "styled-components";
import NettleLogoDark from "theme/assets/images/nettle-logo-rect-dark.png";

const StyledGradientBackground = styled(FlexBox)`
  width: 100vw;
  height: 100dvh;
  background: radial-gradient(
      circle at 40% 98%,
      rgba(255, 230, 0, 0.2),
      transparent 30%
    ),
    radial-gradient(circle at 60% 98%, rgba(29, 18, 147, 0.35), transparent 30%);

  position: relative;
  overflow: hidden;

  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100dvh;
    pointer-events: none;
    background: transparent;
  }

  &:before {
    background-image: radial-gradient(
      circle,
      rgba(255, 255, 255, 1) 1px,
      transparent 1.5px
    );
    background-size: 600px 350px;
    opacity: 0.6;
  }
  &:after {
    background-image: radial-gradient(
      circle,
      rgba(255, 255, 255, 1) 1px,
      transparent 1.5px
    );
    background-size: 450px 700px;
    opacity: 0.6;
  }
`;

function MagicLinkPage(): JSX.Element {
  const [searchParams] = useSearchParams();

  const magicLinkErrorCallback = () => {
    window.location.href = "/login";
  };

  const loginSuccessCallback = () => {
    window.location.reload();
  };

  const { signInWithMagicLinkHandler } = useFirebaseLogin(loginSuccessCallback);

  const handleSignIn = async () => {
    const queryParams = new URLSearchParams(searchParams);
    const email = queryParams.get("email") || "";
    await signInWithMagicLinkHandler(email, magicLinkErrorCallback);
  };

  useEffect(() => {
    handleSignIn();
  }, [JSON.stringify(searchParams)]);

  return (
    <View position="fixed">
      <StyledGradientBackground>
        <FlexBox flex={1} alignItems={"center"} justifyContent={"center"}>
          <FlexBox
            alignItems={"center"}
            flexDirection={"column"}
            width={"400px"}
          >
            <FlexBox>
              <Spinner
                size={42}
                color={"#00BC62"}
                spinColor={"#3B3B47"}
                borderSize={6}
              />
            </FlexBox>
            <FlexBox mt={5} alignItems={"center"} justifyContent={"center"}>
              <FlexBox>
                <Text fontSize={6} fontWeight={"regular"} color={"text1"}>
                  Welcome to
                </Text>
              </FlexBox>
              <FlexBox>
                <img
                  src={NettleLogoDark}
                  style={{ height: 48, marginLeft: 8 }}
                  alt="NettleLogoDark"
                />
              </FlexBox>
            </FlexBox>
            <FlexBox mt={5}>
              <Text
                fontSize={4}
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
