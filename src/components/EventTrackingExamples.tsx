"use client";
import { useState, useEffect } from "react";
import { Button, TextInput, Paper, Stack, Text, Group } from "@mantine/core";
import {
  trackButtonClick,
  trackFormInteraction,
  trackError,
  trackEngagement,
  trackFeatureUsage,
  trackUserPreference,
  trackPerformance,
  trackSearch,
} from "../utils/umami";

/**
 * Example component to demonstrate various event tracking
 */
export const EventTrackingExamples = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState("light");

  // Track performance metrics
  useEffect(() => {
    const startTime = Date.now();

    // Simulate page load time
    const timer = setTimeout(() => {
      const loadTime = Date.now() - startTime;
      trackPerformance("component_load", loadTime, "ms");
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Track feature usage
  const handleFeatureToggle = (feature: string, enabled: boolean) => {
    trackFeatureUsage(feature, enabled ? "enable" : "disable");
  };

  // Track user preferences
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    trackUserPreference("theme", newTheme, "ui");
  };

  // Track search
  const handleSearch = (query: string) => {
    if (query.trim()) {
      trackSearch(query, Math.floor(Math.random() * 100)); // Simulate results count
    }
  };

  // Track form interactions
  const handleFormSubmit = (formData: any) => {
    trackFormInteraction("example_form", "submit", formData);
  };

  // Track errors
  const handleError = () => {
    trackError("demo_error", "This is a demo error", "example_component");
  };

  return (
    <Paper p="md" radius="md" style={{ margin: "20px 0" }}>
      <Stack gap="md">
        <Text size="lg" fw={600}>
          Event Tracking Examples
        </Text>

        {/* Button Click Tracking */}
        <Group>
          <Button
            onClick={() => {
              trackButtonClick("demo_button_1", "examples");
              console.log("Button 1 clicked");
            }}
          >
            Track Button Click
          </Button>

          <Button
            onClick={() => {
              trackButtonClick("demo_button_2", "examples");
              handleFeatureToggle("dark_mode", true);
            }}
          >
            Track Feature Usage
          </Button>
        </Group>

        {/* Form Interaction Tracking */}
        <Stack gap="xs">
          <Text size="sm" fw={500}>
            Form Interaction Tracking:
          </Text>
          <TextInput
            placeholder="Enter search query"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            onClick={() => {
              trackFormInteraction("search_form", "start", {
                query: searchQuery,
              });
              handleSearch(searchQuery);
              trackFormInteraction("search_form", "submit", {
                query: searchQuery,
              });
            }}
          >
            Search
          </Button>
        </Stack>

        {/* User Preference Tracking */}
        <Stack gap="xs">
          <Text size="sm" fw={500}>
            User Preference Tracking:
          </Text>
          <Group>
            <Button
              variant={theme === "light" ? "filled" : "outline"}
              onClick={() => handleThemeChange("light")}
            >
              Light Theme
            </Button>
            <Button
              variant={theme === "dark" ? "filled" : "outline"}
              onClick={() => handleThemeChange("dark")}
            >
              Dark Theme
            </Button>
          </Group>
        </Stack>

        {/* Error Tracking */}
        <Stack gap="xs">
          <Text size="sm" fw={500}>
            Error Tracking:
          </Text>
          <Button color="red" variant="outline" onClick={handleError}>
            Trigger Demo Error
          </Button>
        </Stack>

        {/* Performance Tracking */}
        <Stack gap="xs">
          <Text size="sm" fw={500}>
            Performance Tracking:
          </Text>
          <Button
            onClick={() => {
              const startTime = Date.now();
              // Simulate some work
              setTimeout(() => {
                const duration = Date.now() - startTime;
                trackPerformance("demo_operation", duration, "ms");
              }, 500);
            }}
          >
            Track Performance
          </Button>
        </Stack>

        {/* Engagement Tracking - Only View Events */}
        <Stack gap="xs">
          <Text size="sm" fw={500}>
            Engagement Tracking (View Only):
          </Text>
          <Button onClick={() => trackEngagement("view", "engagement_demo")}>
            Track View Engagement
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

/**
 * Hook for advanced tracking
 */
export const useAdvancedTracking = () => {
  // Track page visibility changes - only view events
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        trackEngagement("view", "page", 0);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Track window resize
  useEffect(() => {
    const handleResize = () => {
      trackPerformance("window_resize", window.innerWidth, "px");
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track beforeunload - only view events
  useEffect(() => {
    const handleBeforeUnload = () => {
      trackEngagement("view", "page", Date.now());
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);
};
