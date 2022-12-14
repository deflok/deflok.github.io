// -include('isWebp/isWebp.js')
let scheduledAnimationFrame
let header = document.querySelector('.header')

// читаем и обновляем страницу
function readAndUpdatePage() {
  scheduledAnimationFrame = false
}

function onScroll() {
  // сохраняем значение прокрутки для будущего использования
  const lastScrollY = window.scrollY
  // предотвращаем множественный вызов колбека, переданного `rAF`
  if (scheduledAnimationFrame) {
    return
  }

  if (lastScrollY > 10) {
    header.classList.add('_sticky')
  } else {
    header.classList.remove('_sticky')
  }

  scheduledAnimationFrame = true
  window.requestAnimationFrame(readAndUpdatePage)
}

window.addEventListener('scroll', onScroll)



document.querySelector('.header__theme').addEventListener('input', (e)=> {
  document.body.classList.toggle('_theme-dark');
});

// -include('burger/burger.js')
// -include('accordion/accordion.js')
let modal_links = document.querySelectorAll('[data-modal-link]');
let modal_btn_close = document.querySelectorAll('[data-modal-close]');
let lock_padding = document.querySelectorAll('._lock-padding');
let body = document.querySelector('body');
let modal_unlock = true;
let modal_timeout = 800;

function modal_open(modal_curent) {
  if (modal_curent && modal_unlock) {
    let modal_active = document.querySelector('.modal._active');
    if (modal_active) {
      modal_close(modal_active, false);
    } else {
      body_lock();
    }
    modal_curent.classList.add('_active');
    modal_curent.addEventListener('click', (e) => {
      if (!e.target.closest('.modal__dialog')) {
        modal_close(e.target.closest('.modal'));
      }
    });
  }
}

function modal_close(modal_active, do_un_lock = true) {
  if (modal_unlock) {
    modal_active.classList.remove('_active');
    if (do_un_lock) {
      body_un_lock();
    }
  }
}

function body_lock() {
  let lock_padding_value = window.innerWidth - document.querySelector('.page').offsetWidth + 'px';

  if (lock_padding.length > 0) {
    lock_padding.forEach(el => {
      el.style.paddingRight = lock_padding_value;
    });
  }

  body.style.paddingRight = lock_padding_value;
  body.classList.add('_scroll-lock');

  modal_unlock = false;
  setTimeout(() => {
    modal_unlock = true;
  }, modal_timeout);
}

function body_un_lock() {
  setTimeout(() => {
    if (lock_padding.length > 0) {
      lock_padding.forEach(el => {
        el.style.paddingRight = "0px";
      });
    }

    body.style.paddingRight = "0px";
    body.classList.remove('_scroll-lock');
  }, modal_timeout);

  modal_unlock = false;
  setTimeout(() => {
    modal_unlock = true;
  }, modal_timeout);
}


if (modal_links.length > 0) {
  modal_links.forEach((item) => {
    item.addEventListener('click', (e) => {

      let modal_name = e.target.closest('[data-modal-link]').getAttribute('data-modal-link');
      let modal_curent = document.querySelector("#" + modal_name);
      modal_open(modal_curent);
      e.preventDefault();
    });
  });

  modal_btn_close.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      modal_close(btn.closest('.modal'));
      e.preventDefault();
    });
  });
}





// setTimeout((e) => {
//   modal_open(document.querySelector('#gift'));
// }, 3000);




document.querySelectorAll('.js-dropdown').forEach((select) => {

  const dropDownCurrent = select.querySelector('.dropdown__current');
  const dropDownList = select.querySelector('.dropdown__list');
  const dropDownItem = dropDownList.querySelectorAll('.dropdown__list-item');


  dropDownCurrent.addEventListener('click', () => {
    dropDownCurrent.classList.toggle('_active');
    dropDownList.classList.toggle('_active');
    select.classList.toggle('_active');
  });

  dropDownItem.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      dropDownCurrent.focus();
      dropDownCurrent.classList.add('_selected');

      if (!select.classList.contains('_multiply')){
        dropDownCurrent.innerText = item.querySelector('span').innerText;
        dropDownList.classList.remove('_active');
        dropDownCurrent.classList.remove('_active');
        select.classList.remove('_active');
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (e.target !== dropDownCurrent) {
      dropDownList.classList.remove('_active');
      dropDownCurrent.classList.remove('_active');
      select.classList.remove('_active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' || e.key === 'Escape') {
      dropDownList.classList.remove('active');
      dropDownCurrent.classList.remove('active');
      select.classList.remove('_active');
    }
  });
});


