from mangaba import Agent, Task, Crew, Process

# ==== AGENTES PARA CSV ====

csv_creator = Agent(
    role="CSV Creator",
    goal="Gerar, organizar e validar arquivos CSV",
    backstory="Especialista em manipulação de dados estruturados e criação de CSVs limpos e consistentes, nao deve ter nada alem dos dados da tabela, tambem tire o inicio com ```csv e o fim ```",
    verbose=True
)
def analisa_csv(arquivo):
    csv_analyst = Agent(
        role="CSV Data Analyst",
        goal="Analisar dados de arquivos CSV e extrair insights relevantes",
        backstory="Profissional com experiência em estatística, análise de dados, equipamentos eletricos e interpretação de padrões.",
        verbose=True
    )

    # ==== TAREFAS ====

    create_csv_task = Task(
        description="Gerar um arquivo CSV contendo dados fictícios de consumo de energia (aparelhos, consumo de energia ).",
        expected_output="CSV criado com colunas: aparelhos, consumo de energia ",
        agent=csv_creator,
        output_file="/backend/equipamentos_eletricos.csv"
    )

    analyze_csv_task = Task(
        description="Analisar o arquivo CSV gerado, calcular totais, médias e identificar insights.",
        expected_output="Relatório detalhado sobre os dados do CSV.",
        agent=csv_analyst,
        context=[create_csv_task],  # usa como contexto o CSV criado
        output_file="analiseEletrico_csv.pdf"
    )

    # ==== CREW ===

    crew_analise= Crew(
        agents=[csv_analyst],
        tasks=[analyze_csv_task],
        process=Process.SEQUENTIAL,
        verbose=True
    )


    result_ana = crew_analise.kickoff()
    return result_ana.final_output
