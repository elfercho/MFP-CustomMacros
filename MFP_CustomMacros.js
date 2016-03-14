javascript:(function (){
	var totalValue = document.getElementsByClassName('total')[0].getElementsByTagName('td'); /* Total consumed */
	var dailyValue = document.getElementsByClassName('total alt')[0].getElementsByTagName('td'); /* Total needed */
	var remainingValue = document.getElementsByClassName('total remaining')[0].getElementsByTagName('td'); /* Amount remaining */

	var regExp = /^\D+|\,/g; /* Delete all blank spaces and the comma*/


	/*Percentages of macros (Customizable)*/
	function setMacroPercent(name){
		switch(name){
			case 'carbs': return 0.4;
			break;
			case 'fats': return 0.25;
			break;
			case 'prots': return 0.35;
			break;
		}
	}


	/* Get the values of the total macros consumed and daily kcals goals*/
	function getNumber(str){
		return str.innerHTML.replace(regExp, '');
	}


	/* Update the "daily goal" values
		kcpg = Kcalories per gram*/
	function newMacros(name, amount){
		var percent = setMacroPercent(name);
		var kcpg = name == 'fats' ? 9 : 4;
		return ((kcal * percent) / kcpg).toFixed();

	}


	/* Update the remaining values*/
	function newRemainder(daily, total){
		return (daily - total).toFixed();
	}

	for (var i = 1; i <= 4; i++){
		switch(i){
			case 1: 
				var kcal = getNumber(dailyValue[i]);
			break;

			case 2: 
				var totalCh = getNumber(totalValue[i]);
				var dailyCh = newMacros("carbs", kcal);
				dailyValue[i].innerHTML = dailyCh;
				remainingValue[i].innerHTML = newRemainder(dailyCh, totalCh);
			break;

			case 3:
				var totalFat = getNumber(totalValue[i]); 
				var dailyFat = newMacros("fats", kcal);
				dailyValue[i].innerHTML = dailyFat;
				remainingValue[i].innerHTML = newRemainder(dailyFat, totalFat);
			break;

			case 4:
				var totalProt = getNumber(totalValue[i]);
				var dailyProt = newMacros("prots", kcal);
				dailyValue[i].innerHTML = dailyProt;
				remainingValue[i].innerHTML = newRemainder(dailyProt, totalProt);
			break;
		}
	}
})();