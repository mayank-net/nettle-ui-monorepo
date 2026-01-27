export function useAuthMagicLinkSend(
  callback: (message: string, type: "success" | "error") => void
) {
  const handleSendMagicLink = ({ email }: { email: string }) => {
    //
  };

  return {
    handleSendMagicLink,
    isLoading: false,
  };
}