if (document.querySelectorAll('.tabs__nav-link').length > 0) {
  document.querySelectorAll('.tabs__nav-link').forEach(item => {
    item.addEventListener('click', function (e) {

      e.preventDefault();
      const id = e.target.closest('.tabs__nav-link').getAttribute('href').replace('#', '');
      document.querySelectorAll('.tabs__nav-link').forEach(child => {
        child.classList.remove('_active');
      });
      document.querySelectorAll('.tabs__content-item').forEach(child => {
        child.classList.remove('_active');
      });
      item.classList.add('_active');
      document.getElementById(id).classList.toggle('_active');
    })
  });
}


if (document.querySelectorAll('.file-input input').length > 0) {
  document.querySelectorAll('.file-input input').forEach(fileInput => {
    fileInput.addEventListener('change', (e) => {
      // обходит файлы используя цикл
      let files = fileInput.files;
      for (var i = 0; i < files.length; i++) {
        fileInput.parentNode.parentNode.querySelector('.file-list').innerHTML = `<div class="file-item"><span class="file-name">${files[i].name}</span><span class="file-remove"><img src="img/icons/icon-remove.svg" alt=""></span></div>`;
      }
      fileInput.parentNode.parentNode.querySelectorAll('.file-remove').forEach(c => {
        c.addEventListener('click', (e) => {
          fileInput.value = "";
          fileInput.parentNode.parentNode.querySelector('.file-list').innerHTML = "<span class='not-file'>Файл не выбран</span>";
        });
      }); 
      
      
    });
  });
}



// output images
if (document.querySelectorAll('.output-image').length > 0) {
  function handleFileSelect(evt) {
    var file = evt.target.files; // FileList object
    var f = file[0];
    // Only process image files.
    if (!f.type.match('image.*')) {
        alert("Image only please....");
    }
    var reader = new FileReader();
    // Closure to capture the file information.
    reader.onload = (function(theFile) {
        return function(e) {
            // Render thumbnail.
            evt.target.closest('.file-image-wrp').querySelector('.output-image').innerHTML = ['<img class="thumb" title="', escape(theFile.name), '" src="', e.target.result, '" />'].join('');
        };
    })(f);
    // Read in the image file as a data URL.
    reader.readAsDataURL(f);
  }
  document.querySelectorAll('.input-image').forEach(el => {
    el.addEventListener('change', handleFileSelect, false);
    el.closest('.file-image-wrp').querySelector('.input-image-remove').addEventListener('click', (btn) => {
      el.closest('.file-image-wrp').querySelector('.output-image').innerHTML ='';
    })
  });
}

// -include('component/component.js')



// -include('dynamica.js')


