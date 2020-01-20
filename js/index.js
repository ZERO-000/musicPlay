window.onresize = function BH(nowBH){
    var  nowBH = document.body.offsetHeight;
    let main  = document.getElementById('main');
    var aa = parseInt(getComputedStyle(main).top);
    if (aa < 0) {
        main.style.top = - (nowBH-60) + 'px';
        MTHeight();
    }
}

var openSidebar = document.getElementById('open')
var closeSidebar = document.getElementById('close')
var sidebar = document.getElementsByClassName('sidebar')[0]
var main = document.getElementById('main')
var bodyW = document.body.clientWidth;
console.log(bodyW)
openSidebar.onclick = function(){  
    sidebar.style.width = 62 + '%';
    main.style.marginLeft = 62 +'%';
    document.body.style.backgroundColor = 'rgba(0,0,0,.4)'
}


closeSidebar.onclick = function (){
    sidebar.style.width = 0;
    main.style.marginLeft = 0;
    console.log(231321)
    document.body.style.backgroundColor = '#fff';
}

var onoffb = true;
document.getElementById('onbttom').onclick = function(){
    MTHeight();
    let bodyH = document.body.offsetHeight;
    let frontCover = document.getElementsByClassName('frontCover')[0];
    let centext = document.getElementsByClassName('centext')[0];
    let controls = document.getElementsByClassName('controls')[0];
    let musicbox = document.getElementsByClassName('musicbox')[0];
    if (onoffb) {
        main.style.top = - (bodyH-60) + 'px';
        musicbox.style.display = 'block';
        frontCover.style.opacity = 0;
        centext.style.opacity = 0;
        controls.style.opacity = 0;
        onoffb = false;
        controls.addEventListener('transitionend',function(){
            this.style.display = 'none'
        });
    } else {
        main.style.top =  0 + 'px';
        frontCover.style.opacity = 1;
        centext.style.opacity = 1;
        musicbox.style.display = "none"
        controls.style.opacity = 1;
        controls.style.display = 'block'
        controls.addEventListener('transitionend',function(){
            this.style.display = 'block'
        });
        onoffb = true;
    }
}



// var play_pause = document.getElementById('play-pause')
var audio = document.getElementById('audio')
var play_pause = document.querySelectorAll('.play-pause');
var timer;
play_pause[0].onclick = function(){
    playmusic();
}
play_pause[1].onclick = function(){
    playmusic();
}



var moved = document.querySelectorAll('.time_bar>span');
moved[1].addEventListener("touchstart", function(e){
    moved[1].addEventListener("touchmove",function(e){
        var bw = moved[1].offsetParent.offsetWidth;
        var x = Math.floor(e.changedTouches[0].clientX);
        var a = x - moved[1].offsetParent.offsetLeft;
        // console.log(a)
        // console.log(x)
        // console.log(bw)
        moved[1].style.marginLeft = a +'px';
        moved[0].style.width = a + 'px';
        if (a <= 0) {
            let a = 0;
            moved[1].style.marginLeft = a +'px';
            moved[0].style.width = a + 'px';
        }
        if (a > bw) {
            let a = bw;
            moved[1].style.marginLeft = a +'px';
            moved[0].style.width = a + 'px';
        }                      
        var b = parseInt(getComputedStyle(moved[1]).marginLeft) / moved[1].offsetParent.offsetWidth
        var c = b * audio.duration;
        audio.currentTime = c;
        console.log(c)
        timeBar();
    })
})
// moved[1].onmousedown = function(e){
//     document.onmousemove = function(e){
//         var x = e.clientX;
//         var a = x - moved[1].offsetParent.offsetLeft;
//         console.log(x)
//         console.log(a)
//         moved[1].style.marginLeft = a +'px';
//         moved[0].style.width = a + 'px';
//     }
// }




document.getElementsByClassName('data_cover')[0].onclick = function(){
    this.style.opacity = 0;
    // console.log(this.parentNode.children[1])
    this.parentNode.children[1].style.zIndex = 0;
}
document.getElementsByClassName('lyric')[0].onclick = function(){
    this.style.zIndex = -1;
    this.parentNode.children[0].style.opacity = 1;
}



var secondArr=[];
//歌词内容数组
var lyrArr=[];
loadLrc();




