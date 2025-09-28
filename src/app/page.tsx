"use client";
import {
  Button,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
  Box,
  Center,
  Badge,
  ThemeIcon,
} from "@mantine/core";
import { useCallback, useState } from "react";
import { IconDownload, IconCode, IconSparkles } from "@tabler/icons-react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = useCallback(async () => {
    setError(null);
    if (!url) {
      setError("Enter a Framer URL");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || `Export failed (${res.status})`);
      }
      const blob = await res.blob();
      const fileName = `framer-export.zip`;
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(link.href);
    } catch (e: any) {
      setError(e?.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, [url]);

  return (
    <Box style={{ minHeight: "100vh", position: "relative" }}>
      {/* Background decoration */}
      <Box
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "400px",
          background: "var(--gradient-primary)",
          opacity: 0.1,
          borderRadius: "0 0 50% 50%",
          zIndex: 0,
        }}
      />

      <Container size={600} p="xl" style={{ position: "relative", zIndex: 1 }}>
        <Stack gap="xl" className="animate-fade-in">
          {/* Header Section */}
          <Center>
            <Stack gap="md" align="center">
              <Box style={{ position: "relative" }}>
                <ThemeIcon
                  size={80}
                  radius="xl"
                  style={{
                    background: "var(--gradient-primary)",
                    boxShadow: "var(--shadow-medium)",
                  }}
                  className="animate-pulse"
                >
                  <IconCode size={40} color="white" />
                </ThemeIcon>
                <Box
                  style={{
                    position: "absolute",
                    top: -5,
                    right: -5,
                    background: "var(--gradient-accent)",
                    borderRadius: "50%",
                    padding: "4px",
                  }}
                >
                  <IconSparkles size={16} color="white" />
                </Box>
              </Box>

              <Title
                order={1}
                size="h1"
                className="gradient-text"
                style={{
                  textAlign: "center",
                  fontSize: "2.5rem",
                  fontWeight: 700,
                }}
              >
                Framer Site to HTML
              </Title>

              <Text
                size="lg"
                c="dimmed"
                style={{
                  textAlign: "center",
                  maxWidth: "500px",
                  lineHeight: 1.6,
                }}
              >
                Export your Framer websites to clean HTML code with automatic
                watermark removal
              </Text>

              <Badge
                size="lg"
                variant="light"
                style={{
                  background: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                🌐 Export Framer Sites
              </Badge>
            </Stack>
          </Center>

          {/* Main Form */}
          <Paper
            p="xl"
            radius="xl"
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "var(--shadow-large)",
            }}
          >
            <Stack gap="lg">
              <Stack gap="xs">
                <Text size="sm" fw={600} c="dark">
                  Framer URL
                </Text>
                <TextInput
                  placeholder="https://your-site.framer.ai"
                  value={url}
                  onChange={(e) => setUrl(e.currentTarget.value)}
                  type="url"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  size="lg"
                  radius="md"
                  styles={{
                    input: {
                      border: "2px solid rgba(0, 0, 0, 0.1)",
                      transition: "all 0.2s ease",
                      "&:focus": {
                        borderColor: "var(--gradient-primary)",
                        boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
                      },
                    },
                  }}
                />
              </Stack>

              {error ? (
                <Text
                  c="red"
                  size="sm"
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  ⚠️ {error}
                </Text>
              ) : null}

              <Button
                loading={loading}
                onClick={onSubmit}
                size="lg"
                radius="md"
                style={{
                  background: "var(--gradient-primary)",
                  border: "none",
                  boxShadow: "var(--shadow-medium)",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "var(--shadow-large)",
                  },
                }}
                leftSection={<IconDownload size={20} />}
              >
                {loading ? "Exporting..." : "Export to HTML"}
              </Button>
            </Stack>
          </Paper>

          {/* Features Section */}
          <Paper
            p="lg"
            radius="lg"
            style={{
              background: "rgba(255, 255, 255, 0.6)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <Stack gap="md">
              <Text size="sm" fw={600} c="dark" style={{ textAlign: "center" }}>
                Key Features:
              </Text>
              <Group justify="center" gap="xl">
                <Stack gap="xs" align="center">
                  <ThemeIcon size="lg" radius="xl" variant="light" color="blue">
                    <IconCode size={20} />
                  </ThemeIcon>
                  <Text size="xs" c="dimmed" style={{ textAlign: "center" }}>
                    Production Code
                  </Text>
                </Stack>
                <Stack gap="xs" align="center">
                  <ThemeIcon
                    size="lg"
                    radius="xl"
                    variant="light"
                    color="green"
                  >
                    <IconDownload size={20} />
                  </ThemeIcon>
                  <Text size="xs" c="dimmed" style={{ textAlign: "center" }}>
                    Instant Export
                  </Text>
                </Stack>
                <Stack gap="xs" align="center">
                  <ThemeIcon
                    size="lg"
                    radius="xl"
                    variant="light"
                    color="purple"
                  >
                    <IconSparkles size={20} />
                  </ThemeIcon>
                  <Text size="xs" c="dimmed" style={{ textAlign: "center" }}>
                    Clean Output
                  </Text>
                </Stack>
              </Group>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
