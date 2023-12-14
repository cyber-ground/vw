'use strict';
import {console_color,console_red,console_orange,console_yellow,console_green,
  console_blue,console_purple,console_magenta,console_cyan} from './logColor.js';

// ------------------------------------------------------------------------------------------
//*                               ----- VRTL WRLD -----
// ------------------------------------------------------------------------------------------

  const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time/3);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    lenis.stop();
    window.addEventListener('wheel', disableWheel, {passive:false});
    
  // lenis.on('scroll', (e) => { console.log(e) });
//* TweenLite circle event ----------------------------------------

  const circle = document.querySelector('.circle');
  // gsap.registerPlugin(CSSRulePlugin);
  // gsap.to( CSSRulePlugin.getRule(".circle"), {duration: 3, cssRule: {backgroundColor: "#0af"}});

  TweenLite.set(circle, { xPercent: -50, yPercent: -50 });
  window.addEventListener('mousemove', (e) => {
    TweenLite.to(circle, 0.1, {
      x: e.clientX,
      y: e.clientY,
    });
  });

//* Create alphabet character ------------------------------------------

  // let char, results;
  // function randomAlphabet() {
  //   do { char = Math.random().toString(36).slice(2, 3);
  //     results = parseFloat(char);
  //   } while(String(results) !== 'NaN') {
  //     return char.toUpperCase();
  //   }
  // } 
  // //* Create whole alphabet character
  // const alphabets = [];
  // function createAlphabet() {
  //   for (let i = 0; i < 1e2*5; i++) {
  //     if(alphabets.length === 26) return;
  //     const char = randomAlphabet();
  //     if(!alphabets.includes(char)) {
  //       alphabets.push(char);
  //     }
  //   }
  // } createAlphabet();
  // alphabets.sort();

  const alphabets = 'ABCDEFGHIJKLMNOPQUSTUVWXYZ';

//* front content set height method ------------------------------

  const frontContent = document.querySelector('.front-content');
    const frontContentHgt = frontContent.clientHeight;
  const docElem = document.documentElement;
    docElem.style.setProperty('--h', `${frontContentHgt}px`);

//* create square grid  -----------------
  
    const matchedNumForGrid = 144; //* 12*12
    const spareGrid = document.querySelector('.square-grid');
    function createSquareGrid() {
      for (let i = 0; i < matchedNumForGrid; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        spareGrid.appendChild(square);
      }
    } createSquareGrid(); //*>
    const squares = document.querySelectorAll('.square'); //*>

//* create hero block grid & block grid events -----------------

  const heroImageContainer = document.querySelector('.hero-image-container');
  const heroBlockGrid = heroImageContainer.querySelector('.hero-block-grid');
  const heroImage = heroImageContainer.querySelector('.hero-image');

  function createHeroBlocksGrid() {
    for (let i = 0; i < matchedNumForGrid; i++) { 
      const block = document.createElement('div');
      block.classList.add('block');
      heroBlockGrid.appendChild(block);
    }
  } createHeroBlocksGrid(); //*>
  const heroBlocks = heroBlockGrid.querySelectorAll('.block'); //*>

  heroBlocks.forEach(block => { 
    block.addEventListener('mouseenter', () => {
      block.style.backgroundColor = 'rgba(255, 255, 200, 0.4)';
    });
    block.addEventListener('transitionend', () => {
      block.style.backgroundColor = 'transparent';
    });
  });
  
  heroBlockGrid.addEventListener('mouseenter', () => {
    circle.style.zIndex = 10;
  });
  heroBlockGrid.addEventListener('mouseleave', () => {
    circle.style.zIndex = 3000;
  });


//* hero section method ----------------------------------------------------
  
    const heroTop = document.querySelector('.hero-top');
    const heroHeadline = heroTop.querySelector('.hero-headline');
    const textWrappers = heroHeadline.querySelectorAll('.text-wrapper');
    const nth5 = heroHeadline.querySelector('.nth5');
    const nth6 = heroHeadline.querySelector('.nth6');
    const heroMargin = 95+65+120;

//* positioning for hero headline text -----------------------------

  function heroHeadlineSetPos() {
    nth6.style.width = 'initial';
    nth6.style.marginLeft = innerWidth/12 + 'px';
    nth5.style.marginLeft = innerWidth/3.82 + 'px';
    if(innerWidth < 991) {
      nth6.style.width = innerWidth/1.8 + 'px';
      nth6.style.marginLeft = innerWidth/14 + 'px';
      nth5.style.marginLeft = innerWidth/5.7 + 'px';
    }
    if(innerWidth < 716) {
      nth6.style.width = innerWidth/2 + 'px';
      nth6.style.marginLeft = innerWidth/19 + 'px';
    }
  } heroHeadlineSetPos();

//* create hero bottom trf text columns -------------------------------------

  const heroBottom = document.querySelector('.hero-bottom');
  const heroTrfText = heroBottom.querySelector('.hero-trf-text'); 
    createRowsColumns(heroTrfText); //*>
  const heroTrfTextColumns = heroTrfText.querySelectorAll('.column');  

  heroTrfTextColumns.forEach((column, index) => { //* hero trf text init
    if(index < 12) {column.classList.add('colored')}
  });

//* learn wrappers text learn method & events ------------------------------

  const learnWrappers = document.querySelectorAll('.learn-wrapper');
  const textLearns = document.querySelectorAll('.text-learn');

  textLearns.forEach((textLearn, index) => {
    createColumns_dataset(textLearn); //*>
    const textLearnColumns = textLearn.querySelectorAll('.column'); 
    learnWrappers.forEach((learnWrapper, i) => {
      learnWrapper.addEventListener('mouseenter', () => {
        textRotation(textLearnColumns, alphabets, 1, -5, 30);
        if(i === 0) {gsap.to(circle,{scale:2, duration:.3})}
        else {gsap.to(circle,{scale:.5, duration:.3})}
      });
      learnWrapper.addEventListener('mouseleave', () => {
        if(index <= 1) {textRotationBackwards(textLearnColumns, alphabets, 2, 30)}
        else {textRotationBackwards(textLearnColumns, alphabets, 1, 30)}
        learnWrapper.classList.add('mouseLeave');
        gsap.to(circle,{scale:1, duration:.3});
        setTimeout(() => {
          learnWrapper.classList.remove('mouseLeave');
        }, 700);
      });
      learnWrapper.addEventListener('click', () => {
        location.href = '/';
      });
    });
  });

//* square grid effect & hero headline text rotation ---------------

  setTimeout(() => {
    squares.forEach((square, index) => {
      const randomNum = Math.random();
      square.style.backgroundColor = '#fd5530';
      square.style.transitionDelay = randomNum + 's';
      if(index === squares.length-1) {
        square.style.transitionDelay = 1.2 + 's';
        heroImage.style.transitionDelay = 1 + 's';
        heroImage.style.transform = 'scale(1.8, 1.8)';
      }
      square.addEventListener('transitionend', () => {
        if(index === squares.length-1) {
          squares.forEach((sq) => {
            sq.style.backgroundColor = 'transparent';
            heroImage.style.transform = 'scale(1.12, 1.05)';
          });
        }
      });
    }); 
    setTimeout(() => {
      textWrappers.forEach((wrapper, i) => {
        const columns = wrapper.querySelectorAll('.column');
        columns.forEach(column => {
          column.setAttribute('data-text', column.textContent);
        });
        textRotationPlus(columns, alphabets, 3, 1, 0, 100);
        lenis.start();
        window.removeEventListener('wheel', disableWheel, {passive:false});
        setTimeout(() => { btnHmLock = false }, 1500); //*
        setTimeout(() => {
          if(i === 0 || i === 4) {
            const columns = wrapper.querySelectorAll('.column');
            textRotation(columns, alphabets, 5, 0, 100);
          }
        }, 2000);
      });
    }, 2200);
  }, 0);

//* ----------------------------------------------------------------------------------

  const front = document.querySelector('.front');
  const inside = document.querySelector('.inside');

//* header events & method --------------------------------------------

  let resize = false;
  let btnHmLock = true;
  let resizedVal = undefined;  
  const header = document.querySelector('header');
  const backFaceContainer = document.querySelector('.backface-container');
  const btnHm = header.querySelector('.btn-hm');
  const textHm = header.querySelector('.text-hm');
  const logoTexts = header.querySelectorAll('.logo-text');

