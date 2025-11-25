from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

from analise_csv import analisa_csv
from graficos import criar_linha, adicionar_linha_no_csv, plota_grafico, arquivo

app = FastAPI()

class CSVRequest(BaseModel):
    arquivo: str  # caminho do CSV


app.mount("/static", StaticFiles(directory="."), name="static")
class AttGrafico(BaseModel):
    aparelho: str
    consumo: float

@app.post("/atualizar")
def atualizar_grafico(dados: AttGrafico):
    nova_linha = criar_linha(dados.aparelho, dados.consumo)

    msg_csv = adicionar_linha_no_csv(arquivo, nova_linha)
    msg_grafico = plota_grafico(arquivo)

    return {
        "status": "ok",
        "csv": msg_csv,
        "grafico": msg_grafico
    }

@app.get("/")
def home():
    return {"status": "ok"}


@app.post("/gerar-relatorio")
def gerar_relatorio(dados: CSVRequest):

    # 1️⃣ Gera o PDF via Mangaba
    saida = analisa_csv(dados.arquivo)

    # O output_file configurado no Task é:
    pdf_path = "analiseEletrico_csv.pdf"

    # 2️⃣ Confirma que o arquivo foi realmente criado
    if not os.path.exists(pdf_path):
        return {"erro": "PDF não foi gerado."}

    # 3️⃣ Retorna o PDF para download
    return FileResponse(
        path=pdf_path,
        filename="relatorio_eletrico.pdf",
        media_type="application/pdf"
    )

# Liberar frontend para chamar a API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

