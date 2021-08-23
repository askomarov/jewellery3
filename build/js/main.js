const body = document.body;

const getScrollWidth = () => {
  let div = document.createElement('div');
  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';
  document.body.append(div);
  let scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();
  return scrollWidth;
};

const lockBody = (lockPad) => {
  let paddingValue = `${lockPad}px`;
  body.classList.add('lock');
  body.style.paddingRight = `${paddingValue}`;
};

const unlockBody = () => {
  body.classList.remove('lock');
  body.style.paddingRight = '';
};

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

const initSwiperSlider = () => {
  const slider = document.querySelector('.slider');
  if (slider) {
    slider.classList.remove('slider--no-js');

    const swiper = new Swiper('.swiper-slider', {
      slidesPerView: 2,
      spaceBetween: 30,
      slidesPerGroup: 2,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'fraction',
        renderFraction: function (currentClass, totalClass) {
          return `<span class="${currentClass}"></span>of
                  <span class="${totalClass}"></span>`;
        },
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            renderBullet: function (index, className) {
              return `<span class="${className}">${index + 1}</span>`;
            },
          },
        },
        1024: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            renderBullet: function (index, className) {
              return `<span class="${className}">${index + 1}</span>`;
            },
          },
        },
        1200: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            renderBullet: function (index, className) {
              return `<span class="${className}">${index + 1}</span>`;
            },
          },
        },
      },
    });
  }
};

const mobileProductPreviewSlider = () => {
  let productSliderNoJs = document.querySelector('.card__list-preview--no-js ');
  let previewSliderSwiper = document.querySelector('.swiper-preview__list');
  if (productSliderNoJs && previewSliderSwiper) {
    previewSliderSwiper.querySelectorAll('li').forEach(li => {
      li.classList.add('swiper-slide');
    });

    productSliderNoJs.classList.remove('card__list-preview--no-js');

    const swiperPreview = new Swiper('.swiper-preview', {
      slidesPerView: 1,
      spaceBetween: 30,
      // slidesPerGroup: 1,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'fraction',
        renderFraction: function (currentClass, totalClass) {
          return `<span class="${currentClass}"></span> of
                    <span class="${totalClass}"></span>`;
        },
      },
    });
  }
};


const initAccordion = () => {
  const accordion = document.querySelector('.accordion');
  if (accordion) {

    const togglerClass = 'accordion__toggler';
    const itemClass = 'accordion__item';
    const itemClosedClass = 'accordion__item--opened';

    function closeAccordionItems() {
      accordion
        .querySelectorAll(`.${itemClass}`)
        .forEach((element, index) => {
          if (index !== 0) {
            element.classList.remove(itemClosedClass);
          }
        });
    }

    closeAccordionItems();

    accordion.addEventListener('click', (event) => {
      const toggler = event.target.closest(`.${togglerClass}`);

      if (toggler) {
        const item = toggler.closest(`.${itemClass}`);
        const isOpened = item.classList.contains(itemClosedClass);

        isOpened
          ? item.classList.remove(itemClosedClass)
          : item.classList.add(itemClosedClass);
      }

    })
  };
}

const initHeaderMenu = () => {
  const pageHeader = document.querySelector('.header');
  const headerToggle = document.querySelector('.header__menu-button');

  if (pageHeader) {
    pageHeader.classList.add('header--js');
  }

  headerToggle.addEventListener('click', () => {

    const isOpened = pageHeader.classList.contains('header--js-open');
    const isClosed = pageHeader.classList.contains('header--js');

    if (isOpened && !isClosed) {
      pageHeader.classList.add('header--js');
      pageHeader.classList.remove('header--js-open');
    } else {
      pageHeader.classList.remove('header--js');
      pageHeader.classList.add('header--js-open');
    }
  });

};

const initOpenFilterMemu = () => {
  const filter = document.querySelector('.filter');
  if (filter) {
    const filterToggle = filter.querySelector('.filter__button--tablet');
    const buttonFilterClose = filter.querySelector('.filter__button-close');

    filterToggle.addEventListener('click', () => {
      filter.classList.add('filter--open');
      document.querySelector('body').style.overflow = 'hidden';
    });

    buttonFilterClose.addEventListener('click', () => {
      filter.classList.remove('filter--open');
      document.querySelector('body').style.overflow = '';
    });
  }
};

