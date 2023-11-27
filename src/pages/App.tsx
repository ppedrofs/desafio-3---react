import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.scss";
import FotoButton from "../assets/foto.png";
import Form from "../components/Form";
import { ITarefa } from "../utils/models";

const columns = {
    incompleto: "incompleto",
    completo: "completo",
    progresso: "progresso",
};

type Coluna = typeof columns;
type tipoColuna = keyof Coluna;

export default function App() {
    const [tarefas, setTarefas] = useState<ITarefa[]>(() => {
    const localData = localStorage.getItem("tarefas");
    return localData ? JSON.parse(localData) : [];
});

    useEffect(() => {
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }, [tarefas]);

    const draggedTodoItem = useRef<any>(null);

    const tarefaIncompleta = () => {
    const todoPayload: ITarefa = {
        id: uuidv4(),
        titulo: "",
        descricao: "",
        atribuido: "",
        data: "",
        coluna: "incompleto",
        sortIndex: tarefas[tarefas.length + 1]?.sortIndex || tarefas.length + 1,
    };

    setTarefas([...tarefas, todoPayload]);
};

const tarefaEmProgresso = () => {
    const todoPayload: ITarefa = {
        id: uuidv4(),
        titulo: "",
        descricao: "",
        atribuido: "",
        data: "",
        coluna: "progresso",
        sortIndex: tarefas[tarefas.length + 1]?.sortIndex || tarefas.length + 1,
    };

    setTarefas([...tarefas, todoPayload]);
};

const adicionarTarefa = () => {
    const todoPayload: ITarefa = {
        id: uuidv4(),
        titulo: "",
        descricao: "",
        atribuido: "",
        data: "",
        coluna: "completo",
        sortIndex: tarefas[tarefas.length + 1]?.sortIndex || tarefas.length + 1,
    };

    setTarefas([...tarefas, todoPayload]);
};

const dropColumn = (column: tipoColuna) => {

    const index = tarefas.findIndex(
        (todo) => todo.id === draggedTodoItem.current
    );
    const temptarefas = [...tarefas];
    temptarefas[index].coluna = column;
    setTarefas(temptarefas);
};

const deletar = (idDelete: string) => {
    "idDelete";
    const updatedtarefas = tarefas.filter((item) => item.id !== idDelete);

    setTarefas(updatedtarefas);
};

return (
    <>
    <div id="container">
        <div>
            <h1>A Fazer</h1>
            <div
            className="content"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => dropColumn("incompleto")}
        >
            {tarefas
                .filter((todo) => todo.coluna === "incompleto")
                .map((todo) => {
                return (
                    <div
                        key={todo.id}
                        draggable
                        onDragStart={() => (draggedTodoItem.current = todo.id)}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <Form deletar={deletar} />
                        <button onClick={() => deletar(todo.id)}>
                            Deletar
                        </button>
                    </div>
                );
            })}
            <button onClick={tarefaIncompleta}>
                <img src={FotoButton} />
            </button>
        </div>
    </div>
        <div className="coluna">
            <h1>Em andamento</h1>
        <div
            className="content"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => dropColumn("progresso")}
        >
            {tarefas
                .filter((todo) => todo.coluna === "progresso")
                .map((todo) => {
                return (
                <div
                    key={todo.id}
                    draggable
                    onDragStart={() => (draggedTodoItem.current = todo.id)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => dropColumn("progresso")}
                >
                    <Form deletar={deletar} />
                    <button onClick={() => deletar(todo.id)}>
                        Deletar
                    </button>
                </div>
            );
        })}
            <button onClick={tarefaEmProgresso}>
                <img src={FotoButton} />
                </button>
            </div>
            </div>
        <div>
            <h1>Concluído</h1>
            <div
            className="content"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => dropColumn("completo")}
            >
            {tarefas
                .filter((todo) => todo.coluna === "completo")
                .map((todo) => {
                return (
                <div
                    key={todo.id}
                    draggable
                    onDragStart={() => (draggedTodoItem.current = todo.id)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => dropColumn("completo")}
                >
                    <Form deletar={deletar} />
                    <button onClick={() => deletar(todo.id)}>
                        Deletar
                    </button>
                    </div>
                );
            })}
            <button onClick={adicionarTarefa}>
                <img src={FotoButton} />
            </button>
                    </div>
                </div>
            </div>
        </>
    );
}