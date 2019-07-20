function loader(q, w, e) {
    q.style.display = 'none';
    w.style.display = 'block';
    e.style.display = 'block';
}
var uiElement = (function () {
    var domVar, reset;
    // Define all the UI elements variable here 
    domVar = {
        loan: document.querySelector('.loanAmount'),
        interest: document.querySelector('.annualInterest'),
        repayment: document.querySelector('.repaymentYear'),
        monthlyPayment: document.querySelector('.monthlyPayment'),
        totalPayment: document.querySelector('.totalPayment'),
        totalInterest: document.querySelector('.totalInterest'),
        forImg: document.querySelector('img'),
        output: document.querySelector('.output'),
        error: document.querySelector('.error'),
        btn_calc: document.querySelector('.calculate'),
        btn_tryAgain: document.querySelector('.try-again'),
    };
    //PUBLIC
    return {
        //Take the input
        getInput: function () {
            return {
                loan: parseFloat(domVar.loan.value),
                interest: parseFloat(domVar.interest.value) / 100 / 12,
                repayment: parseFloat(domVar.repayment.value) * 12,
            };
        },
        getdomVar: function () {
            return domVar;
        }
    };

})();

var calcController = (function (userExp) {

    var bgtCalculate, forInput, forDom, x, monthly, forLoader;

    forDom = userExp.getdomVar();
    forInput = userExp.getInput();

    bgtCalculate = function (loan, interest, repayment) {

        x = Math.pow(1 + interest, repayment);
        monthly = (loan * x * interest) / (x - 1);
        if (isFinite(monthly)) {
            forDom.monthlyPayment.value = monthly.toFixed(2);
            forDom.totalPayment.value = (monthly * repayment).toFixed(2);
            forDom.totalInterest.value = ((monthly * repayment) - loan).toFixed(2);
            forDom.forImg.style.display = 'block';
            setTimeout(function () {
                loader(forDom.forImg, forDom.output, forDom.btn_tryAgain)
            }, 3600);
        } else {
            forDom.error.style.display = 'block';
            // CLEAR ERROR AFTER 4 SEC
            setTimeout(function () {
                forDom.error.style.display = 'none';
            }, 4000);
        }
    };

    return {
        getOutput: function (a, b, c) {
            return bgtCalculate(a, b, c);
        }
    }

})(uiElement);

let controller = (function (calcCtrl, uiCtrl) {
    var forDomVar, forInput, forOutput;

    forDomVar = uiCtrl.getdomVar();

    // Take the value form UI on Click Or In Enter

    forDomVar.btn_calc.addEventListener('click', AddItem);
    forDomVar.btn_tryAgain.addEventListener('click', clear);

    function AddItem() {
        forInput = uiCtrl.getInput();
        calcCtrl.getOutput(forInput.loan, forInput.interest, forInput.repayment);
    }

    function clear() {
        forDomVar.loan.value = '';
        forDomVar.interest.value = '';
        forDomVar.repayment.value = '';
        forDomVar.monthlyPayment.value = '';
        forDomVar.totalPayment.value = '';
        forDomVar.totalInterest.value = '';
        forDomVar.btn_tryAgain.style.display = 'none';
        forDomVar.output.style.display = 'none';
    }

})(calcController, uiElement);