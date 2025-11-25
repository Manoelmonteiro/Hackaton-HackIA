from mangaba import Agent, Task, Crew, Process

def analisa_csv(arquivo):

    csv_analyst = Agent(
        role="CSV Data Analyst",
        goal="Analisar dados de arquivos CSV e extrair insights relevantes",
        backstory="Profissional com experiência em estatística e análise de equipamentos elétricos.",
        verbose=True
    )

    analyze_csv_task = Task(
        description=f"Analisar o arquivo CSV e gerar insights. Arquivo: {arquivo}",
        expected_output="Relatório detalhado sobre os dados.",
        agent=csv_analyst,
        context=[],   # <= evitar erro se create_csv_task não existir
        output_file="analiseEletrico_csv.pdf"
    )

    crew_analise = Crew(
        agents=[csv_analyst],
        tasks=[analyze_csv_task],
        process=Process.SEQUENTIAL,
        verbose=True
    )

    result = crew_analise.kickoff()
    return result.final_output
