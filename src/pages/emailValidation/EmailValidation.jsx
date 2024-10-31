import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CompleteRegistrationForm from "../../components/completeRegistrationForm/CompleteRegistrationForm";
import Loading from "../../components/ui/loading/Loading";

import {
  RootContainer,
  Title,
  ContentContainer,
  Subtitle,
} from "./emailValidationStyles.js";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const EmailValidation = () => {
  const query = useQuery();
  const token = query.get("token");

  const [validationResult, setValidationResult] = useState(null);

  useEffect(() => {
    if (token) {
      const validateToken = async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/auth/validation?token=${token}`
          );
          const result = await response.json();
          setValidationResult(result);
        } catch (error) {
          console.error("Validation:", error);
          setValidationResult({ error: "Error validating token" });
        }
      };

      validateToken();
    }
  }, [token]);

  return (
    <RootContainer>
      <Title>Email Validation</Title>
      {token ? (
        validationResult ? (
          <ContentContainer>
            {validationResult.ok ? (
              <CompleteRegistrationForm
                token={token}
                user={validationResult.user}
              />
            ) : (
              <Subtitle>{validationResult.message}</Subtitle>
            )}
          </ContentContainer>
        ) : (
          <ContentContainer>
            <Loading />
          </ContentContainer>
        )
      ) : (
        <p>No token provided.</p>
      )}
    </RootContainer>
  );
};

export default EmailValidation;
