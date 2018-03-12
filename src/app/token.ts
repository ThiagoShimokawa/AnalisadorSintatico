export class Token {
    token: string;
    funcao: string;
    posicao: string;

    constructor(
        token: string,
        funcao: string,
        posicao: string
    ){
        this.token = token;
        this.funcao = funcao;
        this.posicao = posicao;
    }
}
