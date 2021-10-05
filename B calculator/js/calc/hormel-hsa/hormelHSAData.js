
var hormelHSAData = new (function () {

    var data = this;

    //costOption Constructor
    function costOption() {
        var _opt = this;

        _opt.plan = null;
        _opt.coverageType = null;
        _opt.tier = null;

        _opt.yearlyContribution = 0.0;
        _opt.annualDeductable = 0.0;
        _opt.maxOOP = 0.0;
        _opt.employerHSAContribution = 0.0;
    };

    data.findByField = function (array, fieldName, item) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][fieldname] == item) {
                return array[i];
            }
        }
        return -1;
    }

    data.addAsArrayFunction=function(obj){        
        var array = $.map(obj, function (value, index) {
            return [value];
            //Unecessary to place value in brackets
        });
        obj.asArray = function () { return array };
    }

    data.tiers = {
        tier1: {
            key: 'tier1',
            display: 'Tier One (Less than - $75,000)'
        },
        tier2: {
            key: 'tier2',
            display: 'Tier Two ($75,000 - $149,999)'
        },
        tier3: {
            key: 'tier3',
            display: 'Tier Three (Greater than $150,000)'
        }
    };

    data.addAsArrayFunction(data.tiers);

   data.plans = {
        HSP1: {
            key: 'HSP1',
            display: 'HEALTHY SAVINGS PLAN',
            prescriptionCopay: false,
            graphLabel: 'Healthy\nSavings\nPlan 1',
            graphColor: "#72B032",
            displayOrder: 2
        },
        HSP2:
            {
                key: 'HSP2',
                display: 'HEALTHY SAVINGS PLAN 2',
                prescriptionCopay: false,
                graphLabel: 'Healthy\nSavings\nPlan 2',
                graphColor: "#94CF58",
                displayOrder: 3
            },
        Traditional:
            {
                key: 'Traditional',
                display: 'TRADITIONAL PLAN',
                prescriptionCopay: true,
                graphLabel: 'Traditional',
                graphColor: "#F7912F",
                displayOrder: 1
            }
    }

    data.addAsArrayFunction(data.plans);
    
    data.coverageTypes = {
        EmployeeOnly: {
            key: 'EmployeeOnly',
            display: 'EMPLOYEE',
			image:'image0.png',
			subtext:''
        },
        EmployeeChildren: {
            key: 'EmployeeChildren',
            display: 'EMPLOYEE + CHILDREN',
			image:'image1.png',
			subtext:''
        },
        EmployeeSpouse: {
            key: 'EmployeeSpouse',
            display: 'EMPLOYEE + SPOUSE',
			image:'image2.png',
			subtext:''
        },
        Family: {
            key: 'Family',
            display: 'FAMILY ',
			image:'image3.png',
			subtext:'(EMPLOYEE + SPOUSE + CHILDREN)'
        }
    };

    data.addAsArrayFunction(data.coverageTypes);
        
    //|----------------------------------------- Cost Options Data-------------------------//
    data.costOptions = [];
    data.costOptions.findCostOptions = function (tier, coverageType) {
        return $.map(data.costOptions, function (costOption, i) {
            if (costOption.coverageType == coverageType && costOption.tier == tier) {
                return costOption;
            }
            else {
                return null;
            }
        });
    }

    //|-----------------------------------------EE Only Tier I -------------------------//
    //Employee - T1 - HSP1
    data.costOptions.push(new (function () {
        var option = new costOption();

        option.coverageType = data.coverageTypes.EmployeeOnly;
        option.tier = data.tiers.tier1;
        option.plan = data.plans.HSP1;
        option.yearlyContribution =  988.00;
        option.annualDeductable = 2000.00;
        option.maxOOP = 4500.00;
        option.employerHSAContribution = 0;
		option.maxvalue = 5488;

        return option;
    })());

    //Employee - T1 - HSP2
    data.costOptions.push(new (function () {
        var option = new costOption();

        option.coverageType = data.coverageTypes.EmployeeOnly;
        option.tier = data.tiers.tier1;
        option.plan = data.plans.HSP2;
        option.yearlyContribution = 728.00;
        option.annualDeductable = 2000.00;
        option.maxOOP = 4000.00;
        option.employerHSAContribution = 0.00;

        return option;
    })());

    //Employee - T1 - Traditional
    data.costOptions.push(new (function () {
        var option = new costOption();

        option.coverageType = data.coverageTypes.EmployeeOnly;
        option.tier = data.tiers.tier1;
        option.plan = data.plans.Traditional;
        option.yearlyContribution = 1404.00;
        option.annualDeductable = 800.00;
        option.maxOOP = 5750.00;
        option.employerHSAContribution = 0.00;
		option.maxvalue = 7154;

        return option;
    })());

    //|-----------------------------------------EE Only Tier II -------------------------//
    //Employee - T2 - HDP Option1
    data.costOptions.push(new (function () {
        var option = new costOption();

        option.coverageType = data.coverageTypes.EmployeeOnly;
        option.tier = data.tiers.tier2;
        option.plan = data.plans.HSP1;
        option.yearlyContribution = 1560.00;
        option.annualDeductable = 2000.00;
        option.maxOOP = 4500.00;
        option.employerHSAContribution = 0;
		option.maxvalue = 10248;

        return option;
    })());

    //Employee - T2 - HDP Option2
    data.costOptions.push(new (function () {
        var option = new costOption();

        option.coverageType = data.coverageTypes.EmployeeOnly;
        option.tier = data.tiers.tier2;
        option.plan = data.plans.HSP2;
        option.yearlyContribution = 1040.00;
        option.annualDeductable = 2000.00;
        option.maxOOP = 4000.00;
        option.employerHSAContribution = 0.00;

        return option;
    })());

    //Employee - T2 - HDP Traditional
    data.costOptions.push(new (function () {
        var option = new costOption();

        option.coverageType = data.coverageTypes.EmployeeOnly;
        option.tier = data.tiers.tier2;
        option.plan = data.plans.Traditional;
        option.yearlyContribution = 2548.00;
        option.annualDeductable = 750.00;
        option.maxOOP = 12250.00;
        option.employerHSAContribution = 0.00;
		option.maxvalue = 14278;

        return option;
    })());

    //|-----------------------------------------EE Only Tier III -------------------------//
    //Employee - T3 - HDP Option1
    data.costOptions.push(new (function () {
        var option = new costOption();

        option.coverageType = data.coverageTypes.EmployeeOnly;
        option.tier = data.tiers.tier3;
        option.plan = data.plans.HSP1;
        option.yearlyContribution = 1872.00;
        option.annualDeductable = 2000.00;
        option.maxOOP = 4500.00;
        option.employerHSAContribution = 0.00;

        return option;
    })());

    //Employee - T3 - HDP Option2
    data.costOptions.push(new (function () {
        var option = new costOption();

        option.coverageType = data.coverageTypes.EmployeeOnly;
        option.tier = data.tiers.tier3;
        option.plan = data.plans.HSP2;
        option.yearlyContribution = 1300.00;
        option.annualDeductable = 2000.00;
        option.maxOOP = 4000.00;
        option.employerHSAContribution = 0.00;

        return option;
    })());

    //Employee - T3 - HDP Traditional
    data.costOptions.push(new (function () {
        var option = new costOption();

        option.coverageType = data.coverageTypes.EmployeeOnly;
        option.tier = data.tiers.tier3;
        option.plan = data.plans.Traditional;
        option.yearlyContribution = 2860.00;
        option.annualDeductable = 750.00;
        option.maxOOP = 5750.00;
        option.employerHSAContribution = 0.00;

        return option;
    })());

    //|----------------------------------------EE + Children Tier I -------------------------//
    //Children - T1 - HDP Option1
    data.costOptions.push(new (function () {
        var option = new costOption();

        option.coverageType = data.coverageTypes.EmployeeChildren;
        option.tier = data.tiers.tier1;
        option.plan = data.plans.HSP1;
        option.yearlyContribution = 1404.00;
        option.annualDeductable = 4000.00;
        option.maxOOP = 9000.00;
        option.employerHSAContribution = 0.00;
		option.maxvalue = 10404;

        return option;
    })());

    //Children - T1 - HDP Option2
    data.costOptions.push(new (function () {
        var option = new costOption();

        option.coverageType = data.coverageTypes.EmployeeChildren;
        option.tier = data.tiers.tier1;
        option.plan = data.plans.HSP2;
        option.yearlyContribution = 1144.00;
        option.annualDeductable = 4000.00;
        option.maxOOP = 8000.00;
        option.employerHSAContribution = 0.00;

        return option;
    })());

    //Children - T1 - HDP Traditional
    data.costOptions.push(new (function () {
        var option = new costOption();

        option.coverageType = data.coverageTypes.EmployeeChildren;
        option.tier = data.tiers.tier1;
        option.plan = data.plans.Traditional;
        option.yearlyContribution = 2340.00;
        option.annualDeductable = 1600.00;
        option.maxOOP = 12250.00;
        option.employerHSAContribution = 0.00;
		option.maxvalue =14590;

        return option;
    })());

    //|----------------------------------------EE + Children Tier II -------------------------//
    //Children - T2  - HDP Option1
    data.costOptions.push(new (function () {
        var option = new costOption();

        option.coverageType = data.coverageTypes.EmployeeChildren;
        option.tier = data.tiers.tier2;
        option.plan = data.plans.HSP1;
        option.yearlyContribution = 2184.00;
        option.annualDeductable = 4000.00;
        option.maxOOP = 9000.00;
        option.employerHSAContribution = 0.00;

        return option;
    })());

    //Children - T2 - HDP Option2
    data.costOptions.push(new (function () {
        var option = new costOption();

        option.coverageType = data.coverageTypes.EmployeeChildren;
        option.tier = data.tiers.tier2;
        option.plan = data.plans.HSP2;
        option.yearlyContribution = 1716.00;
        option.annualDeductable = 4000.00;
        option.maxOOP = 8000.00;
        option.employerHSAContribution = 0.00;

        return option;
    })());

    //Children - T2 - HDP Traditional
    data.costOptions.push(new (function () {
        var option = new costOption();

        option.coverageType = data.coverageTypes.EmployeeChildren;
        option.tier = data.tiers.tier2;
        option.plan = data.plans.Traditional;
        option.yearlyContribution = 3692.00;
        option.annualDeductable = 1500.00;
        option.maxOOP = 12250.00;
        option.employerHSAContribution = 0.00;

        return option;
    })());

    //|----------------------------------------EE + Children Tier III -------------------------//
    //Children - T3 - HDP Option1
    data.costOptions.push(new (function () {
        var option = new costOption();

        option.coverageType = data.coverageTypes.EmployeeChildren;
        option.tier = data.tiers.tier3;
        option.plan = data.plans.HSP1;
        option.yearlyContribution = 2652.00;
        option.annualDeductable = 4000.00;
        option.maxOOP = 9000.00;
        option.employerHSAContribution = 0.00;

        return option;
    })());

    //Children - T3- HDP Option2
    data.costOptions.push(new (function () {
        var option = new costOption();

        option.coverageType = data.coverageTypes.EmployeeChildren;
        option.tier = data.tiers.tier3;
        option.plan = data.plans.HSP2;
        option.yearlyContribution = 2132.00;
        option.annualDeductable = 4000.00;
        option.maxOOP = 8000.00;
        option.employerHSAContribution = 0.00;

        return option;
    })());

    //Children - T3 - HDP Traditional
    data.costOptions.push(new (function () {
        var option = new costOption();

        option.coverageType = data.coverageTypes.EmployeeChildren;
        option.tier = data.tiers.tier3;
        option.plan = data.plans.Traditional;
        option.yearlyContribution = 4212.00;
        option.annualDeductable = 1500.00;
        option.maxOOP = 12250.00;
        option.employerHSAContribution = 0.00;

        return option;
    })());

    //|----------------------------------------EE + Spouse Tier I -------------------------//
    //Spouse - T1 - HDP Option1
    data.costOptions.push(new (function () {
        var option = new costOption();

        option.coverageType = data.coverageTypes.EmployeeSpouse;
        option.tier = data.tiers.tier1;
        option.plan = data.plans.HSP1;
        option.yearlyContribution = 2340.00;
        option.annualDeductable = 4000.00;
        option.maxOOP = 9000.00;
        option.employerHSAContribution = 0.00;
		option.maxvalue = 11340;

        return option;
    })());

    ////Spouse - T1 - HDP Option2
    data.costOptions.push(new (function () {
        var option = new costOption();

        option.coverageType = data.coverageTypes.EmployeeSpouse;
        option.tier = data.tiers.tier1;
        option.plan = data.plans.HSP2;
        option.yearlyContribution = 1716.00;
        option.annualDeductable = 4000.00;
        option.maxOOP = 8000.00;
        option.employerHSAContribution = 0.00;

        return option;
    })());

    //Spouse - T1  - HDP Traditional
    data.costOptions.push(new (function () {
        var option = new costOption();

        option.coverageType = data.coverageTypes.EmployeeSpouse;
        option.tier = data.tiers.tier1;
        option.plan = data.plans.Traditional;
        option.yearlyContribution = 3952.00;
        option.annualDeductable = 1600.00;
        option.maxOOP = 11500.00;
        option.employerHSAContribution = 0.00;
		option.maxvalue = 15452;

        return option;
    })());

    //|----------------------------------------EE + Spouse Tier II -------------------------//
    //Spouse - T2 - HDP Option1
    data.costOptions.push(new (function () {
        var option = new costOption();

        option.coverageType = data.coverageTypes.EmployeeSpouse;
        option.tier = data.tiers.tier2;
        option.plan = data.plans.HSP1;
        option.yearlyContribution = 3328.00;
        option.annualDeductable = 4000.00;
        option.maxOOP = 9000.00;
        option.employerHSAContribution =  0.00;

        return option;
    })());

    ////Spouse - T2 - HDP Option2
    data.costOptions.push(new (function () {
        var option = new costOption();

        option.coverageType = data.coverageTypes.EmployeeSpouse;
        option.tier = data.tiers.tier2;
        option.plan = data.plans.HSP2;
        option.yearlyContribution = 2704.00;
        option.annualDeductable = 4000.00;
        option.maxOOP = 8000.00;
        option.employerHSAContribution = 0.00;

        return option;
    })());

    //Spouse - T2  - HDP Traditional
    data.costOptions.push(new (function () {
        var option = new costOption();

        option.coverageType = data.coverageTypes.EmployeeSpouse;
        option.tier = data.tiers.tier2;
        option.plan = data.plans.Traditional;
        option.yearlyContribution = 5980.00;
        option.annualDeductable = 1500.00;
        option.maxOOP = 11500.00;
        option.employerHSAContribution = 0.00;

        return option;
    })());

    //|----------------------------------------EE + Spouse Tier III -------------------------//
    //Spouse - T3 - HDP Option1
    data.costOptions.push(new (function () {
        var option = new costOption();

        option.coverageType = data.coverageTypes.EmployeeSpouse;
        option.tier = data.tiers.tier3;
        option.plan = data.plans.HSP1;
        option.yearlyContribution = 4056.00;
        option.annualDeductable = 4000.00;
        option.maxOOP = 9000.00;
        option.employerHSAContribution = 0.00;

        return option;
    })());

    ////Spouse - T3 - HDP Option2
    data.costOptions.push(new (function () {
        var option = new costOption();

        option.coverageType = data.coverageTypes.EmployeeSpouse;
        option.tier = data.tiers.tier3;
        option.plan = data.plans.HSP2;
        option.yearlyContribution = 3432.00;
        option.annualDeductable = 4000.00;
        option.maxOOP = 8000.00;
        option.employerHSAContribution = 0.00;

        return option;
    })());

    //Spouse - T3  - HDP Traditional
    data.costOptions.push(new (function () {
        var option = new costOption();

        option.coverageType = data.coverageTypes.EmployeeSpouse;
        option.tier = data.tiers.tier3;
        option.plan = data.plans.Traditional;
        option.yearlyContribution = 6604.00;
        option.annualDeductable = 1500.00;
        option.maxOOP = 11500.00;
        option.employerHSAContribution = 0.00;

        return option;
    })());

    //|----------------------------------------EE + Family Tier I -------------------------//
    //Family - T1 - HDP Option1
    data.costOptions.push(new (function () {
        var option = new costOption();

        option.coverageType = data.coverageTypes.Family;
        option.tier = data.tiers.tier1;
        option.plan = data.plans.HSP1;
        option.yearlyContribution = 2392.00;
        option.annualDeductable = 4000.00;
        option.maxOOP = 9000.00;
        option.employerHSAContribution =  0.00;
		option.maxvalue =11392;

        return option;
    })());

    //Family - T1 - HDP Option2
    data.costOptions.push(new (function () {
        var option = new costOption();

        option.coverageType = data.coverageTypes.Family;
        option.tier = data.tiers.tier1;
        option.plan = data.plans.HSP2;
        option.yearlyContribution = 1872.00;
        option.annualDeductable = 4000.00;
        option.maxOOP = 8000.00;
        option.employerHSAContribution = 0.00;

        return option;
    })());

    //Family - T1  - HDP Traditional
    data.costOptions.push(new (function () {
        var option = new costOption();

        option.coverageType = data.coverageTypes.Family;
        option.tier = data.tiers.tier1;
        option.plan = data.plans.Traditional;
        option.yearlyContribution = 4004.00;
        option.annualDeductable = 1600.00;
        option.maxOOP = 12250.00;
        option.employerHSAContribution = 0.00;
		option.maxvalue =16254;

        return option;
    })());

    //|----------------------------------------EE + Family Tier II -------------------------//
    //Family - T2 - HDP Option1
    data.costOptions.push(new (function () {
        var option = new costOption();

        option.coverageType = data.coverageTypes.Family;
        option.tier = data.tiers.tier2;
        option.plan = data.plans.HSP1;
        option.yearlyContribution = 3484.00;
        option.annualDeductable = 4000.00;
        option.maxOOP = 9000.00;
        option.employerHSAContribution =  0.00;

        return option;
    })());

    //Family - T2 - HDP Option2
    data.costOptions.push(new (function () {
        var option = new costOption();

        option.coverageType = data.coverageTypes.Family;
        option.tier = data.tiers.tier2;
        option.plan = data.plans.HSP2;
        option.yearlyContribution = 2860.00;
        option.annualDeductable = 4000.00;
        option.maxOOP = 8000.00;
        option.employerHSAContribution = 0.00;

        return option;
    })());

    //Family - T2  - HDP Traditional
    data.costOptions.push(new (function () {
        var option = new costOption();

        option.coverageType = data.coverageTypes.Family;
        option.tier = data.tiers.tier2;
        option.plan = data.plans.Traditional;
        option.yearlyContribution = 6344.00;
        option.annualDeductable = 1500.00;
        option.maxOOP = 12250.00;
        option.employerHSAContribution = 0.00;

        return option;
    })());

    //|----------------------------------------EE + Family Tier III -------------------------//
    //Family - T3 - HDP Option1
    data.costOptions.push(new (function () {
        var option = new costOption();

        option.coverageType = data.coverageTypes.Family;
        option.tier = data.tiers.tier3;
        option.plan = data.plans.HSP1;
        option.yearlyContribution = 4264.00;
        option.annualDeductable = 4000.00;
        option.maxOOP = 9000.00;
        option.employerHSAContribution =  0.00;

        return option;
    })());

    //Family - T3 - HDP Option2
    data.costOptions.push(new (function () {
        var option = new costOption();

        option.coverageType = data.coverageTypes.Family;
        option.tier = data.tiers.tier3;
        option.plan = data.plans.HSP2;
        option.yearlyContribution = 3640.00;
        option.annualDeductable = 4000.00;
        option.maxOOP = 8000.00;
        option.employerHSAContribution = 0.00;

        return option;
    })());

    //Family - T3  - HDP Traditional
    data.costOptions.push(new (function () {
        var option = new costOption();

        option.coverageType = data.coverageTypes.Family;
        option.tier = data.tiers.tier3;
        option.plan = data.plans.Traditional;
        option.yearlyContribution = 7020.00;
        option.annualDeductable = 1500.00;
        option.maxOOP = 12250.00;
        option.employerHSAContribution = 0.00;

        return option;
    })());

})()
