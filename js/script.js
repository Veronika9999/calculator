let input = document.querySelector('input');
let body = document.querySelector('body');
let buttons = document.querySelector('.buttons');// див в которой попали все кнопки
let del = document.querySelector('.del'); // кнопка удаления
let mathSimvolAll = document.querySelectorAll('.math-simvol'); // все кнопки с матем. символами
let division = document.querySelector('.division');// кнопка деление
let multiplication = document.querySelector('.multiplication'); // умножение 
let minus = document.querySelector('.minus');
let plus = document.querySelector('.plus');
let equals = document.querySelector('.equals');// равно 
let comma = document.querySelector('.comma');// запятая 
let plusMinusActive = false;
let MathsimvolActive = false; // переменная которая показывает нажата ли кнопка с матем. символом
let numberA = ''; //первое число
console.log(numberA)
let numberB; // второе число
let MathSimvol; // переменная в которую попадает выбранный матем. символ
let mainRemainder;
let littleRemainder; //переменная в которую попадает меньший остаток
body.style.setProperty('--size', (88) + 'px'); // устанавливаем изначальный размер шрифта

buttons.onclick = function (e) { //если мы нажали на область с кнопками, запускается функция
    let button = e.target; // переменная именно с той кнопкой на которую мы нажали
    if (button.classList.contains('buttons__item_dark')) {//если нажали на цифры
        if(input.value.length != 10){
            if (input.value == '0') {// если в инпут вписан 0
                if (button.classList.contains('comma')) { // если мы нажали на запятую
                    input.value = '0.'; // тогда вписывается ноль с запятой
                } else { // если мы нвжвли не на запятую, а на цифру
                    input.value = button.innerHTML; // тогда нолик удаляется и вписывается цифра на которую нажали
                }
            }else if (input.value == '-0'){
                input.value = '-0.';
            }
             else { // если в инпуте не ноль 
                if (MathsimvolActive == true) { // если до этого мы нажали на какую то кнопку с матем символом
                    input.value = button.innerHTML; // тогда в инпут вписывается цифра на которую мы нажали 
                    MathsimvolActive = false;// отключаем переменную 
                    for (let e = 0; e < 4; e++) {  // цикл повторять 4 раза
                        mathSimvolAll[e].classList.remove('math-simvol_active'); //удаляем класс чтобы кнопка потухла
                    }
                } else { //  если до этого мы не нажали на какую то кнопку с матем символом
                    input.value = input.value + button.innerHTML;// в инпут добавляется число на которое мы нажали 
                }
            }
        }
        del.innerHTML = 'C'; // в кнопке удаление меняем АС на С
    }


    if (button.classList.contains('del')) {//если нажали на удаление
        if (del.innerHTML == 'C') { // если в кнопке написано С
            if(MathsimvolActive == true ){ // если до этого мы нажали на кнопку с матем символом
                for (let e = 0; e < 4; e++) { //цикл повторять  4 раза
                    mathSimvolAll[e].classList.remove('math-simvol_active'); // удаляем класс чтобы кнопка потухла
                }
                MathsimvolActive = false;
            }else{//если математ символ не активен
                input.value = input.value.substring(0, input.value.length - 1) // удаляем последний символ
            }
        }
        if (input.value.length < 1) { // если мы удалили все числа
            input.value = '0';// то вписываем нолик
            del.innerHTML = 'AC';
        }
    }


    if (button.classList.contains('math-simvol')) { // если мы нажали на матем символ
        button.classList.add('math-simvol_active'); // то этому символу добалвяется класс 
        numberA = Number(input.value); // формируется первое число , туда попадает то что вписано в инпуте 
        MathsimvolActive = true;
        MathSimvol = button.value;// в переменую помещаем валуе кнопки на котроую нажали
    }
    if (button.classList.contains('equals')){
        numberB = Number(input.value); // присваиваеваем к переменной новое число
        let remainderA = numberA.toString().match(/\.(\d+)/)?.[1].length;// создаём переменную в которую попадает длина остатка numberA 
        let remainderB = numberB.toString().match(/\.(\d+)/)?.[1].length;// создаём переменную в которую попадает длина остатка numberВ 
        if (remainderA == undefined){
            remainderA = 0;
        }
        if (remainderB == undefined){
            remainderB = 0;
        }
        if(remainderA > remainderB){ // условие если остаток первого числа больше второго
            mainRemainder = remainderA; // то перезаписываем остаток ответа, в главный осток попадает остаток певрого числа
            littleRemainder = remainderB;
        }else{
            mainRemainder = remainderB; // иначе в главный остаток попадает остаток второго числа
            littleRemainder = remainderA;
        }
        if (MathSimvol == "+") { // если мат.симввол равен +
            input.value = (numberA + numberB).toFixed(mainRemainder) // то складываем числа, toFixed - устанавливает длину остатка
        } else if (MathSimvol == "*") {
            input.value = (numberA * numberB).toFixed(remainderA + remainderB)
        } else if (MathSimvol == "-") {
            input.value = (numberA - numberB).toFixed(mainRemainder)
        } else if (MathSimvol == "/") {
            input.value = (numberA / numberB).toFixed(mainRemainder - littleRemainder)
        }
    }

    if (button.classList.contains('plus-minus')) { //если мы нажали на кнопку плюс-минус
        let firstSimvol = input.value[0];
        if(firstSimvol == '-'){
            input.value = input.value.slice(1);
        }else{
            input.value = '-' + input.value;
        }
    }

    if (button.classList.contains('percent')){
        input.value = input.value / 100;
    }

    if (input.value.length > 5 && input.value.length < 7) {
        console.log(input.value.length)
        body.style.setProperty('--size', (88) + 'px');
    } else if (input.value.length > 6 && input.value.length < 8) {
        body.style.setProperty('--size', (76) + 'px');
    } else if (input.value.length > 7 && input.value.length < 9) {
        body.style.setProperty('--size', (72) + 'px');
    } else if (input.value.length > 8 && input.value.length < 10) {
        body.style.setProperty('--size', (68) + 'px');
    } else if (input.value.length > 9) {
        body.style.setProperty('--size', (60) + 'px');
    }
    
}