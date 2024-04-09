function makeSlider(slider,viewCount,gap){

    slider.style.position = 'relative';
    slider.style.marginBottom = '56px';


    const slideContents = [];

    for(let i = 0 ; i < slider.childElementCount ; i ++) {
        slider.children[i].classList.add('auto-slide-content')
        slideContents.push(slider.children[i]);
    }

    const slideContainer = document.createElement('div');
    slideContainer.classList.add('slide-container')

    const wrapper = document.createElement('div');
    wrapper.classList.add('contents-wrapper')

    slider.appendChild(slideContainer);
    slideContainer.appendChild(wrapper);

    for(let i = 0 ; i < slideContents.length ; i ++ ){
        wrapper.appendChild(slideContents[i]);
    }

    const sliderInterface = createAndInsert('div','slider-interface',slider);
    const prev = createAndInsert('button','prev',sliderInterface);
    const next = createAndInsert('button','next',sliderInterface);
    const buttonContainer = createAndInsert('div','button-container',sliderInterface);



    function createAndInsert(tag , className, targetParent) {
        
        const content = document.createElement(tag);
        content.classList.add(className)
        targetParent.appendChild(content);

        return content;
    }

   

    let 움직이는중 = false;
    let contentsWidth
    let index = viewCount;

    console.log(index)
    
    
    라디오버튼생성();
    컨텐츠크기반영();
    클론생성();
    
    next.addEventListener('click', ()=>{
        console.log(viewCount)
        if(!움직이는중){
            index++;
            위치적용(true);

            움직이는중=true;
            
            setTimeout(() => {
                움직이는중=false;
                console.log(wrapper.childElementCount - 1 - viewCount)
                if(index > wrapper.childElementCount - 1 - viewCount) {
                    index = viewCount;
                    위치적용(false);
                } 
            }, 1000);
        }
    })

    prev.addEventListener('click', ()=>{
        if(!움직이는중){
            움직이는중 = true;
            
            index--;
            위치적용(true);

            setTimeout(() => {
                if(index < viewCount) {
                    index = wrapper.childElementCount-1 -viewCount;
                    위치적용(false);  
                } 
                움직이는중 = false;
            }, 1000);
        }
    })

    window.addEventListener('resize', 컨텐츠크기반영)

    function 클론생성() {
    
    const firstClone = []
    const lastClone = []
    for(let i = 0; i < viewCount ; i ++) {
        firstClone.push(wrapper.children[i].cloneNode(true));
        lastClone.push(wrapper.children[wrapper.childElementCount-1-i].cloneNode(true));
        
    }
    for(let i = 0; i < viewCount ; i ++) {
        
        wrapper.appendChild(firstClone[i]);
        wrapper.insertBefore(lastClone[i], wrapper.firstElementChild);
    }
}

    function 위치적용(animation) {
        if(animation){
            wrapper.style.transition = `1s`
        }else {
            wrapper.style.transition = `none`
        }

        버튼초기화();
        
        if(index > wrapper.childElementCount - 1 - viewCount) {
            buttonContainer.firstElementChild.classList.add('active')
        }else if(index < viewCount){
            buttonContainer.lastElementChild.classList.add('active')
        }else {
            buttonContainer.children[index-viewCount].classList.add('active');
        }

        wrapper.style.transform = `translateX(-${index* (contentsWidth + gap)}px)`
    }

    function 컨텐츠크기반영(){
        contentsWidth = (slider.clientWidth - gap * (viewCount-1)) / viewCount
        
        wrapper.style.gap = `${gap}px`
        for(let i = 0 ; i < wrapper.childElementCount ; i ++) {
            wrapper.children[i].style.width = `${contentsWidth}px`
        }

        위치적용(false);
    }

    function 버튼초기화() {
        for(let j = 0 ; j < buttonContainer.childElementCount ; j ++) {
                buttonContainer.children[j].classList.remove('active');
        }
    }

    function 라디오버튼생성(){
        for(let i = 0 ; i < wrapper.childElementCount ; i++) {

            const button = document.createElement('div');

            button.classList.add('slide-button');

            buttonContainer.appendChild(button);

            button.addEventListener('click', ()=>{
                index = i+viewCount;
                위치적용(true);
            })
        }
    }
}