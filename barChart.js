const barChartData = (input, filterKeys) => {
    let res = [];
    Object.entries(input).forEach(([key, val]) => {
        if (filterKeys.includes(key)) return;
        res.push({interval: key, pr: val.Pr})
    });
    res.unshift({interval: "start", pr: 0});
    res.push({interval: "finish", pr: 0});
    return res;
};

const lineChartData = (input, filterKeys) => {
    let res = [];

    console.log(input);

    Object.entries(input).forEach(([key, val]) => {
        if (filterKeys.includes(key)) return;
        res.push({"x": +val.Xi, "y": +val.Yi})
    });
    return res;
};

const d3 = window.d3;

/************* D3 bar chart***********/
let margin = {top: 30, right: 30, bottom: 40, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

let x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);

let y = d3.scaleLinear()
    .range([height, 0]);

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
let svg = d3.select(".bar-chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let drawBarChart = (data) => {
    // format the data
    data.forEach((d) => {
        d.pr = +d.pr;
    });
    // Scale the range of the data in the domains
    x.domain(data.map((d) => d.interval));
    y.domain([0, d3.max(data, d => d.pr)]);
    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.interval))
        .attr("width", x.bandwidth())
        .attr("y", (d) => y(d.pr))
        .attr("height", (d) => height - y(d.pr));

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

    // Remove old ones
    svg.exit().remove();
};

/************* D3 line chart***********/
let svg2 = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let xScl = d3.scaleLinear()
    .range([0, width]);

let yScl = d3.scaleLinear()
    .range([height, 0]);

let xAxis = d3.axisBottom()
    .scale(xScl);

let yAxis = d3.axisLeft()
    .scale(yScl);

let drawLineChart = (data, types) => {

    yScl.domain(d3.extent(data, d => d.y));
    xScl.domain(d3.extent(data, d => d.x));

    // see below for an explanation of the calcLinear function
    let lg = calcLinear(data, "x", "y", d3.min(data, (d) => d.x), d3.min(data, (d) => d.y), d3.max(data, (d) => d.x), d3.max(data, (d) => d.y));

    svg2.append("line")
        .attr("class", "regression")
        .attr("x1", xScl(lg.ptA.x))
        .attr("y1", yScl(lg.ptA.y))
        .attr("x2", xScl(lg.ptB.x))
        .attr("y2", yScl(lg.ptB.y));

    svg2.append("line")
        .attr("class", "regression-2")
        .attr("x1", xScl(lg.ptA1.x))
        .attr("y1", yScl(lg.ptA1.y))
        .attr("x2", xScl(lg.ptB1.x))
        .attr("y2", yScl(lg.ptB1.y));

    svg2.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg2.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    svg2.selectAll(".point")
        .data(data)
        .enter().append("circle")
        .attr("class", "point")
        .attr("r", 3)
        .attr("cy", d => yScl(d.y))
        .attr("cx", d => xScl(d.x));
};

function types(d) {
    d.x = +d.x;
    d.y = +d.y;
    return d;
}

// Calculate a linear regression from the data

// Takes 5 parameters:
// (1) Your data
// (2) The column of data plotted on your x-axis
// (3) The column of data plotted on your y-axis
// (4) The minimum value of your x-axis
// (5) The minimum value of your y-axis

// Returns an object with two points, where each point is an object with an x and y coordinate

function calcLinear(data, x, y, minX, minY, maxX, maxY) {
    // Let n = the number of data points
    let Yx = linearRegressionUI("y", sumRow.avgSumY, sumRow.avgSumX, sumRow.avgSumX);
    let Xy = linearRegressionUI("x", sumRow.avgSumX, sumRow.avgSumY, sumRow.avgSumY);

    console.log(Yx);
    console.log(Xy);

    // Print the equation below the chart
    document.getElementsByClassName("equation")[0].innerHTML = "Yx = " + Yx;
    document.getElementsByClassName("equation")[1].innerHTML = "Xy =  " + Xy;

    console.log(maxY);
    let x2 = linearRegression("x", sumRow.avgSumX, sumRow.avgSumY, maxY);

    // return an object of two points
    // each point is an object with an x and y coordinate
    return {
        ptA: {
            x: 0,
            y: linearRegression("y", sumRow.avgSumY, sumRow.avgSumX, 0),
        },
        ptB: {
            x: maxX,
            y: linearRegression("y", sumRow.avgSumY, sumRow.avgSumX, maxX),
        },
        ptA1: {
            x: linearRegression("x", sumRow.avgSumX, sumRow.avgSumY, 0),
            y: 0,
        },
        ptB1: {
            x: linearRegression("x", sumRow.avgSumX, sumRow.avgSumY, maxY),
            y: maxY
        }
    }
}
const filterKeyBarChart = ["total"];
const filterKeyLineChart = ["X*Xy", "X-xCor", "Xi2", "Y-yCor", "Yi2", "xCor", "yCor", "totals"];

window.onload = drawBarChart(barChartData(hashedInterval, filterKeyBarChart));
window.onload = drawLineChart(lineChartData(hashedCorelation, filterKeyLineChart), types);
