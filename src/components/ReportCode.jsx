import { render } from "react-dom";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

const code = `import currencyFormatter from "./currencyFormatter";

function sumExpenses(traveler) {
    return traveler.expenses.reduce(
        (accum, expense) => accum + expense.cost, 0
    );
}

function sorter(a, b){
    return sumExpenses(a) - sumExpenses(b);
}

const expenseReportGenerator = {
    generate(travelers){
        const totalExpenses = travelers.reduce(
            (accum, traveler) => accum + sumExpenses(traveler), 0
        )
        const fairShare = totalExpenses / travelers.length;

        let report = {
            fairShare: currencyFormatter.formatAsUSD(fairShare),
            travelers: []
        };
        
        let peopleWhoAreOwedMoney = [];
        let peopleWhoOweMoney = [];
        let thePeopleWhoAreGood = [];
        for (const traveler of travelers) {
            const net = sumExpenses(traveler) - fairShare;

            if(net > 0) {
                peopleWhoAreOwedMoney.push({
                    ...traveler,
                    net
                });
            } else if(net < 0) {
                peopleWhoOweMoney.push({
                    ...traveler,
                    net: Math.abs(net),
                    peopleAndAmountsOwed: []});
            } else {
                thePeopleWhoAreGood.push({...traveler, net});
            }
        }

        //Make sure that we return a semi-consistent order.
        for (const negative of peopleWhoOweMoney.sort(sorter)) {
            for(const positive of peopleWhoAreOwedMoney) {
                if(negative.net > positive.net) {
                    negative.net = negative.net - positive.net;
                    if(positive.net !== 0) {
                        negative.peopleAndAmountsOwed.push({
                            ...positive,
                            amountTheyAreOwed: positive.net
                        })
                    }

                    positive.net = 0;
                } else {
                    positive.net = positive.net - negative.net;
                    if(negative.net !== 0) {
                        negative.peopleAndAmountsOwed.push({
                            ...positive,
                            amountTheyAreOwed:
                            negative.net
                        })
                    }

                    negative.net = 0;
                }
            }

            report.travelers.push({
                name: negative.name, 
                id: negative.id,
                peopleOwed: negative.peopleAndAmountsOwed.map(
                    (person) => {
                        return {
                            name: person.name,
                            amount: currencyFormatter.formatAsUSD(person.amountTheyAreOwed)
                        }
                    }
                )
            })
        }

        report.travelers = report.travelers.concat(
            peopleWhoAreOwedMoney.map(
                person => ({
                    name: person.name,
                    id: person.id,
                    peopleOwed: []
                })
            )
        )
        report.travelers = report.travelers.concat(
            thePeopleWhoAreGood.map(
                person => ({
                    name: person.name,
                    id: person.id,
                    peopleOwed: []
                })
            )
        )

        return report;
    }
}

export default expenseReportGenerator;`

function ReportCode() {
    
    return <AceEditor
        width="100%"
        height="600px"
        placeholder="expenseReportGenerator Code"
        mode="javascript"
        theme="monokai"
        name="expenseReportGenerator"
        fontSize={14}
        lineHeight={19}
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={true}
        value={code}
        readOnly={true}
        setOptions={{
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: false,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2,
    }}/>
}

export default ReportCode   