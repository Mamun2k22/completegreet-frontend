/* eslint-disable indent */
/** @type {import('next').NextConfig} */
require('dotenv').config();
const nextConfig = {
	reactStrictMode: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
	env: {
		publicURL: process.env.PUBLIC_URL,
		apiUrl: process.env.API_URL,
	},
	images: {
		domains: [
			'www.countryflags.io',
			'127.0.0.1',
			'phpstack-618117-3493389.cloudwaysapps.comuserdefaultavatar.jpeg',
			'phpstack-618117-3493389.cloudwaysapps.com',
			'complete-greet.onrender.com',
		],
	},
};

module.exports = nextConfig;
