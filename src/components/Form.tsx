import styles from "./styles.module.scss";

export default function Form() {
  return (
    <div className={styles.container}>
      <div className={styles.containerTitle}>
        <label htmlFor="Titulo da Tarefa"></label>
        <input placeholder="Titulo da tarefa"></input>
      </div>

      <div className={styles.containerInfo}>
        <div className={styles.deadlineContainer}>
          <label htmlFor="Responsavel"></label>
          <input placeholder="Responsavel" maxLength={20}></input>

          <label htmlFor="Data"></label>
          <input placeholder="Data" maxLength={10}></input>
        </div>

        <div>
          <label htmlFor="Descrição"></label>
          <input placeholder="Descricao" maxLength={80}></input>
        </div>
      </div>
    </div>
  );
}