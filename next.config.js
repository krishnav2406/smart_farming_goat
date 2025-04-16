/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['images.unsplash.com', 'plus.unsplash.com'],
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // Don't resolve 'fs', 'net', etc. on the client
            config.resolve.fallback = {
                fs: false,
                net: false,
                tls: false,
                dns: false,
                child_process: false,
                http2: false,
            };
        }
        return config;
    },
};

if (process.env.NEXT_PUBLIC_TEMPO) {
    nextConfig["experimental"] = {
        // NextJS 13.4.8 up to 14.1.3:
        // swcPlugins: [[require.resolve("tempo-devtools/swc/0.86"), {}]],
        // NextJS 14.1.3 to 14.2.11:
        swcPlugins: [[require.resolve("tempo-devtools/swc/0.90"), {}]]

        // NextJS 15+ (Not yet supported, coming soon)
    }
}

module.exports = nextConfig;