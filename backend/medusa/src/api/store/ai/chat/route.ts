import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const avatarGatewayService = req.scope.resolve("avatarGatewayService");

  try {
    const response = await avatarGatewayService.handleStorefrontChat(req.body);
    res.json(response);
  } catch (error) {
    console.error("Error in avatar chat:", error);
    res.status(500).json({
      error: "Failed to process chat message",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
