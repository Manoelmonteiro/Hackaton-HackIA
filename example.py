from mangaba import Agent, Task, Crew, Process
##Processar linguagem natural, 
##analisar textos,
# traduzir idiomas e se
#  comunicar com outros agentes.


# Criar agentes especializados
from mangaba import Agent, Task, Crew, Process

# Criar agentes especializados
researcher = Agent(
    role="Research Analyst",
    goal="Find and analyze information",
    backstory="Expert researcher with analytical skills",
    verbose=True
)

writer = Agent(
    role="Content Writer", 
    goal="Create engaging content",
    backstory="Professional writer with tech expertise"
)

# Definir tarefas
research_task = Task(
    description="Research AI trends in {year}",
    expected_output="List of 10 key trends",
    agent=researcher
)

write_task = Task(
    description="Write a report about the findings",
    expected_output="Comprehensive report",
    agent=writer,
    context=[research_task],
    output_file="report.md"
)

# Criar e executar crew
crew = Crew(
    agents=[researcher, writer],
    tasks=[research_task, write_task],
    process=Process.SEQUENTIAL,
    verbose=True
)

result = crew.kickoff(inputs={"year": "2025"})



