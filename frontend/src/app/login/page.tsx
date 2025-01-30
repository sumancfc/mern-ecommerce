"use client";

import { useState, useEffect, FC, FormEvent, ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { loginUser } from "@/store/features/userSlice";
import FormContainer from "@/components/FormContainer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const Login: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { currentUser } = useAppSelector((state) => state.user);

  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (currentUser) {
      router.push(redirect);
    }
  }, [currentUser, router, redirect]);

  const LoginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.warning("All Fields are required");
    }
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      toast.success("Login successful!");
      router.push(redirect);
    } catch (err) {
      if (typeof err === "string") {
        toast.error(err);
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  return (
    <FormContainer>
      <h2>Login Here</h2>
      <Form onSubmit={LoginHandler}>
        <Form.Group controlId='email' className='mb-3'>
          <Form.Label>Enter Email Address</Form.Label>
          <Form.Control
            type='email'
            value={email}
            placeholder='Enter Email Address'
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            required
          />
        </Form.Group>
        <Form.Group controlId='password' className='mb-3'>
          <Form.Label>Enter Password</Form.Label>
          <Form.Control
            type='password'
            value={password}
            placeholder='Enter Password'
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            required
          />
        </Form.Group>
        <Button type='submit' variant='primary' className='mb-3'>
          Login
        </Button>
      </Form>

      <p>
        Do not have an account?{"  "}
        <Link href={redirect ? `/register?redirect=${redirect}` : "/register"}>
          Register
        </Link>
      </p>
    </FormContainer>
  );
};

export default Login;
