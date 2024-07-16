import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/features/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: "A-0002",
      password: "ami1234",
    },
  });
  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    const tostId = toast.loading("Logging in...", { duration: 2000 });
    try {
      const userInfo = {
        id: data.id,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      navigate(`/${user.role}/dashboard`);
      toast.success("Logged in", { id: tostId, duration: 2000 });
    } catch (err) {
      toast.error("Something went wrong", { id: tostId, duration: 2000 });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">Id: </label>
        <input
          className="border-4 border-white-700"
          type="text"
          id="id"
          {...register("id")}
        />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          className="border-4 border-white-700"
          type="text"
          id="password"
          {...register("password")}
        />
      </div>
      <Button htmlType="submit">Login</Button>
    </form>
  );
};

export default Login;
