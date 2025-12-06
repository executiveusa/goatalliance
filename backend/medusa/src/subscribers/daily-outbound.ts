import { EventBusService } from "@medusajs/medusa";

type InjectedDependencies = {
  eventBusService: EventBusService;
};

class DailyOutboundSubscriber {
  constructor({ eventBusService }: InjectedDependencies) {
    // Schedule daily at 9 AM (you would use a proper scheduler like node-cron in production)
    // This is a placeholder for demonstration
    console.log("Daily outbound subscriber initialized");
    
    // In production, you would set up a cron job or use Medusa's scheduled jobs
    // For example with node-cron:
    // cron.schedule('0 9 * * *', async () => {
    //   await this.runDailyOutbound();
    // });
  }

  async runDailyOutbound() {
    try {
      const avatarServiceUrl = process.env.AVATAR_SERVICE_URL;
      const apiKey = process.env.AVATAR_API_KEY;

      if (!avatarServiceUrl) {
        console.log("Avatar service URL not configured, skipping daily outbound");
        return;
      }

      // Call the avatar service's daily outbound endpoint
      const response = await fetch(`${avatarServiceUrl}/daily_outbound`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(apiKey && { "Authorization": `Bearer ${apiKey}` }),
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Daily outbound failed: ${response.status}`);
      }

      const result = await response.json();
      console.log("Daily outbound completed:", result);
    } catch (error) {
      console.error("Daily outbound error:", error);
    }
  }
}

export default DailyOutboundSubscriber;
