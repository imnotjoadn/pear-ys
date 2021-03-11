# pear-ys
pairwise decision tool

Pairwise. 3 options. 
A,C A  
B,C B
A,B A
-----
A
C
B

Options, 3.
NZ
Skiing
Pizza

Start.
NZ     | * * * * * | Skiing
Skiing | * * * * * | Pizza

Final rank list.

1 - x
2 - 1
3 - 3
4 - 6
NC2 -> n! / ((n-k)!k!)

Share - 

Rough plan: 
  - Create - add the options for your comparison ✔
  - Compare - iterate through the pair combinations (Start button)
  - Review - results: 
    - Author: would see heatmap graph (public option?)
    - View their own results


Tech stack: 
- React (Create React App)
- Firebase (DB / Users)
- Redux (State management)
- Material UI (UI Framework)
- TypeScript
- React Router
- CLSX (clsx([classes.A, {
  conditionTrue: classes.B
}])) 'A B'