//* header btnHm event -------------------------------

  createColumns_dataset(textHm); //*>
  const textHmColumns = textHm.querySelectorAll('.column'); 

  btnHm.addEventListener('mouseenter', () => {
    circle.style.zIndex = 5000;
    gsap.to(circle,{scale:2, duration:.3});
    if(btnHm.classList.contains('active')) {
      textRotation(textHmColumns, alphabets, 4, 0, 30);
    }
  });

  btnHm.addEventListener('mouseleave', () => {
    circle.style.zIndex = 3000;
    gsap.to(circle,{scale:1, duration:.3});
    if(btnHm.classList.contains('active')) {
      textRotationBackwards(textHmColumns, alphabets, 3, 30);
    }
  });

  btnHm.addEventListener('click', () => {
    if(btnHmLock) return;
    btnHmLock = true;
    lenis.stop();
    window.addEventListener('wheel', disableWheel, {passive:false});
    btnHm.classList.toggle('active');
    if(!btnHm.classList.contains('active')) {
      setTimeout(() => {
        lenis.start();
        window.removeEventListener('wheel', disableWheel, {passive:false});
      }, 2200);
    } 
    setTimeout(() => { btnHmLock = false }, 2500); //*****
    squares.forEach((square,index) => {
      const randomNum = Math.random();
        square.style.backgroundColor = '#fd5530';
        square.style.transitionDelay = randomNum + 's';
      if(index === squares.length-1) {
        square.style.transitionDelay = 1.2 + 's';
      }
      square.addEventListener('transitionend', () => {
        if(index === squares.length-1) {
          if(btnHm.classList.contains('active')) {
            header.classList.add('active');
            btnHm.classList.add('active');
            textHm.classList.add('appear');
            multiClassList(logoTexts, 'bright', null);
            document.body.style.backgroundColor = '#1e1e1e';
            front.style.display = 'none';
            inside.style.display = 'block';
          } else {
            header.classList.remove('active');
            btnHm.classList.remove('active');
            textHm.classList.remove('appear');
            multiClassList(logoTexts, null, 'bright');
            document.body.style.backgroundColor = '#f1f1f1';
            inside.style.display = 'none';
            front.style.display = 'block';
            //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
            if(sticky && !activation) {
              blackImageW.style.top = innerHeight/2 - blackImageW.clientHeight/2 + 'px';
              blackImageW.style.left = innerWidth/2 - blackImageW.clientWidth/2 + 'px';
              blackImageW.style.width = innerWidth/5 + 'px';
              blackImageW.style.height = innerHeight/5 + 'px';
            } 
            if(sticky && activation) { 
              blackImageW.style.left = 0 + 'px'; 
              blackImageW.style.top = 0 + 'px';
            }
            // !sticky && !activation blackImageW width & height 250
            if(resize) {
              resizedVal = heroTop.clientHeight+heroBottom.clientHeight+heroMargin;
            }
            //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
          }
          squares.forEach((sq) => {
            sq.style.backgroundColor = 'transparent';
          });
        }
      });
    });
  });

  function multiClassList(elements, add, remove) {
    elements.forEach(elem => {
      elem.classList.add(add);
      elem.classList.remove(remove);
    });
  }

  function disableWheel(e) {
    e.preventDefault();
  }

//* header logoTexts events ------------------------------------------

  logoTexts.forEach(logoText => {
    createColumns_dataset(logoText); //*>
    const logoTextColumns = logoText.querySelectorAll('.column');
    logoText.addEventListener('mouseenter', () => {
      gsap.to(circle,{scale:.5, duration:.3});
      textRotation(logoTextColumns, alphabets, 5, -5, 10);
    });
    logoText.addEventListener('mouseleave', () => {
      gsap.to(circle,{scale:1, duration:.3});
      textRotationBackwards(logoTextColumns, alphabets, 4, 10);
    });
  });

//* black section method ----------------------------------------------------

  const black = document.querySelector('.black');
  const blackImageW = black.querySelector('.black-image-wrapper');
  const blackStcTextW = black.querySelector('.black-stc-text-wrapper');
  const blackStarW = blackStcTextW.querySelector('.star-wrapper');
  const blackStcText = blackStcTextW.querySelector('.black-stc-text');
    blackStcTextW.style.top = innerHeight/7 + 'px'; 
    blackImageW.style.setProperty('--px', 20+'px'); //*
  blackImageW.style.top = innerHeight/2 - blackImageW.clientHeight/2 + 'px'; //* init
  blackImageW.style.left = innerWidth/2 - blackImageW.clientWidth/2 + 'px'; //* init
  
  // let scrollendScrollY = 0; //* currently unused here
  let [val, count, scrollEndVal] = [0,0,0]; 
  let [stickyStartScrollY, stickyEndScrollY] = [[],[]];
  let [sticky, activation, cornerActive] = [false,false,false]; 


//* realms section method create trf text columns -----------------------------

const realms = document.querySelector('.realms'); 
const realmsTrfText = realms.querySelector('.realms-trf-text');
  createRowsColumns(realmsTrfText); //*>
const realmsTrfTextColumns = realmsTrfText.querySelectorAll('.column'); 
const cardTexts = realms.querySelectorAll('.card-text');
const blurContainer = realms.querySelector('.blur-container');
let rotation = false;

//* realms headline text methods create columns -------------------------------

  const realmsHeadline = realms.querySelector('.realms-headline'); 
    createRowsColumns_dataset(realmsHeadline); //*>
  const realmsHeadlineTextColumns = realmsHeadline.querySelectorAll('.column'); 

  realmsHeadlineTextColumns.forEach((column, index) => {
    if(index <= 5) { column.style.fontFamily = 'Gridular' }
    if(index >= 15 && index < 22) { column.style.fontFamily = 'Gridular' }
  });

  const realmsHeadline_Options = { threshold: .5, rootMargin:'0px 0px 0px' };
  const realmsHeadline_Observer = new IntersectionObserver(
    realmsHeadline_Callback, realmsHeadline_Options);

  function realmsHeadline_Callback(entries, obs) {
    if(entries[0].isIntersecting) {
      textRotation(realmsHeadlineTextColumns, alphabets, 1, 8, 60);
      obs.unobserve(entries[0].target);
    }
  }

//* realms stc text methods ----------------------------------------------

  const cardTexts_Options = { threshold: 1, rootMargin:'0px 0px -200px' }
    const cardTexts_Observer = new IntersectionObserver(
      cardTexts_Callback, cardTexts_Options);

    function cardTexts_Callback(entries, obs) {
      entries.forEach(entry => { 
        if(entry.isIntersecting) {
          entry.target.classList.add('animate');
          obs.unobserve(entry.target);
        } 
      });
    }

//* asset section method create trf text columns ------------------------------

  let assetsTrfTextInterSectVal = [];
  const assets = document.querySelector('.assets'); 
  const assetsHeadline = assets.querySelector('.assets-headline');
  const assetsTrfText = assets.querySelector('.assets-trf-text');
    createRowsColumns(assetsTrfText); //*>
  const assetsTrfTextColumns = assetsTrfText.querySelectorAll('.column'); 

//* asset headline text method create columns ----------------

  const assetsHeadlineTexts = assetsHeadline.querySelectorAll('.assets-headline-text');
  assetsHeadlineTexts.forEach((assetsHeadlineText, index) => {
    createRowsColumns_dataset(assetsHeadlineText); 
    if(index === 0) {
      const rows = assetsHeadlineText.querySelectorAll('.row');
      rows.forEach((row, i) => {
        if(i === 0) {
          const columns = row.querySelectorAll('.column');
          columns[1].style.fontFamily = 'Gridular';
        }
        if(i === 1) {
          const columns = row.querySelectorAll('.column');
          columns[2].style.fontFamily = 'Gridular';
        }
      });
    }
    if(index === 1) {
      const rows = assetsHeadlineText.querySelectorAll('.row');
      rows.forEach((row, i) => {
        if(i === 0) {
          const columns = row.querySelectorAll('.column');
          columns[1].style.fontFamily = 'Gridular';
        }
        if(i === 1) {
          const columns = row.querySelectorAll('.column');
          columns[3].style.fontFamily = 'Gridular';
        }
      });
    }
  });

  const assetsHeadline_Options = { threshold: .5, rootMargin:'0px 0px 0px' }
  const assetsHeadline_Observer = new IntersectionObserver(
    assetsHeadline_Callback, assetsHeadline_Options);

  function assetsHeadline_Callback(entries, obs) {
    if(entries[0].isIntersecting) {
      assetsHeadlineTexts.forEach(assetsHeadlineText => {
        const rows = assetsHeadlineText.querySelectorAll('.row');
        rows.forEach(row => {
          const columns = row.querySelectorAll('.column');
          textRotation(columns, alphabets, 3, 0, 120);
        });
      });
      obs.unobserve(entries[0].target);
    }
  }

