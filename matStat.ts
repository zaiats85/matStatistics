interface Scoretime {
    prop_1: number[];
    prop_2: number[];
}

let config: Scoretime = {
    prop_1: [172, 171, 191, 132, 179, 221, 283, 86, 61, 53, 284, 281, 257, 50, 229, 104, 84, 133, 226, 159, 133, 153, 296, 179, 189, 203, 174, 157, 296, 265, 111, 223, 246, 47, 176, 288, 223, 186, 52, 191, 133, 53, 299, 179, 189, 203, 174, 157, 296, 265, 211, 223, 246, 47, 326, 288, 223, 186, 52, 193, 172, 171, 191, 132, 179, 223, 283, 186, 61, 333, 284, 281, 257, 330, 239, 100, 83, 132, 226, 159, 153, 203, 296, 179, 139, 193, 164, 147, 286, 255, 141, 233, 246, 48, 136, 258, 263, 176, 54, 131],
    prop_2: [27, 25, 20, 24, 26, 34, 33, 21, 29, 11, 35, 31, 33, 11, 40, 13, 19, 19, 33, 26, 19, 11, 41, 36, 24, 30, 24, 33, 16, 36, 39, 32, 32, 9, 19, 36, 34, 26, 10, 20, 19, 11, 40, 36, 14, 30, 24, 33, 16, 36, 39, 30, 32, 9, 19, 36, 34, 26, 10, 22, 27, 25, 20, 24, 28, 34, 33, 21, 29, 11, 30, 31, 33, 11, 41, 13, 19, 19, 32, 25, 16, 17, 44, 36, 22, 31, 24, 31, 15, 33, 39, 31, 37, 16, 16, 36, 34, 26, 10, 20],
};

interface Corelation {
    Xi: number;
    Yi: number;
    Xi2: number;
    Yi2: number;
    XiYi: number;
    yCor: number;
    "Y-yCor": number;
    xCor: number;
    "X-xCor": number;
}

let hashedCorelation: object = {};
let sumX = 0;
let sumY = 0;
let sumX2 = 0;
let sumY2 = 0;
let sumXY = 0;

/*length of Sample*/
let mSample = 25;

for (let m: number = 0; m < mSample; m++) {
    const a = config.prop_1[m];
    const b = config.prop_2[m];
    sumX += a;
    sumY += b;
    sumX2 += a * a;
    sumY2 += b * b;
    sumXY += a * b;

    const tmp: Corelation = {"Xi": a, "Yi": b, "Xi2": a ** 2, "Yi2": b ** 2, "X*Xy": a * b};
    hashedCorelation[m] = tmp;
}

let sumRow: object;

sumRow = {
    avgSumX: average(sumX, mSample),
    avgSumY: average(sumY, mSample),
    avgSumX2: average(sumX2, mSample),
    avgSumY2: average(sumY2, mSample),
    avgSumXY: average(sumXY, mSample),
};

hashedCorelation.totals = sumRow;

function corelationDeviation(a: number, b: number): number {
    return round(a - b ** 2, 4);
}

/*Variance x, y and sample means*/
let G2x = corelationDeviation(sumRow.avgSumX2, sumRow.avgSumX);
let G2y = corelationDeviation(sumRow.avgSumY2, sumRow.avgSumY);
let Gx = Math.sqrt(G2x);
let Gy = Math.sqrt(G2y);

/*Coefficient of determination*/
const rV = (sumRow.avgSumXY - sumRow.avgSumX * sumRow.avgSumY) / (Gx * Gy);
const R2 = rV ** 2;

