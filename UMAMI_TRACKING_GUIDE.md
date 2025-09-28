# 📊 Umami Event Tracking Guide

Complete guide for implementing event tracking using Umami Analytics in the Framer-to-HTML application.

## 🎯 Implemented Events

### 1. **Button Clicks**

Track all button interactions to understand user behavior.

```typescript
import { trackButtonClick } from "../utils/umami";

// Usage example
<Button
  onClick={() => {
    trackButtonClick("export_button", "main_form");
    handleExport();
  }}
>
  Export to HTML
</Button>;
```

**Tracked data:**

- `button_name`: Name of the clicked button
- `location`: Button location in the application
- `timestamp`: Click time

### 2. **Downloads**

Track all download activities to measure conversion.

```typescript
import { trackDownload } from "../utils/umami";

// Track download after file is successfully downloaded
trackDownload("framer-export.zip", "zip", "framer_export");
```

**Tracked data:**

- `file_name`: Name of the downloaded file
- `file_type`: File type (zip, pdf, etc.)
- `source`: Download source
- `timestamp`: Download time

### 3. **Link Sharing & Clipboard**

Track copy, paste, and share link activities.

```typescript
import { trackLinkShare } from "../utils/umami";

// Automatically tracked by ClipboardTracker component
// Manual tracking
trackLinkShare("copy", "https://example.com");
trackLinkShare("paste", "https://framer.ai/site");
trackLinkShare("share", "https://example.com");
```

**Tracked data:**

- `action`: Type of action (copy, paste, share)
- `url`: URL that was copied/pasted/shared
- `timestamp`: Action time

### 4. **Form Interactions**

Track form interactions to measure conversion funnel.

```typescript
import { trackFormInteraction } from "../utils/umami";

// Track form start
trackFormInteraction("export_form", "start", { url });

// Track form submit
trackFormInteraction("export_form", "submit", { url, success: true });

// Track form abandon
trackFormInteraction("export_form", "abandon", {
  url,
  error: "validation_failed",
});
```

**Tracked data:**

- `form_name`: Form name
- `action`: Form action (start, submit, abandon)
- `data`: Additional data
- `timestamp`: Action time

### 5. **Scroll Behavior**

Track scroll percentage to measure engagement.

```typescript
import { useScrollTracking } from "../utils/umami";

// Automatically track scroll at 25%, 50%, 75%, 100%
const handleScroll = useScrollTracking("home");
```

**Tracked data:**

- `scroll_percentage`: Scroll percentage (25, 50, 75, 100)
- `page`: Page being scrolled
- `timestamp`: Scroll time

### 6. **Engagement Metrics**

Track view events only.

```typescript
import { trackEngagement } from "../utils/umami";

// Track view
trackEngagement("view", "home");
```

**Tracked data:**

- `action`: Type of engagement (view only)
- `element`: Element being viewed
- `duration`: Duration (for view)
- `timestamp`: Action time

### 7. **Error Tracking**

Track all errors for debugging and improvement.

```typescript
import { trackError } from "../utils/umami";

// Track validation error
trackError("validation_error", "URL is required", "export_form");

// Track API error
trackError("export_error", "Export failed (500)", "export_form");
```

**Tracked data:**

- `error_type`: Error type
- `error_message`: Error message
- `context`: Error context
- `timestamp`: Error time

### 8. **Performance Metrics**

Track application performance.

```typescript
import { trackPerformance } from "../utils/umami";

// Track load time
trackPerformance("page_load", 1200, "ms");

// Track API response time
trackPerformance("api_response", 500, "ms");
```

### 9. **Feature Usage**

Track feature usage for product analytics.

```typescript
import { trackFeatureUsage } from "../utils/umami";

// Track feature enable
trackFeatureUsage("dark_mode", "enable");

// Track feature usage
trackFeatureUsage("export", "use", { format: "zip" });
```

### 10. **User Preferences**

Track user preferences.

```typescript
import { trackUserPreference } from "../utils/umami";

// Track preference change
trackUserPreference("theme", "dark", "ui");
```

## 🚀 How to Use

### 1. **Setup Umami Script**

Umami script is already configured in `layout.tsx`:

```tsx
<script
  defer
  src="https://cloud.umami.is/script.js"
  data-website-id="6ec7571b-f02e-4be7-a14a-94bf657ef62c"
></script>
```

### 2. **Import Functions**

```typescript
import {
  trackButtonClick,
  trackDownload,
  trackFormInteraction,
  trackError,
  trackEngagement,
  useScrollTracking,
  useTimeTracking,
} from "../utils/umami";
```

### 3. **Use in Components**

```tsx
export default function MyComponent() {
  // Setup scroll tracking
  const handleScroll = useScrollTracking("my_page");

  // Setup time tracking
  const { trackTime, handleVisibilityChange } = useTimeTracking("my_page");

  useEffect(() => {
    // Setup event listeners
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      trackTime();
    };
  }, []);

  return (
    <div>
      <Button
        onClick={() => {
          trackButtonClick("my_button", "my_page");
          handleClick();
        }}
      >
        Click Me
      </Button>
    </div>
  );
}
```

## 📈 Event Categories in Umami Dashboard

After implementation, you will see the following event categories in Umami:

1. **button_click** - All button clicks
2. **download** - All download activities
3. **link_share** - Copy/paste/share links
4. **form_interaction** - Form interactions
5. **scroll** - Scroll behavior
6. **engagement** - View events only
7. **error** - All errors
8. **performance** - Performance metrics
9. **feature_usage** - Feature usage
10. **user_preference** - User preferences

## 🔍 Query Examples for Umami Dashboard

### View conversion rate:

```
Event: form_interaction
Filter: action = "submit"
```

### View error rate:

```
Event: error
Group by: error_type
```

### View engagement:

```
Event: engagement
Filter: action = "view"
Group by: element
```

### View scroll depth:

```
Event: scroll
Group by: scroll_percentage
```

## 🛠️ Customization

### Add New Events

```typescript
// In utils/umami.ts
export const trackCustomEvent = (
  eventName: string,
  data: Record<string, any>
) => {
  trackEvent(eventName, {
    ...data,
    timestamp: new Date().toISOString(),
  });
};
```

### Add Additional Data

```typescript
trackButtonClick("export_button", "main_form", {
  user_type: "premium",
  device: "desktop",
});
```

## 📊 Best Practices

1. **Consistent naming**: Use snake_case for event names
2. **Include timestamp**: All events automatically include timestamp
3. **Meaningful data**: Include data useful for analysis
4. **Don't track PII**: Don't track personal information
5. **Test events**: Test in development environment first

## 🎯 Metrics You Can View

- **Conversion Rate**: Form submit / Form start
- **Error Rate**: Error count / Total interactions
- **Engagement Rate**: Scroll 75%+ / Total page views
- **Download Success Rate**: Successful downloads / Total attempts
- **Feature Adoption**: Feature usage / Total users

## 🔧 Troubleshooting

### Events not appearing in Umami:

1. Check browser console for errors
2. Verify Umami script loaded
3. Check network tab for requests to Umami
4. Verify website ID is correct

### Performance impact:

- Event tracking has minimal impact
- Debounce scroll events if needed
- Use requestIdleCallback for non-critical events

---

**Reference**: [Umami Event Tracking Documentation](https://umami.is/docs/track-events)
