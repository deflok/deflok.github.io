

// -include('base/dynamica.js')
// -include('base/mask-phone.js')
// -include('base/password-toggle.js')
// -include('base/tooltips.js')
// -include('base/sliders.js')

// -include('base/show-numbers.js')





// header menu
// let burger = document.querySelector('.header__photo');
// let headerMenu = document.querySelector('.header__profile');

// burger.addEventListener('click', (e) => {
//   headerMenu.classList.toggle('_show');
//   document.querySelector('body').classList.toggle('_scroll-lock');
// });

// headerMenu.addEventListener('click', (e) => {
//   headerMenu.classList.remove('_show');
//   document.querySelector('body').classList.remove('_scroll-lock');
// });

document.querySelectorAll('.js-dropdown').forEach((select) => {

  const dropDownCurrent = select.querySelector('.dropdown__current span');
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


// header menu
let burger = document.querySelector('.burger-btn');
let headerMenu = document.querySelector('.header__menu');

burger.addEventListener('click', (e) => {
  burger.classList.toggle('_active');
  headerMenu.classList.toggle('_show');
  document.querySelector('body').classList.toggle('_scroll-lock');
});

headerMenu.addEventListener('click', (e) => {
  burger.classList.remove('_active');
  headerMenu.classList.remove('_show');
  document.querySelector('body').classList.remove('_scroll-lock');
});




function showTabs (tabs){
  document.querySelectorAll(tabs).forEach(singleTabs => {
    singleTabs.querySelectorAll('.tabs__nav-link').forEach(tabLink => {
      tabLink.addEventListener('click', function (e) {
        e.preventDefault();
        const tabId = e.target.closest('.tabs__nav-link').getAttribute('href').replace('#', '');
        singleTabs.querySelectorAll('.tabs__nav-link').forEach(child => {
          child.classList.remove('_active');
        });
        singleTabs.querySelectorAll('.tabs__content-inner').forEach(child => {
          child.classList.remove('_show');
        });
        tabLink.classList.add('_active');
        singleTabs.querySelector("#" + tabId).classList.toggle('_show');
      })
    });
  });
}

showTabs('.tabs'); //



function showAccordion(accordion) {
  document.querySelectorAll(accordion).forEach(singleAccordion => {
    const accordionItems = singleAccordion.querySelectorAll('.accordion__item');
    if (accordionItems.length > 0) {
      accordionItems.forEach((item) => {
        const accordionHeader = item.querySelector('.accordion__row')

        accordionHeader.addEventListener('click', () => {

          const openItem = singleAccordion.querySelector('.accordion-open')

          toggleItem(item)

          if (openItem && openItem !== item) {
            toggleItem(openItem)
          }
        })
      })
    }
    const toggleItem = (item) => {
      const accordionContent = item.querySelector('.accordion__content')
      if (item.classList.contains('accordion-open')) {
        accordionContent.removeAttribute('style')
        item.classList.remove('accordion-open')
      } else {
        accordionContent.style.height = accordionContent.scrollHeight + 'px'
        item.classList.add('accordion-open')
      }
    }
  });
}


showAccordion('.accordion');







const pages = new Swiper('.swiper', {
  direction: 'vertical',
  // effect: 'coverflow',
  // effect: 'cube',
  // speed: 1500,
  // parallax: true,
  // fadeEffect: {
  //   crossFade: true
  // },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
    // type: 'fraction'
    
  },
  mousewheel: true,
  // allowTouchMove: false,
  on: {
    init: function (el) {
      if(el.slides.length > 1 && el.slides.length < 5){
        document.querySelector('.swiper-pagination').classList.add('max-content');
      }
    },
    activeIndexChange: function (el){
      document.querySelector('.swiper-number').innerHTML = '0' + (el.activeIndex + 1);
    }
  },
  // on: {
  //   slideChange: function (){
  //     menuItems.forEach(el=> {el.classList.remove('_active');});
  //     menuItems[pages.realIndex].classList.add('_active');
  //   }
  // }
});








var bubblyButtons = document.getElementsByClassName("btn");
for (var i = 0; i < bubblyButtons.length; i++) {
  bubblyButtons[i].addEventListener('click', (e) => {
    e.preventDefault;
    e.target.classList.remove('animate');
    e.target.classList.add('animate');
    setTimeout(function(){
      e.target.classList.remove('animate');
    }, 700);

  });
}

