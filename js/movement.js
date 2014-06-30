function allowDrop(ev) {
    ev.preventDefault();
}

var isWhiteTurn = true;

function drag(ev) {
    ev.dataTransfer.setData("Text", ev.target.id);
    ev.dataTransfer.setData("Position", ev.target.parentNode.id);

    var ev = ev.target;

    if ((ev.id[0] === "w" && isWhiteTurn === false) || (ev.id[0] === "b" && isWhiteTurn === true)) {
        alert("Nu e rândul tău!")
        return;
    };
}

function drop(ev) {
    ev.preventDefault();

    var piece = ev.dataTransfer.getData("Text");
    var position = ev.dataTransfer.getData("Position");

    if ((ev.target.firstChild) && (ev.target.id.charAt(0) === piece[0])) {
        return;
    }

    if (!ev.target.firstChild) {
        if (mutareValida(ev.target, piece, position) === true) {
            ev.target.appendChild(document.getElementById(piece));
            isWhiteTurn = !isWhiteTurn;
        }

    } else if ((ev.target.firstChild) && (ev.target.id.charAt(0) !== piece[0])) {
        if (mutareValida(ev.target.parentNode, piece, position) === true) {
            ev.target.parentNode.appendChild(document.getElementById(piece));
            isWhiteTurn = !isWhiteTurn;
            ev.target.parentNode.removeChild(ev.target);
        }
    }
}

function mutareValida(target, piece, position) {
    var returnVal = false;

    switch (piece[1]) {
        case "R":
            returnVal = mutareTurn(target, piece, position);
            break;
        case "N":
            returnVal = mutareCal(target, piece, position);
            break;
        case "B":
            returnVal = mutareNebun(target, piece, position);
            break;
        case "Q":
            returnVal = mutareRegina(target, piece, position);
            break;
        case "K":
            returnVal = mutareRege(target, piece, position);
            break;
        case "P":
            returnVal = mutarePion(target, piece, position);
            break;
    };

    return returnVal;
}

function mutarePion(target, piece, position, ev) {
    var x = position[0];
    var xi = x.charCodeAt(0)
    var xx = target.id[1];
    var xf = xx.charCodeAt(0);
    var xd = xf - xi;

    var y = position[1];
    var yi = y.charCodeAt(0);
    var yy = target.id[0];
    var yf = yy.charCodeAt(0);
    var yd = Math.abs(yf - yi);

    var z = target.childNodes.length



    /*if ((piece[0] === 'w') && (z === 0) && (x == 2) && (xd === 2) || (xd === 1) && (yd === 0)) {
        return true;
    }

    if ((piece[0] === 'w') && (z === 1) && (yd === 1) && (xd === 1)) {
        return true;
    }

    if ((piece[0] === 'b') && (z === 0) && (x == 7) && (xd === -2) || (xd === -1) && (yd === 0)) {
        return true;
    }

    if ((piece[0] === 'b') && (z === 1) && (yd === 1) && (xd === -1)) {
        return true;
    }
    return false;*/

    return true;
}

function mutareTurn(target, piece, position) {
    var x = position[0];
    var xi = x.charCodeAt(0);
    var xx = target.id[0]
    var xf = xx.charCodeAt(0);

    var y = position[1];
    var yi = y.charCodeAt(0);
    var yy = target.id[1];
    var yf = yy.charCodeAt(0);

    if ((xi !== xf) && (yi !== yf)) {
        return false;
    }
    if (xi === xf) {
        var i = yf > yi ? yi + 1 : yf + 1;
        var l = yf > yi ? yf : yi;
        var domEl = null;

        for (i; i < l; i++) {
            domEl = document.querySelector('#' + String.fromCharCode(xi) + String.fromCharCode(i));
            if (domEl.childNodes.length) {
                return false;
            };
        }
    }

    if (yi === yf) {
        var i = xf > xi ? xi + 1 : xf + 1;
        var l = xf > xi ? xf : xi;
        var domEl = null;

        for (i; i < l; i++) {
            domEl = document.querySelector('#' + String.fromCharCode(i) + String.fromCharCode(yi));
            if (domEl.childNodes.length) {
                return false;
            };
        }
    }
    return true;
}

