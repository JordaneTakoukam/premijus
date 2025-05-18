import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Ne pas mettre i18n ici si tu utilises le App Router
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
