# Automata Generator
A Node for Max script used to compute rows of cellular auomata according to any rule between 1-127.  Can be outputted as single digits, or in rows.  

#To Use:

There are four inputs to the script:

1. seedData (symbol) -
input a list of any length in parentheses ex. "00100000" to set the current row

2.  changeRule (int)
input an int from 1-127 to set the current rule determining how each index of the row updates

3.  switchMode
switches between the two modes of the script which affects the final input

4.  computeRow
  MODE 0:  outputs the next row according the current rule
  MODE 1: ouputs the next index in the current row,  when the final index is reached, a new row is computed
  
Link to explananation of Elementary Cellular Automata:  https://mathworld.wolfram.com/ElementaryCellularAutomaton.html