/*Linear Regression Equation*/
function linearRegression(predicate: string, sumMaster: number, sumDependant: number, key: number): number {
    let koef: number;
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

function linearRegressionUI(predicate: string, sumMaster: number, sumDependant: number, key: number): number {
    let koef: number;
    let conjunctor: number;
    let strVar: string;
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

    return `${koef}*${strVar}${(conjunctor < 0) ? conjunctor.toString() : `+${conjunctor.toString()}`}`;
}

Object.values(hashedCorelation).forEach((value) => {
    value.yCor = linearRegression("y", sumRow.avgSumY, sumRow.avgSumX, value.Xi);
    value["Y-yCor"] = round(value.Yi - value.yCor, 4);
    value.xCor = linearRegression("x", sumRow.avgSumX, sumRow.avgSumY, value.Yi);
    value["X-xCor"] = round(value.Xi - value.xCor, 4);
});


let sorted: number[] = config.prop_1.sort((a, b) => (a - b));
let max: number = Math.max(...sorted);
let min: number = Math.min(...sorted);
const N: number = sorted.length;
const h = 38;

const normalize = () => {
    const ordered: object = {};
    for (let i: number = 0; i < N; i++) {
        const current = sorted[i];
        if (!ordered.hasOwnProperty(current)) {
            ordered[current] = 1;
        } else {
            ordered[current]++;
        }
    }
    return ordered;
};

let ordered = normalize();
const fakeZeroVal: number = +Object.keys(ordered).reduce((a, b) => ordered[a] > ordered[b] ? a : b);

const getSampleMean = () => {
    let sum: number = 0;
    Object.entries(ordered).forEach(([key, value]) => {
        sum += +key * (+value);
    });
    /*Sample mean*/
    return (1 / N) * sum;
};

const sampleMean: number = getSampleMean();

const Variance = (input) => {
    let varSumHelper: number = 0;
    Object.entries(input).forEach(([key, value]) => {
        varSumHelper += ((key - fakeZeroVal) ** 2) * value;
    });
    return (1 / N) * varSumHelper - (sampleMean - fakeZeroVal) ** 2;
};

const variance = Math.ceil(Math.sqrt(Variance(ordered)));

function average<T>(input: T, m: T): T {
    return input / m;
}

function sampleMeanGeneral<T>(x: T): T {
    return x + h / 2;
}

function round<T>(input: T, koef: T): T {
    const m = 10 ** koef;
    return Math.round(input * m) / m;
}

function standartDeviation<T>(x: T): T {
    return round(conditionalOptions(x) / variance, 2);
}

function normalDistribution<T>(x: T): T {
    return round(Math.sqrt(2 * Math.PI) ** (-1) * Math.E ** (-((x ** 2) / 2)), 4);
}

function conditionalOptions<T>(x: T): T {
    return round(sampleMeanGeneral(x) - sampleMean, 2);
}

function theoreticalFrequency<T>(f: T): T {
    return round((N * h / variance) * f, 2);
}

function nQuadricRelation<T>(n1: T, n: T): T {
    return round((n1 - n) ** 2 / n, 4);
}

function createHashedInterval(h, minimum): object {
    const hashedInterval: object = {};

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

function convertInterval(input: object): void {
    Object.entries(input).forEach(([key, value]) => {
        for (let j: number = value.min; j < value.max; j++) {
            const frequency = ordered[j];
            if (frequency) {
                value.n += frequency;
                value.Pr = value.n / N;
            }
        }
    });
}

function normalDisribution(input): void {
    let Ni = 0;
    let NFDi = 0;
    let deltaNi = 0;

    Object.entries(input).forEach(([key, value]) => {
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
    input.total = {a: "", nForMe: Ni, b: "", c: "", d: "", e: "", theorFreqRound: NFDi, nRelation: round(deltaNi, 4)};
}

let hashedInterval = createHashedInterval(h, min);
convertInterval(hashedInterval);
normalDisribution(hashedInterval);

/**** HELPERS ****/
const getSampleMeanAlternative = () => {
    let freekSum: number = 0;
    let result: number;

    Object.entries(ordered).forEach(([key, value]) => {
        freekSum += (key - fakeZeroVal) * value;
    });
    result = (1 / N) * freekSum + fakeZeroVal;
    return result;
};
function createTableFromHash(input: object, id: string, headers: string[], filterHeader?: string[]): object {
    const table = document.createElement("table");
    const headerRow = document.createElement("tr");
    table.setAttribute("id", id);
    headers.forEach((x) => {
        const th = document.createElement("th");
        th.innerHTML = x;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
    Object.entries(input).forEach(([key, value]) => {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.innerHTML = key;
        tr.appendChild(td);
        Object.entries(value).forEach(([key, val]) => {
            if (key && filterHeader && filterHeader.includes(key)) { return; }
            const td = document.createElement("td");
            td.innerHTML = !isNaN(val) ? val : "-";
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
    return table;
}

/**** DOM ****/
let range = document.getElementById("rangeInput");
let rangeLabel = document.getElementById("textInput");
let varianceDom = document.getElementById("variance");
let sampleMeanDom = document.getElementById("sample-mean");

let divInvatiant = document.getElementById("chart-description");
let divCorelation = document.getElementById("corelation-description");

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
const headersInvariant: string[] = ["# Interval", "Xi", "Ni", "Ui = Xi - x", "Ti", "f(t)", "n'", "~ni", "nRelation"];
const filterHeader: string[] = ["max", "min", "Pr", "n"];
divInvatiant.appendChild(createTableFromHash(hashedInterval, "statistics", headersInvariant, filterHeader));

/*Corelation*/
const headersCorelation: string[] = ["i", "Xi", "Yi", "X2", "Y2", "Xi*Yi", "yCor", "Y-yCor", "xCor", "X-xCor"];

divCorelation.appendChild(createTableFromHash(hashedCorelation, "corelation", headersCorelation));

sampleMeanDom.innerText = sampleMean;
varianceDom.innerText = variance;

rangeLabel.value = range.value = 31;

range.addEventListener("change", (evt) => {
    const h = evt.target.value;
    rangeLabel.value = h;
    const tmp = createHashedInterval(+h, min);
    convertInterval(tmp);
});
