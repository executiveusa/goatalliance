import { EventBusService } from "@medusajs/medusa";

type InjectedDependencies = {
  eventBusService: EventBusService;
};

/**
 * Daily Outbound Campaign Subscriber
 * 
 * IMPORTANT: This is a placeholder structure. For production use, implement scheduling via:
 * 1. External cron service (e.g., GitHub Actions, AWS CloudWatch Events)
 * 2. Node-cron package (requires separate process or long-running service)
 * 3. Railway Cron Jobs or similar platform features
 * 
 * Example with node-cron:
 * ```
 * import cron from 'node-cron';
 * cron.schedule('0 9 * * *', async () => {
 *   await new DailyOutboundSubscriber({ eventBusService }).runDailyOutbound();
 * });
 * ```
 */
class DailyOutboundSubscriber {
  constructor({ eventBusService }: InjectedDependencies) {
    console.log("Daily outbound subscriber initialized (requires external scheduling)");
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
