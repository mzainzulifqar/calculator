

$(document).ready(function () {
    hormelHSAPage.init();
});

Handlebars.registerHelper("formatAsMoney", function (floatVal, decimalPlaces) {
    return hormelHSALogic.formatAsMoney(floatVal, decimalPlaces, '.', ',');
});

var hormelHSAPage = new (function () {
    var page = this;

    page.selectedCostOptions = [];

    var ctx = createCanvas("totalCostGraphContainer");

    var graph = new BarGraph(ctx);

    page.init = function () {



        var tmplSalarayTierOpts = Handlebars.compile($("#tmpl-salary-tiers").html());
        $('#selectSalaryTier').html(tmplSalarayTierOpts({ tiers: hormelHSAData.tiers.asArray() }));

        var tmplCoverageTypes = Handlebars.compile($("#tmpl-coverage-types").html());
        $('#coverageTypesContainer').html(tmplCoverageTypes({ coverageTypes: hormelHSAData.coverageTypes.asArray() }));

        showPlanOptionPlaceholders();

        jQuery(document).tooltip({
            position: {
                my: "center bottom-20",
                at: "center top",
                using: function (position, feedback) {
                    $(this).css(position);
                    $("<div>")
                      .addClass("arrow")
                      .addClass(feedback.vertical)
                      .addClass(feedback.horizontal)
                      .appendTo(this);
                }
            }
        });

        $('#selectSalaryTier').change(function () {
            showPlanOptions();
        });

        $('#coverageTypesContainer').change(function () {
            showPlanOptions();
        });

        $('.user-expense-input').change(function () {
            defineTotalCostOutcomes();
        });

        $('#calculatePlanCosts').click(function () {
            defineTotalCostOutcomes();
        });

        (function () {
            graph.height = 300;
            graph.minMaxValue = 8000;
            graph.margin = 2;
            graph.xAxisLabelHeight = 70;
            graph.valueLabelFormatter = function (value) {
                var retVal = '$' + hormelHSALogic.formatAsMoney(parseInt(value, 10), 0, '.', ',');
                return retVal;
            };
        }());


        $('.user-expense-input').bind('keypress', function (event) {
            var charCode = !event.charCode ? event.which : event.charCode
            var key = String.fromCharCode(charCode);

            if (charCode == 8 || charCode == 46 || charCode==0) { //backspace or delete
                return
            }

            var regex = new RegExp('^[0-9]+$'); //only numbers
            if (!regex.test(key) || $(this).val().length >= 5) { //limit to numbers and 5 digits
                event.preventDefault();
                return false;
            }
        });
    }

    function createCanvas(divName) {

        var div = document.getElementById(divName);
        var canvas = document.createElement('canvas');
        div.appendChild(canvas);
        if (typeof G_vmlCanvasManager != 'undefined') {
            canvas = G_vmlCanvasManager.initElement(canvas);
        }
        var ctx = canvas.getContext("2d");
        return ctx;
    }

    function showPlanOptions() {
		
        var tier = hormelHSAData.tiers[$('#selectSalaryTier').val()];
        var coverageType = hormelHSAData.coverageTypes[$('#coverageTypesContainer').val()];

        page.selectedCostOptions = hormelHSAData.costOptions.findCostOptions(tier, coverageType);

        if (page.selectedCostOptions.length > 0) {
            page.selectedCostOptions.sort(function (a, b) {
                return a.plan.displayOrder - b.plan.displayOrder;
            });

            var tmplSelectedCostOptions = Handlebars.compile($('#tmpl-cost-options').html())
            $('#selectedCostOptions').html(tmplSelectedCostOptions({ costOptions: page.selectedCostOptions }));
            defineTotalCostOutcomes();
            $('#calculatePlanCostsDisabled').hide(0);
            $('#calculatePlanCosts').show(0);

            $("#totalPlanCostsResults").show(0)
        }
        else {
            $('#calculatePlanCosts').hide(0);

            $('#calculatePlanCostsDisabled').show(0);
            showPlanOptionPlaceholders();
        }
    }

    function showPlanOptionPlaceholders() {
        var tmplSelectedCostOptions = Handlebars.compile($('#tmpl-cost-option-placeholders').html())
        $('#selectedCostOptions').html(tmplSelectedCostOptions({
            plans: hormelHSAData.plans.asArray().sort(function (a, b) {
                return a.displayOrder - b.displayOrder;
            })
        }));
    }

    function parseFloatDefault0(value) {
        value = parseFloat(value);
        if (value >= 0.0)
            return value;
        else
            return 0.0;
    }

    function defineTotalCostOutcomes() {
        var totalRxExpenses = parseFloatDefault0($('#totalRxExpenses').val());
        var nonRxMedExpenses = parseFloatDefault0($('#nonRxMedExpense').val());

        var plansCostOutcomes = [];

        for (var i = 0; i < page.selectedCostOptions.length; i++) {
            var totalCostOutcome = hormelHSALogic.totalCostOutcome(page.selectedCostOptions[i], totalRxExpenses, nonRxMedExpenses);
            plansCostOutcomes.push({
                plan: page.selectedCostOptions[i].plan,
                totalCost: totalCostOutcome
            });
        }

        if (plansCostOutcomes.length > 0) {
          // updateCostsGraph(plansCostOutcomes);
			updatecustomgraph(plansCostOutcomes);
        }
        else {
        }
    }

    function updateCostsGraph(plansCostOutcomes) {
		
        graph.colors = plansCostOutcomes.map(function (outcome) { return outcome.plan.graphColor; });
        graph.xAxisLabelArr = plansCostOutcomes.map(function (outcome) { return outcome.plan.graphLabel; });

        var graphValues = plansCostOutcomes.map(function (outcome) { return outcome.totalCost; })
        var maxVal = (function (numArray) {
            return Math.max.apply(null, numArray);
        })(graphValues);

        //graph.maxValue = maxVal >= minGraphMaxValue ? maxVal + 10 : minGraphMaxValue;

        graph.update(graphValues);
    }
})();



function updatecustomgraph(plansCostOutcomes){
	var graph1=plansCostOutcomes[0].totalCost;
	var graph2=plansCostOutcomes[1].totalCost;
	
	
	
	var graph1length=(graph1/graph2)*150;
	var graph2length=(graph2/graph1)*150;
	
	$('#graph1text').html("$"+graph1.toLocaleString(undefined, {
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}));

	$('#graph2text').html("$"+graph2.toLocaleString(undefined, {
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}));

	if(graph1>=graph2){
	   $('#graph1chart').animate({height:'150'});
	$('#graph2chart').animate({height:graph2length});
	   }
else if(graph1<=graph2){
	$('#graph2chart').animate({height:'150'});
	$('#graph1chart').animate({height:graph1length});
	   }

	

	
	
}

function opendropdown1(){
	  var dropdown = document.getElementById('coverageTypesContainer');
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('mousedown', true, true, window);
    dropdown.dispatchEvent(event);
}
