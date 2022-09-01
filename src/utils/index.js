export const generateRandom = (num, type) => {
  switch (type) {
    case "num": {
      let multiplier = "1";
      let count = 0;
      while (count < num) {
        multiplier += "0";
        count += 1;
      }

      let randomNumber = 0;

      while (randomNumber.length !== num) {
        const random = Math.random() * multiplier;

        randomNumber = String(random).slice(0, num);
      }

      return randomNumber;
    }
    case "symbol": {
      let symbols = "";
      let count = 0;

      while (count < num) {
        symbols += String.fromCharCode(
          0x30a0 + Math.random() * (0x30ff - 0x30a0 + 1)
        );

        count += 1;
      }
      return symbols;
    }
    default: {
      return "";
    }
  }
};
