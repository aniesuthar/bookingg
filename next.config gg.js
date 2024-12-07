/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ensure entry is handled correctly
      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = await originalEntry();

        // Add the custom widget entry point
        if (!entries['appointment-widget-bundle']) {
          entries['appointment-widget-bundle'] = './src/widget-entry.tsx';
        }

        return entries;
      };

      // Leave other parts of the Webpack config untouched
    }

    return config;
  },

  async headers() {
    return [
      {
        source: '/appointment-widget-bundle.js',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;