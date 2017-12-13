window.onload = function(){
    var clicked = false,
        spinBtn = document.getElementById('btn-spin'),
        buttonForSpin = {
            hide: function(){
                spinBtn.style.top = '481px';
            },
            show: function(){
                spinBtn.style.top = '313px';
            },
            changeText: function(text){
                spinBtn.innerText = text;
                spinBtn.style.fontSize = '30px';
                this.show();
            }

        },
        opinion = document.getElementById('opinion'),
        opinionMethods = {
            hide: function(){
                opinion.style.opacity = 0;
            },
            show: function(){
                opinion.style.opacity = 1;
            },
            changeText: function(text){
                opinion.innerHTML = text;
                this.show();
            }
        },
        cursor = document.getElementById('cursor'),
        cursorMethods = {
            hide: function(){
                cursor.style.opacity = 0;
                cursor.style.bottom = '-25px';
                cursor.style.left = '-25px';
            },
            show: function(){
                cursor.style.opacity = 1;
                cursor.style.bottom = '40px';
                cursor.style.left = '200px';
            }
        };

    function animateJackpot(){
        var elems = document.querySelectorAll('.jackpot'),
            centerLips = document.getElementById('center-lips'),
            modalAd = document.getElementById('modal-ad'),
            logo = document.getElementById('logo'),
            playButton = document.getElementById('play-button'),
            promoText = document.getElementById('promo-text'),
            elem1 = elems[0],
            elem2 = elems[1],
            elem3 = elems[2],
            elem4 = elems[3],
            elem5 = elems[4],
            toBig = true;
        centerLips.style.display = 'block';
        elem3.style.opacity = 0;
        setInterval(function(){
            if(toBig){
                centerLips.style.transform = 'scale(1.65)';
                elem2.style.transform = 'rotate(180deg) scale(1.45)';
                elem4.style.transform = 'rotate(180deg) scale(1.45)';
                elem1.style.transform = 'rotate(180deg) scale(1.3)';
                elem5.style.transform = 'rotate(180deg) scale(1.3)';
            } else {
                centerLips.style.transform = 'scale(1.45)';
                elem2.style.transform = 'rotate(180deg) scale(1.3)';
                elem4.style.transform = 'rotate(180deg) scale(1.3)';
                elem1.style.transform = 'rotate(180deg) scale(1.15)';
                elem5.style.transform = 'rotate(180deg) scale(1.15)';
            }
            toBig = !toBig;
        }, 600);
        setTimeout(function(){
            modalAd.style.display = 'block';
            modalAd.style.opacity = 1;
        }, 1600);
        setTimeout(function(){
            logo.style.top = '19px';
            playButton.style.bottom = '35px';
            promoText.style.right = '35px';
        }, 1950);
    }

    function finishAnimation(id){
        document.querySelector('#'+ id +' .row').style.marginTop = '-50px';
        setTimeout(function(){
            document.querySelector('#'+ id +' .row').style.marginTop = '0px';
        }, 300);
    }

    function spin(id, speed, win, spins){
        document.querySelector('#'+ id +' .row').style.marginTop = '20px';
        setTimeout(function(){
            document.querySelector('#'+ id +' .row').style.marginTop = '0px';
        }, 400);
        setTimeout(function(){
            var counter = 0;
            var intervalId = setInterval(function(){
                counter++;
                var div = document.querySelector('#'+ id +' .row div');
                if(counter <= spins || win){
                    var winDiv = document.querySelectorAll('#'+ id +' .row div')[1];
                    if(win && winDiv.className === 'jackpot' && counter >= spins){
                        clearInterval(intervalId);
                        finishAnimation(id);
                        var nextAfterWin = document.querySelectorAll('#'+ id +' .row div')[2];
                        winDiv.style.position = 'absolute';
                        nextAfterWin.style.marginTop = '68px';
                    } else {
                        div.style.marginTop='-79px';
                        setTimeout(function(){
                            var container = document.querySelector('#'+ id + ' .row');
                            container.appendChild(div);
                            div.style.marginTop = '0px';
                        }, speed);
                    }
                } else {
                    clearInterval(intervalId);
                    finishAnimation(id)
                }
            }, speed * 2);
        }, 600);
    }

    spinBtn.onclick = function() {
        buttonForSpin.hide();
        opinionMethods.hide();
        if(!clicked){
            spin('third-col', 50, false, 6);
            spin('second-col', 45, false, 5);
            spin('first-col', 47, false, 9);
            spin('fourth-col', 49, false, 11);
            spin('fifth-col', 38, false, 15);
            setTimeout(function(){
                buttonForSpin.changeText('Spin Again');
                opinionMethods.changeText('Spin <br> Again');
                cursorMethods.show();
            }, 2850);
        } else {
            spin('third-col', 50, true, 6);
            spin('second-col', 45, true, 5);
            spin('first-col', 47, true, 9);
            spin('fourth-col', 49, true, 11);
            spin('fifth-col', 38, true, 15);
            setTimeout(function(){
                animateJackpot();
            }, 2000)
        }
        clicked = true;
    };

    spinBtn.onmouseover = function(){
        setTimeout(function(){
            cursorMethods.hide();
        }, 400);
    };

    setTimeout(function(){
        opinionMethods.show();
    }, 500);
    setTimeout(function(){
        cursorMethods.show();
    }, 650);
};