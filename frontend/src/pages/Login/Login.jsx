import { useEffect } from "react";
import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import { LoginService } from "../../services/auth.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/slice/userDataSlice";
const Login = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const isAuth = useSelector((state) => Boolean(state.UserData.data));
  useEffect(() => {
    if (isAuth) {
      nav("/");
    }
  }, [isAuth]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const { mutate, isLoading } = useMutation(
    ["auth"],
    ({ email, password }) => LoginService(email, password),
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data) => {
        dispatch(setUser(data));
        reset();
      },
    }
  );
  const onSubmit = (data) => {
    mutate(data);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <header>
          <Link to='/' style={{textDecoration:'none'}} >
            <button  className={styles.back}>BACK</button>
          </Link>
          <h2>LOGIN IN</h2>
        </header>
        <div className={styles.form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className={styles.input}
              error={Boolean(errors.email?.message)}
              type="email"
              {...register("email", { required: true })}
              placeholder="Введите email"
            />
            {errors.email && (
              <div className={styles.error}>Email is required</div>
            )}
            <input
              className={styles.input}
              error={Boolean(errors.password?.message)}
              type="password"
              {...register("password", { require: true })}
              placeholder="Введите пароль"
            />
            {errors.password && (
              <div className={styles.error}>Password is required</div>
            )}
            <button type="submit">ВОЙТИ</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
