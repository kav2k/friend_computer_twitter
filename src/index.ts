import { Collection, WebhookClient } from "discord.js";
import Twitter from "twitter-v2";
import TwitterStream from "twitter-v2/build/TwitterStream";
import { loadConfig } from "./config";

async function init() {
  let running = true;

  const config = await loadConfig();
  const twitterClient = new Twitter({ bearer_token: config.bearer_token });

  const webhooks = new Collection(
    config.webhooks.map(({tag, id, token}) => [tag, new WebhookClient(id, token)])
  );

  let tweetStream: TwitterStream;

  process.on("SIGINT", () => {
    running = false;
    tweetStream.close();
    console.error("Interrupt signal");
  });
  
  process.once("SIGTERM", () => {
    running = false;
    tweetStream.close();
    console.error("Termination signal");
  });  

  while (running) {
    try {
      tweetStream = twitterClient.stream("tweets/search/stream", {
        "expansions": ["author_id"],
        "tweet.fields": ["id", "author_id", "text", "source"],
        "user.fields": ["id", "name", "username"]
      });

      console.log("Connected!\n")

      for await (const response of tweetStream) {
        const { data, includes: { users }, matching_rules } = response as StreamResponse;
        const author = users[0];

        const webhook = webhooks.find((webhook, tag) => matching_rules.some(rule => rule.tag == tag));

        console.log(`${author.name} just tweeted: https://twitter.com/${author.username}/status/${data.id}`);
        console.log(`Source: ${data.source}`);
        console.log(`Matching rules: ${matching_rules.map(rule => rule.tag)}\n`);

        webhook?.send(`${author.name} just tweeted: https://twitter.com/${author.username}/status/${data.id}`);  
      }

      console.error(`Client disconnected normally. ${running ? "Reconnecting" : "Shutting down"}.`);
    } catch (err) {
      console.error(`Client disconnected with an error: ${err}. Terminating.`)
      running = false;
      process.exit(1);
    }
  }
}

init();