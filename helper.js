exports.convertDegusaPriceToNumber = priceText => {
    return Number.parseInt(
      priceText
        .replace("€", "")
        .trim()
        .replace(",00", "")
        .replace(".", "")
    );
  };
  