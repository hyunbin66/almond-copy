EC$(function ($) {
  var filter = "win16|win32|win64|mac|macintel";
  var device = "pc";
  if (navigator.platform) {
    if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
      device = "mobile";
    }
  }

  /**
   * 상품 상세, 상품 확대 보기(팝업) - 소비자가 할인 표시 */
  var oPriceInfoEl = $("#ec-product-price-info");
  if (oPriceInfoEl.length > 0) {
    var salePriceEl = $("#span_product_price_text");
    percentageCul(oPriceInfoEl, salePriceEl);
  }

  /**
   * 상품 목록/메인 진열 - 소비자가 할인 표시*/
  var mainEl = $("#main");
  if (mainEl.length > 0) {
    var productListEl = $(
      ".xans-product-listmain, .xans-product-listrecommend, .xans-product-listnew, .xans-product-listnormal"
    );
    for (var i = 0; i < productListEl.length; i++) {
      var prdListEl = productListEl.eq(i).find(".prdList > li");
      for (var j = 0; j < prdListEl.length; j++) {
        var priceEl = prdListEl.eq(j).find(".description"),
          salePriceEl = priceEl
            .find(".xans-product > li")
            .eq(1)
            .find("span:eq(1)");

        if (device == "mobile") {
          salePriceEl = priceEl.find(".spec >li.price");
        }
        percentageCul(priceEl, salePriceEl);
      }
    }
  }

  function percentageCul(target, salePriceEl) {
    var iCustomPrice = parseInt(target.attr("ec-data-custom")),
      iPrice = parseInt(target.attr("ec-data-price")),
      sDisplayAmount = "p", // p:할인율, w:할인 금액
      iOfftoFixed = 1, // 할인율 소수점 자릿수
      sSaleText = "",
      regexp = /B(?=(d{3})+(?!d))/g;

    if (iCustomPrice > 0 && iPrice > 0 && iPrice != iCustomPrice) {
      if (sDisplayAmount == "p") {
        sSaleText =
          (((iCustomPrice - iPrice) / iCustomPrice) * 100).toFixed(
            iOfftoFixed
          ) + "% OFF";
      } else if (sDisplayAmount == "w") {
        sSaleText =
          parseInt(iCustomPrice - iPrice)
            .toString()
            .replace(regexp, ",") + "원 OFF";
      }
      salePriceEl.append(" " + sSaleText + "");
    }
  }
});