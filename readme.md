# About

This is a simple bar chart library written in javascript with the help of jQuery. It was written as a practice in preperation for the lighthouse web development bootcamp. It is able to render horizontal bar charts with various options for customization to fix any theme.

Example Screenshots (embedded within the readme as image tags)

# API
Currently there is only one API call to draw the bar chart, it is formated as follow:
> drawBarChart(dataset, option, parent)
* **dataset**: accepts array of numbers such as *[1, 2, 3, 4]*, or a nested array of numbers such as *[[1, 2], [1, 2]]*. Top level array determine number of main values, numbers within the nested array are displayed from bottom to top with in each bar.
* **option**: accepts an object with various options that will be listed below. An example would be {title: 'Numbers', barSpacing: 2,}.
* **parent**: the id of the parent element within the html such as #parent_id.

# Options (**type** *example*)
name | type | example
--- | --- | ---
axisColor:| **string**| *'#b5b5b5'*
barColor:| **array of strings**| *['#7d7d7d', '#b5b5b5', '#f5f5f5', 'green', 'blue', 'purple']*
barchartTitleSize:| **string**| *'50px'*
barchartTitleColor:| **string**| *'#b5b5b5'*
barchartTitleCss:| **object**| *{'margin': '15px'}*
barchartWidth:| **string**| *'80%'*
barchartHeight:| **string**| *'83%'*
barLabel:| **array of strings**| *['QC', 'ON', 'AB', 'BC', 'SK', 'NS']*
barLabelPosition:| **string**| *'top' or 'center' default to bottom*
barLabelColor:| **string**| *'#f5f5f5'*
barStatColor:| **array of strings**| *['purple', 'orange', 'green']*
barStatPosition:| **string**| *'none' or 'center' or 'bottom' default to top*
barSpacing:| **number**| *7*
chartHeight:| **number**| *125000*
tickInterval:| **number**| *5000*
tickStyle:| **string**| *'thin dotted #2e2e2e' CSS border format*
title:| **string**| *'Cov-19 in Canada'*
xLabel:| **string**| *'Provience'*
xLabelOffset:| **string**| *'-5px'*
yLabel:| **string**| *'Cases (Aug 11 2020)'*
yLabelOffset:| **string**| *'10px'*

# Known issues / bugs

# On the roadmap

# Made with help from