document.addEventListener("DOMContentLoaded", (e) => {

  if (document.querySelector('.intro__slider')) {
    const introSlider = new Swiper('.intro__slider', {
      spaceBetween: 0,
      slidesPerView: 1.4,
      freeMode: true,
     
      // autoplay: {
      //   // пауза между прокруткой
      //   delay: 1000,
      //   // закончить на последнем слайде
      //   disabledOnInteraction: false,
      //   // отключить после ручного переключения
      //   stopOnLastSlide: true,
      // },


      // autoHeight: true,
      breakpoints: {
        320: {
          
        },
        767: {
          
        },
        1240: {
          
        },
        1680: {
          
        },
      }
    });
  }


  if (document.querySelector('.work-done__slider')) {
    const workDoneSlider = new Swiper('.work-done__slider', {
      spaceBetween: 30,
      slidesPerView: 3,
      freeMode: false,
      centeredSlides: true,

      navigation: {
        nextEl: '.work-done__slider-btn._next',
        prevEl: '.work-done__slider-btn._prev',
      },

      breakpoints: {
        320: {
          spaceBetween: 20,
          slidesPerView: 1.2,
          freeMode: true,
          centeredSlides: false,
        },
        767: {
          freeMode: false,
          centeredSlides: true,
          slidesPerView: 3,
        },
        1240: {

        },
        1680: {
          spaceBetween: 30,
        }
      }
    });
  }




  if (document.querySelector('.about-intro__slider')) {
    const aboutIntroSlider = new Swiper('.about-intro__slider', {
      spaceBetween: 30,
      slidesPerView: 3,
      // freeMode: false,
      autoplay: {
        delay: 3000,
        disableOnInteraction: true,
      },
      direction: 'horizontal',

      navigation: {
        nextEl: '.about-intro__slider-btn._next',
        prevEl: '.about-intro__slider-btn._prev',
      },

      breakpoints: {
        320: {
          spaceBetween: 0,
          direction: 'horizontal',
          slidesPerView: 1.5,
        },
        767: {
          spaceBetween: 10,
          direction: 'vertical',
          slidesPerView: 2,
        },
        1240: {
          spaceBetween: 20,
          direction: 'horizontal',
          slidesPerView: 3,
        },
        1681: {
          spaceBetween: 30,
          direction: 'horizontal',
          slidesPerView: 3,
        }
      }
    });
  }
  if (document.querySelector('.about-rating__body')) {
    const ratingSlider = new Swiper('.about-rating__body', {
      spaceBetween: 60,
      slidesPerView: 1,
      freeMode: true,

      // mousewheel: {
      //   sensitivity: 1,
      //   eventTarget: ".about-partners__body",
      // },

      // autoplay: {
      //   delay: 3000,
      //   disableOnInteraction: true,
      // },

      breakpoints: {
        320: {
          
        },
        767: {
         
        },
        1240: {

        },
        1680: {
          
        }
      }
    });
  }
  
  if (document.querySelector('.about-technology__body')) {
    const technologySlider = new Swiper('.about-technology__body', {
      spaceBetween: 30,
      slidesPerView: 1,
      freeMode: true,

      // mousewheel: {
      //   sensitivity: 1,
      //   eventTarget: ".about-partners__body",
      // },

      // autoplay: {
      //   delay: 3000,
      //   disableOnInteraction: true,
      // },

      breakpoints: {
        320: {
          spaceBetween: 12,
          slidesPerView: 0.45,
        },
        767: {
          spaceBetween: 12,
          slidesPerView: 1,
        },
        1240: {
          spaceBetween: 20,
          slidesPerView: 1,
        },
        1681: {
          spaceBetween: 30,
          slidesPerView: 1,
        }
      }
    });
  }

  if (document.querySelector('.about-team__slider')) {
    const teamSlider = new Swiper('.about-team__slider', {
      spaceBetween: 10,
      slidesPerView: 5,
      // freeMode: false,
      centeredSlides: true,
      initialSlide: 2,
      autoplay: {
        delay: 4000,
        disableOnInteraction: true,
      },

      navigation: {
        nextEl: '.about-team__slider-btn._next',
        prevEl: '.about-team__slider-btn._prev',
      },

      breakpoints: {
        320: {
          spaceBetween: 5,
          slidesPerView: 3,
        },
        767: {
          spaceBetween: 6,
          slidesPerView: 5,
        },
        1240: {
          spaceBetween: 10,
          slidesPerView: 5,
        },
        1681: {
          spaceBetween: 10,
          slidesPerView: 5,
        }
      }
    });
  }
  if (document.querySelector('.about-gratitude__slider')) {
    const teamSlider = new Swiper('.about-gratitude__slider', {
      spaceBetween: 10,
      slidesPerView: 5,
      // freeMode: false,
      centeredSlides: true,
      initialSlide: 2,

      navigation: {
        nextEl: '.about-gratitude__slider-btn._next',
        prevEl: '.about-gratitude__slider-btn._prev',
      },

      breakpoints: {
        320: {
          spaceBetween: 5,
          slidesPerView: 3,
        },
        767: {
          spaceBetween: 6,
          slidesPerView: 5,
        },
        1240: {
          spaceBetween: 10,
          slidesPerView: 5,
        },
        1681: {
          spaceBetween: 10,
          slidesPerView: 5,
        }
      }
    });
  }
  if (document.querySelector('.about-partners__body')) {
    const partnersSlider = new Swiper('.about-partners__body', {
      spaceBetween: 0,
      slidesPerView: 10,
      freeMode: true,

      // mousewheel: {
      //   sensitivity: 1,
      //   eventTarget: ".about-partners__body",
      // },

      // autoplay: {
      //   delay: 3000,
      //   disableOnInteraction: true,
      // },

      breakpoints: {
        320: {
          slidesPerView: 6,
        },
        767: {
          slidesPerView: 10,
        },
        1240: {
          slidesPerView: 10,
        },
        1681: {
          slidesPerView: 10,
        }
      }
    });
  }

  


  

});


// const smoothLinks = document.querySelectorAll('a[href^="#"]');
// for (let smoothLink of smoothLinks) {
//     smoothLink.addEventListener('click', function (e) {
//         e.preventDefault();
//         const id = smoothLink.getAttribute('href');

//         document.querySelector(id).scrollIntoView({
//             behavior: 'smooth',
//             block: 'start'
//         });
//     });
// };


// // переключатель
// if (document.querySelectorAll('.toggle-state')) {
//   document.querySelectorAll('.toggle-state').forEach((btn) => {
//     btn.addEventListener('click', (e) => {
//       e.preventDefault();
//       btn.classList.toggle('_active');
//     });
//   });
// }



// это отвечает за переключение классов
// let serviceBtns = document.querySelectorAll('.service-nav__link');
// function activeClass (btns){
//   btns.forEach(btn => {
//     btn.addEventListener('click', (e) => {
//       e.preventDefault();
//       btns.forEach(btn => {btn.classList.remove('_active')});
//       btn.classList.add('_active');
//     });
//   });
// }

