// read in the files into a list or something or another
// 'songscrape/jsonfiles/countrysongs.txt.json.sentiment.json',
var songs = [];
var money_songs = [];
var family_songs = [];
var drug_songs = [];
var relationships_songs = [];

$.getJSON( './jsonfiles/countrysongs.txt.json.sentiment.json', function( data ) {
  songs = songs.concat(data);
  $.getJSON( './jsonfiles/rapsongs.txt.json.sentiment.json', function( data ) {
    songs = songs.concat(data);
    for (var i = 0; i < songs.length; i++) {
      if (songs[i].hasOwnProperty('category')){
        if (songs[i]['category'] === 'money') money_songs.push(songs[i]);
        if (songs[i]['category'] === 'family') family_songs.push(songs[i]);
        if (songs[i]['category'] === 'drugs') drug_songs.push(songs[i]);
        if (songs[i]['category'] === 'relationships') relationships_songs.push(songs[i]);
      }
    }
    showgraphs();
  });
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
      if (d.sentiment > 0)
        return "<strong>Song: &nbsp'</strong>" + d.song + "</span>" + "<strong>   <br> Sentiment:</strong> <span style='color:green'>" + d.sentiment + "</span>";
      else
        return "<strong>Song: </strong>" + d.song + "</span>" + "<strong>  <br>  Sentiment:</strong> <span style='color:red'>" + d.sentiment + "</span>";
  })
var showgraphs = function () {
  // MONEY
  var svg = d3.select("#money").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.call(tip);

  x.domain(d3.extent(money_songs, function(d) { return d.sentiment; })).nice();
  y.domain(money_songs.map(function(d) { return d.song; }));

  svg.selectAll(".bar")
      .data(money_songs)
    .enter().append("rect")
      .attr("class", function(d) { return "bar bar--" + (d.genre == 'country' ? "country" : "rap"); })
      .attr("x", function(d) { return x(Math.min(0, d.sentiment)); })
      .attr("y", function(d) { return y(d.song); })
      .attr("width", function(d) { return Math.abs(x(d.sentiment) - x(0)); })
      .attr("height", y.rangeBand())
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + x(0) + ",0)")
      .call(yAxis);


  // drugs
  var svg = d3.select("#drugs").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.call(tip);

  x.domain(d3.extent(drug_songs, function(d) { return d.sentiment; })).nice();
  y.domain(drug_songs.map(function(d) { return d.song; }));

  svg.selectAll(".bar")
      .data(drug_songs)
    .enter().append("rect")
      .attr("class", function(d) { return "bar bar--" + (d.genre == 'country' ? "country" : "rap"); })
      .attr("x", function(d) { return x(Math.min(0, d.sentiment)); })
      // .attr("y", function(d) { return y(d.name); })
      .attr("y", function(d) { return y(d.song); })
      .attr("width", function(d) { return Math.abs(x(d.sentiment) - x(0)); })
      .attr("height", y.rangeBand())
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + x(0) + ",0)")
      .call(yAxis);


  // family
  var svg = d3.select("#family").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.call(tip);

  x.domain(d3.extent(family_songs, function(d) { return d.sentiment; })).nice();
  y.domain(family_songs.map(function(d) { return d.song; }));

  svg.selectAll(".bar")
      .data(family_songs)
    .enter().append("rect")
      .attr("class", function(d) { return "bar bar--" + (d.genre == 'country' ? "country" : "rap"); })
      .attr("x", function(d) { return x(Math.min(0, d.sentiment)); })
      // .attr("y", function(d) { return y(d.name); })
      .attr("y", function(d) { return y(d.song); })
      .attr("width", function(d) { return Math.abs(x(d.sentiment) - x(0)); })
      .attr("height", y.rangeBand())
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + x(0) + ",0)")
      .call(yAxis);


  // relationships
  var svg = d3.select("#relationships").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.call(tip);

  x.domain(d3.extent(relationships_songs, function(d) { return d.sentiment; })).nice();
  y.domain(relationships_songs.map(function(d) { return d.song; }));

  svg.selectAll(".bar")
      .data(relationships_songs)
    .enter().append("rect")
      .attr("class", function(d) { return "bar bar--" + (d.genre == 'country' ? "country" : "rap"); })
      .attr("x", function(d) { return x(Math.min(0, d.sentiment)); })
      .attr("y", function(d) { return y(d.song); })
      .attr("width", function(d) { return Math.abs(x(d.sentiment) - x(0)); })
      .attr("height", y.rangeBand())
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + x(0) + ",0)")
      .call(yAxis);
}
