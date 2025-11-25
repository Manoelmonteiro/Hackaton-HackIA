import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.patches as patches

arquivo = "../equipamentos_eletricos.csv"
def plota_grafico(arquivo):
    # Leitura robusta do CSV (remove BOM e caracteres invisíveis)
    df = pd.read_csv(arquivo, sep=',', engine='python', encoding="utf-8-sig")

    # Remove espaços, tabulações e caracteres ocultos nas colunas
    df.columns = df.columns.str.strip()

    # Exibe para confirmar os nomes reais
    print("Colunas detectadas pelo pandas:", df.columns.tolist())

    plt.rcParams.update({
    "font.family": "sans-serif",
    "font.size": 11,
    "axes.edgecolor": "#DDDDDD",
    "axes.linewidth": 1.2,
    "text.color": "#444444",
    "axes.labelcolor": "#444444",
    "xtick.color": "#666666",
    "ytick.color": "#666666"
    })

    # === Criando a figura ===
    fig, ax = plt.subplots(figsize=(12, 6))
    fig.patch.set_facecolor("#FFFFFF")       # Fundo branco

    # === Card com bordas arredondadas ===
    rect = patches.FancyBboxPatch(
        (0.02, 0.02), 0.96, 0.96,
        boxstyle="round,pad=0.02,rounding_size=20",
        linewidth=1.5,
        edgecolor="#EEEEEE",
        facecolor="#FFFFFF"
    )
    ax.add_patch(rect)

    # === Gráfico ===
    bars = ax.bar(
        df["aparelhos"], 
        df["consumo de energia"],
        color="#C6FF6E",             # Verde neon claro
        edgecolor="#A4E85C"
    )

    # === Estilo do gráfico ===
    ax.set_title("Consumo por Aparelho", fontsize=18, fontweight="bold", color="#222")
    ax.set_xlabel("Aparelho elétrico", fontsize=12)
    ax.set_ylabel("Consumo kW/h", fontsize=12)
    plt.xticks(rotation=40, ha='right')

    # Remover bordas superiores/direita para visual clean
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)

    # Grade discreta
    #ax.grid(axis="y", linestyle="--", alpha=0.3, color="#CCCCCC")

    plt.tight_layout()

    # === Salvar ===
    plt.savefig("grafico_estilizado.png", dpi=300)
    plt.show()

    print("Gráfico estilizado criado como grafico_estilizado.png")

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

