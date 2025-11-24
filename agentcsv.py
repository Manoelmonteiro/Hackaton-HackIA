from mangaba import Agent, Task, Crew, Process

# ==== AGENTES PARA CSV ====

csv_creator = Agent(
    role="CSV Creator",
    goal="Gerar, organizar e validar arquivos CSV",
    backstory="Especialista em manipulação de dados estruturados e criação de CSVs limpos e consistentes.",
    verbose=True
)

csv_analyst = Agent(
    role="CSV Data Analyst",
    goal="Analisar dados de arquivos CSV e extrair insights relevantes",
    backstory="Profissional com experiência em estatística, análise de dados e interpretação de padrões.",
    verbose=True
)

# ==== TAREFAS ====

create_csv_task = Task(
    description="Gerar um arquivo CSV contendo dados fictícios de vendas (produto, quantidade, preço).",
    expected_output="CSV criado com colunas: produto, quantidade, preco",
    agent=csv_creator,
    output_file="dados_vendas.csv"
)

analyze_csv_task = Task(
    description="Analisar o arquivo CSV gerado, calcular totais, médias e identificar insights.",
    expected_output="Relatório detalhado sobre os dados do CSV.",
    agent=csv_analyst,
    context=[create_csv_task],  # usa como contexto o CSV criado
    output_file="analise_csv.md"
)

# ==== CREW ====

crew = Crew(
    agents=[csv_creator, csv_analyst],
    tasks=[create_csv_task, analyze_csv_task],
    process=Process.SEQUENTIAL,
    verbose=True
)

result = crew.kickoff()
print(result.final_output)
