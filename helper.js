const locale = "de-DE";
const formatter = new Intl.NumberFormat(locale, {
  style: "currency",
  currency: "EUR"
});

exports.convertDegusaPriceToNumber = priceText => {
  return Number.parseInt(
    priceText
      .replace("€", "")
      .trim()
      .replace(",00", "")
      .replace(".", "")
  );
};

exports.reverseFormatNumber = val => {
  var group = formatter.format(1111).replace(/1/g, "");
  var decimal = formatter.format(1.1).replace(/1/g, "");
  var reversedVal = val.replace(new RegExp("\\" + group, "g"), "");
  reversedVal = reversedVal.replace(new RegExp("\\" + decimal, "g"), ".");
  return Number.isNaN(reversedVal) ? 0 : reversedVal;
};
