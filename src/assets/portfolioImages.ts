import devImg from './dev.png';
import multicampusImg from './multicampus.png';
import paygateImg from './paygate.png';
import readmeforgeImg from './readme.png';
import makeImg from './make.png';

export const portfolioImages = {
  dev: devImg,
  multicampus: multicampusImg,
  paygate: paygateImg,
  readmeforge: readmeforgeImg,
  make: makeImg,
} as const;

export const allPortfolioImageUrls = Object.values(portfolioImages);
