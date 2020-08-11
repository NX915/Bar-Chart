# About

This is a simple bar chart library written in javascript with the help of jQuery. It was written as a practice in preperation for the lighthouse web development bootcamp. It is able to render horizontal bar charts with various options for customization to fix any theme.

Example Screenshots (embedded within the readme as image tags)

# API
Currently there is only one API call to draw the bar chart, it is formated as follow:
> drawBarChart(dataset, option, parent)
* **dataset**: accepts array of numbers such as [1, 2, 3, 4], or a nested array of numbers such as [[1, 2], [1, 2]]. Top level array determine number of main values, numbers within the nested array are displayed from bottom to top with in each bar.
* **option**: accepts an object with various options that will be listed below. An example would be {title: 'Numbers', barSpacing: 2,}.
* **parent**: the id of the parent element within the html such as #parent_id.

# Options **type** *example*
* axisColor: **string** *'#b5b5b5'*
* barColor: **array of strings** *['#7d7d7d', '#b5b5b5', '#f5f5f5', 'green', 'blue', 'purple']*
* barchartTitleSize: **string** *'50px'*
* barchartTitleColor: **string** *'#b5b5b5'*
* barchartTitleCss: {'margin': '15px'},
* barchartWidth: '80%',
* barchartHeight: '83%',
* barLabel: ['QC', 'ON', 'AB', 'BC', 'SK', 'NS'],
* barLabelPosition: 'top',
* barLabelColor: '#f5f5f5',
* barStatColor: ['purple', 'orange', 'green'],
* barStatPosition: 'none',
* barSpacing: 7,
* chartHeight: 125000,
* tickInterval: 5000,
* tickStyle: 'thin dotted #2e2e2e',
* title: 'Cov-19 in Canada',
* xLabel: 'Provience',
* xLabelOffset: '-5px',
* yLabel: 'Cases (Aug 11 2020)',
* yLabelOffset: '10px',

# Known issues / bugs

# On the roadmap

# Made with help from
