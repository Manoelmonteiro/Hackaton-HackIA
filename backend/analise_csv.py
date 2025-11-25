from mangaba import Agent, Task, Crew, Process

csv_analyst = Agent(
    role="CSV Data Analyst",
    goal="Analisar dados de arquivos CSV e extrair insights relevantes",
    backstory="Profissional com experiência em estatística, análise de dados, equipamentos eletricos e interpretação de padrões.",
    verbose=True
)

analyze_csv_task = Task(
    description="Analisar o arquivo CSV gerado, calcular totais, médias e identificar insights.",
    expected_output="Relatório detalhado sobre os dados do CSV.",
    agent=csv_analyst,
    context=[create_csv_task],  # usa como contexto o CSV criado
    output_file="analiseEletrico_csv.pdf"
)

agent = MangabaAgent()
text = "A inteligência artificial está transformando o mundo."
analysis = agent.analyze_text(text, "Faça uma análise detalhada")