//* TweenLite assets_kryptoz ----------------------------------------

  function createAssetsKryptoz() {
    for (let i = 0; i < 5; i++) {
      const assetsKryptoz = document.createElement('div'); 
      assetsKryptoz.classList.add('assets-kryptoz');
      assets.appendChild(assetsKryptoz);
    }
  } createAssetsKryptoz();
  const assetsKryptozAll = assets.querySelectorAll('.assets-kryptoz'); //*>

  assetsKryptozAll.forEach((assetsKryptoz, index) => {
    TweenLite.set(assetsKryptoz , { xPercent: -50, yPercent: -50, display:'none' });
    window.addEventListener('mousemove', (e) => {
      TweenLite.to(assetsKryptoz , 0.5+index*0.2, {
        x: e.clientX,
        y: e.clientY,
        zIndex:Math.abs(index-5),
        opacity:Math.abs(index-5)*0.4,
      });
    });
  });

//* pleasures section rotate text method & functions -------------------

  let swapImage = false; 
  let pleasuresInterSectVal = [];
  const pleasures = document.querySelector('.pleasures');
  const swapText = pleasures.querySelector('.swap-text');
  const formerText = swapText.querySelector('.former-text');
  const replaceText = swapText.querySelector('.replace-text');
    swapText.setAttribute('data-former', formerText.textContent);
    swapText.setAttribute('data-replace', replaceText.textContent);
  const formerTxt = swapText.dataset.former;
  const replaceTxt = swapText.dataset.replace;
  const numbers = '160';
  const dummy = '00';

  function setInitialSwapText() {
    swapText.textContent = formerTxt;
    createColumns_dataset_empCol(swapText); //*>
    setReplaceText_dataset(swapText, replaceTxt);
    // console.log(swapText); //* console
  } setInitialSwapText();

  function setReplaceText_dataset(element, replaceTxt) {
    const columns = element.querySelectorAll('.column');
    columns.forEach((column, index) => {
      if(index < replaceTxt.length) { //*
        column.setAttribute('data-replace', replaceTxt[index]);
      }
    });
  } 

  function pleasuresSwapText_replace() {
    const swapTextColumns = swapText.querySelectorAll('.column');
      swapTextColumns.forEach((column, index) => {
        if(index > replaceTxt.length-1) { column.remove() } 
      });
    textRotationReplaceDataset(swapTextColumns, numbers, 1, 35, 20);
  }

  function pleasuresSwapText_former() {
    const dummyIntervalId = setInterval(() => { //* remove col for dummy ---
      const swapTextColumns = swapText.querySelectorAll('.column');
      for (let i = swapTextColumns.length-1; 
        i > (swapTextColumns.length-1)-dummy.length; i--) {
        swapTextColumns[i].remove();
      }
        for (let i = 0; i < dummy.length; i++) { //* set dummy ---
          swapText.innerHTML += `<span class="dummy">${dummy[i]}</span>`;
        }
      const dummyColumns = swapText.querySelectorAll('.dummy');
      dummyColumns.forEach((column, index) => { textRotate_dummy(column, numbers, index) });
    }, 30); 
    setTimeout(() => { //* clear dummy rotate & remove dummy column ---
      clearInterval(dummyIntervalId);
      const dummyColumns = swapText.querySelectorAll('.dummy');
      dummyColumns.forEach(column => { column.remove() });
      setTimeout(() => { //* reset columns & dataset to former 
        setInitialSwapText();
        const swapTextColumns = swapText.querySelectorAll('.column');
        textRotation(swapTextColumns, numbers, 1, 30, 10);
      }, 100);
    }, 600); 
  }

//* pleasures former & replace text rotate function -------------------

  function textRotate_dummy(column, character, index) {
    let iterations = 0;
    const IntervalId = setInterval(() => {
      const random = Math.floor(Math.random() * character.length);
      column.textContent = character[random];
      iterations++;
      if(iterations > index) { clearInterval(IntervalId) }
    }, 15);
  }

  function textRotationReplaceDataset(columns, character, mtpRatio, iteration, duration) { 
    columns.forEach((column, index) => {
      let iterations = iteration;
      const IntervalId = setInterval(() => {
        const random = Math.floor(Math.random() * character.length);
        column.textContent = character[random];
        iterations++;
        if(iterations > index * mtpRatio) {
          column.textContent = column.dataset.replace; //* 
          clearInterval(IntervalId);
        }
      }, duration);
    });
  }

//* pleasures headline text method ------------------------------------

  const headline_rowNth1_formerTxt = 'VRTL WRLD';
  const headline_rowNth1_replaceTxt = 'PLEASURES';
  const headline_rowNth2_formerTxt = 'RTFKT ';
  const headline_rowNth2_replaceTxt = 'BITSKI';

  const pleasuresHeadlineText = pleasures.querySelector('.pleasures-headline-text');
  const rowNth1 = pleasuresHeadlineText.querySelector('.row-nth-1');
  const rowNth2 = pleasuresHeadlineText.querySelector('.row-nth-2');
  rowNth1.textContent = headline_rowNth1_formerTxt;
  rowNth2.textContent = headline_rowNth2_formerTxt;

  createRowsColumns_dataset_empCol(pleasuresHeadlineText); //*>
  setReplaceText_dataset(rowNth1, headline_rowNth1_replaceTxt);
  setReplaceText_dataset(rowNth2, headline_rowNth2_replaceTxt);


  function pleasuresSwapHeadline_replace() {
    const rowNth1Columns = rowNth1.querySelectorAll('.column');
    const rowNth2Columns = rowNth2.querySelectorAll('.column');
    textRotationReplaceDataset(rowNth1Columns, numbers, 2, 1, 80);
    textRotationReplaceDataset(rowNth2Columns, numbers, 1, -6, 80);
  }

  function pleasuresSwapHeadline_former() {
    const rowNth1Columns = rowNth1.querySelectorAll('.column');
    const rowNth2Columns = rowNth2.querySelectorAll('.column');
    textRotationBackwards(rowNth1Columns, numbers, 1.5, 100);
    textRotationBackwards(rowNth2Columns, numbers, 2, 100);
  }


//* pleasures square grid -------------------------------------------

  const matchedNumForPleasuresGrid = 36;
  const pleasuresSquareGrid = pleasures.querySelector('.pleasures-square-grid');

  function createPleasuresSquareGrid() {
    for (let i = 0; i < matchedNumForPleasuresGrid; i++) {
      const square = document.createElement('div');
      square.classList.add('square');
      pleasuresSquareGrid.appendChild(square);
    }
  } createPleasuresSquareGrid(); //*>

  const pleasuresSquares = pleasuresSquareGrid.querySelectorAll('.square'); //*>
    const pleasuresImage = pleasures.querySelector('.pleasures-image');
    let squareIndex;  


  function pleasuresImageSwap(add, remove) {
    setTimeout(() => {
      pleasuresSquares.forEach((square,index) => {
        const randomNum = Math.random();
        square.style.transitionDelay = randomNum/2 + 's';
        square.style.backgroundColor = '#d3d3d3';
        if(index === squareIndex) {
          square.style.transitionDelay = 0.55 + 's';
        }
        square.addEventListener('transitionend', () => {
          if(index === squareIndex) {
            pleasuresSquares.forEach((sq) => {
              pleasuresImage.classList.add(add);
              pleasuresImage.classList.remove(remove);
              sq.style.backgroundColor = 'transparent';
            });
          }
        });
      });
    }, 0);
  }

