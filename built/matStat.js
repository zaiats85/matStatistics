var config = {
    prop_1: [172, 171, 191, 132, 179, 221, 283, 86, 61, 53, 284, 281, 257, 50, 229, 104, 84, 133, 226, 159, 133, 153, 296, 179, 189, 203, 174, 157, 296, 265, 111, 223, 246, 47, 176, 288, 223, 186, 52, 191, 133, 53, 299, 179, 189, 203, 174, 157, 296, 265, 211, 223, 246, 47, 326, 288, 223, 186, 52, 193, 172, 171, 191, 132, 179, 223, 283, 186, 61, 333, 284, 281, 257, 330, 239, 100, 83, 132, 226, 159, 153, 203, 296, 179, 139, 193, 164, 147, 286, 255, 141, 233, 246, 48, 136, 258, 263, 176, 54, 131],
    prop_2: [27, 25, 20, 24, 26, 34, 33, 21, 29, 11, 35, 31, 33, 11, 40, 13, 19, 19, 33, 26, 19, 11, 41, 36, 24, 30, 24, 33, 16, 36, 39, 32, 32, 9, 19, 36, 34, 26, 10, 20, 19, 11, 40, 36, 14, 30, 24, 33, 16, 36, 39, 30, 32, 9, 19, 36, 34, 26, 10, 22, 27, 25, 20, 24, 28, 34, 33, 21, 29, 11, 30, 31, 33, 11, 41, 13, 19, 19, 32, 25, 16, 17, 44, 36, 22, 31, 24, 31, 15, 33, 39, 31, 37, 16, 16, 36, 34, 26, 10, 20],
};
var hashedCorelation = {};
var sumX = 0;
var sumY = 0;
var sumX2 = 0;
var sumY2 = 0;
var sumXY = 0;
/*length of Sample*/
var mSample = 25;
for (var m = 0; m < mSample; m++) {
    var a = config.prop_1[m];
    var b = config.prop_2[m];
    sumX += a;
    sumY += b;
    sumX2 += a * a;
    sumY2 += b * b;
    sumXY += a * b;
    var tmp = { "Xi": a, "Yi": b, "Xi2": Math.pow(a, 2), "Yi2": Math.pow(b, 2), "X*Xy": a * b };
    hashedCorelation[m] = tmp;
}
var sumRow;
sumRow = {
    avgSumX: average(sumX, mSample),
    avgSumY: average(sumY, mSample),
    avgSumX2: average(sumX2, mSample),
    avgSumY2: average(sumY2, mSample),
    avgSumXY: average(sumXY, mSample),
};
hashedCorelation.totals = sumRow;
function corelationDeviation(a, b) {
    return round(a - Math.pow(b, 2), 4);
}
/*Variance x, y and sample means*/
var G2x = corelationDeviation(sumRow.avgSumX2, sumRow.avgSumX);
var G2y = corelationDeviation(sumRow.avgSumY2, sumRow.avgSumY);
var Gx = Math.sqrt(G2x);
var Gy = Math.sqrt(G2y);
/*Coefficient of determination*/
var rV = (sumRow.avgSumXY - sumRow.avgSumX * sumRow.avgSumY) / (Gx * Gy);
var R2 = Math.pow(rV, 2);
/*Linear Regression Equation*/
function linearRegression(predicate, sumMaster, sumDependant, key) {
    var koef;
    switch (predicate) {
        case "x":
            koef = rV * (Gx / Gy);
            break;
        case "y":
            koef = rV * (Gy / Gx);
            break;
    }
    return round(koef * (key - sumDependant) + sumMaster, 4);
}
function linearRegressionUI(predicate, sumMaster, sumDependant, key) {
    var koef;
    var conjunctor;
    var strVar;
    switch (predicate) {
        case "x":
            koef = round(rV * (Gx / Gy), 3);
            strVar = "y";
            break;
        case "y":
            koef = round(rV * (Gy / Gx), 3);
            strVar = "x";
            break;
    }
    conjunctor = round(sumMaster - koef * sumDependant, 3);
    return koef + "*" + strVar + ((conjunctor < 0) ? conjunctor.toString() : "+" + conjunctor.toString());
}
Object.values(hashedCorelation).forEach(function (value) {
    value.yCor = linearRegression("y", sumRow.avgSumY, sumRow.avgSumX, value.Xi);
    value["Y-yCor"] = round(value.Yi - value.yCor, 4);
    value.xCor = linearRegression("x", sumRow.avgSumX, sumRow.avgSumY, value.Yi);
    value["X-xCor"] = round(value.Xi - value.xCor, 4);
});
var sorted = config.prop_1.sort(function (a, b) { return (a - b); });
var max = Math.max.apply(Math, sorted);
var min = Math.min.apply(Math, sorted);
var N = sorted.length;
var h = 38;
var normalize = function () {
    var ordered = {};
    for (var i = 0; i < N; i++) {
        var current = sorted[i];
        if (!ordered.hasOwnProperty(current)) {
            ordered[current] = 1;
        }
        else {
            ordered[current]++;
        }
    }
    return ordered;
};
var ordered = normalize();
var fakeZeroVal = +Object.keys(ordered).reduce(function (a, b) { return ordered[a] > ordered[b] ? a : b; });
var getSampleMean = function () {
    var sum = 0;
    Object.entries(ordered).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        sum += +key * (+value);
    });
    /*Sample mean*/
    return (1 / N) * sum;
};
var sampleMean = getSampleMean();
var Variance = function (input) {
    var varSumHelper = 0;
    Object.entries(input).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        varSumHelper += (Math.pow((key - fakeZeroVal), 2)) * value;
    });
    return (1 / N) * varSumHelper - Math.pow((sampleMean - fakeZeroVal), 2);
};
var variance = Math.ceil(Math.sqrt(Variance(ordered)));
function average(input, m) {
    return input / m;
}
function sampleMeanGeneral(x) {
    return x + h / 2;
}
function round(input, koef) {
    var m = Math.pow(10, koef);
    return Math.round(input * m) / m;
}
function standartDeviation(x) {
    return round(conditionalOptions(x) / variance, 2);
}
function normalDistribution(x) {
    return round(Math.pow(Math.sqrt(2 * Math.PI), (-1)) * Math.pow(Math.E, (-((Math.pow(x, 2)) / 2))), 4);
}
function conditionalOptions(x) {
    return round(sampleMeanGeneral(x) - sampleMean, 2);
}
function theoreticalFrequency(f) {
    return round((N * h / variance) * f, 2);
}
function nQuadricRelation(n1, n) {
    return round(Math.pow((n1 - n), 2) / n, 4);
}
function createHashedInterval(h, minimum) {
    var hashedInterval = {};
    while (minimum < max) {
        hashedInterval[minimum + "-" + (minimum + h)] = {
            Pr: 0,
            min: minimum,
            max: minimum + h,
            n: 0,
        };
        minimum += h;
    }
    return hashedInterval;
}
function convertInterval(input) {
    Object.entries(input).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        for (var j = value.min; j < value.max; j++) {
            var frequency = ordered[j];
            if (frequency) {
                value.n += frequency;
                value.Pr = value.n / N;
            }
        }
    });
}
function normalDisribution(input) {
    var Ni = 0;
    var NFDi = 0;
    var deltaNi = 0;
    Object.entries(input).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        /*Populate hash values*/
        value.sampleMeanGeneral = sampleMeanGeneral(value.min);
        value.nForMe = value.n;
        value.condOpt = conditionalOptions(value.min);
        value.stDev = standartDeviation(value.min);
        value.normDist = normalDistribution(value.stDev);
        value.theorFreq = theoreticalFrequency(value.normDist);
        value.theorFreqRound = Math.round(value.theorFreq);
        value.nRelation = nQuadricRelation(value.n, value.theorFreqRound);
        /*Accumulate sums for total row*/
        Ni += value.nForMe;
        NFDi += value.theorFreqRound;
        deltaNi += value.nRelation;
    });
    input.total = { a: "", nForMe: Ni, b: "", c: "", d: "", e: "", theorFreqRound: NFDi, nRelation: round(deltaNi, 4) };
}
var hashedInterval = createHashedInterval(h, min);
convertInterval(hashedInterval);
normalDisribution(hashedInterval);
/**** HELPERS ****/
var getSampleMeanAlternative = function () {
    var freekSum = 0;
    var result;
    Object.entries(ordered).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        freekSum += (key - fakeZeroVal) * value;
    });
    result = (1 / N) * freekSum + fakeZeroVal;
    return result;
};
function createTableFromHash(input, id, headers, filterHeader) {
    var table = document.createElement("table");
    var headerRow = document.createElement("tr");
    table.setAttribute("id", id);
    headers.forEach(function (x) {
        var th = document.createElement("th");
        th.innerHTML = x;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
    Object.entries(input).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        td.innerHTML = key;
        tr.appendChild(td);
        Object.entries(value).forEach(function (_a) {
            var key = _a[0], val = _a[1];
            if (key && filterHeader && filterHeader.includes(key)) {
                return;
            }
            var td = document.createElement("td");
            td.innerHTML = !isNaN(val) ? val : "-";
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
    return table;
}
/**** DOM ****/
var range = document.getElementById("rangeInput");
var rangeLabel = document.getElementById("textInput");
var varianceDom = document.getElementById("variance");
var sampleMeanDom = document.getElementById("sample-mean");
var divInvatiant = document.getElementById("chart-description");
var divCorelation = document.getElementById("corelation-description");
document.getElementById("point-estimation-x").innerText = sumRow.avgSumX;
document.getElementById("point-estimation-y").innerText = sumRow.avgSumY;
document.getElementById("point-estimation-x2").innerText = sumRow.avgSumX2;
document.getElementById("point-estimation-y2").innerText = sumRow.avgSumY2;
document.getElementById("point-estimation-xy").innerText = sumRow.avgSumXY;
document.getElementById("standard-deviation-x").innerText = G2x;
document.getElementById("standard-deviation-y").innerText = G2y;
document.getElementById("deviation-x").innerText = round(Gx, 4);
document.getElementById("deviation-y").innerText = round(Gy, 4);
document.getElementById("corelation-koef").innerText = round(rV, 4);
document.getElementById("determination-koef").innerText = round(R2, 4);
/*Invariant*/
var headersInvariant = ["# Interval", "Xi", "Ni", "Ui = Xi - x", "Ti", "f(t)", "n'", "~ni", "nRelation"];
var filterHeader = ["max", "min", "Pr", "n"];
divInvatiant.appendChild(createTableFromHash(hashedInterval, "statistics", headersInvariant, filterHeader));
/*Corelation*/
var headersCorelation = ["i", "Xi", "Yi", "X2", "Y2", "Xi*Yi", "yCor", "Y-yCor", "xCor", "X-xCor"];
divCorelation.appendChild(createTableFromHash(hashedCorelation, "corelation", headersCorelation));
sampleMeanDom.innerText = sampleMean;
varianceDom.innerText = variance;
rangeLabel.value = range.value = 31;
range.addEventListener("change", function (evt) {
    var h = evt.target.value;
    rangeLabel.value = h;
    var tmp = createHashedInterval(+h, min);
    convertInterval(tmp);
});