function mutareNebun(target, piece, position) {
    var x = position[0];
    var xi = x.charCodeAt(0);
    var xx = target.id[0];
    var xf = xx.charCodeAt(0);
    var xd = Math.abs(xf - xi);

    var y = position[1];
    var yi = y.charCodeAt(0);
    var yy = target.id[1];
    var yf = yy.charCodeAt(0);
    var yd = Math.abs(yf - yi);

    if (xd !== yd) {
        return false;
    }

    if (xd === yd) {
        var i = yf > yi ? yi + 1 : yf + 1;
        var l = xf > xi ? xf : xi;
        var j = xf > xi ? xi + 1 : xf + 1;
        var domEl = null;
        
        
        for (i, j; i, j < l; i++, j++) {
            domEl = document.querySelector('#' + String.fromCharCode(j) + String.fromCharCode(i));
            console.log('#' + String.fromCharCode(j) + String.fromCharCode(i));
            if (domEl.childNodes.length) {
                return false;
            };
        }
    }

    if (xd !== yd) {
        if (xf > xi) {
            var i = xi + 1;
            var l = xf;
            var j = yi - 1;
            var domEl = null;

            for (i, j; i < l; i++, j--) {
                console.log(String.fromCharCode(i) + '   ' + j);
                domEl = document.querySelector('#' + String.fromCharCode(i) + String.fromCharCode(j));
                console.log(domEl);
                if (domEl.childNodes.length) {
                    return false;
                };
            }
        }

        if (yf > yi) {
            var i = xi - 1;
            var l = yf;
            var j = yi + 1;
            var domEl = null;

            for (i, j; j < l; i--, j++) {
                domEl = document.querySelector('#' + String.fromCharCode(j) + String.fromCharCode(i));
                if (domEl.childNodes.length) {
                    return false;
                };
            }
        }
    }
    return true;
}


function mutareRegina(target, piece, position) {
    var x = position[0];
    var xi = x.charCodeAt(0);
    var xx = target.id[0];
    var xf = xx.charCodeAt(0);
    var xd = Math.abs(xf - xi);

    var y = position[1];
    var yi = y.charCodeAt(0);
    var yy = target.id[1];
    var yf = yy.charCodeAt(0);
    var yd = Math.abs(yf - yi);

    if ((xd !== yd) && (xi !== xf) && (yi !== yf)) {
        return false;
    }

    if ((xi !== xf) && (yi !== yf)) {
        return false;
    }

    if (xi === xf) {
        var i = yf > yi ? yi + 1 : yf + 1;
        var l = yf > yi ? yf : yi;
        var domEl = null;

        for (i; i < l; i++) {
            domEl = document.querySelector('#' + String.fromCharCode(xi) + String.fromCharCode(i));
            if (domEl.childNodes.length) {
                return false;
            };
        }
    }

    if (yi === yf) {
        var i = xf > xi ? xi + 1 : xf + 1;
        var l = xf > xi ? xf : xi;
        var domEl = null;

        for (i; i < l; i++) {
            domEl = document.querySelector('#' + String.fromCharCode(i) + String.fromCharCode(yi));
            if (domEl.childNodes.length) {
                return false;
            };
        }
    }

    if (xd === yd) {
        var i = yf > yi ? yi + 1 : yf + 1;
        var l = xf > xi ? xf : xi;
        var j = xf > xi ? xi + 1 : xf + 1;
        var domEl = null;

        for (i, j; i, j < l; i++, j++) {
            domEl = document.querySelector('#' + String.fromCharCode(j) + String.fromCharCode(i));
            if (domEl.childNodes.length) {
                return false;
            };
        }
    }

    if ((xd !== yd) && (xf !== xi) && (yf !== yi)) {
        if (xf > xi) {
            var i = xi + 1;
            var l = xf;
            var j = yi - 1;
            var domEl = null;

            for (i, j; i < l; i++, j--) {
                console.log(String.fromCharCode(i) + '   ' + j);
                domEl = document.querySelector('#' + String.fromCharCode(i) + String.fromCharCode(j));
                console.log(domEl);
                if (domEl.childNodes.length) {
                    return false;
                };
            }
        }

        if (yf > yi) {
            var i = xi - 1;
            var l = yf;
            var j = yi + 1;
            var domEl = null;

            for (i, j; j < l; i--, j++) {
                domEl = document.querySelector('#' + String.fromCharCode(j) + String.fromCharCode(i));
                if (domEl.childNodes.length) {
                    return false;
                };
            }
        }
    }
    return true;
}

