class omniusPaging {
  currentPage = 1;
  skip = 0;
  totalData = 0;
  constructor(dataPerPage, pageCount, viewId, callBack) {
    this.dataPerPage = dataPerPage;
    this.pageCount = pageCount;
    this.viewId = viewId;
    this.btClass = viewId + "_pg_bt";
    this.evtCb = this.evtCb.bind(this);
    this.callBack = callBack;
  }
  view() {
    var totalPage = Math.ceil(this.totalData / this.dataPerPage);
    var pageGroup = Math.ceil(this.currentPage / this.pageCount);

    var last = pageGroup * this.pageCount;
    if (last > totalPage) {
      last = totalPage;
    }
    var first = last - (this.pageCount - 1);
    var prev = this.currentPage - 1;
    var next = this.currentPage + 1;
    if (totalPage < 1) {
      first = last;
    }

    var html = "";

    if (prev > 0) {
      html +=
        '<li class="prev"><p class="' +
        this.btClass +
        '" data-pgg="' +
        prev +
        '">이전</p></li>';
    }

    for (let i = first; i <= last; i++) {
      if (this.currentPage == i) {
        html +=
          '<li class=""><p class="' +
          this.btClass +
          ' act" data-pgg="' +
          i +
          '">' +
          i +
          "</p></li>";
      } else if (i > 0) {
        html +=
          '<li class=""><p class="' +
          this.btClass +
          '" data-pgg="' +
          i +
          '">' +
          i +
          "</p></li>";
      }
    }

    if (next <= totalPage) {
      html +=
        '<li class="next"><p class="' +
        this.btClass +
        '" data-pgg="' +
        next +
        '">다음</p></li>';
    }

    document.getElementById(this.viewId).innerHTML = html;

    var bt = document.querySelectorAll("." + this.btClass);
    this.evt(bt);
  }
  evt(bt) {
    for (let i = 0; i < bt.length; i++) {
      bt[i].addEventListener("click", this.evtCb);
    }
  }
  evtCb(e) {
    var pg = parseInt(e.target.dataset.pgg);
    this.currentPage = pg;
    this.skip = (pg - 1) * this.dataPerPage;
    // console.log(this.currentPage);

    this.callBack();
  }
}