//* pleasures image wrapper -------------------------------------------

  let entries = false;
  let pleasuresIw_rect;
  let pleasuresStickyStart = 0; 

  const pleasuresImageWrapper = pleasures.querySelector('.pleasures-image-wrapper');
  pleasuresImageWrapper.addEventListener('mouseenter', () => {
    gsap.to(circle,{scale:3, duration:.3});
    circle.classList.add('textAppear');
  });

  pleasuresImageWrapper.addEventListener('mouseleave', () => {
    gsap.to(circle,{scale:1, duration:.3});
    circle.classList.remove('textAppear');
    entries = false;
  });

  pleasuresImageWrapper.addEventListener('mousemove', (e) => {
    if(!entries && e.clientX > pleasuresIw_rect.left + 30 
      && !entries && e.clientX < pleasuresIw_rect.left + pleasuresIw_rect.width -30
      && !entries && e.clientY > pleasuresIw_rect.top + 30
      && !entries && e.clientY < pleasuresIw_rect.top + pleasuresIw_rect.height -30) {
      gsap.to(pleasuresImageWrapper, {scale: 0.9, duration:.3});
      setTimeout(() => {
        gsap.to(pleasuresImageWrapper, {scale: 1, duration:.3});
        entries = true;
      }, 200);
    }
  });

  pleasuresImageWrapper.addEventListener('click', () => {
    location.href = '/';
  });

  function setPleasuresStickyStart() { //*>
    if(innerWidth < 768) { pleasuresStickyStart = -100 } 
    if(innerWidth >= 768) { pleasuresStickyStart = -150 } 
    if(innerWidth >= 810) { pleasuresStickyStart = -200 } 
    if(innerWidth >= 991) { pleasuresStickyStart = -250 } 
  } setPleasuresStickyStart(); //*>

  
//* kryptoz section ------------------------------------------------------------

  // let finalV2 = [];
  const kryptoInitWidth = 250; 
  const targetInitHeight = 340;
  const character1 = '016KRYPTOZEN'; 
  const character2 = '016KRYP6TOZ6EN'; 

  let [scrollEndScrollY, v] = [0,0]; let mtpRatio = 1.15;  let mgnTop = -100;
  let [expand, expComp, forward, kryptozHeadlineTextRotate, trf] = [false,false,false,false];
  let [expandStartScrollY, expandEndScrollY] = [[],[]];
  let [targetInterSectVal, partnersInterSectVal] = [[],[]];

  const kryptoz = document.querySelector('.kryptoz');
  const kryptozHeadlineText = kryptoz.querySelector('.kryptoz-headline-text');
  createColumns_dataset(kryptozHeadlineText);
  const kryptozHeadlineTextColumns = kryptozHeadlineText.querySelectorAll('.column');
  const kryptozImage = kryptoz.querySelector('.kryptoz-image');
  const kryptoImageWs = kryptozImage.querySelectorAll('.krypto-image-wrapper');
  const target = kryptoz.querySelector('.target');
  const tracker = kryptoz.querySelector('.tracker'); //*** unused */
  const kryptoLearnContainer = kryptoz.querySelector('.learn-container');
  const space = document.querySelector('.space');
  let diff = innerWidth - innerHeight;
    target.style.setProperty('--top', 110 +'%');


  function setExpRatio(imageW, dw, dh) {
    imageW.style.width = innerWidth/dw + v*2 + 'px'; 
    imageW.style.height = innerHeight/dh + v*2 + 'px';
  }
  
  function windowRatio_NegativeVal(imageW) {
    if(innerWidth < innerHeight) { 
      if(diff <= 0 && diff >= -100) { setExpRatio(imageW, 4, 4)}
      if(diff < -100 && diff >= -200) { setExpRatio(imageW, 3, 4)}
      if(diff < -200 && diff >= -350) { setExpRatio(imageW, 4, 3.5)}
      if(diff < -350 && diff >= -800) { setExpRatio(imageW, 3, 3.5)}
    }
  }
  
  function windowRatio_positiveVal(imageW) {
    if(innerWidth > innerHeight) { 
      if(diff > 0 && diff <= 200) { setExpRatio(imageW, 4, 3.2)}
      if(diff > 200 && diff <= 700) { setExpRatio(imageW, 3, 3)}
      if(diff > 700 && diff <= 1000) { setExpRatio(imageW, 3, 2.5)}
      if(diff > 1000) { setExpRatio(imageW, 3, 2)}
    }
  }
  
  function kryptoShadeClipPathMethod() {
    target.style.setProperty('--top', `${110-v/4.5}%`);
    target.style.clipPath = `polygon(${5-v/120}% 0%, ${95+v/120}% 0%, 
    100% ${5-v/120}%, 100% ${95+v/120}%, ${95+v/120}% 100%, 
    ${5-v/120}% 100%, 0% ${95+v/120}%, 0 ${5-v/120}%)`;
  }
  
  function resetSize(imageWidth, targetHeight) {
    const kryptoImageWs = kryptozImage.querySelectorAll('.krypto-image-wrapper');
    kryptoImageWs.forEach((imageW, index) => {
      imageW.style.width = imageWidth;
      imageW.style.aspectRatio = 'auto';
      if(index === 2) {
        imageW.style.height =  targetHeight + 'px';
      } 
    });
  }

//* partners ------------------------------------------------------------
//* create trf text columns method --------------------------------

	const partners = document.querySelector('.partners');
	const partnersTrfText = partners.querySelector('.partners-trf-text');
		createColumns(partnersTrfText);
	const partnersTrfTextColumns = partners.querySelectorAll('.column');


//* contact section method ------------------------------------------------------

  const contact = document.querySelector('.contact');
  const contactHeadlineText = contact.querySelector('.contact-headline-text');
    createRowsColumnsDataset_contactHeadline(contactHeadlineText); //*>

  const interactWrapper = document.querySelector('.interact-wrapper');
  const textInteract = interactWrapper.querySelector('.text-interact');
  createColumns_dataset(textInteract);
  const textInteractColumns = textInteract.querySelectorAll('.column');

  const contactHeadlineText_Options = { threshold: .3, rootMargin:'0px' }
  const contactHeadlineText_Observer = new IntersectionObserver(
          contactHeadlineText_Callback, contactHeadlineText_Options);

  function contactHeadlineText_Callback(entries, obs) {
    if(entries[0].isIntersecting) {
      contactHeadlineTextRotation(); //*>
        contactInterSect = true;
      obs.unobserve(entries[0].target);
    }
  }

  interactWrapper.addEventListener('mouseenter', () => {
    textRotation(textInteractColumns, alphabets, 1, -5, 30);
    gsap.to(circle, {scale:.5, duration:.3});
  });
  interactWrapper.addEventListener('mouseleave', () => {
    textRotationBackwards(textInteractColumns, alphabets, 2, 30);
    gsap.to(circle, {scale:1, duration:.3});
    interactWrapper.classList.add('mouseLeave');
      setTimeout(() => {
        interactWrapper.classList.remove('mouseLeave');
      }, 700);
  });

  interactWrapper.addEventListener('click', () => {
    location.href = '/';
  });

  function contactHeadlineTextRotation() {
    const rows = contactHeadlineText.querySelectorAll('.row');
    rows.forEach(row => {
      const columns = row.querySelectorAll('.column');
        if(row.classList.contains('nth2')) {
          setTimeout(() => {
            textRotation(columns, character2, 1, -1, 70);
          }, 500);
        } else { textRotation(columns, character2, 1, -1, 50)}
    });
  }

  function createRowsColumnsDataset_contactHeadline(element) { 
    const rows = element.querySelectorAll('.row');
    rows.forEach(row => {
      row.innerHTML = row.textContent.split('').map(char => {
        if(char === 'I'|| char === 'R') { 
          return `<span class="column Gridular" data-text="${char}">${char}</span>`}
        if(char === 'x') { return '<i></i>' } 
        else { return `<span class="column" data-text="${char}">${char}</span>` }
      }).join('');
    });
  }

//* register -----------------------------------------------------
//* register headline text method ------------------------------------

  let rowZeroLoopId, rowOneLoopId; 
  let [contactInterSect, registerInterSect ] = [false, false];
  let headerTrfStartScrollY = [];

  const register = document.querySelector('.register');
  const registerHeadlineText = register.querySelector('.register-headline-text');
    createRowsColumns_dataset(registerHeadlineText); //*>
  const headlineRows = registerHeadlineText.querySelectorAll('.row'); //*>

  function createTargets() {
    headlineRows.forEach(row => {
      const columns = row.querySelectorAll('.column');
      columns.forEach(column => { column.classList.add('target') });
    });
  } createTargets(); 

  function txtRotate(row, character, loop, iteration, duration) {
    const target = row.querySelector('.target');
    let iterations = iteration;
    if(!target) return;
    const IntervalId = setInterval(() => {
      const random = Math.floor(Math.random() * character.length);
      target.textContent = character[random];
      iterations++;
      if(iterations === loop) {
        target.textContent = target.dataset.text;
        clearInterval(IntervalId);
        target.classList.remove('target');
        // console.log(target); console.log(row);
      }
    }, duration);
  }

  function registerHeadlineRotation() {
    let [rowZeroCount, rowOneCount] = [0,0]; 
    headlineRows.forEach((row, index) => {
      if(index === 0) {
        txtRotate(row, character2, 2, 0, 110);
        rowZeroLoopId = setInterval(() => {
          txtRotate(row, character2, 3, 0, 130);
          rowZeroCount++;
          console.log(rowZeroCount);
          const columns = row.querySelectorAll('.column');
          if(rowZeroCount === columns.length-1) {
            clearInterval(rowZeroLoopId);
          }
        }, 410); 
      }
      if(index === 1) {
        txtRotate(row, character2, 3, 0, 130);
        rowOneLoopId =	setInterval(() => {
          txtRotate(row, character2, 3, 0, 140);
          rowOneCount++;
          const columns = row.querySelectorAll('.column');
          if(rowOneCount === columns.length-1) {
            clearInterval(rowOneLoopId);
          }
        }, 430); 
      }
    });
  }