function mutareCal(target, piece, position) {
    var x = position[0];
    var xi = x.charCodeAt(0);
    var xx = target.id[0];
    var xf = xx.charCodeAt(0);
    var xd = Math.abs(xf - xi);

    var y = position[1];
    var yi = y.charCodeAt(0);
    var yy = target.id[1];
    var yf = yy.charCodeAt(0);
    var yd = Math.abs(yf - yi);

    if ((xd === 2) && (yd !== 1) || (yd === 2) && (xd !== 1) || (xd === 1) && (yd !== 2) || (yd === 1) && (xd !== 2) || xd > 2 || yd > 2) {
        return false;
    }
    return true;
}

function mutareRege(target, piece, position) {
    var x = position[0];
    var xi = x.charCodeAt(0);
    var xx = target.id[0];
    var xf = xx.charCodeAt(0);
    var xd = Math.abs(xf - xi);

    var y = position[1];
    var yi = y.charCodeAt(0);
    var yy = target.id[1];
    var yf = yy.charCodeAt(0);
    var yd = Math.abs(yf - yi);

    if ((xd > 1) || (yd > 1)) {
        return false;
    }
    return true;
}

function isAttacked(destinationSquare, attackerColor) {

    var el = document.querySelector('#' + destinationSquare);
    var pawnLine = +destinationSquare[1],
        currentCol = destinationSquare.charCodeAt(0),
        currentColBkp = currentCol,
        squareToAttack = null;

    if (attackerColor === 'b') {
        ++pawnLine;
        currentCol = String.fromCharCode(--currentColBkp);
        squareToAttack = document.querySelector('#' + currentCol + pawnLine);

        if (squareToAttack.childNodes.length !==0 && squareToAttack.childNodes[0].id.indexOf('bP') !== -1) {
            return true;
        }

        currentCol = String.fromCharCode(++currentColBkp);
        squareToAttack = document.querySelector('#' + currentCol + pawnLine);

        if (squareToAttack.childNodes.length !==0  && squareToAttack.childNodes[0].id.indexOf('bP') !== -1) {
            return true;
        }
    }
}

