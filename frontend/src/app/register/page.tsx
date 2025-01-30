"use client";

import { useState, useEffect, FC, FormEvent, ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { signupUser } from "@/store/features/userSlice";
import FormContainer from "@/components/FormContainer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const Register: FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

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

  const registerHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return toast.warning("All fields are required");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      await dispatch(signupUser({ name, email, password })).unwrap();
      toast.success("Registration successful!");
      router.push("/login");
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
      <h2>Signup</h2>
      <Form onSubmit={registerHandler}>
        <Form.Group controlId='name' className='mb-3'>
          <Form.Label>Enter Name</Form.Label>
          <Form.Control
            type='text'
            value={name}
            placeholder='Enter Name'
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            required
          />
        </Form.Group>
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
        <Form.Group controlId='confirmPassword' className='mb-3'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            value={confirmPassword}
            placeholder='Confirm Password'
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button type='submit' variant='primary' className='mb-3'>
          Register
        </Button>
      </Form>

      <p>
        Already have an account?{" "}
        <Link href={redirect ? `/login?redirect=${redirect}` : "/login"}>
          Login
        </Link>
      </p>
    </FormContainer>
  );
};

export default Register;
