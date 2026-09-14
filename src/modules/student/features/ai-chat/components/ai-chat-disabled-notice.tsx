import { Sparkles } from "lucide-react";

import { EmptyState } from "@/shared/components";

export function AiChatDisabledNotice() {
  return (
    <EmptyState
      icon={Sparkles}
      title="AI Chat is currently unavailable"
      description="Your institution has temporarily disabled this feature. Please check back later."
    />
  );
}
