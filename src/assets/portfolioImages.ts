import devImg from './dev.webp';
import multicampusImg from './multicampus.webp';
import paygateImg from './paygate.webp';
import readmeforgeImg from './readme.webp';
import makeImg from './make.webp';

export const portfolioImages = {
  dev: devImg,
  multicampus: multicampusImg,
  paygate: paygateImg,
  readmeforge: readmeforgeImg,
  make: makeImg,
} as const;

export const allPortfolioImageUrls = Object.values(portfolioImages);
