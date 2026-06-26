import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "docs",
  appearance: false,

  vite: {
    build: {
      chunkSizeWarningLimit: 2000
    }
  },
  
  title: "DAC Blockchain - Documentation",
  description: "The official documentation of DAC Quantum Blockchain.",
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }]
  ],

  themeConfig: {
    logo: '/assets/dac-logo-dark.svg',
    siteTitle: false,
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Ecosystem', link: '/ecosystem/dac-cryptocurrencies/' },
      { text: 'Development', link: '/development/public-testnet-tools-and-resources' },
      { text: 'Community', link: '/community/community-and-support' }
    ],

    sidebar: [
      {
        text: 'Overview',
        items: [
          { text: 'Introduction', link: '/' }
        ]
      },
      {
        text: 'Ecosystem',
        items: [
          {
            text: 'DAC Cryptocurrencies',
            link: '/ecosystem/dac-cryptocurrencies/',
            items: [
              { text: 'DAC Coin', link: '/ecosystem/dac-cryptocurrencies/dac-coin' },
              { text: 'DAC Token', link: '/ecosystem/dac-cryptocurrencies/dac-token' }
            ]
          },
          {
            text: 'DAC Nodes',
            link: '/ecosystem/dac-nodes/',
            items: [
              {
                text: 'Automated Installation',
                link: '/ecosystem/dac-nodes/automated-installation',
                items: [
                  { text: 'Linux Installation', link: '/ecosystem/dac-nodes/installer-linux' },
                  { text: 'macOS Installation', link: '/ecosystem/dac-nodes/installer-macos' },
                  { text: 'Windows Installation', link: '/ecosystem/dac-nodes/installer-windows' }
                ]
              },
              { text: 'Manual Installation', link: '/ecosystem/dac-nodes/manual-installation' },
              { text: 'Post-Install Mining', link: '/ecosystem/dac-nodes/post-install-mining' },
              { text: 'Status Monitor', link: '/ecosystem/dac-nodes/status-monitor' },
              { text: 'Migration Guide', link: '/ecosystem/dac-nodes/migration' },
              { text: 'JavaScript Console', link: '/ecosystem/dac-nodes/javascript-console' }
            ]
          },
          {
            text: 'DAC Wallets',
            link: '/ecosystem/dac-wallets/',
            items: [
              { text: 'Create and Manage Wallets', link: '/ecosystem/dac-wallets/create-and-manage-wallets' }
            ]
          }
        ]
      },
      {
        text: 'Development',
        items: [
          { text: 'Public Mainnet Tools & Resources', link: '/development/public-mainnet-tools-and-resources' },
          { text: 'Public Testnet Tools & Resources', link: '/development/public-testnet-tools-and-resources' },
          { text: 'Local Testnet Tools', link: '/development/local-testnet-tools' },
          { text: 'Obtaining Testnet DACC (Faucet)', link: '/development/obtaining-testnet-dacc-faucet' },
          {
            text: 'JSON RPC interfaces',
            link: '/development/json-rpc-interfaces/',
            items: [
              { text: 'Modules: admin', link: '/development/json-rpc-interfaces/modules-admin' },
              { text: 'Modules: debug', link: '/development/json-rpc-interfaces/modules-debug' },
              { text: 'Modules: eth', link: '/development/json-rpc-interfaces/modules-eth' },
              { text: 'Modules: ethash', link: '/development/json-rpc-interfaces/modules-ethash' },
              { text: 'Modules: miner', link: '/development/json-rpc-interfaces/modules-miner' },
              { text: 'Modules: net', link: '/development/json-rpc-interfaces/modules-net' },
              { text: 'Modules: personal', link: '/development/json-rpc-interfaces/modules-personal' },
              { text: 'Modules: trace', link: '/development/json-rpc-interfaces/modules-trace' },
              { text: 'Modules: txpool', link: '/development/json-rpc-interfaces/modules-txpool' },
              { text: 'Modules: web3', link: '/development/json-rpc-interfaces/modules-web3' }
            ]
          },
          { text: 'Web3 Secret Storage Definition', link: '/development/web3-secret-storage-definition' }
        ]
      },
      {
        text: 'Community',
        items: [
          { text: 'Community and Support', link: '/community/community-and-support' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/dacblockchain' },
      { icon: 'telegram', link: 'https://t.me/dac_chain' },
      { icon: 'x', link: 'https://x.com/dac_chain' },
      { icon: 'discord', link: 'https://discord.gg/dacchain' }
    ]
  }
})
