import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';

import { Token } from './token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
    IdIdentificador: number = 0; // ID dos identificadores
  
    reservadas = [
      { nome: "+", tipo:"Terminal", funcao: "Adição" },
      { nome: "-", tipo:"Terminal", funcao: "Subtração" },
      { nome: "*", tipo:"Terminal", funcao: "Multiplicação" },
      { nome: "/", tipo:"Terminal", funcao: "Divisão" },
      { nome: "(", tipo:"Terminal", funcao: "Abre parenteses" },
      { nome: ")", tipo:"Terminal", funcao: "Fecha parenteses" },
      { nome: "x", tipo:"Terminal", funcao: "Incognita" },
      { nome: "y", tipo:"Terminal", funcao: "Incognita" }
    ]
  
    //  Entrada do código fonte.
    codFonte: string = `x+(10-2)`;
    errorSintaxe: string = ``;
  
    token: Token[] = [];  //  Array com os tokens estraido do código fonte.
  
    compiler() {
      this.errorSintaxe = "";
      this.token = [];
      this.estractWord();
    }
  
    /*  Verifica o codigo fonte ................................ */
    public estractWord() {
      let linha: number = 0;
      let coluna: number = 0;
      let fixColuna: number = 0;
      let qtdCaracters: number = this.codFonte.length;
      let palavra: string = "";
      let parenteses: number = 0;
  
      //  Percorre as linhas do código fonte.
      for (let i = 0; i <= qtdCaracters; i++) {
  
        //  Incrementa a linha e zera a coluna.
        if (this.codFonte.charAt(i) == "\n") {
          linha++;
          coluna = -1;
          qtdCaracters++; //  Adiciona a quebra de linha 
        }
  
          //  Insere a palavra no array e Limpa a string palavra 
          if ((this.codFonte.charAt(i) == " " || this.codFonte.charAt(i) == "\n") && palavra != "") {
            this.token.push(new Token(palavra, this.pesquisaReservada(palavra), linha + ", " + fixColuna))
  
            palavra = "";
            fixColuna = 0;
          }
  
          if (this.codFonte.charAt(i) != " " && this.codFonte.charAt(i) != "\n"
            && this.codFonte.charAt(i) != "("
            && this.codFonte.charAt(i) != ")"
            && this.codFonte.charAt(i) != "+"
            && this.codFonte.charAt(i) != "-"
            && this.codFonte.charAt(i) != "*"
            && this.codFonte.charAt(i) != "/"
            && this.codFonte.charAt(i) != "x"
            && this.codFonte.charAt(i) != "y") {
  
            if (palavra == "") // Fixa a coluna no inicio da palavra.
              fixColuna = coluna;
  
            palavra += this.codFonte.charAt(i);
            console.log(palavra)
          }
  
          else if (this.codFonte.charAt(i) != " " && this.codFonte.charAt(i) != "\n") {
            if(this.codFonte.charAt(i) == "(")
              parenteses++;
            if(this.codFonte.charAt(i) == ")")
              parenteses--;
            if (palavra == "")
              this.token.push(new Token(this.codFonte.charAt(i), this.pesquisaReservada(this.codFonte.charAt(i)), linha + "," + coluna))
            else {
              this.token.push(new Token(palavra, this.pesquisaReservada(palavra), linha + "," + fixColuna))
              this.token.push(new Token(this.codFonte.charAt(i), this.pesquisaReservada(this.codFonte.charAt(i)), linha + "," + coluna))
              palavra = ""
              fixColuna = 0
            }
  
          }

          if(parenteses < 0)
            this.errorSintaxe = "Error de sitáxe: Excesso de parenteses, " + parenteses * -1 + " parenteses. Na linha: "+ linha+", coluna: "+ coluna;
        
        coluna++; //  Incrementa a coluna.
      }

      //if(parenteses != 0){
        if(parenteses > 0)
          this.errorSintaxe += "Error de sitáxe: Faltou fechar " + parenteses + " parenteses.";
        //else
          //this.errorSintaxe = "Error de sitáxe: Excesso de parenteses, " + parenteses * -1 + " parenteses.";
      //}

  
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
