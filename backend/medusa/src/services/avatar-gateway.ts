import { TransactionBaseService } from "@medusajs/medusa";

type InjectedDependencies = {
  productService: any;
  cartService: any;
  customerService: any;
  orderService: any;
};

type AvatarChatMessage = {
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
    device: "desktop" | "mobile" | "tablet";
  };
};

type AvatarResponse = {
  conversation_id: string;
  avatar_reply: {
    reply_text: string;
    emotion: "neutral" | "happy" | "excited" | "curious" | "thinking" | "reassuring" | "apologetic";
    animation_key: string | null;
    speech_hint: "short" | "normal" | "detailed";
  };
  cart_delta: {
    action: "none" | "created" | "updated";
    cart_id: string | null;
    summary: {
      line_items: Array<{
        title: string;
        variant_title: string | null;
        quantity: number;
        unit_price: number;
        subtotal: number;
      }>;
      total: number;
    } | null;
  };
  suggested_actions: Array<{
    type: "go_to_checkout" | "show_product" | "show_blog_post" | "none";
    payload: any;
  }>;
};

class AvatarGatewayService extends TransactionBaseService {
  protected productService_: any;
  protected cartService_: any;
  protected customerService_: any;
  protected orderService_: any;

  constructor({ productService, cartService, customerService, orderService }: InjectedDependencies) {
    super(arguments[0]);
    this.productService_ = productService;
    this.cartService_ = cartService;
    this.customerService_ = customerService;
    this.orderService_ = orderService;
  }

  async handleStorefrontChat(message: AvatarChatMessage): Promise<AvatarResponse> {
    // Generate or retrieve conversation ID
    const conversationId = message.conversation_id || this.generateConversationId();

    // This is a placeholder implementation
    // In production, this would call the actual AI service (CrewAI, Yappiverse, etc.)
    const aiServiceUrl = process.env.AVATAR_SERVICE_URL;
    
    if (aiServiceUrl) {
      try {
        // Call external AI service
        const response = await this.callExternalAvatarService(aiServiceUrl, message);
        return response;
      } catch (error) {
        console.error("Failed to call external avatar service:", error);
        // Fall back to basic response
      }
    }

    // Fallback: Generate a basic helpful response
    return this.generateBasicResponse(conversationId, message);
  }

  private async callExternalAvatarService(
    serviceUrl: string,
    message: AvatarChatMessage
  ): Promise<AvatarResponse> {
    const apiKey = process.env.AVATAR_API_KEY;
    
    const response = await fetch(`${serviceUrl}/storefront_chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey && { "Authorization": `Bearer ${apiKey}` }),
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error(`Avatar service returned ${response.status}`);
    }

    return response.json();
  }

  private generateBasicResponse(
    conversationId: string,
    message: AvatarChatMessage
  ): AvatarResponse {
    // Simple keyword-based responses for demonstration
    const userMessage = message.message.toLowerCase();
    let replyText = "Hi! I'm here to help you find exactly what you need. What are you looking for today?";
    let emotion: AvatarResponse["avatar_reply"]["emotion"] = "neutral";

    if (userMessage.includes("product") || userMessage.includes("looking for")) {
      replyText = "I'd love to help you find the perfect product! Can you tell me more about what you're looking for? For example, what's your budget range or any specific features you need?";
      emotion = "curious";
    } else if (userMessage.includes("price") || userMessage.includes("cost") || userMessage.includes("budget")) {
      replyText = "Great question! I can help you find options that fit your budget. What price range works best for you?";
      emotion = "reassuring";
    } else if (userMessage.includes("cart") || userMessage.includes("checkout")) {
      replyText = "I can help you with your cart! Would you like me to show you what's in there or guide you through checkout?";
      emotion = "happy";
    } else if (userMessage.includes("thank")) {
      replyText = "You're very welcome! I'm always here if you need anything else. Happy shopping!";
      emotion = "happy";
    }

    return {
      conversation_id: conversationId,
      avatar_reply: {
        reply_text: replyText,
        emotion,
        animation_key: null,
        speech_hint: "normal",
      },
      cart_delta: {
        action: "none",
        cart_id: message.cart_id || null,
        summary: null,
      },
      suggested_actions: [],
    };
  }

  private generateConversationId(): string {
    return `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  async getProducts(params: {
    search?: string;
    collection_id?: string;
    region_id: string;
    limit?: number;
    offset?: number;
  }) {
    const products = await this.productService_.list(
      {
        q: params.search,
        collection_id: params.collection_id ? [params.collection_id] : undefined,
      },
      {
        take: params.limit || 10,
        skip: params.offset || 0,
        relations: ["variants", "variants.prices"],
      }
    );

    return products;
  }

  async getCustomerOrders(customerId: string, limit = 10) {
    const orders = await this.orderService_.list(
      { customer_id: customerId },
      { take: limit, relations: ["items", "items.variant"] }
    );

    return orders;
  }
}

export default AvatarGatewayService;
