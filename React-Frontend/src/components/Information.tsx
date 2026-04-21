import { Heading } from "@chakra-ui/react";
import React from "react";

export interface InformationProps {
  message: string;
}

export const Information: React.FC<InformationProps> = ({ message }) => {
  return (
    <Heading
      textAlign={"center"}
      p={5}
      fontSize={14}
    >
      {message}
    </Heading>
  );
};
