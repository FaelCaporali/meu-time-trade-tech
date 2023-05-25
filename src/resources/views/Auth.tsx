import React, { useEffect, useState } from "react";
import {  Button, NavLink, Form, Alert } from "react-bootstrap";
import store from "../../store";
import { useNavigate } from "react-router-dom";
import { fetchUserStatus } from "../../api";
import { logout } from "../../store/slices/user";


function Auth() {
  const userKey = store.getState().user.key;
  const redirect = useNavigate();

  const [key, setKey] = useState<string>('');
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    if (userKey) {
      redirect('/search');
    }
  })

  useEffect(() => {
    if (authError) {
      setTimeout(() => setAuthError(false), 3000);
    }
  }, [authError]);

  const tryToLog = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await fetchUserStatus(key);
      redirect('/search');
    } catch (e) {
      store.dispatch(logout());
      setAuthError(true);
    }
  }

  return (
    <>
      {authError && <Alert variant="danger">Chave de acesso inválida</Alert>}
      {(
        <Form
          onSubmit={tryToLog}
        >
          <Form.Group className="mb-3" controlId="userKey">
            <Form.Label>Forneça a chave da <NavLink href="https://www.api-football.com/">SPORTS API</NavLink></Form.Label>
            <Form.Control
              type="text"
              name="userKey"
              value={key}
              onChange={(e) => {
                e.preventDefault();
                setKey(e.target.value);
              }}
              placeholder="Sua chave aqui"
            />
            <Form.Text className="text-muted">
            Se ainda não tem sua chave, visite o link e cadastre-se. No dashboard sua chave estará disponível!
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit" >
          LOGIN
          </Button>
        </Form>
      )}
    </>
  );
}

export default Auth;