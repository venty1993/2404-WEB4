const scrollInter = document.getElementsByClassName('scroll-inter');

        window.addEventListener('scroll',()=>{
            for(let i = 0 ; i < scrollInter.length ; i++){
                if(scrollInter[i].getBoundingClientRect().top < window.innerHeight){   
                    scrollInter[i].classList.add('active');
                }
            }
        })