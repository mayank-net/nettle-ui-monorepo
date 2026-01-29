import { isValidElement, useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithEmailLink,
  sendPasswordResetEmail,
  sendSignInLinkToEmail,
} from "firebase/auth";
import { FirebaseAuthInstance } from "shared/modules/auth-module/firebase-auth"; // Firebase instance
import { useAuth } from "../index";

export const ERROR_CODE_MAP: { [key: string]: string } = {
  "auth/invalid-email": "Incorrect email or password",
  "auth/invalid-credential": "Incorrect email or password",
  "auth/email-already-in-use": "Email already in use",
  "auth/unauthorized-continue-uri": "Something went wrong",
  "auth/operation-not-allowed": "Something went wrong",
  "auth/account-exists-with-different-credential":
    "Failed to login. This login method is not allowed.",
  "auth/quota-exceeded": "Exhausted daily quota for email sign-in.",
};

export interface SignInError {
  isError: boolean;
  type:
    | "email_password_login"
    | "email_password_signup"
    | "magic_link"
    | "login_with_google"
    | "login_with_microsoft"
    | "login_with_apple"
    | "forgot_password";
  message: string;
}

export function isEmailStringValid(email: string) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function useFirebaseLogin(authenticateCallback?: (arg: string) => void) {
  const { setIsLoggedIn } = useAuth();

  const [signInErrorState, setSignInErrorState] = useState<SignInError | null>(
    null
  );
  const [isMagicLinkSent, setIsMagicLinkSent] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isForgotPasswordEmailSent, setIsForgotPasswordEmailSent] =
    useState(false);
  const [
    isForgotPasswordSendEmailLoading,
    setIsForgotPasswordSendEmailLoading,
  ] = useState(false);
  const [isMagicLinkSendLoading, setIsMagicLinkSendLoading] = useState(false);
  const [isSignupLoading, setIsSignupLoading] = useState(false);

  const resetErrorState = () => {
    if (signInErrorState !== null) {
      setSignInErrorState(null);
    }
    if (isMagicLinkSent) {
      setIsMagicLinkSent(false);
    }
    if (isForgotPasswordEmailSent) {
      setIsForgotPasswordEmailSent(false);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(FirebaseAuthInstance, provider);
      if (result?.user) {
        setIsLoggedIn(true);
        authenticateCallback && authenticateCallback("success");
      }
    } catch (error) {
      const code = error?.code;
      setSignInErrorState({
        isError: true,
        type: "login_with_google",
        message: ERROR_CODE_MAP[code] || "Something went wrong",
      });
      console.error("Google Sign-In Error:", error);
    }
  };

  const signUpWithEmailPassword = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setIsSignupLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        FirebaseAuthInstance,
        email,
        password
      );
      if (result?.user) {
        setIsLoggedIn(true);
        authenticateCallback && authenticateCallback("success");
      }
    } catch (error) {
      const code = error?.code;
      setSignInErrorState({
        isError: true,
        type: "email_password_signup",
        message: ERROR_CODE_MAP[code] || "Something went wrong",
      });
    }
    setIsSignupLoading(false);
  };

  const signInWithEmailPassword = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setIsLoginLoading(true);
    try {
      const result = await signInWithEmailAndPassword(
        FirebaseAuthInstance,
        email,
        password
      );
      if (result?.user) {
        setIsLoggedIn(true);
        authenticateCallback && authenticateCallback("success");
      }
    } catch (error) {
      const code = error?.code;
      setSignInErrorState({
        isError: true,
        type: "email_password_login",
        message: ERROR_CODE_MAP[code] || "Something went wrong",
      });
      console.error("Sign ip with email password error:", error);
    }
    setIsLoginLoading(false);
  };

  const signInWithMagicLinkHandler = async (
    email: string,
    callback: (arg: string) => void
  ) => {
    try {
      await signInWithEmailLink(
        FirebaseAuthInstance,
        email,
        window.location.href
      );
      authenticateCallback && authenticateCallback("success");
    } catch (error) {
      console.error("Magic link error:", error);
      callback("");
    }
  };

  const handleMagicLink = async ({ email }: { email: string }) => {
    const isEmailValid = isEmailStringValid(email);
    if (!isEmailValid) {
      setSignInErrorState({
        isError: true,
        type: "magic_link",
        message: "Enter a valid email address",
      });
    } else {
      setIsMagicLinkSendLoading(true);
      try {
        await sendSignInLinkToEmail(FirebaseAuthInstance, email, {
          url: `${window.location.origin}/magic_link`,
          handleCodeInApp: true,
        });
        window.localStorage.setItem("emailForSignIn", email);
        setIsMagicLinkSent(true);
      } catch (error) {
        console.log("ERROR", error?.code);
        const code = error?.code;
        setSignInErrorState({
          isError: true,
          type: "magic_link",
          message: ERROR_CODE_MAP[code] || "Something went wrong",
        });
      }
      setIsMagicLinkSendLoading(false);
    }
  };

  const handleForgotPasswordLink = async ({ email }: { email: string }) => {
    const isEmailValid = isEmailStringValid(email);
    if (!isEmailValid) {
      setSignInErrorState({
        isError: true,
        type: "forgot_password",
        message: "Enter a valid email address",
      });
    } else {
      setIsForgotPasswordSendEmailLoading(true);
      try {
        await sendPasswordResetEmail(FirebaseAuthInstance, email, {
          url: window.location.href,
        });
        setIsForgotPasswordEmailSent(true);
      } catch (error) {
        const code = error?.code;
        setSignInErrorState({
          isError: true,
          type: "forgot_password",
          message: ERROR_CODE_MAP[code] || "Something went wrong",
        });
      }
      setIsForgotPasswordSendEmailLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    signInWithGoogle();
  };

  const handleCreateUserWithEmailPassword = ({
    email,
    password,
    password2,
  }: {
    email: string;
    password: string;
    password2: string;
  }) => {
    const isEmailValid = isEmailStringValid(email);
    if (!isEmailValid) {
      setSignInErrorState({
        isError: true,
        type: "email_password_signup",
        message: "Enter a valid email address",
      });
    } else if (!password || !password2) {
      setSignInErrorState({
        isError: true,
        type: "email_password_signup",
        message: "Please enter your password",
      });
    } else if (password !== password2) {
      setSignInErrorState({
        isError: true,
        type: "email_password_signup",
        message: "Passwords do not match",
      });
    } else {
      signUpWithEmailPassword({ email, password });
    }
  };

  const handleSignInWithEmailPassword = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const isEmailValid = isEmailStringValid(email);
    if (!isEmailValid) {
      setSignInErrorState({
        isError: true,
        type: "email_password_login",
        message: "Enter a valid email address",
      });
    } else if (!password) {
      setSignInErrorState({
        isError: true,
        type: "email_password_login",
        message: "Please enter your password",
      });
    } else {
      signInWithEmailPassword({ email, password });
    }
  };

  return {
    handleGoogleLogin,
    handleMagicLink,
    handleSignInWithEmailPassword,
    handleCreateUserWithEmailPassword,
    signInWithMagicLinkHandler,
    handleForgotPasswordLink,
    signInErrorState,
    resetErrorState,
    isMagicLinkSent,
    isForgotPasswordEmailSent,
    isMagicLinkSendLoading,
    isForgotPasswordSendEmailLoading,
    isSignupLoading,
    isLoginLoading,
  };
}
