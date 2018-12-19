var config = {
    prop_1: [172, 171, 191, 132, 179, 221, 283, 86, 61, 53, 284, 281, 257, 50, 229, 104, 84, 133, 226, 159, 133, 153, 296, 179, 189, 203, 174, 157, 296, 265, 111, 223, 246, 47, 176, 288, 223, 186, 52, 191, 133, 53, 299, 179, 189, 203, 174, 157, 296, 265, 211, 223, 246, 47, 326, 288, 223, 186, 52, 193, 172, 171, 191, 132, 179, 223, 283, 186, 61, 333, 284, 281, 257, 330, 239, 100, 83, 132, 226, 159, 153, 203, 296, 179, 139, 193, 164, 147, 286, 255, 141, 233, 246, 48, 136, 258, 263, 176, 54, 131],
    prop_2: [27, 25, 20, 24, 26, 34, 33, 21, 29, 11, 35, 31, 33, 11, 40, 13, 19, 19, 33, 26, 19, 11, 41, 36, 24, 30, 24, 33, 16, 36, 39, 32, 32, 9, 19, 36, 34, 26, 10, 20, 19, 11, 40, 36, 14, 30, 24, 33, 16, 36, 39, 30, 32, 9, 19, 36, 34, 26, 10, 22, 27, 25, 20, 24, 28, 34, 33, 21, 29, 11, 30, 31, 33, 11, 41, 13, 19, 19, 32, 25, 16, 17, 44, 36, 22, 31, 24, 31, 15, 33, 39, 31, 37, 16, 16, 36, 34, 26, 10, 20,],
};
var hashedCorelation = {};
for (var m = 0; m < 25; m++) {
    var tmp = { Xi: config.prop_1[m], Yi: config.prop_2[m] };
    hashedCorelation[m] = tmp;
}
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
function average(x, y) {
    return (x + y) / 2;
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
    Object.entries(input).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        value.sampleMeanGeneral = sampleMeanGeneral(value.min);
        value.nForMe = value.n;
        value.condOpt = conditionalOptions(value.min);
        value.stDev = standartDeviation(value.min);
        value.normDist = normalDistribution(value.stDev);
        value.theorFreq = theoreticalFrequency(value.normDist);
        value.theorFreqRound = Math.round(value.theorFreq);
        value.nRelation = nQuadricRelation(value.n, value.theorFreqRound);
    });
}
var hashedInterval = createHashedInterval(h, min);
convertInterval(hashedInterval);
normalDisribution(hashedInterval);
function createTableFromHash(input) {
    var table = document.createElement("table");
    var filterHeader = ["max", "min", "Pr", "n"];
    var sumHeader = ["~ni", "nRelation"];
    var sumN = 0;
    var sumNrel = 0;
    table.setAttribute("id", "statistics");
    var headers = ["# Interval", "Xi", "Ni", "Ui = Xi - x", "Ti", "f(t)", "n'", "~ni", "nRelation"];
    var tr = document.createElement("tr");
    var lastRow = document.createElement("tr");
    headers.forEach(function (x) {
        var th = document.createElement("th");
        var emptyTd = document.createElement("td");
        th.innerHTML = x;
        tr.appendChild(th);
        emptyTd.setAttribute("id", x);
        lastRow.appendChild(emptyTd);
    });
    table.appendChild(tr);
    Object.entries(input).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        td.innerHTML = key;
        tr.appendChild(td);
        Object.entries(value).forEach(function (_a) {
            var key = _a[0], val = _a[1];
            if (filterHeader.includes(key))
                return;
            if (key === "nRelation") {
                sumNrel += val;
            }
            if (key === "theorFreqRound") {
                sumN += val;
            }
            var td = document.createElement("td");
            td.innerHTML = val;
            tr.appendChild(td);
        });
        table.appendChild(tr);
        table.appendChild(lastRow);
    });
    document.body.appendChild(table);
    document.getElementById("nRelation").innerText = round(sumNrel, 2);
    document.getElementById("~ni").innerText = round(sumN, 2);
}
createTableFromHash(hashedInterval);
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
console.log(hashedInterval);
/**** DOM ****/
var range = document.getElementById("rangeInput");
var rangeLabel = document.getElementById("textInput");
var varianceDom = document.getElementById("variance");
var sampleMeanDom = document.getElementById("sample-mean");
sampleMeanDom.innerText = sampleMean;
varianceDom.innerText = variance;
rangeLabel.value = range.value = 31;
range.addEventListener('change', function (evt) {
    var h = evt.target.value;
    rangeLabel.value = h;
    var tmp = createHashedInterval(+h, min);
    convertInterval(tmp);
});
