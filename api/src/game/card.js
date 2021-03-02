import _ from "lodash";

export default function generateCard() {
    // First identify the number of values (1-6)
    //identify is negative
    // for each number there is a scale (1-2 [10-30], 3-4 (40-60), 5-6 ( 70-90 ))
    let numRows = 5

    let card = {
        rows: []
    };
    
    for(let i = 0; i < numRows; ++i ) {
        let row = generateRow();
        card.rows.push(row);
    }
    return card;
}

function generateRow() {
    let row = {
        points: 0,
        values: []
    }

    let numValues = _.sample([1,2,3,4,5,6]);
    let isNegative = _.sample([false, false, false, true]);
    let points = 0;

    if(_.inRange(numValues, 1,3)) {
        points = _.sample([10,20,30]);
    } else if (_.inRange(numValues, 3,5)) {
        points = _.sample([40,50,60]);
    } else if( _.inRange(numValues, 5,7)) {
        points = _.sample([70,80,90])
    }
    

    // Generate the values for the dice
    let valueGeneratorWeightings = [
        0, 0, 0, 0,
        1, 1, 1, 1,
        2,2,2,2,2,2,2,2,2,2,2,2,2,2,2
    ];

    let valueGenerators = [
        (numValues)=> {
            // All the same value
            let base = Math.floor(Math.random() * 6) + 1;
            return new Array(numValues).fill(base).map(v=>({diceVal:v}));
        },
        (numValues) => {
            // Runs
            let reverse = Math.round(Math.random())
            let values =  new Array(numValues).fill(null).map((num,idx) => {
                return idx + 1;
            })

            if(reverse) {
                values = values.reverse();
            }

            return values.map(v=>({diceVal:v}));
        },
        (numValues) => {
            // Wilds
            let values = [];
            if (numValues > 3 && _.sample([true, false])) { 

                let midpoint = Math.ceil(numValues/2);
                values = values.concat(new Array(midpoint).fill(null).map(v=>({
                    isWild: true,
                    diceVal: '*'
                })));
                values = values.concat(new Array((numValues-midpoint)).fill(null).map(v=>({
                    isWild: true,
                    diceVal: '**'
                })));
            } else {
                values = values.concat(new Array(numValues).fill(null).map(v=>({
                    isWild: true,
                    diceVal: '*'
                })));
            }
            return values;
        }
    ];



    row.points = points * ( isNegative ? -1 : 1);
    row.values = valueGenerators[_.sample(valueGeneratorWeightings)](numValues);
    row.activeIdx = 0;
    return row;
}