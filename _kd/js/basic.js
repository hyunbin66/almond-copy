$(function(){
  // swiper
  var swiper = new Swiper('.kd-bnmain-wrap .swiper-container', {
      loop: true,
      pagination: {
          el: '.swiper-pagination',
          type: "fraction",
      },
      autoplay: {
          delay: 3000,
          disableOnInteraction: false,
      },
  });
   var swiper = new Swiper('.kd-bnsub2-wrap .swiper-container', {
      loop: true,
      pagination: {
          el: '.swiper-pagination',
          type: "fraction",
      },
      autoplay: {
          delay: 3000,
          disableOnInteraction: false,
      },
  });
  var swiper = new Swiper('.kd-bnsub3-wrap .swiper-container', {
      loop: true,
      pagination: {
          el: '.swiper-pagination',
          type: "fraction",
      },
      autoplay: {
          delay: 3000,
          disableOnInteraction: false,
      },
  });
   var swiper = new Swiper('.kd-bnsub7-wrap .swiper-container', {
      loop: true,
      pagination: {
          el: '.swiper-pagination',
          type: "fraction",
      },
      autoplay: {
          delay: 3000,
          disableOnInteraction: false,
      },
  });
  var swiper = new Swiper('.kd-perma-wrap .swiper-container', {
      loop: true,
      pagination: {
          el: '.swiper-pagination',
          type: "fraction",
      },
      autoplay: {
          delay: 3000,
          disableOnInteraction: false,
      },
  });
  var swiper = new Swiper('.kd-time-wrap .swiper-container', {
      slidesPerView: 2.5,
      spaceBetween: '4%',
  });
var swiper = new Swiper('.kd-time-wrap2 .swiper-container', {
      slidesPerView: 2,
      spaceBetween: '4%',
  });
  
  var swiper = new Swiper('.kd-cherish-wrap .swiper-container', {
      slidesPerView: 1.5,
      loop : true, // 무한 반복
      spaceBetween: '4%',
  });

  var swiper = new Swiper('.kd-dessert-wrap .swiper-container', {
      slidesPerView: 2.5,
      spaceBetween: '4%',
  });
  
  var swiper = new Swiper('.kd-review-wrap .swiper-container', {
      slidesPerView: 3.5,
      spaceBetween: '3.5%',
  });
  
  var swiper = new Swiper('.kd-review-wrap .xans-board-notice.swiper-container', {
      slidesPerView: 2,
      spaceBetween: '4.54%',
      loop: true,
      pagination: {
          el: '.swiper-pagination',
          clickable: true,
      },
  });
  
  // 상단배너
  $('.kd-btn-close').click(function(){
      var top_h = $('.df-bannermanager-bn-top').height() * -1;
    $(this).parent().animate({'margin-top':top_h, 'opacity': 0},400);
  });
  
  // 헤더 및 퀵바 스크롤
  $(window).scroll(function() {
      if ($(window).scrollTop() > 0) {
          $('.kd-btn-scroll').fadeIn();
          $('#header').addClass('scroll');
      } else {
          $('.kd-btn-scroll').fadeOut();
          $('#header').removeClass('scroll');
      } 
  });

  // quick
  $("#kd-btn-top").click(function() {
      $('html').animate({scrollTop : 0}, 500);
  });
  $("#kd-btn-bottom").click(function() {
      $('html').animate({scrollTop : ($('#footer').offset().top)}, 600);
  });
  
  // 검색창 placeholder 불러오기
  $('#keyword').attr("placeholder","아몬드영에서 검색하세요!");
$('.search-overlay #keyword').attr("placeholder","아몬드영에서 검색하세요!");
  
  // 푸터 사업자 정보 클릭
  $('.kd-ft-info h2').click(function(){
    $(this).parent().toggleClass('selected');
  });
  
  // FAQ 게시판
  $('.kd-faq-wrap').click(function(){
      $(this).toggleClass('selected');
  });
  
  // 로그인페이지 SNS 안보이게
  var snsArea_num = $('.xans-member-login .snsArea li').length;
  var cnt = 0;
  $('.xans-member-login .snsArea li').each(function(){
      if($(this).hasClass('displaynone')) {
          cnt++;
      }
  });
  if(cnt == snsArea_num) {
      $('.xans-member-login .snsArea').hide();
  }
  
  // 상세페이지 소비자가 없을 때
  if($(".priceArea .kd-custom").text() == "원" || $(".priceArea .kd-custom").text() == "0원") {
    $(".priceArea .kd-custom").hide();
  }
  
  // 상품리스트 할인율
  $(".kd-prd-list .spec").each(function() {   
      var prd_custom = $(this).find('li[rel="소비자가"] > span').text();
      var prd_price = $(this).find('li[rel="판매가"] > span').text();
      var prd_sale = $(this).find('li[rel="할인판매가"] > span').text().split('원')[0];
      var dc_rate = "";

      // 소비자가 있을 때
      if ((prd_custom != prd_price) || (prd_custom != '') || (prd_custom != '0')) {
          prd_custom = parseInt(prd_custom.replace(/[^0-9]/g,""));
      } else {
          var prd_custom = 0;
      }

      // 판매가 있을 때
      if (prd_price != "") {
          prd_price = parseInt(prd_price.replace(/[^0-9]/g,""));
      } else {
          var prd_price = 0;
      }

      // 판매가 할인율 계산
      if ((prd_custom > '0') && (prd_price > 0) && (prd_custom > prd_price)) {
          dc_rate = Math.round((prd_custom - prd_price) / prd_custom * 100);
          $(this).parents('.description').after('<div class="kd-dc-rate">' + dc_rate + '%</li>');
      }

      // 할인판매가 있을 때
      if (prd_sale != "") {
          prd_sale = parseInt(prd_sale.replace(/[^0-9]/g,""));
      } else {
          var prd_sale = 0;
      }

      // 할인판매가 할인율 계산
      if ((prd_custom > '0') && (prd_sale > 0) && (prd_custom > prd_sale)) {
          dc_rate = Math.round((prd_custom - prd_sale) / prd_custom * 100);
          $('.kd-dc-rate',this).remove();
          $(this).parents('.description').after('<div class="kd-dc-rate-sale">' + dc_rate + '%</li>');
      }
  });
 
  // 슬라이드메뉴 인기검색어 없을 때
  if( !$('#kd-aside .kd-keyword > li > a').text() ) {
    $('.kd-keyword').hide();
  }
  
  // search 보이기/숨기기 
  $(document).ready(function() {
      $('#overlay-close-btn').click(function() {
          $('.search-overlay').fadeOut(); 
      });
      $('#bm_search').click(function() {
          $('.search-overlay').fadeIn(); 
      });
  });
  
  // search overlay 토글
  function fadeIn(el){
      el.classList.add('show');
      el.classList.remove('hide');  
  }

  function fadeOut(el){
      el.classList.add('hide');
      el.classList.remove('show');
  }

  var btn = document.getElementById('bm_search'),
      img = document.getElementById('search-overlay');

  btn.addEventListener('click', function(){
      if (img.className.indexOf('hide') !== -1) {
          fadeIn(img);  
          document.getElementById( 'search-overlay' ).style.display = 'block';
      }
      else {
          fadeOut(img);
          document.getElementById( 'search-overlay' ).style.display = 'none';
      }
  });
  
  // 하단 카테고리 클릭했을때 색변경
  $(document).ready(function(){
      var targetElement = $(".bottom-menu-v2 a");           
      targetElement.click(function() {
          $(this).addClass('active').siblings().removeClass('active');
          $('.bottom-menu-v2 a.active').css({ fill: "orange" });
      });
  }); 
  
 
  
  
  $(".accordion_header").click(function(){
      $(".accordion_header").removeClass("active");
      $(this).addClass("active");
  });

  var text = "Hello World!"
  
  setTimeout(() => $(".widget_total_sub span").text(text), 5000);
  var ssss = $(".widget_total_sub span").text()
  setTimeout(() => console.log(ssss), 5000);
});