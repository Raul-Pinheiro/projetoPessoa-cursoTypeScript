import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
export class NegociacaoController {
    constructor() {
        this.negociacoes = new Negociacoes();
        this.negociacoesViews = new NegociacoesView("#negociacoesViews");
        this.mensagemViews = new MensagemView("#mensagemView");
        this.inputData = document.querySelector("#data");
        this.inputQuantidade = document.querySelector("#quantidade");
        this.inputValor = document.querySelector("#valor");
        this.negociacoesViews.update(this.negociacoes);
    }
    adiciona() {
        const negociacao = Negociacao.criar(this.inputData.value, this.inputQuantidade.value, this.inputValor.value);
        if (!this.verificaDiaUtil(negociacao.data)) {
            this.mensagemViews.update('A data selecionada deve ser um dia útil.');
            return;
        }
        this.negociacoes.adiciona(negociacao);
        this.atualizaView();
    }
    limparFormulario() {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }
    atualizaView() {
        this.negociacoesViews.update(this.negociacoes);
        this.mensagemViews.update('Negociação adicionada com sucesso!');
        this.limparFormulario();
    }
    verificaDiaUtil(data) {
        return data.getDay() > DiasDaSemana.DOMINGO && data.getDay() < DiasDaSemana.SABADO;
    }
}
