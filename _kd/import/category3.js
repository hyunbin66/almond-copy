function redirectToAppStore() {
  var isAndroid = /Android/i.test(navigator.userAgent);
  var isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isAndroid) {
    window.location.href =
      "https://play.google.com/store/apps/details?id=com.pauseb.projectc"; // 수정한 구글 플레이 스토어 링크
  } else if (isIOS) {
    window.location.href =
      "https://apps.apple.com/kr/app/%EB%8B%A4%EB%B7%B0/id6452912806?platform=iphone"; // 수정한 애플 앱 스토어 링크
  } else {
    // 다른 플랫폼이라면 기본 동작 설정 (예: 웹 페이지로 이동)
    window.location.href = "https://play.google.com/store/apps/details?id=com.lcnine.daview";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const viewAllButton = document.getElementById("viewAllButton");
  const slider = document.querySelector(".hamburger_category_slider");
  let isViewAll = false;
  let currentSlide = 0;

  const slides = document.querySelectorAll(
    ".hamburger_category_slider > div"
  );
  const dots = document.querySelectorAll(".dot");

  // 드래그 관련 변수
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID = 0;

  const supabaseUrl = "https://lqibttwulcrhlunvjkwh.supabase.co";
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxaWJ0dHd1bGNyaGx1bnZqa3doIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA2OTg5NjYsImV4cCI6MjA0NjI3NDk2Nn0.K9qaBcngXif4b6wPy7feHRZrBLmFaiB-DDl0g4vkzqc";
  // 변수 이름을 'supabaseClient'로 변경
  const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);


  // '전체 메뉴보기' 버튼 클릭 이벤트
  viewAllButton.addEventListener("click", () => {
    isViewAll = !isViewAll;
    if (isViewAll) {
      viewAllButton.textContent = "닫기";
      dots.forEach((dot) => (dot.style.display = "none")); // 점 숨기기
      slides.forEach((slide) => slide.classList.add("active")); // 모든 슬라이드 표시
      removeDragEvents(); // 드래그 이벤트 제거
    } else {
      viewAllButton.textContent = "전체 메뉴보기";
      dots.forEach((dot) => (dot.style.display = "flex")); // 점 보이기
      slides.forEach((slide) => slide.classList.remove("active")); // 모든 슬라이드 숨기기
      slides[currentSlide].classList.add("active"); // 현재 슬라이드만 보이기
      updateDots(); // 점 상태 업데이트
      addDragEvents(); // 드래그 이벤트 추가
    }
  });

  // 슬라이드 초기 상태 설정
  updateSlider();

  // 드래그 이벤트 추가 함수
  function addDragEvents() {
    // PC 마우스 이벤트
    slider.addEventListener("mousedown", dragStart);
    slider.addEventListener("mousemove", drag);
    slider.addEventListener("mouseup", dragEnd);
    slider.addEventListener("mouseleave", dragEnd);

    // 모바일 터치 이벤트
    slider.addEventListener("touchstart", dragStart);
    slider.addEventListener("touchmove", drag);
    slider.addEventListener("touchend", dragEnd);
  }

  // 드래그 이벤트 제거 함수
  function removeDragEvents() {
    // PC 마우스 이벤트
    slider.removeEventListener("mousedown", dragStart);
    slider.removeEventListener("mousemove", drag);
    slider.removeEventListener("mouseup", dragEnd);
    slider.removeEventListener("mouseleave", dragEnd);

    // 모바일 터치 이벤트
    slider.removeEventListener("touchstart", dragStart);
    slider.removeEventListener("touchmove", drag);
    slider.removeEventListener("touchend", dragEnd);
  }

  // 슬라이드 초기 상태 설정
  updateSlider();

  function updateSlider() {
    if (!isViewAll) {
      slides.forEach((slide, index) => {
        slide.classList.toggle("active", index === currentSlide); // 현재 슬라이드만 보이기
      });
      updateDots(); // 점 상태 업데이트
    }
  }

  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  // 각 점(dot)에 클릭 이벤트 추가
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      updateSlider();
    });
  });

  // 드래그 시작
  function dragStart(event) {
    event.preventDefault();
    if (event.type === "touchstart") {
      startPos = event.touches[0].clientX;
    } else {
      startPos = event.clientX;
    }
    isDragging = true;
    animationID = requestAnimationFrame(animation);
    slider.style.cursor = "grabbing";
  }

  // 드래그 중
  function drag(event) {
    if (isDragging) {
      const currentPosition =
        event.type === "touchmove" ? event.touches[0].clientX : event.clientX;
      currentTranslate = prevTranslate + currentPosition - startPos;
    }
  }

  // 드래그 종료
  function dragEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    slider.style.cursor = "grab";

    const movedBy = currentTranslate - prevTranslate;

    // 드래그 방향에 따라 슬라이드 변경
    if (Math.abs(movedBy) > 100) {
      // 최소 드래그 거리
      if (movedBy < 0 && currentSlide < slides.length - 1) {
        currentSlide++;
      } else if (movedBy > 0 && currentSlide > 0) {
        currentSlide--;
      }
    }

    updateSlider();
  }

  // 애니메이션
  function animation() {
    if (isDragging) {
      requestAnimationFrame(animation);
    }
  }

  // 기본 드래그 동작 방지
  slider.addEventListener("dragstart", (e) => e.preventDefault());

  // 드래그 이벤트를 초기화 시 추가
  addDragEvents();

  // memberId를 확인하고 없으면 추가하는 함수
  async function checkAndInsertMember(memberId) {
    try {
      // cafe24_id가 memberId인 행이 있는지 확인
      let { data, error, status } = await supabaseClient
        .from('members')
        .select('*')
        .eq('cafe24_id', memberId)
        .single();

      if (error && status !== 406) {
        console.error('멤버 확인 중 오류:', error.message);
        return;
      }

      if (data) {
        // 이미 멤버가 존재함
        console.log('이미 존재하는 멤버:', data);
        // alert('이미 등록된 멤버입니다!');
      } else {
        // 멤버가 없으므로 새로 추가
        const { data: insertData, error: insertError } = await supabaseClient
          .from('members')
          .insert([{ cafe24_id: memberId }]);

        if (insertError) {
          console.error('멤버 추가 중 오류:', insertError.message);
          return;
        }

        console.log('멤버 추가 성공:', insertData);
        // alert('멤버가 성공적으로 등록되었습니다!');
        // 추가적인 로직을 여기에 추가하세요
      }
    } catch (err) {
      console.error('멤버 확인/추가 중 예외 발생:', err);
    }
  }

  sessionStorage.setItem("memberId", "hyunbin");
  const memberId = sessionStorage.getItem("memberId");
  if (memberId != null && memberId.length != 0) {
    checkAndInsertMember(memberId);
  }
});