const initModalLogin = () => {
  const modalLogin = document.querySelector('.modal-login');
  const buttonsOpenModalLogin = document.querySelectorAll('.header__login');

  if (buttonsOpenModalLogin && modalLogin) {
    modalLogin.classList.remove('modal--no-js');
    const inputEmail = modalLogin.querySelector('#email-modal');
    const modalLoginForm = modalLogin.querySelector('.modal-login__form');

    const closeModal = () => {
      modalLogin.setAttribute('aria-hidden', 'true');
      unlockBody();
      modalLoginForm.reset();
      document.removeEventListener('keydown', onEscKeydownCloseModal);
      document.removeEventListener('click', onClickAwayCloseModal);
    };

    const onBtnCloseModal = (btnClose) => {
      btnClose.addEventListener('click', closeModal)
    };

    const onEscKeydownCloseModal = (evt) => {
      if (isEscEvent(evt)) {
        evt.preventDefault();
        closeModal();
      }
    };

    const onClickAwayCloseModal = (evt) => {
      if (!evt.target.closest('.modal-login__wrapper')) {
        closeModal();
      }
    };

    const addListenerOnOpenModal = () => {
      setTimeout(() => {
        document.addEventListener('click', onClickAwayCloseModal);
        document.addEventListener('keydown', onEscKeydownCloseModal);
      }, 200);
    };

    const openModal = () => {
      modalLogin.setAttribute('aria-hidden', 'false');
      let bodyLockPadding = getScrollWidth();
      lockBody(bodyLockPadding);
      inputEmail.focus();

      const btnClose = modalLogin.querySelector('.modal__button-close');
      onBtnCloseModal(btnClose);
      addListenerOnOpenModal();
    };

    const onSubmitModalLoginSendData = () => {
      modalLoginForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
        localStorage.setItem('modal-tel', inputTelModalForm.value);
        localStorage.setItem('modal-mail', inputNameModalForm.value);
        onSuccessSubmit();
      }, { once: true });
    };

    const onBtnShowModal = (btn) => {
      btn.addEventListener('click', (evt) => {
        evt.preventDefault();
        openModal();
        onSubmitModalLoginSendData();
      });
    };

    buttonsOpenModalLogin.forEach(btn => {
      onBtnShowModal(btn);
    });
  }
};

const initModalCard = () => {
  const modalCard = document.querySelector('.modal-card');
  const buttonOpenModalCard = document.querySelector('.card__add');
  if (buttonOpenModalCard && modalCard) {
    modalCard.classList.remove('modal--no-js');

    const closeModal = () => {
      modalCard.setAttribute('aria-hidden', 'true');
      unlockBody();
      document.removeEventListener('keydown', onEscKeydownCloseModal);
      document.removeEventListener('click', onClickAwayCloseModal);
    };

    const onBtnCloseModal = (btnClose) => {
      btnClose.addEventListener('click', closeModal)
    };

    const onEscKeydownCloseModal = (evt) => {
      if (isEscEvent(evt)) {
        evt.preventDefault();
        closeModal();
      }
    };

    const onClickAwayCloseModal = (evt) => {
      if (!evt.target.closest('.modal-login__wrapper')) {
        closeModal();
      }
    };

    const addListenerOnOpenModal = () => {
      setTimeout(() => {
        document.addEventListener('click', onClickAwayCloseModal);
        document.addEventListener('keydown', onEscKeydownCloseModal);
      }, 200);
    };

    const openModal = () => {
      modalCard.setAttribute('aria-hidden', 'false');
      let bodyLockPadding = getScrollWidth();
      lockBody(bodyLockPadding);

      const btnClose = modalCard.querySelector('.modal__button-close');
      onBtnCloseModal(btnClose);
      addListenerOnOpenModal();
    };

    const onBtnShowModal = (btn) => {
      btn.addEventListener('click', (evt) => {
        evt.preventDefault();
        openModal();
      });
    };

    onBtnShowModal(buttonOpenModalCard);
  }
};

document.addEventListener('DOMContentLoaded', () => {

  initHeaderMenu();

  initSwiperSlider();

  initOpenFilterMemu();

  initModalCard();

  initModalLogin();

  initAccordion();

  if (window.matchMedia("(min-width: 768px)").matches) {
    /* the viewport is at least 768 pixels wide */
    console.log('destroy');

    swiperPreview.destroy(true, true);
  } else {
    /* the viewport is less than 768 pixels wide */
    console.log('turn on');

    mobileProductPreviewSlider();
  }
});
