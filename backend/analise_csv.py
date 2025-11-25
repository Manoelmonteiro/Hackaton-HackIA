from mangaba import Agent, Task, Crew, Process, MangabaAgent

csv_analyst = Agent(
    role="CSV Data Analyst",
    goal="Analisar dados de arquivos CSV e extrair insights relevantes",
    backstory="Profissional com experiência em estatística, análise de dados, equipamentos eletricos e interpretação de padrões.",
    verbose=True
)

analyze_csv_task = Task(
    description=f"Analisar o arquivo CSV gerado, calcular totais, médias e identificar insights {arquivo}",
    expected_output="Relatório detalhado sobre os dados do CSV.",
    agent=csv_analyst,
    context=[create_csv_task],  # usa como contexto o CSV criado
    output_file="analiseEletrico_csv.pdf"
)

crew_analise= Crew(
    agents=[csv_analyst],
    tasks=[analyze_csv_task],
    process=Process.SEQUENTIAL,
    verbose=True
)

result_ana = crew_analise.kickoff()
print(result_ana.final_output)

agent = MangabaAgent()
arquivo = "A inteligência artificial está transformando o mundo."
analysis = agent.analyze_text(arquivo, "Faça uma análise detalhada")