//* registerHeadlineText Observer ---

  const registerHeadlineText_Options = { threshold: 0.1, rootMargin:'0px' };
  const registerHeadlineText_Observer = new IntersectionObserver(
          registerHeadlineText_Callback, registerHeadlineText_Options);
    
  function registerHeadlineText_Callback(entries, obs) {
    if(entries[0].isIntersecting) {
      registerHeadlineRotation();
      registerInterSect = true;
      obs.unobserve(entries[0].target);
    } 
  }

//* input method --------------------------------- 

  const input = register.querySelector('input');
  const label = register.querySelector('label');

  input.addEventListener('keydown', () => {
    setInputTextSize();
  });
  input.addEventListener('mousemove', () => {
    gsap.to(circle, {scale:1.5, duration:.3});
  });
  input.addEventListener('mouseleave', () => {
    gsap.to(circle, {scale:1, duration:.3});
  });

  input.addEventListener('focus', () => {
    label.style.transform = 'translateY(-15px)'
    input.style.fontSize = 10 +'px';
    input.value = '';
  });

  input.addEventListener('blur', () => {
    if(input.value) {
      label.style.transform = 'translateY(-15px)';
    } else { label.style.transform = 'none' }
  });

  function setInputTextSize() {
    if(innerWidth <= 624) { input.style.fontSize = 2.3 +'vw'}
    if(innerWidth > 624) { input.style.fontSize = 16 +'px'}
    if(innerWidth > 756) { input.style.fontSize = 18 +'px'}
    if(innerWidth > 1200) { input.style.fontSize = 20 +'px'}
  }

//* register btn entry method --------------------------------------

  const entryWrapper = register.querySelector('.entry-wrapper');
  const textEntry = entryWrapper.querySelector('.text-entry');
    createColumns_dataset_empCol(textEntry); //*>
  const textEntryColumns = textEntry.querySelectorAll('.column'); 


  entryWrapper.addEventListener('mouseenter', () => {
    virtualRotationForwards(textEntryColumns, character2, -1, 50);
  });
  entryWrapper.addEventListener('mousemove', () => {
    gsap.to(circle, {scale:.5, duration:.2});
  });
  entryWrapper.addEventListener('mouseleave', () => {
    gsap.to(circle, {scale:1, duration:.3});
    virtualRotationBackwards(textEntryColumns, character2, 35, 30);
    entryWrapper.classList.add('mouseLeave');
      setTimeout(() => {
        entryWrapper.classList.remove('mouseLeave');
      }, 700);
  });

  entryWrapper.addEventListener('click', () => {
    location.href = '/';
  });


//* register nav method -------------------------------------------

  const navRegister = register.querySelector('.nav-register');
  const sides = navRegister.querySelectorAll('.side');
  const medias = navRegister.querySelectorAll('.media');
  const contents = navRegister.querySelectorAll('.content');

  sides.forEach(side => {
    createColumns_dataset_empCol(side); //*>
    const sideColumns = side.querySelectorAll('.column');
    side.addEventListener('mouseenter', () => {
      if(side.classList.contains('email')) {
        virtualRotationForwards(sideColumns, character2, -1, 30);
      } else {virtualRotationForwards(sideColumns, character2, -1, 50)}
    });
    side.addEventListener('mousemove', () => {
      gsap.to(circle, {scale:.45, duration:.2});
    });
    side.addEventListener('mouseleave', () => {
      gsap.to(circle, {scale:1, duration:.3});
      virtualRotationBackwards(sideColumns, character2, 35, 30);
    });
  });

  medias.forEach(media => {
    createColumns_dataset(media); //*>
    const mediaColumns = media.querySelectorAll('.column');
    media.addEventListener('mouseenter', () => {
      virtualRotationForwards(mediaColumns, character2, -1, 50);
    });
    media.addEventListener('mousemove', () => {
      gsap.to(circle, {scale:.45, duration:.2});
    });
    media.addEventListener('mouseleave', () => {
      gsap.to(circle, {scale:1, duration:.3});
      virtualRotationBackwards(mediaColumns, character2, 35, 30);
    });
  });

  contents.forEach(content => {
    createColumns_dataset(content); //*>
    const contentColumns = content.querySelectorAll('.column');
    content.addEventListener('mouseenter', () => {
      virtualRotationForwards(contentColumns, character2, -1, 50);
    });
    content.addEventListener('mousemove', () => {
      gsap.to(circle, {scale:.45, duration:.2});
    });
    content.addEventListener('mouseleave', () => {
      gsap.to(circle, {scale:1, duration:.3});
      virtualRotationBackwards(contentColumns, character2, 35, 30);
    });
  });


  function virtualRotationBackwards(columns, character, loop, duration) { 
    let num = 1;
    const loopId = setInterval(() => { num++ }, loop);
    columns.forEach((column, index) => {
      const IntervalId = setInterval(() => {
        if(index >= columns.length - num) {
          const random = Math.floor(Math.random() * character.length);
          column.textContent = character[random];
          if(num > columns.length+1) {
            column.textContent = column.dataset.text;
            clearInterval(IntervalId);
            clearInterval(loopId);
          }
        }
      }, duration);
    });
  }

  function virtualRotationForwards(columns, character, iteration, duration) {
    columns.forEach((column, index) => { //* default iteration -1
      let iterations = iteration;
      const IntervalId = setInterval(() => {
        const random = Math.floor(Math.random() * character.length);
        column.textContent = character[random];
        iterations++;
        if(iterations > index) {
          column.textContent = column.dataset.text;
          clearInterval(IntervalId);
        }
      }, duration);
    });
  } 


//* footer -----------------------------------------------------

  const footer = document.querySelector('footer');
  const footerSpace = document.querySelector('.footer-space');

//* -------------------------------------------------------------------------------------

  window.addEventListener('reload', () => {
    location.href = '/';
  });

  window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
  });

//* ------------------------------------------------------------------------------
//* create columns functions -------------------------------------------------

  function createColumns(element) {
    element.innerHTML = element.textContent.split('').map(char => {
      if(char === ' ') {return ' '}
      else {return `<span class="column">${char}</span>`}
    }).join('');
  }

  function createColumns_empCol(element) {
    element.innerHTML = element.textContent.split('').map(char => {
      return `<span class="column">${char}</span>`;
    }).join('');
  }


  function createColumns_dataset(element) {
    element.innerHTML = element.textContent.split('').map(char => {
      if(char === ' ') {return ' '}
      else {return `<span class="column" data-text="${char}">${char}</span>`}
    }).join('');
  }

  function createColumns_dataset_empCol(element) {
    element.innerHTML = element.textContent.split('').map(char => {
      return `<span class="column" data-text="${char}">${char}</span>`;
    }).join('');
  }

//* create rows columns functions -----------------------------------

  function createRowsColumns(element) {
    const rows = element.querySelectorAll('.row');
    rows.forEach(row => {
      row.innerHTML = row.textContent.split('').map(char => {
        if(char === ' ') { return ' ' } 
        else { return `<span class="column">${char}</span>` }
      }).join('');
    });
  }

  function createRowsColumns_empCol(element) { //* currently unused
    const rows = element.querySelectorAll('.row');
    rows.forEach(row => {
      row.innerHTML = row.textContent.split('').map(char => {
        return `<span class="column">${char}</span>`
      }).join('');
    });
  }

  function createRowsColumns_dataset(element) { 
    const rows = element.querySelectorAll('.row');
    rows.forEach(row => {
      row.innerHTML = row.textContent.split('').map(char => {
        if(char === ' ') { return ' ' } 
        else { return `<span class="column" data-text="${char}">${char}</span>` }
      }).join('');
    });
  }

  function createRowsColumns_dataset_empCol(element) {
    const rows = element.querySelectorAll('.row');
    rows.forEach(row => {
      row.innerHTML = row.textContent.split('').map(char => {
        return `<span class="column" data-text="${char}">${char}</span>`;
      }).join('');
    });
  }

