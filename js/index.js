window.onload = function() {

    var banner = document.querySelector('.banner');
    var ul = document.querySelector('.banner>ul');
    ul.style.transition = "all linear 1s";
    var bannerWith = banner.clientWidth; //或区class=banner的div宽度，其实就是屏幕宽度
    // console.log(bannerWith);
    var poX1 = poX2 = 0;
    var index = 1; //图片位置，就是图号 0-9

    var time1 = null;

    //触摸开始事件，用来获取开始触摸时的位置*
    banner.addEventListener("touchstart", function(ev) {
        poX1 = ev.changedTouches[0].clientX;
        window.clearInterval(time1);
        //拖动开始时不希望有transition效果
        ul.style.transition = "none";
    });

    //手指滑动事件(触摸点改变)
    banner.addEventListener('touchmove', function(ev) {
        var poX2 = ev.changedTouches[0].clientX;
        var distance = poX2 - poX1;
        // console.log(distance);
        var translateX = -index * bannerWith + distance;
        ul.style.transform = "translateX(" + translateX + "px)";

    });


    //触摸结束事件
    banner.addEventListener('touchend', function(ev) {
        poX2 = ev.changedTouches[0].clientX;
        var distance = poX2 - poX1;
        if (distance > 50) {
            //右划
            index--;
            // if (index < 0) {
            //     index = 8;
            // }
            // var translateX = -index * bannerWith;
            // ul.style.transform = "translateX(" + translateX + "px)";
            setUITranslateX();


        } else if (distance < -50) {
            // console.log(1);
            //左滑
            index++;
            // if (index > 9) {
            //     index = 1;}

            // var translateX = -index * bannerWith;
            // // console.log(translateX);
            // ul.style.transform = "translateX(" + translateX + "px)";
            setUITranslateX();
        } else {
            // var translateX = -index * bannerWith;
            // ul.style.transform = "translateX(" + translateX + "px)";
            setUITranslateX();
        }

        time1 = window.setInterval(autoplay, 2000);
    });


    //ul变化结束后触发该事件
    ul.addEventListener("transitionend", function() {
        if (index == 9) {
            ul.style.transition = "none";

            index = 1;
            // var translateX = -index * bannerWith;
            // ul.style.transform = "translateX(" + translateX + "px)";
            setUITranslateX();
        } else if (index == 0) {
            ul.style.transition = "none";
            index = 8;
            // var translateX = -index * bannerWith;
            // ul.style.transform = "translateX(" + translateX + "px)";
            setUITranslateX();
        }

        //实现小圆点切换
        setNavPoint();

    });
    //设置所用到的函数
    function setUITranslateX() {
        var translateX = -index * bannerWith;
        ul.style.transform = "translateX(" + translateX + "px)";
    }

    function setNavPoint() {
        document.querySelector('div.banner>div span.now').classList.remove('now');
        document.querySelector('div.banner>div span:nth-child(' + index + ')').classList.add('now');
    }


    //定时器实现轮播图自动切换

    function autoplay() {
        ul.style.transition = "all 1s";
        index++;
        // if (index >= 10) {
        //     index = 1;

        // }
        var translateX = -index * bannerWith;
        ul.style.transform = "translateX(" + translateX + "px)";



    }
    time1 = window.setInterval(autoplay, 2000);
};