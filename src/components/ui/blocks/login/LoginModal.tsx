"use cleint";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { loginUser, loginWithEmail, registerUser } from "@/store/redusers/userReducer";
import { LoginFormType, LoginProviderType } from "@/types/login";
import ModalContainer from "../../shared/containers/ModalContainer";
import { H4 } from "../../shared/text/H";
import EmailRegOrLog from "./EmailRegOrLog";
import ProvidersLogin from "./ProvidersLogin";

export default function LoginModal({
  setLoginModal,
}: {
  setLoginModal: Dispatch<SetStateAction<boolean>>;
}) {
  const dispatch = useAppDispatch();
  const [isRegister, setIsRegister] = useState(true);

  const handleLoginOrRegUser = async (data: LoginFormType) => {
    const { email, password } = data;
    try {
      if (isRegister) {
        await dispatch(registerUser({ email, password })).unwrap();
      } else {
        await dispatch(loginWithEmail({ email, password })).unwrap();
      }
      setLoginModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLoginProvider = (provider: LoginProviderType) => {
    dispatch(loginUser(provider));
    setLoginModal(false);
  };

  return (
    <ModalContainer onClose={() => setLoginModal(false)}>
      <H4>{isRegister ? "Register" : "Login"}</H4>
      <EmailRegOrLog
        isRegister={isRegister}
        setIsRegister={setIsRegister}
        handleLoginOrRegUser={handleLoginOrRegUser}
      />
      <ProvidersLogin handleLoginProvider={handleLoginProvider} />
    </ModalContainer>
  );
}
