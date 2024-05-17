
//改善点：クリックするたびにajax.jsonにアクセスしてデータを取得している
//対処：ajax.jsonから取得したデータを格納するために変数を追加(*1)
//データを取得する処理(*2)、クリックされた時の処理を記述する。(*3)

let number = 0;
let data = []; //*1

const titleArea = document.getElementById("title");
const contentArea = document.getElementById("content");
const videoArea = document.getElementById("video");
const button = document.getElementById('btn');

function getData() { //*2
    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status == 200) {
                data =(request.response); //レスポンスをdataに
            }
        }
    };
    request.open("GET", "ajax.json");
    request.responseType = "json";
    request.send();
}

function changeVideo() { //*3
    button.addEventListener('click', e => {
        if (data.length === 0) {
            getData();
        } else {
            titleArea.innerHTML = data[number].title; //dataに変更→dateにするな
            contentArea.innerHTML = data[number].content; 
            videoArea.setAttribute("src", data[number].url); 
            number == 2 ? number = 0 : number++;
        }
    });
}

window.onload = changeVideo;

/*　元のやつ
let number = 0;
const titleArea = document.getElementById("title");
const contentArea = document.getElementById("content"); //--2
const videoArea = document.getElementById("video"); //--2
const button = document.getElementById('btn'); //--3

function getData() {
    button.addEventListener('click', e => { //--4
        const request = new XMLHttpRequest();
        
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    
titleArea.innerHTML = request.response[number].title; //--5
contentArea.innerHTML = request.response[number].content; //--5
videoArea.setAttribute("src", request.response[number].url); //--6
number == 2 ? number = 0 : number++; //--7
                }
            }
        }
request.open("GET", "ajax.json");
request.responseType = "json";
request.send(null);
    })
}

window.onload = getData;

//Jquery版
$(function () {
    const button = $("#btn");
    const videoArea = $("#video");
    const titleArea = $("#title");
    const contentArea = $("#content");
    let number = 0;

    function getData() {
        button.click(function () {
            $.ajax('ajax.json', {
                type: 'GET',
                success: function (data) {
                    titleArea.html(data[number].title);
                    contentArea.html(data[number].content);
                    videoArea.attr('src', data[number].url);
                    number == 2 ? number = 0 : number++;
                },
            })
        });
    };

    getData();
})
*/