function isSquareAttackedByQueenRook(destinationSquare, attackerColor) {
    
    var pieceLine = +destinationSquare[1],               // y
        currentCol = destinationSquare.charCodeAt(o),   // x
        currentColBkp = currentCol,
        possibleCols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
        squareToAttack = null,
        pieceIndex = ["R","Q"];

         //Verifica la dreapta!
        for (var i=currentCol+1, l= 'h'.charCodeAt(o); i<=l; i++){
            squareToAttack = document.querySelector('#' + String.fromCharCode(i) + pieceLine);
            console.log(squareToAttack);

            if(squareToAttack.childNodes.length !== 0){                               //daca are copil
                if(squareToAttack.childNodes[0].id.indexOf(attackerColor)=== -1){       // daca e de aceeasi culoare
                    return false;
                }

                if(squareToAttack.childNodes[0].id.indexOf(attackerColor)!== -1){ //daca e de culoare opusa
                    for(var i=0, l=pieceIndex.length; i<l; i++){ //pentru fiecare element din pieceIndex
                        if(squareToAttack.childNodes[0].id.indexOf(pieceIndex[i])!== -1){ //daca elementul din pieceIndex se afla in id-ul piesei 
                            return true;
                        }
                        
                    }
                }
                else{
                     break;
                }
            }
        }

        //Verifica la stanga!

        for (var i=currentCol-1, l= 'a'.charCodeAt(o); i>=l; i--){
            squareToAttack = document.querySelector('#' + String.fromCharCode(i) + pieceLine);
            console.log(squareToAttack);
           

            if(squareToAttack.childNodes.length !== 0){                               //daca are copil
                if(squareToAttack.childNodes[0].id.indexOf(attackerColor)=== -1){       // daca e de aceeasi culoare
                    return false;
                }

                if(squareToAttack.childNodes[0].id.indexOf(attackerColor)!== -1){ //daca e de culoare opusa
                    for(var i=0, l=pieceIndex.length; i<l; i++){ //pentru fiecare element din pieceIndex
                        if(squareToAttack.childNodes[0].id.indexOf(pieceIndex[i])!== -1){ //daca elementul din pieceIndex se afla in id-ul piesei 
                            return true;
                        }
                        
                    }
                }
                else{
                     break;
                }
            }
        }

        //Verifica in sus

        for (var i=pieceLine+1, l=8; i<=l; i++){
            squareToAttack = document.querySelector('#' + String.fromCharCode(currentCol) + i);
            console.log(squareToAttack);

             if(squareToAttack.childNodes.length !== 0){                               //daca are copil
                if(squareToAttack.childNodes[0].id.indexOf(attackerColor)=== -1){       // daca e de aceeasi culoare
                    return false;
                }

                if(squareToAttack.childNodes[0].id.indexOf(attackerColor)!== -1){ //daca e de culoare opusa
                    for(var i=0, l=pieceIndex.length; i<l; i++){ //pentru fiecare element din pieceIndex
                        if(squareToAttack.childNodes[0].id.indexOf(pieceIndex[i])!== -1){ //daca elementul din pieceIndex se afla in id-ul piesei 
                            return true;
                        }
                        
                    }
                }
                else{
                     break;
                }
            }
        }

        //Verifica in jos

        for (var i=pieceLine-1, l= 1; i>=l; i--){
            squareToAttack = document.querySelector('#' + String.fromCharCode(currentCol) + i);
            console.log(squareToAttack);

            if(squareToAttack.childNodes.length !== 0){                               //daca are copil
                if(squareToAttack.childNodes[0].id.indexOf(attackerColor)=== -1){       // daca e de aceeasi culoare
                    return false;
                }

               if(squareToAttack.childNodes[0].id.indexOf(attackerColor)!== -1){ //daca e de culoare opusa
                    for(var i=0, l=pieceIndex.length; i<l; i++){ //pentru fiecare element din pieceIndex
                        if(squareToAttack.childNodes[0].id.indexOf(pieceIndex[i])!== -1){ //daca elementul din pieceIndex se afla in id-ul piesei 
                            return true;
                        }
                        
                    }
                }
                else{
                     break;
                }
            }
        }


    return false;
}

/*var isAttacked = isSquareAttackedByRookQueen('d', 'w');
console.log('Is square attacked by RookQueen?', isAttacked);*/

