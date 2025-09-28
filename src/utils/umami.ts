/**
 * Umami Analytics Event Tracking Utility
 *
 * Based on documentation: https://umami.is/docs/track-events
 *
 * Event tracking for monitoring:
 * - Button clicks
 * - Downloads
 * - Link sharing/paste
 * - Form interactions
 * - Scroll behavior
 * - Engagement metrics
 */

// Extend Window interface for TypeScript
declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, any>) => void;
    };
  }
}

/**
 * Utility function to track events to Umami
 */
export const trackEvent = (
  eventName: string,
  eventData?: Record<string, any>
) => {
  if (typeof window !== "undefined" && window.umami) {
    window.umami.track(eventName, eventData);
  }
};

/**
 * Event tracking for button clicks
 */
export const trackButtonClick = (buttonName: string, location?: string) => {
  trackEvent("button_click", {
    button_name: buttonName,
    location: location || "unknown",
    timestamp: new Date().toISOString(),
  });
};

/**
 * Event tracking for downloads
 */
export const trackDownload = (
  fileName: string,
  fileType: string,
  source?: string
) => {
  trackEvent("download", {
    file_name: fileName,
    file_type: fileType,
    source: source || "unknown",
    timestamp: new Date().toISOString(),
  });
};

/**
 * Event tracking for link sharing/paste
 */
export const trackLinkShare = (
  action: "paste" | "copy" | "share",
  url?: string
) => {
  trackEvent("link_share", {
    action: action,
    url: url || "unknown",
    timestamp: new Date().toISOString(),
  });
};

/**
 * Event tracking for form interactions
 */
export const trackFormInteraction = (
  formName: string,
  action: "submit" | "start" | "abandon",
  data?: Record<string, any>
) => {
  trackEvent("form_interaction", {
    form_name: formName,
    action: action,
    data: data || {},
    timestamp: new Date().toISOString(),
  });
};

/**
 * Event tracking for scroll behavior
 */
export const trackScroll = (scrollPercentage: number, page: string) => {
  trackEvent("scroll", {
    scroll_percentage: scrollPercentage,
    page: page,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Event tracking for engagement metrics
 */
export const trackEngagement = (
  action: "hover" | "focus" | "blur" | "view",
  element: string,
  duration?: number
) => {
  trackEvent("engagement", {
    action: action,
    element: element,
    duration: duration || 0,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Event tracking for error events
 */
export const trackError = (
  errorType: string,
  errorMessage: string,
  context?: string
) => {
  trackEvent("error", {
    error_type: errorType,
    error_message: errorMessage,
    context: context || "unknown",
    timestamp: new Date().toISOString(),
  });
};

/**
 * Event tracking for navigation
 */
export const trackNavigation = (
  from: string,
  to: string,
  method: "click" | "back" | "forward" | "direct"
) => {
  trackEvent("navigation", {
    from: from,
    to: to,
    method: method,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Event tracking for search
 */
export const trackSearch = (
  query: string,
  results?: number,
  filters?: Record<string, any>
) => {
  trackEvent("search", {
    query: query,
    results_count: results || 0,
    filters: filters || {},
    timestamp: new Date().toISOString(),
  });
};

/**
 * Event tracking for feature usage
 */
export const trackFeatureUsage = (
  feature: string,
  action: "enable" | "disable" | "use",
  metadata?: Record<string, any>
) => {
  trackEvent("feature_usage", {
    feature: feature,
    action: action,
    metadata: metadata || {},
    timestamp: new Date().toISOString(),
  });
};

/**
 * Event tracking for performance metrics
 */
export const trackPerformance = (
  metric: string,
  value: number,
  unit: string = "ms"
) => {
  trackEvent("performance", {
    metric: metric,
    value: value,
    unit: unit,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Event tracking for user preferences
 */
export const trackUserPreference = (
  preference: string,
  value: any,
  category?: string
) => {
  trackEvent("user_preference", {
    preference: preference,
    value: value,
    category: category || "general",
    timestamp: new Date().toISOString(),
  });
};

/**
 * Hook to track scroll percentage
 */
export const useScrollTracking = (page: string) => {
  if (typeof window === "undefined") return () => {};

  let lastTrackedPercentage = 0;

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = Math.round((scrollTop / scrollHeight) * 100);

    // Track at 25%, 50%, 75%, and 100% milestones
    if (scrollPercentage >= 25 && lastTrackedPercentage < 25) {
      trackScroll(25, page);
      lastTrackedPercentage = 25;
    } else if (scrollPercentage >= 50 && lastTrackedPercentage < 50) {
      trackScroll(50, page);
      lastTrackedPercentage = 50;
    } else if (scrollPercentage >= 75 && lastTrackedPercentage < 75) {
      trackScroll(75, page);
      lastTrackedPercentage = 75;
    } else if (scrollPercentage >= 100 && lastTrackedPercentage < 100) {
      trackScroll(100, page);
      lastTrackedPercentage = 100;
    }
  };

  return handleScroll;
};

/**
 * Hook to track time on page
 */
export const useTimeTracking = (page: string) => {
  if (typeof window === "undefined")
    return { trackTime: () => {}, handleVisibilityChange: () => {} };

  let startTime = Date.now();
  let isActive = true;

  const trackTime = () => {
    if (isActive) {
      const timeSpent = Date.now() - startTime;
      trackEngagement("view", page, timeSpent);
    }
  };

  const handleVisibilityChange = () => {
    if (document.hidden) {
      isActive = false;
      trackTime();
    } else {
      isActive = true;
      startTime = Date.now();
    }
  };

  return { trackTime, handleVisibilityChange };
};