function loadLrc() {
    var lyrics = document.getElementsByClassName('lyric')[0]
    var lyricsmove = document.getElementsByClassName('lyricmove')[0] 
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var timeArr=[];
            var data =JSON.parse(this.responseText);
            console.log(data)
            let music_list = document.getElementsByClassName('music_list')[0];
            for (let i = 0; i < data.length; i++) {
                var songname  = data[i].songName;
                var name = data[i].singer;
                var ssrc = data[i].songSrc;
                var frontCover = data[i].poster;
                music_list.innerHTML += '<li data-src= "'+   ssrc   + '" data-img-src="'+ frontCover + '">'+ '<h3>'+ songname+'</h3>' + '<sub>'+ name+'</sub>' +'</li>'
                console.log(songname) 
            }
            



            
            var tempArr  = data[0]["lyric"].split("\n");


            // console.log(tempArr)

            for(var i=0;i<tempArr.length;i++){
                var a = tempArr[i].split(']')
                var str = '';
                // //歌词时间数组
                // timeArr.push(tempArr[i].substring(1, 9));
                // //歌词内容数组
                // lyrArr.push(tempArr[i].substring(10));
                // console.log(a);
                var t = a[0].split('[')[1];
                var b = a[1];
                //console.log(b)
                var q = t.split('.')[0].split(':');
                var n = q[0] * 60 + Number(q[1]);
                
                str = '<p id="s'+n+'">' + b + '</p>';
                lyricsmove.innerHTML += str;

                //console.log(n);
            }
            // for(var i=0;i<lyrArr.length;i++){
            //     var p = document.createElement('p');
            //     p.innerHTML=lyrArr[i];
                
            //     lyrics.append(p);
            // }
            // var m=0,s=0;
     		// for(var i=0;i<timeArr.length;i++){
     		// 	m=parseInt(timeArr[i].substring(0,2));
     		// 	s=parseInt(timeArr[i].substring(3));
     			
     		// 	console.log(secondArr[i]=m*60+s);
            //  }

            document.querySelectorAll('.music_list li')[0].className='active'
            active();
        }
    }
    xhttp.open("GET", "data/data.json", true);
    xhttp.send();
} 



var songIndex = 0;

function active(){
    var li = document.querySelectorAll('.music_list li');


        for (var i = 0; i < li.length; i++){
            li[i].index=i;
            li[i].onclick = function () {
                index = 0;
                console.log(songIndex);
                document.getElementsByClassName('lyricmove')[0].style.top = 0
                str = ' ';
                document.getElementsByClassName('lyricmove')[0].innerHTML = str;
                console.log(str);
                var index1 = this.index;
                songIndex = index1;
                let name = this.innerHTML;
                let getsongSrc = this.getAttribute('data-src');
                let getsongImg = this.getAttribute('data-img-src');
                let centext = document.getElementsByClassName('centext')[0];
                let info = document.getElementById('info');
                let frontCover = document.getElementsByClassName('frontCover')[0];
                let data_cover = document.getElementsByClassName('data_cover')[0];
                info.innerHTML = name;
                centext.innerHTML = name;
                audio.setAttribute('src',getsongSrc);
                console.log(getsongImg)
                frontCover.style.backgroundImage = "url(" + getsongImg+")";
                data_cover.style.backgroundImage = "url(" + getsongImg+")";
                for (var i = 0; i < li.length; i++) li[i].className = '';
                this.className='active';
                var lyrics = document.getElementsByClassName('lyric')[0]
                var lyricsmove = document.getElementsByClassName('lyricmove')[0] 
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        var data =JSON.parse(this.responseText);
                        console.log(data)
                        var tempArr  = data[index1]["lyric"].split("\n");
                        for(var i=0;i<tempArr.length;i++){
                            var a = tempArr[i].split(']')
                            str = '';
                            var t = a[0].split('[')[1];
                            var b = a[1];
                            var q = t.split('.')[0].split(':');
                            var n = q[0] * 60 + Number(q[1]);
                            str = '<p id="s'+n+'">' + b + '</p>';
                            lyricsmove.innerHTML += str;
                        }
                    }
                }
                xhttp.open("GET", "data/data.json", true);
                xhttp.send();


                playmusic();
            }
        }
}





var index = 0;



function timeBar(){
    // let audio = document.getElementById('audio');
    let time_bar = document.getElementsByClassName('time_bar')[0];
    // let a = audio.currentTime;
    let totalTime = audio.duration;
    // let c = time_bar.offsetWidth;
    var n = audio.currentTime / totalTime;
    moved[1].style.marginLeft = Math.floor(n * time_bar.offsetWidth) + 'px';
    moved[0].style.width = Math.floor(n * time_bar.offsetWidth) + 'px';
}



