"use client";

import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";

const Search: React.FC = () => {
  const [keyword, setKeyword] = useState<string>("");
  const router = useRouter();

  const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword.trim()) {
      router.push(`/search/${keyword}`);
    } else {
      router.push("/");
    }
  };

  return (
    <Form onSubmit={searchHandler} className='d-flex'>
      <Form.Control
        type='text'
        name='q'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setKeyword(e.target.value)
        }
        placeholder='Search Products'
        className='mr-sm-2 ml-sm-5'
      />
      <Button type='submit' variant='outline-success' className='p-2'>
        Search
      </Button>
    </Form>
  );
};

export default Search;
