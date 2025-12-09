#!/usr/bin/env node

import { OomolConnectClient } from "oomol-connect-sdk";

async function testConnection() {
  const baseUrl = "https://dd6994a962285240eaf0efeb628fffc62d42d3d5-frp1.fex.oomol.com/api";
  const apiKey = "api-c656404dfec3af418c6641d165c036b4b7579826bcfa4e0cf2bf6fc7d2481a97";

  console.log("🔍 Testing connection to Oomol Connect API...");
  console.log(`📍 Base URL: ${baseUrl}\n`);

  const client = new OomolConnectClient({
    baseUrl,
    defaultHeaders: {
      Authorization: apiKey,  // 直接使用 API key，不添加 Bearer 前缀
    },
  });

  try {
    // Test 1: List flows
    console.log("✅ Test 1: Listing flows...");
    const flowsResponse = await client.flows.list();
    console.log(`   Found ${flowsResponse.flows.length} flows`);
    if (flowsResponse.flows.length > 0) {
      flowsResponse.flows.slice(0, 3).forEach(flow => {
        console.log(`   - ${flow.name} (${flow.path})`);
      });
    }

    // Test 2: List blocks
    console.log("\n✅ Test 2: Listing blocks...");
    const blocksResponse = await client.blocks.list();
    console.log(`   Found ${blocksResponse.blocks.length} blocks`);
    if (blocksResponse.blocks.length > 0) {
      blocksResponse.blocks.slice(0, 3).forEach(block => {
        console.log(`   - ${block.name} (${block.package})`);
      });
    }

    // Test 3: List tasks
    console.log("\n✅ Test 3: Listing tasks...");
    const tasksResponse = await client.tasks.list();
    console.log(`   Found ${tasksResponse.tasks.length} tasks`);
    if (tasksResponse.tasks.length > 0) {
      tasksResponse.tasks.slice(0, 3).forEach(task => {
        console.log(`   - ${task.id} [${task.status}] - ${new Date(task.created_at).toLocaleString()}`);
      });
    }

    // Test 4: List packages
    console.log("\n✅ Test 4: Listing packages...");
    const packagesResponse = await client.packages.list();
    console.log(`   Found ${packagesResponse.packages.length} installed packages`);
    if (packagesResponse.packages.length > 0) {
      packagesResponse.packages.slice(0, 3).forEach(pkg => {
        console.log(`   - ${pkg.name}@${pkg.version}`);
      });
    }

    console.log("\n🎉 All tests passed! API connection is working perfectly.");
    console.log("\n📝 Your MCP Server is ready to use!");
    console.log("\n💡 Configuration for MCP clients:");
    console.log('   {');
    console.log('     "mcpServers": {');
    console.log('       "oomol-connect": {');
    console.log('         "command": "node",');
    console.log('         "args": ["dist/index.js"],');
    console.log('         "cwd": "/Users/wushuang/code/oomol-connect-sdk/oomol-connect-mcp-sdk-ts",');
    console.log('         "env": {');
    console.log(`           "OOMOL_CONNECT_BASE_URL": "${baseUrl}",`);
    console.log(`           "OOMOL_CONNECT_API_TOKEN": "${apiKey}"`);
    console.log('         }');
    console.log('       }');
    console.log('     }');
    console.log('   }');

  } catch (error) {
    console.error("\n❌ Test failed:", error);
    if (error instanceof Error) {
      console.error("   Error:", error.message);
    }
    process.exit(1);
  }
}

testConnection();
