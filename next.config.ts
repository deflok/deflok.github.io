import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Включаем статический экспорт
  output: "export",

  // 2. Если репозиторий называется 'my-portfolio', то базовый путь должен быть '/my-portfolio'
  basePath: '',

  // (Опционально) Чтобы изображения из public работали корректно
  assetPrefix: '',

  // Добавляем слеш в конце URL для корректной работы
  trailingSlash: true,

  // Отключаем оптимизацию изображений (GitHub Pages не поддерживает)
  images: {
    unoptimized: true
  }
};

export default nextConfig;
