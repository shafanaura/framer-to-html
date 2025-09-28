# 📊 Umami Event Tracking Implementation

Complete event tracking implementation for Umami Analytics in the Framer-to-HTML application.

## 🚀 Quick Start

### 1. Setup (Already configured)

```tsx
// layout.tsx - Umami script is already installed
<script
  defer
  src="https://cloud.umami.is/script.js"
  data-website-id="6ec7571b-f02e-4be7-a14a-94bf657ef62c"
></script>
```

### 2. Import & Use

```tsx
import {
  trackButtonClick,
  trackDownload,
  trackFormInteraction,
} from "../utils/umami";

// Track button click
<Button
  onClick={() => {
    trackButtonClick("export_button", "main_form");
    handleExport();
  }}
>
  Export
</Button>;
```

## 📈 Event Categories

| Event              | Description            | Data Tracked                                  |
| ------------------ | ---------------------- | --------------------------------------------- |
| `button_click`     | Button interactions    | button_name, location, timestamp              |
| `download`         | File downloads         | file_name, file_type, source, timestamp       |
| `link_share`       | Copy/paste/share links | action, url, timestamp                        |
| `form_interaction` | Form events            | form_name, action, data, timestamp            |
| `scroll`           | Scroll behavior        | scroll_percentage, page, timestamp            |
| `engagement`       | User engagement        | action, element, duration, timestamp          |
| `error`            | Error tracking         | error_type, error_message, context, timestamp |
| `performance`      | Performance metrics    | metric, value, unit, timestamp                |
| `feature_usage`    | Feature adoption       | feature, action, metadata, timestamp          |
| `user_preference`  | User preferences       | preference, value, category, timestamp        |

## 🎯 Key Features

### ✅ Automatic Tracking

- **Scroll tracking**: 25%, 50%, 75%, 100% milestones
- **Time on page**: Automatic with visibility change detection
- **Clipboard events**: Copy/paste detection for URLs
- **Form interactions**: Start, submit, abandon tracking
- **Error tracking**: Automatic error capture

### ✅ Manual Tracking

- **Button clicks**: Custom button tracking
- **Downloads**: File download tracking
- **Feature usage**: Feature adoption metrics
- **Performance**: Custom performance metrics
- **User preferences**: Preference changes

## 📊 Dashboard Metrics

After implementation, you can view:

1. **Conversion Funnel**

   - Form start → Form submit → Download success
   - Error rate analysis

2. **User Engagement**

   - Scroll depth distribution
   - Time on page metrics
   - Button click heatmap

3. **Feature Adoption**

   - Most used features
   - Feature usage patterns
   - User preference trends

4. **Performance Insights**
   - Page load times
   - API response times
   - User interaction delays

## 🔧 Files Created

- `src/utils/umami.ts` - Core tracking utilities
- `src/components/ClipboardTracker.tsx` - Clipboard event tracking
- `src/components/EventTrackingExamples.tsx` - Usage examples
- `UMAMI_TRACKING_GUIDE.md` - Detailed documentation

## 🎨 Usage Examples

### Basic Button Tracking

```tsx
<Button
  onClick={() => {
    trackButtonClick("export_button", "main_form");
    handleExport();
  }}
>
  Export to HTML
</Button>
```

### Form Tracking

```tsx
const handleSubmit = () => {
  trackFormInteraction("export_form", "start", { url });
  // ... form logic
  trackFormInteraction("export_form", "submit", { url, success: true });
};
```

### Download Tracking

```tsx
const handleDownload = (fileName: string) => {
  trackDownload(fileName, "zip", "framer_export");
  // ... download logic
};
```

### Error Tracking

```tsx
try {
  // ... risky operation
} catch (error) {
  trackError("export_error", error.message, "export_form");
  // ... error handling
}
```

## 📈 Analytics Dashboard

In the Umami dashboard, you will see:

1. **Event Overview**: Total events by category
2. **Conversion Funnel**: Form → Download conversion
3. **Error Analysis**: Error types and frequency
4. **Engagement Metrics**: Scroll depth, time on page
5. **Feature Usage**: Most popular features
6. **Performance**: Load times and response times

## 🛠️ Customization

### Add Custom Events

```tsx
import { trackEvent } from "../utils/umami";

// Custom event
trackEvent("custom_action", {
  action_type: "special_click",
  custom_data: "value",
  timestamp: new Date().toISOString(),
});
```

### Add Custom Data

```tsx
trackButtonClick("export_button", "main_form", {
  user_type: "premium",
  device: "desktop",
  session_id: "abc123",
});
```

## 🎯 Best Practices

1. **Consistent Naming**: Use snake_case for event names
2. **Meaningful Data**: Include useful context in event data
3. **Privacy First**: Don't track personal information
4. **Performance**: Minimal impact on app performance
5. **Testing**: Test events in development first

## 📚 Documentation

- [Umami Event Tracking Guide](UMAMI_TRACKING_GUIDE.md) - Detailed documentation
- [Umami Official Docs](https://umami.is/docs/track-events) - Official documentation

---

**Status**: ✅ Fully Implemented & Ready to Use