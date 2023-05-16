import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import styles from "./Add.module.scss";
import { CreateService } from "../../services/create.service";
import { useMutation } from "@tanstack/react-query";
import axios from "../../axios";

const Add = () => {
  const isAuth = useSelector((state) => Boolean(state.UserData.data));
  const nav = useNavigate();
  const imageUrl = "";
  const [files, setFiles] = useState({ value: "", title: "", imageUrl: "" });
  const inputRef = useRef(null);
  const { mutate, isLoading } = useMutation(
    ["auth"],
    ({ title, value, imageUrl }) => CreateService(title, value, imageUrl),
    {
      onSuccess: (data) => {
        console.log(data);
				setFiles({...files, value:'', title:'', imageUrl:''})
      },
    }
  );

  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      setFiles({ ...files, imageUrl: data.url });
    } catch (error) {
      console.log(error);
    }
  };

	const onSumbit = () => {
		mutate({...files})
	}

  const onClickRemoveImage = () => {
		setFiles({...files, imageUrl:''})
	};

  const onChange = (value) => setFiles({ ...files, value: value });

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  useEffect(() => {
    if (!isAuth) {
      nav("/auth/login");
    }
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {files.imageUrl ? (
          <div className={styles.img}>
            <button
              onClick={() => onClickRemoveImage()}
              className={styles.button}
            >
              Удалить картинку
            </button>
						<br/>
            <img style={{height:'700px'}}
              src={`http://localhost:4444${files.imageUrl}`}
              alt=""
            />
          </div>
        ) : (
          <button
            onClick={() => inputRef.current.click()}
            className={styles.button}
          >
            Добавить картинку
          </button>
        )}
        <input ref={inputRef} type="file" onChange={handleChangeFile} hidden />
        <input
          className={styles.title}
          value={files.title}
          onChange={(e) => setFiles({ ...files, title: e.target.value })}
          type="text"
          placeholder="Название рецепта..."
        />
        <SimpleMDE
          className={styles.editor}
          value={files.value}
          onChange={onChange}
          options={options}
        />
        <div className={styles.buttons}>
          <button
					onClick={() => onSumbit()}
            className={`${styles.public} ${styles.button}`}
            size="large"
            variant="contained"
          >
            Опубликовать
          </button>
          <Link to="/">
            <button className={styles.button} size="large">
              Отмена
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Add;
