/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready



document.addEventListener('deviceready', onDeviceReady, false);
var jumpScore = document.getElementById("jumpScore");

var block = document.getElementById("block");
var hole = document.getElementById("hole");
var character = document.getElementById("character");
var jumping = 0;
var counter = 0;

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');

    DBMeter.start(function(dB){
        console.log(dB);
    });

    activatemic();

    /* cordova.plugins.notification.local.schedule({
        title: 'Thanks for playing Flappy Bird / Drip Ent.',
        trigger: { in: 20, unit: 'second' }
    });
    */
}

setInterval(function(){
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    if(jumping==0){
        character.style.top = (characterTop+3)+"px";
    }
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    var cTop = -(620-characterTop);
    if((characterTop>580)||((blockLeft<40)&&(blockLeft>-50)&&((cTop<holeTop)||(cTop>holeTop+210)))){

        /* 
        navigator.notification.alert(
            'You are the winner!',  // message
            alertDismissed,         // callback
            'Game Over, you made ' + counter + 'point',            // title
            'OK'                  // buttonName
        );

        cordova.plugins.notification.local.schedule({ 
            id: 1,
            title: "Game Over",
            text: "Your score is: "+counter,
            foreground: true
        });

        */
        alert("Game over. Score: "+(counter-1));
        character.style.top = 100 + "px";
        counter=0;

        /* alert introdotta dal nuovo plugin
        navigator.notification.alert(
            //Messaggio da visualizzare
            'Game over. Score: '+(counter-1),
            // callback richiamata quando si chiude la finestra dell'alert
            chiusuraAlert, //Obbligatorio
            //Titolo della finestra che viene aperta
            "Titolo Finestra",
            //testo raffigurato sopra il nome del bottone di chiusura
            'Chiudi'
            );

        */
    }
},10);

function jump(){
    jumping = 1;
    let jumpCount = 0;
    var jumpInterval = setInterval(function(){
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        if((characterTop>6)&&(jumpCount<15)){
            character.style.top = (characterTop-5)+"px";
        }
        if(jumpCount>20){
            clearInterval(jumpInterval);
            jumping=0;
            jumpCount=0;
        }
        jumpCount++;
        jumpScore.innerHTML = counter;
    },10);
}

function activatemic(){
    console.log("mic activated")
    dbmeter().resume();
    cordova.plugin.dbmeter.start(function(dB){
        if(dB>20){
            jump();
            console.log(data + " dB");
        }
    });
}

hole.addEventListener('animationiteration', () => {
    var random = -((Math.random()*300)+150);
    hole.style.top = random + "px";
    counter++;
});


