exports.parameters = [
  {
    url:
      "https://shop.degussa-goldhandel.de/1-oz-canadian-maple-leaf-goldmuenze",
    selector: "div.product-type-data span.regular-price span.price",
    defaultTags: [
      "'shop:degussa-goldhandel.de'",
      "'name:Canadian Maple Leaf'",
      "'year:2020'",
      "'type:Goldcoin'",
      "'country:Kanada'",
      "'weigth:1oz'",
      "'priceCurrency:EUR'"
    ],
    price: 0.0
  },
  {
    url: "https://shop.degussa-goldhandel.de/1-oz-philharmoniker-goldmuenze",
    selector: "div.product-type-data span.regular-price span.price",
    defaultTags: [
      "'shop:degussa-goldhandel.de'",
      "'name:Wiener Philharmoniker'",
      "'year:2020'",
      "'type:Goldcoin'",
      "'country:Oesterreich'",
      "'weigth:1oz'",
      "'priceCurrency:EUR'"
    ],
    price: 0.0
  },
  {
    url: "https://shop.degussa-goldhandel.de/1-oz-kruegerrand-goldmuenze",
    selector: "div.product-type-data span.regular-price span.price",
    defaultTags: [
      "'shop:degussa-goldhandel.de'",
      "'name:Kruegerrand'",
      "'year:2020'",
      "'type:Goldcoin'",
      "'country:Suedafrika'",
      "'weigth:1oz'",
      "'priceCurrency:EUR'"
    ],
    price: 0.0
  }
];
