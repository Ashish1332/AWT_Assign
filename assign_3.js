const fs = require('fs');
const readline = require('readline');

const inputFileName = 'input.txt';
const outputFileName = 'output.txt';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getInput() {
    return new Promise((resolve, reject) => {
        rl.question('Enter arithmetic operation (add/subtract/multiply) followed by operands (space-separated), or type "exit" to finish: ', (input) => {
            resolve(input);
        });
    });
}

async function main() {
    fs.writeFileSync(inputFileName, ''); // Clearing input file initially

    let input = await getInput();
    while (input.trim().toLowerCase() !== 'exit') {
        const line = input.trim() + '\n';
        fs.appendFileSync(inputFileName, line);

        console.log('Input appended to input file.');
        input = await getInput();
    }
    rl.close();
    performArithmetic(inputFileName, outputFileName);
}

function performArithmetic(inputFile, outputFile) {
    fs.readFile(inputFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading input file:', err);
            return;
        }
        const lines = data.trim().split('\n');
        const results = [];

        lines.forEach(line => {
            const [operation, ...operands] = line.split(' ');
            const numbers = operands.map(Number);

            let result;
            switch (operation.toLowerCase()) {
                case 'add':
                    result = numbers.reduce((acc, curr) => acc + curr, 0);
                    results.push(`What is the sum of ${operands.join(', ')}? ${result}`);
                    break;
                case 'subtract':
                    result = numbers.reduce((acc, curr) => acc - curr);
                    results.push(`What is the result of subtracting ${operands.slice(1).join(', ')} from ${operands[0]}? ${result}`);
                    break;
                case 'multiply':
                    result = numbers.reduce((acc, curr) => acc * curr, 1);
                    results.push(`What is the product of ${operands.join(' and ')}? ${result}`);
                    break;
                default:
                    console.error(`Invalid operation: ${operation}`);
            }
        });

        fs.writeFile(outputFile, results.join('\n'), (err) => {
            if (err) {
                console.error('Error writing to output file:', err);
                return;
            }
            console.log('Arithmetic operations performed and results written to', outputFile);
        });
    });
}

main();