//* text rotation function ------------------------------------------------

  function textRotate(column, character, mtpRatio, iteration, duration) {
    let iterations = iteration;
    const IntervalId = setInterval(() => {
      const random = Math.floor(Math.random() * character.length);
      column.textContent = character[random];
      iterations++;
      if(iterations > index * mtpRatio) {
        column.textContent = column.dataset.text;
        clearInterval(IntervalId);
      }
    }, duration);
  }  // use inside forEach
  
  //* text rotation plus functions -----------------------------------------

  function textRotationPlus(columns, character, mtpRatio, plusRatio, iteration, duration) {
    columns.forEach((column, index) => {
      let iterations = iteration;
      const IntervalId = setInterval(() => {
        const random = Math.floor(Math.random() * character.length);
        column.textContent = character[random];
        iterations++;
        if(iterations > (index + plusRatio) * mtpRatio) {
          column.textContent = column.dataset.text;
          clearInterval(IntervalId);
        }
      }, duration);
    });
  } 

//* text rotation functions -----------------------------------------

  function textRotation(columns, character, mtpRatio, iteration, duration) {
    columns.forEach((column, index) => {
      let iterations = iteration;
      const IntervalId = setInterval(() => {
        const random = Math.floor(Math.random() * character.length);
        column.textContent = character[random];
        iterations++;
        if(iterations > index * mtpRatio) {
          column.textContent = column.dataset.text;
          clearInterval(IntervalId);
        }
      }, duration);
    });
  } 

  function textRotationBackwards(columns, character, mtpRatio, duration) {
    columns.forEach((column, index) => {
      let iterations = columns.length * mtpRatio;
      const IntervalId = setInterval(() => {
        const random = Math.floor(Math.random() * character.length);
        column.textContent = character[random];
        iterations--;
        if(iterations < index) {
          column.textContent = column.dataset.text;
          clearInterval(IntervalId);
        }
      }, duration);
    });
  }


//* -------------------------------------------------------------------------------

