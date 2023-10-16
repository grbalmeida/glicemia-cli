import * as fs from 'fs';
import chalk from 'chalk';

const csvFile = fs.readFileSync('glicemia.csv', 'utf8');

const QUANTIDADE_MAXIMA_EXIBIDA = 80;
const UNICODE_QUADRADO = "□";
const valoresGlicemia = csvFile
	.split('\n')
	.map(linha => Number((linha.split(',')[1] || '').replace(/\r/g, '')))
	.slice(1)
  .reverse()
	.slice(0, QUANTIDADE_MAXIMA_EXIBIDA)
  .reverse();

const MAIOR_VALOR_GLICEMIA = Math.max(...valoresGlicemia);
const GLICEMIA_MAXIMA = Math.ceil(Math.round(MAIOR_VALOR_GLICEMIA) / 10) * 10;
const UNIDADES_MEDIDA = 5;
const CARACTERE_UNIDADE_GLICEMICA = '| ';

const vl = valoresGlicemia.map(v => Math.round(v / UNIDADES_MEDIDA));

let display = '';

for (let i = GLICEMIA_MAXIMA / UNIDADES_MEDIDA; i > 0; i--) {
  display += ` ${i * UNIDADES_MEDIDA} `.padStart(5, ' ');
  
  vl.forEach(v => {
    if (v >= i) {
      if (v < 14) {
        display += chalk.blue(CARACTERE_UNIDADE_GLICEMICA);
      } else if (v >= 14 && v <= 20) {
        display += chalk.green(CARACTERE_UNIDADE_GLICEMICA);
      } else if (v >= 21 && v <= 25) {
        display += chalk.yellow(CARACTERE_UNIDADE_GLICEMICA);
      } else {
        display += chalk.red(CARACTERE_UNIDADE_GLICEMICA);
      }
      
    } else {
      display += '  ';
    }
  });

  display += '\n';
}

display += '   ';
display += ''.padEnd(QUANTIDADE_MAXIMA_EXIBIDA * 2, '-');

console.log(display);

console.log(`
${chalk.blue(`\t${UNICODE_QUADRADO} - < 70.0 - Baixo`)}
${chalk.green(`\t${UNICODE_QUADRADO} - 71.0~100.0 - Normal`)}
${chalk.yellow(`\t${UNICODE_QUADRADO} - 101.00~125.0 - Pré-diabetes`)}
${chalk.red(`\t${UNICODE_QUADRADO} > 125.0 - Diabetes`)}
`);
