export function useForgotPasswordSendEmail(
  callback: (message: string, type: "success" | "error") => void
) {
  // const { mutate, isLoading } = useForgotPasswordSendEmailApi();

  const handleForgotPasswordSendEmail = ({ email }: { email: string }) => {
    // mutate(
    //   { email },
    //   {
    //     onSuccess: () => {
    //       callback("", "success");
    //     },
    //     onError: (error) => {
    //       const message =
    //         error?.data?.error?.text ||
    //         "Failed to send link. Please try again.";
    //       callback(message, "error");
    //     },
    //   }
    // );
  };

  return {
    handleForgotPasswordSendEmail,
    isLoading: false,
  };
}
