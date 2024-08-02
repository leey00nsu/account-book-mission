function test() {
  console.log('TEST!');
}

const testButton = document.getElementById('check-button');
testButton.addEventListener('click', test);

// id가 test 녀석한테 붙어서, console.log로 TEST!를 출력해줘
