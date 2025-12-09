import { useRouteContext } from "@tanstack/react-router";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";

export function sniffPlatform(
  platformHint: string | undefined,
  userAgent: string | undefined,
): "macos" | "windows" | "linux" | "android" | "ios" | "chromeos" | "unknown" {
  switch (platformHint) {
    case "Android":
      return "android";
    case "Chrome OS":
      return "chromeos";
    case "Chromium OS":
      return "chromeos";
    case "iOS":
      return "ios";
    case "Linux":
      return "linux";
    case "macOS":
      return "macos";
    case "Windows":
      return "windows";
  }

  const definitelyUserAgent = (userAgent ?? "").toLowerCase();

  if (definitelyUserAgent.includes("android")) return "android";
  if (definitelyUserAgent.includes("cros")) return "chromeos";
  if (definitelyUserAgent.includes("iphone os")) return "ios";
  if (definitelyUserAgent.includes("linux")) return "linux";
  if (definitelyUserAgent.includes("mac os")) return "macos";
  if (definitelyUserAgent.includes("windows")) return "windows";

  return "unknown";
}

export const getPlatform = createIsomorphicFn()
  .server(() => {
    const userAgent = getRequestHeader("User-Agent");
    const platformHint = getRequestHeader("Sec-CH-UA-Platform");

    return sniffPlatform(platformHint, userAgent);
  })
  .client(() => {
    if (typeof window === "undefined") return;
    const userAgent = window.navigator.userAgent;
    let platformHint = undefined;

    if (
      typeof (navigator as any).userAgentData === "object" &&
      typeof (navigator as any).userAgentData.platform === "string"
    ) {
      platformHint = (navigator as any).userAgentData.platform as string;
    }

    return sniffPlatform(platformHint, userAgent);
  });

export function usePlatform() {
  const { platform } = useRouteContext({ from: "/" });
  return platform;
}
