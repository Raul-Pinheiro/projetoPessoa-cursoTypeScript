import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";

export class NegociacaoController{
    private inputData:          HTMLInputElement;
    private inputQuantidade:    HTMLInputElement;
    private inputValor:         HTMLInputElement;
    private negociacoes         = new Negociacoes();
    private negociacoesViews    = new NegociacoesView("#negociacoesViews");
    private mensagemViews       = new MensagemView("#mensagemView");

    constructor(){
        this.inputData          = document.querySelector("#data") as HTMLInputElement;
        this.inputQuantidade    = document.querySelector("#quantidade") as HTMLInputElement;
        this.inputValor         = document.querySelector("#valor") as HTMLInputElement;
        this.negociacoesViews.update(this.negociacoes);
    }
 
    public adiciona():void{
        const negociacao = Negociacao.criar(
            this.inputData.value, this.inputQuantidade.value, this.inputValor.value
        );

        if(!this.verificaDiaUtil(negociacao.data)){
            this.mensagemViews.update('A data selecionada deve ser um dia útil.');
            return;
        }
        this.negociacoes.adiciona(negociacao);
        this.atualizaView();
        
    }
    
    private limparFormulario():void{
        this.inputData.value='';
        this.inputQuantidade.value='';
        this.inputValor.value='';
        this.inputData.focus();
    }

    private atualizaView(): void{
        this.negociacoesViews.update(this.negociacoes);
        this.mensagemViews.update('Negociação adicionada com sucesso!')
        this.limparFormulario();
    }

    private verificaDiaUtil(data:Date){
        return data.getDay() > DiasDaSemana.DOMINGO && data.getDay() < DiasDaSemana.SABADO;
    }
}