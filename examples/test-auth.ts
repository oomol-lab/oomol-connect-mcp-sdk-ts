#!/usr/bin/env node

import { OomolConnectClient } from "oomol-connect-sdk";

async function testConnection() {
  const baseUrl = "https://dd6994a962285240eaf0efeb628fffc62d42d3d5-frp1.fex.oomol.com/api";
  const apiKey = "api-c656404dfec3af418c6641d165c036b4b7579826bcfa4e0cf2bf6fc7d2481a97";

  console.log("🔍 Testing different authentication methods...");
  console.log(`📍 Base URL: ${baseUrl}`);

  // Method 1: Direct apiToken (adds Bearer prefix automatically)
  console.log("\n📌 Method 1: Using apiToken parameter...");
  try {
    const client1 = new OomolConnectClient({
      baseUrl,
      apiToken: apiKey,
    });
    const response = await client1.flows.list();
    console.log(`   ✅ Success! Found ${response.flows.length} flows`);
    return;
  } catch (error: any) {
    console.log(`   ❌ Failed: ${error.message}`);
  }

  // Method 2: Bearer token in Authorization header
  console.log("\n📌 Method 2: Using Bearer token in Authorization header...");
  try {
    const client2 = new OomolConnectClient({
      baseUrl,
      defaultHeaders: {
        "Authorization": `Bearer ${apiKey}`,
      },
    });
    const response = await client2.flows.list();
    console.log(`   ✅ Success! Found ${response.flows.length} flows`);
    return;
  } catch (error: any) {
    console.log(`   ❌ Failed: ${error.message}`);
  }

  // Method 3: Direct token (no Bearer prefix)
  console.log("\n📌 Method 3: Using direct token in Authorization header...");
  try {
    const client3 = new OomolConnectClient({
      baseUrl,
      defaultHeaders: {
        "Authorization": apiKey,
      },
    });
    const response = await client3.flows.list();
    console.log(`   ✅ Success! Found ${response.flows.length} flows`);
    return;
  } catch (error: any) {
    console.log(`   ❌ Failed: ${error.message}`);
  }

  // Method 4: X-API-Key header
  console.log("\n📌 Method 4: Using X-API-Key header...");
  try {
    const client4 = new OomolConnectClient({
      baseUrl,
      defaultHeaders: {
        "X-API-Key": apiKey,
      },
    });
    const response = await client4.flows.list();
    console.log(`   ✅ Success! Found ${response.flows.length} flows`);
    return;
  } catch (error: any) {
    console.log(`   ❌ Failed: ${error.message}`);
  }

  console.log("\n❌ All authentication methods failed.");
  console.log("Please check:");
  console.log("  1. The API key is correct");
  console.log("  2. The base URL is accessible");
  console.log("  3. The API server is running");
}

testConnection();
