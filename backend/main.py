import pandas as pd
import matplotlib.pyplot as plt

arquivo = "../equipamentos_eletricos.csv"
def plota_grafico(arquivo):
    # Leitura robusta do CSV (remove BOM e caracteres invisíveis)
    df = pd.read_csv(arquivo, sep=',', engine='python', encoding="utf-8-sig")

    # Remove espaços, tabulações e caracteres ocultos nas colunas
    df.columns = df.columns.str.strip()

    # Exibe para confirmar os nomes reais
    print("Colunas detectadas pelo pandas:", df.columns.tolist())

    # Gráfico
    plt.style.use('dark_background')
    plt.figure(figsize=(12, 6))
    plt.bar(df["aparelhos"], df["consumo de energia"])

    plt.title("Consumo por aparelho")
    plt.xlabel("Aparelho elétrico")
    plt.ylabel("Consumo kW/h")
    plt.xticks(rotation=45, ha='right')
    plt.tight_layout()

    # Salva o gráfico em arquivo
    plt.savefig("grafico_aparelhos.png")

    print("Gráfico salvo como grafico_aparelhos.png")


def entradas():
    aparelho = input("Nome do aparelho: ")
    consumo = input("Consumo de energia (kWh): ")

    nova_linha = {
    "aparelhos": aparelho,
    "consumo de energia": consumo
    }

    return nova_linha

def recebe_linha_arquivo(arquivo, atualiza_grafico):
    df = pd.read_csv(arquivo)

    # Adiciona a nova linha
    df = pd.concat([df, pd.DataFrame([atualiza_grafico])], ignore_index=True)

    # Salva de volta
    df.to_csv(arquivo, index=False)

    plota_grafico(arquivo)


recebe_linha_arquivo(arquivo, entradas())

