import type { NextConfig } from "next";
import os from "os";

/**
 * 📱 IPs IPv4 LAN da máquina (ex.: 192.168.1.8) — o Next 16 bloqueia com 403
 * os assets de dev para origens fora desta lista.
 *
 * 🔎 Detectado em TEMPO DE EXECUÇÃO (não quebra quando o IP do Wi-Fi muda) +
 *    aceita IPs EXTRA/FIXOS via `frontend/.env.local`:
 *      NEXT_PUBLIC_LAN_IP="192.168.1.8"            (um IP)
 *      NEXT_PUBLIC_LAN_IP="192.168.1.8,10.0.0.5"  (vários, por vírgula)
 */
const detectedLanIps = Object.values(os.networkInterfaces())
  .flat()
  .filter((net): net is NonNullable<typeof net> => Boolean(net))
  .filter((net) => net.family === "IPv4" && !net.internal)
  .map((net) => net.address);

const envLanIps = (process.env.NEXT_PUBLIC_LAN_IP ?? "")
  .split(",")
  .map((ip) => ip.trim())
  .filter(Boolean);

/** 🔗 Detectados + fixos, sem repetição (ex.: ["192.168.1.8"]) */
const lanIps = Array.from(new Set([...detectedLanIps, ...envLanIps]));

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  devIndicators: false,
  /**
   * 🔀 PROXY /api → BACKEND.
   * - Dev: NEXT_PUBLIC_API_URL (default http://localhost:3002).
   * - Produção (Vercel): NEXT_PUBLIC_API_URL_PRODUCTION (URL do projeto
   *   Vercel do backend). Configure as env vars no painel do Vercel —
   *   o .env não é buildado no deploy.
   */
  async rewrites() {
    const apiUrl = process.env.NODE_ENV === "production"
      ? (process.env.NEXT_PUBLIC_API_URL_PRODUCTION || "https://lumen-backend.vercel.app")
      : (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002");
    return [
      {
        source: "/api/:path*",
        destination: `${apiUrl}/:path*`,
      },
    ];
  },
  /**
   * Permite acessar o dev server pela rede local (ex.: celular em
   * http://192.168.1.8:3000). Sem isso o Next 16 bloqueia os assets
   * de dev (chunks de JS) com 403 para origens fora do localhost.
   */
  allowedDevOrigins: lanIps,
};

export default nextConfig;