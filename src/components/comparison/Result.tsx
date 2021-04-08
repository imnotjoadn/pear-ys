import { createStyles, makeStyles, Typography } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import { green } from '@material-ui/core/colors';
import React from 'react';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {

        },
        chosen: {
            
        },
        notChosen: {
            
        }
    })
);

interface ResultProps {
    results: boolean[];
    pairs: string[];
    generatedPairs: [string, string][];
}

function Result (props: ResultProps) {
    const {results, pairs, generatedPairs} = props;
    const classes = useStyles();

    // https://www.d3-graph-gallery.com/graph/heatmap_basic.html
    //    a   b   c   d 
    // a  +   x
    // b  x   +
    // c  x   x   +
    // d  x   x   x   +
    //
    // a (b)
    // b (c)
    // (c) d
    // Summary:
    // (( a (10) ))
    // b (5) c (3) d (1)
    
    const summaryMap = new Map();
    pairs.forEach((i) => summaryMap.set(i,0));
    generatedPairs.forEach((pair, idx) => {
        const selected = results[idx] ? 1 : 0;
        const current = summaryMap.get(pair[selected]);
        summaryMap.set(pair[selected], current + 1);
    });

    const max = pairs.reduce((acc, p) => {
        return Math.max(acc, summaryMap.get(p));
    }, -Infinity);

    const summary = <div>
        {pairs.map((p) => {
            const count = summaryMap.get(p);
            const colorDivision = 100 * Math.round(1 + (8 * count / max));
            return <Chip style={{backgroundColor: green[colorDivision as 100]}} label={`${p} (${count})`} />        })}
    </div>;

    const historyTable = <div>
            <table>
                <tbody>
                    {generatedPairs.map((pair, idx) =>
                        <tr>
                            <td className={results[idx] ? classes.chosen : classes.notChosen}>                            
                                <Chip label={pair[0]}
                                    variant={results[idx] ? 'outlined' : 'default'} 
                                    color={results[idx] ? 'default' : 'primary'} />
                            </td>
                            <td className={results[idx] ? classes.notChosen : classes.chosen}>
                                <Chip label={pair[1]}
                                    variant={!results[idx] ? 'outlined' : 'default'} 
                                    color={!results[idx] ? 'default' : 'primary'} />
                            </td>
                        </tr>)}
                </tbody>
            </table>
        </div>;

    //    a   b   c   d 
    // a  +   x
    // b  x   +
    // c  x   x   +
    // d  x   x   x   +


    // Iterate over generated pairs and lookup to result: 
    //   (0)[a,b] => r[0] = t
    // Mark
    //  [a,b] => mark
    //  [b,a] => mark
    //  
    const resultTable: (number)[][] = new Array(pairs.length);

    for(let i = 0; i < pairs.length; i++) {
        resultTable[i] = new Array(pairs.length).fill(0);
    }
    
    generatedPairs.forEach((p, idx) => {
        const result = results[idx];
        const leftIdx = pairs.indexOf(p[0]);
        const rightIdx = pairs.indexOf(p[1]);    
        console.log(p[0], p[1], result);
        if (result) {
            // right was chosen
            resultTable[leftIdx][rightIdx] = 1;
            resultTable[rightIdx][leftIdx] = -1;
        } else {
            // left was chosen
            resultTable[leftIdx][rightIdx] = -1;
            resultTable[rightIdx][leftIdx] = 1;
        }
        // resultTable[leftIdx][rightIdx] = result ? 0 : 1;
        // resultTable[rightIdx][leftIdx] = result ? 0 : 1;
    });
    // https://jsfiddle.net/89fm7xja/
    // https://jsfiddle.net/89fm7xja/1/
    // https://jsfiddle.net/89fm7xja/1/#&togetherjs=oD98KlprjJ

    const heatmapTable = <div>
        <table>
            <tbody>
                {resultTable.map((row, rowIdx) => {
                    const length = row.length;
                    const cols = row.map((col, colIdx) => 
                        <td style={{backgroundColor: `${col === 1 ? 'green' : ''}`}}></td>
                    );
                    return <tr>
                    <td>{pairs[rowIdx]}</td>                    
                    {cols}
                    </tr>
                })}
                <tr>
                    <td></td>
                    {pairs.map((pair) =><td>{pair}</td>)}                    
                </tr>
            </tbody>
        </table>
    </div>;

    return (
        <React.Fragment>
            <Typography variant="h4">Summary</Typography>
            {summary}
            <Typography variant="h4">Table</Typography>
            {heatmapTable}
            <Typography variant="h4">History</Typography>
            {historyTable}
        </React.Fragment>
    )
}

export default Result;