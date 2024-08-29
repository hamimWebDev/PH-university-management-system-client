import { Button, Row } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/features/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHFrom from "../components/form/PHFrom";
import PHInput from "../components/form/PHInput";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const { register, handleSubmit } = useForm({
  //   defaultValues: {
  //     id: "A-0002",
  //     password: "ami1234",
  //   },
  // });

  const defaultValues = {
    userId: "A-0001",
    password: "admin123",
  };

  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const tostId = toast.loading("Logging in...", { duration: 2000 });
    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };
      console.log(userInfo);
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
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHFrom onSubmit={onSubmit} defaultValues={defaultValues}>
        <PHInput type="text" name="userId" label="Id" />
        <PHInput type="text" name="password" label="password" />
        <Button htmlType="submit">Login</Button>
      </PHFrom>
    </Row>
  );
};

export default Login;