// activeClass(serviceBtns);



//запуск видео
document.querySelectorAll('.js-video').forEach((video) => {
  video.addEventListener('click', (e) => {
    video.classList.toggle('_playing');

    if (video.querySelector('video')) {
      let media = video.querySelector('video');
      if (media.paused) {
        media.play();
      } else {
        media.pause();
      }
      media.addEventListener('ended', () => {
        video.classList.remove('_playing');
      });
    }

  });
});







if (document.querySelectorAll('.intro__nav-link').length > 0){
  document.querySelectorAll('.intro__nav-link').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.intro__col').forEach(el => {el.classList.add('_active');});
    });
  });
  
  document.querySelector('.intro__tab-close').addEventListener('click', (e) => {
    document.querySelectorAll('.intro__col').forEach(el => {el.classList.remove('_active');});
  });
}




document.addEventListener("DOMContentLoaded", function () {
  var phoneInputs = document.querySelectorAll('input[data-tel-input]');

  var getInputNumbersValue = function (input) {
      // Return stripped input value — just numbers
      return input.value.replace(/\D/g, '');
  }

  var onPhonePaste = function (e) {
      var input = e.target,
          inputNumbersValue = getInputNumbersValue(input);
      var pasted = e.clipboardData || window.clipboardData;
      if (pasted) {
          var pastedText = pasted.getData('Text');
          if (/\D/g.test(pastedText)) {
              // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
              // formatting will be in onPhoneInput handler
              input.value = inputNumbersValue;
              return;
          }
      }
  }

  var onPhoneInput = function (e) {
      var input = e.target,
          inputNumbersValue = getInputNumbersValue(input),
          selectionStart = input.selectionStart,
          formattedInputValue = "";

      if (!inputNumbersValue) {
          return input.value = "";
      }

      if (input.value.length != selectionStart) {
          // Editing in the middle of input, not last symbol
          if (e.data && /\D/g.test(e.data)) {
              // Attempt to input non-numeric symbol
              input.value = inputNumbersValue;
          }
          return;
      }

      if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
          if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
          var firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
          formattedInputValue = input.value = firstSymbols + " ";
          if (inputNumbersValue.length > 1) {
              formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
          }
          if (inputNumbersValue.length >= 5) {
              formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
          }
          if (inputNumbersValue.length >= 8) {
              formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
          }
          if (inputNumbersValue.length >= 10) {
              formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
          }
      } else {
          formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
      }
      input.value = formattedInputValue;
  }
  var onPhoneKeyDown = function (e) {
      // Clear input after remove last symbol
      var inputValue = e.target.value.replace(/\D/g, '');
      if (e.keyCode == 8 && inputValue.length == 1) {
          e.target.value = "";
      }
  }
  for (var phoneInput of phoneInputs) {
      phoneInput.addEventListener('keydown', onPhoneKeyDown);
      phoneInput.addEventListener('input', onPhoneInput, false);
      phoneInput.addEventListener('paste', onPhonePaste, false);
  }
})

if(window.matchMedia('(max-width: 991px)').matches && document.querySelectorAll('.password-toggle').length > 0){
  var bool = true;
  document.querySelectorAll('.password-toggle').forEach((item) => {
      item.addEventListener('click',(e) => {
          if (bool){
              bool = false;
              item.parentNode.querySelector('input').setAttribute('type', 'text');
              item.classList.add('_hide');
              
          } else {
              bool = true;
              item.parentNode.querySelector('input').setAttribute('type', 'password');
              item.classList.remove('_hide');
          }
      });
  });
}




if (document.querySelectorAll('.password-toggle').length > 0){
  document.querySelectorAll('.password-toggle').forEach((item) => {
    item.addEventListener('mouseover',(e) => {
            item.parentNode.querySelector('input').setAttribute('type', 'text');
            item.classList.add('_hide');
    });
  });
  document.querySelectorAll('.password-toggle').forEach((item) => {
    item.addEventListener('mouseout',(e) => {
        item.classList.remove('_hide');
        item.parentNode.querySelector('input').setAttribute('type', 'password');
    });
  });
}




// if (document.querySelector('.quantity-input')){
//   const quantityBtns = document.querySelectorAll('.quantity-button');

//   quantityBtns.forEach(btn => {
//       btn.addEventListener('click', ()=> {
//           const quantityDirection = btn.dataset.direction;
//           const quantityInput = btn.parentElement.querySelector('.quantity-input');
//           const currentValue = +quantityInput.value;
//           let newValue;

//           if (quantityDirection === 'plus'){
//               newValue = currentValue + 1;
//           } else {
//               newValue = currentValue - 1 > 0 ? currentValue - 1 : 1;
//           }

//           quantityInput.value = newValue;
//       });
//   });
// }

// -include('tooltips.js')