export class Negociacao{
    constructor(private _data:Date,public readonly quantidade: number, public readonly valor: number){}
    //Getters são os métodos de leitura de uma classe em java script, permite a leitura de atributos privados declarados com #

    get volume(): number{
        return this.valor*this.quantidade;
    }

    get data(): Date{
        const data = new Date(this._data.getTime())
        return data
    }

    public static criar(dataString:string, quantidadeStr:string, valorStr:string): Negociacao{
        const exp = /-/g;
        const date = new Date(dataString.replace(exp,','));
        const quantidade = parseInt(quantidadeStr);
        const valor = parseFloat(valorStr);
        return new Negociacao(date,quantidade,valor);
    }

}