//^ scroll event ----------------------------------------------------------------
//* scroll event ----------------------------------------------------------------
//^ scroll event ----------------------------------------------------------------

  window.addEventListener('scroll', () => { 
    const blackRect = black.getBoundingClientRect(); 
    const blackImageW_rect = blackImageW.getBoundingClientRect(); 
    //* hero trf text method ---
    let threshold = 12;
    threshold += scrollY/4;
    heroTrfTextColumns.forEach((column, index) => {
      if(threshold > index) { column.classList.add('colored') } 
      else { column.classList.remove('colored') }
    });
    //* >>>>> section black hit sticky >>>>> ---
    if(!activation && blackRect.top <= 0) {
      // console_blue('hit sticky'); console.log('val '+ val); //** console */
      if(stickyStartScrollY.length < 1) { stickyStartScrollY.push(scrollY) }
      // console_orange('stickyStartScrollY ' + stickyStartScrollY); //** console */
      sticky = true; //*
      blackImageW.style.width = innerWidth/5 + 'px';
      blackImageW.style.height = innerHeight/5 + 'px';
      blackImageW.style.top = innerHeight/2 - blackImageW.clientHeight/2 + 'px';
      blackImageW.style.left = innerWidth/2 - blackImageW.clientWidth/2 + 'px';
      val = scrollY - stickyStartScrollY; //**** */
      blackImageW.style.transform = `scale(${1+val/500},${1+val/500})`; //**** */
      //* black imageW corner pseudo element trf method ---
      if(!activation && !cornerActive) { blackImageW.style.setProperty('--px', 20 - val*0.007 +'px') }
      //* black stc text color transform ---
      const blackStcTextRect = blackStcText.getBoundingClientRect();
      const blackStarW_rect = blackStarW.getBoundingClientRect();
      if(blackImageW_rect.top < blackStcTextRect.bottom +20) {
        blackStcTextW.style.color = '#aaa';
        blackStcTextW.style.transition = 1.2 + 's';
      } else { blackStcTextW.style.color = '#000' }
      if(blackImageW_rect.top < blackStarW_rect.bottom) {
        blackStcTextW.style.color = '#dfdfdf';
      }
      //"* realms headline text rotation method ---
      if(!rotation) {
        realmsHeadline_Observer.observe(realmsHeadline);
        rotation = true;
      }
      //>* >>>>> section black hit relative >>>>> ---
      if(Math.floor(blackImageW_rect.top) < 0) { 
        count = 0;
        if(count === 0) {
          // console_green('hit relative'); console_magenta('val '+ val); //* console
          lenis.stop();
          black.style.position = 'relative';
          blackImageW.style.left = 0 + 'px'; 
          blackImageW.style.top = 0 + 'px';
          realmsHeadline.style.top = -420 + 'px'; //* innerWidth>600
          // realmsHeadline.style.top = -320 + 'px'; //^ innerWidth<600
          stickyEndScrollY.push(scrollY); 
          // console_blue('stickyEndScrollY '+ stickyEndScrollY);
          //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
          // window.scrollTo(0, stickyStartScrollY); //^ original 
          if(!resize) {
            window.scrollTo(0, stickyStartScrollY); 
          } else { window.scrollTo(0, resizedVal) }
          
          //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
          lenis.start();
          activation = true;
          cornerActive = true;
          blackImageW.style.transform = 'none'; 
          blackImageW.style.width = 100+'vw';
          blackImageW.style.height = 100+'vh';
          blurContainer.classList.add('blur');
          heroBottom.classList.add('darken');
          assetsHeadline_Observer.observe(assetsHeadline);
        }
      }
    } else {
      if(!activation) {
        blackImageW.style.transform = 'initial'; //*
        blackImageW.style.width = 250+'px';
        blackImageW.style.height = 250+'px';
        blackImageW.style.top = innerHeight/2 - blackImageW.clientHeight/2 + 'px';
        blackImageW.style.left = innerWidth/2 - blackImageW.clientWidth/2 + 'px';
        stickyStartScrollY = [];
        stickyEndScrollY = [];
        [rotation, resize, sticky] = [false,false,false];
      }
    }
    //* >>>>> section black hit back to sticky >>>>> ---
    if(activation && Math.floor(blackImageW_rect.top) > 0) {
      // console_magenta('hit back to sticky'); //* console
      count = 1;
      lenis.stop();
      black.style.position = 'sticky';
      window.scrollTo(0, stickyEndScrollY[stickyEndScrollY.length-1]-25); 
      lenis.start();
      setTimeout(() => { [activation, cornerActive] = [false,false] }, 0); 
      realmsHeadline.style.top = 1590 + 'px'; //* innerWidth>600 
      // realmsHeadline.style.top = 1690 + 'px'; //^ innerWidth<600
      blurContainer.classList.remove('blur');
      heroBottom.classList.remove('darken');
    }
    // </> realms trf text & stc text method ------------------------------
    const realmsRect = realms.getBoundingClientRect();
    if(activation && realmsRect.top < innerHeight) {
      val = scrollY - stickyStartScrollY;
      let threshold = -80;
      threshold += val/4;
      // console_green('hey'); console_red('val2 '+ val); //* console
      realmsTrfTextColumns.forEach((column, index) => {
        if(threshold > index) { column.classList.add('colored') } 
        else { column.classList.remove('colored') }
      });
      cardTexts.forEach(cardText => {
        cardTexts_Observer.observe(cardText);
      });
    } else { cardTexts.forEach(line => {line.classList.remove('animate')}) }
    // </> assets trf text method ------------------------------
    const assetsRect = assets.getBoundingClientRect();
    const assetsTrfTextRect = assetsTrfText.getBoundingClientRect();
    if(activation && assetsTrfTextRect.top < innerHeight) {
      if(assetsTrfTextInterSectVal.length < 1) {
        assetsTrfTextInterSectVal.push(scrollEndVal);
      }
      val = val - assetsTrfTextInterSectVal;
      let threshold = -180; 
      threshold += val/2;
      assetsTrfTextColumns.forEach((column, index) => {
        if(threshold > index) { column.classList.add('colored') } 
        else { column.classList.remove('colored') }
      });
    }
    assetsKryptozAll.forEach(assetsKryptoz => {
      if(activation && assetsRect.bottom < innerHeight 
        && assetsRect.bottom > 0) {
        TweenLite.to(assetsKryptoz, 0, { display:'block' });
      } else if(activation && assetsRect.bottom < 0) {
          TweenLite.to(assetsKryptoz, 0, { display:'none' });
        } else if(activation && assetsRect.top > innerHeight) {
            TweenLite.to(assetsKryptoz, 0, { display:'none' });
            assetsTrfTextInterSectVal = [];
          } 
      else if(!activation) {
        TweenLite.to(assetsKryptoz, 0, { display:'none' });
      }  
    });
    // </> pleasures method ------------------------------
    const pleasuresRect = pleasures.getBoundingClientRect();
      pleasuresIw_rect = pleasuresImageWrapper.getBoundingClientRect();
    if(pleasuresRect.top < pleasuresStickyStart) { //^ ///////////////////////////////////
      if(pleasuresInterSectVal.length < 1) { pleasuresInterSectVal.push(scrollEndVal) }
      val = val - pleasuresInterSectVal;
      // console.log('pleasuresInterSectVal '+ val); //* console
      if(!swapImage && val > 600) {
        pleasuresSwapText_replace();
        pleasuresSwapHeadline_replace();
        squareIndex = Math.floor(Math.random() * pleasuresSquares.length);
        pleasuresImageSwap('active', null);
        swapImage = true;
      } else if(swapImage && val < 600) {
        pleasuresSwapText_former();
        pleasuresSwapHeadline_former();
        pleasuresImageSwap(null, 'active');
        swapImage = false;
      }
    } else { pleasuresInterSectVal = [] } //*
    // </> kryptoz method ------------------------------
    const kryptozRect = kryptoz.getBoundingClientRect(); 
    const kryptozHeadlineTextRect = kryptozHeadlineText.getBoundingClientRect(); 
    const targetRect = target.getBoundingClientRect();
    const partnersRect = partners.getBoundingClientRect();
    //* kryptoz Headline Text Rotation ---
    if(!kryptozHeadlineTextRotate && kryptozHeadlineTextRect.top < innerHeight) {
      textRotation(kryptozHeadlineTextColumns, character1, 2, 0, 80);
      kryptozHeadlineTextRotate = true;
    } else if(kryptozRect.top > innerHeight) {
      kryptozHeadlineTextRotate = false;
    }
    //* method for scroll direction ---
    if(scrollY > scrollEndScrollY) { 
      forward = true; //* scrollUp
      // console_green('forward '+ forward); //* log
    } else { 
      forward = false; //* scrollDown
      // console_blue('forward '+ forward); //* log
    }
    //* kryptozImage Start expand ---
    if(!expand && !expComp && targetRect.top + targetRect.height/2 < innerHeight/2) { 
      if(expandStartScrollY.length < 1) {
        expandStartScrollY.push(scrollEndScrollY);
      }
        kryptozImage.style.alignItems = 'start';
      expand = true;
    } 
    //* kryptozImage expand method ---
    if(expand && !expComp) {
      v = scrollY - expandStartScrollY;
      // console.log(v); //* console
      kryptoShadeClipPathMethod(); //* shade ---
      kryptoImageWs.forEach(imageW => {
        if(imageW.classList.contains('tracker')) { //* or v
          imageW.style.width = kryptoInitWidth + v/2 + 'px';  
          imageW.style.aspectRatio = 'auto';
        }
        if(imageW.classList.contains('target')) {
          setExpRatio(imageW, 3, 3); //* forIncaseOf
          windowRatio_NegativeVal(imageW);
          windowRatio_positiveVal(imageW);
        }
      });
    }
    //* krypto Learn Container Transform ---
    if(innerWidth < innerHeight) { //* smaller
      if(!expComp && targetRect.top < 0) {
        if(targetInterSectVal.length < 1) { targetInterSectVal.push(scrollEndScrollY) }
        let v2 = scrollY - targetInterSectVal;
        kryptoLearnContainer.style.opacity = 1;
        // finalV2.push(v2); console_magenta(finalV2.pop());
        if(v2 > 100) { v2 = 100; console_green('positiveVal') } 
        if(!trf && v2 < 100) { v2 = 100; console_blue('negativeVal') } 
        kryptoLearnContainer.style.bottom = `${-100+v2*mtpRatio}%`; 
      }
      if(!expComp && targetRect.top > 0) { 
        kryptoLearnContainer.style.opacity = 0;
        targetInterSectVal = [];
        trf = false;
        // finalV2 = [];
      }
    }
    if(innerWidth >= innerHeight) { //* lager
      if(!expComp && targetRect.left < 0) {
        if(targetInterSectVal.length < 1) { targetInterSectVal.push(scrollEndScrollY) }
        let v2 = scrollY - targetInterSectVal;
        kryptoLearnContainer.style.opacity = 1;
        // finalV2.push(v2); console_magenta(finalV2.pop());
        if(v2 > 100) { v2 = 100; console_green('positiveVal') } 
        if(!trf && v2 < 100) { v2 = 100; console_blue('negativeVal') } 
        kryptoLearnContainer.style.bottom = `${-100+v2*mtpRatio}%`;
      }
      if(!expComp && targetRect.left > 0) { 
        kryptoLearnContainer.style.opacity = 0;
        targetInterSectVal = [];
        trf = false;
        // finalV2 = [];
      }
    }
    //* kryptozImage expand completed ---
    if(innerWidth < innerHeight) { //* smaller
      if(!expComp && targetRect.top < -100) { //^ Hit Hit Hit -----
        if(expandEndScrollY.length < 1) { expandEndScrollY.push(scrollEndScrollY) } //*
        // console_red('hit'); console_orange(expandEndScrollY); //* console
        [expComp, trf] = [true, true];
        space.style.height = 0;
        partners.style.marginTop = mgnTop +'px'; //> partners mgnTop
      } 
    }
    if(innerWidth >= innerHeight) { //* lager
      if(!expComp && targetRect.left < -100) { //^ Hit Hit Hit -----
        if(expandEndScrollY.length < 1) { expandEndScrollY.push(scrollEndScrollY) } //*
        // console_red('hit'); console_orange(expandEndScrollY); //* console
        [expComp, trf] = [true, true];
        space.style.height = 0;
        partners.style.marginTop = mgnTop +'px'; //> partners mgnTop
      } 
    }
    //* kryptozImage shrink start ---
    if(expComp && scrollEndScrollY < expandEndScrollY) {
      expComp = false;
      space.style.height = 500 + 'px';
      expandEndScrollY = [];
      // console_magenta('return'); //* console
      partners.style.marginTop = 0; //> partners mgnTop
    }
  //* kryptozImage shrink end & return to init --- 
    if(expand && !forward && targetRect.height < targetInitHeight+1) {
      kryptoImageWs.forEach(imageW => {
        imageW.style.width = kryptoInitWidth + 'px';
        imageW.style.aspectRatio = 'auto';
        target.style.width = kryptoInitWidth + 'px';
        target.style.height = targetInitHeight + 'px';
        expand = false;
      });
      forward = true;
      expandStartScrollY = [];
    }
    //* partners trf text method --- 
    if(partnersRect.top < innerHeight/2+200) {
      if(partnersInterSectVal.length < 1) { 
        partnersInterSectVal.push(scrollEndScrollY)}
      let value = scrollY - partnersInterSectVal;
      let threshold = -10;
        threshold += value/2;
      partnersTrfTextColumns.forEach((column, index) => {
        if(index < threshold) { column.classList.add('colored') } 
        else { column.classList.remove('colored') }
      });
    } 
    else { partnersInterSectVal = [] }
    // </> contact method ------------------------------
    const contactRect = contact.getBoundingClientRect();
    if(!contactInterSect && contactRect.top < innerHeight) {
      contactHeadlineText_Observer.observe(contactHeadlineText);
    } else if(contactInterSect && contactRect.top > innerHeight) {
      contactInterSect = false;
    }
    // </> register method ------------------------------
    const registerRect = register.getBoundingClientRect();
    if(!registerInterSect && registerRect.top < innerHeight) {
      registerHeadlineText_Observer.observe(registerHeadlineText);
    } else if(registerInterSect && registerRect.top > innerHeight) {
      registerInterSect = false;
      clearInterval(rowZeroLoopId);
      clearInterval(rowOneLoopId);
      createTargets();
    }
    // </> header method ------------------------------
    if(registerRect.top < header.clientHeight+10) {
      if(headerTrfStartScrollY.length < 1) {
        headerTrfStartScrollY.push(scrollEndScrollY);
      }
      let v3 = scrollY - headerTrfStartScrollY;
      if(v3 > 0) {
        header.style.transform = `translateY(${-v3}px)`;
        backFaceContainer.style.transform = `translateY(${-v3}px)`;
      }
    } else {
      header.style.transform = 'initial';
      backFaceContainer.style.transform = 'initial';
      headerTrfStartScrollY = [];
    }
    if(registerRect.top <= 5) {
      header.style.transform = 'scale(0)';
      backFaceContainer.style.transform = 'scale(0)';
    }
    // </> nav method ------------------------------
    const navRegisterRect = navRegister.getBoundingClientRect();
    if(navRegisterRect.top < innerHeight -50) {
      navRegister.classList.add('active');
    } else {navRegister.classList.remove('active')}
    // </> footer method ------------------------------
    const footerRect = footer.getBoundingClientRect();
    if(footerRect.top < innerHeight) {
      footerSpace.style.display = 'none';
      docElem.style.setProperty('--h', `${frontContentHgt}px`-`${500}vh`);
    } 
    if(footerRect.top > innerHeight) {
      footerSpace.style.display = 'block';
      docElem.style.setProperty('--h', `${frontContentHgt}px`);
    }
    //> <<< End of scroll event >>> End of scroll event >>> <//
  }); 
  
  

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  window.addEventListener('scrollend', () => {
    scrollEndScrollY = scrollY; //* 
    scrollEndVal = val;
  });

  //* abort scrolling & remove eventListener & resume ---
  // window.addEventListener('wheel', disableWheel, {passive:false})
  // function disableWheel(e) { //*** Super important ***//
  //   if(scrollY > 20) {
  //     e.preventDefault();
  //     setTimeout(() => {
  //       window.removeEventListener('wheel', disableWheel, {passive:false})
  //     }, 5000);
  //   }
  // } 

