'use strict';
window.addEventListener('DOMContentLoaded', function(){
    

    //Timer
    function countTimer (){
        const timerHours = document.querySelector('#timer-hours'),
              timerMinutes = document.querySelector('#timer-minutes'),
              timerSeconds = document.querySelector('#timer-seconds');
       
        function getTimeRemaining(){
            let dateStop = 24 * 3600 * 1000,
            dateNow = new Date().getTime() % (24 * 3600 * 1000),
            timeRemaining = (dateStop - dateNow)/1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor (timeRemaining / 60 / 60);
            //days =  Math.floor (timeRemaining / 60 / 60 / 24); 
            
            
            return{
                timeRemaining,
                hours,
                minutes,
                seconds
            };
        }
        
        function updateClock(){
            let timer =  getTimeRemaining();     
            
            function dateFormat (time , container){
                if (time < 10){
                    container.textContent = '0' + time;
                } else {
                    container.textContent = time;
                }
            }
            
            dateFormat(timer.hours, timerHours);
            dateFormat(timer.minutes, timerMinutes);
            dateFormat(timer.seconds, timerSeconds);
            

            setInterval(updateClock, 1000); 
            if (timer.hours <= 0 && timer.minutes <= 0 && timer.seconds <= 0){
                clearInterval();
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
                countTimer();
            }
            
        }
        updateClock();
    }
    countTimer();

    //Меню
    const menu = document.querySelector('menu'),
        menuItems = menu.querySelectorAll('ul>li'),
        body = document.querySelector('body'),
        header = body.querySelector('header');
    
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
             closeBtn = document.querySelector('.close-btn');    
        let interval,
            count = -100;

        const handlerMenu = () => {
            document.body.style.overflow = 'hidden';
            interval = requestAnimationFrame(handlerMenu);
                if(count < 0){
                    menu.style.transform = `translate(${count}%)`;
                    count+= 4;
                } else{
                    cancelAnimationFrame(interval);
                }
        };
            
        const closeMenu =() => {
            document.body.style.overflow = '';
            if (screen.width < 768){
                menu.style.transform = 'translate(-100%)';
            } else{
            
                interval = requestAnimationFrame(closeMenu);
                if(count > -100){
                    count-=3;
                    menu.style.transform = `translate(${count}%)`;
                        
                } else{
                    cancelAnimationFrame(interval);
                }
            }
        };
        
        
        //btnMenu.addEventListener('click', () => {
            
            
        //});
        
        body.addEventListener('click', (event) => {
            let target = event.target;
            
            if (target.closest('.menu') !== null){
                if(screen.width < 768){
                    if(!menu.style.transform || menu.style.transform === 'translate(-102%)'){
                        document.body.style.overflow = 'hidden';
                        menu.style.transform = 'translate(0)';
                    }else {
                        menu.style.transform = 'translate(-100%)';
                        document.body.style.overflow = '';
                    }
                }else{
                
                    if(!menu.style.transform || menu.style.transform === 'translate(-102%)'){
                        handlerMenu();
                    }else {
                        count = 0;
                        closeMenu();
                    };
                };
            }
            
            if (target.classList.contains('close-btn')){
                closeMenu();
            } 

            if(target.closest('li') !== null){
                menuItems.forEach((item, i) => {
                   if(item === target.closest('li')){
                       closeMenu();
                        }
                });
            }
            
            if(!menu.contains(target)) {
            	closeMenu();
            };        
        });
    };
    
    
    toggleMenu();


    //popup
    let togglePopUp = () => {
        const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn');

        popupBtn.forEach(elem => {
            elem.addEventListener('click',() => {
                popup.style.display = 'block';
            });
        });

       
        
        popup.addEventListener('click', (event) => {
            let target = event.target;
            if (target.classList.contains('popup-close')){
                popup.style.display = 'none';
            }else{
                target = target.closest('.popup-content');
                if (!target){
                    popup.style.display = 'none';
                }
            }
        });
    };
    togglePopUp();

// Скроллинг страницы в виде анимации
    let intervalScroll;
    let scrollVert = 0;
    let placeScroll = 0;

    const scrolling = () => {
        intervalScroll = requestAnimationFrame(scrolling);
                        
        if(scrollVert < placeScroll){
            window.scrollTo(0, scrollVert) ;
            scrollVert += 60;
        } else{
            cancelAnimationFrame(intervalScroll);
            scrollVert = 0;
        }
    };

    menuItems.forEach((item, i)=>{
        let linkMenu = menuItems[i].querySelector('a');
        linkMenu.setAttribute('href', '#');
        menuItems[i].addEventListener('click', () => {
            
            
           if (i == 0){
            placeScroll = 900;   
            } 
            switch (i){
                case 1: placeScroll = 2082;
                break;
                case 2: placeScroll = 3020;
                break;
                case 3: placeScroll = 4120;
                break;
                case 4: placeScroll = 5220;
                break;
            }
            scrolling();
            
        });
    });
    const main = document.querySelector('main'),
    nextSlide = main.querySelector('a');
    nextSlide.setAttribute('href', '#')
    nextSlide.addEventListener('click', ()=>{
        placeScroll = 900; 
        scrollVert = window.scrollY;
        scrolling();
    });

    //табы
    
    const tabs = () =>{
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');
        
        const toggleTabContent = (index) => {
            for(let i = 0; i< tabContent.length; i++){
                if (index === i){
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else{
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none')
                }
            }
        };

        tabHeader.addEventListener('click', () => {
            let target = event.target;
            target = target.closest('.service-header-tab');
            if(target){
                tab.forEach((item, i) =>{
                    if(item === target){
                        toggleTabContent(i);
                    }
                });  
            }  
        });
    };
    
    tabs();

// Слайдер

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            btn = document.querySelectorAll('.portfolio-btn'),
            slider = document.querySelector ('.portfolio-content'),
            dotsContainer = document.querySelector('.portfolio-dots'); 
            
        
        for (let i = 0; i < slide.length; i++){
            let li = document.createElement('li');
            li.setAttribute('class', 'dot');
            if (i === 0){
                li.classList.add('dot-active');
            }
            dotsContainer.appendChild(li);
        }
        
        const dot = document.querySelectorAll ('.dot');
        
        
            let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, strClass) =>{
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        }

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length){
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };
        slider.addEventListener('click', (event) =>{
            event.preventDefault();
            let target = event.target;

            if (!target.matches('.portfolio-btn, .dot')){
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')){
                currentSlide++;
            } else if (target.matches('#arrow-left')){
                currentSlide--;
            } else if (target.matches('.dot')){
                dot.forEach((elem, index) =>{
                    if (elem === target){
                        currentSlide = index;
                    }
                });
            }
            if (currentSlide >= slide.length){
                currentSlide = 0;
            }
            if (currentSlide < 0){
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        });

        slider.addEventListener('mouseover', (event) =>{
            if(event.target.matches('.portfolio-btn')||
            event.target.matches('.dot')){
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) =>{
            if(event.target.matches('.portfolio-btn')||
            event.target.matches('.dot')){
                startSlide();
            }
        });

        startSlide(1500);

    }

    slider();



});

