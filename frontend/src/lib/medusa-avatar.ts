/**
 * Medusa Store Avatar Integration
 * TypeScript contracts and adapter for autonomous sales avatar
 */

export type AvatarEmotion = 
  | "neutral" 
  | "happy" 
  | "excited" 
  | "curious" 
  | "thinking" 
  | "reassuring" 
  | "apologetic";

export type SpeechHint = "short" | "normal" | "detailed";

export type DeviceType = "desktop" | "mobile" | "tablet";

export interface AvatarChatRequest {
  conversation_id: string | null;
  message: string;
  customer?: {
    id?: string;
    email?: string;
    locale?: string;
    region_id?: string;
  };
  cart_id?: string;
  avatar_id: string;
  client_view?: {
    page: string;
    url: string;
    device: DeviceType;
  };
}

export interface AvatarReply {
  reply_text: string;
  emotion: AvatarEmotion;
  animation_key: string | null;
  speech_hint: SpeechHint;
}

export interface CartSummary {
  line_items: Array<{
    title: string;
    variant_title: string | null;
    quantity: number;
    unit_price: number;
    subtotal: number;
  }>;
  total: number;
}

export interface CartDelta {
  action: "none" | "created" | "updated";
  cart_id: string | null;
  summary: CartSummary | null;
}

export interface SuggestedAction {
  type: "go_to_checkout" | "show_product" | "show_blog_post" | "none";
  payload: any;
}

export interface AvatarChatResponse {
  conversation_id: string;
  avatar_reply: AvatarReply;
  cart_delta: CartDelta;
  suggested_actions: SuggestedAction[];
}

/**
 * Configuration for the Medusa store avatar client
 */
export interface AvatarClientConfig {
  medusaUrl: string;
  avatarId: string;
  regionId?: string;
  onError?: (error: Error) => void;
}

/**
 * Client for interacting with the Medusa store avatar API
 */
export class MedusaAvatarClient {
  private config: AvatarClientConfig;
  private conversationId: string | null = null;

  constructor(config: AvatarClientConfig) {
    this.config = config;
  }

  /**
   * Send a message to the store avatar
   */
  async sendMessage(
    message: string,
    options?: {
      customerId?: string;
      customerEmail?: string;
      cartId?: string;
      page?: string;
      device?: DeviceType;
    }
  ): Promise<AvatarChatResponse> {
    try {
      const request: AvatarChatRequest = {
        conversation_id: this.conversationId,
        message,
        avatar_id: this.config.avatarId,
        customer: options?.customerId || options?.customerEmail
          ? {
              id: options.customerId,
              email: options.customerEmail,
              region_id: this.config.regionId,
            }
          : undefined,
        cart_id: options?.cartId,
        client_view: {
          page: options?.page || window.location.pathname,
          url: window.location.href,
          device: options?.device || this.detectDevice(),
        },
      };

      const response = await fetch(`${this.config.medusaUrl}/store/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`Avatar API returned ${response.status}`);
      }

      const data: AvatarChatResponse = await response.json();
      
      // Store conversation ID for continuity
      this.conversationId = data.conversation_id;

      return data;
    } catch (error) {
      const err = error instanceof Error ? error : new Error("Unknown error");
      this.config.onError?.(err);
      throw err;
    }
  }

  /**
   * Reset the conversation
   */
  resetConversation(): void {
    this.conversationId = null;
  }

  /**
   * Get current conversation ID
   */
  getConversationId(): string | null {
    return this.conversationId;
  }

  /**
   * Detect device type from user agent
   */
  private detectDevice(): DeviceType {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "tablet";
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      return "mobile";
    }
    return "desktop";
  }
}

/**
 * Helper function to create a pre-configured avatar client
 */
export function createAvatarClient(config: Partial<AvatarClientConfig> = {}): MedusaAvatarClient {
  const medusaUrl = config.medusaUrl || import.meta.env.VITE_MEDUSA_URL || "http://localhost:9000";
  const avatarId = config.avatarId || "default-avatar";

  return new MedusaAvatarClient({
    medusaUrl,
    avatarId,
    regionId: config.regionId,
    onError: config.onError,
  });
}
