$(function () {
  // 이벤트 게시판 카테고리
  if(0 < $(".xans-board-listpackage-2 .boardSort").length) {
      var boardNo = 2;
      if(0 < boardNo) {
          if(0 < $("#board_category").length) {
              $(".xans-board-listpackage-2 .boardSort").hide();
              var html = '';
              var s = getQueryString('category_no');
              s = typeof s === "undefined" ? "" : s;
              $("#board_category > option").each(function(idx, item) {
                  var v = $(item).attr('value');
                  var n = $(item).text();
                  if(n) {
                      html += '<li class="kd-fleft"><a href="' + location.pathname + '?board_no=' + boardNo + '&category_no=' + v + '" ';
                      if(v == s) { html += 'class="selected"'; }
                      html += '>' + n + '</a></li>';
                  }
              });
              $(".xans-board-listpackage .boardSort").after('<ul id="kd-board-cate" class="kd-clear">' + html + '</ul>');
          }
      }
  }
  
  // 자주묻는질문 게시판 카테고리
  if(0 < $(".xans-board-listpackage-3 .boardSort").length) {
      var boardNo = 3;
      if(0 < boardNo) {
          if(0 < $("#board_category").length) {
              $(".xans-board-listpackage-3 .boardSort").hide();
              var html = '';
              var s = getQueryString('category_no');
              s = typeof s === "undefined" ? "" : s;
              $("#board_category > option").each(function(idx, item) {
                  var v = $(item).attr('value');
                  var n = $(item).text();
                  if(n) {
                      html += '<li class="kd-fleft"><a href="' + location.pathname + '?board_no=' + boardNo + '&category_no=' + v + '" ';
                      if(v == s) { html += 'class="selected"'; }
                      html += '>' + n + '</a></li>';
                  }
              });
              $(".xans-board-listpackage .boardSort").after('<ul id="kd-board-cate" class="kd-clear">' + html + '</ul>');
          }
      }
  }
});