function isSquareAttackedByQueenBishop(destinationSquare, attackerColor) {
    var pieceLine = +destinationSquare[1],               // y
        currentCol = destinationSquare.charCodeAt(o),   // x
        currentColBkp = currentCol,
        possibleCols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
        squareToAttack = null,
        pieceIndex = ["B","Q"];

    //verifica diagonala dreapta sus
    for (var i=currentCol+1, 
             j=pieceLine+1,
             l= 'h'.charCodeAt(o);
             i<=l; i++,j++){

            squareToAttack = document.querySelector('#' + String.fromCharCode(i) + j);
            console.log(squareToAttack);

            if(squareToAttack.childNodes.length !== 0){                               //daca are copil
                if(squareToAttack.childNodes[0].id.indexOf(attackerColor)=== -1){       // daca e de aceeasi culoare
                    return false;
                }

                if(squareToAttack.childNodes[0].id.indexOf(attackerColor)!== -1){ //daca e de culoare opusa
                    for(var i=0, l=pieceIndex.length; i<l; i++){ //pentru fiecare element din pieceIndex
                        if(squareToAttack.childNodes[0].id.indexOf(pieceIndex[i])!== -1){ //daca elementul din pieceIndex se afla in id-ul piesei 
                            return true;
                        }
                        
                    }
                }
                else{
                     break;
                }
            }
        }

    //verifica diagonala dreapta jos
     for (var i=currentCol+1, 
             j=pieceLine-1,
             l= 'h'.charCodeAt(o);
             i<=l; i++,j--){

            squareToAttack = document.querySelector('#' + String.fromCharCode(i) + j);
            console.log(squareToAttack);

            if(squareToAttack.childNodes.length !== 0){                               //daca are copil
                if(squareToAttack.childNodes[0].id.indexOf(attackerColor)=== -1){       // daca e de aceeasi culoare
                    return false;
                }

                if(squareToAttack.childNodes[0].id.indexOf(attackerColor)!== -1){ //daca e de culoare opusa
                    for(var i=0, l=pieceIndex.length; i<l; i++){ //pentru fiecare element din pieceIndex
                        if(squareToAttack.childNodes[0].id.indexOf(pieceIndex[i])!== -1){ //daca elementul din pieceIndex se afla in id-ul piesei 
                            return true;
                        }
                        
                    }
                }
                else{
                     break;
                }
            }
        }

    //verifica diagonala stanga jos
    for (var i=currentCol-1, 
             j=pieceLine-1,
             l= 'h'.charCodeAt(o);
             i<=l; i--,j++){

            squareToAttack = document.querySelector('#' + String.fromCharCode(i) + j);
            console.log(squareToAttack);

            if(squareToAttack.childNodes.length !== 0){                               //daca are copil
                if(squareToAttack.childNodes[0].id.indexOf(attackerColor)=== -1){       // daca e de aceeasi culoare
                    return false;
                }

                if(squareToAttack.childNodes[0].id.indexOf(attackerColor)!== -1){ //daca e de culoare opusa
                    for(var i=0, l=pieceIndex.length; i<l; i++){ //pentru fiecare element din pieceIndex
                        if(squareToAttack.childNodes[0].id.indexOf(pieceIndex[i])!== -1){ //daca elementul din pieceIndex se afla in id-ul piesei 
                            return true;
                        }
                        
                    }
                }
                else{
                     break;
                }
            }
        }

        //verifca diagonala stanga sus

        for (var i=currentCol-1, 
             j=pieceLine+1,
             l= 'h'.charCodeAt(o);
             i<=l; i--,j++){

            squareToAttack = document.querySelector('#' + String.fromCharCode(i) + j);
            console.log(squareToAttack);

            if(squareToAttack.childNodes.length !== 0){                               //daca are copil
                if(squareToAttack.childNodes[0].id.indexOf(attackerColor)=== -1){       // daca e de aceeasi culoare
                    return false;
                }

                if(squareToAttack.childNodes[0].id.indexOf(attackerColor)!== -1){ //daca e de culoare opusa
                    for(var i=0, l=pieceIndex.length; i<l; i++){ //pentru fiecare element din pieceIndex
                        if(squareToAttack.childNodes[0].id.indexOf(pieceIndex[i])!== -1){ //daca elementul din pieceIndex se afla in id-ul piesei 
                            return true;
                        }
                        
                    }
                }
                else{
                     break;
                }
            }
        }
function isSquareAttacked(destinationSquare,attackerColor){
    return(isSquareAttackedByQueenBishop||
        isSquareAttackedByQueenRook

        )
}