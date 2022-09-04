// interface Props {
//   type: "num" | "symbol";
//   scale: number;
// }

export const generateRandom = ({ type, scale = 10 }) => {
  switch (type) {
    case "num": {
      return Math.floor(Math.random() * scale);
    }
    case "symbol": {
      const allSymbols = [
        0x1433,
        0x1438,
        0x142f,
        0x1431,
        0x21f3,
        0x2b04,
        0x22a1,
        0x00b1,
        0x2213,
        0x2219,
        0x22cb,
        0x0394,
        0x2203,
        0x2260,
        0x27c2,
        0x221f,
        0x22aa,
        0x1d6db,
        0x2209,
      ];

      let symbol;

      while (!symbol) {
        let random = generateRandom({ type: "num", scale: 100 });
        if (allSymbols[random]) {
          symbol = allSymbols[random];
        }
      }
      return symbol;
    }
    default: {
      return 0;
    }
  }
};
