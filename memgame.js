let cards;
let openedCard;
let score;
let remainPairs;
let first;
let second;

function victory(){
    $(".card-container").css("display", "none");
    $(".game-info").css("display", "none");
    $(".end-window").css("display", "block");
    $("#final-score").text(() => "Ваш итоговый счет: " + score);
}

function purgeCards(){
    $("#" + first).css("opacity", 0);
    $("#" + second).css("opacity", 0);
    $("#" + first).removeAttr("data-tid");
    $("#" + second).removeAttr("data-tid");
    cards[first].done = true;
    cards[second].done = true;
    openedCard = -1;
    if (remainPairs === 0) {
        victory();
    }
}

function hideCards(){
    $("#" + first).attr("src", "cards/Рубашка.png");
    $("#" + second).attr("src", "cards/Рубашка.png");
    $("#" + first).attr("data-tid", "Card");
    $("#" + second).attr("data-tid", "Card");
    openedCard = -1;
}

function hideField(){
    $(".card").attr("src", "cards/Рубашка.png");
    $(".card").attr("data-tid", "Card");
    $(".card").click(function(){
        if (openedCard === -2 || cards[Number(this.id)].done) {
            return;
        }
        if (openedCard === -1) {
            openedCard = Number(this.id);
            $("#" + this.id).attr("src", "cards/" + cards[openedCard].number + ".png");
            $("#" + this.id).attr("data-tid", "Card-flipped");
        } else {
            first = openedCard;
            second = Number(this.id);
            if (first === second) {
                return;
            }
            openedCard = -2;
            $("#" + this.id).attr("src", "cards/" + cards[second].number + ".png");
            $("#" + this.id).attr("data-tid", "Card-flipped");
            if (cards[first].number === cards[second].number) {
                $("#" + this.id).unbind("click");
                $("#" + first).unbind("click");
                remainPairs--;
                score += 42 * remainPairs;
                setTimeout(purgeCards, 1000);
            } else {
                score -= 42 * remainPairs;
                setTimeout(hideCards, 1000);
            }
            $("#score").text(() => "Очки: " + score);
        }
    })
}

function startGame(){
    let allCards = [2, 3, 4, 5, 6, 7, 8, 9, 0, "A", "J", "K", "Q"]
        .reduce((res, cur) => res
            .concat(["C", "D", "H", "S"].map((a) => cur + a)), []);
    cards = [];
    for (let i = 0; i < 9; i++){
        var cardNumber = Math.floor(Math.random() * allCards.length);
        cards.push( {number: allCards[cardNumber], done: false} );
        cards.push( {number: allCards[cardNumber], done: false} );
        allCards.splice(cardNumber, 1);
    }
    for (let i = 0; i < 5; i++){
        cards.sort((a, b) => Math.random() - 0.5);
    }
    for (let i = 0; i < 18; i++) {
        let tableCard = "#" + i;
        $(tableCard).attr("src", "cards/" + cards[i].number + ".png");
        $(tableCard).css("opacity", 1);
    }
    $(".card").unbind("click");
    $(".card-container").css("display", "block");
    $(".card").attr("data-tid", "Card-flipped");
    $(".game-info").css("display", "block");
    openedCard = -1;
    score = 0;
    $("#score").text(() => "Очки: " + score);
    remainPairs = 9;
    setTimeout(hideField, 5000);
}

$("#start-game").click(function(){
    $(".start-window").css("display", "none");
    startGame();
})

$("#new-game").click(function(){
    startGame();
})

$("#start-again").click(function(){
    $(".end-window").css("display", "none");
    startGame();
})

if ($(document).width() > 1000) {
    $(".start-image").attr("src", "assets/StartGame@2x.png");
    $(".end-image").attr("src", "assets/Group 2@2x.png");
} else {
    $(".start-image").attr("src", "assets/StartGame.png");
    $(".end-image").attr("src", "assets/Group 2.png");
}