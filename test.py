from mangaba import Agent, Task, Crew, Process

jogador = Agent(
    role="voce é um jogador de League of legends experiente ",
    goal="explicar de uma forma simples coisas sobre o jogo ",
    backstory=" foi um grande jogador com varios personagens ",
    verbose= True

)

jogador_task = Task(
    description=" pesquisar e explicar builds e formas de jogar com o seguinte campeao {personagem}",
    expected_output="listar combos, counters e dicas de {personagem} ",
    agent=jogador
)






crew = Crew(
    agents=[jogador],
    tasks=[jogador_task],
    process= Process.SEQUENTIAL,
    verbose= True

)
###########################

def executa():
    entrada = input("nome de personagem: \n")
    result=crew.kickoff(inputs={"personagem":entrada})
    print(result.final_output)


cria_csv = Agent(
    role=" voce é um analista de dados experiente ",
    goal= " ",
    backstory=" "
)

comercial_task = Task(
     description= " "
)