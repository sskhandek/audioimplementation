// read in the files into a list or something or another
// 'songscrape/jsonfiles/countrysongs.txt.json.sentiment.json',
var songs = [];
$.getJSON( './jsonfiles/countrysongs.txt.json.sentiment.json', function( data ) {
  songs = songs.concat(data);
  console.log(data);
});
$.getJSON( './jsonfiles/rapsongs.txt.json.sentiment.json', function( data ) {
  songs = songs.concat(data);
  console.log(data);
});



var margin = {top: 20, right: 30, bottom: 40, left: 30},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.ordinal()
    .rangeRoundBands([0, height], 0.1);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickSize(0)
    .tickPadding(6);

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Value:</strong> <span style='color:red'>" + d.value + "</span>";
  })

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

d3.csv("data.csv", type, function(error, data) {
  x.domain(d3.extent(data, function(d) { return d.value; })).nice();
  y.domain(data.map(function(d) { return d.name; }));

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", function(d) { return "bar bar--" + (d.genre == 'country' ? "country" : "rap"); })
      .attr("x", function(d) { return x(Math.min(0, d.value)); })
      .attr("y", function(d) { return y(d.name); })
      .attr("width", function(d) { return Math.abs(x(d.value) - x(0)); })
      .attr("height", y.rangeBand())
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + x(0) + ",0)")
      .call(yAxis);
});

function type(d) {
  d.value = +d.value;
  return d;
}
