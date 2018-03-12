import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';

import { Token } from './token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  
    IdIdentificador: number = 0; // ID dos identificadores
  
    reservadas = [
      { nome: "(", funcao: "Abre parenteses" },
      { nome: ")", funcao: "Fecha parenteses" },
      { nome: "{", funcao: "Abre chaves" },
      { nome: "}", funcao: "Fecha chaves" },
      { nome: "'", funcao: "Aspas simples" },
      { nome: '"', funcao: "Aspas duplas" },
      { nome: "=", funcao: "Atribuição" },
      { nome: "==", funcao: "igual" },
      { nome: "!=", funcao: "Não igual" },
      { nome: "===", funcao: "Estritamente igual" },
      { nome: "!==", funcao: "Estritamente não igual" },
      { nome: ">", funcao: "Maior que" },
      { nome: ">=", funcao: "Maior que ou igual" },
      { nome: "<", funcao: "Menor que" },
      { nome: ">=", funcao: "Menor que ou igual" },
      { nome: "%", funcao: "Módulo" },
      { nome: "++", funcao: "Incremento" },
      { nome: "--", funcao: "Decremento" },
      { nome: "-", funcao: "Negação" },
      { nome: "+", funcao: "Adição" },
      { nome: "**", funcao: "Operador de exponenciação" },
      { nome: "var", funcao: "Define variavel" },
      { nome: "let", funcao: "Declara variaveis limitando o escopo" },
      { nome: "if", funcao: "Codicional Se" },
      { nome: "else", funcao: "Condicional Se não" },
      { nome: "for", funcao: "Laço de repetição" },
      { nome: "while", funcao: "Laço de repetição" },
      { nome: "do", funcao: "Codicional faça" },
      { nome: "if else", funcao: "Codicional Se se não" },
      { nome: ";", funcao: "Terminador" },
      { nome: "alert", funcao: "Abre uma caixa de alerta" },
      { nome: "break", funcao: "parada" },
      { nome: "case", funcao: "Caso" },
      { nome: "class", funcao: "Classe" },
      { nome: "const", funcao: "Define uma Constatante" },
      { nome: "continue", funcao: "Continue a execução" },
      { nome: "default", funcao: "Escolha padrão" },
      { nome: "delete", funcao: "Apagar" },
      { nome: "function", funcao: "Função" },
      { nome: "import", funcao: "Importação" },
      { nome: "new", funcao: "novo objeto" },
      { nome: "this", funcao: "instancia atual" },
      { nome: "void", funcao: "Valor ou retorno Vazio" },
      { nome: "try", funcao: "Testa um bloco" },
      { nome: "catch", funcao: "Trata uma exceção" },
      { nome: "finally", funcao: "Treta uma exceção sempre é executada" },
      { nome: "debugger", funcao: "Testa um bloco de código" },
      { nome: "switch", funcao: "Testa uma expressão" },
      { nome: "instanceof", funcao: "Testa se dois objetos são do mesmo tipo" },
      { nome: "export", funcao: "É usado para esportar funções, objetos ou valores primitivos." },
      { nome: "throw", funcao: "Lança uma exceção definida pelo usuario" },
      { nome: "super", funcao: "É usado para acessar o objeto parente de um objeto" },
      { nome: "with", funcao: "extende a cadeia de escopo de uma declaração" },
      { nome: "yield", funcao: "é usada para passar a resumir um gerador function" },
      { nome: "in", funcao: "Retorna true se a propriedade especificada estinver no objeto" }
    ]
  
    //  Entrada do código fonte.
    codFonte: string =
    ` var trabalho;\n\n if ( trabalho == 'feito' ) {\n    alert('Passou')\n }\n\n else\n    alert('Se deu MALLLL!!!')`;
  
    token: Token[] = [];  //  Array com os tokens estraido do código fonte.
  
  
    ngOnInit() {
      //this.estractWord();
    }
  
    compiler() {
      this.token = [];
      //this.codFonte += "\n";
      this.estractWord();
    }
  
    /*  Verifica o codigo fonte ................................ */
    public estractWord() {
      let linha: number = 0;
      let coluna: number = 0;
      let fixColuna: number = 0;
      let qtdCaracters: number = this.codFonte.length;
      let palavra: string = "";
      let aspas: boolean = false;
  
      //  Percorre as linhas do código fonte.
      for (let i = 0; i <= qtdCaracters; i++) {
  
        console.log("QtdCaracter: " + qtdCaracters)
        //  Incrementa a linha e zera a coluna.
        if (this.codFonte.charAt(i) == "\n") {
          linha++;
          coluna = -1;
          qtdCaracters++; //  Adiciona as quebra de linha 
        }
  
        if (aspas) { // Captura os caracteres até que feche as aspas.
          palavra += this.codFonte.charAt(i);
  
          if (this.codFonte.charAt(i + 1) == "'") {
            palavra += "'";
            aspas = false;
            this.token.push(new Token(palavra, 'Constante', linha + ", " + fixColuna))
  
            palavra = "";
            fixColuna = 0;
            i++;
            coluna++;
          }
  
        }
  
        else {
          //  Insere a palavra no array e Limpa a string palavra 
          if ((this.codFonte.charAt(i) == " " || this.codFonte.charAt(i) == "\n") && palavra != "") {
            this.token.push(new Token(palavra, this.pesquisaReservada(palavra), linha + ", " + fixColuna))
  
            palavra = "";
            fixColuna = 0;
          }
  
          if (this.codFonte.charAt(i) != " " && this.codFonte.charAt(i) != "\n"
            && this.codFonte.charAt(i) != "("
            && this.codFonte.charAt(i) != ")"
            && this.codFonte.charAt(i) != "{"
            && this.codFonte.charAt(i) != "}"
            //&& this.codFonte.charAt(i) != "'"
            && this.codFonte.charAt(i) != ";") {
  
            if (palavra == "") // Fixa a coluna no inicio da palavra.
              fixColuna = coluna;
  
            if (this.codFonte.charAt(i) == "'") //  Caso for aberto aspas altera o indicador de aspas.
              aspas = true;
  
            palavra += this.codFonte.charAt(i);
            console.log(palavra)
          }
  
          else if (this.codFonte.charAt(i) != " " && this.codFonte.charAt(i) != "\n") {
            if (palavra == "")
              this.token.push(new Token(this.codFonte.charAt(i), this.pesquisaReservada(this.codFonte.charAt(i)), linha + "," + coluna))
            else {
              this.token.push(new Token(palavra, this.pesquisaReservada(palavra), linha + "," + fixColuna))
              this.token.push(new Token(this.codFonte.charAt(i), this.pesquisaReservada(this.codFonte.charAt(i)), linha + "," + coluna))
              palavra = ""
              fixColuna = 0
            }
  
          }
        }
        coluna++; //  Incrementa a coluna.
      }
  
      if (palavra != "") {
        this.token.push(new Token(palavra, this.pesquisaReservada(palavra), linha + ", " + fixColuna))
  
        palavra = "";
        fixColuna = 0;
      }
  
      this.IdIdentificador = 0;
    }
  
    pesquisaReservada(palavra) {
      let v: any = this.reservadas.filter(value => {
        return value.nome == palavra
      })
  
      console.log(v);
  
      //  Verifica se é uma palavra reservada.
      if (v.length > 0)
        return v[0].funcao
  
      //  Verifica se é um numero.
      if (this.isNumber(palavra))
        return "Número";
  
      //  É um identificador!!
      return this.pesquisaIdentificador(palavra);
    }
  
    pesquisaIdentificador(identificador) {
      let v: any = this.token.filter(value => {
        return value.token == identificador
      })
  
      //  Verifica se o identificador já foi utilizado antes.
      if (v.length > 0)
        return v[0].funcao;
  
      //  Caso não tenha sido usado atribui um novo ID ou identificador
      this.IdIdentificador++
      return "Identificador " + this.IdIdentificador;
    }
  
    isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
  }
  
}
