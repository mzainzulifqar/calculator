
var hormelHSALogic = new (function () {

    var logic = this;

    logic.totalMedExpense = function (totalRxExpenses, totalNonRxExpenses) {
        // return totalRxExpenses + totalNonRxMedExpenses;      --Is there a typo here?
        return totalRxExpenses + totalNonRxExpenses;
    }

    logic.medExpenseEELiability = function (totalMedExpenses, annualDeducatable) {

       return totalMedExpenses;
    }


    logic.adjustedOOPLiability = function (J4, maxOOP,D4,G4,I4,H4) {
		var tempi4=0;
		if (D4==750){
			tempi4=15750;
		}
		if (D4==1500){
			tempi4=31500;
		}
		if (D4==2250){
			tempi4=32225;
		}
	
		var E4=maxOOP;
		var k4=0;
		if(G4==0){
		var temp1=0;
			if(J4>D4){
				temp1=D4+(J4-D4)*0.2;
			}
			else{
				temp1=J4
			}
			
			k4=	Math.min(temp1,E4)
		}
		else{
			var temp3=0;
			var temp4=0;
			
			
		     if(H4>E4){
				temp3=E4;
			}
			else{
				temp3=H4;
			}
				
			 if(I4>tempi4){
				temp4=G4;
			}
			else{
				temp4=D4+(I4-D4)*0.2;
			}
			k4=temp3+temp4; 
		}
		
		
		
		return k4;
    }


    logic.totalOOP = function (adjustedOOPLiability, yearlyContribution) {
        return adjustedOOPLiability + yearlyContribution;
    }

    logic.finalCost = function (totalOOP, maxvalue) {
		
		var temptotal=totalOOP ;
		
		if(temptotal>=maxvalue){
			temptotal=maxvalue;
		}
		else{
			
		}
		
        return temptotal;
    }

    //All parameters below are input from template-calc-form
    logic.totalCostOutcome = function (costOption, totalRxExpenses, nonRxMedExpenses) {
	
		var tempmaxoop=costOption.maxOOP+costOption.employerHSAContribution;
       
		
        var totalMedExpenses = logic.totalMedExpense(parseInt(totalRxExpenses, 10), parseInt(nonRxMedExpenses, 10)); //be 510 | 510 | 170 
        
        var eeLiability = logic.medExpenseEELiability(totalMedExpenses, costOption.annualDeductable); //be 510 | 510 | 170 

        var adjustedOOP = logic.adjustedOOPLiability(eeLiability, costOption.maxOOP,costOption.annualDeductable,costOption.employerHSAContribution,nonRxMedExpenses,totalRxExpenses); //be 510 | 510 |170

        var totalOOP = logic.totalOOP(adjustedOOP, costOption.yearlyContribution); // be 1810 | 1134 | 1886

        var finalCost = logic.finalCost(totalOOP, costOption.maxvalue); //1310 | 1134 | 1886 

        return finalCost;
    }

    logic.formatAsMoney = function (n, c, d, t) {
        var c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d == undefined ? "." : d,
            t = t == undefined ? "," : t,
            s = n < 0 ? "-" : "",
            i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };
})()