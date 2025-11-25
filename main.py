import pandas as pd
import matplotlib.pyplot as plt

arquivo = "equipamentos_eletricos.csv"

df = pd.read_csv(arquivo, on_bad_lines='skip')

plt.figure(figsize=(12, 6))
plt.bar(df["aparelhos"], df["consumo de energia"])

plt.title("Consumo por aparelho")
plt.xlabel("Aparelho elétrico")
plt.ylabel("Consumo kW/h")
plt.xticks(rotation=45, ha='right')
plt.tight_layout()

# Salva o gráfico em arquivo
plt.savefig("grafico_aparelhos.png")

print("Gráfico salvo como Grafico_aparelhos.png")
