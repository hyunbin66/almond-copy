const replaceListText = () => {
  var elements = $(".kd-custom");

  elements.each(function () {
    var textNodes = $(this)
      .contents()
      .filter(function () {
        return (
          this.nodeType === 3 &&
          ($.trim(this.nodeValue) === "0원" ||
            $.trim(this.nodeValue) === "원" ||
            $.trim(this.nodeValue) === "NaN원")
        );
      });
    textNodes.replaceWith("무료");
  });
};

const priceTextObserver = new window.MutationObserver(replaceListText);

document.querySelectorAll(".kd-prd-list").forEach((grid) => {
  priceTextObserver.observe(grid, {
    childList: true,
    subtree: true,
  });
});

$(document).ready(replaceListText);

$(".imgLink").click(function (e) {
  e.preventDefault();
  document.getElementById("alpha_review_alink").click();
  var scrollPosition = $(".tab").offset().top;
  $("html, body").stop().animate(
    {
      scrollTop: scrollPosition,
    },
    400
  );
});
