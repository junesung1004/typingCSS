function wordTyping() {
  var typingBool = false;
  var typingIdx = 0;
  var liIndex = 0;

  var liElements = document.querySelectorAll(".typing-txt > ul > li");
  var liLength = liElements.length;

  // 타이핑될 텍스트를 가져온다
  var typingTxt = liElements[liIndex].textContent.trim();
  typingTxt = typingTxt.split(""); // 한 글자씩 자른다.

  if (!typingBool) { // 타이핑이 진행되지 않았다면
      typingBool = true;
      var tyInt = setInterval(typing, 100); // 반복 동작
  }

  function typing() {
      var typingLiElements = document.querySelectorAll(".typing > ul > li")
      typingLiElements.forEach(function (li) {
          li.classList.remove("on");
      });

      typingLiElements[liIndex].classList.add("on");

      if (typingIdx < typingTxt.length) { // 타이핑될 텍스트 길이만큼 반복
          typingLiElements[liIndex].textContent += typingTxt[typingIdx]; // 한 글자씩 이어준다.
          typingIdx++;
      } else {
          if (liIndex < liLength - 1) {
              // 다음 문장으로 가기 위해 인덱스를 1 증가
              liIndex++;
              // 다음 문장을 타이핑하기 위한 셋팅
              typingIdx = 0;
              typingBool = false;
              typingTxt = liElements[liIndex].textContent.trim();

              //감춰둔 대화창 띄우기
              var parentSection = liElements[liIndex].closest('section.before-message');
              if (parentSection) {
                  parentSection.classList.remove('before-message');
              }

              typingTxt = typingTxt.split(""); // 다시 배열로 만듦

              // 다음 문장 타이핑 전 1초 쉰다
              clearInterval(tyInt); // 타이핑 종료

              setTimeout(function () {
                  // 1초 후에 다시 타이핑 반복 시작
                  tyInt = setInterval(typing, 100);
              }, 1000);
          } else if (liIndex === liLength - 1) {
              // 마지막 문장까지 써지면 반복 종료
              clearInterval(tyInt);
          }
      }
  }

}

window.onload = function() {
  wordTyping();
};