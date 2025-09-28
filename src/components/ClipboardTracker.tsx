"use client";
import { useEffect } from "react";
import { trackLinkShare } from "../utils/umami";

/**
 * Component for tracking clipboard events (paste, copy, share)
 */
export const ClipboardTracker = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Track paste events
    const handlePaste = (event: ClipboardEvent) => {
      const pastedText = event.clipboardData?.getData("text") || "";

      // Check if pasted text looks like a URL
      const urlPattern = /^https?:\/\/.+/;
      if (urlPattern.test(pastedText)) {
        trackLinkShare("paste", pastedText);
      }
    };

    // Track copy events
    const handleCopy = (event: ClipboardEvent) => {
      const copiedText = event.clipboardData?.getData("text") || "";

      // Check if copied text looks like a URL
      const urlPattern = /^https?:\/\/.+/;
      if (urlPattern.test(copiedText)) {
        trackLinkShare("copy", copiedText);
      }
    };

    // Track keyboard shortcuts for sharing
    const handleKeyDown = (event: KeyboardEvent) => {
      // Track Ctrl+C (copy)
      if (event.ctrlKey && event.key === "c") {
        const selection = window.getSelection()?.toString() || "";
        if (selection && /^https?:\/\/.+/.test(selection)) {
          trackLinkShare("copy", selection);
        }
      }

      // Track Ctrl+V (paste)
      if (event.ctrlKey && event.key === "v") {
        // We'll track this in the paste event handler
      }

      // Track Ctrl+Shift+C (copy link in some browsers)
      if (event.ctrlKey && event.shiftKey && event.key === "C") {
        trackLinkShare("copy", "keyboard_shortcut");
      }
    };

    // Track share API if available
    const handleShare = async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: document.title,
            url: window.location.href,
          });
          trackLinkShare("share", window.location.href);
        } catch (error) {
          // Share was cancelled or failed
        }
      }
    };

    // Add event listeners
    document.addEventListener("paste", handlePaste);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("keydown", handleKeyDown);

    // Track share button clicks if they exist
    const shareButtons = document.querySelectorAll(
      '[data-share], .share-button, [aria-label*="share" i]'
    );
    shareButtons.forEach((button) => {
      button.addEventListener("click", handleShare);
    });

    // Track right-click context menu copy
    const handleContextMenu = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target && (target.tagName === "A" || target.closest("a"))) {
        const link = target.closest("a") as HTMLAnchorElement;
        if (link?.href) {
          // Track potential link copying via context menu
          setTimeout(() => {
            const selection = window.getSelection()?.toString() || "";
            if (selection === link.href || selection === link.textContent) {
              trackLinkShare("copy", link.href);
            }
          }, 100);
        }
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);

    // Cleanup
    return () => {
      document.removeEventListener("paste", handlePaste);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", handleContextMenu);

      shareButtons.forEach((button) => {
        button.removeEventListener("click", handleShare);
      });
    };
  }, []);

  return null; // This component doesn't render anything
};

/**
 * Hook for tracking clipboard events
 */
export const useClipboardTracking = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Track when user tries to paste a Framer URL
    const handlePaste = (event: ClipboardEvent) => {
      const pastedText = event.clipboardData?.getData("text") || "";

      // Check if it's a Framer URL
      if (pastedText.includes("framer.") || pastedText.includes("framer.ai")) {
        trackLinkShare("paste", pastedText);
      }
    };

    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, []);
};
