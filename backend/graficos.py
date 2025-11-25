import pandas as pd
import matplotlib.pyplot as plt

arquivo = "../equipamentos_eletricos.csv"

def plota_grafico(arquivo):
    df = pd.read_csv(arquivo, encoding="utf-8-sig")
    df.columns = df.columns.str.strip()  # limpar espaços invisíveis

    print("Colunas detectadas:", df.columns.tolist())

    plt.style.use('dark_background')
    plt.figure(figsize=(12, 6))
    plt.bar(df["aparelhos"], df["consumo de energia"])

    plt.title("Consumo por aparelho")
    plt.xlabel("Aparelho elétrico")
    plt.ylabel("Consumo kW/h")
    plt.xticks(rotation=45, ha='right')
    plt.tight_layout()

    plt.savefig("grafico_aparelhos.png")

    return "Gráfico gerado com sucesso."


def criar_linha(aparelho, consumo):
    nova_linha = {
        "aparelhos": aparelho,
        "consumo de energia": consumo
    }
    return nova_linha


def adicionar_linha_no_csv(arquivo, nova_linha):
    df = pd.read_csv(arquivo, encoding="utf-8-sig")
    df = pd.concat([df, pd.DataFrame([nova_linha])], ignore_index=True)
    df.to_csv(arquivo, index=False, encoding="utf-8-sig")

    return "Linha adicionada com sucesso!"
