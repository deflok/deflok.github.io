/*СОЗДАЁМ ОСНОВНЫЕ ПЕРЕМЕННЫЕ*/
var body, 
num, 
array, 
width, 
frequency, 
volumeMin, 
volumeMax, 
context, 
logo, 
myElements, 
analyser, 
src, 
height;

/*ЗАПИСЫВАЕМ В ПЕРЕМЕННУЮ body ЭЛЕМЕНТ body*/
body = document.querySelector('body');

var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext('2d');

/*УКАЗЫВАЕМ РЕДКОСТЬ СТОЛБЦОВ - MIN: 2, MAX: 10*/
frequency = 4;
volumeMin = 4;
volumeMax = 8;

/*УКАЗЫВАЕМ КОЛИЧЕСТВО СТОЛБЦОВ НА ИНДИКАТОРЕ*/
num = canvas.width / frequency;


array = new Uint8Array(num * 2);
/*УКАЗЫВАЕМ ДЛИНУ СТОЛБИКОВ В PX*/
width = (canvas.width / num) - (frequency / 2);





/*ПРИ НАЖАТИИ НА КНОПКУ МЫШИ В ДОКУМЕНТЕ*/
window.onclick = function () {
  if (context) return;

  /*ПРОПИСЫВАЕМ ЦИКЛ ВНУТРИ КОТОРОГО БУДЕМ СОЗДАВАТЬ ЭЛЕМЕНТЫ НАШИХ СТОЛБИКОВ*/
  // for (var i = 0; i < num; i++) {
  //   logo = document.createElement('div'); /*КАЖДЫЙ ЭЛЕМЕНТ БУДЕТ ЗАПИСЫВАТЬСЯ ВНУТРИ ПЕРЕМЕННОЙ logo*/
  //   logo.className = 'line'; /*ДЛЯ ВЫШЕ СОЗДАННОГО ЭЛЕМЕНТА МЫ ПРОПИСЫВАЕМ КЛАСС logo*/
  //   logo.style.background = 'blue'; /*ПРОПИСЫВАЕМ КРАСНЫЙ ЦВЕТ ФОНА*/
  //   logo.style.minWidth = width + 'px'; /*УКАЗЫВАЕМ ЕГО ШИРИНУ*/
  //   body.appendChild(logo); /*ДОБАВЛЯЕМ ЭЛЕМЕНТ ВО ВНУТРЬ ЭЛЕМЕНТА body*/
  // }

  // myElements = document.getElementsByClassName('line');/*ЗАПИСЫВАЕМ ЭЛЕМЕНТ logo В ПЕРЕМЕННУЮ myElement*/
  context = new AudioContext(); /*СОЗДАЕМ НОВЫЙ ЭКЗЕМПЛЯР КЛАССА AudioContext*/

  /*СОЗДАЁМ АНАЛАЙЗЕР*/
  analyser = context.createAnalyser();

  /*СОЗДАЁМ ЗАПРОС ДОСТУПА К МИКРОФОНУ*/
  navigator.mediaDevices.getUserMedia({
    audio: true
  }).then(stream => {
    src = context.createMediaStreamSource(stream);
    src.connect(analyser);
    loop();
  }).catch(error => {
    alert(error + '\r\n\ Отклонено. Страница будет обновлена!');
    location.reload();
  });
}


function map(value, min1, max1, min2, max2) {
  var returnvalue = ((value - min1) / (max1 - min1) * (max2 - min2)) + min2;
  return returnvalue;
};
function mapSound(_me, _total, _min, _max) {
  if (array.length > 0) {
    // обозначьте значения по умолчанию, если другие не даны
    var min = _min || 0;
    var max = _max || 100;
    //actual new freq
    var new_freq = Math.floor(_me * array.length / _total);
    // обозначьте громкость до хороших значений
    return map(array[new_freq], 0, canvas.height, min, max);
  } else {
    return 0;
  }
}

function loop() {
  window.requestAnimationFrame(loop);
  analyser.getByteFrequencyData(array);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < num; i++) {
    var s = mapSound(i, num, volumeMin, volumeMax);
    ctx.fillStyle = 'white';
    ctx.fillRect(i * frequency, canvas.height / 2 - s / 2, width, s);
  }
}






