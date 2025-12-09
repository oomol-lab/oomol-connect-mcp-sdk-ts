#!/usr/bin/env node

import { OomolConnectClient } from "oomol-connect-sdk";

async function testConnection() {
  const baseUrl = "https://dd6994a962285240eaf0efeb628fffc62d42d3d5-frp1.fex.oomol.com/api";
  const apiToken = "api-c656404dfec3af418c6641d165c036b4b7579826bcfa4e0cf2bf6fc7d2481a97";

  console.log("🔍 Testing connection to Oomol Connect API...");
  console.log(`📍 Base URL: ${baseUrl}`);

  const client = new OomolConnectClient({
    baseUrl,
    defaultHeaders: {
      Authorization: `Bearer ${apiToken}`,
    },
  });

  try {
    // Test 1: List flows
    console.log("\n✅ Test 1: Listing flows...");
    const flowsResponse = await client.flows.list();
    console.log(`   Found ${flowsResponse.flows.length} flows`);
    if (flowsResponse.flows.length > 0) {
      console.log(`   Example: ${flowsResponse.flows[0].name} (${flowsResponse.flows[0].path})`);
    }

    // Test 2: List blocks
    console.log("\n✅ Test 2: Listing blocks...");
    const blocksResponse = await client.blocks.list();
    console.log(`   Found ${blocksResponse.blocks.length} blocks`);
    if (blocksResponse.blocks.length > 0) {
      console.log(`   Example: ${blocksResponse.blocks[0].name} (${blocksResponse.blocks[0].package})`);
    }

    // Test 3: List tasks
    console.log("\n✅ Test 3: Listing tasks...");
    const tasksResponse = await client.tasks.list();
    console.log(`   Found ${tasksResponse.tasks.length} tasks`);
    if (tasksResponse.tasks.length > 0) {
      const latestTask = tasksResponse.tasks[0];
      console.log(`   Latest: ${latestTask.id} - Status: ${latestTask.status}`);
    }

    // Test 4: List packages
    console.log("\n✅ Test 4: Listing packages...");
    const packagesResponse = await client.packages.list();
    console.log(`   Found ${packagesResponse.packages.length} installed packages`);
    if (packagesResponse.packages.length > 0) {
      console.log(`   Example: ${packagesResponse.packages[0].name}@${packagesResponse.packages[0].version}`);
    }

    console.log("\n🎉 All tests passed! API connection is working.");
    console.log("\n📝 MCP Server is ready to use!");
    console.log("   You can now configure it in Cherry Studio, VSCode, or Claude Desktop.");

  } catch (error) {
    console.error("\n❌ Test failed:", error);
    if (error instanceof Error) {
      console.error("   Error:", error.message);
    }
    process.exit(1);
  }
}

testConnection();