//* -----------------------------------------------------------------------------------------

  //* inside text request event ------------------------------------------

  const requestWrapper = document.querySelector('.request-wrapper');
  const textRequest = document.querySelector('.text-request');

  createColumns_dataset(textRequest); //*>
  const textRequestColumns = textRequest.querySelectorAll('.column'); 

  requestWrapper.addEventListener('mouseenter', () => {
    textRotation(textRequestColumns, alphabets, 1, -5, 30);
    gsap.to(circle, {scale:.5, duration:.3});
  });

  requestWrapper.addEventListener('mouseleave', () => {
    textRotationBackwards(textRequestColumns, alphabets, 1.3, 30);
    gsap.to(circle, {scale:1, duration:.3});
    requestWrapper.classList.add('mouseLeave');
    setTimeout(() => {
      requestWrapper.classList.remove('mouseLeave');
    }, 700);
  });

  requestWrapper.addEventListener('click', () => {
    location.href = '/';
  });

//* inside nav menu text ------------------------------------------

  const menuTitles = document.querySelectorAll('.menu-title');
  menuTitles.forEach(menuTitle => {
    createColumns_dataset(menuTitle); //*>
    const menuTitleColumns = menuTitle.querySelectorAll('.column');
    menuTitle.addEventListener('mouseenter', () => {
      gsap.to(circle, {scale:.5, duration:.3});
      textRotation(menuTitleColumns, alphabets, 1, -1, 50);
      menuTitle.classList.remove('through');
      menuTitle.classList.add('appear');
    });
    menuTitle.addEventListener('mouseleave', () => {
      gsap.to(circle, {scale:1, duration:.3})
      textRotationBackwards(menuTitleColumns, alphabets, 1, 50);
      menuTitle.classList.add('through');
      menuTitle.classList.remove('appear');
    });
  });

//* resize -----------------------------------------------

  window.addEventListener('resize', () => {
    heroHeadlineSetPos(); 
    blackStcTextW.style.top = innerHeight/7 + 'px'; //* 
    blackImageW.style.top = innerHeight/2 - blackImageW.clientHeight/2 + 'px';
    blackImageW.style.left = innerWidth/2 - blackImageW.clientWidth/2 + 'px';
    resizedVal = heroTop.clientHeight+heroBottom.clientHeight+heroMargin;
    resize = true;
    setPleasuresStickyStart(); //*
    setInputTextSize();
    console.log('resize'); //* console
    console.log('resizedVal '+ resizedVal); //* console
    console.log('pleasuresStickyStart '+ pleasuresStickyStart); //* console
    diff = innerWidth - innerHeight;
    console_orange('diff '+ diff); //* console
    if(expand) return;
    [expandStartScrollY, expandEndScrollY] = [[],[]];
    const kryptoImageW = kryptoz.querySelector('.krypto-image-wrapper');
    const kryptoImageW_rect = kryptoImageW.getBoundingClientRect();
    let trackerHeight = kryptoImageW_rect.height;
    if(innerWidth < 991) { resetSize(250 +'px', trackerHeight) }
    if(innerWidth > 991) { resetSize(200 +'px', trackerHeight) }
    if(innerWidth > 1026) { resetSize(20 +'vw', trackerHeight) }
  });

//* ---------------------------------------------------------------------------






























































//* ---------------------------------------------------------------------------
//* window ratio diff console ---
  // function windowRatio_NegativeVal(imageW) {
  //   if(innerWidth < innerHeight) {
  //     // console_green('smaller'); //* log
  //     if(diff <= 0 && diff >= -100) { 
  //       setExpRatio(imageW, 4, 4);
  //       // console.log('0-100'); //* log
  //     }
  //     if(diff < -100 && diff >= -200) { 
  //       setExpRatio(imageW, 3, 4);
  //       // console.log('0-200'); //* log
  //     }
  //     if(diff < -200 && diff >= -350) { 
  //       setExpRatio(imageW, 4, 3.5);
  //       // console.log('200-350'); //* log
  //     }
  //     if(diff < -350 && diff >= -800) { 
  //       setExpRatio(imageW, 3, 3.5);
  //       // console.log('350-800'); //* log
  //     }
  //   }
  // }
  
  // function windowRatio_positiveVal(imageW) {
  //   if(innerWidth > innerHeight) {
  //     // console_blue('larger'); //* log
  //     if(diff > 0 && diff <= 200) { 
  //       setExpRatio(imageW, 4, 3.2);
  //       // console.log('0-200'); //* log
  //     }
  //     if(diff > 200 && diff <= 700) {
  //       setExpRatio(imageW, 3, 3);
  //       // console.log('200-700'); //* log
  //     }
  //     if(diff > 700 && diff <= 1000) {
  //       setExpRatio(imageW, 3, 2.5);
  //       // console.log('700-1000'); //* log
  //     }
  //     if(diff > 1000) {
  //       setExpRatio(imageW, 3, 2);
  //       // console.log('1000-'); //* log
  //     }
  //   }
  // }

//* -------------------------------------------------------------------------
//* Explain behavior --- "MUST SAVE"

  // let moveEndMouseY; 
  // let scrollendScrollY = 0;  
  // const radius = circle.clientHeight/2;
  // document.addEventListener('mousemove', (e) => {
  //   moveEndMouseY = e.clientY;
  //   circle.style.transition = .03 + 's'; // or.1s
  //   circle.style.left = e.clientX - radius  + 'px';
  //   circle.style.top = (scrollendScrollY + e.clientY) - radius + 'px';
  // });

  // circle.addEventListener('transitionend', () => {
  //   circle.style.transition = 0 + 's';
  //   circle.style.transitionDelay = -100 + 's';
  // });

  // window.addEventListener('scroll', () => {
  //   circle.style.transition = 0 + 's';
  //   circle.style.transitionDelay = -100 + 's';
  //   circle.style.transform = `translateY(${(scrollY - scrollendScrollY)}px)`
  // });

  // window.addEventListener('scrollend', () => {
  //   circle.style.transform = 'initial';
  //   circle.style.transitionDelay = -100 + 's';
  //   scrollendScrollY = scrollY;
  //   let scrollendCircleTop = (moveEndMouseY + scrollendScrollY) - radius;
  //   circle.style.top = scrollendCircleTop + 'px';
  // });


//* ---------------------------------------------------------------------------
//* aspect ratio uncompleted ---

// console.log('innerWidth '+ innerWidth);
// console.log('innerHeight '+ innerHeight);

// const asp = innerHeight/innerWidth;
// console.log('asp '+ innerWidth/innerHeight);
// console.log('asp '+ innerHeight/innerWidth);
// console.log(innerHeight * asp);
// console.log(innerWidth*asp);

//+ -------------------------------------------------------------------------------------------


