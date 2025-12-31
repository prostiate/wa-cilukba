import fs from "fs";
import { createExtensionZip } from "../utils/extensionGenerator.ts";

const generateExtension = async () => {
  try {
    const zip = await createExtensionZip();
    // Since we are in Node, we want a buffer
    const buffer = await zip.generateAsync({ type: "nodebuffer" });
    fs.writeFileSync("WA-Cilukba-v1.0.0.zip", buffer);
    console.log("✅ Extension zip generated: WA-Cilukba-v1.0.0.zip");
  } catch (error) {
    console.error("❌ Failed to generate extension:", error);
    process.exit(1);
  }
};

generateExtension();
