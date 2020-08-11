#About
This is a simple bar chart library written in javascript with the help of jQuery. It was written as a practice in preperation for the lighthouse web development bootcamp. It is able to render horizontal bar charts with various options for customization to fix any theme.

Example Screenshots (embedded within the readme as image tags)

#API
Currently there is only one API call to draw the bar chart, it is formated as follow:
> drawBarChart(dataset, option, parent)
* dataset: accepts array of numbers such as [1,2,3,4], or a nested array of numbers such as [[1,2],[1,2]]. Top level array determine number of main values, numbers within the nested array are displayed from bottom to top with in each bar.
* option: accepts an object with various options that will be listed below. An example would be {title: 'Numbers', barSpacing: 2,}.
* parent: the id of the parent element within the html such as #parent_id.

#Options
#Known issues / bugs
#On the roadmap
#Made with help from