function playmusic(){
    let play_pause = document.querySelectorAll('.play-pause');
    if (audio.paused) {
        audio.play();
        for (let i = 0; i < play_pause.length; i++) {
            play_pause[i].style.backgroundImage = "url(./img/pause.png)"
        }
        timer = setInterval(timeBar,1000);
    }else{
        audio.pause();
        for (let i = 0; i < play_pause.length; i++) {
            play_pause[i].style.backgroundImage = "url(./img/play_pause.png)"
        }
        clearInterval(timer)
    }
    audio.addEventListener('ended',function(){
        for (let i = 0; i < play_pause.length; i++) {
            play_pause[i].style.backgroundImage = "url(./img/play_pause.png)";
            document.getElementsByClassName('lyricmove')[0].style.top = 0;
        }
    })
    audio.addEventListener('timeupdate',function(){
        var a = parseInt(audio.currentTime);
        // console.log(a)
        // console.log(index)
        if(document.getElementById('s'+a)){
            document.getElementById('s'+index).style.color = '#000';
            document.getElementById('s'+index).style.backgroundColor = '#fff';
            index = a;
            document.getElementById('s'+a).style.color = '#6e54b6';
            document.getElementById('s'+a).style.backgroundColor = '#eaea88';    
            document.getElementsByClassName('lyricmove')[0].style.top = -(document.getElementById('s'+a).offsetTop)+ 'px'
        }
        moved[1].addEventListener("touchend",function() {       
            document.getElementsByClassName('lyricmove')[0].style.top = -(document.getElementById('s'+a).offsetTop)+ 'px'
        });  
    })
}


document.getElementsByClassName('backward')[0].onclick = function(){   
    prevplay()
}


document.getElementsByClassName('forword')[0].onclick = function(){   
    nextplay();
}
document.getElementsByClassName('forword')[1].onclick = function(){   
    nextplay();
}

function prevplay(){
    songIndex = songIndex-1;
    var li = document.querySelectorAll('.music_list li');
    for (var i = 0; i < li.length; i++) {
        li[i].className = '';
        if(songIndex < 0){
            songIndex = li.length-1;
            li[songIndex].className='active';
            changetext();
        }else{
            li[songIndex].className='active';
            changetext();
        }
    }
}

function nextplay(){
    songIndex = songIndex+1;
    var li = document.querySelectorAll('.music_list li');
    for (var i = 0; i < li.length; i++) {
        li[i].className = '';
        if(songIndex >= li.length){
            songIndex = 0;
            li[songIndex].className='active';
            changetext();
        }else{
            li[songIndex].className='active';
            changetext();
        }
    }
}




function changetext(){
    var li = document.querySelectorAll('.music_list li');
    let name = li[songIndex].innerHTML;
    let getsongSrc = li[songIndex].getAttribute('data-src');
    let getsongImg = li[songIndex].getAttribute('data-img-src');
    let centext = document.getElementsByClassName('centext')[0];
    let info = document.getElementById('info');
    let frontCover = document.getElementsByClassName('frontCover')[0];
    let data_cover = document.getElementsByClassName('data_cover')[0];
    info.innerHTML = name;
    centext.innerHTML = name;
    audio.setAttribute('src',getsongSrc);
    console.log(getsongImg)
    frontCover.style.backgroundImage = "url(" + getsongImg+")";
    data_cover.style.backgroundImage = "url(" + getsongImg+")";


    document.getElementsByClassName('lyricmove')[0].style.top = 0
    str = ' ';
    document.getElementsByClassName('lyricmove')[0].innerHTML = str;
    var lyrics = document.getElementsByClassName('lyric')[0]
    var lyricsmove = document.getElementsByClassName('lyricmove')[0] 
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data =JSON.parse(this.responseText);
            console.log(data)
            var tempArr  = data[songIndex]["lyric"].split("\n");
            for(var i=0;i<tempArr.length;i++){
                var a = tempArr[i].split(']')
                str = '';
                var t = a[0].split('[')[1];
                var b = a[1];
                var q = t.split('.')[0].split(':');
                var n = q[0] * 60 + Number(q[1]);
                str = '<p id="s'+n+'">' + b + '</p>';
                lyricsmove.innerHTML += str;
            }
        }
    }
    xhttp.open("GET", "data/data.json", true);
    xhttp.send();


    playmusic();
}




function MTHeight(){
    var mainh3H = document.getElementsByTagName('h3')[0].offsetHeight;
    var  musicbox = document.getElementsByClassName('musicbox')[0];
    var bodyH = document.body.offsetHeight;
    console.log(bodyW)
    musicbox.style.marginTop = (bodyH - mainh3H) + 'px';
}


