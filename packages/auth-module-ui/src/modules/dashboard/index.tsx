import React, { useState, useEffect } from "react";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { FirebaseAuthInstance } from "shared/modules/auth-module/firebase-auth";

import { FlexBox, Text, View } from "nettle-design/src";
import styled from "styled-components";
import NettleLogo from "../../components/svg-logo";
import { getInitials } from "../../utils/get-initials";
import { useMediaQuery } from "shared/global-state/hooks/media-query";

const StyledNavbar = styled(FlexBox)`
  padding: 16px;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #d3a353;
  @media (max-width: 600px) {
    padding: 12px;
  }
`;

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
`;

const NameIcon = styled(FlexBox)`
  background-color: #af631e;
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  color: #ffffff;
  flex-shrink: 0;
`;

const UserInfo = styled(FlexBox)`
  @media (max-width: 480px) {
    display: none;
  }
`;

const ResponsiveText = styled(Text)<{
  mobileSize?: number;
  desktopSize?: number;
}>`
  font-size: ${(props) => props.desktopSize}px;

  @media (max-width: 768px) {
    font-size: ${(props) => props.mobileSize}px;
    text-align: center;
  }
`;

function Dashboard() {
  const [user, setUser] = useState<User | null>(null);

  const isMobile = useMediaQuery();

  const displayName = user?.displayName || "User";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      FirebaseAuthInstance,
      (currentUser) => {
        setUser(currentUser);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleLogout = () => signOut(FirebaseAuthInstance);

  const initials = getInitials(displayName);

  if (!user) return null;

  return (
    <View position="fixed">
      <StyledGradientBackground flexDirection={"column"}>
        <StyledNavbar alignItems={"center"} justifyContent={"space-between"}>
          <NettleLogo />
          <FlexBox alignItems={"center"} justifyContent={"center"}>
            <NameIcon mr={2}>
              <Text fontWeight={"semibold"} fontSize={1}>
                {initials}
              </Text>
            </NameIcon>
            <UserInfo flexDirection={"column"}>
              <Text fontSize={1} color={"text1"} fontWeight={"bold"}>
                {displayName}
              </Text>
              <Text fontSize={0} color={"text2"}>
                {user?.email}
              </Text>
            </UserInfo>
          </FlexBox>
        </StyledNavbar>

        <FlexBox
          p={3}
          alignSelf={"flex-end"}
          style={{ cursor: "pointer" }}
          onClick={handleLogout}
        >
          <Text fontSize={0} color={"text1"} style={{ opacity: 0.7 }}>
            Logout
          </Text>
        </FlexBox>

        <FlexBox
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          flex={1}
          p={3}
        >
          <FlexBox mb={isMobile ? 4 : 8}>
            <ResponsiveText
              desktopSize={48}
              mobileSize={32}
              color={"text1"}
              fontWeight={"bold"}
            >
              Hello, {displayName.split(" ")[0]}
            </ResponsiveText>
          </FlexBox>
          <FlexBox>
            <ResponsiveText
              desktopSize={48}
              mobileSize={32}
              color={"text1"}
              fontWeight={"bold"}
            >
              Welcome to Nettle
            </ResponsiveText>
          </FlexBox>
        </FlexBox>
      </StyledGradientBackground>
    </View>
  );
}

export default Dashboard;
