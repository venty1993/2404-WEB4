function makeCountup(target, 목표값, 재생시간=2, 초당프레임=60) {

    const 총프레임 = 재생시간 * 초당프레임;
    const 프레임1재생시간 = 1000 / 초당프레임

    for(let i = 0 ; i <= 총프레임 ; i ++){
        const 진행률 = i / 총프레임;
        setTimeout(() => {
            target.innerText = parseInt(목표값 * easeOutQuart(진행률)).toLocaleString();
        }, 프레임1재생시간 * i);
    }

    // easings.net 

    function easeInOutCirc(x){
        return x < 0.5
        ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
        : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
    }

    function easeOutQuart(x) {
        return 1 - Math.pow(1 - x, 4);
    } 
}